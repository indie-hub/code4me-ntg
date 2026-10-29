import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const walk = (path) => readdirSync(path, { withFileTypes: true }).flatMap((entry) => entry.isDirectory()
  ? walk(resolve(path, entry.name)) : [resolve(path, entry.name)]);
const docs = walk(resolve(root, "skills")).filter((path) => path.endsWith(".md"));

test("skill references resolve inside the bundle", () => {
  for (const path of docs) {
    const text = readFileSync(path, "utf8");
    for (const [, target] of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^(https?:|memory:|#)/.test(target)) continue;
      assert.ok(existsSync(resolve(dirname(path), target.split("#")[0])), `${path}: missing ${target}`);
    }
  }
});

test("one current contract replaces the retired design and legacy envelopes", () => {
  const core = readFileSync(resolve(root, "skills/code4me/SKILL.md"), "utf8");
  assert.ok(core.split("\n").length < 300, "core must remain a short entrypoint");
  assert.ok(existsSync(resolve(root, "skills/code4me/references/intent-and-draft.md")));
  assert.ok(existsSync(resolve(root, "skills/code4me/references/task-contract.md")));
  assert.equal(existsSync(resolve(root, "skills/code4me/references/design-brief.md")), false);
  for (const path of docs) {
    const text = readFileSync(path, "utf8");
    assert.doesNotMatch(text, /code4me-ntg\/v[123]\b|"v":\s*[12]\b|parent_task_id|task_classified|task_assigned|design-brief\.md/, path);
  }
});

test("all five skills have discoverable descriptions and no unfinished scaffold", () => {
  const skills = readdirSync(resolve(root, "skills"));
  assert.equal(skills.length, 5);
  for (const folder of skills) {
    const text = readFileSync(resolve(root, "skills", folder, "SKILL.md"), "utf8");
    assert.match(text, /^---\nname: [a-z0-9-]+\ndescription: .+\n---/);
    assert.doesNotMatch(text, /\[TODO\]|TODO: fill|IMPLEMENT ME/);
  }
});
