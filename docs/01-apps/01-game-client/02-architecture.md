---
description: Implemented Game Client route, content, localization, persistence and failure-handling flows.
status: implemented
intent: architecture
---

# Game Client Architecture

This page describes the implemented learner application in `apps/game-client`. Product intent and
screen behavior remain in the [product specification](./01-product/01-product-overview.md); this page
owns the current runtime and data-flow boundaries.

## Runtime composition

The App Router entrypoints live under `src/app/[locale]`. Route files resolve parameters and metadata,
then delegate composition to `src/ui/experiences`. `src/root-layout/root-layout.tsx` supplies fonts,
shared CSS, the React Query client, browser-database initialization and i18n. The route group folders
organize source without adding URL segments.

Server components load bundled learning content and pass serializable data into client experiences.
Client components own navigation state, gestures, browser identifiers, IndexedDB access and locale
changes. Keep browser APIs behind existing client boundaries; moving identifier or database calls into
server initialization throws or makes server rendering depend on unavailable globals.

There are no route handlers or runtime backend requests in the implemented learning-content path.
Adding remote content or sync would introduce a new trust, error and cache boundary and must update
Security, Data & Privacy and this page.

## Learning-content flow

```text
bundled default/extended JSON
        -> repository adapters
        -> Zod parse and source annotation
        -> common/localized source merge
        -> locale-specific library indexes
        -> server route or page composition
        -> learner UI
```

The data sources are under `src/learning-content/ingestion/data-sources`. Common files hold stable
module, lesson and item structure. Localized files supply locale-specific titles, translations and
notes. Repository adapters select English or Russian localized JSON and label every record with its
`default` or `extended` source.

`getLibraryServer(locale)` loads common and localized sets concurrently. `buildLibrary` joins them by
ID and builds arrays plus lookup maps for items, lessons and modules. Word transliteration is derived
from the common letter map. Module and lesson routes select their record from those maps; an unknown
ID calls Next.js `notFound()`.

### Content validation and partial data

Zod validates each bundled source when its repository is read. A schema mismatch throws and prevents
that route from building or rendering; there is no route-level `error.tsx` recovery boundary in the
current app. By contrast, a valid common record with no localized partner is logged and omitted. A
lesson with no surviving items and a module with no surviving lessons are also omitted. Duplicate
letter script/transliteration keys log an error and the later entry wins in the lookup map.

When changing content:

1. Update the common and every supported localized source that refers to the same IDs.
2. Change the common/localized Zod schemas and mapped domain interfaces together when the shape
   changes.
3. Run the ingestion and library tests, then build the Game Client so route generation exercises the
   real bundle.

```bash
pnpm --filter @kartuli/game-client exec vitest run \
  src/learning-content/ingestion/common-data/parse-and-map-common-data.test.ts \
  src/learning-content/ingestion/localized-data/parse-and-map-localized-data.test.ts \
  src/learning-content/library/build-library.test.ts
pnpm run c:build:game-client
pnpm run validate:all
```

Expected focused-test output lists three passing files. A build failure from Zod/content assembly is a
content-contract failure; a font/network failure should be diagnosed separately.

## Local activity-state flow

`RootDatabaseInitializer` runs in the browser after mount. It creates or recovers `deviceId` and
`ownerId`, opens the version 1 `item-activity-state-db`, and logs a storage estimate only in
development. The IDs are independent UUIDs in localStorage and are not authenticated identities.

The IndexedDB store `item-activity-state` uses a composite string ID of
`ownerId-deviceId-itemId` and has an `ownerId` index. TanStack Query supplies the stable root
`QueryClient`; the Query DB collection loads records for the current owner; React DB live queries
aggregate device rows into per-item counts and first/last timestamps.

View-event writes deduplicate item IDs, preload the collection, derive the next state, update the
in-memory collection and then attempt one IndexedDB transaction. If IndexedDB is unavailable or fails
to open, reads return an empty list and the collection can continue for the page session without
durable storage. A transaction failure is logged after the in-memory write; there is no retry queue,
server sync or user-facing persistence warning.

Treat changes to the record shape as a database migration. Increment `DATABASE_VERSION`, implement an
upgrade path that preserves existing data, and test both a fresh database and the previous version.
Deleting/recreating the store would erase learner progress and is not a safe default migration.

The authoritative storage inventory and privacy gaps are in
[Data & Privacy](../../09-data-and-privacy/index.md). The library-specific collection mechanics are in
[TanStack and IndexedDB](../../05-engineering/05-libraries/01-tanstack-and-indexeddb.md).

## Localization and navigation

Supported route locales are `en` and `ru`. The request proxy redirects bare or unsupported-locale
paths using the `preferred-locale` cookie, then the first `Accept-Language` entry, then English.
Settings changes i18next first, writes the session cookie at `/`, and navigates to the equivalent
localized path; a failed language change leaves the current route in place and re-enables the control.

The Next navigation adapter backs the running app. A separate SPA adapter exists so isolated component
contexts can use the same navigation contract. Hooks throw when used outside the appropriate provider,
making provider placement an explicit integration requirement.

## Failure and recovery inventory

| Failure | Implemented behavior | Operational implication |
| --- | --- | --- |
| Unknown lesson/module or catch-all route | Next localized not-found surface | Expected recovery path; verify both locales |
| Invalid bundled JSON | Zod throws during content assembly | Build/render failure; correct the source or schema |
| Missing localized relation | Record is logged and omitted | UI may lose content without a hard failure; inspect development logs and tests |
| IndexedDB unavailable/open failure | Empty persisted state and nonpersistent collection behavior | Learning can continue, but progress durability is not promised |
| IndexedDB transaction failure | In-memory state remains; error is logged | Reload can lose the latest event; no retry is implemented |
| Locale change rejection | Switching state resets; current page remains | No user-facing error message is implemented |

`logger.log` is development-only and layer controlled; `logger.error` remains active in production.
Console output is diagnostic, not centralized observability. There are no explicit App Router error or
loading boundaries in the current route tree, and no account recovery or remote-state conflict model.

## Verification by change type

| Change | Focused evidence before the full gate |
| --- | --- |
| Route or locale | Relevant `src/i18n/*.test.ts` plus `tools/e2e/tests/game-client/pages` |
| Bundled content/schema | Ingestion and `build-library.test.ts`, then Game Client build |
| Activity persistence | Collection/database unit coverage where added, plus a real-browser reload check |
| Shared shell/component | Colocated tests/stories, Storybook browser suite and route-level check |
| Service worker/offline | Production build and explicit online-to-offline acceptance scenario; config wrapping alone is insufficient |

Always finish with `pnpm run validate:all`. Use [Testing](../../06-quality/01-testing/index.md) to choose the
additional layer and [Next.js](../../05-engineering/03-technologies/04-nextjs.md) for framework-specific
configuration constraints.
