#!/usr/bin/env node

import { pathToFileURL } from "node:url";

export const ENVELOPE_MARKER = "Code4Me task envelope detected.";
export const PRODUCER_MARKER = "Code4Me producer check.";

export const PRODUCER_GUIDANCE = "Code4Me producer check.\nLoad the installed code4me skill. Capture original intent, consult Basic Memory, and choose direct work or a bounded runnable draft only when uncertainty warrants it. Delegate building to an eligible room or native subagent and reserve independent cross-vendor validation. Keep the main context for coordination. Confirm effective settings after controls and preserve stage-specific results. A challenge permits finishing, never production acceptance. Use System One only to eliminate named expensive work. Recover required Headroom originals through /v1/retrieve/<hash> and read original_content.";
export const ENVELOPE_GUIDANCE = "Code4Me task envelope detected.\nLoad the installed code4me skill and its Incoming worker contract; return blocked if unavailable. Read original intent, context_refs, and supplied Basic Memory references before planning. Execute only the assigned v4 stage here; delegation is forbidden. A draft proves its declared claim, a read-only challenge checks direction, and final verify requires correctness and intent alignment. Keep finding IDs and return truthful checks, tool_evidence, resolutions, decision_receipts, memory_candidates, and deferred_work with matching IDs and exact target. Retrieve required Headroom originals at /v1/retrieve/<hash> and read original_content; a marker is not evidence. Before expensive exploration, consider System One context shortlisting or probe selection using the provider reference. Source comments explain code only. Follow the Code4Me Technical English profile. After an accepted Crowded result send, end the turn without polling; native results return normally for the producer to join.";
export const INVALID_GUIDANCE = "Code4Me task contract unavailable or invalid. Return blocked. Load the current code4me skill and request a code4me-ntg/v4 task with type task, required_skill code4me, delegation forbidden, task_id, stage_id, and goal. Do not translate legacy IDs or execute an unsupported envelope.";

const SOURCE_EXTENSIONS = /\.(?:c|cc|cpp|cs|go|h|hpp|java|js|jsx|kt|mjs|py|rb|rs|sh|swift|ts|tsx)(?:$|[\s"'])/i;

function envelopeHeader(text) {
  try {
    const value = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return Object.fromEntries([...text.matchAll(/^(protocol|type|required_skill|task_id|stage_id|delegation|goal):\s*(.*?)\s*$/gm)]
      .map(([, key, value]) => [key, value.replace(/^(["'])(.*)\1$/, "$2")]));
  }
}

export function isCode4MeEnvelope(text) {
  const header = envelopeHeader(text);
  return header.protocol === "code4me-ntg/v4" && header.type === "task"
    && header.required_skill === "code4me" && header.delegation === "forbidden"
    && typeof header.task_id === "string" && header.task_id.trim().length > 0
    && typeof header.stage_id === "string" && header.stage_id.trim().length > 0
    && typeof header.goal === "string" && header.goal.trim().length > 0;
}

function looksLikeTask(text) {
  const header = envelopeHeader(text);
  if (header.type === "result") return false;
  return header.required_skill === "code4me"
    || (typeof header.protocol === "string" && /^code4me-ntg\/v\d+$/.test(header.protocol));
}

export function isProducerPrompt(text) {
  return !looksLikeTask(text)
    && (/(?:^|\s)crowd:/i.test(text)
      || /\b(?:code4me|build|implement|fix|repair|refactor|audit|validate|test|investigate|review)\b/i.test(text));
}

function textContent(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textContent).join("\n");
  if (value && typeof value === "object") {
    if (value.required_skill === "code4me") return JSON.stringify(value);
    return Object.values(value).map(textContent).join("\n");
  }
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
      : looksLikeTask(text) ? INVALID_GUIDANCE : isProducerPrompt(text) ? PRODUCER_GUIDANCE : null;
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
