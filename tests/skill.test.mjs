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

test("Code4Me bounds optional verification", () => {
  for (const rule of [
    "one worker followed by one verification stage",
    "Never dispatch more than one verifier",
    "neither the producer nor the work-stage worker",
    "Do not dispatch a repair loop",
    "parent_task_id: <shared root id>",
    "stage: work | verify",
    "verdict: pass | changes_requested | null",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing verification rule: ${rule}`);
  }
});

test("Code4Me can recycle the completed worker for fresh-context verification", () => {
  for (const rule of [
    "recycle only the completed work-stage room",
    "`allow_control` as `true`",
    "append the work result before clearing a worker context",
    '"$CROWDED_BIN" control WORKER_ROOM_NUMBER clear',
    '`status: "applied"`',
    "query the roster again",
    "new `verify` stage task ID",
    "work_result: # verification stage only",
    "Never clear the producer",
  ]) {
    assert.ok(normalizedSkill.includes(rule), `missing recycle rule: ${rule}`);
  }
});
