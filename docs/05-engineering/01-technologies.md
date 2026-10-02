---
description: Current technologies and their Kartuli-specific roles and configuration sources.
status: implemented
intent: reference
---

# Technology Catalog

This inventory describes repository usage, not upstream tutorials. Versions below are declared major versions; consult the catalog/lockfile for resolutions.

| Technology | Kartuli usage and convention | Source |
| --- | --- | --- |
| [Git](https://git-scm.com/doc) | Source history and branches; Conventional Commits and Lefthook gates | `lefthook.yml`; [Git workflow](../12-project/02-workflow.md) |
| [Node.js](https://nodejs.org/en/docs) | Runtime for builds, scripts and tests; pin 24.13.1 | `.nvmrc`, CI setup action |
| [pnpm](https://pnpm.io/workspaces) | Version 10.30.2; workspaces, shared catalog and Storybook exception; no npm workflow | `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml` |
| [Turborepo](https://turborepo.com/docs) | Task dependencies, affected selection and local/remote cache | `turbo.json`, `scripts/orchestrator` |
| [TypeScript](https://www.typescriptlang.org/docs/) | Version 7 for app/shared code; version 6 retained for Storybook docgen | Root/workspace `tsconfig*`, catalogs |
| [React](https://react.dev/) | Version 19; app UI, shared UI and component stories | App and UI manifests |
| [Next.js](https://nextjs.org/docs) | Version 16; two app workspaces, App Router, server/client boundaries | App `next.config.ts`, `src/app`; read installed Next docs before coding |
| [Tailwind CSS](https://tailwindcss.com/docs) | Version 4; utility styling and shared CSS token contract | `packages/tailwind-config/shared-styles.css` |
| [PostCSS](https://postcss.org/) | Next.js Tailwind integration through `@tailwindcss/postcss` | App `postcss.config.mjs` |
| [Vite](https://vite.dev/guide/) | Storybook React build/test integration; VitePress uses its own dependency graph | Storybook and Web Docs manifests/config |
| [VitePress](https://vitepress.dev/) / [Vue](https://vuejs.org/guide/introduction.html) | VitePress 1.6.4 and Vue 3 render docs, not product UI | [Web Docs Client](../03-tools/03-web-docs-client.md) |

Technology conventions belong here; capability policy belongs to its canonical area. For example, Git mechanics are a technology concern, but branch/review conventions belong to Project.

## Configuration and operating guides

- [TypeScript](./03-technologies/01-typescript.md): configuration inheritance, aliases, builds and the Storybook exception.
- [Turborepo](./03-technologies/02-turborepo.md): graph, cache contracts and affected selection.
- [Node.js and pnpm](./03-technologies/03-node-and-pnpm.md): pinned toolchain, catalogs and installs.
- [Next.js](./03-technologies/04-nextjs.md): application boundaries and configuration.
- [React](./03-technologies/05-react.md): composition, providers and JSX transforms.
- [Tailwind CSS and PostCSS](./03-technologies/06-tailwind-and-postcss.md): stylesheet and build integration.
- [Vite and VitePress](./03-technologies/07-vite-and-vitepress.md): component and documentation pipelines.
- [Git and Lefthook](./03-technologies/08-git-and-lefthook.md): local hooks and validation.

Use the [complete command reference](./04-commands.md) for scripts and the [dependency inventory](./06-dependency-inventory.md) for declared consumers. These guides own Kartuli conventions; upstream links above cover APIs.
