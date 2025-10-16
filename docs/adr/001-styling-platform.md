# ADR 001: Styling Platform with Tailwind v4 and Token-Driven Design

**Status**: Accepted  
**Date**: 2025-10-13  
**Issue**: [#5](https://github.com/rocescoca/kartuli/issues/5)

## Context

We need a cohesive styling platform for the Kartuli monorepo that supports:
- Multiple apps (game-client, backoffice-client) with different visual identities
- Shared UI components that adapt to each app's theme
- Component development and documentation with Storybook
- Accessibility checks and visual consistency

## Decision

We will implement a **token-driven styling platform** with the following architecture:

### 1. Design Token Contract

**Package**: `@kartuli/theme`

- Single source of truth: `default-theme.css`
- Declares token **names** using Tailwind v4's top-level `@theme` directive
- Token namespaces: colors (OKLCH), typography, spacing, radii, shadows
- No custom breakpoints (use Tailwind defaults)

**Rule**: `@theme` must be **top-level only** (no selectors/media nesting)

### 2. App-Level Overrides

Apps import the theme contract and override token **values** using CSS selectors:

```css
/* apps/game-client/src/app/globals.css */
@import 'tailwindcss';
@import '@kartuli/theme/default-theme.css';

:root {
  --color-primary-500: oklch(60% 0.25 280); /* Game brand color */
}
```

### 3. UI Component Library

**Package**: `@kartuli/ui`

- **Theme-aware, not theme-owning**: Components use tokens, ship no CSS
- **Accept `className` prop** for customization
- **Use `clsx` only** for class composition (no tailwind-merge)
- **No variants API** in this milestone (simple props + conditionals)
- **Stories co-located** with components (`*.stories.tsx` next to `*.tsx`)

### 4. Storybook Runner

**Location**: `tools/storybook`

- Vite-based Storybook runner
- Loads stories from `packages/ui/src/**/*.stories.tsx`
- **Minimal UI package dependencies**: Only type packages (`@storybook/react`, `@storybook/test`)
- **All runtime dependencies** live in `tools/storybook`

**Addons**:
- Essentials (docs, controls, actions, etc.)
- Interactions (component interaction testing)
- Accessibility (a11y - manual checks in UI)

**Theme Toggle**: Toolbar decorator to switch between `default`, `game`, `backoffice` themes using React wrapper components that apply CSS variable overrides via inline styles.

### 5. Version Pinning

All Storybook and new tool versions are pinned in **PNPM catalog** for consistency across workspace.

### 6. Tailwind v4 Configuration

**Apps use PostCSS plugin**:
- `postcss.config.mjs` with `@tailwindcss/postcss`
- `@source` directive in `globals.css` to scan UI package

```css
/* apps/*/src/app/globals.css */
@import "tailwindcss";
@import "@kartuli/theme/default-theme.css";

@source "../../packages/ui/src";
@source "../";
```

**Storybook uses Vite plugin**:
- `@tailwindcss/vite` plugin in `.storybook/main.ts`
- Same `@source` directive pattern in `storybook.css`

### 7. Biome Only

Continue using **Biome** for linting and formatting. No ESLint or Prettier introduced.

## Consequences

### Positive

✅ **Single source of truth**: All apps share the same token contract  
✅ **Flexible theming**: Apps easily override values without duplicating token names  
✅ **Clean separation**: UI package stays lean (no runtime Storybook deps)  
✅ **Co-located stories**: Stories live with components, easier to maintain  
✅ **Accessibility built-in**: a11y addon for manual checks during development  
✅ **Version consistency**: PNPM catalog prevents version drift

### Negative

⚠️ **No tailwind-merge yet**: Class conflicts must be avoided manually  
⚠️ **No variants API**: More verbose component code (deferred to later)  
⚠️ **Manual a11y only**: Automated a11y testing via Storybook test runner deferred to E2E ticket

### Deferred

📅 **Dark mode**: Token structure supports it, implementation deferred  
📅 **Custom breakpoints**: Use Tailwind defaults for now  
📅 **Automated a11y tests**: Storybook test runner + Playwright (separate E2E ticket)  
📅 **Visual regression**: Chromatic integration (later)  
📅 **UI package publishing**: Internal workspace package for now

## Files and Structure

```
packages/
  theme/
    src/
      default-theme.css    # Token contract (@theme)
    package.json
    README.md

  ui/
    src/
      components/
        Button.tsx         # Component
        Button.stories.tsx # Story (co-located)
    package.json
    README.md
    tsconfig.json

tools/
  storybook/
    .storybook/
      main.ts              # Storybook config (@tailwindcss/vite)
      preview.tsx          # Theme toggle decorator
      theme-wrappers.tsx   # Theme wrapper components
      storybook.css        # Tailwind + theme imports + @source
    package.json           # All runtime deps here
    tsconfig.json

apps/
  game-client/
    src/app/
      globals.css          # Tailwind + theme + @source + overrides
      layout.tsx           # Import globals.css
    postcss.config.mjs     # @tailwindcss/postcss
    package.json

  backoffice-client/
    # Same structure as game-client
```

## References

- [Issue #5](https://github.com/rocescoca/kartuli/issues/5)
- [Tailwind v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Storybook Documentation](https://storybook.js.org/docs)
- [@kartuli/theme README](../../packages/theme/README.md)
- [@kartuli/ui README](../../packages/ui/README.md)

