import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const launcher = resolve("scripts/trello-mcp-launch.mjs");

test("Trello launcher loads local JSON credentials", () => {
  const result = runLauncher({
    credentials: {
      api_key: "local-key",
      token: "local-token",
      allowed_workspaces: ["workspace-1", "workspace-2"],
    },
  });

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    apiKey: "local-key",
    token: "local-token",
    allowed: "workspace-1,workspace-2",
  });
});

test("Trello launcher lets environment credentials override local JSON", () => {
  const result = runLauncher({
    credentials: { api_key: "local-key", token: "local-token" },
    environment: {
      TRELLO_API_KEY: "environment-key",
      TRELLO_TOKEN: "environment-token",
    },
  });

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    apiKey: "environment-key",
    token: "environment-token",
    allowed: null,
  });
});

test("Trello launcher fails without exposing partial credentials", () => {
  const result = runLauncher({ credentials: { api_key: "do-not-print" } });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Trello credentials are missing/);
  assert.doesNotMatch(result.stderr, /do-not-print/);
});

test("Trello launcher rejects an empty workspace allowlist", () => {
  const result = runLauncher({
    credentials: {
      api_key: "local-key",
      token: "local-token",
      allowed_workspaces: [],
    },
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /must be a non-empty string array/);
});

function runLauncher({ credentials, environment = {} }) {
  const root = mkdtempSync(join(tmpdir(), "code4me-trello-launcher-"));
  const config = join(root, ".code4me", "trello.json");
  const fakeServer = join(root, "fake-server.mjs");
  mkdirSync(dirname(config), { recursive: true });
  writeFileSync(config, JSON.stringify({ credentials }));
  writeFileSync(
    fakeServer,
    `console.log(JSON.stringify({apiKey:process.env.TRELLO_API_KEY,token:process.env.TRELLO_TOKEN,allowed:process.env.TRELLO_ALLOWED_WORKSPACES??null}));\n`,
  );

  const env = { ...process.env };
  delete env.TRELLO_API_KEY;
  delete env.TRELLO_TOKEN;
  delete env.TRELLO_ALLOWED_WORKSPACES;

  try {
    return spawnSync(process.execPath, [launcher, config, fakeServer], {
      cwd: root,
      encoding: "utf8",
      env: { ...env, ...environment },
    });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
