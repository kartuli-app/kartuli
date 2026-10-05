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

## Execution matrix

| Entry point | Tests it currently executes | Important omission |
| --- | --- | --- |
| `pnpm run validate:all` | Turbo workspace `test` tasks, including app/UI Vitest, Storybook Chromium and Web Docs Node navigation tests | Builds and Playwright E2E are separate |
| `pnpm run test:all:coverage` | Root Vitest projects with V8 coverage; apps/UI tests discovered by Vitest | Storybook, E2E and Web Docs `.node-test.js` are excluded/not discovered |
| PR `ci-validate-all-monorepo` | Root coverage plus a separate Storybook browser run | Does not invoke Turbo `test:all`, so Web Docs Node navigation tests are not run here |
| PR Web Docs reusable workflow | Preview build/server and Web Docs Playwright smoke | Package validation is conditional on manual dispatch; `check-docs` is not invoked |
| Production Web Docs workflow | Package lint/test, build/deploy and post-deploy Playwright | Full monorepo validation belongs to the earlier PR gate |

This asymmetry is implemented behavior, not a recommendation. Local `validate:all`, focused Web Docs
checks and the production workflow cover the navigation test, while normal PR Web Docs E2E covers the
rendered navigation. If CI is changed to make one command canonical, update this matrix and the
composite-action comments together.

Use `pnpm run validate:all` as the local completion gate. Docs also require a [Web Docs build and index check](../03-tools/03-web-docs-client.md).

## Choosing the right layer

Start with the failure you want to prevent. Pure transformations and branching decisions fit unit tests. Collaboration between modules or React/provider behavior fits integration tests. Focus, real CSS, portals and animation require browser/component tests. Navigation across the assembled surface belongs in E2E; deployed availability belongs in production smoke tests.

A change can require more than one layer, but repeating the same assertion everywhere adds maintenance without necessarily adding confidence. Each test should explain which boundary it verifies. Mocks should expose a boundary, not hide the behavior under review.

- [Unit and integration](./04-testing/01-unit-integration.md): environments, setup, assertions and mocks.
- [Component/browser](./04-testing/02-component-browser.md): stories, play functions and Chromium.
- [E2E and production smoke](./04-testing/03-e2e-smoke.md): servers, targets, retries and artifacts.
- [Coverage](./04-testing/04-coverage.md): reports, exclusions and interpretation.
- [Accessibility](./02-accessibility.md): automated scans and manual interaction checks.
- [Web Quality and Lighthouse](./04-web-quality.md): mobile audit profile, score enforcement and public reports.

For documentation tooling, the Web Docs workspace also runs Node's built-in tests for navigation contracts. These do not require Chromium and do not replace rendered-site verification.
