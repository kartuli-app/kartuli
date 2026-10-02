---
description: Story execution, play functions, accessibility and browser prerequisites.
status: implemented
intent: reference
---

# Component and Browser Testing

## Purpose

Use component/browser tests for behavior that depends on real browser rendering: focus, portals, interactive component states, CSS and story play functions. Storybook is the current execution surface, covering shared UI and Game Client stories.

## Execution model

`tools/storybook/vitest.config.ts` configures addon-vitest, Playwright Chromium, headless execution and the Storybook config directory. The plugin reads preview annotations, renders stories and runs interactions. `preview.tsx` makes accessibility violations errors and wraps isolated stories in a main landmark.

Turbo `test:all` includes the Storybook test script and builds UI first. Root `test:all:coverage` excludes Storybook, while CI runs its browser suite separately. Do not repeat the old assumption that all browser tests are opt-in.

## Prerequisites and commands

```bash
pnpm --filter @kartuli/e2e exec playwright install chromium
pnpm --filter @kartuli/storybook run test
pnpm --filter @kartuli/storybook run test:watch
pnpm run c:dev:storybook
```

Browser binaries and OS libraries are separate requirements from pnpm dependencies. CI's Playwright setup action handles its runner environment. A missing executable or invalid download is a setup failure, not evidence a component assertion failed. Use the exact Playwright version resolved by the lockfile.

## Authoring and troubleshooting

Add stories beside the component using the existing discovery patterns. Cover meaningful variants and state transitions; a static story only proves what it actually renders. Supply required providers and data intentionally. Prefer a play function when a behavior needs an assertion rather than relying on a screenshot.

If app code works in Next but fails in Storybook, inspect source aliases, Oxc JSX transformation, Next-link integration, font variables and optimized dependencies. If only a story fails axe, inspect the rendered node, landmark wrapper and any story-specific exceptions. Do not broadly disable accessibility scans to fix missing story context.

Browser tests are not a replacement for route integration or production smoke checks. Tool setup is canonical in [Storybook](../../03-tools/01-storybook.md), accessibility policy in [Accessibility](../02-accessibility.md).
