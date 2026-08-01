import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const audit = readFileSync(new URL("../skills/code4me-audit/SKILL.md", import.meta.url), "utf8");
const normalizedAudit = audit.replace(/\s+/g, " ");

test("Code4Me Audit stays read-only and evidence-backed", () => {
  for (const rule of [
    "Finding nothing is a valid result",
    "Prefer precision over recall",
    "always dispatch at least one eligible peer auditor",
    "audited project files are not",
    "do not create patches",
    "bugs | security | performance | maintainability | test_gaps",
    "CRITICAL | MAJOR | MINOR",
    "vendor_coverage",
    "No supported findings",
  ]) {
    assert.ok(normalizedAudit.includes(rule), `missing audit rule: ${rule}`);
  }
  assert.ok(!audit.includes("TODO"), "audit skill still contains template text");
});

test("Code4Me Audit runs blind cross-vendor passes", () => {
  for (const rule of [
    "Run exactly two blind passes when possible",
    "distinct, known `vendor` values",
    "complete the producer's own pass before accepting its result",
    "A recycled context is not a new vendor",
    "Dispatch both peer passes before accepting either result",
    "Never include one auditor's findings in the other's envelope",
    "silence is not an explicit rejection",
    "Do not replace a blind pass with a primed verification pass",
    "two completed blind passes have distinct, non-`unknown` vendors",
    "Never count a room name, guest program, model name, or cleared context",
  ]) {
    assert.ok(normalizedAudit.includes(rule), `missing cross-vendor rule: ${rule}`);
  }
});
