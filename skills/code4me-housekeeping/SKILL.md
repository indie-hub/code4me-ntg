---
name: code4me-housekeeping
description: Audit Code4Me history, evidence, memory, and worktree integrity and preserve a compact resumable handover. Use for housekeeping, handover, safe-to-leave, memory health, or commit-readiness requests.
---

# Code4Me Housekeeping

Audit inline. Do not change product files, delete, stage, commit, or push unless
the user request authorizes it. A closeout may append one handover checkpoint,
promote supported durable knowledge to Basic Memory, and rotate an eligible
closed log. Audit-only or readiness questions make no writes.

Read [the current contract](../code4me/references/task-contract.md) and derive
lifecycle state using [Status](../code4me-status/SKILL.md). Use v4 only. For older
history report an explicit carryover is needed; do not silently translate IDs,
rewrite records, or carry over while old dispatches are still in flight.

## Audit

- Record physical absolute repo/cwd paths, branch, HEAD, upstream sync, staged,
  unstaged, and untracked scope. Exclude .code4me/events.jsonl and .code4me/archive/
  from product drift so the handover does not make itself stale.
- Parse all active events. Check task/stage correlation, independent reviews,
  target fingerprints, route order, bounded rethink/repair budgets, finding
  resolutions, intent alignment, truthful tool evidence, and milestone closure.
- Preserve distinctions: draft complete, challenge proceeded, finish complete,
  final validated, and accepted with user waiver. Required findings and unvalidated
  work remain visible. A user waiver is never a validation pass.
- Compare the last checkpoint plus later events with current repository state.
  Inspect relevant immutable result paths and exact next actions; report drift.
- Review recorded checks. Run only the smallest missing read-only check that
  will not alter tracked or external state; otherwise report pending.
- Check version/changelog agreement when preparing a release or manifests changed.
  Do not tidy unrelated files, worktrees, or branches by assumption.

## Memory promotion

In closeout, follow [the memory rules](../code4me/references/toolbox.md).
Deduplicate supported scoped claims and read back writes. Include source, date,
reason, status, and superseding links; preserve rejected approaches that prevent
real rework. Distinguish a draft observation from an adopted decision. No raw
transcripts, secrets, task progress, or branch/worktree state in Basic Memory.

Audit memory health only when requested, preparing a release, rotation is due,
or retrieval exposes conflicting/stale/duplicate/orphaned guidance. Report
clean, review-recommended, or unavailable with evidence. During audit do not
rewrite memory. Explicit closeout/consolidation may update the best canonical
note with provenance and links; never silently delete history. Repeated supported
failures can suggest a context improvement, capability, or executable check;
proposing one does not authorize unrelated implementation.

## Handover

If active history is valid and closeout was requested, append exactly one compact
v4 checkpoint with state handover. Preserve:

- repository identity, upstream sync, product scope and bookkeeping exclusions;
- task outcomes and routes; accepted results with immutable artifact/revision refs;
- current phase, outstanding stage IDs, open findings, decisions, waivers, blockers;
- supported checks, release state, and relevant durable memory references;
- one exact next action a fresh agent can perform under current authority.

Summarize meaningful current state, not the full event history. A checkpoint is
not a milestone closure and cannot erase unresolved work. Never append to malformed
JSON history as if that repairs it. If the log is absent, create it only for an
explicit closeout. Use logical task IDs and concise next actions; no new handoff
manifest or second tracker.

READY means current product work is independently validated (read-only audit or
research has supported accepted results), lifecycle integrity and
checks pass, no in-flight work remains, and product scope is clear. READY-WITH-NOTES
allows non-blocking exclusions or follow-ups. NOT-READY preserves the exact blocker
or pending validation without pretending work is finished. Historical failures
superseded by supported later decisions are history, not permanent blockers.

For Hive work, preserve the board path/revision, active claims, pending
requests, and concrete review-fallback conditions in the same checkpoint.

## Safe rotation

After READY closeout only, rotate when the active log exceeds 1 MiB or 1,000
non-empty events, every milestone is closed, and no task, action, or blocker
remains. Do not rotate for age alone. Copy exact bytes to
.code4me/archive/events-<UTC>-<sha256-prefix>.jsonl first, verify SHA-256 and count,
then atomically replace the active log with the self-contained handover. Include
archive path, full hash, count, and first/last timestamps. A failure leaves the
original active log untouched. Archives remain immutable; never prune automatically.

## Report

State verdict and reason, lifecycle/finding/intent integrity, handover freshness,
product scope, check/release consistency, memory health when audited, exact
remaining work, commit-ready yes/no, checkpoint appended yes/no, and rotation
performed/not-due. An honest incomplete handover is useful.
