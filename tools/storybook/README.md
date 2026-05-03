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

Import Storybook styles in your preview file and optionally override the shared test tokens:

```ts
// .storybook/preview.ts
import './storybook.css'; // optional: overrides :root tokens
```

Create `storybook.css` with overrides for the minimal test-only color tokens:

```css
/* tools/storybook/storybook.css */
:root {
  --color-color-token-test-primary: oklch(22% 0 0);
  --color-color-token-test-neutral: oklch(99% 0 0);
}
```

## Related
- [Project Overview](https://docs.kartuli.app/)
- [Code Conventions](https://docs.kartuli.app/conventions)
