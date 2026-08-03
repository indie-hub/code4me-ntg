# Unix-like systems baseline

Project instructions override this baseline.

- Distinguish Linux, macOS, GNU, and BSD behavior instead of assuming one Unix.
- Preserve permissions, signals, file-descriptor ownership, and PTY semantics.
- Keep platform-specific code behind the project's existing boundary.
- Run the focused check on every affected target when behavior differs by platform.
