---
section: Apps/Game Client
title: Offline PWA and Service Worker
description: Implementation details for the game client service worker (Serwist), dev vs prod, and deployment requirements.
type: standard
---

# Offline PWA and Service Worker (game client)

## Overview

The game client uses a **service worker** (Serwist) to support offline use after the first load. The product goals and phases are in [Offline Multilanguage Game POC](../product/offline-multilanguage-game-poc.md); this doc describes **how it is implemented** and what to keep in mind when changing the app or deployment.

## Implementation summary

| What | Where / how |
|------|--------------|
| SW source | `apps/game-client/src/app/sw.ts` |
| SW URL | `/serwist/sw.js` (Next.js route) |
| Route handler | `apps/game-client/src/app/serwist/[path]/route.ts` — builds SW with injected precache manifest, serves script in production only |
| Registration | `SerwistProvider` in `src/app/serwist-provider.tsx`; registers `swUrl="/serwist/sw.js"` |
| Precached by default | `/en`, `/~offline`, `/icon.svg`, `/favicon.ico` plus build-discovered assets (chunks, CSS); revision from git HEAD at build time |
| Custom fetch | Capture-phase listener: `/` → redirect to `/en`; same-origin GETs to `/en` and `/en/*` → serve precached `/en` shell (or `/~offline` on failure) |

## Dev vs production

- **Development:** The Serwist route returns **404** for `GET /serwist/sw.js`, and `SerwistProvider` has `disable={process.env.NODE_ENV === 'development'}`. So the SW is **not** registered in dev; no need to serve the built SW script locally.
- **Production (and staging/preview):** The route serves the compiled SW; the provider registers it. E2E against a Vercel preview runs in production mode, so the SW is active there.

## Versioning

- Precache entries use a **revision** (git `HEAD` in the Serwist route at build time). A new deploy produces a new `sw.js` and new manifest; on activate, Serwist cleans up old precache caches. Explicit app version (e.g. for "New version available" UI) is planned for a later phase; see the product doc.

## Deployment: Vercel allowlist

When **Vercel Deployment Protection** is enabled for the game client project, the **service worker script** must be loadable without the protection bypass header. The browser requests `/serwist/sw.js` when registering the SW; that request does **not** include custom headers (e.g. the E2E bypass header). If `/serwist/` is protected, the server returns **401**, the SW fails to load, and the page reports a script error — which causes the "no critical console errors" E2E test to fail.

**Required:** In the **game client** Vercel project, add **`/serwist/`** to the Deployment Protection **allowlist** (Vercel dashboard → Project → Security → Deployment Protection → Allowlist). See [Vercel Next.js Hosting](../../providers/vercel-nextjs-hosting.md#deployment-protection-allowlist-game-client) for the exact place.

## References

### Related docs

- [Offline Multilanguage Game POC](../product/offline-multilanguage-game-poc.md) — Product spec, offline contract, and phases
- [Vercel Next.js Hosting](../../providers/vercel-nextjs-hosting.md) — Hosting and allowlist for `/serwist/`
- [Game Client Hub](./index.md)
