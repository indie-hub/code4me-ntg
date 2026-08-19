# Code4Me Next Gen

The smallest useful Code4Me: one producer turns an engineering request into a
lightweight milestone of independently validatable tasks. Each task gets a
temporary team, the smallest capable model and effort for each role, and
mandatory independent validation. Audits deliberately use two blind
model-vendor passes when available.

The plugin contains five focused skills. The producer records classification,
team, dispatch, result, validation, and checkpoint events in the client
project's local `.code4me/events.jsonl`. Housekeeping audits product state and
appends one compact handover checkpoint; Status and the producer resume from it.
The optional Trello skill adds a two-way human work board without replacing
that event history. There are no copied project templates or tracker forests.

For non-trivial work, Code4Me searches the shared Basic Memory project before
planning and carries relevant `memory://` references in the worker envelope.
Workers may return durable memory candidates; the producer validates,
deduplicates, and writes them back. Basic Memory is durable project knowledge,
the event log is task correlation, and Context Mode is working-context
processing.

## Current scope

- Open one lightweight milestone and split only where work can be validated
  independently.
- Keep coherent work in one task; split only for independent evidence, hard
  dependencies, distinct specialist context, or safe parallel value.
- Classify tasks as light, standard, or critical; the weight changes validation
  rigor, not ceremony.
- Assign one producer, one implementer, and one independent validator per task,
  adding specialists only when the work needs them.
- Recommend architect, researcher, security-reviewer, or QA stages only for a
  bounded task need; never bind those roles permanently to a room or vendor.
- Carry relevant root and scoped `AGENTS.md` / `CLAUDE.md` files into task
  context without creating, merging, or synchronizing project instructions.
- Load only the language and platform references matched by the task's paths,
  manifests, or explicit deployment target.
- Pick a fast, balanced, or deep model tier and appropriate effort per role;
  apply an exact vendor model only when a reviewed mapping exists.
- Discover Crowded's live roster, including normalized model-vendor identity,
  without fixed room-number assumptions; retain native workers as fallbacks.
- Keep the producer orchestration-first: delegate implementation to a ready
  Crowded room, then a native subagent, and self-implement only as a recorded
  fallback when neither route exists.
- Route questions to Basic Memory, CodeGraph, CCC, Context Mode, or a narrow
  native read according to the shape of the question.
- Send one work envelope and one mandatory validation envelope for every
  engineering change.
- When comparison adds value, let the producer propose one inspectable quality
  bar, expose it as provisional, and have the validator report the largest gap
  against the actual artifact.
- Mark every cross-room delivery as a mandatory Code4Me work order and reject a
  completed result that lacks truthful toolbox evidence.
- Treat Doorbell delivery as asynchronous: checkpoint after dispatch and leave
  both producer and worker rooms idle instead of running background waiters;
  join host-native subagents normally and collect their results.
- Validate one matching result for every delegated stage.
- Keep tasks, milestones, status, plans, TODO/FIXME items, deferred work, and
  handovers out of source comments; carry them in envelopes and lifecycle
  events instead.
- Prefer a validator whose known vendor differs from the implementer; for light
  or standard work only, record degraded coverage when no such route exists.
  Clear and recycle the completed worker as a fresh-context fallback when two
  rooms are all that exist.
- Allow one bounded repair and one revalidation, then stop rather than loop.
- Persist durable, evidenced lessons through Basic Memory.
- Require actual Basic Memory search/read evidence for standard and critical
  work, with explicit `searched`, status, references, and unavailable reasons.
- Preserve active lifecycle events append-only; rotate only oversized, fully
  closed history into verified immutable archives so routine resume stays
  bounded.
- Audit Basic Memory health at meaningful boundaries, consolidating only on
  explicit closeout while preserving provenance and superseded guidance.
- Audit code read-only through two blind vendor-distinct passes, synthesize
  agreement honestly, and never apply fixes automatically.
- Report milestones, teams, model choices, validation, checkpoints, and event
  integrity.
- Audit lifecycle closure, validation independence, checkpoint freshness,
  worktree scope, checks, and release consistency.
- Synchronize one Trello card per logical task when configured, accepting human
  work through Ready while preserving Code4Me validation as the completion gate.

Two optional workflow checklists live under `skills/code4me/references/`: use
the design brief only when a task truly needs design, and the validation
checklist for the independent review. Compact language and platform baselines
are selected conditionally and project instructions always override them. None
of these references are files to copy into every project.

## Worker-contract hooks

When vendor adapters are enabled, Claude and Codex receive two non-blocking
context injections: a mandatory Code4Me workflow reminder on incoming task
envelopes and an advisory nudge on broad source fallback attempts. The worker
must return blocked when Code4Me is unavailable, and the producer rejects
completed results without toolbox evidence. Hooks never invoke tools, write
memory, block a call, or grant permission. There is deliberately no SessionStart
hook.

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

Run the checks with `node --test`.
After installing the optional MCP recipe, run
`node tests/trello-mcp-smoke.mjs` to verify its required tool surface. CI runs
both checks on Linux, macOS, and Windows.

## Optional Trello work board

`code4me-trello` maps one Trello card to one logical Code4Me task and supports
both human-created and agent-created work. It is optional: without
`.code4me/trello.json` or the MCP, ordinary Code4Me behavior is unchanged.

On macOS and Windows, let Crowded install the pinned package locally and launch
Code4Me's cross-platform credential wrapper:

```toml
[[setup]]
name = "trello-mcp-install"
command = "npm"
args = ["install", "--prefix", ".crowded/tools/trello", "@delorenj/mcp-server-trello@1.8.1"]

[[mcp]]
name = "trello"
command = "node"
args = [".crowded/plugins/code4me-ntg/scripts/trello-mcp-launch.mjs"]
cwd = "."
```

Create `.code4me/trello.json` using the board and credential contract documented
in [`skills/code4me-trello/SKILL.md`](skills/code4me-trello/SKILL.md), then add
the file to `.gitignore` when it contains credentials. `TRELLO_API_KEY` and
`TRELLO_TOKEN` environment variables remain supported and take precedence over
the JSON values.
