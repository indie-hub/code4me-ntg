---
name: code4me-audit
description: Audit code for evidence-backed bugs, security risks, performance problems, maintainability hazards, and test gaps without modifying project files. Use when the user asks Code4Me to audit, inspect, review for defects or vulnerabilities, assess code quality, or produce a ranked code-risk report.
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
5. When delegation adds value, read the sibling
   [Code4Me skill](../code4me/SKILL.md) and use its current roster, envelope,
   event-log, memory, and bounded verification rules. Dispatch at most one
   auditor in a `work` stage with `delegation: forbidden` and an explicit
   read-only constraint. The operational event log and validated Basic Memory
   writes are allowed; audited project files are not.
6. Validate every returned finding against the current file. Remove duplicates,
   unsupported claims, and findings outside the requested scope. Batch all
   `CRITICAL`, `MAJOR`, and security findings into the single optional
   verification stage. Ask the verifier to mark each finding `confirmed`,
   `rejected`, or `needs_context`; do not ask for fixes.
7. Rank accepted findings by severity, then confidence. Do not edit source,
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
verification: confirmed | rejected | needs_context | not_run
```

Use report-local sequential IDs. Omit rejected findings from the ranked list and
mention their count in the verification summary. Lower confidence rather than
inventing context. Performance findings require a plausible hot path and
complexity or measurement evidence; maintainability findings require a concrete
change or failure risk rather than taste.

## Report

Return one compact report containing:

- audited scope, categories, and important exclusions;
- ranked accepted findings with every field above;
- verification summary, including rejected or unresolved counts;
- checks performed and limitations;
- `No supported findings` when the accepted list is empty.

Do not claim the codebase is defect-free merely because this audit found none.
