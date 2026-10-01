---
description: Storybook component previews, browser tests, themes and source configuration.
status: implemented
intent: reference
---

# Storybook

`tools/storybook/.storybook/main.ts` discovers stories and configures the React/Vite integration. `preview.tsx` supplies theme controls and the accessibility policy; `vitest.config.ts` uses addon-vitest and Playwright Chromium to render stories and execute their play functions.

Run `pnpm run c:dev:storybook` for the playground on port 6006, `pnpm run c:build:storybook` for static output, and `pnpm --filter @kartuli/storybook test` for browser tests. Install the matching Chromium runtime first via `pnpm --filter @kartuli/e2e exec playwright install chromium` (system libraries may also be needed).

The default, emerald and rose previews override primitive brand tokens. Token stories visualize the [Design System](../04-design-system/index.md). Storybook retains TypeScript 6 through the named `storybook` catalog because docgen needs the JavaScript compiler API.

The browser suite participates in Turbo `test:all`; it is excluded from the root Vitest coverage project list. See [Testing](../06-quality/01-testing.md) and [Accessibility](../06-quality/02-accessibility.md).
