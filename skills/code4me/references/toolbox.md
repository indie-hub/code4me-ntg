# Toolbox and Basic Memory

Route by question shape:

| Question | First choice |
|---|---|
| What did we decide or learn before? | Basic Memory |
| Where is this exact symbol used? | CodeGraph |
| Where is behavior like this implemented? | CCC (CocoIndex Code) |
| What does this large log/report/output show? | Context Mode |
| What exact text is in this small file or config? | Narrow native read/search |

Basic Memory is the shared, durable project memory. `.code4me/events.jsonl` is
only an append-only task ledger. Context Mode manages large working context.
Vendor-local memories are not the Code4Me source of truth.

## Memory contract

For every non-trivial task:

1. Search Basic Memory before planning, starting with `code4me memory map`, then
   task-specific decisions, preferences, conventions, lessons, and bug patterns.
2. Read relevant results and carry their `memory://` references in the task
   envelope. Use `empty` when the search finds nothing relevant and
   `unavailable` when the MCP or project is unavailable.
3. A worker reads supplied references before planning and may search further.
4. A worker returns only durable candidates with evidence. The producer checks
   the evidence, searches for duplicates, and updates or writes Basic Memory.

On first use in an empty Basic Memory project, create one `code4me memory map`
note. Do not create bucket notes. Durable notes are atomic and carry `code4me`
plus one primary kind: `decision`, `preference`, `lesson`, `bug-pattern`, or
`convention`. `integration` and `security` may be extra tags.

If the project already has memory, follow its structure. Never mass-retag,
rename, or move existing notes. Do not store task progress, raw logs, secrets,
credentials, tokens, or private user data.

## Source and output routing

- Use CodeGraph for exact definitions, callers, callees, neighbors, and impact.
- Use CCC for semantic or fuzzy source discovery when the symbol name is
  unknown.
- Use Context Mode for derived analysis over large logs, reports, generated
  output, documentation, or already-narrowed source.
- Use narrow native reads/searches for exact text, small files, configs, or
  source ranges already identified by an index.

When a preferred tool is missing or stale, use the next suitable route and say
what degraded. Memory records prior knowledge; live source evidence wins when
they disagree.
