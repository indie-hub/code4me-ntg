---
name: code4me-audit
description: Run blind cross-vendor code audits for evidence-backed bugs, security risks, performance problems, maintainability hazards, and test gaps without modifying project files. Use when the user asks Code4Me to audit, inspect, review for defects or vulnerabilities, assess code quality, or produce a ranked code-risk report.
---

# Code4Me Audit

Audit project code without changing it. Finding nothing is a valid result.

## Workflow

1. Read the project instructions. Use the user's requested paths and categories.
   If paths are omitted, prefer the current diff; if the worktree is clean,
   derive the smallest relevant source scope and state it. If categories are
   omitted, inspect bugs, security, performance, maintainability, and test gaps.
2. Search Basic Memory for relevant invariants, prior failures, and accepted
   conventions. Treat current source as authoritative.
3. Inspect exact symbols and callers with CodeGraph, use CCC for fuzzy source
   discovery, and use narrow native reads when cheaper. Exclude generated,
   vendored, dependency, build-output, and lock files unless explicitly scoped.
4. Prefer precision over recall. Report only a concrete failure mode or
   engineering risk supported by a tight file and line range. Do not report
   style preferences, generic hardening advice, or possibilities without an
   affected input, sequence, boundary, or maintenance consequence.
5. Read the sibling [Code4Me skill](../code4me/SKILL.md) and use its current
   roster, envelope, event-log, and memory rules. Inside Crowded, always dispatch
   at least one eligible peer auditor. Treat the roster's normalized `vendor`
   field as model-provider identity; never infer it from room name or guest.
6. Run exactly two blind passes when possible:
   - Prefer two ready peer rooms with distinct, known `vendor` values.
   - With one suitable peer whose vendor differs from the producer, dispatch
     that peer and complete the producer's own pass before accepting its result.
   - Otherwise use the available peer and a second available pass, but degrade
     the coverage label honestly. A recycled context is not a new vendor.
   - If no peer exists, perform one local pass and label it `single-vendor` or
     `unknown`; do not pretend the audit was cross-vendor.
7. Give every delegated pass the same scope, categories, acceptance criteria,
   context references, and memory references. Use stage IDs `<root>-audit-1` and
   `<root>-audit-2`, `stage: audit`, Doorbell role `auditor`,
   `delegation: forbidden`, and an explicit read-only constraint. Dispatch both
   peer passes before accepting either result. Never include one auditor's
   findings in the other's envelope. The operational event log and validated
   Basic Memory writes are allowed; audited project files are not.
8. After all available blind passes finish, validate every finding against the
   current file. Remove duplicates, unsupported claims, and out-of-scope items.
   Cluster findings by root cause and failure mode, not wording alone. Preserve
   `vendors_checked` and `vendors_agreed`; silence is not an explicit rejection.
   Independent convergence raises confidence but never replaces source evidence.
   Do not replace a blind pass with a primed verification pass.
9. Rank accepted findings by severity, then confidence. Do not edit source,
   tests, configuration, or documentation, and do not create patches. A later
   user request may hand a selected finding to the normal Code4Me workflow.

## Finding shape

Return each finding with:

```yaml
id: A-001
category: bugs | security | performance | maintainability | test_gaps
severity: CRITICAL | MAJOR | MINOR
confidence: high | medium | low
file: <project-relative path>
line_range: <single line or inclusive range>
summary: <specific defect or risk and its consequence>
evidence: <relevant code and why it supports the claim>
failure_scenario: <affected input, sequence, boundary, or concrete consequence>
vendors_checked: [<normalized vendor>]
vendors_agreed: [<normalized vendor>]
agreement: <agreeing passes>/<completed passes>
validation: supported | needs_context
```

Use report-local sequential IDs. Omit rejected findings from the ranked list and
mention their count in the synthesis summary. Lower confidence rather than
inventing context. Performance findings require a plausible hot path and
complexity or measurement evidence; maintainability findings require a concrete
change or failure risk rather than taste.

Set overall `vendor_coverage` to `cross-vendor` only when two completed blind
passes have distinct, non-`unknown` vendors. Set it to `single-vendor` when all
completed known passes share one vendor, and `unknown` when provider identity is
insufficient. Never count a room name, guest program, model name, or cleared
context as proof of vendor diversity.

## Report

Return one compact report containing:

- audited scope, categories, and important exclusions;
- ranked accepted findings with every field above;
- vendor coverage and synthesis summary, including rejected or unresolved counts;
- checks performed and limitations;
- `No supported findings` when the accepted list is empty.

Do not claim the codebase is defect-free merely because this audit found none.
