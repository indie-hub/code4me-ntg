---
name: code4me-housekeeping
description: Audit Code4Me task closure, worktree scope, checks, and release metadata without changing the project. Use when the user asks for Code4Me housekeeping, commit readiness, a pre-commit audit, or confirmation that a coding session is safe to leave.
---

# Code4Me Housekeeping

Audit inline. Do not delegate. Do not edit, delete, stage, commit, or push unless
the same user request explicitly authorizes that action.

## Workflow

1. Read the project's local instructions.
2. Inspect the worktree with read-only version-control commands. List tracked,
   untracked, staged, and unstaged changes without resetting unrelated work.
3. If `.code4me/events.jsonl` exists, read every non-empty line and verify:
   - each line is valid JSON;
   - each result has a preceding dispatch with the same `task_id` and `worker`;
   - each dispatch has at most one terminal result;
   - terminal outcomes are `complete`, `blocked`, or `failed`.
   Report dispatches without results as `awaiting result`. If the file is
   absent, report `no local Code4Me task history`; do not create it.
4. Review check evidence recorded in relevant result events. Run only the
   smallest missing check needed for the current changes, using the project's
   documented command. Do not run a check that may change tracked or external
   state; report it as pending instead.
5. If a version-bearing manifest changed or the user is preparing a release,
   verify that the version and changelog agree. Do not require a version bump
   for ordinary unreleased work.
6. Identify unexplained changes, accidental generated files, and intentional
   local files that should remain outside the commit. Never remove them.

## Verdict

- `READY`: no awaiting or invalid task events, required checks pass, release
  metadata agrees when applicable, and every worktree change has a clear scope.
- `READY-WITH-NOTES`: the READY safety gates pass, but non-blocking actions or
  intentionally excluded local files remain.
- `NOT-READY`: task events are awaiting or invalid, a required check failed or
  is still pending, release metadata conflicts, or worktree scope is unclear.

Historical `blocked` or `failed` results are notes, not permanent blockers.
Judge readiness against the user's current scope.

## Report

Return one compact report containing:

- verdict and one-sentence reason;
- worktree scope;
- task-log integrity;
- checks and release consistency;
- exact remaining actions, or `none`;
- `commit-ready: yes | no`.

Do not write a handoff manifest. The append-only event log and Status skill are
the Next Gen resume surface.
