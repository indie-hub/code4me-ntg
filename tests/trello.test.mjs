import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

const trello = read("../skills/code4me-trello/SKILL.md");
const normalizedTrello = trello.replace(/\s+/g, " ");
const cardContract = read(
  "../skills/code4me-trello/references/card-contract.md",
);
const normalizedCardContract = cardContract.replace(/\s+/g, " ");
const launcher = read("../scripts/trello-mcp-launch.mjs");
const producer = read("../skills/code4me/SKILL.md");
const status = read("../skills/code4me-status/SKILL.md");

test("Trello maps one card to one validated logical task", () => {
  for (const rule of [
    "One Trello card represents one Code4Me logical `task_id`",
    "never create a second card",
    "comments are an activity trail and are never parsed as commands",
    "any list -> `Done`: accept only after a later passing `task_validated`",
    "restore the derived list",
    "producer remains the sole event-log writer",
  ]) {
    assert.ok(
      normalizedTrello.includes(rule),
      `missing Trello invariant: ${rule}`,
    );
  }

  assert.ok(normalizedCardContract.includes("one independently executable"));
  assert.ok(normalizedCardContract.includes("Newly discovered scope"));
  assert.ok(
    normalizedCardContract.includes("Never persist a Crowded room number"),
  );
});

test("Trello imports human work and proposes agent work without self-approval", () => {
  for (const rule of [
    "Import an unlinked card only after it reaches `Ready`",
    "origin: human",
    "origin: agent",
    "scope-expanding, or deferred work in `Inbox`",
    "do not execute it merely because an agent created the card",
    "task_change_requested",
    "task_cancel_requested",
  ]) {
    assert.ok(normalizedTrello.includes(rule), `missing two-way rule: ${rule}`);
  }
});

test("Trello config example supports local credentials", () => {
  const match = trello.match(/```json\n([\s\S]*?)\n```/);
  assert.ok(match, "missing JSON configuration example");

  const config = JSON.parse(match[1]);
  assert.equal(config.version, 1);
  assert.equal(config.lists.inbox, "Inbox");
  assert.equal(config.lists.done, "Done");
  assert.equal(config.credentials.api_key, "<trello-api-key>");
  assert.equal(config.credentials.token, "<trello-token>");
  assert.deepEqual(config.credentials.allowed_workspaces, ["<workspace-id>"]);
  assert.ok(normalizedTrello.includes("Environment values take precedence"));
  assert.ok(normalizedTrello.includes("out of version control"));
});

test("Crowded recipe pins the Node package for macOS and Windows", () => {
  for (const rule of [
    "@delorenj/mcp-server-trello@1.8.1",
    'command = "npm"',
    'command = "node"',
    ".crowded/plugins/code4me-ntg/scripts/trello-mcp-launch.mjs",
    "PATH/PATHEXT",
  ]) {
    assert.ok(trello.includes(rule), `missing portable setup rule: ${rule}`);
  }

  assert.doesNotMatch(trello, /@delorenj\/mcp-server-trello@latest/);
  assert.match(trello, /Do not use `@latest`, `bunx`/);
  assert.ok(
    launcher.includes(
      ".crowded/tools/trello/node_modules/@delorenj/mcp-server-trello/build/index.js",
    ),
  );
});

test("Producer and Status integrate Trello without making Status mutating", () => {
  for (const rule of [
    "`.code4me/trello.json` exists",
    "Trello absence never blocks Code4Me",
    "card moved to Done never bypasses",
    "task_board_linked",
    "trello_synced",
  ]) {
    assert.ok(producer.includes(rule), `missing producer integration: ${rule}`);
  }

  for (const rule of [
    "`task_board_linked`",
    "`task_change_requested`",
    "`task_cancel_requested`",
    "latest `trello_synced` event",
    "never call Trello or attempt synchronization",
  ]) {
    assert.ok(status.includes(rule), `missing Status integration: ${rule}`);
  }
});
