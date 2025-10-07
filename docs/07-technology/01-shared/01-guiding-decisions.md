### Technology Philosophy
- **Free-tier first**: Lean on managed service free tiers; avoid bespoke infrastructure
- **Serverless core**: Next.js on Vercel, Supabase functions, and managed queues reduce ops overhead, and we don't want to deal with containers
- **Offline-first design**: Local storage is canonical until sync completes
- **Localization aware**: Deliver native content packs and fallbacks without runtime branching costs
- **Cost optimization**: Cache aggressively, batch network calls, and reuse assets to stay within quotas
- **Reliability focus**: Layer monitoring (Sentry, New Relic) and quota observability to catch regressions early

### Key Requirements
- Offline capability at the core of the experience
- Anonymous usage by default with optional social login
- Local progress storage with optional account sync
- Multi-language support for native languages
- Cost-optimized infrastructure choices
- Privacy-compliant analytics with user consent