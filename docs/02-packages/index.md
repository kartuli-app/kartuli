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

## UI package boundary

The wildcard export maps requests such as `@kartuli/ui/utils/cn` directly to `src/utils/cn`; there is no
root barrel export and no committed `dist` contract. The package's `build:components` command runs
`tsc --project tsconfig.build.json`, but the config inherits root `noEmit: true`. It currently validates
the build surface rather than producing distributable JavaScript. Next.js and Storybook compile the
imported source themselves.

Only move code here when it has a stable cross-surface contract. Game Client route, content,
translation or navigation dependencies belong in the app. Keep exports named and add tests beside
shared behavior. Storybook can import app-local components for inspection; that does not make those
components package API.

## Tailwind package boundary

The Tailwind package exports exactly `shared-styles.css` and includes that file in its publishable file
list. It has no generation/build step: primitives, semantic roles, component dimensions and `@theme`
mappings are hand-maintained together. Both apps load it after `tailwindcss`; Storybook loads it from
its own CSS entry through the Tailwind Vite plugin.

When changing a token, follow the [Design Tokens](../04-design-system/01-tokens.md) workflow and verify
all three integrations. The package lint task checks source style but cannot prove a utility is emitted
or visually correct.

Shared packages should not import app-specific content or product state. New domain/content packages
are planned possibilities, not existing workspaces.

## Validation

```bash
pnpm --filter @kartuli/ui run typecheck
pnpm --filter @kartuli/ui run test
pnpm --filter @kartuli/ui run build
pnpm --filter @kartuli/tailwind-config run lint
pnpm run validate:all
```

For UI or token changes, also run Storybook browser tests and the consuming app build. A successful UI
`build` is static validation under the current no-emit configuration, not proof of an independently
installable artifact.

The [Design System](../04-design-system/index.md) owns the visual contract; this section owns package exports and dependency boundaries. See [Engineering](../05-engineering/index.md) for the monorepo inventory.
