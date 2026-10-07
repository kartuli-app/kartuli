---
description: Current CI, environments, hosting, build cache, notifications and operational gaps.
status: implemented
intent: reference
---

# Platform

Platform docs own operational capabilities independent of providers. [Services](../10-services/index.md) records how providers implement them.

| Capability | Current repository evidence | Canonical detail |
| --- | --- | --- |
| CI / orchestration | Affected-workspace staging workflows and all-monorepo validation | [CI](./01-ci.md) |
| Environments / deployment / hosting | Local builds, Vercel previews and production apps, GitHub Pages docs | [Deployment](./02-deployment.md) |
| Build orchestration / remote cache | Turbo task graph, remote caching enabled, CI credentials | [Remote Build Cache](./03-remote-build-cache.md) |
| Dependency management | Renovate npm/custom managers and catalog/lockfile | [Dependency Management](./04-dependency-management.md) |
| Notifications | PR, CI failure, preview and production Telegram routing | [Telegram](../10-services/06-telegram.md) |
| Observability | App console logger and CI artifacts; no adopted central observability SDK found | See below |

## Observability and recovery

Game Client `src/logging/dev-logger.ts` emits layer-controlled informational logs only in development, but `logger.error` remains active in production. There is no verified centralized error/log/metric/tracing pipeline in source. [Data & Privacy](../09-data-and-privacy/index.md) owns permissible data/identifiers; [Services](../10-services/index.md) tracks provider evaluation.

A formal release/versioning policy, incident response ownership, backup/recovery procedures and monitoring retention remain planned. Current production workflow triggers are documented as implemented, not as a completed release-management system. Do not invent service guarantees, alert coverage or rollback procedures from provider defaults.
