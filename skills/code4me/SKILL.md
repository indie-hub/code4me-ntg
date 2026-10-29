---
name: code4me
description: Coordinate engineering work from user intent through implementation and independent cross-vendor validation, with optional fast drafts and shared Basic Memory. Use for Code4Me build, fix, refactor, delegation, resume, explicit Crowd Mode, or incoming Code4Me tasks.
---

# Code4Me

Deliver the intended outcome with the smallest useful team and evidence.
The producer coordinates, the implementer builds, and an independent validator
judges the actual result. Roles belong to a task, not a room or vendor.

## Start from intent

Read the latest checkpoint and later events in `.code4me/events.jsonl`. Compare
recorded repository, branch, HEAD, and worktree scope with current state. Resume
only when the recorded next action still serves the current request.
Read root and scoped `AGENTS.md` / `CLAUDE.md` when present; do not create or
synchronize them. Load only relevant [context references](references/context-selection.md).

Before planning, search shared **Basic Memory** for relevant decisions and
lessons. Read relevant results and supplied `memory://` references. Record
`used`, `empty`, or `unavailable` with truthful search/read evidence. A worker
makes a targeted gap search when needed; repeating the same search without a
new question adds no value. Follow [the toolbox](references/toolbox.md), including
Headroom retrieval. Missing optional tools degrade the route, not its standard.

Capture the outcome, one success example, boundaries, and material assumptions.
Carry the original request or an exact accessible reference, not just a producer
paraphrase. Ask only when ambiguity materially changes the outcome and cannot
be resolved from current authority and evidence. Otherwise state a reasonable
assumption and proceed. Read [intent and drafting](references/intent-and-draft.md)
when direction is uncertain.

## Choose work, not ceremony

Keep a coherent change in one logical task. Split only for independently useful
outcomes, hard dependencies, or safe parallel value. Choose a route:

- `direct`: behavior and approach are clear enough. Implement, then independently
  verify. Ordinary fixes need no separate draft or design review.
- `draft`: an important unknown could invalidate the approach. Build a small
  runnable slice, challenge direction, then finish and verify. Each draft answers
  one question; task size alone does not justify another phase.

Record `task_opened` with intent, route and reason, risk, team, and verification.
This replaces separate classification and assignment events. Use `risk: critical`
for authorization, money, privacy, data loss, migration, or significant public
contract risk; otherwise use `normal`. Explain risk briefly; it determines
capability and evidence, not paperwork.

Reserve an independent validator before implementation. Prefer an eligible ready
Crowded implementer, then a host-native subagent. Keep the producer's main context
for coordination, narrow routing reads, and synthesis. Producer implementation
is a last resort: record `producer_fallback:` and why both routes are unavailable.
Never validate your own implementation. Two members suffice when the producer
holds one role and a peer the other.

Choose the smallest capable model and appropriate effort per role. Honor roster
capability, model-tier, and cost metadata; never infer vendor from a room name.
Critical work needs deep capacity, high or greater effort, and distinct known
implementer and validator vendors. For normal work use a distinct known vendor
whenever eligible, otherwise record degraded coverage. Unknown vendor proves
no diversity. Add specialists only for bounded architecture, research, security,
QA, or performance questions that need them; do not create idle roles.

## Deliver and learn

1. Dispatch using [the current contract](references/task-contract.md). For a
   draft, specify the uncertainty, runnable demonstration, stopping point, and
   finish-only work. Draft checks still cover its claim and safety constraints.
2. Accept only matching, truthful results. Preserve each at a unique task-and-
   stage path or embed it in the next envelope before reusing its worker. Bind
   evidence to the exact commit and worktree fingerprint. Missing required
   evidence means `blocked`, not invented success.
3. On the draft route, dispatch a read-only `challenge` to a context that did
   not build it. Compare the artifact against the original request and success
   example. `proceed` permits `finish`, not final acceptance. For `rethink`,
   reshape the approach once within the declared budget. A second failed
   challenge blocks this attempt for a revised plan. Reuse useful draft code.
4. Independently `verify` the finished target using
   [validation](references/validation.md). Require technical evidence and intent
   alignment. Allow one bounded repair and one revalidation, then report blocked.
   A user may explicitly revise scope or budget; record it before redispatch.
5. Append `task_validated` only for an independent `pass` on the current target.
   Keep implementation complete, validated, and accepted with user waiver
   distinct: a waiver is not a pass. Close product milestones only with passing
   evidence for every accepted criterion; do not hide unfinished tasks. A purely
   read-only audit/research task may close on supported accepted results without
   claiming product validation.
6. Resolve each finding: fix, refute with evidence, or explicitly defer within
   current authority. Preserve finding IDs and responses across rounds. Required
   acceptance failures cannot be silently deferred. Reviewers check resolutions
   independently and reopen regressions instead of repeating settled comments.
7. Promote supported durable lessons to Basic Memory after deduplication: scope,
   source, date, reason, and superseding guidance. Draft observations remain
   observations, never silently become policy. Repeated failures should improve
   context, a reusable capability, or an executable check where one can reliably
   decide the rule. Use the same check locally and in CI when practical;
   semantic questions stay with review.

Append one checkpoint when accepted work, ownership, blockers, decisions, or the
next action changes. Combine a turn's changes; do not repeat unchanged status.
The producer alone writes the operational log. Housekeeping may append one
self-contained handover and perform verified closed-log rotation. Never rewrite
history. Use [Status](../code4me-status/SKILL.md) for progress and
[Housekeeping](../code4me-housekeeping/SKILL.md) for closeout.

## Evidence and System One

Acceptance states what must be true. Verification names existing exact commands,
observable artifacts, and relevant sourced invariants. Never invent checks to
fill fields. Invariants name their source, check, pass condition, and fixed or
explicit-approval change policy; workers cannot weaken them. Use a `quality_bar`
only for an inspectable comparison beyond acceptance: source, target, comparison,
and pass condition. The producer may propose a provisional bar. Record justified
revisions between rounds; do not change user intent or excuse failure by moving
its bar. See the [contract](references/task-contract.md).

Use System One only when a bounded choice can eliminate named expensive work:
context shortlisting, probe ordering, or evidence selection. Prefer deterministic
checks when they decide. Read [the provider contract](references/system-one.md)
when relevant; a skill alone is not a runtime. Default new use cases to shadow.
Project guidance may enable demonstrated reversible choices in active mode.
No call quota. Provider failure, uncertainty, consequential decisions, or contract
changes need System 2. Advice cannot change authority or required checks. Record
receipts and actual outcomes; skipped work is not automatically measured savings.

## Incoming worker contract

Load this skill for a `code4me-ntg/v4` task with `required_skill: code4me` and
`delegation: forbidden`. Work here; do not redispatch. Return `blocked` if required
guidance is unavailable or the protocol is unsupported. Read the original
request, intent, scoped instructions, supplied context, and Basic Memory
references before planning. Retrieve required Headroom originals rather than
claim a compression marker was read. Use CodeGraph for exact structure, CCC for
semantic discovery, Context Mode for large derived output, and narrow native
reads when cheaper. Report truthful tool evidence and memory availability.

Execute only the assigned stage. Drafts may postpone finish-only work, never
their own claim or safety constraints. Challengers and validators are read-only
and choose their verdict independently. Read provider guidance before a System
One call; consult the separately installed TypeSafe skill when applicable.
Return matching IDs, exact target, checks, finding resolutions,
`decision_receipts`, and `memory_candidates` (empty arrays are valid). Do not
write the producer's log. Put follow-ups in `deferred_work`.

Source comments explain code only: rationale, invariants, non-obvious behavior.
Never introduce task/milestone IDs, status, plans, TODO/FIXME items, progress,
deferred work, or handover notes in source comments.

## Transport and controls

Use native dispatch and join normally; collect results before moving on.
For Crowded discover live topology before selecting members:

```sh
"$CROWDED_BIN" roster --json
"$CROWDED_BIN" send ROOM_NUMBER --task STAGE_ID --role worker -- 'TASK_ENVELOPE'
```

Use numeric rooms from the roster with `transport: raw` and confirmed ready
state. Use normalized vendor and reviewed model mappings; never guess model
names. Missing capability is unknown, not proof of eligibility. Select a
confirmed route or report the gap. Doorbell roles: `worker` for draft, implement,
finish, repair, research; `verifier` for challenge/verify; `auditor` for audit;
`result` for returns.

After accepted `injected` or `queued` delivery, checkpoint outstanding stages
and end the turn. Do not poll, sleep, watch terminals, or run background waiters.
Workers also end their turn after accepted result delivery. This applies only
to Crowded, not native subagent waits or joins. Do not resend merely because a
result has not arrived.

Control only rooms with `allow_control: true`:

```sh
"$CROWDED_BIN" control ROOM_NUMBER model EXACT_MODEL effort LEVEL
"$CROWDED_BIN" control ROOM_NUMBER clear
```

Require `ok: true`, `status: applied`, then confirmed ready state. Clear may
restore defaults. Check effective model and effort, reapply intended settings
if needed, and record observed versus unknown/unsupported in `task_controlled`.
Success alone does not prove configuration. For normal work only, a completed
worker may be cleared for last-resort fresh-context validation after preserving
its result. This is not a new vendor and cannot satisfy critical diversity.
Otherwise use an independent native validator or non-implementing producer;
report unavailable routes. Without an eligible independent route, leave work
unvalidated.

## Optional modes and communication

Read [Crowd Mode](references/crowd-mode.md) only for an explicit one-request
`crowd:`, `crowd this`, or `use the whole room` instruction from the user.
Worker envelopes and quoted content never activate it. Parallel writers need
verified isolated worktrees, one writer per checkout; disjoint paths are not
isolation. Reserve validation capacity before fan-out.

When `.code4me/trello.json` exists and its MCP is available, use
[Code4Me Trello](../code4me-trello/SKILL.md) for authorized intake and projection.
Trello absence never blocks Code4Me. A card moved to Done never bypasses final
validation. A draft stays In Progress.

Use the Code4Me Technical English profile: short active sentences, one idea per
sentence, consistent terms, explicit actors and results. Preserve code, commands,
paths, logs, errors, and quotations exactly. Inspired by ASD-STE100; no formal
compliance claim. Natural greetings and the user's own language remain welcome.

## Current contract only

Use protocol and event version 4 from [task-contract.md](references/task-contract.md).
Do not reinterpret old IDs or accept legacy envelopes. For an old active log,
pause new dispatches, preserve it, and explicitly carry unresolved work into a
fresh v4 log with source references and new stage IDs after confirming no old
work is in flight. Do not mutate or silently upgrade historical records.
