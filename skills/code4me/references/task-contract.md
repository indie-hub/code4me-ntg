# Current task contract

Protocol `code4me-ntg/v4` and event `v: 4` are the only current format. No ID
translation: `task_id` always means the logical task; `stage_id` always means
one dispatch attempt. Never reuse a stage ID, including retries or repairs.
Use a fresh v4 log after explicitly carrying over unresolved older work; preserve
old bytes as history, not input to a legacy parser.

An outstanding dispatch is not proof the worker stopped. Confirm its terminal
result or a stop acknowledgement through the existing transport. If unreachable,
report unknown in-flight state and obtain a takeover decision before duplicate
writes. Do not infer quiescence from elapsed time. Link the preserved log and
each carried task's evidence and unresolved findings in the fresh checkpoint.

## Task envelope

The JSON example is a template. Replace example values with actual source,
criteria, members, commands, targets, and return routes. YAML with the same keys
is allowed. `team` lives in `task_opened`; the worker needs its own role and
contract, not a copy of every member's profile.

Every task requires protocol/type, required_skill, all three IDs, stage, route,
risk, producer/worker/vendor, assigned_role, delegation, goal, intent, acceptance,
constraints, context_refs, memory, target, and reply_to. Verification, quality_bar,
system_one, draft, and prior_result are explicit null when inapplicable. Draft
metadata is required on the draft route. Challenge/verify require prior_result
and a reviewable target. These conditional rules govern the template below.

```json
{
  "protocol": "code4me-ntg/v4",
  "type": "task",
  "required_skill": "code4me",
  "milestone_id": "M1",
  "task_id": "M1-T1",
  "stage_id": "M1-T1-draft-1",
  "stage": "draft",
  "route": "draft",
  "risk": "normal",
  "producer": "room-1",
  "worker": "room-2",
  "vendor": "anthropic",
  "assigned_role": "implementer",
  "delegation": "forbidden",
  "goal": "Demonstrate the proposed behavior",
  "intent": {
    "request": "Original user text or exact accessible source reference",
    "outcome": "Observable user improvement",
    "example": "Situation and expected experience",
    "boundaries": [],
    "assumptions": []
  },
  "acceptance": ["Observable stage criterion"],
  "constraints": [],
  "draft": {
    "question": "Which important unknown does this test?",
    "demonstration": "Runnable artifact or exact probe",
    "stop_when": "One vertical slice answers the question",
    "postponed": ["Named finish-only work"]
  },
  "verification": {"commands": [], "evidence": ["Runnable demonstration"], "invariants": []},
  "quality_bar": null,
  "context_refs": [],
  "memory": {"status": "empty", "searched": true, "refs": [], "reason": "No relevant note found"},
  "system_one": null,
  "target": {"commit": "Exact starting commit or unborn", "fingerprint": "Exact worktree fingerprint"},
  "prior_result": null,
  "reply_to": {"transport": "native", "room_number": null, "command": null}
}
```

Stages: `implement | draft | challenge | finish | repair | verify | audit | research`.
`direct` uses implement then verify. `draft` uses draft, challenge, finish, verify.
Repairs/rethinks consume the bounded budgets in the core skill. Audit and research
may be read-only tasks without product implementation; they do not generate a
production-validation pass. `assigned_role` names the actual bounded job.

One rethink is one revised draft plus its challenge. One final repair is one
repair dispatch plus its revalidation. A blocked/failed attempt does not reset
either allowance. Recover an interrupted stage's existing result before
redispatch; use a new stage ID for a genuine new attempt. Drafts have a concrete
stop condition, not a mandatory time/token quota. Further attempts need an
explicit recorded budget revision.

On the draft route retain the task's full intent and final acceptance in
`task_opened`. The stage's `acceptance` and `verification` describe only the
claim this stage must prove. Every draft includes `draft`; use `draft: null`
on the direct route. Finish and verify carry the full final criteria. Challenge
receives both the final intent and the draft claim. Never silently weaken either.

`verification` is null only when no credible check exists. Otherwise at least
one command or evidence target is non-empty. Invariants carry `id`, `statement`,
`source`, `check`, `pass_when`, and `change_policy: fixed | explicit_approval`.
A quality bar, when useful, carries `source`, `target`, `evidence`, `comparison`,
`pass_when`, `status: provisional | confirmed`, and any `revision_reason`.
Do not invent checks, tests, or artifacts solely to populate a field.

`memory.status` is used, empty, or unavailable. Used/empty require a completed
search; used carries read `memory://` refs. Unavailable requires `searched: false`
and a reason from an availability check. `system_one` is null if irrelevant;
otherwise use the provider descriptor in [system-one.md](system-one.md).

For challenge and verify, `target` names the immutable artifact/revision under
review and `prior_result` is its stage-specific result path or embedded result.
For a clean checkout the commit suffices; uncommitted work also needs a fingerprint.
Recheck before and after review. Changed relevant bytes invalidate that review.
Record the fingerprint method and included paths in checks; use the same method
and scope on both sides. Prefer an existing project helper. Otherwise hash a
sorted manifest of changed paths relative to the named commit: file types/modes,
SHA-256 of current contents, deletion markers, and task-owned untracked files.
Include code, tests, configuration, and fixtures the claim depends on. Declare
exclusions rather than silently dropping changed evidence. A clean commit alone
suffices only when there are no relevant uncommitted changes.

When external files are needed, use a filesystem-safe stage ID and a unique
.code4me/results/<stage_id>.json path or the transport's immutable artifact path.
Record its SHA-256 in checks before the next dispatch and verify it before use.
Never overwrite that result. Embedding the accepted result in the next envelope
is an equally valid alternative, with no extra file.
For native delivery use the normal join. For Crowded supply a numeric producer
room and exact send command using this stage ID and Doorbell role `result`.

## Result

```json
{
  "protocol": "code4me-ntg/v4",
  "type": "result",
  "milestone_id": "M1",
  "task_id": "M1-T1",
  "stage_id": "M1-T1-draft-1",
  "stage": "draft",
  "worker": "room-2",
  "vendor": "anthropic",
  "outcome": "complete",
  "summary": "Observed stage outcome, including remaining holes",
  "target": {"commit": "Exact resulting commit", "fingerprint": "Exact reviewed bytes"},
  "files_changed": [],
  "checks": [{"check": "Exact check or invariant ID", "result": "Observed result"}],
  "blocker": null,
  "intent_alignment": null,
  "verdict": null,
  "findings": [],
  "resolutions": [],
  "largest_gap": null,
  "deferred_work": [],
  "tool_evidence": [{"tool": "Basic Memory", "action": "search/read", "result": "Actual references, empty result, or unavailable reason"}],
  "decision_receipts": [],
  "memory_candidates": []
}
```

Match protocol, milestone, task, stage ID, stage, worker, and dispatched vendor.
`outcome: complete | blocked | failed` describes stage execution, not acceptance.
A completed review may request changes. Required checks failing or missing prevent
an implementation stage from claiming complete; a reviewer records failures as
findings. Challenge verdict: `proceed | rethink | blocked`. Verify verdict:
`pass | changes_requested | blocked`. Other stages use null unless an audit
reports its own overall decision. Reviews require `intent_alignment`:
`aligned | partly_aligned | misaligned | unclear`, with evidence in checks or
findings. Proceed/pass require aligned intent. Missing intent evidence blocks
review; contradicted intent requires rethink/changes_requested. A clear request
can legitimately produce a direct task with no challenge stage.

Each finding has a task-stable `id`, perspective, `required | advisory` priority,
location, consequence, evidence, and `open | resolved | reopened` status. Responses
in `resolutions` use `finding_id`, `action: fixed | refuted | deferred`, evidence,
and authority when deferring requires a decision. Reviewer checks determine
resolution status; author claims alone do not close findings. Existing resolved
findings are not reissued unless evidence changes or a regression occurs.

Every complete result has non-empty truthful tool evidence. Empty receipts and
memory candidates are valid. Preserve provider receipts exactly under the
provider contract. Do not put secrets or private reasoning into any artifact.

## Event log

The producer appends compact JSON lines. Common fields are `v: 4`, `type`, `ts`
(ISO 8601), and applicable milestone/task/stage IDs. Store accepted envelope/result
objects inline or at immutable paths with hashes; do not copy the whole contract
into every checkpoint. Use these events:

- `milestone_opened`: goal, acceptance, constraints.
- `task_opened`: intent, route, route_reason, risk, risk_reason, team, final
  acceptance, verification, quality_bar. Team members record identity, vendor,
  role, capability/model/effort evidence, selection_reason, and control status.
- `task_controlled`: member, requested settings, applied results, observed settings.
- `dispatch`: exact task envelope (or immutable reference) and correlation IDs.
- `result`: accepted result (or immutable reference), same correlation IDs.
- `task_validated`: passing verify stage ID, validator/vendor, exact target,
  intent_alignment and evidence references. Draft/challenge results cannot emit it.
- `task_accepted_with_waiver`: user decision, target, unresolved findings, limits.
  It never substitutes for task_validated or permits a validated milestone closure.
- `task_changed`: recorded authorized contract revision before new dispatch.
- `checkpoint`: state, active tasks/stages, accepted work, blockers, decisions,
  result/target references, memory refs, next action; handovers also include repo
  identity, upstream sync, worktree scope, checks, release state, and verdict.
- `milestone_closed`: validated product tasks and acceptance evidence. Purely
  read-only audit/research tasks cite supported accepted results instead; never
  emit a product-validation pass for them.

Trello adds the four board events documented by its skill, also at v4. Finding
responses live in results; System One receipts live on the relevant dispatch or
result. No extra findings tracker, scorecard store, or per-microdecision event.
