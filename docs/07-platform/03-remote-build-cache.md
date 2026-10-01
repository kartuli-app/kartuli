---
description: Turborepo cache configuration and its separation from hosting.
status: implemented
intent: reference
---

# Remote Build Cache

`turbo.json` enables remote caching and defines task inputs/outputs. CI supplies `TURBO_TOKEN` from GitHub secrets and `TURBO_TEAM` from GitHub variables. `ci-setup-node` separately caches the local `.turbo` directory through Actions cache keyed by the lockfile.

Remote caching is a build capability distinct from Vercel app hosting, even when the same provider supports both. [Vercel](../10-services/02-vercel.md) records provider mapping. Team/account ownership, token scope, cache access/retention and whether authenticated remote hits currently occur require manual verification; enabled configuration alone is not evidence of successful use.

Never commit credentials or cache secret-bearing outputs. When changing tasks, keep inputs and outputs accurate so cached results cannot hide stale docs or builds. Root `turbo:cache:wipe` removes local `.turbo`; it is not a remote-cache deletion command.
