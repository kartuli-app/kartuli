---
description: Catalog, lockfile and Renovate policy for routine and vulnerability updates.
status: implemented
intent: reference
---

# Dependency Management

Declare shared dependency ranges in `pnpm-workspace.yaml` and reference catalogs from consumers. Keep `pnpm-lock.yaml` consistent and install with the frozen lockfile in CI. Runtime/package-manager upgrades must update their explicit pins deliberately.

[Renovate](../10-services/05-renovate.md) implements automated dependency PRs. Its current `enabledManagers` are `npm` and `custom.jsonata`; GitHub Actions updates are not enabled by this repository config. The custom manager tracks Biome schema versions in Biome JSON files.

`renovate.json` requests routine updates before 3am Monday, groups dependency updates, disables automerge, retains TypeScript below 7 for existing pre-7 consumers and Vitest below 5, and disables engine/pnpm updates. Vulnerability alerts request immediate PR creation and the lowest fixing version; a security update rule requests any-time scheduling. Actual alert availability, schedule timezone and bot installation settings require provider verification.

Review dependency changes with the normal [Quality](../06-quality/index.md) gates. Supply-chain and vulnerability policy belongs to [Security](../08-security/index.md); a bot rule alone does not establish a remediation SLA.
