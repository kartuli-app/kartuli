---
description: Shared workspace package responsibilities, public contracts, consumers and boundaries.
status: implemented
intent: reference
---

# Packages

Packages are imported by workspace code; they do not own app product policy.

| Package | Public contract and responsibility | Consumers / conventions |
| --- | --- | --- |
| `@kartuli/ui` | `packages/ui/package.json` exports source subpaths via `./*`; shared React components and `src/utils/cn.tsx` | Apps and Storybook; use `cn` for conditional class merging; do not assume a root barrel export |
| `@kartuli/tailwind-config` | Root export is `shared-styles.css`, containing CSS variables and Tailwind theme mappings | Apps and Storybook import `@kartuli/tailwind-config`; edit the committed stylesheet directly |

`@kartuli/ui` compiles with `tsc --project tsconfig.build.json` and has colocated Vitest tests. The Tailwind package is a stylesheet contract with a lint task. Shared packages should not import app-specific content or product state. New domain/content packages are planned possibilities, not existing workspaces.

The [Design System](../04-design-system/index.md) owns the visual contract; this section owns package exports and dependency boundaries. See [Engineering](../05-engineering/index.md) for the monorepo inventory.
