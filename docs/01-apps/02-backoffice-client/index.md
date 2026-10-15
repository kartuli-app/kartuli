---
description: Backoffice shared-shell proof, routes, theming, operations, and deferred product boundaries.
status: implemented
intent: reference
---

# Backoffice Client

`apps/backoffice-client` is a Next.js 16 App Router application intended for collaborator content
management. Its implemented Home/About surface proves shared shell and theme reuse; it is not evidence
of a completed editor, backend or authorization system.

## Implemented surface and boundaries

`src/app/layout.tsx` delegates to `src/domains/app-shell/root-layout.tsx`; the nested `src/app/en`
layout composes the shared application shell around Home at `/en` and About at `/en/about`.
`next.config.ts` redirects `/` to `/en` temporarily and exposes `NEXT_PUBLIC_APP_VERSION` with the
package version as fallback. There are no route handlers, content repositories, persistence adapters,
authentication checks or authorization rules in this workspace.

The root layout fixes `lang="en"` and imports app CSS. Global CSS loads Tailwind, then the layered
`@kartuli/design-system` public entry, then app-specific `theme.css`. That theme overrides only the
primitive brand and accent ramps: semantic roles, spacing, radius and component geometry remain
shared. Normal Backoffice React UI uses semantic colors.

Backoffice composes `AppShell`, `AppBar`, `Dock` and `DockItem` from `@kartuli/ui`. It owns the two
navigation definitions, exact active-route selection, static application title, inline icons and the
small `next/link` adapter required by `DockItem`. Only the pathname-aware dock is a Client Component;
the route layout, page content and app-bar composition remain Server Components. The shared shell
provides the bottom dock below `md`, compact rail from `md`, and expanded rail from `xl`.

Introducing privileged content operations requires an explicit authentication/authorization design,
server-side enforcement and data/error flows. A client-only route guard would not be an adequate
authorization boundary. Those capabilities remain canonical under [Security](../../08-security/index.md).

## Local operation and port contract

Run from the repository root with Node/pnpm pins active:

```bash
pnpm run c:dev:backoffice-client
pnpm --filter @kartuli/backoffice-client run test
pnpm run c:build:backoffice-client
pnpm run c:preview:backoffice-client
```

Development, `start` and production-style preview all listen on `http://localhost:3001`. This is the
Backoffice local app identity; Game Client uses `http://localhost:3000`, so both apps can run
side-by-side. E2E selects the Backoffice suite and that URL together:

```bash
pnpm e2e backoffice-client
```

Local component tests cover Home/About content, shared shell composition, navigation destinations and
active states, plus Tailwind/theme integration. The production Playwright suite covers the redirect,
both direct routes, navigation, accessibility and console-error smoke boundaries; it does not prove
editor, data or access-control behavior that does not exist.

## Deployment and current gaps

The local port does not define the deployed address. The production workflow deploys to the configured
Vercel project and runs `pnpm e2e backoffice-client --url https://backoffice.kartuli.app --production`.
Its path filter watches this app plus the shared UI, Design System,
root build/dependency configuration and production E2E inputs documented in
[Deployment](../../07-platform/02-deployment.md). Account/project/domain settings require external
verification.

Use [Engineering](../../05-engineering/index.md) for workspace conventions,
[Design System](../../04-design-system/index.md) for shared styling, and
[Deployment](../../07-platform/02-deployment.md) for the workflow sequence. Finish any change with
`pnpm run validate:all` and the relevant build/browser check.
