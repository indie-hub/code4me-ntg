# Project guidance and conditional references

Build the smallest context pack that lets the assigned member work correctly.

## Project instructions

At the repository root, read `AGENTS.md` and `CLAUDE.md` when present. For each
planned path, also use the nearest parent `AGENTS.md` or `CLAUDE.md`. Carry the
relevant file paths in `context_refs`; workers read those files from the shared
checkout instead of receiving copied prose.

The user's current request wins. A nearer scoped file wins over a root file.
Project instructions win over the generic references below. When `AGENTS.md`
and `CLAUDE.md` materially disagree, surface the conflict rather than silently
choosing a vendor. Never create, overwrite, merge, or synchronize these files.
Their absence is not an error.

## Conditional references

Select from actual planned paths, manifests, or an explicit deployment target.
Do not load every reference merely because the repository contains many
languages.

| Signal | Reference |
|---|---|
| `.rs`, `Cargo.toml` | `rust.md` |
| `.js`, `.jsx`, `.mjs`, `.cjs`, `.ts`, `.tsx`, `package.json` | `javascript-typescript.md` |
| `.py`, `.pyi`, `pyproject.toml`, `requirements*.txt` | `python.md` |
| `.swift`, `Package.swift`, `.xcodeproj`, `.xcworkspace` | `swift.md` |
| `.cs`, `.csproj`, `.sln` | `csharp.md` |
| `.c`, `.h`, `.cc`, `.cpp`, `.cxx`, `.hpp`, `CMakeLists.txt`, `meson.build` | `cpp.md` |
| Windows API/target, `.ps1`, `.cmd`, `.bat`, `cfg(windows)` | `windows.md` |
| Unix API/target, shell scripts, permissions, signals, PTYs | `unix.md` |

Add each selected path under this directory to `context_refs` for `work`,
`repair`, and `verify` stages. A polyglot or cross-platform task may select more
than one. If no signal matches, use project guidance and current source only;
do not guess a language or environment.
