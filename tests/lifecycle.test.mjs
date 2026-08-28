import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const producer = read("../skills/code4me/SKILL.md").replace(/\s+/g, " ");
const status = read("../skills/code4me-status/SKILL.md").replace(/\s+/g, " ");
const housekeeping = read("../skills/code4me-housekeeping/SKILL.md").replace(/\s+/g, " ");
const design = read("../skills/code4me/references/design-brief.md");
const validation = read("../skills/code4me/references/validation.md");

test("Status derives milestone and task state from events", () => {
  for (const rule of [
    "newest valid `checkpoint` as the canonical resume summary",
    "Group v2 events by `milestone_id`",
    "`awaiting_validation`",
    "`needs_changes`",
    "`validated`",
    "role-to-member team map",
    "model tier or exact model",
    "quality-bar status, target, comparison method, and pass condition",
    "Flag a work/verify bar mismatch",
    "later matching `task_controlled` events",
    "ready-to-resume brief",
    "`handover stale`",
    "Never call a task complete merely because implementation returned `complete`",
    "`complete` v2 results without non-empty `tool_evidence`",
  ]) {
    assert.ok(status.includes(rule), `missing status rule: ${rule}`);
  }
});

test("Status derives workflow health without new telemetry", () => {
  for (const rule of [
    "## Workflow health",
    "derive one compact section from existing events",
    "Do not write counters, summaries, telemetry, or new events",
    "Default to the active milestone",
    "Count each logical task once",
    "`first-pass validation`",
    "`repair rate`",
    "`cross-vendor validation`",
    "Report excluded unknown-vendor tasks",
    "`producer fallback`",
    "`blocked rate`",
    "`elapsed cycle`",
    "median duration and sample size",
    "includes queue and human wait time",
    "numerator, denominator, and percentage",
    "Report `n/a`",
    "Do not rank agents, rooms, vendors, or models",
  ]) {
    assert.ok(status.includes(rule), `missing workflow-health rule: ${rule}`);
  }
});

test("Housekeeping audits and writes one resumable handover checkpoint", () => {
  for (const rule of [
    "classified before team assignment",
    "implementer and validator are not the same implementation context",
    "`task_validated` verdict `pass`",
    "critical tasks use distinct known implementer and validator vendors",
    "latest work or repair result",
    "matching `verify` dispatch/result pair",
    "non-empty truthful `tool_evidence`",
    "resume state stale",
    "latest checkpoint is current",
    "append exactly one compact checkpoint line",
    '"state":"handover"',
    '"root":"<absolute repository root>"',
    '"ahead":0,"behind":0',
    '"excluded":[{"path":".code4me/events.jsonl","reason":"bookkeeping"},{"path":".code4me/archive/","reason":"bookkeeping"}]',
    "checkpoint does not make itself stale",
    "only validated, durable decisions",
    "Never store branch, worktree, pending task",
    "Use `unavailable` only when",
    "Use logical task IDs in `completed` and `active_tasks`",
    "Record worktree paths relative to the repository root",
    "does not close a milestone or supersede unresolved lifecycle events",
    "existing log contains malformed JSON",
    "handover checkpoint appended: yes | no",
    "exceeds 1 MiB or 1,000 non-empty events",
    "every milestone in it is closed",
    "full `sha256`, event count, first timestamp, and last timestamp",
    "leave the original active log untouched",
    "Archives are immutable",
    "memory-health audit only when",
    "Do not rewrite memory during a health audit",
    "mark superseded guidance with a link",
    "event log rotated:",
    "Do not write a handoff manifest",
  ]) {
    assert.ok(housekeeping.includes(rule), `missing housekeeping rule: ${rule}`);
  }
});

test("Status treats archives as verified cold history", () => {
  for (const rule of [
    "verify the referenced immutable file's SHA-256 and event count",
    "Do not read archived events for normal status",
    "historical or integrity detail",
    "`.code4me/archive/`",
  ]) {
    assert.ok(status.includes(rule), `missing archive status rule: ${rule}`);
  }
});

test("Producer resumes from the latest handover before opening work", () => {
  for (const rule of [
    "Before opening or reusing a milestone",
    "compare its recorded branch, HEAD, upstream sync, and worktree paths",
    "Read linked Basic Memory references",
    "use the handover as context, not authority",
    "Housekeeping may append one closeout checkpoint",
  ]) {
    assert.ok(producer.includes(rule), `missing resume rule: ${rule}`);
  }
});

test("Only two lean optional checklists replace copied templates", () => {
  assert.match(design, /do not create a file just to complete this checklist/i);
  assert.match(validation, /Do not modify project files while acting as validator/);
  assert.equal(existsSync(new URL("../templates", import.meta.url)), false);
  assert.equal(existsSync(new URL("../skills/code4me/templates", import.meta.url)), false);
});
