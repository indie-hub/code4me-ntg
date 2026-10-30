---
name: code4me-status
description: Read Code4Me intent, direct/draft progress, findings, validation, handovers, and optional workflow metrics without changing the project. Use for Code4Me status, resume context, blockers, or effectiveness questions.
---

# Code4Me Status

Read `.code4me/events.jsonl`; do not create or modify it. If absent, report no
local Code4Me history. Use [the v4 contract](../code4me/references/task-contract.md).
Unsupported versions require an explicit carryover; report the boundary rather
than guessing ID mappings or counting old events as current work.

## Derive the current state

Parse every non-empty line in file order. Read the newest valid checkpoint and
apply later events; a checkpoint cannot hide subsequent work. Compare a handover's
repository, branch, HEAD, sync, and product-worktree scope with current state.
Report drift. Exclude bookkeeping paths from their own freshness comparison.
Verify an archive boundary's SHA-256 and event count before trusting it; archives
are cold history, read only for requested historical or integrity scope.

Group by milestone and logical task_id, and match dispatch/results by stage_id,
stage, worker, and vendor. Count each task once. Derive phase from accepted
dispatch/results under its route:

- opened: task_opened exists, no dispatch yet;
- awaiting_result: dispatched stage has no accepted result;
- awaiting_challenge: draft complete, no proceeding independent challenge;
- rethinking: challenge returned rethink within its remaining budget;
- awaiting_finish: challenge proceeded, finish not complete;
- awaiting_validation: implement/finish/repair complete, no current passing verify;
- needs_changes: verify requested changes, no accepted repair yet;
- blocked/failed: required stage cannot continue or its budget is exhausted;
- validated: matching task_validated cites an independent passing verify on the
  exact current target and aligned intent;
- accepted_with_waiver: user accepted explicit limits; not validated.
- completed_read_only: an audit/research-only task has supported accepted results;
  this is not a product-validation verdict.

A complete draft, a proceeding challenge, and a user waiver never mean validated.
Show technical verdict and intent_alignment separately. Never infer a room is
currently busy just because its result has not arrived.

## Integrity

For Hive write claims, compare owner, canonical checkout, branch/detached state,
base revision and edit scope with actual state. Flag overlapping owners or an
unknown release; a blocked claim still reserves its checkout. Read-only review
is not a write owner. Report useful ready work and blockers, not idle-agent
counts as a quality or productivity score.
For a recorded Hive run, reconcile the checkpoint's board revision, claims,
pending review requests, and fallback decisions with later events and targets.
The board is a current view, not a second history; an ungranted request is not
an outstanding writable dispatch or proof that a worker refused work.

Flag malformed JSON, unsupported versions, reused stage IDs, unmatched or duplicate
terminal results, missing task_opened, absent complete-result tool evidence,
current passes on stale targets, missing required checks/invariants, exceeded
rethink/repair budgets, and closed milestones without validated acceptance.
Check team independence and critical known cross-vendor/deep/high-effort evidence.
A pending control needs matching task_controlled; report observed versus requested
or unknown settings. A ready room or applied control is not configuration proof.

Track finding IDs and responses in results. Author claims do not resolve findings;
use the independent reviewer's supported status. Do not repeat resolved issues
without changed evidence. Flag open required findings at a claimed pass, unexplained
intent/contract changes, and waivers presented as passes. Missing evidence is not
an opportunity to invent a verdict or user preference.

Validate claimed System One receipts against their stage descriptor: matching
provider/model, non-negative latency, named avoids and boolean avoided, and the
permitted mode. Verified requires an independent recorder and request ID; agent
claims stay reported. Consult [the provider rules](../code4me/references/system-one.md)
when receipts exist or effectiveness is requested.

Read task_board_linked, task_change_requested, task_cancel_requested and the
latest trello_synced event when present. Never call Trello or attempt synchronization.

## Optional metrics

Derive from existing events only when requested. No new telemetry store or
summary events. Use the active milestone or explicitly requested scope, with
sample sizes, exclusions, and n/a for missing data. Do not rank agents/vendors.

- Delivery duration: task_opened to current task_validated, median and sample
  size. This includes queue and human wait time, not just agent work.
- Late intent rework: tasks first found misaligned or partly aligned at final
  verify, divided by tasks with a final intent judgment. Report unclear separately.
- Draft usefulness: proceeding, rethink, and blocked challenge counts, plus the
  observed work avoided when evidenced; more drafts is not inherently better.
- First-pass validation, repair rate, blocked rate, and cross-vendor coverage:
  count logical tasks once and show numerator, denominator, and unknown exclusions.
- Actual total model/provider usage or cost only when recorded, including System
  One overhead. Escaped defects require later attributable defect evidence and
  an observation window; absence of such records is unknown, not zero defects.

For System One deduplicate by stage and decision_id. Separate reported from
verified use, followed advice from overrides/escalations/errors, skipped work,
latency, and downstream outcomes. An override with avoided true is not savings
from following advice. Comparisons are observational, not causal; measured
savings require comparable tasks, the same acceptance contract, and total usage.
No call quota or invented token estimate.

## Report

Give the smallest accurate resume view: outcome and route, current phase,
remaining uncertainty, task-scoped team and observed controls, target/result
references, open required findings and responses, validation and intent verdicts,
blockers/waivers, relevant memory, and exact next action. Include board correlation
and metrics only when applicable. Report integrity issues explicitly. Implementation
complete never substitutes for independently validated delivery.
