---
description: Current Game Client routes and architecture contrasted with planned product specifications.
status: implemented
intent: architecture
---

# Game Client

The Game Client is the learner-facing Next.js app (`apps/game-client`, development port 3000).

## Implemented foundation

The route files under `apps/game-client/src/app/[locale]` currently expose:

| Route | Current surface |
| --- | --- |
| `/{locale}` | Home |
| `/{locale}/explore/alphabet` | Alphabet exploration |
| `/{locale}/study/lesson/{lessonId}` | Lesson study |
| `/{locale}/study/module/{moduleId}` | Module study |
| `/{locale}/translit` | Transliteration |
| `/{locale}/settings` | Locale settings |

There is also localized not-found handling. No Play, vocabulary, or `/explore` entry route file is present. The [product route specification](./01-product/04-routes-and-internationalization.md) describes the target experience, not the current route inventory. Route existence alone does not certify feature completeness.

## Architecture

`src/learning-content/ingestion` loads bundled JSON; `src/learning-content/library/build-library.tsx` builds indexed content and `get-library-server.tsx` supplies it to server components. This content path does not fetch a backend API at runtime. `src/root-layout` integrates styles, fonts, query providers and database initialization. `src/navigation` contains Next.js and SPA navigation integrations.

`src/proxy.ts` redirects bare/unsupported-locale paths using a supported preferred-locale cookie, the first Accept-Language entry, then English. Supported locales are `en` and `ru`; the current root redirect is `/{locale}`, not the planned `/{locale}/explore`. `src/i18n` owns the app's translation resources and locale resolution.

See [Data & Privacy](../../09-data-and-privacy/index.md) for persistence and identifiers, [Libraries](../../05-engineering/02-libraries.md) for the reactive data stack, and [Design System](../../04-design-system/index.md) for shared styling.

## Offline scope

`next.config.ts` wraps Next.js with `withSerwist`. The repository does not currently contain a complete service-worker implementation/registration flow. Local persistence and bundled content do not prove cold-start offline availability. Treat full offline operation as planned until service-worker behavior and offline acceptance checks are verified.

## Product specification

The [Product overview](./01-product/01-product-overview.md), roadmap and screen catalog retain the intended learning experience. Their planned status does not mean every described element is absent; this page owns the current implementation inventory.
