---
sidebar_position: 5
sidebar_label: Package Manager Wrapper
title: Package Manager Wrapper
---

## 📦 Package Manager Wrapper

ZGF provides convenient wrappers around your package manager to install dependencies and run scripts directly.

### Commands

- `zgf add <package...> [--dev|-D]` — installs packages using the detected or saved package manager.
- `zgf run <script> [args...]` — runs a script from `package.json` with the selected package manager.

### Detection and persistence

- Preference order: `.zgfconfig.json` → lockfiles in project (`pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`, `package-lock.json`) → available binaries on system.
- If nothing is found, ZGF can interactively prompt for a manager and will save it to `.zgfconfig.json` for future runs.
- When you scaffold a project with ZGF, the chosen manager is also written to `.zgfconfig.json`.

### Examples

```bash
# add runtime deps
zgf add axios zod

# add dev deps
zgf add -D vitest @types/node

# run scripts
zgf run dev
zgf run build
zgf run test -- --run
```

### Notes

- Ensure the script exists in your `package.json` (e.g., `scripts.start`). If a script is missing, your PM will error accordingly.
- Avoid mixing lockfiles from different package managers to prevent resolution inconsistencies.
