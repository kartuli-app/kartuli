---
section: Apps/Game Client
title: Offline PWA and Service Worker
description: Implementation details for the game client service worker (Serwist), dev vs prod, and deployment requirements.
type: standard
---

# Offline PWA and Service Worker (game client)

## Overview

The game client uses a **service worker** (Serwist) to support offline use after the first load. The product goals and phases are in [Offline Multilanguage Game POC](../../product/offline-multilanguage-game-poc.md); this doc describes **how it is implemented** and what to keep in mind when changing the app or deployment.

## Implementation summary

| What | Where / how |
|------|--------------|
| SW source | `apps/game-client/src/service-worker/service-worker.ts` |
| SW URL | `/serwist/sw.js` (Next.js route) |
| Route handler | `apps/game-client/src/app/serwist/[path]/route.ts` — builds SW with injected precache manifest, serves script in production only |
| Registration | `ServiceWorkerProvider` (wraps `SerwistProvider`) in `src/service-worker/service-worker-provider.tsx`; registers `swUrl="/serwist/sw.js"`, disabled in development |
| Precached by default | `/`, each `/{locale}` from `supportedLngs`, `/~offline`, `/icon.svg`, `/favicon.ico` plus build-discovered fonts in `.next/static/media`; stable URLs use a revision (package version + short git SHA), fonts use `revision: null` (hashed URLs) |
| Custom fetch | Capture-phase listener for **same-origin document navigations**: `/` → precached `/`; `/~offline` → precached emergency page; **all other paths** → precached **default locale** shell (`/{defaultLng}`). The browser URL is unchanged; the SPA normalizes locale and routes client-side. On failure → `/~offline` (or 503). |

## Online / offline behavior matrix (shell contract)

| Case | Online | Offline + controlling SW |
|------|--------|---------------------------|
| `/` | Next shell; client redirects to preferred `/{locale}` | Precached `/`; same client redirect |
| `/{locale}` (supported) valid route | Renders view | Default-locale precached HTML; client uses real URL → correct view |
| `/{locale}` invalid tail (router 404) | SPA `PageNotFound` (UI only; HTTP 200 from catch-all) | Same shell; client shows `PageNotFound` |
| Unlocalized path (e.g. `/foo`) | Client `replaceState` → `/{preferredLocale}/foo`, then route or 404 | SW serves default-locale shell; client normalizes then routes |
| `/~offline` | Next minimal offline route | Precached `/~offline` (emergency; not translated SPA) |
| Shell / network hard failure | n/a | Serwist document fallback to `/~offline` or 503 |

**Notes:** SPA “not found” is not an HTTP 404 today (catch-all still returns 200). Translated offline messaging belongs in the **shell** (i18n), not the `/~offline` document. `/~offline` is for emergencies when the shell cannot be served.

## Dev vs production

- **Development:** The Serwist route returns **404** for `GET /serwist/sw.js`, and `SerwistProvider` has `disable={process.env.NODE_ENV === 'development'}`. So the SW is **not** registered in dev; no need to serve the built SW script locally.
- **Production (and staging/preview):** The route serves the compiled SW; the provider registers it. E2E against a Vercel preview runs in production mode, so the SW is active there.

## Versioning and banner UX

- **Precache revision:** Stable URLs (`/en`, `/~offline`, icons) use a revision (package version + short git SHA from `get-aditional-precache-entries.ts`). A new deploy produces a new `sw.js` and new manifest; on activate, Serwist refreshes precache. Fonts use `revision: null` (URLs are hashed by the build).
- **App version:** `NEXT_PUBLIC_APP_VERSION` is set in Next.js config (from `package.json` or CI) and shown on the debug page.
- **Banner (PWANotifications):** Shows three states: (1) **Dev** — a SW is registered (with Unregister button). (2) **Ready for offline** — one-time message after first SW activation; dismiss stores a flag in `localStorage` so we don’t show it again on new versions. (3) **New version available** — when a waiting worker exists; “Go to next version” sends `SKIP_WAITING` and reloads. Typed messages are in `service-worker-messages.ts`.

## Deployment: Vercel Deployment Protection

When **Vercel Deployment Protection** is enabled for the game client project, the **service worker script** must be loadable. The browser requests `/serwist/sw.js` when registering the SW; that request does **not** send the E2E bypass header. So the script fetch gets **401** and the SW fails to load (and the "no critical console errors" E2E test fails).

**Path allowlist does not help:** Vercel’s only path-based bypass is the **OPTIONS Allowlist**, which applies to **OPTIONS** requests only, not **GET**. The SW is fetched with GET, so adding `/serwist/` there has no effect.

**What to do:** Either **disable** Deployment Protection for that app’s previews (see [When we disable preview protection (collaboration)](../../providers/vercel-nextjs-hosting.md#when-we-disable-preview-protection-collaboration)), or use **Deployment Protection Exceptions** to add the preview domain(s) where the SW must load. See [Vercel Next.js Hosting — Deployment Protection and the game client service worker](../../providers/vercel-nextjs-hosting.md#deployment-protection-and-the-game-client-service-worker) for the full options.

## References

### Related docs

- [Offline Multilanguage Game POC](../../product/offline-multilanguage-game-poc.md) — Product spec, offline contract, and phases
- [Vercel Next.js Hosting](../../providers/vercel-nextjs-hosting.md) — Hosting and Deployment Protection (game client SW)
- [Game Client Hub](./index.md)
