# Kartuli

Georgian language learning platform

## Quick Start

```bash
pnpm install
pnpm dev
```

## Documentation
- [Project Overview](https://docs.kartuli.app/)
- [Contributing Guide](https://docs.kartuli.app/contributing)
- [API Reference](https://docs.kartuli.app/api)

## Stack

Status: 🟢 Active | ⚫ Planned | 🟡 To be discussed

| Technology | Status | Layer | Notes |
| ---------- | ------ | ----- | ----- |
| **git** | 🟢 | Version Control | |
| **pnpm** | 🟢 | Package Manager | Workspace management |
| **turborepo** | 🟢 | Build System | Monorepo management |
| **TypeScript** | 🟢 | Language | |
| **Biome** | 🟢 | Code Quality | • Linting<br>• Formatting |
| **Tailwind** | 🟢 | Styling | v4 + token-driven design |
| **React** | 🟢 | UI Library | |
| **react-aria** | ⚫ | UI Components | • Accessibility<br>• WCAG compliance |
| **Next.js** | 🟢 | Framework | App router|
| **Turbopack** | 🟢 | Bundler | Next.js applications |
| **Vite** | 🟢 | Bundler | • Storybook<br>• VitePress |
| **rxdb** | ⚫ | Storage (Client) | Sync management |
| **IndexedDB** | ⚫ | Storage (Client) | Offline support|
| **Cache Storage** | ⚫ | Storage (Client) | PWA asset caching |
| **CDN** | ⚫ | Infrastructure | Cloudflare |
| **Postgres** | ⚫ | Database (Server) | Supabase |
| **PWA** | ⚫ | Platform | Installable app |
| **vitest** | 🟢 | Testing | • Integration tests<br>• Unit tests|
| **Playwright** | ⚫ | Testing | e2e tests |
| **Lighthouse CI** | ⚫ | Quality | • Performance<br>• Accessibility monitoring<br>• Runs on GitHub Actions |
| **Fuse.js** | ⚫ | Search | • Client-side<br>• offline-first |
| | 🟡 | Internationalization | Options:<br>• intlayer<br>• next-intl<br>• i18next |
| **Markdown** | 🟢 | Content | • Documentation<br>• Info pages (terms, privacy) |
| **Storybook** | 🟢 | Documentation & Development | • Component development<br>• Documentation<br>• Theme preview |
| **VitePress** | ⚫ | Documentation Site | • Project documentation<br>• Hosted on GitHub Pages |

## Packages
- [@kartuli/theme](./packages/theme/) - Design tokens
- [@kartuli/ui](./packages/ui/) - UI components

## Apps
- [Game Client](./apps/game-client/) - Learning game
- [Backoffice Client](./apps/backoffice-client/) - Content management

## Tools
- [Storybook](./tools/storybook/) - Component development

