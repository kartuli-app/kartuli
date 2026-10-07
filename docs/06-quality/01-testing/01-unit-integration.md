---
description: Choosing fast tests, using Happy DOM and Testing Library, and understanding mocks.
status: implemented
intent: reference
---

# Unit and Integration Testing

## Purpose and scope

Use unit tests for isolated transformations and decisions, such as transliteration, route parsing or swipe calculations. Use integration tests when correctness depends on cooperating modules, such as content ingestion/library construction or component/provider behavior. Both normally live beside source and use Vitest; there is no separate integration runner implied by the name.

## Environment and configuration

Game Client's `vitest.config.ts` uses the React Vite plugin, Happy DOM with a localhost URL, explicit aliases and `setupTests.ts`, which initializes i18n. Its globals are disabled, so import test APIs. UI's config uses Happy DOM and enables globals. Do not copy setup assumptions between workspaces without reading their configuration.

Testing Library DOM/React and user-event are available according to workspace declarations. Prefer assertions on behavior and accessible roles/names over private implementation structure. Test cleanup and mocks must prevent state leaking across cases, particularly module caches, locale state and browser identifiers.

## Running focused checks

```bash
pnpm --filter @kartuli/game-client exec vitest run src/logging/dev-logger.test.ts
pnpm --filter @kartuli/game-client run test
pnpm --filter @kartuli/ui run test
```

Focused commands help debug; `pnpm run validate:all` remains the completion gate. Optional Vitest typecheck configuration does not mean ordinary test execution typechecks the tests; see [TypeScript](../../05-engineering/03-technologies/01-typescript.md).

## Selecting assertions and mocks

Include boundary and failure behavior, not merely the happy path. Mock unavailable infrastructure at a defined boundary and retain tests of the real integration elsewhere. The study screen tests mock Motion; they cannot prove actual pointer geometry or animation. Happy DOM is useful for DOM logic but is not a browser layout engine.

For persistence, distinguish state visible in the collection from state recovered after reload. A mock database can prove transaction/error handling but not actual browser storage availability. Add browser verification where that distinction matters. See [Component/browser testing](./02-component-browser.md) and [E2E](./03-e2e-smoke.md).

## Failure investigation

Run the smallest failing file first, inspect its setup and aliases, then rerun the affected suite to detect ordering leaks. Do not disable a check because its environment was misunderstood. Source examples and runner settings are the colocated `*.test.ts(x)` files and workspace `vitest.config.ts` files.
