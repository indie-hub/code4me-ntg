import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { receipt } from "../skills/code4me/scripts/evidence.mjs";

const helper = fileURLToPath(new URL("../skills/code4me/scripts/evidence.mjs", import.meta.url));
const contract = readFileSync(new URL("../skills/code4me/references/task-contract.md", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const [task, result] = [...contract.matchAll(/```json\n([\s\S]*?)\n```/g)].map((match) => JSON.parse(match[1]));

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "code4me evidence "));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return { dir, save(name, value) {
    const path = join(dir, name);
    writeFileSync(path, JSON.stringify(value));
    return path;
  } };
}

test("contract examples produce exact byte receipts without changing files", (t) => {
  const { dir, save } = fixture(t);
  const taskPath = save("task.json", task);
  const resultPath = save("result.json", result);
  const before = readFileSync(resultPath);
  const files = readdirSync(dir);
  const actual = receipt(resultPath, taskPath);
  assert.equal(actual.file, resultPath);
  assert.equal(actual.sha256, createHash("sha256").update(before).digest("hex"));
  for (const key of ["protocol", "type", "milestone_id", "task_id", "stage_id", "stage", "worker", "vendor"])
    assert.equal(actual[key], result[key]);
  assert.deepEqual(readFileSync(resultPath), before);
  assert.deepEqual(readdirSync(dir), files);
  assert.equal(receipt(taskPath).type, "task");
});

test("hashes preserve CRLF and formatting rather than hashing reserialized JSON", (t) => {
  const { save } = fixture(t);
  const path = save("result.json", result);
  const originalHash = receipt(path).sha256;
  const bytes = Buffer.from(JSON.stringify(result, null, 2).replace(/\n/g, "\r\n") + "\r\n");
  writeFileSync(path, bytes);
  assert.equal(receipt(path).sha256, createHash("sha256").update(bytes).digest("hex"));
  assert.notEqual(receipt(path).sha256, originalHash);
});

test("every documented required task and result field is checked", (t) => {
  const { save } = fixture(t);
  for (const template of [task, result]) {
    for (const key of Object.keys(template)) {
      const changed = structuredClone(template);
      delete changed[key];
      assert.throws(() => receipt(save("missing.json", changed)), /missing/, `${template.type}.${key}`);
    }
  }
});

test("dispatch identity mismatches reject the result instead of rewriting it", (t) => {
  const { save } = fixture(t);
  const taskPath = save("task.json", task);
  for (const key of ["milestone_id", "task_id", "stage_id", "stage", "worker", "vendor"]) {
    const changed = { ...result, [key]: key === "stage" ? "implement" : `${result[key]}-other` };
    const path = save("result.json", changed);
    const before = readFileSync(path);
    assert.throws(() => receipt(path, taskPath), /mismatch/, key);
    assert.deepEqual(readFileSync(path), before);
  }
  assert.throws(() => receipt(taskPath, taskPath), /requires a result and a task/);
});

test("malformed, legacy, unsafe and structurally incomplete envelopes fail closed", (t) => {
  const { save } = fixture(t);
  const cases = [
    null, [], { ...task, protocol: "unsupported" }, { ...task, type: "notice" },
    { ...task, stage_id: "../escape" }, { ...task, stage_id: task.task_id },
    { ...task, stage: "unknown" }, { ...task, target: {} }, { ...task, goal: "" },
    { ...task, delegation: "allowed" }, { ...task, required_skill: "other" },
    { ...task, risk: "low" }, { ...task, route: "unknown" },
    { ...task, intent: { ...task.intent, outcome: "" } }, { ...task, acceptance: [] },
    { ...task, constraints: null }, { ...task, reply_to: {} },
    { ...task, memory: { status: "used", searched: false, refs: [] } },
    { ...task, memory: { status: "used", searched: true, refs: [] } },
    { ...task, memory: { status: "unavailable", searched: false, refs: [] } },
    { ...task, draft: null }, { ...task, route: "direct" },
    { ...task, stage: "verify", prior_result: null },
    { ...result, outcome: "success" }, { ...result, summary: "" },
    { ...result, checks: null }, { ...result, tool_evidence: [] },
    { ...result, tool_evidence: [{}] }, { ...result, verdict: "pass" },
  ];
  for (const value of cases) assert.throws(() => receipt(save("bad.json", value)), Error);
  const path = save("bad.json", result);
  writeFileSync(path, '{"private": "DO_NOT_ECHO",');
  assert.throws(() => receipt(path), /^Error: artifact must be valid UTF-8 JSON$/);
  writeFileSync(path, Buffer.from([0xff]));
  assert.throws(() => receipt(path), /UTF-8 JSON/);
});

test("direct tasks, unavailable memory and blocked results remain valid", (t) => {
  const { save } = fixture(t);
  const direct = { ...task, stage: "implement", route: "direct", draft: null,
    memory: { status: "unavailable", searched: false, refs: [], reason: "No memory service connected" } };
  assert.equal(receipt(save("direct.json", direct)).stage, "implement");
  const blocked = { ...result, outcome: "blocked", blocker: "Missing evidence", tool_evidence: [] };
  assert.equal(receipt(save("blocked.json", blocked)).type, "result");
});

test("review tasks allow a result path, artifact reference or embedded prior result", (t) => {
  const { save } = fixture(t);
  for (const stage of ["challenge", "verify"]) {
    for (const prior_result of [".code4me/results/previous.json", { path: "previous.json", sha256: "recorded separately" }, result]) {
      assert.equal(receipt(save("review-task.json", { ...task, stage, prior_result })).type, "task");
    }
    for (const prior_result of [null, "", [], false]) {
      assert.throws(() => receipt(save("review-task.json", { ...task, stage, prior_result })), /prior_result/);
    }
  }
});

test("review receipts reject false pass states and accept truthful review outcomes", (t) => {
  const { save } = fixture(t);
  const review = { ...result, stage: "verify", verdict: "pass", intent_alignment: "aligned" };
  assert.equal(receipt(save("review.json", review)).stage, "verify");
  for (const change of [
    { verdict: "proceed" }, { intent_alignment: null }, { intent_alignment: "misaligned" },
    { outcome: "blocked" }, { findings: [{ priority: "required", status: "open" }] },
  ]) assert.throws(() => receipt(save("review.json", { ...review, ...change })), Error);
  const changes = { ...review, verdict: "changes_requested", intent_alignment: "partly_aligned",
    findings: [{ priority: "required", status: "open" }] };
  assert.equal(receipt(save("changes.json", changes)).type, "result");
  assert.equal(receipt(save("challenge.json", { ...review, stage: "challenge", verdict: "proceed" })).stage, "challenge");
});

test("CLI works from another cwd with spaced paths, no Crowded and useful failure exits", (t) => {
  const { dir, save } = fixture(t);
  const taskPath = save("task file.json", task), resultPath = save("result file.json", result);
  const run = (...args) => spawnSync(process.execPath, [helper, ...args], {
    cwd: dir, encoding: "utf8", env: { ...process.env, CROWDED_BIN: "not-a-program" },
  });
  const success = run(resultPath, "--task", taskPath);
  assert.equal(success.status, 0, success.stderr);
  assert.equal(success.stderr, "");
  assert.deepEqual(JSON.parse(success.stdout), receipt(resultPath, taskPath));
  for (const args of [[], [resultPath, "--wrong", taskPath], [join(dir, "missing.json")]]) {
    const failure = run(...args);
    assert.equal(failure.status, 1);
    assert.equal(failure.stdout, "");
    assert.match(failure.stderr, /^evidence: /);
  }
});

test("CLI also runs through a linked skill installation", (t) => {
  const { dir, save } = fixture(t);
  const path = save("result.json", result);
  const linked = join(dir, "linked scripts");
  symlinkSync(dirname(helper), linked, "junction");
  const run = spawnSync(process.execPath, [join(linked, "evidence.mjs"), path], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(JSON.parse(run.stdout), receipt(path));
});
