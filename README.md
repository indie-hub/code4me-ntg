# Code4Me Next Gen

The smallest useful Code4Me: one producer delegates one engineering task to
one suitable worker and accepts one correlated result.

The plugin contains three focused skills. On use, the producer records dispatch
and result events in the client project's local `.code4me/events.jsonl`; Status
and Housekeeping read that trail without changing it.

## Current scope

- Decide whether a task benefits from delegation.
- Select one available worker without a vendor preference.
- Send one task envelope.
- Validate one matching result.
- Preserve the two-event audit trail.
- Report awaiting tasks, recent results, and malformed or unmatched events.
- Audit task closure, worktree scope, checks, and release consistency.

The plugin contains no additional integrations.
