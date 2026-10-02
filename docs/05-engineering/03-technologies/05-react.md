---
description: React composition, provider lifetime, client state and component verification in Kartuli.
status: implemented
intent: reference
---

# React

## Role and consumers

React 19 renders both Next apps, shared UI and Storybook stories. Shared packages export source subpaths; Game Client owns product-specific components under `src/ui`. Reuse a shared component when the behavior is shared, not merely because two screenshots look alike.

## Provider and state conventions

`RootQueryClientProvider` constructs one QueryClient with `useState(() => new QueryClient())`. The collection hook memoizes a collection by `queryClient` and `ownerId`. Recreating those objects on every render would change subscriptions and cached state. Preserve lifetimes when refactoring providers.

Keep effects responsible for external synchronization and cleanup. For example, Storybook theme wrappers save document-root CSS variable overrides and restore them on unmount, avoiding leakage between stories. Browser-only identifiers throw when used without a window; do not move them into server-rendered initialization.

## Styling and composition

Use named exports and explicit props, with `cn` from `@kartuli/ui/utils/cn` for conditional classes. Apps retain their shell/layout/feature composition. Next routes supply data and compose UI; Storybook must be able to provide the context a component actually needs.

## JSX and verification

Next app tsconfigs preserve JSX for Next's transform; UI/Storybook use automatic JSX. Storybook additionally forces Vite's Oxc automatic transform for app stories because their nearest tsconfig otherwise preserves JSX. A story parse error can therefore come from transformation rather than invalid component markup.

Use Testing Library tests for component behavior independent of browser layout and stories/browser tests for real CSS, focus and interactions. Source evidence: `src/root-layout/root-query-client-provider.tsx`, collection hooks, shared `cn`, Storybook `.storybook/main.ts` and theme wrappers. See [component testing](../../06-quality/04-testing/02-component-browser.md) before introducing context mocks that hide the behavior under test.
