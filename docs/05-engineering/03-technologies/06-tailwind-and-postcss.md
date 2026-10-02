---
description: CSS import order, token utility mapping, app and Storybook integrations.
status: implemented
intent: reference
---

# Tailwind CSS and PostCSS

## Role and configuration

Tailwind 4 supplies utility generation; `@kartuli/tailwind-config` supplies the shared design contract. App `postcss.config.mjs` configures `@tailwindcss/postcss`. Storybook uses `@tailwindcss/vite` in `.storybook/main.ts`, so the two build paths must both understand the shared CSS.

Game Client `src/root-layout/globals.css` imports Tailwind then `@kartuli/tailwind-config`. `shared-styles.css` contains runtime custom properties under `:root` and Tailwind mappings under `@theme static`. The package exports that CSS directly; there is no separate token build step to run.

## Using token-backed utilities

A CSS variable alone does not automatically create the expected utility. Follow the mapping: `--p-spacing-2` is exposed as `--spacing-p-spacing-2`, which is consumed as `p-p-spacing-2` or `gap-p-spacing-2`. Color mappings use `--color-*`; radius mappings use `--radius-*`. See [Design tokens](../../04-design-system/01-tokens.md) for examples and naming.

Use ordinary utilities for structure (flex, grid, positioning) and token-backed utilities for visual roles. `cn` combines clsx with tailwind-merge. Do not add a JavaScript Tailwind config merely because older Tailwind tutorials expect one.

## Changing and diagnosing styles

Edit the shared stylesheet for a shared contract change; edit app layout/style integration for app-specific behavior. Check both apps' `tailwind-integration.test.ts`, Storybook token/component previews and a production build. The integration tests compile CSS and inspect emitted variables/mappings; they do not prove visual contrast or every component state.

If a utility has no effect, check the token mapping, spelling, source discovery and the consuming stylesheet import order. If Storybook differs from the app, inspect `.storybook/storybook.css`, the Vite plugin and root font/theme variables. Avoid treating a typo as a reason to duplicate raw colors in a component.

Sources: `packages/tailwind-config/shared-styles.css`, app PostCSS/global styles, `tools/storybook/.storybook/main.ts`. Visual roles and theme changes remain canonical in [Design System](../../04-design-system/index.md).
