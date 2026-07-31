# Code4Me Next Gen

The smallest useful Code4Me: one producer delegates one engineering task to
one suitable worker and accepts one correlated result.

The first version is deliberately only a plugin containing one skill. On use,
the producer records dispatch and result events in the client project's local
`.code4me/events.jsonl`.

## Current scope

- Decide whether a task benefits from delegation.
- Select one available worker without a vendor preference.
- Send one task envelope.
- Validate one matching result.
- Preserve the two-event audit trail.

The plugin currently contains one skill and no additional integrations.
