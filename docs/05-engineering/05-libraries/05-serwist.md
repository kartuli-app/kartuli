---
description: Existing Next.js wrapper, unimplemented offline boundaries and verification requirements.
status: implemented
intent: reference
---

# Serwist

## Current integration

Game Client declares `serwist` and `@serwist/turbopack` and exports `withSerwist(nextConfig)` from `next.config.ts`. Generated worker patterns are ignored in Git. This establishes configuration/dependency presence; the inspected source does not contain a complete worker implementation and registration flow.

## What is not established

IndexedDB persistence and bundled learning content do not make HTML, JavaScript, fonts or navigation available on a cold offline launch. Do not describe the full app as offline-ready based solely on the wrapper. Worker cache strategy, registration/update behavior, storage eviction, rollback and an offline acceptance suite remain to be implemented or verified.

## Future change checklist

Before introducing a worker, define which routes/assets/data must work offline, which requests must never be cached, how updates become active and how users recover from stale caches. Coordinate persistent-data semantics with [Data & Privacy](../../09-data-and-privacy/index.md), and document actual Next integration against its installed documentation.

Verification must distinguish an already loaded page, a reload after first online visit and a fresh offline visit. Include an upgrade from an older cache/worker, not only a clean browser profile. Keep these requirements explicitly planned until implementation and evidence exist. Do not change unrelated offline infrastructure merely to make a documentation claim true.
