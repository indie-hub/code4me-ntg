---
name: code4me-housekeeping
description: Audit Code4Me milestone, task, team, validation, checkpoint, worktree, check, and release integrity without changing the project. Use when the user asks for Code4Me housekeeping, bookkeeping health, checkpoint readiness, commit readiness, a pre-commit audit, or confirmation that a coding session is safe to leave.
---

# Code4Me Housekeeping

Audit inline. Do not delegate or modify, delete, stage, commit, or push unless
the same user request explicitly authorizes it.

## Workflow

1. Read project instructions and inspect tracked, untracked, staged, and
   unstaged worktree changes with read-only version-control commands.
2. If `.code4me/events.jsonl` exists, parse every non-empty line and verify:
   - each line is valid JSON;
   - each result has a preceding dispatch with matching stage ID, worker, and
     vendor, and each dispatch has at most one terminal result;
   - every `complete` v2 result contains non-empty truthful `tool_evidence` with
     tool, action, and concise result or unavailable reason;
   - each v2 task belongs to an opened milestone, is classified before team
     assignment, and is assigned before a delegated stage;
   - assigned implementers, validators, and specialists record mode, model tier,
     requested model or `current`, effort, selection reason, and initial control
     status; every `pending` control has a later matching `task_controlled`;
   - implementer and validator are not the same implementation context;
   - every task whose work or repair changed files has a later
     `task_validated` verdict `pass` before milestone closure;
   - critical tasks use distinct known implementer and validator vendors;
   - critical implementer and validator selections use `deep` tier and at least
     high effort; blind auditors use comparable tier and effort;
   - every validation attempt has a matching `verify` dispatch/result pair and
     no validation predates the latest work or repair result;
   - every closed milestone contains only validated tasks;
   - memory status is `used`, `empty`, or `unavailable`, `used` refs are
     `memory://` URLs, and persisted candidates have `memory_writes` unless
     Basic Memory was unavailable.
3. Report dispatches without results as `awaiting result`, completed work without
   validation as `awaiting validation`, and `changes_requested` as
   `needs changes`. If no log exists, report `no local Code4Me history` without
   creating one.
4. For v2 history, verify that the newest checkpoint names active tasks, pending
   actions, and an exact next action. A material task or milestone event after
   the newest checkpoint makes resume state stale. Do not require checkpoints
   for legacy v1-only history.
5. Review recorded check evidence. Run only the smallest missing documented
   check that will not change tracked or external state; otherwise report it
   pending.
6. When a versioned manifest changed or a release is being prepared, verify
   version and changelog agreement. Identify unexplained changes, accidental
   generated files, and intentional local files that remain outside scope.

## Verdict

- `READY`: no awaiting or invalid events, changed tasks are independently
  validated, the latest checkpoint is current, checks pass, and worktree scope
  is clear.
- `READY-WITH-NOTES`: READY gates pass, but non-blocking pending actions or
  intentionally excluded local files remain.
- `NOT-READY`: event integrity fails, work is in flight or unvalidated, critical
  vendor separation is absent, checkpoint state is stale, checks are pending or
  failing, release metadata conflicts, or worktree scope is unclear.

Historical blocked or failed tasks are notes when a later checkpoint explicitly
supersedes or closes them. Judge readiness against current scope.

## Report

Return verdict and reason, milestone/task/team integrity, validation state,
checkpoint freshness, worktree scope, checks and release consistency, exact
remaining actions, and `commit-ready: yes | no`.

Do not write a handoff manifest. The append-only log and latest checkpoint are
the resume surface.
