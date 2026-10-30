# Godot: sufficient verification without duplicate replay runs

Use Code4Me 1.1.1 or newer for this task. Work in:

`/Users/bruno/Documents/Development/bruno/Godot/godot-pipeline`

Reduce redundant verification without weakening the product's acceptance,
independent review, or integration/release coverage. This request authorizes
a focused revision of the project's verification policy, not product changes.

Read current project instructions, active work and verification contracts,
`tools/replay/README.txt`, and the actual replay/session selection behavior.
Preserve unrelated work. Use the existing session selectors and prerequisites;
do not invent commands or assume a selected run proves full-suite coverage.

Revise the existing policy so that:

- Implementation and repair use the affected unit/regression checks and replay
  sessions, including prerequisites and relevant shared boundaries.
- The required full replay runs on the integrated candidate before its broad
  gate is accepted. Release gates remain intact. Relevant changes after that
  run invalidate its coverage and require another broad run before acceptance.
- An independent reviewer may reuse that run when its exact command, target,
  relevant inputs/configuration/runtime, initial state, outcome and retained
  output are inspectable and still apply. The reviewer independently examines
  intent, changes and test expectations, adding targeted probes for real gaps.
  Do not repeat the full suite solely because another reviewer joined.
- Broader testing is required for shared-state, persistence/write-gate,
  protocol/serialization, runner/baseline, relevant fixture/environment changes,
  or an impact that cannot be bounded confidently.
- A comment-only change is not automatically exempt: check whether it affects
  generation, executable examples, configuration or test behavior. Otherwise
  verify the exact diff and reuse still-applicable evidence.
- Missing, contradictory, untraceable or stale evidence requires fresh checks
  or an honest blocker. Never call someone else's execution your own.

Keep this in the existing policy and Code4Me verification/results. Do not add
a testing framework, cache, dependency registry, per-test receipt system, or
another tracker. Do not delete tests, weaken assertions, bless new baselines,
or change product code to make the process cheaper. Do not change the Godot
engine, reset rooms, install dependencies, commit or push.

Make the change prospective and explicit. Do not rewrite history or silently
waive an active task's verification contract. Record any applicable contract
revision under this authorization before using the new policy for that task;
preserve required behavior and evidence throughout.

Have an independent reviewer check the revised policy using three concrete
cases: a focused runtime fix, a comment-only repair, and a shared-state change.
The review should show which checks run now, which evidence can be reused,
and when a full replay is required. Reuse trustworthy existing evidence where
applicable. Do not launch a full replay merely to demonstrate a docs-only
policy change; if an explicit remaining rule requires one, state that conflict
and resolve the policy coherently rather than quietly skipping it.

Deliver the small policy diff, independent review result, evidence/limitations,
and a short explanation of which duplicate runs this removes. Do not claim
measured time or token savings without actual measurements.
