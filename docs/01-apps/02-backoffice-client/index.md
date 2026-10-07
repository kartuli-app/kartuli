---
description: Backoffice scaffold, intended content-management role, and shared capability references.
status: implemented
intent: reference
---

# Backoffice Client

`apps/backoffice-client` is a Next.js 16 App Router application intended for collaborator content
management. The implemented surface is a scaffold, not evidence of a completed editor, backend or
authorization system.

## Implemented surface and boundaries

`src/app/layout.tsx` delegates to `src/domains/app-shell/root-layout.tsx`; `src/app/en/page.tsx`
renders the static Backoffice home. `next.config.ts` redirects `/` to `/en` temporarily and exposes
`NEXT_PUBLIC_APP_VERSION` with the package version as fallback. There are no route handlers, content
repositories, persistence adapters, authentication checks or authorization rules in this workspace.

The root layout fixes `lang="en"` and imports app CSS. Global CSS loads Tailwind, then
`@kartuli/tailwind-config`, then an empty app-specific `theme.css` override file. The app declares
`@kartuli/ui`, but the current scaffold does not import a shared React component. Treat the package
declarations as available boundaries, not proof of active UI reuse.

Introducing privileged content operations requires an explicit authentication/authorization design,
server-side enforcement and data/error flows. A client-only route guard would not be an adequate
authorization boundary. Those capabilities remain canonical under [Security](../../08-security/index.md).

## Local operation and port caveat

Run from the repository root with Node/pnpm pins active:

```bash
pnpm run c:dev:backoffice-client
pnpm --filter @kartuli/backoffice-client run test
pnpm run c:build:backoffice-client
pnpm run c:preview:backoffice-client
```

Development listens on port 3001. The workspace `start` and `preview` scripts listen on port 3000.
The root `c:e2e:backoffice-client` convenience script currently targets port 3001, so it does **not**
match the production preview command. Until those scripts are aligned, either test the dev server with
that convenience command or run Playwright explicitly against preview:

```bash
BASE_URL=http://localhost:3000 pnpm --filter @kartuli/e2e exec playwright test \
  tests/backoffice-client
```

The only local component tests currently cover the static home and Tailwind integration. The production
Playwright suite is a smoke check; it does not prove editor, data or access-control behavior that does
not exist.

## Deployment and current gaps

The production workflow deploys to the configured Vercel project and checks
`https://backoffice.kartuli.app`. Its path filter watches this app plus the shared UI, Tailwind,
root build/dependency configuration and production E2E inputs documented in
[Deployment](../../07-platform/02-deployment.md). Account/project/domain settings require external
verification.

Use [Engineering](../../05-engineering/index.md) for workspace conventions,
[Design System](../../04-design-system/index.md) for shared styling, and
[Deployment](../../07-platform/02-deployment.md) for the workflow sequence. Finish any change with
`pnpm run validate:all` and the relevant build/browser check.
