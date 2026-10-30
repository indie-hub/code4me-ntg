import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const identity = ["protocol", "milestone_id", "task_id", "stage_id", "stage", "worker", "vendor"];
const stages = ["implement", "draft", "challenge", "finish", "repair", "verify", "audit", "research"];
const taskFields = ["required_skill", "route", "risk", "producer", "assigned_role", "delegation",
  "goal", "intent", "acceptance", "constraints", "context_refs", "memory", "reply_to",
  "verification", "quality_bar", "system_one", "draft", "prior_result"];
const resultFields = ["outcome", "summary", "files_changed", "checks", "blocker", "intent_alignment",
  "verdict", "findings", "resolutions", "largest_gap", "deferred_work", "tool_evidence",
  "decision_receipts", "memory_candidates"];
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const text = (value) => typeof value === "string" && value.trim().length > 0;
function requireThat(condition, message) {
  if (!condition) throw new Error(message);
}
function fields(value, keys, label) {
  requireThat(object(value), `${label} must be an object`);
  for (const key of keys) requireThat(Object.hasOwn(value, key), `${label} missing ${key}`);
}

function readEnvelope(path) {
  const bytes = readFileSync(path);
  let value;
  try {
    value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new Error("artifact must be valid UTF-8 JSON");
  }
  fields(value, [...identity, "type", "target"], "envelope");
  requireThat(value.protocol === "code4me-ntg/v4", "unsupported protocol");
  requireThat(["task", "result"].includes(value.type), "type must be task or result");
  for (const key of identity) requireThat(text(value[key]), `${key} must be a nonempty string`);
  requireThat(stages.includes(value.stage), "unsupported stage");
  requireThat(/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(value.stage_id), "stage_id must be filesystem-safe");
  requireThat(value.stage_id !== value.task_id, "stage_id must differ from task_id");
  requireThat(object(value.target) && (text(value.target.commit) || text(value.target.fingerprint)),
    "target needs a commit or fingerprint");
  const review = ["challenge", "verify"].includes(value.stage);
  if (value.type === "task") {
    fields(value, taskFields, "task");
    requireThat(value.required_skill === "code4me" && value.delegation === "forbidden",
      "task requires code4me and delegation forbidden");
    requireThat(["direct", "draft"].includes(value.route), "unsupported route");
    requireThat(["normal", "critical"].includes(value.risk), "unsupported risk");
    for (const key of ["producer", "assigned_role", "goal"]) requireThat(text(value[key]), `${key} must be nonempty`);
    fields(value.intent, ["request", "outcome", "example", "boundaries", "assumptions"], "intent");
    for (const key of ["request", "outcome", "example"]) requireThat(text(value.intent[key]), `intent.${key} must be nonempty`);
    for (const key of ["boundaries", "assumptions"]) requireThat(Array.isArray(value.intent[key]), `intent.${key} must be an array`);
    for (const key of ["acceptance", "constraints", "context_refs"]) requireThat(Array.isArray(value[key]), `${key} must be an array`);
    requireThat(value.acceptance.length > 0, "acceptance must not be empty");
    fields(value.memory, ["status", "searched", "refs"], "memory");
    requireThat(["used", "empty", "unavailable"].includes(value.memory.status), "unsupported memory status");
    requireThat(Array.isArray(value.memory.refs), "memory.refs must be an array");
    requireThat(value.memory.searched === (value.memory.status !== "unavailable"), "memory search status mismatch");
    if (value.memory.status === "unavailable") requireThat(text(value.memory.reason), "unavailable memory needs a reason");
    if (value.memory.status === "used") requireThat(value.memory.refs.length > 0, "used memory needs references");
    fields(value.reply_to, ["transport", "room_number", "command"], "reply_to");
    requireThat(text(value.reply_to.transport), "reply_to.transport must be nonempty");
    if (value.route === "draft") {
      fields(value.draft, ["question", "demonstration", "stop_when", "postponed"], "draft");
    } else requireThat(value.draft === null, "direct route needs draft null");
    if (review) requireThat(text(value.prior_result) || object(value.prior_result), "review needs prior_result path or object");
  } else {
    fields(value, resultFields, "result");
    requireThat(["complete", "blocked", "failed"].includes(value.outcome), "unsupported outcome");
    requireThat(text(value.summary), "summary must be nonempty");
    for (const key of ["files_changed", "checks", "findings", "resolutions", "deferred_work",
      "tool_evidence", "decision_receipts", "memory_candidates"]) requireThat(Array.isArray(value[key]), `${key} must be an array`);
    if (value.outcome === "complete") {
      requireThat(value.tool_evidence.length > 0 && value.tool_evidence.every((item) =>
        object(item) && ["tool", "action", "result"].every((key) => text(item[key]))),
      "complete result needs tool evidence");
    }
    if (review) {
      const verdicts = value.stage === "challenge" ? ["proceed", "rethink", "blocked"] : ["pass", "changes_requested", "blocked"];
      requireThat(verdicts.includes(value.verdict), "unsupported review verdict");
      requireThat(["aligned", "partly_aligned", "misaligned", "unclear"].includes(value.intent_alignment), "review needs intent alignment");
      if (["pass", "proceed"].includes(value.verdict)) {
        requireThat(value.outcome === "complete" && value.intent_alignment === "aligned", "passing review must be complete and aligned");
        requireThat(!value.findings.some((finding) => finding?.priority === "required" && finding.status !== "resolved"),
          "passing review has unresolved required findings");
      }
    } else if (value.stage !== "audit") requireThat(value.verdict === null, "non-review verdict must be null");
  }
  return { value, sha256: createHash("sha256").update(bytes).digest("hex") };
}

export function receipt(path, taskPath) {
  const { value, sha256 } = readEnvelope(path);
  if (taskPath) {
    const task = readEnvelope(taskPath).value;
    requireThat(value.type === "result" && task.type === "task", "--task requires a result and a task");
    for (const key of identity) requireThat(value[key] === task[key], `task/result mismatch: ${key}`);
  }
  return { file: resolve(path), sha256, type: value.type,
    ...Object.fromEntries(identity.map((key) => [key, value[key]])) };
}

let invokedFile;
try { invokedFile = realpathSync(process.argv[1]); } catch {}
if (invokedFile === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    requireThat(args.length === 1 || (args.length === 3 && args[1] === "--task"),
      "usage: node evidence.mjs FILE.json [--task TASK.json]");
    console.log(JSON.stringify(receipt(args[0], args[2])));
  } catch (error) {
    console.error(`evidence: ${error.message}`);
    process.exitCode = 1;
  }
}
