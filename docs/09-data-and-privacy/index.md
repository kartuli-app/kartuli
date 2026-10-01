---
description: Current local activity persistence, identifiers, locale cookie, logging and privacy gaps.
status: implemented
intent: reference
---

# Data & Privacy

This page owns the current storage/identifier inventory and the boundary for future analytics and telemetry decisions. It is a source-based technical reference, not a complete privacy notice or compliance claim.

## Implemented local data

| Data | Storage and lifecycle | Evidence in Game Client |
| --- | --- | --- |
| Activity state | IndexedDB `item-activity-state-db`, version 1; store `item-activity-state`, keyed by `id`, indexed by `ownerId` | `src/student/item-activity-device-states-collection/item-activity-state-database.ts` |
| Device identifier | UUID generated with `crypto.randomUUID`, persisted as `kartuli.deviceId` in localStorage and cached in memory | `src/student/identifiers/device-id.ts` |
| Owner identifier | Independently generated UUID, persisted as `kartuli.ownerId` and cached in memory; not an account | `src/student/identifiers/owner-id.ts` |
| Locale preference | `preferred-locale` cookie, set at path `/` with no explicit expiry in the settings writer | `src/i18n/i18n-constants.ts`, `src/ui/experiences/settings/components/settings-client.tsx` |

Activity records include owner/device/item IDs, view/success/fail counts and timestamps. TanStack collections/query integrations provide reactive access above IndexedDB. No server sync of this state is implemented in the inspected path. Database open failures return `null` and reads return empty results; do not promise durable storage when browser persistence is unavailable.

No TTL/automatic deletion policy appears in these storage helpers. Browser storage clearing can remove identifiers/progress; there is no verified account recovery or cross-device identity. Treat these IDs as persistent identifiers even though they are local and unauthenticated. Full offline support is [not yet established](../01-apps/01-game-client/index.md#offline-scope).

## Logging and external data boundaries

`logger.log` is development-only and can print identifiers. `logger.error` is active outside development and prints its message/cause. This is console logging, not evidence of a telemetry backend. [Platform](../07-platform/index.md) owns collection operations; this section owns permissible payloads and retention policy.

CI artifacts can contain screenshots, videos and traces. Lighthouse uses temporary public report storage. Provider-side access logs, retention and account data cannot be inferred from client code and require manual verification. Do not equate absence of an analytics SDK with a claim that hosting providers collect no data.

## Planned / evaluating

A data-classification policy, user-facing retention/deletion behavior, analytics strategy, event taxonomy, identity linkage, consent and telemetry payload rules remain planned. PostHog is evaluating; no analytics event contract is adopted. Decide those policies before adding SDKs and document provider settings in [Services](../10-services/index.md).
