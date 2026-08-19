# Trello card contract

One card is one independently executable and independently validatable Code4Me
logical task. A milestone groups cards; acceptance criteria live in one Trello
checklist named `Acceptance criteria`.

## Managed lists

| List | Meaning |
| --- | --- |
| `Inbox` | Idea, proposed work, or incomplete request; not authorized |
| `Ready` | Human-authorized and ready for Code4Me intake |
| `In Progress` | Claimed or dispatched implementation |
| `Validation` | Implementation returned; independent validation is pending |
| `Blocked` | Cannot proceed; use the `needs-human` label when appropriate |
| `Done` | Passing Code4Me validation exists after the latest implementation |

The list is current state, not history. Code4Me events and card comments preserve
the history.

## Card shape

Use an outcome-oriented title. Keep the human-owned description short:

```markdown
## Outcome
<observable result>

## Context
<why this work exists>

## Scope
<included boundary>

## Out of scope
<important exclusion, or omit>

## Validation
<smallest check that proves the outcome>
```

Use the `Acceptance criteria` checklist for observable completion conditions.
Use the card due date for a real external deadline, not an estimate. Use labels
for domain or attention such as `needs-human`; do not duplicate list state in
labels.

When the board already provides them, use optional custom fields `Task ID`,
`Milestone`, `Weight`, `Requested executor`, and `Provenance` for a Jira-like
scan view. Custom fields require a paid Trello plan in the selected MCP, so
never require them for correctness; `task_board_linked` events remain the
mapping authority.

An optional requested executor is a routing preference such as `any`, `codex`,
`claude`, `opencode`, or a capability like `windows`. Never persist a Crowded
room number: rooms are ephemeral, and the Code4Me producer still selects the
smallest capable model and effort unless the user requires a vendor.

## Ownership

- Human-owned: request, priority, due date, acceptance criteria, routing
  preference, authorization, and cancellation.
- Agent-owned: implementation state, evidence, validation result, and blocker
  diagnosis.
- Code4Me-owned: milestone/task correlation, provenance, and sync cursor.

Agents add concise comments for accepted dispatches, results, validation,
blockers, and conflicts. Do not rewrite the human description as a progress log
and never interpret prose comments as commands.

## Agent-created work

Create a card only when the work is independently valuable. Authorized work
inside an active milestone may use its derived lifecycle list. Newly discovered
scope, ideas, and deferred work enter `Inbox`; the agent cannot self-authorize a
scope expansion. Never create cards for mechanical substeps or mirror task
bookkeeping into source comments.
