# Hive Mode

Use only when the user requests Hive Mode or the Hive workflow. This is a
coordination option inside Code4Me, not a scheduler or a new protocol. Use the
[v4 contract](task-contract.md), normal direct/draft routes, memory rules,
repair budgets, and independent validation. It works with native agents,
Crowded rooms, or both. Do not require Crowded to use it.

## Outcomes and one board

The producer owns intent, priorities, claims, integration, and acceptance.
Delegate implementation and substantial investigation. Invite bounded
read-only discovery when the work is not yet known; workers propose a concrete
problem, evidence, intended result, check, and likely file scope. Select useful
work by impact and effort. Reject unsupported or cosmetic work rather than
creating tasks to occupy rooms. A simple coherent fix needs no swarm.

Use one compact board at `.code4me/BOARD.md`, or reuse the project's existing
coordination board. The producer alone updates it. Each item has a logical
task ID, outcome, dependencies, eligibility, state, owner, worktree or review
target, and evidence/open-finding references. State can be open, claimed,
submitted, awaiting review, needs changes, validated, or blocked. Different
stages of one task retain its task ID and get fresh stage IDs.

The board is a current view, not another history. Record `mode: hive`, board
path/revision, active claims/stages, pending requests, and the next action in
the existing checkpoint. Use normal task, dispatch, result, and validation
events for history. Combine meaningful transitions; do not log every notice,
hold, or unchanged state. Do not add a second ledger or source-code task notes.
On resume reconcile the board with the log, actual worktrees, and live claims
before granting work; uncertainty is not permission to duplicate a writer.

## Workers choose; the producer grants

Send a short board-change notice to eligible workers when useful work becomes
available. Name the board revision and changed items, not a preferred winner
or the full contract. Workers inspect it and request an eligible item using
its task ID and revision. The producer checks current item state, dependencies,
capability, and ownership, then serializes one grant with the full envelope.
An unrelated board revision need not invalidate a still-eligible request.

A request, delivery receipt, or notice is never permission to implement.
Without a grant, workers may inspect read-only, report an observation, or
propose a task. Do not implement competing versions or send patches around
the claim process. Proposals do not authorize redispatch: workers remain
leaves under `delegation: forbidden`.

Competing requests are normal. Update the board once; reply to a stale or
duplicate request only when the worker needs a new decision. Recheck
eligibility before granting queued requests. Parallel writers require verified
isolated worktrees, one writer per checkout; disjoint paths are not isolation.
Do not transfer an active claim until a terminal result or confirmed stop and
preserved unfinished state establish a safe handoff. Time alone proves neither.

## Review is eligible work

A submission opens an independent review item bound to the exact result and
target. Prefer a known distinct vendor and preserve critical-work requirements.
Reviewers must not review their own implementation or repair. Put the review
on the board and notify eligible peers instead of immediately assigning the
producer's native reviewer. Reserve validation capacity before fan-out.

Record a concrete native-fallback condition when opening review: no eligible
peer route, explicit declines from eligible peers, or an explicit handoff
decision under current authority. If an eligible Crowded peer is still pending,
checkpoint it and yield; native agents use normal joins. Silence, elapsed time, and a queued notice are not
refusal or proof that the peer stopped. A decision to change the route names
the reason; it does not erase outstanding grants. An ungranted late request
does not authorize a second review or reopen an accepted item.

Give review the exact target, original intent, changed scope and connected
boundaries, relevant risks, and required checks. Read
[bounded validation](validation.md#bounded-review). Revalidation checks the
repair and affected boundaries, not the whole investigation again. The final
untouched-context check covers integrated acceptance, interactions, and open
risks; it need not repeat every component probe. Never waive required checks
to reduce cost.

## Evidence without transcription

Workers write their own immutable `.code4me/results/<stage_id>.json` or use the
host's immutable result artifact. Read-only reviewers may write only their
assigned result artifact, not product files or the board/log. Give native
reviewers that output path directly; do not copy their JSON by hand.

For JSON files, use the bundled [evidence helper](../scripts/evidence.mjs):

```sh
node /path/to/code4me/scripts/evidence.mjs task.json
node /path/to/code4me/scripts/evidence.mjs result.json --task task.json
```

It checks required envelope fields and returns IDs, an absolute file path, and
the SHA-256 of the exact bytes read. Send that receipt through the envelope's
existing return route. The producer rechecks the file/hash and dispatched
identity before accepting it; do not silently repair placeholders or mismatch.
For YAML, use native transport evidence or a checked JSON artifact. The helper
does not grant work, send messages, prove independence or truth, or fingerprint
the product. Hashing the result is not hashing the reviewed target.

After submitting, workers may request the next eligible contribution without
editing it first. Crowded workers and producer end their turn after accepted
delivery; no polling, watchers, or background waiters. Native joins remain
normal. If delivery is uncertain, record it as uncertain, not lost or accepted.

## Close and learn

Require supported independent acceptance of the integrated result. Keep
unresolved findings visible and promote useful scoped lessons to Basic Memory
under the existing rules. Do not create a separate memory ritual.

When asked to assess the run, derive proposals, requested versus assigned
work, concrete fallback reasons, repairs, and coordinator interventions from
existing evidence. Distinguish participant reports from measurements. Human
pauses are not system failure; sparse timestamps are not active working time.
Report token/cost data only where available, including review and retry cost.
