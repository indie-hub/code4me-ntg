# Validation checklist

Validate the current implementation from a context that did not implement it.
Return evidence, not approval language.

- Re-read the task goal, acceptance criteria, constraints, and changed files.
- Inspect the current diff and relevant callers or boundaries.
- Confirm the changes stay within scope and do not weaken or delete tests silently.
- Reject task or milestone IDs, status, TODO/FIXME items, plans, progress,
  deferred work, and handover notes introduced in source comments. Source
  comments may explain code rationale, invariants, constraints, and non-obvious
  behavior only.
- Run the smallest relevant documented checks and report exact results.
- Check every acceptance criterion against source or runtime evidence.
- Report findings with location, consequence, and required correction.
- Return `pass` only when current code satisfies every required criterion.
- Return `changes_requested` for fixable defects and `blocked` when evidence is
  unavailable or the validation route is not independent enough for the weight.
- Treat project-management source comments as `changes_requested` even when
  runtime behavior passes.

Do not modify project files while acting as validator.
