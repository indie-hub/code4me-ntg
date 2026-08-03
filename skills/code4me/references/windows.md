# Windows baseline

Project instructions override this baseline.

- Do not assume Unix paths, permissions, signals, sockets, PTYs, or symlink rights.
- Use native Windows APIs behind the project's existing platform boundary.
- Treat privilege, long-path, encoding, and process/handle ownership failures as
  normal error paths.
- Cross-compilation is useful evidence but does not replace a native Windows run.
