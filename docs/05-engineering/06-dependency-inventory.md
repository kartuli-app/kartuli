---
description: Complete direct dependency inventory across all workspace manifests and declaration kinds.
status: implemented
intent: reference
---

# Dependency Inventory

This is the complete **direct declaration** inventory from root/workspace manifests, including tools and types. It does not list transitive lockfile dependencies. `catalog:` references are ranges resolved by the lockfile; a direct declaration alone does not prove active runtime use.

Use [Technology catalog](./01-technologies.md) and [Library catalog](./02-libraries.md) for operating guides. Testing dependencies are explained under Quality and Tools; workspace contracts under Packages. Update this inventory alongside manifest changes. Small helpers stay here until they have a Kartuli-specific convention worth a dedicated page.

| Dependency | Direct consumers and declaration kind | Declared specifier |
| --- | --- | --- |
| `@axe-core/playwright` | `@kartuli/e2e` (devDependencies) | `catalog:` |
| `@base-ui/react` | `@kartuli/game-client` (dependencies) | `catalog:` |
| `@biomejs/biome` | `kartuli` (devDependencies) | `^2.4.15` |
| `@kartuli/docs` | `@kartuli/web-docs-client` (dependencies) | `workspace:*` |
| `@kartuli/game-client` | `@kartuli/storybook` (devDependencies) | `workspace:*` |
| `@kartuli/tailwind-config` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `workspace:*` |
| `@kartuli/ui` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `workspace:*` |
| `@lhci/cli` | `kartuli` (devDependencies) | `^0.15.1` |
| `@playwright/test` | `@kartuli/e2e` (devDependencies) | `catalog:` |
| `@serwist/turbopack` | `@kartuli/game-client` (devDependencies) | `catalog:` |
| `@storybook/addon-a11y` | `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@storybook/addon-docs` | `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@storybook/addon-vitest` | `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@storybook/react` | `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@storybook/react-vite` | `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@tailwindcss/postcss` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies) | `catalog:` |
| `@tailwindcss/vite` | `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@tanstack/db` | `@kartuli/game-client` (dependencies) | `catalog:` |
| `@tanstack/query-db-collection` | `@kartuli/game-client` (dependencies) | `catalog:` |
| `@tanstack/react-db` | `@kartuli/game-client` (dependencies) | `catalog:` |
| `@tanstack/react-query` | `@kartuli/game-client` (dependencies) | `catalog:` |
| `@testing-library/dom` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies) | `catalog:` |
| `@testing-library/react` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies) | `catalog:` |
| `@testing-library/user-event` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies) | `catalog:` |
| `@types/js-cookie` | `@kartuli/game-client` (devDependencies) | `catalog:` |
| `@types/node` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (dependencies); `@kartuli/e2e` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@types/react` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@types/react-dom` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@vitejs/plugin-react` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@vitest/browser` | `@kartuli/game-client` (devDependencies) | `catalog:` |
| `@vitest/browser-playwright` | `@kartuli/storybook` (devDependencies) | `catalog:` |
| `@vitest/coverage-v8` | `kartuli` (devDependencies) | `catalog:` |
| `@vue/server-renderer` | `@kartuli/web-docs-client` (dependencies) | `catalog:` |
| `clsx` | `@kartuli/ui` (dependencies) | `catalog:` |
| `dependency-cruiser` | `@kartuli/diagram-generator` (devDependencies) | `catalog:` |
| `esbuild` | `@kartuli/game-client` (devDependencies) | `catalog:` |
| `happy-dom` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies) | `catalog:` |
| `i18next` | `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `idb` | `@kartuli/game-client` (dependencies) | `catalog:` |
| `js-cookie` | `@kartuli/game-client` (dependencies) | `catalog:` |
| `lefthook` | `kartuli` (devDependencies) | `^2.1.8` |
| `motion` | `@kartuli/game-client` (dependencies) | `catalog:` |
| `next` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `postcss` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies) | `catalog:` |
| `react` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/ui` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `react-dom` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/ui` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `react-i18next` | `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `react-icons` | `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `serwist` | `@kartuli/game-client` (devDependencies) | `catalog:` |
| `storybook` | `@kartuli/game-client` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `storybook-addon-pseudo-states` | `@kartuli/storybook` (devDependencies) | `catalog:` |
| `tailwind-merge` | `@kartuli/ui` (dependencies) | `catalog:` |
| `tailwindcss` | `@kartuli/backoffice-client` (dependencies); `@kartuli/game-client` (dependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `turbo` | `kartuli` (devDependencies) | `^2.9.14` |
| `typescript` | `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (dependencies); `@kartuli/e2e` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:`, `catalog:storybook` |
| `vite` | `@kartuli/storybook` (devDependencies) | `catalog:` |
| `vitepress` | `@kartuli/web-docs-client` (dependencies) | `catalog:` |
| `vitepress-plugin-diagrams` | `@kartuli/web-docs-client` (dependencies) | `catalog:` |
| `vitest` | `kartuli` (devDependencies); `@kartuli/backoffice-client` (devDependencies); `@kartuli/game-client` (devDependencies); `@kartuli/ui` (devDependencies); `@kartuli/storybook` (devDependencies) | `catalog:` |
| `vue` | `@kartuli/web-docs-client` (dependencies) | `catalog:` |
| `zod` | `@kartuli/game-client` (dependencies) | `catalog:` |
