import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [
  configArgument = ".code4me/trello.json",
  serverArgument =
    ".crowded/tools/trello/node_modules/@delorenj/mcp-server-trello/build/index.js",
] = process.argv.slice(2);

const configPath = resolve(configArgument);
let credentials = {};

try {
  const config = JSON.parse(await readFile(configPath, "utf8"));
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    throw new Error("root value must be an object");
  }
  if (config.credentials !== undefined) {
    if (
      !config.credentials ||
      typeof config.credentials !== "object" ||
      Array.isArray(config.credentials)
    ) {
      throw new Error("credentials must be an object");
    }
    credentials = config.credentials;
  }
} catch (error) {
  if (error?.code !== "ENOENT" || !hasEnvironmentCredentials()) {
    fail(`cannot read Trello configuration ${configPath}: ${error.message}`);
  }
}

setCredential("TRELLO_API_KEY", credentials.api_key);
setCredential("TRELLO_TOKEN", credentials.token);

if (!process.env.TRELLO_ALLOWED_WORKSPACES) {
  const allowed = credentials.allowed_workspaces;
  if (Array.isArray(allowed)) {
    if (!allowed.length || !allowed.every(isNonEmptyString)) {
      fail(
        "Trello credentials.allowed_workspaces must be a non-empty string array",
      );
    }
    process.env.TRELLO_ALLOWED_WORKSPACES = allowed.join(",");
  } else if (isNonEmptyString(allowed)) {
    process.env.TRELLO_ALLOWED_WORKSPACES = allowed;
  } else if (allowed !== undefined) {
    fail("Trello credentials.allowed_workspaces must be a string or string array");
  }
}

if (!hasEnvironmentCredentials()) {
  fail(
    "Trello credentials are missing; set TRELLO_API_KEY and TRELLO_TOKEN or add credentials.api_key and credentials.token to .code4me/trello.json",
  );
}

await import(pathToFileURL(resolve(serverArgument)).href);

function setCredential(name, value) {
  if (isNonEmptyString(process.env[name])) {
    return;
  }
  if (isNonEmptyString(value)) {
    process.env[name] = value;
  }
}

function hasEnvironmentCredentials() {
  return (
    isNonEmptyString(process.env.TRELLO_API_KEY) &&
    isNonEmptyString(process.env.TRELLO_TOKEN)
  );
}

function isNonEmptyString(value) {
  return typeof value === "string" && Boolean(value.trim());
}

function fail(message) {
  console.error(`code4me-trello: ${message}`);
  process.exit(1);
}
