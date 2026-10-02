---
description: Playwright execution, target selection and production smoke configuration.
status: implemented
intent: reference
---

# E2E Runner

`tools/e2e/playwright.config.ts` runs Chromium tests under `tests/`. `BASE_URL` selects the target and defaults to `http://localhost:3000`; the config does not start a web server. CI uses one worker, one retry and the GitHub reporter, with traces on first retry and failure screenshots/video.

Start the target first, then use `pnpm run c:e2e:game-client`, `c:e2e:backoffice-client`, `c:e2e:storybook`, or `c:e2e:web-docs-client`. These scripts set target ports. Production workflows explicitly select `tests/<target>/production`; that is a different scope from all local E2E tests.

`tests/helpers/expect-a11y.ts` owns the axe Playwright integration. See [Testing](../06-quality/01-testing.md) for test layers and [Deployment](../07-platform/02-deployment.md) for production execution. Artifacts may contain page state; handle them under [Data & Privacy](../09-data-and-privacy/index.md).
