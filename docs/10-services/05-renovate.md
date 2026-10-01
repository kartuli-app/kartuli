---
description: Renovate repository policy and provider-side verification boundaries.
status: implemented
intent: reference
---

# Renovate

`renovate.json` extends `config:recommended` and `:dependencyDashboard`. [Dependency Management](../07-platform/04-dependency-management.md) owns the policy and catalog workflow.

Provider-facing configuration includes `type:chore` / `scope:global` labels, semantic chore commits, disabled automerge and a vulnerability alert group labeled `security`. Enabled managers are `npm` and `custom.jsonata`; the custom manager reads Biome JSON `$schema` versions. `.nvmrc` is ignored and engines/pnpm updates are disabled.

## Manual verification required

Confirm the installed app/account, repository enablement, inherited/global configuration, dashboard location, effective timezone, vulnerability alert availability and permission to create/update PRs. The committed policy requests behavior; it does not prove the service is running or that every requested label exists.
