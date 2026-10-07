---
description: Storybook component previews, browser tests, themes and source configuration.
status: implemented
intent: reference
---

# Storybook

## Responsibility and consumers

Storybook is the real-browser component playground for `packages/ui` and Game Client source. It is not
a third application package and does not establish that every displayed app-local component is shared.
Stories are discovered beside source through the two globs in `.storybook/main.ts`.

`main.ts` configures React/Vite, Tailwind's Vite plugin, addon-docs, addon-a11y, addon-vitest and pseudo
states. It merges `@game-client` and `@kartuli/ui` aliases, prebundles recurring Next/i18n/icon imports
and forces automatic JSX through Vite 8's Oxc path so Next's inherited `jsx: preserve` does not leak
unparsed JSX into Storybook.

Docgen reads `tsconfig.docgen.json` with the named TypeScript 6 catalog. Do not upgrade it to the root
TypeScript 7 range until `react-docgen-typescript` works with the removed JavaScript compiler API.

## Preview and test behavior

`preview.tsx` supplies theme controls and makes axe violations fail browser tests. Its global decorator
provides a `<main>` landmark for isolated components; a story rendering its own main may need a narrow
rule adjustment. The default, emerald and rose themes override the primitive brand ramp on the
document root and restore prior values after unmount.

`vitest.config.ts` uses addon-vitest and Playwright Chromium to render every story, execute `play`
functions and apply preview annotations. Turbo makes the Storybook `test` task depend on the UI build
and includes UI/Game Client source in its cache inputs. Root V8 coverage excludes this browser project,
but `pnpm run test:all` and therefore `validate:all` do execute it.

## Commands and expected results

Run `pnpm run c:dev:storybook` for the playground on port 6006, `pnpm run c:build:storybook` for static output, and `pnpm --filter @kartuli/storybook test` for browser tests. Install the matching Chromium runtime first via `pnpm --filter @kartuli/e2e exec playwright install chromium` (system libraries may also be needed).

```bash
pnpm run c:dev:storybook
pnpm --filter @kartuli/storybook run test
pnpm run c:build:storybook
pnpm run c:preview:storybook
```

Development prints `http://localhost:6006`. A static build writes `tools/storybook/storybook-static`.
The preview script serves an existing build with `npx http-server`; it does not build first and is a
recorded exception to the pnpm-only contributor convention. Build before previewing, and do not copy
that invocation pattern into new scripts.

## Adding or debugging a story

Keep the story beside its component. Cover meaningful variants and use a `play` function for behavior
that needs assertions. Supply the real providers/context needed by the component; do not disable axe
to hide an incomplete story fixture.

If a story fails while the Next app works, inspect in this order:

1. The source alias in both `.storybook/main.ts` and `vitest.config.ts`.
2. Oxc JSX handling and the closest app tsconfig.
3. Optimized dependencies for new icon/i18n/Next imports.
4. Global CSS imports, Tailwind source discovery and font variables.
5. Required provider/navigation context and browser-only APIs.

A Chromium download/executable failure is an environment prerequisite failure, not a failed component
assertion. An isolated passing story does not prove route-level data, navigation or production behavior.

Token stories visualize the [Design System](../04-design-system/index.md). See
[Component/browser testing](../06-quality/01-testing/02-component-browser.md) and
[Accessibility](../06-quality/02-accessibility.md) for evidence and policy.
