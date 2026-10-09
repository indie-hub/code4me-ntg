import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { Code4Me } from "../.opencode/plugins/code4me.mjs";

const hook = fileURLToPath(new URL("../hooks/nudge.mjs", import.meta.url));

function run(mode, payload) {
  const result = spawnSync(process.execPath, [hook, mode], {
    input: JSON.stringify(payload),
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

const envelope = `protocol: code4me-ntg/v3
required_skill: code4me
delivery: asynchronous
wait_policy: passive
milestone_id: M1
task_id: M1-T1
stage_id: M1-T1-work-1
assigned_role: implementer
producer: room-1
worker: room-2
delegation: forbidden
goal: fix the parser
verification:
  commands: [node --test]
  evidence: [test output]
reply_to:
  transport: crowded
memory:
  status: used
  refs: [memory://project/parser]`;

test("incoming envelopes enforce the Code4Me worker contract", () => {
  const output = run("envelope", { prompt: envelope });
  const hookOutput = output.hookSpecificOutput;
  assert.equal(hookOutput.hookEventName, "UserPromptSubmit");
  assert.match(hookOutput.additionalContext, /Basic Memory/);
  assert.match(hookOutput.additionalContext, /delegation is forbidden/);
  assert.match(hookOutput.additionalContext, /load and follow the installed code4me skill/i);
  assert.match(hookOutput.additionalContext, /Incoming worker contract/);
  assert.match(hookOutput.additionalContext, /return blocked/i);
  assert.match(hookOutput.additionalContext, /every supplied context_refs entry/i);
  assert.match(hookOutput.additionalContext, /conditional language or platform guidance/i);
  assert.match(hookOutput.additionalContext, /tool_evidence/);
  assert.match(hookOutput.additionalContext, /reply_to\.transport is crowded/i);
  assert.match(hookOutput.additionalContext, /do not launch a background waiter/i);
  assert.match(hookOutput.additionalContext, /reply_to\.transport is native/i);
  assert.match(hookOutput.additionalContext, /producer must join the native subagent/i);
  assert.match(hookOutput.additionalContext, /Source comments explain code only/);
  assert.match(hookOutput.additionalContext, /deferred_work in the result envelope/);
  assert.match(hookOutput.additionalContext, /same milestone, task, and stage IDs/);
  assert.match(hookOutput.additionalContext, /Actually open every supplied memory:\/\/ reference/);
  assert.match(hookOutput.additionalContext, /For every task, make one targeted Basic Memory search/);
  assert.match(hookOutput.additionalContext, /memory\.searched true/);
  assert.match(hookOutput.additionalContext, /Always return memory_candidates/);
  assert.match(hookOutput.additionalContext, /Use worker System 1 for the cheapest reversible next action/);
  assert.match(hookOutput.additionalContext, /Use System 2 when risk, uncertainty, irreversibility, scope, or the contract changes/);
  assert.match(hookOutput.additionalContext, /Read the system_one descriptor/);
  assert.match(hookOutput.additionalContext, /Shadow advice never controls the action/);
  assert.match(hookOutput.additionalContext, /Return decision_receipts for claimed calls/);
  assert.match(hookOutput.additionalContext, /Agent-supplied evidence cannot be verified/);
  assert.match(hookOutput.additionalContext, /verification, including each invariant, and quality_bar/);
  assert.match(hookOutput.additionalContext, /Run every applicable verification command and invariant check/);
  assert.match(hookOutput.additionalContext, /Run every applicable verification command/);
  assert.match(hookOutput.additionalContext, /required failure prevents outcome complete/);
  assert.match(hookOutput.additionalContext, /validator decides the verdict independently/i);
  assert.match(hookOutput.additionalContext, /Code4Me Technical English profile/);
  assert.match(hookOutput.additionalContext, /Preserve code, commands, paths, logs, error messages, and quotations exactly/);
  assert.equal("permissionDecision" in hookOutput, false);
  assert.equal(
    run("envelope", {
      prompt: envelope
        .replace("code4me-ntg/v3", "code4me-ntg/v2")
        .replace("milestone_id: M1\n", "")
        .replace("task_id: M1-T1\nstage_id: M1-T1-work-1", "task_id: M1-T1-work-1\nparent_task_id: M1-T1"),
    }).hookSpecificOutput.hookEventName,
    "UserPromptSubmit",
  );
  const producer = run("envelope", { prompt: "fix the parser" });
  assert.match(producer.hookSpecificOutput.additionalContext, /Code4Me producer check/);
  assert.match(producer.hookSpecificOutput.additionalContext, /Crowded roster and native subagent availability/);
  assert.match(producer.hookSpecificOutput.additionalContext, /must not validate/);
  assert.match(producer.hookSpecificOutput.additionalContext, /consult Basic Memory, make one targeted search/);
  assert.match(producer.hookSpecificOutput.additionalContext, /Use System 1 to recommend task shape/);
  assert.match(producer.hookSpecificOutput.additionalContext, /Discover any callable System One provider/);
  assert.match(producer.hookSpecificOutput.additionalContext, /default it to shadow mode/);
  assert.match(producer.hookSpecificOutput.additionalContext, /declaration alone does not prove use/i);
  assert.match(producer.hookSpecificOutput.additionalContext, /Use System 2 before consequential or uncertain decisions/);
  assert.deepEqual(run("envelope", { prompt: "hello" }), {});
});

test("only broad source fallbacks receive advisory guidance", () => {
  const broad = run("source", {
    tool_name: "Read",
    tool_input: { file_path: "/project/src/parser.rs" },
  });
  assert.match(broad.hookSpecificOutput.additionalContext, /CodeGraph/);
  assert.equal("permissionDecision" in broad.hookSpecificOutput, false);
  assert.deepEqual(run("source", {
    tool_name: "Read",
    tool_input: { file_path: "/project/src/parser.rs", offset: 20, limit: 30 },
  }), {});
});

test("OpenCode appends worker or producer guidance when applicable", async () => {
  const plugin = await Code4Me();
  const message = { parts: [{ type: "text", text: envelope }] };
  await plugin["chat.message"]({}, message);
  assert.match(message.parts[0].text, /Code4Me task envelope detected/);
  assert.match(message.parts[0].text, /Source comments explain code only/);
  assert.match(message.parts[0].text, /deferred_work in the result envelope/);
  assert.match(message.parts[0].text, /Actually open every supplied memory:\/\/ reference/);
  assert.match(message.parts[0].text, /Always return memory_candidates/);
  assert.match(message.parts[0].text, /Use worker System 1 for the cheapest reversible next action/);
  assert.match(message.parts[0].text, /Read the system_one descriptor/);
  assert.match(message.parts[0].text, /Return decision_receipts for claimed calls/);
  assert.match(message.parts[0].text, /verification, including each invariant, and quality_bar/);
  assert.match(message.parts[0].text, /Run every applicable verification command and invariant check/);
  assert.match(message.parts[0].text, /Run every applicable verification command/);
  assert.match(message.parts[0].text, /validator decides the verdict independently/i);
  assert.match(message.parts[0].text, /Code4Me Technical English profile/);
  assert.match(message.parts[0].text, /Preserve code, commands, paths, logs, error messages, and quotations exactly/);

  const ordinary = { parts: [{ type: "text", text: "fix the parser" }] };
  await plugin["chat.message"]({}, ordinary);
  assert.match(ordinary.parts[0].text, /Code4Me producer check/);
  assert.match(ordinary.parts[0].text, /must not validate/);
  assert.match(ordinary.parts[0].text, /consult Basic Memory, make one targeted search/);
  assert.match(ordinary.parts[0].text, /Use System 1 to recommend task shape/);
  assert.match(ordinary.parts[0].text, /Discover any callable System One provider/);
  assert.match(ordinary.parts[0].text, /default it to shadow mode/);

  const casual = { parts: [{ type: "text", text: "hello" }] };
  await plugin["chat.message"]({}, casual);
  assert.equal(casual.parts[0].text, "hello");
});
