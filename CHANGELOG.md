# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.25.0] - 2026-09-18

### Added

- Add optional evidence-backed invariants to task verification contracts.

### Changed

- Require a Basic Memory availability check and targeted search before every
  task is classified, assigned, dispatched, or started.

## [0.24.0] - 2026-08-28

### Added

- Derive optional workflow-health rates and median elapsed cycle time in
  Code4Me Status from existing lifecycle events without new telemetry, storage,
  or model rankings.

## [0.23.0] - 2026-08-28

### Added

- Add an optional verification contract that carries exact project commands and
  observable evidence through implementation and independent validation without
  creating new project artifacts.

## [0.22.0] - 2026-08-25

### Added

- Select Crowded rooms from user-configured capabilities, model capacity, and
  relative cost while preserving cross-vendor validation and compatibility with
  older rosters.
- Add `assigned_role` to task envelopes and dispatch events.
- Add role-aware worker contract reinforcement and producer self-check nudges to
  the existing Claude, Codex, and OpenCode adapters.

## [0.21.1] - 2026-08-24

### Changed

- Keep the producer's main context orchestration-only when a Crowded room or
  native subagent can perform engineering work or independent validation.
- Make inline producer validation the final eligible fallback after fresh
  Crowded, native, and recycled contexts are unavailable.

## [0.21.0] - 2026-08-24

### Added

- Add the Code4Me Technical English profile, based on ASD-STE100, for technical
  and operational communication across users and agents while preserving exact
  technical literals.

## [0.20.1] - 2026-08-20

### Fixed

- Normalize Markdown fixture line endings in tests so CRLF Windows checkouts
  exercise the same contracts as Linux and macOS.

## [0.20.0] - 2026-08-20

### Added

- Add one-shot Crowd Mode for adaptive cross-vendor waves over the live
  Crowded roster while reusing existing tasks, envelopes, and checkpoints.

### Changed

- Allow an explicit Crowd Mode producer to dispatch a complete planned wave
  before checkpointing and yielding, without permitting active waiting.

## [0.19.0] - 2026-08-19

### Changed

- Make producers delegate implementation to an eligible Crowded room or native
  subagent before self-implementing, with recorded reasons for fallback.
- Prefer validator vendors distinct from the implementer and record degraded
  coverage when standard work cannot use a cross-vendor route.

## [0.18.0] - 2026-08-19

### Added

- Allow gitignored `.code4me/trello.json` files to carry Trello credentials,
  with environment variables retaining precedence.
- Add a cross-platform Node launcher that loads local credentials before
  starting the pinned Trello MCP server.

### Changed

- Route the Crowded MCP recipe through the Code4Me launcher while preserving
  the existing direct environment-variable setup.

## [0.17.0] - 2026-08-19

### Added

- Add optional two-way Trello synchronization with one card per logical task,
  human Ready intake, agent-created proposals, correlated lifecycle events, and
  read-only Status reporting.
- Document a pinned Node-based Crowded MCP recipe that works without Bun or
  platform-specific shell wrappers on macOS and Windows.
- Add a required-tool MCP handshake and CI matrix for Linux, macOS, and Windows.

### Changed

- Keep Code4Me validation authoritative when board state is edited manually;
  moving a card to Done cannot complete an unvalidated task.

## [0.16.0] - 2026-08-17

### Added

- Let the producer propose an inspectable provisional quality bar when the user
  has not supplied one, without making routine work wait for approval.
- Compare the actual artifact by direct, blind A/B, metric, or acceptance
  evidence and return one highest-leverage quality gap for bounded repair.

### Changed

- Freeze quality bars during validation and preserve the existing one-repair,
  one-revalidation limit instead of introducing an open-ended refinement loop.

## [0.15.0] - 2026-08-12

### Added

- Let Housekeeping rotate oversized, fully closed event logs into hashed
  immutable archives while leaving one self-contained active checkpoint.
- Add evidence-backed Basic Memory health audits and explicit, provenance-safe
  consolidation.

### Changed

- Keep normal Status and resume work on the bounded active log, consulting
  archives only for requested history or integrity checks.
- Let Codex discover `.codex-plugin/hooks.json` conventionally instead of using
  the unsupported manifest `hooks` field.

## [0.14.0] - 2026-08-10

### Added

- Carry an explicit source-comment policy and deferred work in task envelopes.
- Give v3 envelopes distinct milestone, logical-task, and dispatch-stage IDs
  while preserving v2 event-log compatibility.

### Changed

- Split milestones into multiple tasks only for independently valuable or
  validatable slices.
- Reject project-management bookkeeping introduced in source comments.
- Require observable Basic Memory search/read evidence and explicit empty or
  unavailable outcomes for non-trivial work.

## [0.13.0] - 2026-08-03

### Added

- Carry relevant root and scoped `AGENTS.md` / `CLAUDE.md` files into task
  context without taking ownership of project instructions.
- Select compact language and platform references from the task's actual paths,
  manifests, or deployment target.
- Recommend architect, researcher, security-reviewer, and QA specialists only
  for bounded task needs, with a recorded reason.

### Changed

- Require incoming workers to read supplied project and conditional context
  references before planning.

## [0.12.2] - 2026-08-02

### Fixed

- Preserve the existing `asynchronous` delivery value for Crowded v2 envelopes
  while keeping native subagent delivery explicitly managed and joined.

## [0.12.1] - 2026-08-02

### Fixed

- Limit passive waiting to accepted Crowded Doorbell sends and require producers
  to join host-native subagents and collect their results.

## [0.12.0] - 2026-08-02

### Added

- Let Housekeeping append one structured handover checkpoint and promote only
  validated durable lessons to Basic Memory.

### Changed

- Make Code4Me and Status consume the latest handover before work resumes and
  report repository drift instead of presenting stale state as current.

## [0.11.0] - 2026-08-02

### Added

- Mark every cross-room envelope as a mandatory Code4Me work order and require
  truthful toolbox evidence in completed results.

### Changed

- Strengthen Claude, Codex, and OpenCode incoming-envelope adapters to require
  the installed Code4Me workflow or return blocked when it is unavailable.
- End producer and worker turns after Doorbell sends instead of polling or
  launching background waiters that prevent queued PTY delivery.

## [0.10.0] - 2026-08-01

### Added

- Add lightweight milestones, independently validatable tasks, temporary task
  teams, and compact append-only checkpoints.
- Select a fast, balanced, or deep model tier and suitable effort for each task
  role, applying exact vendor models only from reviewed mappings.
- Add lean optional design and independent-validation checklists.

### Changed

- Require independent validation for every engineering change, with one bounded
  repair and revalidation before blocking.
- Reduce task weights to light, standard, and critical; weights now control
  validation rigor rather than fixed teams or documentation.
- Derive Status and Housekeeping from lifecycle events and the latest checkpoint
  instead of requiring copied trackers, handoff manifests, or template trees.

## [0.9.0] - 2026-08-01

### Added

- Run up to two blind audit passes across distinct normalized Crowded vendors,
  then synthesize findings with vendor agreement provenance.

### Changed

- Always use an eligible Crowded peer for audits and label degraded
  single-vendor or unknown coverage honestly.
- Reserve fresh-context recycling for independence, never vendor diversity.

## [0.8.0] - 2026-08-01

### Added

- Add a read-only `code4me-audit` skill for ranked, evidence-backed bugs,
  security, performance, maintainability, and test-gap findings.
- Reuse bounded Code4Me orchestration to verify serious audit findings without
  applying fixes.

## [0.7.0] - 2026-08-01

### Added

- Recycle the completed worker as a fresh-context verifier when no independent
  Crowded room is available and that room explicitly allows control.

### Changed

- Persist the accepted work result before any context clear, require an applied
  control response, and rediscover readiness before verification dispatch.

## [0.6.0] - 2026-08-01

### Added

- Add an optional independent verification stage with a shared parent task ID,
  fresh roster discovery, and correlated work and verification events.

### Changed

- Bound orchestration to direct work, one worker, or one worker plus one
  verifier; repair findings remain the producer's responsibility.

## [0.5.0] - 2026-08-01

### Added

- Discover Crowded's authenticated live roster before dispatch and select only
  a ready raw peer with a numeric `room-N` identity.

### Changed

- Prefer a suitable existing Crowded room over a host-native worker, while
  retaining native workers and direct execution as graceful fallbacks.

## [0.4.0] - 2026-07-31

### Added

- Add Basic Memory search, envelope references, durable candidate write-back,
  and a small first-use memory map contract for non-trivial tasks.
- Add question-shaped routing for Basic Memory, CodeGraph, CCC, Context Mode,
  and narrow native reads.
- Add advisory incoming-envelope and broad-source hooks for Claude and Codex,
  plus the incoming-envelope nudge for OpenCode.

### Changed

- Extend dispatch and result events with memory status, references, candidates,
  and persisted Basic Memory references.

## [0.3.0] - 2026-07-31

### Added

- Add the read-only `code4me-housekeeping` skill for task closure, worktree
  scope, check evidence, release consistency, and commit readiness.

## [0.2.0] - 2026-07-31

### Added

- Add the read-only `code4me-status` skill for awaiting tasks, recent results,
  and event-log issues.

### Changed

- Mark delegated task envelopes `delegation: forbidden` so workers execute the
  assigned task instead of redispatching it.

## [0.1.0] - 2026-07-31

### Added

- Add the minimal Code4Me plugin with one-worker task dispatch, correlated
  results, and the append-only `.code4me/events.jsonl` audit trail.
