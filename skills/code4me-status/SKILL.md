---
name: code4me-status
description: Read and summarize lightweight Code4Me milestones, tasks, teams, validation state, workflow health, checkpoints, resumable handovers, and legacy delegated-task events without changing the project. Use when the user asks for Code4Me status, active milestones, task progress, team assignments, blockers, validation, workflow metrics, resume context, or event-log problems.
---

# Code4Me Status

Report the smallest accurate view of `.code4me/events.jsonl` without changing it.

## Workflow

1. If `.code4me/events.jsonl` does not exist, report `no local Code4Me history`
   and stop. Do not create it.
2. Read each non-empty line as one JSON event in file order. Support v2 lifecycle
   events and legacy v1 dispatch/result pairs.
3. Use the newest valid `checkpoint` as the canonical resume summary, then apply
   every later event. Never let a checkpoint hide subsequent work.
   When its state is `handover`, treat its repository identity, worktree scope,
   completed and active tasks, blockers, memory references, and exact next action
   as the ready-to-resume brief.
   If it contains `archive`, verify the referenced immutable file's SHA-256 and
   event count before trusting the boundary. Do not read archived events for
   normal status; inspect them only when the user requests historical or
   integrity detail.
4. Group v2 events by `milestone_id`, then logical task ID. Derive task state:
   - `classified`: classified but not assigned;
   - `assigned`: team assigned but work not started;
   - `awaiting_result`: dispatch lacks a matching result;
   - `awaiting_validation`: work completed but no passing `task_validated`;
   - `needs_changes`: the latest matching `verify` result returned
     `changes_requested` after the latest work or repair;
   - `blocked` or `failed`: latest terminal stage outcome;
   - `validated`: a matching `task_validated` has verdict `pass` after the
     latest work or repair result.
5. A result matches only when stage ID, worker, and vendor match its dispatch,
   including producer-inline `verify` stages. Derive applied control state from
   `task_assigned` plus later matching `task_controlled` events.
   Derive the current quality bar from the latest applicable dispatch, falling
   back to `task_classified`. Flag a work/verify bar mismatch unless the later
   dispatch records a `revision_reason`.
   Flag malformed JSON, duplicate stage dispatches, unmatched results,
   `complete` v2 results without non-empty `tool_evidence`, validation predating
   the latest implementation result, tasks without classification or team
   assignment, and closed milestones containing an unvalidated task.
6. Correlate `task_board_linked`, `task_change_requested`, and
   `task_cancel_requested` by provider, board, card, milestone, and logical task.
   Use the latest `trello_synced` event for cursor age, counts, and conflicts.
   Status remains read-only: never call Trello or attempt synchronization.
7. For v1-only history, retain the legacy view: awaiting dispatches and five
   most recent terminal results.
8. For a handover checkpoint, compare recorded HEAD, branch, upstream sync, and
   worktree paths with the current repository. Report `handover stale` when they
   differ; do not silently present recorded state as current state. Exclude the
   bookkeeping paths `.code4me/events.jsonl` and `.code4me/archive/` from
   product-worktree drift because housekeeping changes them.

## Workflow health

When the user asks for workflow health, metrics, effectiveness, or a detailed
status, derive one compact section from existing events. Do not write counters,
summaries, telemetry, or new events. Default to the active milestone. If no
milestone is active, use terminal logical tasks in the active log. Read verified
archives only when the user requests historical scope.

Count each logical task once. Use these definitions:

- `first-pass validation`: the first matching `verify` result after initial
  work has verdict `pass`; divide by tasks that have a matching verify result.
- `repair rate`: the task has at least one `repair` dispatch; divide by terminal
  tasks in scope.
- `cross-vendor validation`: the validated task's known validator vendor differs
  from its known implementer vendor; divide by validated tasks where both
  vendors are known. Report excluded unknown-vendor tasks.
- `producer fallback`: the assigned implementer's `selection_reason` starts
  with `producer_fallback:`; divide by assigned tasks in scope.
- `blocked rate`: the logical task's terminal state is `blocked` or `failed`;
  divide by terminal tasks in scope.
- `elapsed cycle`: duration from `task_classified` timestamp to `task_validated`
  timestamp, or to the latest matching terminal `blocked` or `failed` result.
  Report the median duration and sample size. This duration includes queue and
  human wait time; do not label it agent work time.

Show the numerator, denominator, and percentage for every rate. Report `n/a`
when a denominator is zero or required data is absent. List malformed or
missing data as event-log issues. Do not rank agents, rooms, vendors, or models.

## Report

Return:

- latest checkpoint state, repository identity, worktree scope and exclusions,
  completed and active tasks, blockers, memory references, and exact next action;
- every active milestone with goal and acceptance summary;
- each active task with kind, weight, state, and role-to-member team map;
- each active task's quality-bar status, target, comparison method, and pass
  condition when present;
- each assigned member's mode, model tier or exact model, requested effort, and
  derived Crowded control state;
- validation route and verdict, or why validation is missing;
- linked Trello card IDs plus latest sync time and unresolved conflicts when
  board events exist;
- five most recent validated or terminal tasks unless another limit is asked;
- workflow-health scope, sample sizes, rates, and median elapsed cycle only when
  requested;
- event-log issues, or `none`.

Never call a task complete merely because implementation returned `complete`.
Never call a room currently working merely because its result is absent.
