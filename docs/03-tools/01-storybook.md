---
description: Storybook component previews, browser tests, themes and source configuration.
status: implemented
intent: reference
---

# Storybook

## Responsibility and consumers

Storybook is the real-browser component playground for `packages/ui`, Game Client source and
Storybook-owned review fixtures. It is not a third application package and does not establish that
every displayed app-local component is shared. Stories are discovered beside shared and Game Client
source, plus `tools/storybook/src` for fixtures that belong to preview tooling itself.

Shared `AppShell`, `AppBar`, `Dock` and `DockItem` stories live beside their source in `packages/ui` and
use framework-neutral fixtures. Game Client title, icon-action and product stories remain in the app
tree when they require app identity, transitions, navigation or other local composition.

`main.ts` configures React/Vite, Tailwind's Vite plugin, addon-docs, addon-a11y, addon-vitest and pseudo
states. It merges `@game-client` and `@kartuli/ui` aliases, prebundles recurring Next/i18n/icon imports
and forces automatic JSX through Vite 8's Oxc path so Next's inherited `jsx: preserve` does not leak
unparsed JSX into Storybook.

`.storybook/storybook.css` imports Tailwind and the public `@kartuli/design-system` CSS entry. Its
explicit `@source` directives scan Storybook-local source, `packages/ui/src` and Game Client source
because those are the React trees Storybook renders. It does not scan the Design System CSS package or
Backoffice source.

Docgen uses Storybook's `react-docgen` parser and the shared TypeScript catalog. It records display names and destructured default values. Stories that need specific Controls declare them in `argTypes`. The parser does not expand `Readonly<Props>` into prop types, so union metadata is not generated from those interfaces. See [TypeScript](../05-engineering/03-technologies/01-typescript.md) for the shared compiler catalog.

## Preview and test behavior

`preview.tsx` supplies theme controls and makes axe violations fail browser tests. Its global decorator
provides a `<main>` landmark for isolated components; fullscreen workshop stories must not add a second
main landmark. The toolbar exposes these private preview modes:

- **Game / Default** is the real default theme and applies no overrides.
- **Backoffice** is the real Backoffice identity, duplicating all 11 brand and 11 accent primitives so
  Storybook does not import application runtime code. A browser test compares the map exactly with the
  production `theme.css`, which is also a Turbo input for the test task.
- **Stress: Emerald** and **Stress: Rose** are synthetic brand-only ramps used to expose raw-color or
  semantic-mapping assumptions. Their 600 slots use the next darker ramp value so the shared selected
  text pairing remains readable.

All definitions are restricted to brand/accent primitives. One keyed wrapper records existing inline
values and priorities, applies the selected map, and restores or removes them during cleanup. An unknown
mode resolves to Game/default. This is preview tooling, not an application runtime theme switcher.

The viewport toolbar includes exact 390x844, 900x900 and 1600x1000 review sizes. The
`Design System/Workshop/Shared Shell` Review story composes the real shared `AppShell`, `AppBar`, `Dock`
and `DockItem` with Storybook-owned labels, anchor links and optional neutral end-rail content. Use it to
compare bottom-dock, compact-rail and expanded-rail geometry across all four modes. Focused
`ShellRail` and `ContentContainer` stories cover rail placement and content width, padding and centering.

`vitest.config.ts` uses addon-vitest and Playwright Chromium to render every story, execute `play`
functions and apply preview annotations. `vitest.integration.config.ts` runs the theme-parity, cleanup
and Tailwind integration guards in the same browser mode. Turbo makes the Storybook `test` task depend
on the UI build and includes UI/Game Client source plus the production Backoffice theme in its cache
inputs. Root V8 coverage excludes these browser projects, but `pnpm run test:all` and therefore
`validate:all` do execute them.

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

When changing the layered token CSS or source paths, verify a running Storybook session detects edits
to primitive, semantic and component files, new token mappings, shared UI classes and Game Client-local
classes without a server restart. The production build remains a separate required check. The Tailwind
integration test also checks emitted utilities from Storybook-local, shared UI and Game Client source
while ensuring the test itself cannot seed discovery candidates.
