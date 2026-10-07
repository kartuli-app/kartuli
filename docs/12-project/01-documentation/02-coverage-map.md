---
description: Auditable mapping from workspaces, dependencies, configs, workflows and implementation patterns to canonical docs.
status: implemented
intent: reference
---

# Documentation Coverage Map

This is the working coverage checklist for the documentation foundation. It answers whether an actual
repository concern has a canonical owner and whether that owner is an operating guide, a catalog entry
or an explicitly recorded gap. It does not claim every page is complete.

Update this map when adding a workspace, architectural dependency, cross-cutting configuration or CI
workflow. The [dependency inventory](../../05-engineering/06-dependency-inventory.md) and
[command reference](../../05-engineering/04-commands.md) explain how to inspect manifests and scripts at their source; this page maps their roles to useful explanations.

## Workspaces and maintained surfaces

| Repository surface | Canonical owner | Coverage check |
| --- | --- | --- |
| `apps/game-client` | [Game Client](../../01-apps/01-game-client/index.md) and [architecture](../../01-apps/01-game-client/02-architecture.md) | Routes, bundled content, i18n, local state, errors, offline boundary and operations |
| `apps/backoffice-client` | [Backoffice Client](../../01-apps/02-backoffice-client/index.md) | Scaffold, ports, tests, shared styles, missing auth/data boundaries |
| `packages/ui` | [Packages](../../02-packages/index.md) and [Design System](../../04-design-system/index.md) | Source-subpath export, consumers, `cn`, token story and current no-emit build |
| `packages/tailwind-config` | [Packages](../../02-packages/index.md) and [Design Tokens](../../04-design-system/01-tokens.md) | CSS export, token layers, Tailwind mappings and change workflow |
| `tools/storybook` | [Storybook](../../03-tools/01-storybook.md) | Story discovery, Vite aliases, docgen exception, themes, browser/a11y tests |
| `tools/e2e` | [E2E Runner](../../03-tools/02-e2e-runner.md) | Target selection, server prerequisite, artifacts, a11y helper and production scope |
| `tools/web-docs-client` and `docs` | [Web Docs Client](../../03-tools/03-web-docs-client.md) | Generation/build/preview, navigation, LLM index, diagrams and verification |
| `tools/diagram-generator` | [Diagram Generator](../../03-tools/04-diagram-generator.md) | Dependency-cruiser configs, Graphviz prerequisite and generated outputs |
| Root orchestration/config | [Engineering](../../05-engineering/index.md), [CI](../../07-platform/01-ci.md) and [Project workflow](../02-workflow.md) | Pinned tools, task graph, hooks, affected mapping and contribution gates |

## Configuration ownership

| Evidence | Canonical documentation | What a reviewer should find there |
| --- | --- | --- |
| `.nvmrc`, `packageManager`, `pnpm-workspace.yaml`, lockfile | [Node.js and pnpm](../../05-engineering/03-technologies/03-node-and-pnpm.md) | Pins, catalogs, workspace protocol, frozen install and upgrades |
| Root/workspace `tsconfig*.json` | [TypeScript](../../05-engineering/03-technologies/01-typescript.md) | Inheritance, aliases, includes/excludes, transforms and Storybook TS 6 |
| `turbo.json`, `scripts/orchestrator` | [Turborepo](../../05-engineering/03-technologies/02-turborepo.md) and [CI](../../07-platform/01-ci.md) | Task dependencies, cache inputs/outputs and workflow mapping |
| `biome.json`, `biome.root.json` | [Biome](../../05-engineering/03-technologies/09-biome.md) | Root/workspace ownership, lint/fix commands and exclusions |
| App Next/PostCSS config | [Next.js](../../05-engineering/03-technologies/04-nextjs.md) and [Tailwind/PostCSS](../../05-engineering/03-technologies/06-tailwind-and-postcss.md) | App Router/Turbopack boundaries and CSS integration |
| Vitest/Playwright/Storybook configs | [Testing](../../06-quality/01-testing/index.md) and its layer guides | What each runner proves, prerequisites and CI execution |
| `lighthouserc.json` | [Web Quality and Lighthouse](../../06-quality/04-web-quality.md) | Mobile profile, thresholds, environment severity and public reports |
| `renovate.json` | [Dependency Management](../../07-platform/04-dependency-management.md) and [Renovate](../../10-services/05-renovate.md) | Repository policy versus provider state |
| `.github/workflows`, `.github/actions` | [CI](../../07-platform/01-ci.md), [Deployment](../../07-platform/02-deployment.md) and Services | Event flow, permissions, credentials by name, validation and notifications |
| VitePress config/scripts | [Web Docs Client](../../03-tools/03-web-docs-client.md) | Base path, content scan, navigation, LLM copies and Kroki limitation |

## Dependency coverage rule

Use the [dependency audit](../../05-engineering/06-dependency-inventory.md) to enumerate current declarations.
Dependencies with recurring Kartuli conventions have a dedicated guide or capability page:

- TypeScript, Turbo, Node/pnpm, Next.js, React, Tailwind/PostCSS, Vite/VitePress, Git/Lefthook and
  Biome have technology guides.
- TanStack/IndexedDB, i18n, Base UI, Zod, Serwist and Motion/icon/class helpers have library guides.
- Vitest, Testing Library, Happy DOM, Playwright, axe, Storybook addons, V8 coverage and Lighthouse
  are owned by Quality/Tools.
- dependency-cruiser, VitePress/diagram dependencies and provider integrations are owned by their
  Tool or Service pages.

Small helpers, type packages and renderer/runtime peers can share the Toolchain Support guide unless they acquire a
separate project-specific lifecycle or boundary. A declaration is not proof of runtime use; guides name actual
consumers and call out declared-but-unverified roles.

## Workflow and service coverage

| Capability | Repository evidence | Canonical owner | Known gap that remains visible |
| --- | --- | --- | --- |
| PR validation | Staging orchestrator, affected mapper, validation actions | [CI](../../07-platform/01-ci.md), [GitHub](../../10-services/01-github.md) | Main ruleset verified on 2026-10-06; changes require a fresh settings read |
| App preview/production | Reusable staging and two production workflows | [Deployment](../../07-platform/02-deployment.md), [Vercel](../../10-services/02-vercel.md) | Production path filters omit the actual Tailwind package; rollback is undocumented |
| Docs production | Pages build/deploy/post-deploy E2E | [Deployment](../../07-platform/02-deployment.md), [GitHub](../../10-services/01-github.md) | Pages environment/settings require verification |
| Remote cache | Turbo config, Actions cache, `TURBO_*` names | [Remote Build Cache](../../07-platform/03-remote-build-cache.md) | Hit/auth/retention state is external |
| Dependency updates | Catalog/lockfile, Renovate policy and dashboard #28 | [Dependency Management](../../07-platform/04-dependency-management.md), [Renovate](../../10-services/05-renovate.md) | Discovery/PRs verified; inherited settings/timezone remain external |
| Notifications | Telegram composite action and caller workflows | [Telegram](../../10-services/06-telegram.md) | Destination/permissions/delivery are external |
| Static/review services | SonarQube Cloud gate report, CodeRabbit review/status and GitHub ruleset | Service pages and [Code Review](../../06-quality/03-code-review.md) | Gate enforcement verified; provider settings and review freshness require separate evidence |

## Implementation-pattern coverage

| Pattern | Canonical owner | Review trigger |
| --- | --- | --- |
| Bundled learning-content ingestion and joins | [Game Client architecture](../../01-apps/01-game-client/02-architecture.md) | Schema, source, locale, lesson/module relationship changes |
| Browser identifiers, activity storage and logs | [Data & Privacy](../../09-data-and-privacy/index.md) | New field, retention, sync, telemetry or recovery behavior |
| Locale routing and preference cookie | [i18next](../../05-engineering/05-libraries/02-i18next.md) and Game Client | Supported locale, proxy matcher, cookie or navigation changes |
| Token layers and shared/app component boundary | [Design System](../../04-design-system/index.md) | Token, theme, font, responsive or shared-component changes |
| Test selection and evidence | [Testing](../../06-quality/01-testing/index.md) | New runner, environment, exclusion, artifact or CI execution path |
| Agent/document context hierarchy | [AI Development](../../11-ai-development/index.md) | Bootstrap, canonical owner or generated-index changes |

## Open coverage gaps

These are known incomplete capabilities, not undocumented implemented systems:

- Backoffice authentication, authorization, editor data flow and recovery are not implemented.
- Full offline cold-start/update behavior is not demonstrated by the current Serwist wrapper.
- Analytics policy, telemetry taxonomy, consent, retention and centralized observability are planned.
- Release rollback/promotion, incident response, backup and recovery runbooks are not established.
- Provider-console settings, ownership and secret rotation need authorized manual verification.
- Production path-filter cleanup, Kroki rendering/privacy decisions and a local Backoffice preview/E2E
  port alignment require implementation work outside this documentation-only continuation.

## Audit procedure

1. Compare `pnpm-workspace.yaml` and every workspace manifest with the workspace and dependency tables.
2. Inspect root/workspace scripts and check that their operational caveats have a canonical guide.
3. Review root/scoped configs and `.github/workflows` for a canonical capability owner.
4. Search source for new persistence, cookies, network calls, environment variables and provider SDKs.
5. Add depth where a contributor cannot safely perform and verify a common change.
6. Generate/check the LLM index, build/preview the site, inspect navigation and run full validation.

Record external facts as manual verification, and preserve gaps rather than filling them with provider
defaults or intended behavior.
