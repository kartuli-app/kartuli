---
description: App Router boundaries, source layout, build configuration and local operating commands.
status: implemented
intent: reference
---

# Next.js

## Role and consumers

Game Client and Backoffice are Next.js 16 applications. Game Client's App Router entrypoints are under `src/app/[locale]`; Backoffice currently has an `/en` scaffold. App-specific routes and intended behavior belong to [Apps](../../01-apps/index.md), not a shared framework tutorial.

## Server and client boundaries

Route components compose the app's feature UI. Game Client learning content is built from bundled JSON through ingestion/library modules and supplied through server-side code. Browser identifiers, IndexedDB and reactive state belong on the client side. The root query provider uses a lazy React state initializer so its QueryClient survives re-renders.

Keep browser APIs out of server execution; use client boundaries where state/effects/browser access require them. A TypeScript alias does not make a server module safe to import into browser code. Inspect imported modules when moving logic across that boundary.

## Configuration

App `next.config.ts` sets the Turbopack root to the monorepo. Game Client exposes `NEXT_PUBLIC_APP_VERSION`, falling back to its package version, disables the experimental development filesystem cache and wraps config with `withSerwist`. That wrapper does not establish complete offline operation; see [Serwist](../05-libraries/05-serwist.md).

Game Client `src/proxy.ts` handles locale redirects with a literal matcher that excludes supported locales, Next internals and known public assets. When adding a root asset or locale, review the matcher and its tests. Shared TypeScript config provides bundler resolution; app configs add the Next plugin and generated types.

## Development and verification

```bash
pnpm run c:dev:game-client
pnpm run c:build:game-client
pnpm run c:preview:game-client
```

Game Client uses port 3000; Backoffice equivalents use 3001. Preview builds then starts the production server. Building is distinct from lint/typecheck/unit tests; Next font downloads can introduce a network prerequisite.

Before changing Next.js implementation, `AGENTS.md` requires reading the installed docs under `apps/game-client/node_modules/next/dist/docs`. For framework upgrades, inspect those docs, catalog/lockfile, Serwist compatibility, type generation, routing tests and production build output. Check both apps and Storybook's imports of app components. Deployment provider specifics belong to [Vercel](../../10-services/02-vercel.md).
