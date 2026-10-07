---
description: Type declarations, build adapters, catalog-only entries and declared-versus-used dependency boundaries.
status: implemented
intent: reference
---

# Toolchain Support Packages

These packages support compilation, testing and rendering. Their configuration owner matters more
than whether a manifest labels them dependencies or devDependencies. The
[dependency inventory](../06-dependency-inventory.md) explains how to find current consumers and declaration kinds in manifests.

## Type declarations

| Package | Contract | Change checks |
| --- | --- | --- |
| `@types/node` | Node globals/APIs for configs, scripts and server code | Keep major 24 aligned with the runtime; Renovate caps it below 25 |
| `@types/react` | React component/JSX types | Check React 19 compatibility across both apps, shared UI and Storybook |
| `@types/react-dom` | DOM renderer types | Change with React DOM/React declarations and run app/UI typechecks |
| `@types/js-cookie` | Cookie API types used by locale settings | Check settings code and `js-cookie` API compatibility together |

Shared UI declares its compiler and React/Node types under dependencies, while most workspaces use
devDependencies. That describes the current manifest contract, not a requirement to move them in a
documentation change. Types provide compile-time checking; they do not validate runtime data.

## Build and test adapters

`@vitejs/plugin-react` is imported by both app Vitest configs and the Storybook Vitest config.
It transforms React test code. The app tests use Happy DOM; Storybook uses the configured Playwright
browser provider. An app declaring browser-related packages does not make its tests browser tests.

`@vitest/browser` is directly declared by Game Client, but no direct import or browser-mode
configuration was found there. `@vitest/browser-playwright` is actively imported by
`tools/storybook/vitest.config.ts`; that is the evidence for the real Chromium suite.
`@vitest/coverage-v8` is declared at root for root coverage. Keep runner, browser, Playwright adapter and coverage integration on the same exact release.
The catalog pins these versions, and Renovate preserves pins with a constraint below major 5.
Pinning individual packages does not itself enforce equality: review all four lockfile resolutions.

`esbuild` is directly declared by Game Client and permitted to run install scripts. No repository
source/config directly invokes its API or CLI. Storybook explicitly configures Oxc automatic JSX in
its Vite 8 path; it is misleading to describe esbuild as that pipeline's current configured transform.
Transitive tooling may still need esbuild. Investigate `pnpm why -r esbuild` and builds before removal.

`vue` and `@vue/server-renderer` are direct Web Docs dependencies supporting VitePress's rendering
pipeline. They do not introduce Vue into the learner/operator apps. See
[Vite and VitePress](../03-technologies/07-vite-and-vitepress.md).

## Storybook addon roles

The Storybook configuration explicitly enables:

- `@storybook/addon-docs` for component documentation.
- `@storybook/addon-a11y` for accessibility checking, with violations configured as test errors.
- `@storybook/addon-vitest` for story-based tests.
- `storybook-addon-pseudo-states` for displaying CSS pseudo states in stories.

`@storybook/react` supplies the React story integration/types and `@storybook/react-vite` is the
configured framework. The `storybook` package supplies the executable and exported APIs.
The [Storybook guide](../../03-tools/01-storybook.md) owns discovery, aliases, docgen and validation.

## Catalog-only and script-only dependencies

`@tailwindcss/cli` appears in the default catalog but no workspace manifest consumes it and no
repository script invokes it. Current apps use `@tailwindcss/postcss`; Storybook uses
`@tailwindcss/vite`. A catalog entry provides a reusable version, not an installation or an active
build step. Document a consumer if one is added.

Storybook's current preview script invokes `npx http-server ./storybook-static -p 6006`.
`http-server` is absent from manifests/catalog, so the preview command does not establish a
repository-pinned server dependency. This is an existing reproducibility gap and also differs from
the repository's pnpm-only contributor workflow. Prefer the documented Storybook dev server for
interactive component work; choosing a pinned preview implementation is a separate code change.

## Installation policy is not a dependency declaration

Root `pnpm.onlyBuiltDependencies` permits lifecycle scripts for `@swc/core`, `esbuild`,
`lefthook` and `sharp`. The first and last are not direct manifest declarations. This allowlist
controls installed-package script execution; it does not install these packages, prove a source import,
or document every transitive package.

Root `pnpm.updateConfig.ignoreDependencies` includes `@types/node`. This pnpm update policy and
Renovate's separate version rule are different mechanisms; inspect both before changing runtime types.

## Investigating a support-package change

```bash
pnpm list -r --depth 0
pnpm why -r esbuild
pnpm why -r @vitest/browser
pnpm run validate:all
```

Add the relevant build for a changed transform/runtime adapter. Use
[Node.js and pnpm](../03-technologies/03-node-and-pnpm.md) for catalog/install conventions and
[Testing](../../06-quality/01-testing/index.md) to distinguish unit, browser and E2E evidence.
