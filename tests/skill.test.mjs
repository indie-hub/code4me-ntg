import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const skill = readFileSync(new URL("../skills/code4me/SKILL.md", import.meta.url), "utf8");
const normalizedSkill = skill.replace(/\s+/g, " ");
const contextSelection = readFileSync(
  new URL("../skills/code4me/references/context-selection.md", import.meta.url),
  "utf8",
);
const validation = readFileSync(
  new URL("../skills/code4me/references/validation.md", import.meta.url),
  "utf8",
).replace(/\s+/g, " ");
const toolbox = readFileSync(
  new URL("../skills/code4me/references/toolbox.md", import.meta.url),
  "utf8",
).replace(/\s+/g, " ");

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
    "protocol: code4me-ntg/v3",
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
    "Keep one task when one implementer can make one coherent change",
    "Never split merely to create roles or bookkeeping",
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

test("Code4Me keeps project management out of source comments", () => {
  for (const rule of [
    "Source comments explain code only",
    "Never put task or milestone IDs",
    "TODO/FIXME items",
    "comment_policy: >",
    "deferred_work: [<follow-up item or empty>]",
    "task_id: <logical task id>",
    "stage_id: <unique dispatch stage id>",
    "milestone_id: <same milestone id>",
    "stage_id: <same dispatch stage id>",
    "Accept incoming v2 envelopes for compatibility",
    "send it through the bounded repair path",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing comment policy: ${rule}`);
  }
  assert.ok(validation.includes("project-management source comments"));
  assert.ok(validation.includes("`changes_requested` even when runtime behavior passes"));
  assert.match(skill, /expected_return:\n  milestone_id:[\s\S]*\n  findings:[^\n]*\n  deferred_work:/);
});

test("Code4Me makes Basic Memory use observable", () => {
  for (const rule of [
    "actually search shared **Basic Memory**",
    "Do not merely mention memory or rely on recollection",
    "`used` and `empty` require a completed search",
    "searched: true | false",
    "require a `Basic Memory` evidence entry",
    "Actually open every supplied `memory://` reference",
    "must return `memory_candidates`, using `[]`",
    "- tool: Basic Memory",
    '"tool":"Basic Memory"',
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing memory rule: ${rule}`);
  }
  assert.ok(toolbox.includes("searches relevant gaps when memory is available"));
  assert.ok(toolbox.includes("reports truthful `Basic Memory` tool evidence"));
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

test("Code4Me carries project instructions without owning them", () => {
  for (const rule of [
    "project-root `AGENTS.md` and `CLAUDE.md`",
    "nearest scoped instruction file",
    "Do not create, overwrite, merge, or synchronize",
    "Put the selected paths in `context_refs`",
    "project-instruction, conditional, and Basic Memory references",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing project-guidance rule: ${rule}`);
  }
  for (const rule of [
    "The user's current request wins",
    "Project instructions win over the generic references",
    "materially disagree",
    "Their absence is not an error",
  ]) {
    assert.ok(contextSelection.includes(rule), `missing instruction precedence: ${rule}`);
  }
});

test("Code4Me recommends specialists without permanent roles", () => {
  for (const rule of [
    "Recommend a specialist only when a bounded question needs expertise",
    "`architect`",
    "`researcher`",
    "`security-reviewer`",
    "`qa`",
    "Announce each recommendation and its reason",
    "never replaces the validator",
    "never permanently bound to a room, model, or vendor",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing specialist rule: ${rule}`);
  }
});

test("Code4Me loads only matching language and environment references", () => {
  const references = [
    "rust.md",
    "javascript-typescript.md",
    "python.md",
    "swift.md",
    "csharp.md",
    "cpp.md",
    "windows.md",
    "unix.md",
  ];
  assert.match(contextSelection, /Do not load every reference/i);
  assert.match(contextSelection, /If no signal matches[\s\S]*do not guess/i);
  for (const path of references) {
    assert.ok(contextSelection.includes(`\`${path}\``), `missing conditional map: ${path}`);
    assert.ok(skill.includes(`references/${path}`), `skill does not link reference: ${path}`);
    const content = readFileSync(
      new URL(`../skills/code4me/references/${path}`, import.meta.url),
      "utf8",
    );
    assert.match(content, /Project instructions override this baseline/);
  }
});
