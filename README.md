# Code4Me Next Gen

The smallest useful Code4Me: one producer delegates one engineering task to
one suitable worker and accepts one correlated result.

The first version is deliberately only a plugin containing two skills. On use,
the producer records dispatch and result events in the client project's local
`.code4me/events.jsonl`, and Status reads that trail without changing it.

## Current scope

- Decide whether a task benefits from delegation.
- Select one available worker without a vendor preference.
- Send one task envelope.
- Validate one matching result.
- Preserve the two-event audit trail.
- Report awaiting tasks, recent results, and malformed or unmatched events.

The plugin currently contains two skills and no additional integrations.
