# System One providers

Read this reference when a callable System One provider may be available or
when reporting System One effectiveness.

## Capability discovery

System One is optional. Discover it from the current callable tool surface and
reviewed project or Crowded configuration. A skill or documentation package
alone is not a runtime. Mark a provider `ready` only after a read-only live probe
confirms the declared interface, model, and primitives. Never expose credentials
in an envelope, event, or receipt.

Use this capability shape:

```yaml
system_one:
  status: ready | unavailable | not_configured
  mode: shadow | active
  provider: <provider name or null>
  model: <provider-reported model or null>
  interface: mcp | http | sdk | none
  tools: [<callable tool name>]
  primitives: [<provider primitive>]
  receipt_required: true | false
  fallback: system2
  reason: <unavailable or not-configured reason, or null>
```

Default to `shadow`. In shadow mode, System One may recommend an answer but
System 2 still makes the operative decision. Use `active` only when explicit
project guidance enables it after representative validated receipts. A provider
failure always falls back to System 2 and never weakens another contract.
Evaluate a specific use case in shadow mode; do not repeat the full System 2
analysis merely to agree with advice. Shadow runs measure suitability, not
promised savings. Project guidance may enable active use for demonstrated,
low-risk context selection or probe ordering. Acceptance checks, independent
validation, and consequential decisions still require their normal evidence.

For TypeSafe, use the exact service-reported Jev model and preserve its typed
`Choice`, `Score`, or `Noul` output. Preserve raw probabilities. Do not convert a
`Noul` probability into generic confidence. TypeSafe remains one provider, not a
Code4Me dependency. Current primary references:

- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://github.com/typesafe-ai/skills/blob/main/skills/typesafe-ai/SKILL.md

When using TypeSafe to design a question, consult the separately installed
`typesafe-ai` skill if available. If absent, read the relevant official primitive
guidance for the callable interface; do not require installing another skill.

## Worker opportunities

Before a large context load or exploring several branches, consider one narrow
judgment over evidence already available:

- Shortlist retrieved files, symbols, or memory notes for the task. Open the
  selected sources and widen the search if they do not answer the question.
- Choose the next discriminating probe from plausible causes and bounded probe
  options. The probe establishes facts; the model's choice does not prove them.
- Select passages relevant to a specific claim before loading a larger bundle.
  Read the selected evidence and preserve required acceptance checks.

Include an insufficient-evidence or no-match option when candidates may miss the
answer. Use current evidence and explicit criteria. Batch independent questions
over the same state only when their answers can prevent later work. Do not add
routine routing calls when existing rules already decide. No call is a valid
outcome; there is no usage quota.

## Decision receipts

**A System One call should eliminate expensive work.** Before the call, name
the specific context load, System 2 reasoning, larger-model use, delegation,
probe, or branch exploration that the answer can avoid. If no expensive action
can be named, do not call System One. Use deterministic source, rules, and tests
directly when they already decide the question.

Capability declaration does not prove use. Every claimed consequential System
One call needs one compact receipt:

```yaml
- decision_id: <stage-local stable id>
  request_id: <provider or adapter request id, or null>
  evidence_status: verified | reported
  recorded_by: provider | adapter | hook | observer | agent
  provider: <provider>
  model: <provider-reported model>
  interface: mcp | http | sdk
  purpose: <worker_route | effort | next_action | evidence_check | other>
  avoids: <specific expensive action>
  avoided: true | false
  primitive: <provider primitive>
  latency_ms: <non-negative integer or null>
  answer: <compact typed answer>
  probabilities: <compact provider output or null>
  disposition: shadow_match | shadow_override | active_accept | escalated | error
  outcome_ref: <later result or validation reference, or null>
```

Only a provider, adapter, hook, or observer independent of the agent may set
`evidence_status: verified`, and a verified receipt requires a non-null
`request_id`. Agent-supplied evidence uses `recorded_by: agent` and is
`reported`. No receipt means no claimed use. Store no raw state, prompt,
credentials, private reasoning, or secret in a receipt.

Set `avoided: true` only when the named action was actually skipped. A false
value is honest evidence that the call did not save work, not a reason to hide
the receipt.
This field records skipped work, not its cause. When advice was overridden,
`avoided: true` does not count as advice-followed savings. Preserve the
disposition and explain the observed outcome briefly in `outcome_ref`.

Attach producer receipts to `task_assigned`. Return worker and validator receipts
in the matching result. Use `decision_receipts: []` when no consequential System
One call occurred.

## Derived effectiveness

Derive metrics from existing events. Do not create a second telemetry store.
Report verified and reported receipts separately:

- stages with a verified receipt divided by stages that declared `status: ready`;
- shadow agreement, override, escalation, and error rates;
- receipts that actually avoided their named expensive action;
- median and p95 verified latency with sample size;
- first-pass validation and repair rates split by verified-receipt presence;
- provider-reported cost only when present; never invent token or cost savings.

Deduplicate by stage and `decision_id`, including receipts copied into
checkpoints. Split skipped work by advice followed (`shadow_match` or
`active_accept`), overridden (`shadow_override`), escalated, or failed. None of
these counts alone measures savings.

These comparisons are observational, not causal. For causal efficiency, compare
representative tasks in shadow or controlled A/B runs against direct System 2.
Measure total task duration, actual model usage or cost, validation outcome, and
repair rate. Report calibration only when receipts have later labeled outcomes;
otherwise report `n/a`. Never use provider claims or agent estimates as measured
project savings.

Start with a small context-shortlisting comparison on comparable tasks with
the same acceptance checks. Record total context tokens or model cost when
available, total duration, missed relevant evidence, and validation/repair
outcomes, including provider overhead. Missing usage data means savings are
unknown. Enable the use case only if consumption falls without worse outcomes;
otherwise revise or stop it. Keep observations in existing task evidence.
