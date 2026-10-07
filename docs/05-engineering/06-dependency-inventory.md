---
description: Complete direct dependency inventory across all workspace manifests and declaration kinds.
status: implemented
intent: reference
---

# Dependency Inventory

This is the complete **direct declaration** inventory from root/workspace manifests, including tools and types. It does not list transitive lockfile dependencies. `catalog:` references are ranges resolved by the lockfile; a direct declaration alone does not prove active runtime use.

Use [Technology catalog](./01-technologies.md) and [Library catalog](./02-libraries.md) for operating guides. Testing dependencies are explained under Quality and Tools; workspace contracts under Packages. Update this inventory alongside manifest changes. Each row links to an operating guide or an explicit usage caveat; a row in this inventory alone is not considered explanatory coverage.

| Dependency | Direct consumers and declaration kind | Declared specifier | Canonical coverage |
| --- | --- | --- | --- |
| `@axe-core/playwright` | `@kartuli/e2e` (devDependencies) | `catalog:` | [Browser tests and accessibility](../03-tools/02-e2e-runner.md) |
| `@base-ui/react` | `@kartuli/game-client` (dependencies) | `catalog:` | [Interaction primitives](./05-libraries/03-base-ui.md) |
| `@biomejs/biome` | `kartuli` (devDependencies) | `^2.4.15` | [Lint and formatting](./03-technologies/09-biome.md) |
| `@kartuli/docs` | `@kartuli/web-docs-client` (dependencies) | `workspace:*` | [Docs content workspace](../03-tools/03-web-docs-client.md) |
| `@kartuli/game-client` | `@kartuli/storybook` (devDependencies) | `workspace:*` | [App stories consumed by Storybook](../03-tools/01-storybook.md) |
| `@kartuli/tailwind-config` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `workspace:*` | [Shared CSS/source exports](../02-packages/index.md) |
| `@kartuli/ui` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `workspace:*` | [Shared CSS/source exports](../02-packages/index.md) |
| `@lhci/cli` | `kartuli` (devDependencies) | `^0.15.1` | [Lighthouse audit runner](../06-quality/04-web-quality.md) |
| `@playwright/test` | `@kartuli/e2e` (devDependencies) | `catalog:` | [Browser tests and accessibility](../03-tools/02-e2e-runner.md) |
| `@serwist/turbopack` | `@kartuli/game-client` (devDependencies) | `catalog:` | [Offline integration boundary](./05-libraries/05-serwist.md) |
| `@storybook/addon-a11y` | `@kartuli/storybook` (devDependencies) | `catalog:` | [Story rendering, docs and browser tests](../03-tools/01-storybook.md) |
| `@storybook/addon-docs` | `@kartuli/storybook` (devDependencies) | `catalog:` | [Story rendering, docs and browser tests](../03-tools/01-storybook.md) |
| `@storybook/addon-vitest` | `@kartuli/storybook` (devDependencies) | `catalog:` | [Story rendering, docs and browser tests](../03-tools/01-storybook.md) |
| `@storybook/react` | `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Story rendering, docs and browser tests](../03-tools/01-storybook.md) |
| `@storybook/react-vite` | `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Story rendering, docs and browser tests](../03-tools/01-storybook.md) |
| `@tailwindcss/postcss` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies) | `catalog:` | [CSS build integration](./03-technologies/06-tailwind-and-postcss.md) |
| `@tailwindcss/vite` | `@kartuli/storybook` (devDependencies) | `catalog:` | [CSS build integration](./03-technologies/06-tailwind-and-postcss.md) |
| `@tanstack/db` | `@kartuli/game-client` (dependencies) | `catalog:` | [Activity collections and persistence](./05-libraries/01-tanstack-and-indexeddb.md) |
| `@tanstack/query-db-collection` | `@kartuli/game-client` (dependencies) | `catalog:` | [Activity collections and persistence](./05-libraries/01-tanstack-and-indexeddb.md) |
| `@tanstack/react-db` | `@kartuli/game-client` (dependencies) | `catalog:` | [Activity collections and persistence](./05-libraries/01-tanstack-and-indexeddb.md) |
| `@tanstack/react-query` | `@kartuli/game-client` (dependencies) | `catalog:` | [Activity collections and persistence](./05-libraries/01-tanstack-and-indexeddb.md) |
| `@testing-library/dom` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies) | `catalog:` | [DOM tests and runner](../06-quality/04-testing/01-unit-integration.md) |
| `@testing-library/react` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies) | `catalog:` | [DOM tests and runner](../06-quality/04-testing/01-unit-integration.md) |
| `@testing-library/user-event` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies) | `catalog:` | [DOM tests and runner](../06-quality/04-testing/01-unit-integration.md) |
| `@types/js-cookie` | `@kartuli/game-client` (devDependencies) | `catalog:` | [Types, adapters and usage caveats](./05-libraries/07-toolchain-support.md) |
| `@types/node` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (dependencies); `@kartuli/e2e` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Types, adapters and usage caveats](./05-libraries/07-toolchain-support.md) |
| `@types/react` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Types, adapters and usage caveats](./05-libraries/07-toolchain-support.md) |
| `@types/react-dom` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Types, adapters and usage caveats](./05-libraries/07-toolchain-support.md) |
| `@vitejs/plugin-react` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Types, adapters and usage caveats](./05-libraries/07-toolchain-support.md) |
| `@vitest/browser` | `@kartuli/game-client` (devDependencies) | `catalog:` | [Types, adapters and usage caveats](./05-libraries/07-toolchain-support.md) |
| `@vitest/browser-playwright` | `@kartuli/storybook` (devDependencies) | `catalog:` | [Story rendering, docs and browser tests](../03-tools/01-storybook.md) |
| `@vitest/coverage-v8` | `kartuli` (devDependencies) | `catalog:` | [Coverage provider](../06-quality/04-testing/04-coverage.md) |
| `@vue/server-renderer` | `@kartuli/web-docs-client` (dependencies) | `catalog:` | [Docs and component build pipelines](./03-technologies/07-vite-and-vitepress.md) |
| `clsx` | `@kartuli/ui` (dependencies) | `catalog:` | [UI helper conventions](./05-libraries/06-motion-and-ui-helpers.md) |
| `dependency-cruiser` | `@kartuli/diagram-generator` (devDependencies) | `catalog:` | [Dependency diagrams](../03-tools/04-diagram-generator.md) |
| `esbuild` | `@kartuli/game-client` (devDependencies) | `catalog:` | [Types, adapters and usage caveats](./05-libraries/07-toolchain-support.md) |
| `happy-dom` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies) | `catalog:` | [DOM tests and runner](../06-quality/04-testing/01-unit-integration.md) |
| `i18next` | `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Localization and preference cookie](./05-libraries/02-i18next.md) |
| `idb` | `@kartuli/game-client` (dependencies) | `catalog:` | [Activity collections and persistence](./05-libraries/01-tanstack-and-indexeddb.md) |
| `js-cookie` | `@kartuli/game-client` (dependencies) | `catalog:` | [Localization and preference cookie](./05-libraries/02-i18next.md) |
| `lefthook` | `kartuli` (devDependencies) | `^2.1.8` | [Git validation hooks](./03-technologies/08-git-and-lefthook.md) |
| `motion` | `@kartuli/game-client` (dependencies) | `catalog:` | [UI helper conventions](./05-libraries/06-motion-and-ui-helpers.md) |
| `next` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [App framework](./03-technologies/04-nextjs.md) |
| `postcss` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies) | `catalog:` | [CSS build integration](./03-technologies/06-tailwind-and-postcss.md) |
| `react` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/ui` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [UI and rendering runtime](./03-technologies/05-react.md) |
| `react-dom` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/ui` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [UI and rendering runtime](./03-technologies/05-react.md) |
| `react-i18next` | `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Localization and preference cookie](./05-libraries/02-i18next.md) |
| `react-icons` | `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [UI helper conventions](./05-libraries/06-motion-and-ui-helpers.md) |
| `serwist` | `@kartuli/game-client` (devDependencies) | `catalog:` | [Offline integration boundary](./05-libraries/05-serwist.md) |
| `storybook` | `@kartuli/game-client` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [Story rendering, docs and browser tests](../03-tools/01-storybook.md) |
| `storybook-addon-pseudo-states` | `@kartuli/storybook` (devDependencies) | `catalog:` | [Story rendering, docs and browser tests](../03-tools/01-storybook.md) |
| `tailwind-merge` | `@kartuli/ui` (dependencies) | `catalog:` | [UI helper conventions](./05-libraries/06-motion-and-ui-helpers.md) |
| `tailwindcss` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [CSS build integration](./03-technologies/06-tailwind-and-postcss.md) |
| `turbo` | `kartuli` (devDependencies) | `^2.9.14` | [Task graph and cache](./03-technologies/02-turborepo.md) |
| `typescript` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (dependencies); `@kartuli/e2e` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:`, `catalog:storybook` | [Compiler and Storybook exception](./03-technologies/01-typescript.md) |
| `vite` | `@kartuli/storybook` (devDependencies) | `catalog:` | [Docs and component build pipelines](./03-technologies/07-vite-and-vitepress.md) |
| `vitepress` | `@kartuli/web-docs-client` (dependencies) | `catalog:` | [Docs and component build pipelines](./03-technologies/07-vite-and-vitepress.md) |
| `vitepress-plugin-diagrams` | `@kartuli/web-docs-client` (dependencies) | `catalog:` | [Diagram requests and cache caveats](../10-services/07-kroki.md) |
| `vitest` | `kartuli` (devDependencies); `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` | [DOM tests and runner](../06-quality/04-testing/01-unit-integration.md) |
| `vue` | `@kartuli/web-docs-client` (dependencies) | `catalog:` | [Docs and component build pipelines](./03-technologies/07-vite-and-vitepress.md) |
| `zod` | `@kartuli/game-client` (dependencies) | `catalog:` | [Runtime validation](./05-libraries/04-zod.md) |

## Catalog and usage audit

Audited **2026-10-06** against all **10 package.json files** and `pnpm-workspace.yaml`:
**61 distinct direct dependency names** (57 external and four workspace dependencies), **54 default
catalog entries**, and one named-catalog entry (`storybook.typescript`). Every direct declaration has
a row and a canonical coverage link above. All catalog names are represented above except the
catalog-only entry below.

| Additional declaration | Observed usage | Documentation |
| --- | --- | --- |
| `@tailwindcss/cli: ^4.2.1` in default catalog | No manifest consumer or repository script found | [Toolchain support](./05-libraries/07-toolchain-support.md#catalog-only-and-script-only-dependencies) |
| `typescript: ^6.0.3` in named `storybook` catalog | Only Storybook consumes `catalog:storybook`; other consumers use default TypeScript 7 | [TypeScript](./03-technologies/01-typescript.md) |
| `@swc/core`, `sharp` in root `pnpm.onlyBuiltDependencies` | Lifecycle-script allowlist, not direct declarations | [Toolchain support](./05-libraries/07-toolchain-support.md#installation-policy-is-not-a-dependency-declaration) |
| `esbuild`, `lefthook` in that allowlist | Also direct declarations above | [Toolchain support](./05-libraries/07-toolchain-support.md) |
| `http-server` in Storybook preview script | Invoked through `npx`, absent from manifests/catalog | [Toolchain support](./05-libraries/07-toolchain-support.md#catalog-only-and-script-only-dependencies) |

The audit found no missing or stale direct-dependency rows in the previous inventory. Its gaps were
explanatory links, the catalog-only CLI entry, toolchain support packages and the undeclared preview
command. `esbuild` and `@vitest/browser` remain declared in Game Client without a direct source/config
consumer found; that is different from proving they can safely be removed.

Catalog ranges and installed resolutions are different facts. Use `pnpm list -r --depth 0` for installed
versions and `pnpm why -r PACKAGE_NAME` for consumers/transitive paths. Renovate's
[dashboard #28](https://github.com/kartuli-app/kartuli/issues/28) independently lists catalog/schema
discovery, but tracks its own branch snapshot.

## Keeping this audit complete

1. Enumerate manifests with `rg --files -g package.json`, respecting workspace globs.
2. Compare all dependencies, devDependencies, peerDependencies and optionalDependencies with the rows.
3. Resolve each `catalog:` or named catalog against `pnpm-workspace.yaml`; inspect unconsumed entries.
4. Review scripts and pnpm policy fields for executables/packages outside direct declarations.
5. Trace source/config consumers before calling a dependency actively used or removable.
6. Update the relevant guide and coverage link; retain declaration-versus-usage distinctions.
7. Run docs generation/link checks, the docs build and `pnpm run validate:all`.

Transitive lockfile packages do not each need their own guide. Record a transitive package when it
creates an operating constraint, such as Storybook's TypeScript docgen requirement.
