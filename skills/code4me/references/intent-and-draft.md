# Intent and fast drafting

Read when behavior or architecture has an important unresolved choice. Direct
work needs concise intent, not a separate design brief.

## Intent

Record `request` (original text or an exact accessible reference), `outcome`
(user-visible improvement), `example` (situation and expected result),
`boundaries` (what stays true), and `assumptions` (inferences, not user decisions).
Ask only when ambiguity materially changes the result or needs new authority.
Ordinary implementation choices stay with the agents.

## Route

Choose `direct` for clear outcomes and approaches: a reproduced parser defect or
an established command rename. Choose `draft` when testing an unknown could
prevent substantial waste: a new interaction or disputed persistence model.
Risk and uncertainty are separate; critical work can be direct and a small
feature can need a draft.

## Draft

Declare one important unknown, the smallest runnable demonstration, a check or
observable success condition, a stopping budget (one vertical slice or bounded
probe), and what waits until finish. Do not create another tracker or timer.

Keep scope, isolation, data protection, and applicable invariants. Do not disable
checks or weaken production guarantees. Put provisional interfaces and holes in
the result, not TODO comments. Never publish or merge a draft as finished code.
Draft tests and replay baselines are hypotheses until independently challenged;
matching them does not establish correctness.

## Challenge

Use a context that did not build it, preferably another known vendor. Supply
the original request, relevant decisions, contract, exact artifact, and runnable
demonstration, not the desired verdict. Ask:

- Does demonstrated behavior deliver the outcome and success example?
- Which important assumption is contradicted or untested?
- Is the approach worth finishing, or is there a smaller convincing route?

Return `proceed`, `rethink`, or `blocked`, `intent_alignment`, evidence, and the
largest unresolved gap. `proceed` requires aligned intent and sufficient evidence
to justify finishing; it is not a correctness pass. Reuse this independent reviewer
for final validation if still eligible; phase names do not require a committee.

Allow one bounded rethink. Record the corrected interpretation or approach and
reason before redispatch. Only the user authorizes a material change to their
outcome or protected boundaries. A second failed challenge blocks this attempt.

## Finish and learn

Reuse useful draft code. Resolve required findings and complete acceptance,
edge cases, tests, integration, and documentation. Do not polish a rejected
approach. Final validation checks technical correctness and intent independently.

Promote supported observations and decisions with provenance and scope. A failed
draft can show why an approach fails in this situation, not a universal ban.
Transient stage history stays in the event log; reusable knowledge goes to Basic
Memory.
