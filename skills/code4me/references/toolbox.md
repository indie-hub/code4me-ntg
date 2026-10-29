# Toolbox and shared memory

Route the question to the smallest useful source:

| Question | First choice |
| --- | --- |
| What did we decide or learn? | Basic Memory |
| Where is this symbol used? | CodeGraph, when the repository is indexed |
| Where is similar behavior implemented? | CCC (CocoIndex Code) |
| What does this large output show? | Context Mode |
| What exact text is in this known file? | Narrow native read/search |

Use CodeGraph first for code navigation when `.codegraph/` exists at the repo
root. Otherwise skip it; indexing is the user's decision. Optional tools may
be absent or stale. Use another suitable route and report the limitation.
Live source wins over stale memory; memory supplies decisions code cannot explain.

## Basic Memory consultation

Before planning, check project availability, search its memory map and relevant
decisions/lessons, and read useful results. Carry the smallest relevant set of
`memory://` references. Workers read supplied refs, then search for specific gaps
when needed; do not repeat identical searches as a ritual. Return evidence of
what was searched/read, reused, contradicted, or unavailable.

Use `used` with read references, `empty` after a completed search with no relevant
result, and `unavailable` only after the capability/project cannot be reached.
Used/empty set `searched: true`; unavailable sets false and a reason. Missing
knowledge is not permission to invent it. Distinguish no relevant result from
an unanswered material question; investigate the latter or state an assumption.
Memory absence alone does not block otherwise supported work.

## Evidence-backed knowledge

Basic Memory is the shared durable store. The event log owns task progress;
Context Mode owns working-context processing. Vendor-local notes are not the
project's authoritative shared record. Follow an existing project structure;
for an empty project create one `code4me memory map`, not a tree of blank buckets.

Workers return `memory_candidates` (or []). Producers deduplicate and promote
supported claims, not transcripts. A useful atomic note records:

- claim and kind: observed behavior, decision, preference, lesson, or bug pattern;
- scope and conditions under which it holds;
- source artifact/span or exact evidence reference and observation/decision date;
- rationale, including why an attractive alternative was rejected when relevant;
- current, disputed, or superseded status, with a replacement link when applicable.

A draft may establish a scoped observation; it cannot establish project policy
without the appropriate decision. A reviewer preference is not a universal rule.
When knowledge changes, preserve provenance and link superseded guidance rather
than silently overwriting the meaning. Conflicts require source inspection;
newer text alone does not defeat better evidence. Read back writes and record
returned references. Never store secrets, raw logs, private reasoning, transient
branch/worktree/task state, or unvalidated hypotheses as established facts.

## Learn into the workflow

Repeated supported findings should change the next task: improve its context,
point to a reusable capability, or add an executable check where reliable.
Record the incident, consequence, and evidence behind a proposed rule. Run the
same predicate locally and in CI when practical. A check that relies on model
judgment is advisory evidence, not a deterministic guarantee. Authorization and
privacy boundaries must be enforced before exposing data; prompt instructions
alone do not enforce access control. Do not build a new memory engine for this.

## Headroom retrieval

When required evidence or instructions contain a compression marker, extract its
hash and request `/v1/retrieve/<hash>` from the configured Headroom base URL.
Read `original_content` before relying on it or claiming the source was read.
Retrieve only what the current decision needs. If retrieval expires, fails, or
returns another marker, try a narrow direct source read. Do not loop on the
same marker or reconstruct missing content from a summary. Report unresolved
evidence as unavailable; required evidence must be recovered before a pass.
