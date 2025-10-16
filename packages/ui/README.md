# @kartuli/ui

Shared UI component library for Kartuli applications.

## Overview

This package contains reusable React components used across all Kartuli applications (game client, backoffice, etc.).

## Key Principles

### 1. Theme-Aware, Not Theme-Owning

Components are **theme-aware** (they use design tokens) but don't own any CSS:

- ✅ Use Tailwind utilities that reference design tokens
- ✅ Accept `className` prop for customization
- ❌ No CSS files shipped with components
- ❌ No default styles or themes

### 2. Class Composition with `clsx`

Use `clsx` for conditional class composition. **No `tailwind-merge`** in this milestone:

```tsx
import { clsx } from 'clsx';

export function Button({ variant, className, ...props }) {
  return (
    <button
      className={clsx(
        'base-classes',
        variant === 'primary' && 'primary-classes',
        className // User's className comes last
      )}
      {...props}
    />
  );
}
```

### 3. No Variants API (Yet)

Components accept props to control appearance, but we're not using a variants library in this milestone. Use simple conditionals and `clsx`.

### 4. Co-located Stories

Storybook stories live **next to components**:

```
src/
  components/
    Button.tsx
    Button.stories.tsx  ← Story lives here
```

The Storybook **runner** lives separately in `tools/storybook` and loads these stories.

### 5. Minimal Storybook Dependencies

Only minimal Storybook type packages are dev dependencies here:

```json
{
  "devDependencies": {
    "@storybook/react": "catalog:",
    "@storybook/test": "catalog:"
  }
}
```

The runner dependencies live in `tools/storybook`.

## Testing Strategy

- **Primary coverage**: App integration tests and E2E
- **Unit tests**: Added only when a component has meaningful behavior/ARIA complexity
- Tests are **co-located** with components (no separate test folder)

## Usage

Import components directly from their source paths:

```tsx
import { Button } from '@kartuli/ui/components/Button';

export function MyApp() {
  return (
    <Button className="custom-class">
      Click me
    </Button>
  );
}
```

The package uses wildcard exports (`./*": "./src/*"`), so you can import any component without modifying `package.json`.

## Adding New Components

1. Create component in `src/components/ComponentName.tsx`
2. Create story in `src/components/ComponentName.stories.tsx`
3. Use Tailwind utilities that reference tokens from `@kartuli/theme`
4. Accept `className` prop for customization

**That's it!** No need to modify `package.json`, `tsconfig.json`, or Vite configs thanks to wildcard exports and path mappings.

