# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
