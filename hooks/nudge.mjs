#!/usr/bin/env node

import { pathToFileURL } from "node:url";

export const ENVELOPE_MARKER = "Code4Me task envelope detected.";
export const PRODUCER_MARKER = "Code4Me producer check.";

export const PRODUCER_GUIDANCE = `${PRODUCER_MARKER}
Keep the main context orchestration-only. Before you classify, assign, or dispatch any task, consult Basic Memory, make one targeted search, and record used, empty, or unavailable with truthful evidence. Use System 1 to recommend task shape, the cheapest capable eligible worker, model tier, effort, validation route, and relevant invariants. Use System 2 before consequential or uncertain decisions. Before you implement, repair, investigate, or validate, check the Crowded roster and native subagent availability. Delegate to the smallest capable eligible fresh context. If you implemented the change, you must not validate it. Reserve an independent validator before implementation. Do producer work inline only after you record the applicable fallback.`;

export const ENVELOPE_GUIDANCE = `${ENVELOPE_MARKER}
Mandatory worker contract: load and follow the installed code4me skill's Incoming worker contract before acting. If that skill is unavailable, return blocked instead of silently bypassing it. Execute this task here; delegation is forbidden. Before planning, read every supplied context_refs entry, including project instructions and conditional language or platform guidance, plus every supplied Basic Memory memory:// reference. If memory.status is empty or unavailable, continue and preserve that status. Basic Memory is durable prior knowledge; .code4me/events.jsonl is task correlation; Context Mode is working-context processing. Return the same milestone, task, and stage IDs, non-empty truthful tool_evidence, and any durable evidenced memory_candidates. If reply_to.transport is crowded, end the turn after the accepted result send and do not launch a background waiter or poll for acknowledgement. If reply_to.transport is native, return the result normally; the producer must join the native subagent.
Actually open every supplied memory:// reference before planning. For every task, make one targeted Basic Memory search for relevant gaps when available; report truthful Basic Memory tool evidence or an unavailable reason. memory.status used or empty requires memory.searched true; unavailable requires false and a reason. Do not begin work until this consultation is complete. Always return memory_candidates, using [] when no durable lesson was found.
Use worker System 1 for the cheapest reversible next action within the contract. Use System 2 when risk, uncertainty, irreversibility, scope, or the contract changes.
Treat assigned_role, goal, acceptance, constraints, verification, including each invariant, and quality_bar as the producer's stage contract. Do not change them silently. Run every applicable verification command and invariant check, and report exact results in checks; a required failure prevents outcome complete. If the contract is unsafe, inconsistent, or impossible, return blocked or changes_requested with evidence. The validator decides the verdict independently.
Source comments explain code only. Never put task or milestone IDs, status, TODO/FIXME items, plans, progress, deferred work, or handover notes in source comments. Return such information through deferred_work in the result envelope.
Use the Code4Me Technical English profile for all technical and operational communication. Use short active-voice sentences, one action or idea per sentence, consistent terms, and explicit actors, artifacts, and expected results. Do not use idioms or vague references. Preserve code, commands, paths, logs, error messages, and quotations exactly.
Toolbox: Basic Memory=past decisions and lessons; CodeGraph=exact structure; CCC=semantic source discovery; Context Mode=large derived or non-source output; narrow native reads when cheaper.`;

const SOURCE_EXTENSIONS = /\.(?:c|cc|cpp|cs|go|h|hpp|java|js|jsx|kt|mjs|py|rb|rs|sh|swift|ts|tsx)(?:$|[\s"'])/i;

export function isCode4MeEnvelope(text) {
  return /\btask_id\s*:/i.test(text)
    && /\bdelegation\s*:\s*forbidden\b/i.test(text)
    && /\bgoal\s*:/i.test(text);
}

export function isProducerPrompt(text) {
  return !isCode4MeEnvelope(text)
    && (/(?:^|\s)crowd:/i.test(text)
      || /\b(?:code4me|build|implement|fix|repair|refactor|audit|validate|test|investigate|review)\b/i.test(text));
}

function textContent(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textContent).join("\n");
  if (value && typeof value === "object") return Object.values(value).map(textContent).join("\n");
  return "";
}

function sourceNudge(payload) {
  const tool = String(payload.tool_name ?? payload.toolName ?? "").toLowerCase();
  const input = payload.tool_input ?? payload.toolInput ?? payload.input ?? {};
  const path = String(input.file_path ?? input.path ?? "");
  let broad = false;

  if (tool === "read" || tool === "read_file") {
    broad = SOURCE_EXTENSIONS.test(path) && input.offset == null && input.limit == null;
  } else if (tool === "grep" || tool === "grep_files") {
    const target = String(input.path ?? input.glob ?? input.type ?? "");
    broad = /^[A-Za-z_][A-Za-z0-9_]{2,}$/.test(String(input.pattern ?? input.query ?? ""))
      && (!target || SOURCE_EXTENSIONS.test(target) || /^(?:\.|src|lib)$/.test(target));
  } else if (tool === "glob") {
    broad = String(input.pattern ?? "").includes("**") && SOURCE_EXTENSIONS.test(String(input.pattern ?? ""));
  } else if (["bash", "local_shell", "shell", "shell_command", "exec_command"].includes(tool)) {
    const command = String(input.command ?? input.cmd ?? "");
    broad = /(?:^|[;&|]\s*|\s)(?:rg|grep|find)\s/.test(command)
      && (SOURCE_EXTENSIONS.test(command) || /(?:^|\s)(?:\.|src|lib)(?:\s|$)/.test(command));
  }

  if (!broad) return null;
  return "Broad source fallback detected. Use CodeGraph for exact symbols/callers/impact or CCC for semantic discovery when available; use a narrow native read when the target is already known. Context Mode is for large derived or non-source output. This is advisory only.";
}

function output(event, message) {
  return message
    ? { hookSpecificOutput: { hookEventName: event, additionalContext: message } }
    : {};
}

async function main() {
  let payload = {};
  try {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    payload = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    process.stdout.write("{}");
    return;
  }

  if (process.argv[2] === "envelope") {
    const text = textContent(payload);
    const guidance = isCode4MeEnvelope(text)
      ? ENVELOPE_GUIDANCE
      : isProducerPrompt(text) ? PRODUCER_GUIDANCE : null;
    process.stdout.write(JSON.stringify(output(
      "UserPromptSubmit",
      guidance,
    )));
    return;
  }

  process.stdout.write(JSON.stringify(output("PreToolUse", sourceNudge(payload))));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
