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
producer: room-1
worker: room-2
delegation: forbidden
goal: fix the parser
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
  assert.match(hookOutput.additionalContext, /search Basic Memory for relevant gaps/);
  assert.match(hookOutput.additionalContext, /memory\.searched true/);
  assert.match(hookOutput.additionalContext, /Always return memory_candidates/);
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
  assert.deepEqual(run("envelope", { prompt: "fix the parser" }), {});
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

test("OpenCode appends guidance only to incoming envelopes", async () => {
  const plugin = await Code4Me();
  const message = { parts: [{ type: "text", text: envelope }] };
  await plugin["chat.message"]({}, message);
  assert.match(message.parts[0].text, /Code4Me task envelope detected/);
  assert.match(message.parts[0].text, /Source comments explain code only/);
  assert.match(message.parts[0].text, /deferred_work in the result envelope/);
  assert.match(message.parts[0].text, /Actually open every supplied memory:\/\/ reference/);
  assert.match(message.parts[0].text, /Always return memory_candidates/);
  assert.match(message.parts[0].text, /Code4Me Technical English profile/);
  assert.match(message.parts[0].text, /Preserve code, commands, paths, logs, error messages, and quotations exactly/);

  const ordinary = { parts: [{ type: "text", text: "fix the parser" }] };
  await plugin["chat.message"]({}, ordinary);
  assert.equal(ordinary.parts[0].text, "fix the parser");
});
