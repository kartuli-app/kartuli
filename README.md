# Kartuli - Georgian language learning platform

A free, offline-first **Georgian language learning platform** designed for international residents, newcomers, and travelers in Georgia.

## How to help?

Are you a dev? Check out the [contributing document](CONTRIBUTING.md)

Not a developer? Even better, we need all kinds of help, send us an email to collaborators@kartuli.app

## About the project
- [project overview](./docs/project-overview.md)

## Roadmap

### Shipped

- ^^

### Currently working on

#### Game prototype

- [game prototype](docs/specs/game-prototype.md)

### Planned (tentative order by priority)

#### Game
- Alphabet semi-hardcoded content and games
- Terms & Privacy info page (minimum version for analytics)
- Analytics and consent banner
- Offline support
- Student Activity
- Grammar semi-hardcoded content and games
- Real content packs
- Landing info page
- Social auth google
- Multilingual support
- Dictionary
- Favorites
- Profile
- Social auth facebook
- Mascot

#### CMS

#### Newsletter

#### Bot

## Product
- [glossary](./docs/glossary.md)

## Tech

### Diagrams

Generated with draw.io

### Conventions
- [code-conventions](./docs/code-conventions.md)
- [github-workflow](./docs/github-workflow.md)
- [ai-assisted-workflow](./docs/ai-assisted-workflow.md)

### Architecture
- [Architecture Decision Records](./docs/adr/)
  - [ADR 001: Styling Platform](./docs/adr/001-styling-platform.md)

### Packages
- [@kartuli/theme](./packages/theme/README.md) - Design token contract
- [@kartuli/ui](./packages/ui/README.md) - Shared component library

### Data model
- [data content model](./docs/data-content-model.md)

### Stack

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

### Providers

1 entry per service, even if same provider

Status: 🟢 Active | ⚫ Planned

| Service | Provider | Status | Links | Notes |
| ------- | -------- | ------ | ----- | ----- |
| **Version Control** | GitHub | 🟢 | https://github.com/rocescoca/ | |
| **CI/CD** | GitHub | 🟢 | https://github.com/rocescoca/ | • Labels sync<br>• Labels propagation from Issue to PR |
| **Dependency Updates** | Mend.io | ⚫ | https://github.com/marketplace/renovate | • Automated dependency bot for PRs<br>• GitHub integration |
| **Projects** | GitHub | 🟢 | https://github.com/rocescoca/ | • Issue tracking<br>• Project boards |
| **Hosting** | GitHub | ⚫ | https://pages.github.com | VitePress documentation site |
| **AI Code Review** | Qodo | 🟢 | https://qodo.ai | GitHub integration |
| **Hosting** | Vercel | ⚫ | https://vercel.com | Next.js optimized |
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

