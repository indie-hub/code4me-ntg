import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import Code4Me from "../.opencode/plugins/code4me.js";
import { isCode4MeEnvelope, ENVELOPE_GUIDANCE, PRODUCER_GUIDANCE, INVALID_GUIDANCE } from "../hooks/nudge.mjs";

const hook = fileURLToPath(new URL("../hooks/nudge.mjs", import.meta.url));
const contract = readFileSync(new URL("../skills/code4me/references/task-contract.md", import.meta.url), "utf8");
const [task, result] = [...contract.matchAll(/```json\n([\s\S]*?)\n```/g)].map((m) => JSON.parse(m[1]));
function run(mode, payload) {
  const response = spawnSync(process.execPath, [hook, mode], { input: JSON.stringify(payload), encoding: "utf8" });
  assert.equal(response.status, 0, response.stderr);
  return JSON.parse(response.stdout);
}
const guidance = (prompt) => run("envelope", { prompt }).hookSpecificOutput?.additionalContext;
async function openCodePrompt() {
  let callback;
  await Code4Me.setup({ session: { async hook(name, fn) { assert.equal(name, "prompt"); callback = fn; } } });
  return async (text) => { const event = { prompt: { text } }; await callback(event); return event.prompt.text; };
}

test("current JSON and YAML tasks reach the worker without altering the task", async () => {
  const apply = await openCodePrompt();
  const yaml = "protocol: code4me-ntg/v4\ntype: task\nrequired_skill: code4me\ntask_id: T1\nstage_id: T1-implement-1\ndelegation: forbidden\ngoal: fix the parser";
  for (const prompt of [JSON.stringify(task), yaml]) {
    assert.equal(isCode4MeEnvelope(prompt), true);
    assert.equal(guidance(prompt), ENVELOPE_GUIDANCE);
    const enriched = await apply(prompt);
    assert.equal(enriched, prompt + "\n\n" + ENVELOPE_GUIDANCE);
    assert.equal(await apply(enriched), enriched);
    assert.equal("permissionDecision" in run("envelope", { prompt }).hookSpecificOutput, false);
  }
  assert.equal(guidance(task), ENVELOPE_GUIDANCE);
});

test("all current stages use the same contract and result IDs are preserved", async () => {
  const apply = await openCodePrompt();
  for (const stage of ["implement", "draft", "challenge", "finish", "repair", "verify", "audit", "research"]) {
    const prompt = JSON.stringify({ ...task, stage, stage_id: `T1-${stage}-1` });
    assert.equal(guidance(prompt), ENVELOPE_GUIDANCE);
    assert.equal(await apply(prompt), prompt + "\n\n" + ENVELOPE_GUIDANCE);
  }
  assert.notEqual(guidance(JSON.stringify(result)), INVALID_GUIDANCE);
});

test("unsupported and incomplete tasks get blocked guidance instead of producer work", async () => {
  const apply = await openCodePrompt();
  for (const changed of [{ protocol: "code4me-ntg/v3" }, { protocol: "code4me-ntg/v2" },
    { stage_id: null }, { task_id: " " }, { goal: null }, { delegation: "allowed" }, { type: "unknown" }]) {
    const prompt = JSON.stringify({ ...task, ...changed });
    assert.equal(isCode4MeEnvelope(prompt), false);
    assert.equal(guidance(prompt), INVALID_GUIDANCE);
    const enriched = await apply(prompt);
    assert.equal(enriched, prompt + "\n\n" + INVALID_GUIDANCE);
    assert.equal(await apply(enriched), enriched);
  }
});

test("producer prompts receive identical short guidance; casual prompts are untouched", async () => {
  const apply = await openCodePrompt();
  for (const prompt of ["fix the parser", "crowd: add an editor", "use code4me to investigate",
    "update code4me-ntg/v3 to the current contract"]) {
    assert.equal(guidance(prompt), PRODUCER_GUIDANCE);
    const enriched = await apply(prompt);
    assert.equal(enriched, prompt + "\n\n" + PRODUCER_GUIDANCE);
    assert.equal(await apply(enriched), enriched);
  }
  for (const prompt of ["hello", "thank you", ""]) {
    assert.deepEqual(run("envelope", { prompt }), {});
    assert.equal(await apply(prompt), prompt);
  }
  assert.ok(ENVELOPE_GUIDANCE.length < 2200);
  assert.ok(PRODUCER_GUIDANCE.length < 1500);
});

test("source fallback guidance remains advisory and respects narrow reads", () => {
  const output = run("source", { tool_name: "Read", tool_input: { file_path: "/project/src/parser.rs" } });
  assert.match(output.hookSpecificOutput.additionalContext, /CodeGraph/);
  assert.equal("permissionDecision" in output.hookSpecificOutput, false);
  assert.deepEqual(run("source", { tool_name: "Read", tool_input: { file_path: "/project/src/parser.rs", offset: 20, limit: 30 } }), {});
  const invalid = spawnSync(process.execPath, [hook, "envelope"], { input: "{bad", encoding: "utf8" });
  assert.equal(invalid.status, 0);
  assert.deepEqual(JSON.parse(invalid.stdout), {});
});
