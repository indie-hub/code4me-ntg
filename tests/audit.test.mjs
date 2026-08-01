import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const audit = readFileSync(new URL("../skills/code4me-audit/SKILL.md", import.meta.url), "utf8");
const normalizedAudit = audit.replace(/\s+/g, " ");

test("Code4Me Audit stays read-only and evidence-backed", () => {
  for (const rule of [
    "Finding nothing is a valid result",
    "Prefer precision over recall",
    "Dispatch at most one auditor",
    "audited project files are not",
    "do not create patches",
    "bugs | security | performance | maintainability | test_gaps",
    "CRITICAL | MAJOR | MINOR",
    "confirmed | rejected | needs_context | not_run",
    "No supported findings",
  ]) {
    assert.ok(normalizedAudit.includes(rule), `missing audit rule: ${rule}`);
  }
  assert.ok(!audit.includes("TODO"), "audit skill still contains template text");
});

test("Code4Me Audit verifies serious findings once", () => {
  for (const rule of [
    "Batch all",
    "into the single optional verification stage",
    "mark each finding `confirmed`, `rejected`, or `needs_context`",
    "do not ask for fixes",
  ]) {
    assert.ok(normalizedAudit.includes(rule), `missing audit verification rule: ${rule}`);
  }
});
