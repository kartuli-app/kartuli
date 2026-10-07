---
description: Common contributor commands, script discovery and execution boundaries.
status: implemented
intent: reference
---

# Command Reference

Root and workspace `package.json` files own the executable scripts. Run `pnpm run` to list root
scripts or `pnpm --filter @kartuli/game-client run` to list a workspace's scripts. Read the relevant
manifest for exact implementation; this page keeps only common entry points and operational caveats.

Start with [Node/pnpm](./03-technologies/03-node-and-pnpm.md) for the pinned toolchain.

| Task | Root command | Boundary |
| --- | --- | --- |
| Validate changes | `pnpm run validate:all` | Lint, typecheck and workspace tests, including documentation contracts |
| Build all surfaces | `pnpm run build:all` | Production builds; separate from validation |
| Generate coverage | `pnpm run test:all:coverage` | Root Vitest projects; excludes Storybook and E2E |
| Work on one surface | `pnpm run c:dev:game-client` | Equivalent scripts exist for Backoffice, Storybook and Web Docs |
| Build or preview one surface | `pnpm run c:build:game-client`, `pnpm run c:preview:game-client` | Inspect target-specific preview behavior below |
| Run a target's E2E | `pnpm run c:e2e:game-client` | Requires a running target and installed browser |
| Build documentation | `pnpm run c:build:web-docs-client` | Validates source/navigation, renders and checks the built index |
| Inspect dependency diagrams | `pnpm run diagrams:all` | Requires local Graphviz `dot` |

## Execution differences

- `*:no-cache` scripts force Turbo execution; `turbo:cache:wipe` removes the local Turbo cache.
- `lint:all:fix` and `lint:root:fix` modify files; ordinary lint checks do not.
- `test:all` includes Storybook Chromium tests. Coverage has a different scope; see [Testing](../06-quality/01-testing/index.md).
- App preview builds then starts. Backoffice development/E2E shortcuts use port 3001, but its preview
  uses port 3000; set the E2E target explicitly when using preview.
- Storybook preview serves existing `storybook-static` through its current `npx http-server` script;
  it does not build first. See [Toolchain support](./05-libraries/07-toolchain-support.md) for that
  undeclared executable and the pnpm-only contributor convention.
- Docs preview builds first; direct `vitepress preview` serves an existing build only.
- E2E commands select tests and URLs but do not start servers. See [E2E Runner](../03-tools/02-e2e-runner.md).
- Lighthouse can upload reports to temporary public storage; inspect its [quality guide](../06-quality/04-web-quality.md) before running against sensitive pages.

Use the owning [tool guides](../03-tools/index.md) for prerequisites, expected output and failure
diagnosis. When scripts change, update affected workflows and these operational distinctions without
copying the entire manifest into Markdown.
