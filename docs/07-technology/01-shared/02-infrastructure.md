### Infrastructure Stack

#### Core Platform
- **Next.js**: React framework with serverless functions for backend logic
- **Vercel**: Hosting, deployment, and serverless function execution
- **PWA**: Progressive Web App architecture for cross-platform compatibility

#### Data & Storage
- **Local Storage / IndexedDB**: Primary store for offline-first functionality and native content pack fallbacks
- **Supabase**: 
  - Main database for user progress, favorites, and preferences
  - Authentication (Google, Facebook)
  - Edge functions handle delta merges and analytics webhooks
- **Content Packs & Assets**:
  - Manifest + native content pack metadata downloaded on install/update; stored in IndexedDB with version stamps
  - Assets cached via Cache Storage during install/update passes; service worker replays caching loop to recover evicted files
  - Manifest version bump triggers in-app prompt and optional background download on Wi-Fi
  - Example asset URL: `https://assets.kartuli.app/en-ka/images/letter_a.svg?v=1`
  - Example content pack manifest: `https://content.kartuli.app/en-ka/master.json?v=1`

#### Analytics & Monitoring
- **PostHog**: User behavior analytics (with consent) including native content pack fallback events
- **Sentry**: Error tracking and performance monitoring
- **New Relic**: Application performance monitoring and uptime tracking

#### CDN & Communication
- **Cloudflare**: 
  - CDN for static assets and content delivery; `assets.kartuli.app` proxies Supabase storage for media, while `content.kartuli.app` serves manifests and content packs from public GitHub-backed storage so each origin stays isolated but follows identical caching policies
  - Domain management and DNS
  - Email services for newsletters and notifications

#### Development & Operations
- **GitHub**: Code repository, version control, and CI/CD
- **GitHub Actions**: Automated workflows for deployment and asset management

#### Cost Optimization Strategy
All services utilize **free tiers** where possible:
- Vercel: Hosting/serverless
- Supabase: Database/auth/functions
- PostHog: Analytics
- Cloudflare: CDN/DNS/email
- Sentry: Error tracking
- New Relic: Monitoring
- GitHub: Repo + Actions
