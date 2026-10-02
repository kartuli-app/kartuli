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

## Reviewing and changing updates

Use the dependency dashboard/PR output to inspect what the service actually detected. Compare the effective update with the catalog, direct consumer and lockfile. Shared catalog changes can affect multiple packages even if the PR title names one dependency.

When changing policy, review manager scope, grouping, schedule and package-rule overlap together. Enabling a new ecosystem such as GitHub Actions is a separate policy change; the existing npm/custom managers will not cover it automatically. Preserve the Storybook TypeScript exception until docgen compatibility is demonstrated.

Investigate an absent update by checking installed-app enablement and inherited configuration, then repository manager/pattern/rule matching. Do not repeatedly change schedules to diagnose a missing installation. Run the relevant builds/tests on dependency PRs and inspect security-update behavior rather than assuming immediate PR creation guarantees remediation.
