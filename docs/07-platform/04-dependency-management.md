---
description: Catalog, lockfile and Renovate policy for routine and vulnerability updates.
status: implemented
intent: reference
---

# Dependency Management

Declare shared dependency ranges in `pnpm-workspace.yaml` and reference catalogs from consumers. Keep `pnpm-lock.yaml` consistent and install with the frozen lockfile in CI. Runtime/package-manager upgrades must update their explicit pins deliberately.

[Renovate](../10-services/05-renovate.md) implements automated dependency PRs. The `npm` manager owns npm-compatible manifests, pnpm workspaces and the shared catalog; `custom.jsonata` tracks Biome schema versions in both Biome JSON files; `custom.regex` owns the exact Vercel CLI input in the three app-deployment workflows; and `github-actions` tracks external Actions, reusable workflows and explicit GitHub-hosted runner labels.

Routine npm/catalog, Biome schema, Vercel CLI and external Action updates share one `all dependencies` maintenance flow. Renovate may create it from Saturday 22:00 through Sunday 05:59 in the explicit `Asia/Tbilisi` timezone. This group includes Action major, minor, patch and immutable-SHA pin/digest maintenance. Automerge remains disabled, so strong CI and human review remain the upgrade safety mechanism.

GitHub-hosted runner migrations are detected in the same weekend window but use a separate runner-update PR. An OS-line change requires the deliberate compatibility review described in [GitHub](../10-services/01-github.md#hosted-runner-image-policy); it is not ordinary package maintenance. Vulnerability-alert PRs remain separate and immediate, use the lowest fixing version and bypass the routine schedule. Ordinary npm releases must be at least three days old, while vulnerability alerts explicitly have no minimum release age.

External Actions and reusable workflows remain executable only by full immutable commit SHA with a readable version comment. Renovate follows that comment when updating the SHA and can propose a digest pin if a future contribution uses a normal version tag. It must not normalize existing pins back to floating refs. See [Action dependency pinning](../10-services/01-github.md#action-dependency-pinning).

Node and pnpm baselines remain manual toolchain decisions: `.nvmrc` is ignored, engine updates are disabled, and the `pnpm` package-manager dependency is disabled. Broad Action `with:` version automation remains disabled so runtime/tool inputs do not create a second update path around those repository-owned declarations. The exact Vercel CLI input is the deliberate exception: a narrow regex manager owns only its three workflow fields and resolves them through the npm datasource. GitHub Actions container/service dependency types are not part of this policy.

Review dependency changes with the normal [Quality](../06-quality/index.md) gates. Supply-chain and vulnerability policy belongs to [Security](../08-security/index.md); a bot rule alone does not establish a remediation SLA.

## Manual dependency change workflow

1. Identify direct consumers from workspace manifests using the [dependency audit procedure](../05-engineering/06-dependency-inventory.md).
2. Change the shared catalog range when consumers use `catalog:`.
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
For a Renovate PR, compare the bot's effective update with repository policy. Renovate maintains
external Action SHAs, explicit runner labels and the narrowly owned Vercel CLI input; Node, pnpm and
all other Action input versions remain deliberate manual work.
