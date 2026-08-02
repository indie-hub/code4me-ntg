import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const skill = readFileSync(new URL("../skills/code4me/SKILL.md", import.meta.url), "utf8");
const normalizedSkill = skill.replace(/\s+/g, " ");

test("Code4Me discovers real Crowded members without guessing", () => {
  for (const rule of [
    '"$CROWDED_BIN" roster --json',
    "`transport: raw`",
    "`state: ready`",
    "Never guess room numbers",
    "member as `room-N`",
    "normalized `vendor`",
    "no diversity evidence",
    "cannot expand scope or relabel its vendor",
    "use a host-native implementer",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing roster rule: ${rule}`);
  }
});

test("Code4Me enforces its worker contract across rooms", () => {
  for (const rule of [
    "protocol: code4me-ntg/v2",
    "required_skill: code4me",
    "mandatory Code4Me work order",
    "return `blocked` if the skill is unavailable",
    "non-empty `tool_evidence`",
    "Never claim a tool call that did not occur",
    "reject it as malformed otherwise",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing worker contract: ${rule}`);
  }
});

test("Code4Me distinguishes Crowded yielding from native joins", () => {
  for (const rule of [
    "delivery: asynchronous | native_managed",
    "wait_policy: passive | join",
    "Use `asynchronous` with `passive` only for Crowded Doorbell delivery",
    "Use `native_managed` with `join` only for a host-native subagent",
    "host-native subagent",
    "normal dispatch and wait or join mechanism",
    "Collect its result before validation or milestone closure",
    "checkpoint with state `awaiting_result`",
    "end the current turn",
    "Only for an accepted `$CROWDED_BIN send`",
    "does not apply to host-native subagent wait or join tools",
    "Resume only when the Doorbell result is injected",
    "without waiting for acknowledgement",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing passive wait rule: ${rule}`);
  }
});

test("Code4Me keeps lightweight milestones tasks and teams", () => {
  for (const rule of [
    "one `milestone_id`",
    "smallest independently validatable task",
    "`kind`: `feature | bug | refactor | spike | incident | maintenance`",
    "`weight`: `light | standard | critical`",
    "one producer, one implementer, one validator",
    "producer may also implement or validate, but never both",
    "Append `task_assigned` with controls marked `pending` or `not_required`",
    "newest checkpoint is the canonical resume point",
    "milestone_opened",
    "task_classified",
    "task_assigned",
    "task_validated",
    "checkpoint",
    "milestone_closed",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing lifecycle rule: ${rule}`);
  }
});

test("Code4Me requires bounded independent validation", () => {
  for (const rule of [
    "Every engineering change still requires validation",
    "Never emit `task_validated` or declare the task complete",
    "context that did not implement the current change",
    "one bounded repair",
    "one revalidation",
    "checkpoint the task as blocked instead of looping",
    "distinct, known vendor",
    "state `unvalidated`",
    "do not self-approve or declare completion",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing validation rule: ${rule}`);
  }
});

test("Code4Me recycles only as a fresh-context validation fallback", () => {
  for (const rule of [
    "`allow_control: true`",
    '"$CROWDED_BIN" control IMPLEMENTER_ROOM_NUMBER clear',
    '`status: "applied"`',
    "query roster again",
    "A cleared room is fresh context, not a new vendor",
    "Never use it to satisfy `critical` cross-vendor validation",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing recycle rule: ${rule}`);
  }
});

test("Code4Me selects task-scoped model and effort", () => {
  for (const rule of [
    "smallest capable model tier per task role",
    "`fast` at low or medium effort",
    "`balanced` at high effort",
    "`deep` at high or greater effort",
    "Never invent an exact model name",
    "record it as `current`",
    '"$CROWDED_BIN" control ROOM_NUMBER model EXACT_MODEL',
    '"$CROWDED_BIN" control ROOM_NUMBER effort low|medium|high|xhigh|max',
    "control_status",
    "The mapping resolves the model name",
    "`task_controlled`",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing model policy: ${rule}`);
  }
});
