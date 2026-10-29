import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const contract = read("../skills/code4me/references/task-contract.md");
const examples = [...contract.matchAll(/```json\n([\s\S]*?)\n```/g)].map((m) => JSON.parse(m[1]));

test("task and result examples correlate without ID translation", () => {
  assert.equal(examples.length, 2);
  const [task, result] = examples;
  for (const key of ["protocol", "milestone_id", "task_id", "stage_id", "stage", "worker", "vendor"]) {
    assert.equal(result[key], task[key], key);
  }
  assert.equal(task.protocol, "code4me-ntg/v4");
  assert.notEqual(task.task_id, task.stage_id);
  assert.equal(task.type, "task");
  assert.equal(result.type, "result");
  assert.equal(task.delegation, "forbidden");
  assert.ok(Object.values(task.intent).every((v) => typeof v === "string" || Array.isArray(v)));
  assert.ok(task.intent.request && task.intent.outcome && task.intent.example);
  assert.ok(task.verification.commands.length + task.verification.evidence.length > 0);
  assert.ok(task.draft.question && task.draft.demonstration && task.draft.stop_when);
  assert.equal(result.verdict, null, "a completed draft must not claim a final pass");
  assert.equal(result.intent_alignment, null);
  assert.ok(result.tool_evidence.every((e) => e.tool && e.action && e.result));
  for (const field of ["findings", "resolutions", "deferred_work", "decision_receipts", "memory_candidates"]) {
    assert.ok(Array.isArray(result[field]), field);
  }
  assert.equal(task.reply_to.transport, "native");
  assert.equal(task.reply_to.room_number, null);
});

test("release manifests agree with the changelog", () => {
  const claude = JSON.parse(read("../.claude-plugin/plugin.json"));
  const codex = JSON.parse(read("../.codex-plugin/plugin.json"));
  assert.equal(claude.version, codex.version);
  assert.match(read("../CHANGELOG.md"), new RegExp(`\\[${claude.version.replaceAll(".", "\\.")}\\]`));
});
