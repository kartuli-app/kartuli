---
description: Catalog, lockfile and Renovate policy for routine and vulnerability updates.
status: implemented
intent: reference
---

# Dependency Management

Declare shared dependency ranges in `pnpm-workspace.yaml` and reference catalogs from consumers. Keep `pnpm-lock.yaml` consistent and install with the frozen lockfile in CI. Runtime/package-manager upgrades must update their explicit pins deliberately.

[Renovate](../10-services/05-renovate.md) implements automated dependency PRs. Its current `enabledManagers` are `npm` and `custom.jsonata`; GitHub Actions updates are not enabled by this repository config. The custom manager tracks Biome schema versions in Biome JSON files.

`renovate.json` requests routine updates before 3am Monday, groups dependency updates, disables automerge, retains TypeScript below 7 for existing pre-7 consumers and pins Vitest packages below 5, and disables engine/pnpm updates. Vulnerability alerts request immediate PR creation and the lowest fixing version; a security update rule requests any-time scheduling. Actual alert availability, schedule timezone and bot installation settings require provider verification.

Review dependency changes with the normal [Quality](../06-quality/index.md) gates. Supply-chain and vulnerability policy belongs to [Security](../08-security/index.md); a bot rule alone does not establish a remediation SLA.

## Manual dependency change workflow

1. Identify direct consumers from workspace manifests using the [dependency audit procedure](../05-engineering/06-dependency-inventory.md).
2. Change the shared catalog range when consumers use `catalog:`; retain named catalogs such as
   `catalog:storybook` when their compatibility boundary still applies.
   Keep the Vitest runner/browser/Playwright/coverage pins on the same exact release; review TanStack DB adapters with their underlying DB dependency.
3. Run pnpm to update the lockfile intentionally, then inspect manifest, catalog and lockfile diffs for
   unrelated resolution movement.
4. Read migration/release notes for architectural dependencies and update their canonical guide when
   behavior or configuration changes.
5. Run affected builds/tests first and `pnpm run validate:all` last. Browser/framework changes often
   require Storybook or Playwright beyond unit tests.

```bash
pnpm install
git diff -- pnpm-workspace.yaml pnpm-lock.yaml '**/package.json'
pnpm run validate:all
```

CI uses `pnpm install --frozen-lockfile`; never “fix” a frozen-install failure by disabling the flag.
For a Renovate PR, compare the bot's effective update with repository policy. The current managers do
not update GitHub Actions, Node or pnpm, so those pins require deliberate manual work.
