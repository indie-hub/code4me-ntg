---
name: code4me-audit
description: Run evidence-backed blind cross-vendor code audits with focused review perspectives and stable finding resolutions. Use when the user asks Code4Me to audit code quality, defects, security, resilience, or maintainability without changing product files.
---

# Code4Me Audit

Audit read-only. Prefer the requested scope, otherwise the current diff or a
stated bounded source scope. Exclude generated/dependency/build output unless
it is the subject. Finding nothing is valid; do not invent risk or style complaints.

Read relevant project standards, original intent when available, and Basic
Memory decisions. Use [the core workflow](../code4me/SKILL.md) and
[the current contract](../code4me/references/task-contract.md). Record one task
with producer-synthesizer and up to two blind auditors, not a permanent team.
Audit tasks do not manufacture a product-validation pass or modify source.

## Focused blind passes

Select only perspectives warranted by the change: correctness/data integrity,
security/privacy, resilience/performance, maintainability, or interaction/QA.
Give each a concrete question. Perspectives do not require a different agent
per category. Use CodeGraph in indexed repos, CCC for fuzzy discovery, and narrow
native reads. Inspect connected boundaries, not only the diff.

Use two blind vendor-distinct passes when possible. Inside Crowded dispatch an
eligible peer auditor whenever one exists. Prefer two ready rooms of distinct
known normalized vendors. With one peer whose vendor differs from the producer,
complete the producer's own pass before accepting the peer result. Otherwise use
available independent contexts and label degraded vendor coverage honestly.
A recycled context is not another vendor. With no peer, one local pass is valid
and explicitly single-vendor or unknown.

Give passes the same scope, standards, intent, evidence, and comparable model
capacity/effort. Never share one pass's findings with the other before both
finish; dispatch available peer passes together. Use unique stage IDs with
stage audit, Doorbell role auditor, delegation forbidden, and read-only scope.
Native subagents join normally; Crowded sends yield as the core requires.

## Findings and responses

Support each finding with location, affected input or sequence, consequence,
and source/runtime evidence. An uncertain claim is needs_context, not a fact.
Separate required failures of the contract from advisory improvements. A severity
label alone does not authorize inventing a new acceptance requirement.

```yaml
id: A-001
perspective: correctness | security | resilience | maintainability | interaction
priority: required | advisory
severity: critical | major | minor
location: <path and line>
summary: <consequence>
evidence: <source or observed behavior>
failure_scenario: <affected input or sequence>
status: open | resolved | reopened
vendors_checked: []
vendors_agreed: []
validation: supported | needs_context
```

Synthesize by root cause and failure mode. Validate claims against current source;
remove unsupported duplicates. Silence is not explicit disagreement. Count vendor
coverage from completed passes, never room names or model labels. Convergence
raises confidence but is not proof.

For a follow-up review preserve finding IDs and author resolutions (fixed,
refuted, deferred). Verify each response independently. Reopen a regression with
its original ID; do not reissue supported resolved findings. Fresh blind discovery
and later resolution checking are different activities. A deferral cannot waive
required acceptance without the appropriate explicit decision.

## Report and learning

Return scope, perspectives, accepted ranked findings, rejected/unresolved counts,
checks, limitations, and an overall changes_requested or no_supported_findings
verdict. Distinguish required from advisory findings. Report cross-vendor only
when two completed passes have distinct known vendors; otherwise single-vendor
or unknown. No findings does not mean defect-free.

Return supported scoped memory candidates with sources and conditions. A recurring
finding may justify better context, a capability, or a reliable executable check;
propose that improvement instead of appending another universal warning. Do not
apply fixes or policy changes during an audit. The producer may promote supported
knowledge under the core memory rules.
