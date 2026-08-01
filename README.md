# Code4Me Next Gen

The smallest useful Code4Me: one producer turns an engineering request into a
lightweight milestone of independently validatable tasks. Each task gets a
temporary team, the smallest capable model and effort for each role, and
mandatory independent validation. Audits deliberately use two blind
model-vendor passes when available.

The plugin contains four focused skills. The producer records classification,
team, dispatch, result, validation, and checkpoint events in the client
project's local `.code4me/events.jsonl`; Status and Housekeeping derive the live
state from that trail without changing it. The newest checkpoint is the compact
resume surface—there are no copied project templates or tracker forests.

For non-trivial work, Code4Me searches the shared Basic Memory project before
planning and carries relevant `memory://` references in the worker envelope.
Workers may return durable memory candidates; the producer validates,
deduplicates, and writes them back. Basic Memory is durable project knowledge,
the event log is task correlation, and Context Mode is working-context
processing.

## Current scope

- Open one lightweight milestone and split only where work can be validated
  independently.
- Classify tasks as light, standard, or critical; the weight changes validation
  rigor, not ceremony.
- Assign one producer, one implementer, and one independent validator per task,
  adding specialists only when the work needs them.
- Pick a fast, balanced, or deep model tier and appropriate effort per role;
  apply an exact vendor model only when a reviewed mapping exists.
- Discover Crowded's live roster, including normalized model-vendor identity,
  without fixed room-number assumptions; retain native workers as fallbacks.
- Route questions to Basic Memory, CodeGraph, CCC, Context Mode, or a narrow
  native read according to the shape of the question.
- Send one work envelope and one mandatory validation envelope for every
  engineering change.
- Validate one matching result for every delegated stage.
- Prefer an independent room for validation; for light or standard work only,
  clear and recycle the completed worker as a fresh-context fallback when two
  rooms are all that exist.
- Allow one bounded repair and one revalidation, then stop rather than loop.
- Persist durable, evidenced lessons through Basic Memory.
- Preserve lifecycle events and an append-only checkpoint for reliable resume.
- Audit code read-only through two blind vendor-distinct passes, synthesize
  agreement honestly, and never apply fixes automatically.
- Report milestones, teams, model choices, validation, checkpoints, and event
  integrity.
- Audit lifecycle closure, validation independence, checkpoint freshness,
  worktree scope, checks, and release consistency.

Two optional checklists live under `skills/code4me/references/`: use the design
brief only when a task truly needs design, and the validation checklist for the
independent review. They are guidance, not files to copy into every project.

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

Run the checks with `node --test tests/*.test.mjs`.
