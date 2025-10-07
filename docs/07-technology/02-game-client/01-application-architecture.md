### Application Architecture & Routing

- Next.js `app` directory uses `/<lang>/<targetLang>` pattern; root layout is pass-through. Locale layout renders `<html lang>` and wraps children in translation provider after validating supported pairs
- `next.config.js` defines static redirect from `/` to `/en/ka`. `generateStaticParams` prebuilds supported pairs, with ISR handling content version bumps; ISR pages are served cache-first; students see cached HTML until a reload or new service worker activation fetches the latest render from Vercel via stale-while-revalidate
- Route groups organize surfaces:
  - `(marketing)` → InfoLayout pages (`landing`, `terms`, `privacy`, `faq`, `contact`)
  - `[lang]/[targetLang]/(hub)` → HubLayout (`page`, `profile`, `favorites`, `search`, `offline`)
  - `[lang]/[targetLang]/(learning)` → LearningLayout (`lesson/[slug]`) and ImmersionLayout (`lesson/[slug]/play`, `summary`, `level-up`)
- Offline fallback page lives under HubLayout so dock/navigation remain accessible when connectivity drops
- Service worker intercepts navigation to serve cached shell + IndexedDB data; unsupported requests route to offline page with retry CTA
