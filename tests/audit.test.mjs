import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const audit = readFileSync(new URL("../skills/code4me-audit/SKILL.md", import.meta.url), "utf8").replace(/\r\n/g, "\n");
test("audit finding template carries actionable evidence and persistent resolution state", () => {
  const template = audit.match(/```yaml\n([\s\S]*?)\n```/)[1];
  const keys = [...template.matchAll(/^(\w+):/gm)].map((m) => m[1]);
  for (const key of ["id", "perspective", "priority", "location", "summary", "evidence", "failure_scenario", "status", "vendors_checked", "vendors_agreed", "validation"]) {
    assert.ok(keys.includes(key), key);
  }
  assert.equal(new Set(keys).size, keys.length);
});
