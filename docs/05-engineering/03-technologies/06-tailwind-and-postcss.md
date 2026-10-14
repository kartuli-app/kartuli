---
description: CSS import order, token utility mapping, app and Storybook integrations.
status: implemented
intent: reference
---

# Tailwind CSS and PostCSS

## Role and configuration

Tailwind 4 supplies utility generation; `@kartuli/tailwind-config` supplies the shared design contract. App `postcss.config.mjs` configures `@tailwindcss/postcss`. Storybook uses `@tailwindcss/vite` in `.storybook/main.ts`, so the two build paths must both understand the shared CSS.

Every consumer imports CSS in this order: Tailwind, `@kartuli/tailwind-config`, then any consumer theme
or global rules. The package root resolves to `index.css`, which imports `primitives.css`,
`semantics.css` and `components.css` in dependency order. Each layer keeps runtime custom properties
under `:root` beside its Tailwind mappings under `@theme static`; there is no separate token build step.

CSS imports and class discovery are separate contracts. The Design System package is imported and must
not be added as an `@source`. React source trees are scanned explicitly:

| Environment | Explicit React sources |
| --- | --- |
| Game Client | Game Client source and `packages/ui/src` |
| Backoffice | Backoffice source and `packages/ui/src` |
| Storybook | Storybook-local source, `packages/ui/src` and Game Client source |

Storybook does not scan Backoffice because it renders no Backoffice-local stories or components.

## Using token-backed utilities

A CSS variable alone does not automatically create the expected utility. Follow the mapping: `--p-spacing-2` is exposed as `--spacing-p-spacing-2`, which is consumed as `p-p-spacing-2` or `gap-p-spacing-2`. Color mappings use `--color-*`; radius mappings use `--radius-*`. See [Design tokens](../../04-design-system/01-tokens.md) for examples and naming.

Use ordinary utilities for structure (flex, grid, positioning) and token-backed utilities for visual roles. `cn` combines clsx with tailwind-merge. Do not add a JavaScript Tailwind config merely because older Tailwind tutorials expect one.

## Changing and diagnosing styles

Edit the owning shared layer for a shared contract change; edit an app's `theme.css` for selected
primitive color overrides. Check both apps' `tailwind-integration.test.ts`, Storybook token/component
previews and all affected production builds. The integration tests compile the public CSS graph and
inspect representative variables/mappings; they do not prove visual contrast, every component state or
development watch behavior.

If a utility has no effect, check the owning layer's token mapping, spelling, source discovery and the
consumer stylesheet import order. If Storybook differs from an app, inspect
`.storybook/storybook.css`, the Vite plugin and root font/theme variables. Verify nested CSS changes and
new shared/app-local class names in a running development consumer as well as in production builds.
Avoid treating a typo or missing source path as a reason to duplicate raw colors in a component.

Sources: `packages/tailwind-config/index.css` and its layer files, app PostCSS/global styles,
`tools/storybook/.storybook/storybook.css` and `.storybook/main.ts`. Visual roles and theme changes
remain canonical in [Design System](../../04-design-system/index.md).
