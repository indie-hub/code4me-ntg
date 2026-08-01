# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
