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

For TypeSafe, use the exact service-reported Jev model and preserve its typed
`Choice`, `Score`, or `Noul` output. Preserve raw probabilities. Do not convert a
`Noul` probability into generic confidence. TypeSafe remains one provider, not a
Code4Me dependency. Current primary references:

- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://github.com/typesafe-ai/skills/blob/main/skills/typesafe-ai/SKILL.md

## Decision receipts

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

Attach producer receipts to `task_assigned`. Return worker and validator receipts
in the matching result. Use `decision_receipts: []` when no consequential System
One call occurred.

## Derived effectiveness

Derive metrics from existing events. Do not create a second telemetry store.
Report verified and reported receipts separately:

- stages with a verified receipt divided by stages that declared `status: ready`;
- shadow agreement, override, escalation, and error rates;
- median and p95 verified latency with sample size;
- first-pass validation and repair rates split by verified-receipt presence;
- provider-reported cost only when present; never invent token or cost savings.

These comparisons are observational, not causal. For causal efficiency, compare
representative tasks in shadow or controlled A/B runs against direct System 2.
Measure total task duration, actual model usage or cost, validation outcome, and
repair rate. Report calibration only when receipts have later labeled outcomes;
otherwise report `n/a`. Never use provider claims or agent estimates as measured
project savings.
