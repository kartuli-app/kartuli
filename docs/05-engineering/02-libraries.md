---
description: Architectural libraries, smaller helpers and the rule for dedicated documentation.
status: implemented
intent: reference
---

# Library Catalog

Create a dedicated page when a dependency defines a system boundary, data lifecycle, public contract or recurring Kartuli-specific convention. A dependency used as a small implementation helper stays in this catalog or the capability page. Do not create empty pages for every package.

| Library | Current role / Kartuli constraint | Canonical context or source |
| --- | --- | --- |
| Base UI | Accessible interaction primitives composed into Game Client UI; does not replace app accessibility validation | `apps/game-client/src/ui`; [Accessibility](../06-quality/02-accessibility.md) |
| TanStack DB / Query DB Collection / React DB / React Query | Reactive activity-state collections, query-backed loading and root query provider; not a remote backend | `src/student/item-activity-device-states-collection`, `src/root-layout/root-query-client-provider.tsx` in Game Client |
| IndexedDB / `idb` | Browser activity-state persistence; database open failure returns a nonpersistent fallback | [Data & Privacy](../09-data-and-privacy/index.md) |
| i18next / react-i18next | App translation resources and React bindings; locale comes from app routing | Game Client `src/i18n`; [Game Client](../01-apps/01-game-client/index.md) |
| Serwist / `@serwist/turbopack` | Next config wrapper exists; complete offline behavior remains unverified | [Offline scope](../01-apps/01-game-client/index.md#offline-scope) |
| Zod | Runtime schemas in Game Client domain/ingestion code | Game Client `src/learning-content`, `src/student` |
| Motion | UI animation dependency and app usage; no complete shared motion specification yet | Game Client `src/ui`; [Design System](../04-design-system/index.md) |
| clsx / tailwind-merge | Wrapped by shared `cn`; prefer that helper | `packages/ui/src/utils/cn.tsx` |
| js-cookie | Settings writes locale preference | [Data & Privacy](../09-data-and-privacy/index.md) |
| react-icons | App icon components | Game Client `src/ui` |
| Vitest / V8 coverage | Colocated tests and aggregate coverage | [Testing](../06-quality/01-testing.md) |
| Testing Library / Happy DOM | DOM assertions, interactions and lightweight test environment | App/UI test configs and setup |
| Playwright / axe | Browser execution and accessibility scans | [E2E Runner](../03-tools/02-e2e-runner.md) |
| Storybook addon-vitest / addon-a11y | Story interactions and accessibility failures | [Storybook](../03-tools/01-storybook.md) |
| Biome / Lefthook / Lighthouse CI | Static checks, Git hooks and web quality audits | [Quality](../06-quality/index.md) |
| dependency-cruiser | Source dependency inspection; local Graphviz renders output | [Diagram Generator](../03-tools/04-diagram-generator.md) |
| vitepress-plugin-diagrams | Build-time docs diagram integration; existing Kroki failure assets need follow-up | [Web Docs Client](../03-tools/03-web-docs-client.md) |

Paths beginning `src/` in the table are relative to `apps/game-client`. Exact versions and direct consumers are in workspace manifests and `pnpm-workspace.yaml`; upstream API documentation should be consulted for implementation details.

## Integration guides

- [TanStack and IndexedDB](./05-libraries/01-tanstack-and-indexeddb.md)
- [i18next and locale cookies](./05-libraries/02-i18next.md)
- [Base UI](./05-libraries/03-base-ui.md)
- [Zod](./05-libraries/04-zod.md)
- [Serwist](./05-libraries/05-serwist.md)
- [Motion, icons and class helpers](./05-libraries/06-motion-and-ui-helpers.md)

Testing-library usage is documented with [Unit and integration testing](../06-quality/04-testing/01-unit-integration.md); browser/axe integrations with [Component testing](../06-quality/04-testing/02-component-browser.md) and [E2E](../06-quality/04-testing/03-e2e-smoke.md). The [declared dependency inventory](./06-dependency-inventory.md) covers smaller helpers, runtime peers and direct consumers without inventing architectural significance for each one.
