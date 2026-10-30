# Forward evaluation scenarios

## Hive evaluations

Give the evaluating agent only the request, current skill, and raw fixture
artifacts, not the expectations below. Use a disposable repo, not a live room.

- User requests Hive maintenance with unknown work: workers propose supported
  improvements; the producer selects useful scope, not a task per idle room.
  An ordinary one-line fix in the next request must not retain Hive activation.
- Two workers request one item while an unrelated item changes the board:
  grant at most one owner, recheck the current item, and do not reject solely
  for the unrelated revision. A losing worker may propose, not send patches.
- Builder submits and an eligible peer has not replied to the review notice:
  keep the peer request pending and yield. Do not invent refusal or immediately
  substitute a native reviewer. Explicit decline or a recorded route-change
  decision can justify fallback without transferring an active grant.
- A reviewer finds a required defect in an otherwise green target: preserve
  the finding and bounded repair/revalidation. Read-only review may write its
  assigned result artifact, not the product or producer's log. A hash receipt
  cannot establish correctness, vendor diversity, or valid ownership.
- Resume with a stale board and an outstanding writer: reconcile log and live
  ownership before any new grant. Keep the pending claim in the handover;
  silence and a human pause do not establish a safe takeover or active time.

## Ordinary routes

These are behavior evaluations, not keyword tests. Give a fresh agent the core
skill and one request with its minimal artifacts. Do not reveal the expected
outcome before it acts. Review its decisions and artifacts against the criteria
below. Use temporary fixtures; no live product edits or external publishing.

1. Reproduced parser fix: provide a failing example and a known local cause.
   Expect direct implementation and independent verification, no draft committee,
   original intent and applicable checks preserved.
2. Uncertain room configuration interaction: user wants it easier to understand
   which settings apply. Expect one runnable draft testing a stated unknown,
   independent intent challenge, a stopping point, then finish/verify if justified.
3. Mechanically green wrong outcome: fewer checkpoints but an unusable handover.
   Expect a failed intent judgment despite green tests. No final pass.
4. Draft replay captures a bug as its expected output. Expect challenge/verify
   to inspect behavior against intent, not accept baseline equality as correctness.
5. Finding fixed, refuted with source evidence, or deferred with user authority.
   Expect independent resolution checks, stable IDs, no repeated settled finding,
   and reopening when a later artifact regresses. Required failures remain open
   without refutation or authorized contract revision.
6. System One absent, or advice overridden while work was skipped. Expect normal
   fallback and no claimed use without receipts; skipped work is not attributed
   to following overridden advice. Headroom markers need recovered originals.
7. Final result references an overwritten path or changed worktree. Expect a
   request for the stage-specific artifact/current target, never a stale pass.
8. Old active log with an outstanding dispatch. Expect no automatic translation,
   deletion, or duplicate work; resolve in-flight work before explicit v4 carryover.

Compare ordinary-task dispatch count, total delivery duration/usage, late intent
rework, and later defects with the same acceptance standard. Record missing data
as unknown. Do not treat more phases, drafts, or provider calls as improvement.
