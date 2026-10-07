---
description: Turborepo cache configuration and its separation from hosting.
status: implemented
intent: reference
---

# Remote Build Cache

`turbo.json` enables remote caching and defines task inputs/outputs. CI supplies `TURBO_TOKEN` from GitHub secrets and `TURBO_TEAM` from GitHub variables. `ci-setup-node` separately caches the local `.turbo` directory through Actions cache keyed by the lockfile.

Remote caching is a build capability distinct from Vercel app hosting, even when the same provider supports both. [Vercel](../10-services/02-vercel.md) records provider mapping. Team/account ownership, token scope, cache access/retention and whether authenticated remote hits currently occur require manual verification; enabled configuration alone is not evidence of successful use.

Never commit credentials or cache secret-bearing outputs. When changing tasks, keep inputs and outputs accurate so cached results cannot hide stale docs or builds. Root `turbo:cache:wipe` removes local `.turbo`; it is not a remote-cache deletion command.

## Investigating a cache miss or stale result

Use the exact task and filter from the failing workflow:

```bash
pnpm turbo run build --filter=@kartuli/web-docs-client --dry=json
pnpm turbo run build --filter=@kartuli/web-docs-client
pnpm turbo run build --filter=@kartuli/web-docs-client --force
```

In the dry run, confirm the workspace is in the graph, the expected dependency tasks exist, and changed
files fall under the task inputs. Compare the first real run with the second to see whether reuse occurs.
`--force` recomputes locally/remotely eligible work for that run; it does not prove the cache definition
is correct.

For missing restored artifacts, check `outputs`. Web Docs, for example, restores dist but deliberately
excludes the generated source index from its input and output contract. Regenerate local intermediate
copies when needed. For unexpected misses, check global/task environment inputs, lockfile changes and
whether CI has valid `TURBO_TOKEN`/`TURBO_TEAM`; never print their values.

Actions also caches `.turbo` by OS and lockfile hash. That local archive is separate from authenticated
Turbo remote-cache behavior. A log showing an Actions cache restore does not prove a remote hit, and a
successful task with remote caching enabled does not prove the credentials were accepted.
