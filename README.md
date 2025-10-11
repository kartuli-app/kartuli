# Kartuli - Georgian language learning platform

A free, offline-first **georgian language learning platform** designed for international residents, newcomers, and travelers in Georgia.

## How to help?

Are you a dev? Check out the [contributing document](CONTRIBUTING.md)

Not a developer? Even better, we need all kinds of help, send us an email to collaborators@kartuli.app

## About the project

### Mission
To make Georgian language learning accessible and free for everyone, breaking down language barriers for international residents, newcomers, and travelers in Georgia

### Vision
To become the go-to platform for Georgian language learning, ensuring that language is never a barrier to connecting with Georgian culture and community

### Core principles
- **Free forever**: All learning content remains free forever
- **No barriers**: No need to create an account, No need to have internet, no premium accounts, no paywalls, no content restrictions
- **Cost optimization**: Optimize every infrastructure decision to support the maximum number of students while delaying monetization needs as long as possible
- **Operational monetization only**: Revenue only covers operational costs (servers, databases, authentication, email services), **never for profit**

### Target market
Non-Georgian speakers

### Value proposition
**Free**, comprehensive Georgian language learning **without any content restrictions or premium barriers**, designed specifically for people living in or visiting Georgia; includes **offline support** for learning anywhere, anytime; no need to create an account or install anything to **try the learning experience in just a few clicks**

### Revenue model
- **Purpose**: Only to cover operational costs (servers, databases, authentication, email services), **never profit**
- **Possible sources of income**: Affiliate partnerships with learning resources (books, courses), learning platforms (online classes) or physical language schools; these activate only after free-tier limits are consistently exceeded (e.g., Supabase 50k MAU)
- **We will never go with**: Premium accounts, ads, paywalls, content restrictions, or marketing-focused monetization

### Competitive advantage
- **Major language learning apps don't support Georgian well**
- Existing Georgian language learning apps are revenue driven, prioritizing profit vs student learning experience (freemium models, subscriptions, ads...)
- Multi-language support for native languages not typically supported

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
- Multilanguage support
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

### Data model
- [data content model](./docs/data-content-model.md)

### Stack

Status: 🟢 Active | ⚫ Planned | 🟡 To be discussed

| Technology | Status | Layer | Notes |
| ---------- | ------ | ----- | ----- |
| **git** | 🟢 | Version Control | |
| **pnpm** | ⚫ | Package Manager | Workspace management |
| **turborepo** | ⚫ | Build System | Monorepo management |
| **TypeScript** | ⚫ | Language | |
| **Eslint** | ⚫ | Linting | |
| **Prettier** | ⚫ | Formatting | |
| **Tailwind** | ⚫ | Styling | |
| **React** | ⚫ | UI Library | |
| **react-aria** | ⚫ | UI Components | Accessibility, WCAG compliance |
| **Nextjs** | ⚫ | Framework | App router|
| **Turbopack** | ⚫ | Bundler | Next.js applications |
| **Vite** | ⚫ | Bundler | Storybook, VitePress |
| **rxdb** | ⚫ | Storage (Client) | Sync management |
| **IndexedDB** | ⚫ | Storage (Client) | Offline support|
| **Cache Storage** | ⚫ | Storage (Client) | PWA asset caching |
| **cdn** | ⚫ | Infrastructure | Cloudflare |
| **Postgres** | ⚫ | Database (Server) | Supabase |
| **PWA** | ⚫ | Platform | Installable app |
| **vitest** | ⚫ | Testing | Integration tests, unit tests|
| **playwright** | ⚫ | Testing | e2e tests |
| **Lighthouse CI** | ⚫ | Quality | Performance, accessibility monitoring, runs on GitHub Actions |
| **Fuse.js** | ⚫ | Search | Client-side, offline-first |
| | 🟡 | Internationalization | Options: intlayer, next-intl, i18next |
| **Markdown** | 🟢 | Content | Documentation, info pages (terms, privacy) |
| **Storybook** | ⚫ | Documentation & Development | Component development, documentation |
| **VitePress** | ⚫ | Documentation Site | Project documentation, hosted on GitHub Pages |

### Providers

1 entry per service, even if same provider

Status: 🟢 Active | ⚫ Planned

| Provider | Status | Service | Links | Notes |
| -------- | ------ | ------- | ----- | ----- |
| **GitHub** | 🟢 | Version Control | https://github.com/rocescoca/ | |
| **GitHub** | 🟢 | CI/CD | https://github.com/rocescoca/ | labels sync, labels propagation from Issue to PR |
| **GitHub** | 🟢 | Projects | https://github.com/rocescoca/ | Issue tracking, project boards |
| **GitHub** | ⚫ | Hosting | https://pages.github.com | VitePress documentation site |
| **Qodo** | ⚫ | AI Code Review | https://qodo.ai | GitHub integration |
| **Vercel** | ⚫ | Hosting | https://vercel.com | Next.js optimized |
| **Vercel** | ⚫ | Serverless Functions | https://vercel.com | API endpoints |
| **Supabase** | ⚫ | Database | https://supabase.com | Used for Students Activity, CMS; Frankfurt region (closest to Georgia, good speed for continental Europe) |
| **Supabase** | ⚫ | Authentication | https://supabase.com | Google, Facebook social login |
| **Supabase** | ⚫ | File Storage | https://supabase.com | Assets, content packs |
| **Cloudflare** | ⚫ | CDN | https://cloudflare.com | Serves assets and content packs from Supabase |
| **Cloudflare** | 🟢 | Domain | https://cloudflare.com | |
| **Cloudflare** | ⚫ | Email Services | https://cloudflare.com | Newsletters, transactional emails |
| **PostHog** | ⚫ | Analytics | https://posthog.com | User behavior, consent-based |
| **Sentry** | ⚫ | Error Tracking | https://sentry.io | |
| **New Relic** | ⚫ | Performance Monitoring | https://newrelic.com | |
| **BetterStack** | ⚫ | Uptime Monitoring | https://betterstack.com | Heartbeats, status pages |
| **Chromatic** | ⚫ | Visual Testing | https://chromatic.com | Visual regression, UI review |
| **Tally** | ⚫ | Forms & Surveys | https://tally.so | Anonymous surveys, user feedback |

