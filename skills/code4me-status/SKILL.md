---
name: code4me-status
description: Read and summarize lightweight Code4Me milestones, tasks, teams, validation state, checkpoints, resumable handovers, and legacy delegated-task events without changing the project. Use when the user asks for Code4Me status, active milestones, task progress, team assignments, blockers, validation, resume context, or event-log problems.
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
   Flag malformed JSON, duplicate stage dispatches, unmatched results,
   `complete` v2 results without non-empty `tool_evidence`, validation predating
   the latest implementation result, tasks without classification or team
   assignment, and closed milestones containing an unvalidated task.
6. For v1-only history, retain the legacy view: awaiting dispatches and five
   most recent terminal results.
7. For a handover checkpoint, compare recorded HEAD, branch, upstream sync, and
   worktree paths with the current repository. Report `handover stale` when they
   differ; do not silently present recorded state as current state. Exclude the
   bookkeeping path `.code4me/events.jsonl` from product-worktree drift because
   appending the checkpoint necessarily changes it.

## Report

Return:

- latest checkpoint state, repository identity, worktree scope and exclusions,
  completed and active tasks, blockers, memory references, and exact next action;
- every active milestone with goal and acceptance summary;
- each active task with kind, weight, state, and role-to-member team map;
- each assigned member's mode, model tier or exact model, requested effort, and
  derived Crowded control state;
- validation route and verdict, or why validation is missing;
- five most recent validated or terminal tasks unless another limit is asked;
- event-log issues, or `none`.

Never call a task complete merely because implementation returned `complete`.
Never call a room currently working merely because its result is absent.
