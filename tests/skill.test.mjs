import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const skill = readFileSync(new URL("../skills/code4me/SKILL.md", import.meta.url), "utf8");
const normalizedSkill = skill.replace(/\s+/g, " ");

test("Code4Me discovers eligible Crowded workers instead of guessing", () => {
  for (const rule of [
    '"$CROWDED_BIN" roster --json',
    "differs from `CROWDED_ROOM`",
    "`transport` is `raw`",
    "`state` is `ready`",
    "Never guess a room number",
    "worker as `room-N`",
    "fall back to a host-native worker tool",
  ]) {
    assert.ok(skill.includes(rule), `missing roster rule: ${rule}`);
  }
});

test("Code4Me bounds optional independent verification", () => {
  for (const rule of [
    "one worker followed by one independent verifier",
    "Never dispatch more than one verifier",
    "exclude both the producer and original worker",
    "Do not dispatch a repair loop",
    "parent_task_id: <shared root id>",
    "stage: work | verify",
    "verdict: pass | changes_requested | null",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing verification rule: ${rule}`);
  }
});
