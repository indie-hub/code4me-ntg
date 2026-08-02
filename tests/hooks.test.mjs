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

const envelope = `protocol: code4me-ntg/v2
required_skill: code4me
delivery: asynchronous
wait_policy: passive
task_id: C4M-1
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
  assert.match(hookOutput.additionalContext, /tool_evidence/);
  assert.match(hookOutput.additionalContext, /reply_to\.transport is crowded/i);
  assert.match(hookOutput.additionalContext, /do not launch a background waiter/i);
  assert.match(hookOutput.additionalContext, /reply_to\.transport is native/i);
  assert.match(hookOutput.additionalContext, /producer must join the native subagent/i);
  assert.equal("permissionDecision" in hookOutput, false);
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

  const ordinary = { parts: [{ type: "text", text: "fix the parser" }] };
  await plugin["chat.message"]({}, ordinary);
  assert.equal(ordinary.parts[0].text, "fix the parser");
});
