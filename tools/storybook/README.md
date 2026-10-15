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

Storybook imports the layered shared token contract from the public `@kartuli/design-system` entry
through `.storybook/storybook.css`. That stylesheet explicitly scans Storybook-local source,
`packages/ui/src`, and Game Client source for Tailwind classes; the CSS token package itself is imported,
not scanned.

```ts
// .storybook/preview.ts
import './storybook.css';
```

The toolbar theme switcher exposes four review modes:

- **Game / Default** uses the Design System defaults with no overrides.
- **Backoffice** duplicates the production Backoffice brand and accent primitives; a browser test keeps
  the duplicate map exactly aligned with the app theme.
- **Stress: Emerald** and **Stress: Rose** replace only the brand ramp to expose assumptions in semantic
  and component mappings. Their 600 slots use the next darker ramp value so shared selected text remains
  readable during review.

The wrapper records existing inline values before applying a mode and restores or removes them during
cleanup. These controls are preview tooling, not application runtime theming.

Use `Design System/Workshop/Shared Shell` to review the real shared shell at the exact 390x844,
900x900, and 1600x1000 viewport presets. Tailwind discovery remains limited to Storybook-local source,
`packages/ui/src`, and Game Client source; Backoffice React and the Design System CSS package are not
scanned.

## Related
- [Project Overview](https://docs.kartuli.app/)
- [Code Conventions](https://docs.kartuli.app/conventions)
