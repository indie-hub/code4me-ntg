import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";

const serverEntry = resolve(
  process.argv[2] ??
    ".crowded/tools/trello/node_modules/@delorenj/mcp-server-trello/build/index.js",
);
const launcher = resolve("scripts/trello-mcp-launch.mjs");
const root = await mkdtemp(join(tmpdir(), "code4me-trello-smoke-"));
await mkdir(join(root, ".code4me"));
await writeFile(
  join(root, ".code4me", "trello.json"),
  JSON.stringify({
    credentials: {
      api_key: "code4me-smoke-key",
      token: "code4me-smoke-token",
    },
  }),
);

const env = { ...process.env };
delete env.TRELLO_API_KEY;
delete env.TRELLO_TOKEN;
delete env.TRELLO_ALLOWED_WORKSPACES;

const child = spawn(
  process.execPath,
  [launcher, ".code4me/trello.json", serverEntry],
  {
    cwd: root,
    env,
    stdio: ["pipe", "pipe", "pipe"],
  },
);

let stderr = "";
child.stderr.setEncoding("utf8");
child.stderr.on("data", (chunk) => {
  stderr += chunk;
});

let tools;
try {
  tools = await new Promise((resolveTools, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Trello MCP handshake timed out: ${stderr}`));
    }, 10_000);
    const lines = createInterface({ input: child.stdout });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code && code !== 0) {
        reject(new Error(`Trello MCP exited with ${code}: ${stderr}`));
      }
    });
    lines.on("line", (line) => {
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        return;
      }
      if (message.id !== 2) {
        return;
      }
      clearTimeout(timer);
      resolveTools(message.result?.tools ?? []);
    });

    for (const message of [
      {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "code4me-smoke", version: "1" },
        },
      },
      { jsonrpc: "2.0", method: "notifications/initialized", params: {} },
      { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
    ]) {
      child.stdin.write(`${JSON.stringify(message)}\n`);
    }
  });
} finally {
  child.kill();
  if (child.exitCode === null && child.signalCode === null) {
    await once(child, "exit");
  }
  await rm(root, { recursive: true, force: true });
}

const names = new Set(tools.map((tool) => tool.name));
for (const required of [
  "get_recent_activity",
  "add_card_to_list",
  "update_card_details",
  "move_card",
  "add_comment",
  "create_checklist",
  "add_checklist_item",
  "get_board_custom_fields",
  "update_card_custom_field",
]) {
  assert.ok(names.has(required), `missing required Trello MCP tool: ${required}`);
}

console.log(`Trello MCP smoke passed with ${names.size} tools on ${process.platform}`);
