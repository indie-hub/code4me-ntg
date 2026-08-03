# Rust baseline

Project instructions override this baseline.

- Preserve the declared edition, toolchain, feature gates, and supported targets.
- Prefer ownership, enums, `Result`, and `?` over hidden global state or panics.
- Keep platform code behind small `cfg` boundaries with shared behavior above it.
- Run the narrow relevant test, then the project's documented `fmt`, `test`, and
  `clippy` checks when available.
