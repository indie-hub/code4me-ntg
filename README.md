# Code4Me Next Gen

The smallest useful Code4Me: one producer uses shared project memory, delegates
one engineering task to one suitable worker, and accepts one correlated result.

The plugin contains three focused skills. On use, the producer records dispatch
and result events in the client project's local `.code4me/events.jsonl`; Status
and Housekeeping read that trail without changing it.

For non-trivial work, Code4Me searches the shared Basic Memory project before
planning and carries relevant `memory://` references in the worker envelope.
Workers may return durable memory candidates; the producer validates,
deduplicates, and writes them back. Basic Memory is durable project knowledge,
the event log is task correlation, and Context Mode is working-context
processing.

## Current scope

- Decide whether a task benefits from delegation.
- Select one available worker without a vendor preference.
- Route questions to Basic Memory, CodeGraph, CCC, Context Mode, or a narrow
  native read according to the shape of the question.
- Send one task envelope.
- Validate one matching result.
- Persist durable, evidenced lessons through Basic Memory.
- Preserve the two-event audit trail.
- Report awaiting tasks, recent results, and malformed or unmatched events.
- Audit task closure, worktree scope, checks, and release consistency.

## Advisory hooks

When vendor adapters are enabled, Claude and Codex receive two non-blocking
nudges: one on an incoming Code4Me task envelope and one on broad source fallback
attempts. The hooks only add context; they never invoke tools, write memory,
block a call, or grant permission. There is deliberately no SessionStart hook.

OpenCode receives the incoming-envelope nudge through
`.opencode/plugins/code4me.mjs`. Its current pre-tool hook exposes mutable tool
arguments but no safe advisory-context channel, so the broad-source nudge is not
installed there.

With Crowded, enable these adapters in the project recipe:

```toml
[[plugin]]
name = "code4me-ntg"
source = "https://github.com/indie-hub/code4me-ntg.git"
adapters = true
```

Run the hook checks with `node --test tests/hooks.test.mjs`.
