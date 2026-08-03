# Swift baseline

Project instructions override this baseline.

- Preserve platform availability, actor isolation, and the project's Swift/Xcode
  toolchain.
- Prefer value semantics and explicit error handling; avoid new force unwraps.
- Keep UI work on the correct isolation boundary and avoid blocking async paths.
- Run the relevant Swift Package or Xcode test using the project's scheme/config.
