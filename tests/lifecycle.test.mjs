import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const status = read("../skills/code4me-status/SKILL.md").replace(/\s+/g, " ");
const housekeeping = read("../skills/code4me-housekeeping/SKILL.md").replace(/\s+/g, " ");
const design = read("../skills/code4me/references/design-brief.md");
const validation = read("../skills/code4me/references/validation.md");

test("Status derives milestone and task state from events", () => {
  for (const rule of [
    "newest valid `checkpoint` as the canonical resume summary",
    "Group v2 events by `milestone_id`",
    "`awaiting_validation`",
    "`needs_changes`",
    "`validated`",
    "role-to-member team map",
    "model tier or exact model",
    "later matching `task_controlled` events",
    "Never call a task complete merely because implementation returned `complete`",
  ]) {
    assert.ok(status.includes(rule), `missing status rule: ${rule}`);
  }
});

test("Housekeeping checks validation and checkpoint integrity", () => {
  for (const rule of [
    "classified before team assignment",
    "implementer and validator are not the same implementation context",
    "`task_validated` verdict `pass`",
    "critical tasks use distinct known implementer and validator vendors",
    "latest work or repair result",
    "matching `verify` dispatch/result pair",
    "resume state stale",
    "latest checkpoint is current",
    "Do not write a handoff manifest",
  ]) {
    assert.ok(housekeeping.includes(rule), `missing housekeeping rule: ${rule}`);
  }
});

test("Only two lean optional checklists replace copied templates", () => {
  assert.match(design, /do not create a file just to complete this checklist/i);
  assert.match(validation, /Do not modify project files while acting as validator/);
  assert.equal(existsSync(new URL("../templates", import.meta.url)), false);
  assert.equal(existsSync(new URL("../skills/code4me/templates", import.meta.url)), false);
});
