---
description: Query/collection lifetimes, owner-scoped loading, optimistic writes and persistence limitations.
status: implemented
intent: reference
---

# TanStack and IndexedDB

## Role and consumers

Game Client uses TanStack Query as the query client/cache, Query DB Collection as an adapter, TanStack DB for collections, React DB for reactive queries and `idb` for persistence. This stack reads browser data, not a remote service. The identifier/storage policy is canonical in [Data & Privacy](../../09-data-and-privacy/index.md).

## Read path

`RootQueryClientProvider` creates one QueryClient for its mounted lifetime. `useItemActivityStatesCollection` memoizes by client and owner. `createItemActivityStatesCollection` combines the common query-key prefix with `ownerId`, loads `getAllItemActivityStatesByOwnerId`, and identifies records by `row.id`. Keep owner scoping in the cache key; otherwise one owner's cached state could be reused for another.

The IndexedDB database is version 1 with an owner index. Open is memoized and returns null on failure. Reads then return empty data; consumers must not confuse unavailable persistence with a verified absence of earlier activity.

## Write path

`batchUpsertItemActivityDeviceViewEvents` deduplicates item IDs, preloads an unready collection, finds prior state in the collection or IndexedDB, and constructs updated counters/timestamps. It calls `collection.utils.writeUpsert` before attempting a single read/write IndexedDB transaction. Persistence errors are logged without undoing the in-memory state.

Consequently, a UI update does not guarantee durable persistence. The row ID combines owner, device and item; changing that convention requires a migration design, not just a new concatenation. `AddItemActivityEvent` implements view/fail/success counters, while this batch function specifically applies view events.

## Dependency compatibility

Review `@tanstack/db`, `@tanstack/react-db` and `@tanstack/query-db-collection` together.
Their package version numbers differ, but the adapters must use a compatible DB implementation.
Inspect `pnpm why -r @tanstack/db` after an upgrade. Errors involving incompatible `Collection`,
`RefBranch` or virtual-property types can indicate that an adapter still resolves an older DB
generation. Align the adapter and direct dependency before changing application types or adding casts.
Validate the Game Client and Storybook typechecks and builds.

## Common changes and checks

When adding a field, review the TypeScript record, default state, event reducer, persistence reads/writes, summary selectors and migration requirements together. A schema version change needs an IndexedDB upgrade path for existing stores; current upgrade code only creates the initial store/index.

For direct writes outside the collection, use the exported query-key contract to invalidate the relevant owner's query. Avoid introducing a second independent in-memory cache. Test duplicate events, missing IndexedDB, transaction failure, initialization and owner boundaries. Confirm durability by reloading in a real browser as well as observing the reactive UI.

Source directory: `apps/game-client/src/student/item-activity-device-states-collection`; summaries: `src/student/item-activity-summary`; provider: `src/root-layout/root-query-client-provider.tsx`. Cross-tab synchronization, server sync, conflict resolution and account recovery are not established by this implementation.
