# Storybook

Component development and documentation tool for Kartuli UI components.

## Quick Start

```bash
pnpm dev    # Start Storybook server
pnpm build  # Build static site
pnpm test   # Run tests
```

## Documentation
- [Full documentation](https://docs.kartuli.app/tools/storybook)
- [Component Stories](https://docs.kartuli.app/tools/storybook/stories)

## Development
```bash
pnpm dev    # Start development
pnpm build  # Build for production
pnpm test   # Run tests
```

## Theming in Storybook

Import UI styles in your Storybook preview file and optionally override semantic tokens:

```ts
// .storybook/preview.ts
import '@kartuli/ui/styles.css';
import './storybook.css'; // optional: overrides :root tokens
```

Create `storybook.css` with overrides for the minimal semantic tokens:

```css
/* tools/storybook/storybook.css */
:root {
  --color-ink: oklch(22% 0 0);
  --color-canvas: oklch(99% 0 0);
}
```

## Related
- [Project Overview](https://docs.kartuli.app/)
- [Code Conventions](https://docs.kartuli.app/conventions)
