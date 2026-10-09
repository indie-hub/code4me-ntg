import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const skill = readFileSync(
  new URL("../skills/code4me/SKILL.md", import.meta.url),
  "utf8",
).replace(/\r\n/g, "\n");
const normalizedSkill = skill.replace(/\s+/g, " ");
const contextSelection = readFileSync(
  new URL("../skills/code4me/references/context-selection.md", import.meta.url),
  "utf8",
);
const crowdMode = readFileSync(
  new URL("../skills/code4me/references/crowd-mode.md", import.meta.url),
  "utf8",
).replace(/\s+/g, " ");
const validation = readFileSync(
  new URL("../skills/code4me/references/validation.md", import.meta.url),
  "utf8",
).replace(/\s+/g, " ");
const toolbox = readFileSync(
  new URL("../skills/code4me/references/toolbox.md", import.meta.url),
  "utf8",
).replace(/\s+/g, " ");
const systemOne = readFileSync(
  new URL("../skills/code4me/references/system-one.md", import.meta.url),
  "utf8",
).replace(/\s+/g, " ");
const openaiAgent = readFileSync(
  new URL("../skills/code4me/agents/openai.yaml", import.meta.url),
  "utf8",
);

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

test("Code4Me schedules the smallest capable room at the lowest relative cost", () => {
  for (const rule of [
    "Roster `capabilities` describe role eligibility",
    "`assigned_role` describes the current task assignment",
    "`capabilities` values `produce`, `implement`, `validate`, `qa`",
    "without `capabilities` is a backward-compatible generalist",
    "`model_tier: fast | balanced | deep`",
    "`cost_tier: low | medium | high`",
    "Preserve required vendor diversity before cost optimization",
    "smallest adequate `model_tier`, then the lowest `cost_tier`",
    "Do not benchmark, infer, or overwrite them",
    "missing `cost_tier` supplies no cost tie-breaker",
    "roster metadata used in the assignment's `selection_reason`",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing scheduling rule: ${rule}`);
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
    "assigned_role: implementer | validator",
    "producer's stage contract",
    "Do not change them silently",
    "producer cannot require a pass",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing worker contract: ${rule}`);
  }
});

test("Code4Me uses Technical English without rewriting technical literals", () => {
  for (const rule of [
    "Code4Me Technical English profile",
    "all technical and operational communication with the user and between agents",
    "does not claim formal compliance",
    "Use short sentences and active voice",
    "one action or idea in each sentence",
    "one consistent term for each concept",
    "actor, action, artifact, and expected result",
    "Avoid idioms, vague pronouns, and ambiguous references",
    "Define each abbreviation on first use",
    "Preserve code, commands, paths, logs, error messages, and quotations exactly",
    "Do not require the user to write in this profile",
    "Casual greetings can remain natural",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing Technical English rule: ${rule}`);
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
    "producer keeps its main context orchestration-only",
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

test("Code4Me keeps the producer orchestration-first", () => {
  for (const rule of [
    "keeps its main context orchestration-only",
    "engineering artifact work and independent judgment",
    "implementation, repair, research, design, audit, QA, and validation",
    "targeted reads needed to route work",
    "do not justify a subagent",
    "must not implement source changes while an eligible ready Crowded implementer",
    "Choose the implementation route in this order",
    "then the producer only as `producer_fallback`",
    "must never validate work it implemented",
    "`selection_reason` must start with `producer_fallback:`",
    "Task smallness, speed, or convenience are not fallback reasons",
    "Validator diversity is measured against the implementer, not the producer",
    "Use a distinct, known vendor from the implementer whenever one is eligible",
    "record a degraded-validation reason",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing producer routing rule: ${rule}`);
  }
  assert.match(openaiAgent, /delegate implementation whenever an eligible Crowded or native worker exists/);
  assert.match(openaiAgent, /different vendor from the implementer/);
});

test("Code4Me Crowd Mode uses bounded cross-vendor waves", () => {
  for (const rule of [
    "[references/crowd-mode.md](references/crowd-mode.md)",
    "applies only to that direct request",
    "Never infer it from task size",
    "send every already-planned stage in the current wave without waiting between sends",
    "append one `awaiting_result` checkpoint",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing Crowd Mode routing rule: ${rule}`);
  }
  for (const rule of [
    "does not persist to later requests",
    "`delegation: forbidden` always wins for workers",
    "do not add a workflow language, wave event, tracker, daemon, or scheduler",
    "without manufacturing work for idle rooms",
    "Reserve an independent validator before assigning the rest of the live roster",
    "Keep one active writer per checkout",
    "verified isolated worktree",
    "Do not mix a Doorbell wave with host-native joins",
    "If required wave results are still outstanding",
    "do not decide by model vote",
    "never to stages or waves",
  ]) {
    assert.ok(crowdMode.includes(rule), `missing Crowd Mode contract: ${rule}`);
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
  assert.match(
    skill,
    /expected_return:\n  milestone_id:[\s\S]*\n  findings:[^\n]*\n  largest_gap:[^\n]*\n  deferred_work:/,
  );
});

test("Code4Me carries a lightweight verification contract", () => {
  for (const rule of [
    "## Verification contracts",
    "Acceptance states what must be true",
    "Verification states how the agents prove it",
    "commands: [<exact project command>]",
    "evidence: [<observable output or artifact>]",
    "Never invent a command",
    "At least one of `commands` or `evidence` must be non-empty",
    "Set `verification: null`",
    "required command failure prevents `outcome: complete`",
    "return `blocked` with the reason",
    "validator independently reruns the commands",
    "do not expand the task's authority",
    '"verification":{"commands"',
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing verification rule: ${rule}`);
  }
  for (const rule of [
    "Read the verification contract",
    "Independently rerun every listed command",
    "inspect every evidence target directly",
    "never accept the implementer's summary as verification",
  ]) {
    assert.ok(validation.includes(rule), `missing verification validation rule: ${rule}`);
  }
});

test("Code4Me proposes inspectable quality bars without open-ended loops", () => {
  for (const rule of [
    "quality_bar`: an initial inspectable comparison",
    "proposes one recommended bar",
    "A producer-proposed bar is `provisional`",
    "Proceed without waiting",
    "ask the user only when choosing the bar would introduce",
    "stop an active validation round",
    "set `quality_bar: null`",
    "comparison method (`direct | blind_ab | metric | acceptance`)",
    "Freeze the bar for each validation round",
    "Never weaken or move the bar merely because",
    "existing bounded limit of one repair and one revalidation still applies",
    "largest_gap: <highest-leverage quality gap or null>",
    "revision_reason: <why this changed between rounds, or null>",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing quality-bar rule: ${rule}`);
  }
  for (const rule of [
    "never grade the implementer's summary",
    "do not move or weaken the bar during the round",
    "identify one `largest_gap`",
    "must not hide blocking findings",
  ]) {
    assert.ok(validation.includes(rule), `missing quality validation rule: ${rule}`);
  }
});

test("Code4Me separates fast producer and worker decisions from System 2", () => {
  for (const rule of [
    "## System 1 decision layer",
    "agent, model, service, or authority",
    "cannot perform a distinct System 1 pass",
    "Do not block the task or weaken any contract",
    "**Producer contract:**",
    "cheapest capable eligible worker",
    "**Worker contract:**",
    "cheapest reversible next action",
    "A System One call should eliminate expensive work",
    "If none can be named, do not call it",
    "return `blocked` or `changes_requested`",
    "never log private reasoning",
    "references/system-one.md",
    "system_one:",
    "decision_receipts:",
    "provider declaration does not prove use",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing decision-layer rule: ${rule}`);
  }
  for (const rule of [
    "A skill or documentation package alone is not a runtime",
    "read-only live probe",
    "Default to `shadow`",
    "No receipt means no claimed use",
    "evidence_status: verified | reported",
    "recorded_by: provider | adapter | hook | observer | agent",
    "avoids: <specific expensive action>",
    "avoided: true | false",
    "Set `avoided: true` only when the named action was actually skipped",
    "Only a provider, adapter, hook, or observer independent of the agent",
    "verified receipt requires a non-null `request_id`",
    "observational, not causal",
    "never invent token or cost savings",
    "TypeSafe",
    "Choice",
    "Score",
    "Noul",
  ]) {
    assert.ok(systemOne.includes(rule), `missing provider rule: ${rule}`);
  }
});

test("Code4Me makes Basic Memory use observable", () => {
  for (const rule of [
    "Before planning any task, consult shared **Basic Memory**",
    "make at least one targeted search",
    "Do not classify, assign, or dispatch",
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
  assert.ok(toolbox.includes("makes one targeted gap search when memory is available"));
  assert.ok(toolbox.includes("reports truthful `Basic Memory` tool evidence"));
  assert.ok(toolbox.includes("does not begin task work until"));
});

test("Code4Me protects evidence-backed invariants", () => {
  for (const rule of [
    "invariants:",
    "id: <stable invariant id>",
    "change_policy: fixed | explicit_approval",
    "task-specific outcome belongs in `acceptance`",
    "new product rule requires explicit user confirmation",
    "reports each invariant ID",
    "confirms that its source was not weakened",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing invariant rule: ${rule}`);
  }
  assert.ok(validation.includes("For each invariant, name its ID"));
  assert.ok(validation.includes("Missing invariant evidence prevents a pass"));
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
    "Only after all eligible fresh-context routes are unavailable",
    "producer that did not implement validate inline",
    "`producer_validation_fallback:`",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing recycle rule: ${rule}`);
  }
  const native = normalizedSkill.indexOf("use a host-native validator");
  const recycled = normalizedSkill.indexOf("last delegated fresh-context fallback");
  const inline = normalizedSkill.indexOf("producer that did not implement validate inline");
  assert.ok(native < recycled && recycled < inline, "validation fallback order is incorrect");
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
