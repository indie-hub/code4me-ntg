---
name: code4me-housekeeping
description: Audit Code4Me lifecycle and worktree integrity, then preserve a compact resumable handover in the append-only event log without changing product files. Use when the user asks for Code4Me housekeeping, a handover, bookkeeping health, checkpoint readiness, commit readiness, a pre-commit audit, or confirmation that a coding session is safe to leave.
---

# Code4Me Housekeeping

Audit inline. Do not delegate, modify product files, delete, stage, commit, or
push unless the same user request explicitly authorizes it. Housekeeping may
append one handover checkpoint to `.code4me/events.jsonl` and write validated
durable knowledge to Basic Memory; those are its only default writes.

Use audit-only mode, with no writes, when the user explicitly asks only for a
pre-commit or readiness audit. Treat `housekeeping`, `handover`, `safe to leave`,
or `finish this session` as a closeout request.

## Workflow

1. Read project instructions and inspect the repository root, current working
   directory, branch, HEAD, upstream and sync state, plus tracked, untracked,
   staged, and unstaged worktree changes with read-only version-control commands.
   Record physical absolute paths (`pwd -P` and the physical Git root) so a
   symlink such as `/tmp` versus `/private/tmp` does not create false drift.
   Treat `.code4me/events.jsonl` as bookkeeping: list it under `excluded` and
   exclude it from product-worktree drift comparisons so the checkpoint does not
   make itself stale.
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
   `needs changes`. In audit-only mode, report `no local Code4Me history` when no
   log exists without creating one.
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
7. In closeout mode, promote only validated, durable decisions, conventions,
   lessons, or recurring failure patterns to Basic Memory. Deduplicate first and
   record returned `memory://` references. Never store branch, worktree, pending
   task, or other transient session state in Basic Memory. If it is unavailable,
   record that fact without blocking the handover. Use `unavailable` only when
   the capability or project is absent or the call fails; use `empty` when it is
   accessible but there is no durable knowledge to reference.
8. If every existing event is valid JSON, append exactly one compact checkpoint
   line. Create `.code4me/events.jsonl` only when closeout was requested and it
   does not exist. Never rewrite earlier events. Use this shape:

```json
{"v":2,"type":"checkpoint","ts":"<ISO8601>","milestone_id":"<active id or null>","state":"handover","verdict":"READY|READY-WITH-NOTES|NOT-READY","repo":{"root":"<absolute repository root>","cwd":"<absolute working directory>","branch":"<branch or detached>","head":"<commit or unborn>","upstream":"<ref or null>","sync":"synced|ahead|behind|diverged|unavailable","ahead":0,"behind":0},"worktree":{"staged":[],"unstaged":[],"untracked":[],"excluded":[{"path":".code4me/events.jsonl","reason":"bookkeeping"}]},"completed":[],"active_tasks":[],"pending":[],"blockers":[],"checks":[],"release":{"version":"<version or null>","changelog":"consistent|not-applicable|conflict"},"memory":{"status":"used|empty|unavailable","refs":[]},"next":"<one exact next action>"}
```

An honest `NOT-READY` handover is useful: preserve the blocker and exact next
action instead of pretending the session is complete. Do not append when the
existing log contains malformed JSON, because that would not repair its history.
List only independently validated logical tasks in `completed`; preserve all
in-flight work in `active_tasks`, `pending`, and `blockers`. A handover checkpoint
does not close a milestone or supersede unresolved lifecycle events.
Use logical task IDs in `completed` and `active_tasks`, concise actionable strings
in `pending` and `blockers`, and `"<command>: <result>"` strings in `checks`.
Record worktree paths relative to the repository root.

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
checkpoint freshness, repository identity and worktree scope, checks and release
consistency, exact remaining actions, `commit-ready: yes | no`, and
`handover checkpoint appended: yes | no`.

Do not write a handoff manifest. The append-only log and latest handover
checkpoint are the resume surface.
