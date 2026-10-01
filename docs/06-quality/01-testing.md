---
description: Unit, integration, browser, E2E, smoke and coverage execution boundaries.
status: implemented
intent: reference
---

# Testing

| Layer | Current implementation | Execution |
| --- | --- | --- |
| Unit/integration | Colocated Vitest tests in apps/shared packages; Testing Library and Happy DOM for DOM tests | Workspace `test` scripts through `pnpm run test:all` |
| Component/browser | Storybook stories rendered in real Chromium, play functions and axe scans | Also included in Turbo `test:all`; explicit `pnpm --filter @kartuli/storybook test` available |
| E2E | Playwright target suites and axe helper | [E2E Runner](../03-tools/02-e2e-runner.md); separate from Vitest |
| Production smoke | Target-specific `tests/<target>/production` suites | Production workflows against deployed URLs |
| Coverage | Root Vitest project aggregation with V8 and text/HTML/JSON reports | `pnpm run test:all:coverage` |

Unit and integration are purposes, not separately enforced directory structures. Add tests alongside the behavior they verify; choose browser/E2E tests when actual layout, navigation or integration matters.

## Coverage and browser distinction

`vitest.config.mts` excludes `tools/storybook` and `tools/e2e` from root coverage projects. This exclusion does **not** exclude Storybook from Turbo's `test:all`. `turbo.json` gives Storybook tests a dependency on the UI build. Browser binaries/system libraries are needed for full validation.

The CI all-monorepo composite action runs root lint, then typecheck, lint, root coverage and Storybook tests in parallel and reports coverage. It does not replace app production smoke or E2E workflows. No repository-wide coverage percentage gate is asserted here; consult the current configs before introducing one.

Use `pnpm run validate:all` as the local completion gate. Docs also require a [Web Docs build and index check](../03-tools/03-web-docs-client.md).
