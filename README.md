# Code4Me Next Gen

Code4Me turns engineering intent into independently validated delivery. Clear
work goes directly to implementation and verification. When an important unknown
could invalidate the approach, build a small runnable draft, challenge its
direction, then finish and verify. Phase names are not mandatory meetings or roles.

## The workflow

- Capture original intent: user outcome, one success example, boundaries, assumptions.
- Choose direct or draft based on uncertainty, not task size or a scoring ceremony.
- Keep the producer's context for coordination; delegate building to eligible
  Crowded rooms or native subagents. Reserve independent validation capacity.
- Use known distinct implementer/validator vendors whenever eligible; critical
  work requires it. Confirm effective model/effort after controls.
- Give drafts a question, runnable demonstration, stopping point, and named holes.
  A read-only challenge decides whether to finish; it is never a production pass.
- Validate finished behavior against both technical acceptance and original intent.
  Green tests and matching replay baselines alone do not establish correctness.
- Preserve findings and responses across rounds: fix, refute with evidence, or
  explicitly defer. Bound draft rethink and final repair attempts.
- Preserve stage-specific results and exact targets. Parallel writers require
  isolated worktrees. Never mistake a user waiver for independent validation.
- Search shared Basic Memory, read relevant claims, and promote supported scoped
  lessons with source, date, rationale, and superseding links. Do not store
  transient task progress or turn reviewer preferences into global policy.
- Turn recurring supported failures into better context, capabilities, or reliable
  executable checks. Reuse checks locally and in CI where practical.
- Use optional System One for context shortlisting, probe ordering, and evidence
  selection when a call can eliminate named expensive work. Default new use cases
  to shadow; project guidance may activate demonstrated reversible choices.
  TypeSafe is one provider, not a dependency. Report receipts and actual usage;
  an override followed by skipped work is not proof of provider savings.
- Retrieve required Headroom originals at /v1/retrieve/<hash>, read original_content,
  and report unavailable evidence honestly. Use only the context needed.
- Write checkpoints only for meaningful state changes. Hand over current evidence,
  unresolved findings/decisions, and an exact next action, not a repeated history.

Five skills cover production, read-only Audit, read-only Status, Housekeeping,
and optional Trello. The core loads phase, transport-contract, tool, and language
references only when needed. Technical communication uses short explicit sentences
inspired by ASD-STE100 while preserving code and logs exactly.

## One current contract

[Task contract](skills/code4me/references/task-contract.md) defines protocol
code4me-ntg/v4 and event v4. task_id is always a logical task; stage_id is always
one attempt. There is no legacy translation. Before starting v4 work in an older
project, confirm no old dispatch is in flight, preserve its log, and explicitly
carry unresolved work and source references into a fresh current log. Never
rewrite historical records. This upgrade intentionally changes active workflow
and envelope expectations.

Use the [migration prompt](docs/migrate-to-v4-prompt.md) in each existing project
to perform a verified local cutover without changing product code.

The local .code4me/events.jsonl is the execution ledger; Basic Memory is durable
shared knowledge. Neither is a second implementation hidden inside Crowded.
Status derives progress, findings, intent alignment, and optional effectiveness
from existing evidence. Metrics include total delivery duration, late intent
rework, measured usage/cost, and later attributable defects; missing measurements
remain unknown. Draft speed and provider call counts are not success metrics.

## Vendor adapters

Enable optional adapters in a project's crowded.toml:

```toml
[[plugin]]
name = "code4me-ntg"
source = "https://github.com/indie-hub/code4me-ntg.git"
adapters = true
```

Claude/Codex prompt hooks and the OpenCode 2 prompt plugin remind workers to
load the current skill. Unsupported task contracts receive a blocked reminder,
not translated IDs. These hooks are advisory context; they do not run tools,
write memory, grant permissions, or enforce filesystem isolation. The source
fallback reminder recommends indexed navigation or narrow reads. Rules needing
hard enforcement belong in executable project checks and actual runtime controls.
OpenCode's adapter lives at .opencode/plugins/code4me.js.

## Optional Trello board

One card spans the logical task, including draft/challenge/finish. Drafts stay
In Progress; final validation gates Done. Human Ready cards authorize intake;
agent-discovered scope enters Inbox. The board does not replace the task ledger.

Use the pinned cross-platform Node launcher:

```toml
[[setup]]
name = "trello-mcp-install"
command = "npm"
args = ["install", "--prefix", ".crowded/tools/trello", "@delorenj/mcp-server-trello@1.8.1"]

[[mcp]]
name = "trello"
command = "node"
args = [".crowded/plugins/code4me-ntg/scripts/trello-mcp-launch.mjs"]
cwd = "."
```

See [the Trello skill](skills/code4me-trello/SKILL.md) for local board and credential
configuration. Keep credential files out of version control. Environment
credentials take precedence. No Trello installation is needed for ordinary work.

## Checks

Run node --test. After installing the optional MCP recipe, run
node tests/trello-mcp-smoke.mjs for the required tool surface; CI runs it on Linux,
macOS, and Windows. Unit/contract checks do not prove live agents follow guidance.
Use the [forward scenarios](tests/workflow-scenarios.md) to evaluate behavior.
