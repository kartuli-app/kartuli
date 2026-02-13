### Live docs

:open_book: [Documentation website](https://kartuli-app.github.io/kartuli/)

# Kartuli

Georgian language learning platform

## Quick Start

```bash
pnpm install
pnpm dev
```

## Documentation

```bash
pnpm docs:dev     # Start documentation dev server
pnpm docs:build   # Build documentation site
pnpm docs:preview # Preview built documentation
```

### Links
- [Project Overview](https://docs.kartuli.app/)
- [Contributing Guide](https://docs.kartuli.app/contributing)
- [API Reference](https://docs.kartuli.app/api)

## Stack

<!-- This content is shared with docs/stack-and-providers.md -->
<!-- To update the stack and providers tables, edit docs/stack-and-providers.md -->

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
| **Playwright** | 🟢 | Testing | e2e tests |
| **Lighthouse CI** | ⚫ | Quality | • Performance<br>• Accessibility monitoring<br>• Runs on GitHub Actions |
| **Fuse.js** | ⚫ | Search | • Client-side<br>• offline-first |
| | 🟡 | Internationalization | Options:<br>• intlayer<br>• next-intl<br>• i18next |
| **Markdown** | 🟢 | Content | • Documentation<br>• Info pages (terms, privacy) |
| **Storybook** | 🟢 | Documentation & Development | • Component development<br>• Documentation<br>• Theme preview |
| **VitePress** | 🟢 | Documentation Site | • Project documentation<br>• Hosted on GitHub Pages |

## Providers

1 entry per service, even if same provider

Status: 🟢 Active | ⚫ Planned

| Service | Provider | Status | Links | Notes |
| ------- | -------- | ------ | ----- | ----- |
| **Version Control** | GitHub | 🟢 | https://github.com/kartuli-app/ | |
| **CI/CD** | GitHub | 🟢 | https://github.com/kartuli-app/ | • Labels sync<br>• Labels propagation from Issue to PR |
| **Dependency Updates** | Mend.io | 🟢 | https://github.com/marketplace/renovate | • Automated dependency bot for PRs<br>• GitHub integration |
| **Projects** | GitHub | 🟢 | https://github.com/kartuli-app/ | • Issue tracking<br>• Project boards |
| **Hosting (Documentation)** | GitHub Pages | 🟢 | https://pages.github.com | VitePress documentation site |
| **AI Code Review** | Qodo | 🟢 | https://qodo.ai | GitHub integration |
| **Hosting** | Vercel | 🟢 | https://vercel.com | Next.js optimized |
| **Serverless Functions** | Vercel | ⚫ | https://vercel.com | API endpoints |
| **Database** | Supabase | ⚫ | https://supabase.com | • Used for Students Activity, CMS<br>• Frankfurt region (closest to Georgia, good speed for continental Europe) |
| **Authentication** | Supabase | ⚫ | https://supabase.com | • Google social login<br>• Facebook social login |
| **File Storage** | Supabase | ⚫ | https://supabase.com | • Assets<br>• Content packs |
| **CDN** | Cloudflare | ⚫ | https://cloudflare.com | Serves assets and content packs from Supabase |
| **Domain** | Cloudflare | 🟢 | https://cloudflare.com | |
| **Email Services** | Cloudflare | ⚫ | https://cloudflare.com | • Capture mails to any domain address |
| **Analytics** | PostHog | ⚫ | https://posthog.com | • User behavior<br>• Consent-based |
| **Error Tracking** | Sentry | ⚫ | https://sentry.io | |
| **Performance Monitoring** | New Relic | ⚫ | https://newrelic.com | |
| **Uptime Monitoring** | BetterStack | ⚫ | https://betterstack.com | • Heartbeats<br>• Status pages |
| **Visual Testing** | Chromatic | ⚫ | https://chromatic.com | • Visual regression<br>• UI review |
| **Forms & Surveys** | Tally | ⚫ | https://tally.so | • Anonymous surveys<br>• User feedback |

> 📖 **Full details**: See [Stack & Providers Documentation](docs/stack-and-providers.md)

## Packages
- [@kartuli/theme](./packages/theme/) - Design tokens
- [@kartuli/ui](./packages/ui/) - UI components

## Apps
- [Game Client](./apps/game-client/) - Learning game
- [Backoffice Client](./apps/backoffice-client/) - Content management

## Tools
- [Storybook](./tools/storybook/) - Component development
- [Web Docs Client](./tools/web-docs-client/) - Documentation site

