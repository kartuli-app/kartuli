### Data Flow Architecture

**User Activity Flow**
1. **IndexedDB Delta Counters** → Store per-item wins/losses, time spent data keyed by `targetLang` (see `6.3.3` for `synced` vs `not synced` registries)
2. **Delta Batching** → Accumulate additive deltas until sync interval or connectivity returns
3. **Supabase Merge** → Edge function merges `{item_id, delta, targetLang, device_id}` atomically and returns updated aggregates
4. **Native Content Pack Adjustments** → When native content pack changes, client reuses same counters; no server mutation required
5. **PostHog Analytics** → Queue consented events locally; flush when online

**Authentication Flow**
1. **Anonymous Users** → Local storage only with client-generated ID
2. **Social Login** → Supabase Auth (Google, Facebook)
3. **Data Linking** → Optional merge of anonymous deltas/events into account; students can decline

**Content Delivery**
1. **Manifest + Native Content Packs** → Cloudflare CDN, cached via service worker
2. **App Code** → Vercel deployment with Next.js PWA + server components
3. **Database** → Supabase for user data, favorites, and progress deltas

**Monitoring & Analytics**
1. **Sentry** → Error tracking
2. **New Relic** → Performance + uptime
3. **PostHog** → Engagement analytics (consent-based); native content packs tracked via fallback events
