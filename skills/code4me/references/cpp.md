# C and C++ baseline

Project instructions override this baseline.

- Preserve the language standard, compiler matrix, ABI, and build system.
- Prefer RAII, explicit ownership, and existing library types; avoid undefined
  behavior and unchecked lifetime assumptions.
- Keep platform/compiler branches narrow and cover boundary changes with a test.
- Run the relevant configured build and tests, plus sanitizers when already present.
