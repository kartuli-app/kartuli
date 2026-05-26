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

Storybook imports the shared token contract from `@kartuli/tailwind-config` through `.storybook/storybook.css`.

```ts
// .storybook/preview.ts
import './storybook.css';
```

The toolbar theme switcher can still override live shared tokens for preview purposes. It now works by swapping the primitive brand ramp instead of relying on placeholder `primary` tokens.

## Related
- [Project Overview](https://docs.kartuli.app/)
- [Code Conventions](https://docs.kartuli.app/conventions)
