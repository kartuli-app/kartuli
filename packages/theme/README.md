# @kartuli/theme

The single source of truth for design tokens in the Kartuli design system.

## Overview

This package exports `default-theme.css` which declares the **token contract** (token names) for the entire design system using Tailwind v4's `@theme` directive.

## Token Contract Rules

### 1. Token Names are Declared Once

The `@theme` block in `default-theme.css` is **top-level only** (no selectors or media queries). It declares token **names** and their default **values**.

```css
@theme {
  --color-primary-500: oklch(55% 0.22 250);
  --text-base: 1rem;
  --spacing-4: 1rem;
  /* ... */
}
```

### 2. Apps Override Values, Not Names

Applications import the theme contract and can override token **values** using CSS selectors:

```css
/* App's globals.css */
@import '@kartuli/theme/default-theme.css';

:root {
  /* Override value */
  --color-primary-500: oklch(60% 0.25 280);
}

[data-theme='dark'] {
  --color-primary-500: oklch(40% 0.2 280);
}
```

### 3. New Token Names (Rare)

If you need entirely **new token names** (which should be rare), declare them via `@theme` at the top level in your app or add them to this package.

## Token Namespaces

### Colors (OKLCH)
- `--color-neutral-*` - Neutral grays (50-950)
- `--color-primary-*` - Primary brand (50-950)
- `--color-secondary-*` - Secondary brand (50-950)
- `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*` - Semantic colors

### Typography
- `--text-{size}` - Font sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl)
- `--text-{size}-line-height` - Corresponding line heights

### Spacing
- `--spacing-*` - Spacing scale (0, px, 0.5, 1, 1.5, 2, 2.5, ..., 96)

### Border Radius
- `--radius-*` - Border radius (none, sm, DEFAULT, md, lg, xl, 2xl, 3xl, full)

### Shadows
- `--shadow-*` - Box shadows (sm, DEFAULT, md, lg, xl, 2xl, inner, none)

## Usage in Apps

```css
/* app/globals.css */
@import 'tailwindcss';
@import '@kartuli/theme/default-theme.css';

/* Override values for this app */
:root {
  --color-primary-500: oklch(60% 0.25 280);
}
```

## Usage in Tailwind

Tailwind v4 automatically picks up tokens from `@theme` and generates utilities:

```tsx
<button className="bg-primary-500 text-white px-4 py-2 rounded-lg">
  Click me
</button>
```

## Design Decisions

- **OKLCH colors**: Better perceptual uniformity and color manipulation
- **No custom breakpoints**: Use Tailwind's default responsive utilities
- **Dark mode deferred**: Tokens are neutral to enable later implementation
- **No variants API**: Components accept `className` and use `clsx` for composition

