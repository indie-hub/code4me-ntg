# Challenge and final validation

Use an independent context and the exact target. Reviewers do not modify product
files. Reusing an independent challenger as final validator is valid; using the
builder's own context is not. Honor critical cross-vendor requirements.

## Evidence first

Read the original request, relevant decisions, intent, scope, and applicable
project standards. Preserve the prior result at a stage-specific path or embed
it before reusing its worker. Bind review to the commit and any worktree
fingerprint; compare before and after. Never judge a mutable shared result.yaml
or let an old pass cover later relevant edits.

Recover required Headroom originals using the toolbox rule. Source summaries,
matching replay baselines, green tests, and another agent's approval do not by
themselves prove intended behavior. Independently inspect the actual artifact,
judge the test expectations, and obtain the execution evidence needed for the
claim. Reuse trustworthy runs under the rules below; independence does not
require repeating every command. Missing required evidence means blocked with
the exact gap, not an invented pass.

## Challenge: should this be finished?

Read [intent-and-draft.md](intent-and-draft.md). Inspect the smallest runnable
slice against the user outcome and example. Test the important assumption.
Return proceed, rethink, or blocked and intent_alignment with evidence. Required
findings explain a direction problem or missing proof; finish-only holes are
not automatically draft failures. Proceed is not a production correctness pass.

## Verify: is this ready?

- Independently check every final acceptance criterion, exact command, artifact,
  and sourced invariant; report results and any execution limitation truthfully.
- Check intent separately from mechanics. All-green technical checks with the
  wrong user outcome require changes_requested. Unresolved material ambiguity
  requires blocked, not an invented preference or numeric intent score.
- Inspect changed code and connected boundaries. Use only perspectives the change
  warrants: correctness/data integrity, security/privacy, resilience/performance,
  maintainability, interaction/QA. Specialists are bounded help, not required seats.
- Apply existing executable checks to what they can reliably decide. Evaluate
  semantic questions from evidence; never treat an LLM judgment as a deterministic
  gate. Check that tests/baselines were not weakened to fit the implementation.
- Inspect the actual quality-bar target when present. Do not move the bar to excuse
  a miss. Source comments explain code, never task IDs, status, plans, TODO/FIXME,
  deferred work, or handovers; report introduced violations as required findings.
- Return pass only with aligned intent, every required criterion supported, and
  no open required finding. Otherwise return changes_requested or blocked.

## Change-scoped verification

Choose the smallest checks that support the claim and affected boundaries.
In the existing verification description, say what the checks cover and what
would require broader testing. Do not create another plan, matrix, or tracker.

- During implementation, use focused unit/regression tests and affected
  component or replay sessions, including their real prerequisites.
- During repair, reproduce the finding and check its fix and affected callers
  or shared behavior. Do not restart unrelated investigations.
- At integration, run the project's required broad gate on the assembled
  candidate. Preserve cross-component and cross-session coverage.
- Reviewers inspect that evidence and run independent targeted probes where
  needed. A new reviewer alone is not a reason to repeat an expensive suite.
- For comment/documentation-only changes, inspect the diff and relevant checks;
  do not assume harmlessness if generated code, examples, configuration, or
  executable documentation can change behavior.

Broaden testing for changes to shared state, protocols/serialization,
persistence/write gates, security boundaries, the runner or golden baselines,
relevant fixtures/configuration/runtime, or an uncertain impact. Relevant
changes after a broad run require a new broad run before that gate can pass.
A focused pass never substitutes for required integration or release coverage.
Respect explicit project rules, including fresh independent execution when
required. Propose a policy revision separately; do not silently override it.

## Reuse execution, not judgment

A reusable run has inspectable provenance: the exact command and outcome,
tested commit plus relevant dirty-state fingerprint, covered scope, relevant
inputs/fixtures/configuration and runtime/environment, and retained output or
an immutable artifact reference. A bare reported PASS is not sufficient.
Use existing result checks and evidence references; no new receipt schema.

The reviewer checks those artifacts and their relevance to the current target.
A changed HEAD alone need not invalidate unrelated focused evidence: inspect
the intervening diff and affected dependencies, tests, fixtures, configuration,
runtime, and stateful setup. Reuse only when that scope is demonstrably
unchanged. Missing scope, uncertain dependencies, changed relevant inputs,
untrusted output, or contradictory results require fresh checks or a blocker.

In result checks, distinguish commands you executed from evidence you reused;
cite its source/target and the reason it remains applicable. Do not claim you
ran another worker's command. A clean broad run can be shared by implementer,
integrator, and reviewer only for the covered candidate and environment, when
project policy permits. Each reviewer still makes an independent decision on
intent, correctness, test expectations, and open findings.

## Bounded review

Start with the exact changed target, acceptance, affected call paths, and
declared risks. Inspect connected code and independently challenge the test
expectations. Reuse trustworthy recorded execution evidence where appropriate,
but make your own judgment and run the probes needed to close material gaps.
Do not turn each small change into a whole-repository audit or exhaustive
input matrix. Widen scope only for a concrete risk or unsupported criterion.
Stop when every required criterion has support and material findings have a
verdict, or return the exact blocker. Cost pressure never permits skipping a
required check or hiding a finding. Report the largest remaining gap and any
untested limits rather than adding speculative work.

## Finding lifecycle

Use stable IDs within the logical task. State perspective, required/advisory,
location, consequence, evidence, and status. Include the highest-leverage gap
without hiding other required findings. Preferences alone do not block delivery.

The author responds to each finding: fixed, refuted with evidence, or deferred
with appropriate authority and a follow-up. A required acceptance failure stays
open unless evidence refutes it or the user explicitly changes the contract.
Check resolutions independently. Do not repeat resolved comments without new
evidence; reopen regressions with the same ID. Revalidate changed evidence and
its affected boundaries, not every unrelated investigation from scratch.

One bounded repair and one revalidation are allowed before blocking. Draft
rethinks have their own one-attempt budget. A user-authorized exception is a
recorded decision, not permission for an endless loop.

## Learn from the review

A supported finding may become a scoped Basic Memory observation or decision.
Repeated failures should lead to better context, a capability, or a shared
executable check, with the incident and evidence linked. Propose policy changes
for review rather than turning every reviewer preference into a global rule.
