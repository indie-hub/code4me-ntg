import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const skill = readFileSync(new URL("../skills/code4me/SKILL.md", import.meta.url), "utf8");

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
