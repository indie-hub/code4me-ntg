# Validation checklist

Validate the current implementation from a context that did not implement it.
Return evidence, not approval language.

- Re-read the task goal, acceptance criteria, constraints, and changed files.
- Inspect the current diff and relevant callers or boundaries.
- Confirm changes stay within scope and do not weaken or delete tests silently.
- Run the smallest relevant documented checks and report exact results.
- Check every acceptance criterion against source or runtime evidence.
- Report findings with location, consequence, and required correction.
- Return `pass` only when current code satisfies every required criterion.
- Return `changes_requested` for fixable defects and `blocked` when evidence is
  unavailable or the validation route is not independent enough for the weight.

Do not modify project files while acting as validator.
