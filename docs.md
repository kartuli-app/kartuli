# Kartuli - Georgian Language Learning Platform


## 1. Mission & Vision

### Mission
To make Georgian language learning accessible and free for everyone, breaking down language barriers for international residents, newcomers, and travelers in Georgia

### Vision
To become the go-to platform for Georgian language learning, ensuring that language is never a barrier to connecting with Georgian culture and community

### Core Principles
- **Free Forever**: All learning content remains free forever
- **No Barriers**: No need to create an account, no premium accounts, ads, paywalls, or content restrictions
- **Cost Optimization**: Optimize every infrastructure decision to support the maximum number of students while delaying monetization needs as long as possible
- **Operational Monetization Only**: Revenue only covers operational costs (servers, databases, authentication, email services)

---
---
---

## 2. Project Roadmap

### Phase 1: Launch Game MVP

**MVP scope**
- Mobile-first responsive design, optimized for touch interactions
- Georgian alphabet + ~20 foundational vocabulary words available at launch
- English and Spanish available as native languages
- Offline-first experience with anonymous usage by default; Google and Facebook login offered for sync
- Consent management

**Out of MVP scope**
- Search feature
- Favorites feature
- Mascot integration

### Future Phases (No Specific Order)
- **Mascot Integration**: Integrate mascot interactions across the whole project
- **Favorites Feature**: Allow students to bookmark words for quick access or create custom lessons
- **Search Feature**: Enable finding lessons, words, and letters
- **Expanded Vocabulary**: Add new words, lessons and modules
- **Multi-language Support**: Add Ukrainian, Russian, Belarusian and Hindi language support (launch sequentially based on demonstrated demand, survey insights, and availability of a native content packs)
- **Additional Social Providers**: Add TikTok, Discord, Twitter, Apple social login options (prioritize by user adoption research and integration complexity)
- **Backoffice**: Build admin backoffice for content management and support
- **Newsletter Service**: Launch weekly/monthly email newsletters with relevant learning content
- **Streaming Bot**: Launch Twitch streaming bot that learns Georgian 24/7

### Long-term Vision
- Expand to other underserved languages beyond Georgian
- Maintain free-forever principle across all languages

---
---
---

## 3. Business Strategy

### Target Market
- **Primary**: Non-Georgian speakers living in Georgia
- **Secondary**: People planning to move to Georgia
- **Tertiary**: Travelers wanting basic Georgian communication skills

### Value Proposition
**Free**, comprehensive Georgian language learning **without any content restrictions or premium barriers**, designed specifically for people living in or visiting Georgia; includes **offline support** for learning anywhere, anytime; no need to create an account or install anything to **try the learning experience in just a few clicks**

### Revenue Model
- **Purpose**: Only to cover operational costs (servers, databases, authentication, email services)
- **Possible sources of income**: Affiliate partnerships with learning resources (books, courses), learning platforms (online classes) or physical language schools; these activate only after free-tier limits are consistently exceeded (e.g., Supabase 50k MAU)
- **We will never go with**: Premium accounts, ads, paywalls, content restrictions, or marketing-focused monetization

### Competitive Advantage
- **Major language learning apps don't support Georgian well**
- **Existing Georgian language resources often operate on freemium models**
- Focus on **practical, real-world usage** for people in Georgia
- **Multi-language support** for native languages not typically supported

---
---
---

## 4. Glossary

This section defines the key terms and concepts used throughout the Kartuli project; All stakeholders should use these terms consistently to ensure clear communication

### Core Language Terms
- **Native Language**: The student's first language or primary language (e.g., English, Ukrainian, Russian, Belarusian, Hindi, Spanish...)
- **Target Language**: The language the student is learning (Georgian)
- **Interface Language**: The language used for the app's UI, menus, and instructions (matches user's native language)

### User Types
- **Students**: Learners who progress through the game client experiences
  - **Anonymous Students**: Play without creating an account; progress remains on the device
  - **Registered Students**: Create an account to enable progress synchronization across devices
- **Volunteers**: Contributors who keep the project running and growing
  - **Admins**: Manage overall project operations and governance
  - **Learning Content Managers**: Curate and maintain content packs
  - **Content Reviewers**: Provide feedback on translations and language accuracy
  - **Technicians**: Collaborate on design, development, marketing, and related operations

### Content Terms
- **Item**: Letter or word entry
- **Letter**: Alphabet entry with glyph, names, transliteration, media, and usage hints
- **Word**: Vocabulary entry with target term, transliteration, media, and example sentences
- **Lesson**: Subset of items of the same type (letters or words, never mixed) that are used to generate dynamic games
- **Module**: Themed collection of lessons defined within the master content pack to structure learning
- **Master Content Pack**: Canonical  dataset for a target language, containing metadata, letters, words, modules, and lessons that all native content packs reference
- **Native Content Pack**: Native language specific pack that augments the master content pack with native language labels, usage hints, and example sentences
- **Content Pack Manifest**: Versioned index describing available master packs and native overlays, used by the client to determine downloads and fallbacks
- **Assets**: Media files (images, audio) shared per target language, referenced by items across the content system
- **Resources**: Links to learning content outside of the kartuli project: books, schools, forums, courses...

### Game Terms
- **Lesson Lobby**: Room with flashcards to learn or review the lesson items; flashcards display mastery and favorite status for each item; games are launched from here
- **Lesson Game**: Dynamic game generated for a lesson, uses the lesson items to create 5 to 20 minigame rounds; finishing a game will update the student activity registry
- **Minigame**: Round for a game with a question and multiple answer options, can be won if the answer is right or failed if the answer is wrong
- **Student activity**: Single record that accumulates wins and fails per item and time spent playing

### Gamification Terms
- **Progress**: Information computed (not stored) from student activity
- **Mastery Threshold**: Number of wins to mark an item as mastered (letters ≈ 3–5, words ≈ 5–8)
- **Mastered item**: Binary status indicating whether an item has met the mastery threshold
- **Student Level**: Progress tier determined by total mastered items, emphasizing early alphabet completion

### Analytics Terms
- **Analytics**: Optional student behavior tracking for app usage analysis, separate from activity and gamification
- **Analytics Consent**: Student permission required before sending any analytics events to external services
- **Event Categories**: Grouped analytics events (Acquisition, Activation/Engagement, Retention/Business Metrics)
- **Funnel Analysis**: Tracking user progression through key app flows (landing → app → lesson → game)
- **Anonymous Analytics**: Device-level tracking without personal data, using client-generated ID only
- **Data Export**: Student's right to receive their tracked data in portable format (JSON/CSV)
- **Data Deletion**: Student's right to have their tracked data permanently removed from all systems

### Features
- **Offline Capability**: Ability to learn without internet connection
- **Installation**: Download and persist the learning content in the device, for offline usage
- **Update**: Update the installed learning content when new content is released
- **Sync**: Synchronization of student progress between devices for registered students

---
---
---

## 5. Product Experience

### 5.1 Experience Overview

**Guiding decisions**
- Avoid friction
- Preserve the free-forever promise: no premium tiers, ads, or paywalls
- Embrace cost-efficient infrastructure providers and cache-first delivery to keep operations lean
- Start learning immediately after the landing CTA; no account creation required
- Ensure accessibility with WCAG-compliant colors, focus states, and screen reader support; Georgian-friendly typography
- Treat English (`en`) native content pack as canonical; additional native languages inherit progress and gracefully fall back to English content when selected native content is not available

### 5.2 Native Language Redirect Flow
- Root path `/` permanently redirects to `/en/ka` (landing) via static Next.js redirect handled at the CDN/edge; no runtime cost
- When a student changes the native language, the selected language is stored on the device
- Info pages:
  - When a student visits a page with a different native language than the selected one, show a small non-intrusive banner that suggests visiting the selected language version of the current page
  - Students can dismiss the banner
- App pages:
  - When a student visits an app page with a different native language than the selected one, show a redirect overlay that informs about the redirection to the selected language and performs the redirect after three seconds
  - Students can cancel the suggested redirect to keep the current native language

### 5.3 Pages & Navigation Map

#### Info Pages
- Landing (show game features)
- Terms (game terms)
- Privacy (privacy pol)
- FAQ (frequently asked questions)
- Volunteers (how to collaborate with the project)
- Support (how to support the project by donating to causes, not affiliated or related with the project)
- About (why does the project exist)

- **InfoLayout**:
  - Powers info pages
  - Navbar includes big logo and CTA button to launch the game hub
  - Footer includes info links, native language selector, social media links
  - Responsive design to be defined

#### App Pages
- Hub (main learning hub with progress summary, modules with lessons and recomended lesson)
- Profile (details of student progress, account preferences)
- Favorites (saved words, launch custom lesson games)
- Search (search words, modules, lessons)
- Offline (info about offline access)
- Resources (links to external learning resources)
- Lesson lobby (review lesson items and launch game)
- Lesson game (play the lesson game)

- **NonLesson Layout**
  - Powers non-lesson app pages: hub page, profile, favorites, search, offline, resources 
  - Navbar: Menu or back arrow, page name or logo, offline button, mute toggle button
  - Dock with links to main app pages: Hub, Profile, Favorites, Search

- **Lesson Lobby Layout**
  - Powers the lesson lobby pages
  - Navbar includes back arrow, lesson name, offline indicator, and mute toggle

- **Lesson Game Layout**
  - Powers the game pages
  - Navbar includes back arrow (dialog to confirm exiting the game), time spent, current round and total rounds (3/10), and mute toggle

- Navbar:
  - Transparent for immersion on the game pages, background color for other pages
  - Consistent element placement, avoiding element position jumps
    - Left side:
      - Menu (hub) or back arrow (other pages), small logo (non hub)
    - Center:
      - Big logo (hub) or time spent and rounds count (game) or page name (other pages)
    - Right:
      - Offline button (non game pages), mute toggle button (all pages)

- Menu:
  - Two group of links
    - App pages not available from the dock (offline, resources)
    - Info pages (terms, landing, FAQ, etc.)


### 5.4 Per Page Details

#### Landing Page
- Shows dismissible support banner that links to the support page
- Show main app features:
  - Alphabet
  - Vocabulary
  - Games
  - Offline
  - Anonymous
  - Free
  - Favorites (when released)
  - Search (when released)
- Show quotes relevant to learning languages

#### Hub Page

- Hub highlights user stats (time played, level, mastered letters, mastered words, learning streak) and lists modules with per-module progress, imagery, and mastery counts
- Only one module remains expanded at a time; recommended lesson auto-expands its module, scrolls into view, and can be surfaced via floating "Show Recommended Lesson" if off-screen
- Module cards toggle expansion/collapse; lesson cards open the Lesson Lobby

#### Lesson Lobby Page
- Presents a flashcard carousel; each flashcard includes target/native/transliteration strings, imagery, audio, context sentences, mastery badges, and favorite toggle (for word items)
- Lobby actions include Start Game

#### Game Page
- Game flow: pre-roll countdown (3-2-1), rounds with question/answers/mascot feedback, round result overlay highlighting correctness, optional mastery/favorite animations, tap to advance
- Game Summary reuses the carousel to review each round with green/red indicators and proposes next recommended activity, Hub return, or replay
- Level-up modal blocks interaction until dismissed, celebrates global or mastery achievements, and previews requirements for the next level

### 5.6 Localization Strategy

- Default canonical language is English
- URLs follow `/<lang>/<targetLang>` pattern (e.g., `/en/ka`, `/es/ka`)
- UI strings localize using a server-provided translation provider keyed by `lang`; English assets serve as fallback for untranslated strings
- Content packs localize per `targetLang`, overlaying native-language translations on shared target-language items; ff a native-language pack lacks a word, the system falls back to the English content while retaining the item
- Language preference persists in `localStorage`/`IndexedDB`; returning users are redirected client-side when their saved language differs from the current route, with an override option exposed on the redirect screen
- First-time visitors stay on the default `/en/ka` route, while deep links respect the shared URL
- User progress is keyed by target language and shared across native-language overlays; switching from Spanish UI to English retains mastered letters/words
- Unsupported combinations render a static `UnsupportedLanguagePage` with links to supported pairs and optional `noindex` metadata

### 5.7 Content Strategy
- Focus on high-utility language: alphabet mastery, greetings, politeness phrases, counting, and survival vocabulary that international residents need immediately
- Keep modules homogeneous (letters-only or words-only) while enabling short lessons so learners feel progress quickly
- Author content in structured JSON packs; reuse target-language media across native language packs to minimize duplication and cost
- Layer Georgian cultural context into imagery, example sentences, and audio so vocabulary reflects real Georgian life
- Support partial localization: native-language overlays can omit words not yet translated; UI falls back to English text while preserving items and progress
- Document editorial standards (tone, transliteration rules, audio quality) in the backoffice roadmap to sustain quality as packs scale beyond MVP

---
---
---

## 6. Learning System Specification

### 6.1 Data Model

#### Letters
- **id** — stable slug, e.g., `letter_a`
- **glyph** — target script letter, e.g., `ა`
- **name_target** — target name, e.g., `ანი`
- **name_translit** — Latin transliteration, e.g., `ani`
- **label_native** — native language label, e.g., `a`
- **images** — array of SVG paths
- **audios** — array of audio paths
- **usage_native** — short usage hint, e.g., "like 'a' in father"

#### Words *(shared core data)*
- **id** — stable slug, e.g., `hello`
- **term_target** — target script word, e.g., `გამარჯობა`
- **transliteration** — Latin transliteration, e.g., `gamarjoba`
- **images** — array of image paths
- **audios** — array of audio paths
- **examples** — array of objects with:
  - `sentence_target`
  - `sentence_translit` *(optional)*
  - `sentence_native` *(provided via overlays; fallback to English)*

#### Modules
- **id** — slug, e.g., `animals`
- **area** — `"alphabet"` or `"vocabulary"`
- **title_native** — display title in native language
- **title_target** — display title in target language (optional)
- **item_type** — `"letter"` or `"word"`
- **item_ids** — ordered array of item ids

#### Lessons
- **id** — slug, e.g., `greetings_intro`
- **module_id** — reference to parent module
- **title_native** — display title in native language; fallback to English overlay
- **title_target** — optional target-language name
- **item_type** — `"letter"` or `"word"`
- **item_ids** — ordered array of 4–6 item ids

#### Metadata
- **pack_id** — language pair, e.g., `en-ka`
- **version** — semantic version, e.g., `0.1`
- **created_at** — ISO date
- **language_target** — target language code
- **language_native** — native language code
- **assets_version** — version of assets
- **description** — human-readable description

#### Notes
- `letters` and `words` use dictionaries for constant-time lookup
- `modules` and `lessons` stay as ordered arrays to preserve author intent
- Native content packs add `label_native`, `usage_native`, `sentence_native` per `lang`; missing fields fall back to English overlay
- Games are generated at runtime rather than stored in packs

### 6.2 MVP Content Pack Scope

- Letters: Full Georgian alphabet with target-script names, transliteration, audio, and usage hints. Localized overlays supply native-language usage; missing overlays fall back to English
- Words: ~20 launch words covering greetings (`hello`, `goodbye`), politeness (`please`, `thank you`), essentials (`water`, `bathroom`, `bus`, `market`), numbers (1–3), and common verbs
- Modules: Distinct areas for alphabet and vocabulary; vocabulary modules are small (6–8 items) to reinforce mastery; future packs can expand counts gradually
- Lessons: 4–6 items, balanced by skill or theme, mixing letters or words only within their module type; recommended lessons are generated by the recommendation algorithm
- Native content packs: Additional native languages reuse the same `modules`/`lessons` item IDs. If a specific word lacks localization, the UI surfaces English text while keeping the item active so progress continuity persists
- Content pack manifest enumerates available overlays per native language; client uses this to determine where fallbacks apply

### 6.3 Student Progress Tracking

The tracking system stores student activity deltas locally to remain offline-first and decoupled from gamification rules, enabling flexible mastery and level calculations that work even when users do not connect for extended periods

Gamification is computed from student activity

#### 6.3.1 Stored Metrics

**Per device delta counters:**
- Letter wins and fails (per item)
- Total time spent learning (per session aggregate)

**Global user stats (computed from counters):**
- Total time spent
- Item mastery (binary, derived)
- User global level (derived)

#### 6.3.2 Delta Counters & Storage

- Activity is tracked as additive deltas rather than immutable raw logs
- IndexedDB persists local deltas and the `device_id`, a client-generated identifier created once and reused for both activity reconciliation and analytics until the user clears data or logs out
- Delta merges are idempotent; replays or retries do not inflate totals
- Counters are keyed by `targetLang` so switching native languages keeps mastered letters/words intact

#### 6.3.3 Sync Loop
- The client maintains two IndexedDB registries:
  - `synced activity` mirrors the last server-acknowledged totals
  - `not synced activity` stores new deltas that have not been accepted yet
- Mastery and level calculations combine both registries so they always operate on the complete activity history
- Sync loop:
  1. New play sessions append deltas into `not synced activity`
  2. At each sync interval or when connectivity returns, the client sends the full contents of `not synced activity` to the server with a new `request_id` generated for that payload (server stores the ID to ignore duplicates; once confirmed, the previous ID is discarded)
  3. If the server confirms receipt, it responds with aggregated totals; the client overwrites `synced activity` with that response and clears `not synced activity`
  4. If the request fails or duplicates a known ID, both registries remain unchanged and the client retries on the next interval
- Sync attempts fire every five minutes by default and automatically retry after failures without losing unsynced deltas

#### 6.3.4 Anonymous vs Registered Users

- Anonymous users operate entirely on-device using the generated device ID
- On login/signup, users can optionally merge their anonymous deltas into the account; the server consolidates them and replies with the unified counters
- Declining the merge starts the account with fresh counters, deleting the anonymous not synced activity stored locally

#### 6.3.5 Analytics Queue

- Analytics events follow the same offline-first principles; see section `6.5` for queue behavior and consent requirements

### 6.4 Gamification
- Item mastery is binary: letters typically require 3–5 wins; words 5–8 wins; modules and lessons stay homogeneous (letters-only or words-only) so thresholds remain consistent
- Extra wins beyond the threshold do not change mastery status, and mastery cannot be lost
- Global levels emphasize early alphabet mastery before vocabulary expansion

| Level | Name         | Requirement            |
| ----- | ------------ | --------------------- |
| 0     | Novice       | 0 items mastered      |
| 1     | Beginner     | 5 letters mastered    |
| 2     | Learner      | 10 letters mastered   |
| 3     | Intermediate | 15 letters mastered   |
| 4     | Explorer     | 5 words mastered      |
| 5     | Adept        | 10 words mastered     |
| 6     | Fluent       | 25 words mastered     |
| 7     | Expert       | 50 words mastered     |
| 8     | Master       | 100 words mastered    |
| 9     | Polyglot     | 200+ words mastered   |

- Modules and lessons inherit progress from their items; mastery completes once all contained items meet thresholds
- Optional points or visual rewards can layer on top without altering mastery or level logic
- Recommended mode surfaces the next lesson based on lowest mastery

### 6.5 Analytics (PostHog)

#### 6.5.1 Purpose

Track **user acquisition, engagement, and funnels** for app usage analysis. Analytics is separate from user progress tracking and requires user consent

**Key principle**: **User activity and gamification is separate from analytics.** Analytics is optional and respects user consent; activity tracking is necessary for offline-first functionality

#### 6.5.2 Event Categories

1. **Acquisition**  
   - `landing_page_view`
   - `privacy_page_view`
   - `faq_page_view`

2. **Activation / Engagement**  
   - `app_hub_opened`
   - `lesson_selected`
   - `lesson_game_started`
   - `lesson_game_finished`
   - `ui_language_changed`
   - `native_language_fallback_shown`

3. **Retention / Business Metrics**  
   - `item_mastered` (behavioral analytics only; progress system remains canonical and drives recommended mode)
   - `level_mastered` (optional; mostly for dashboards)
   - `favorite_toggled`
   - Funnels (landing → app hub → lesson → game)

#### 6.5.3 Offline Handling

- Events queue locally if offline
- Sent to analytics provider when connection is available

#### 6.5.4 Anonymous Users

- Device has a **client-generated ID** (`device_id`) reused across analytics and activity reconciliation for optional linking
- No personal data is tracked until consent
- If student consents to linking analytics after login/signup: merge previous anonymous events with the account
- If student does not consent to linking: keep anonymous events separate

#### 6.5.5 Consent & Privacy

- **Consent is required** before sending any analytics events
- Consent is **per user, per device**
- Users can refuse analytics and still use the app normally
- A simple **informative banner** explaining how to stop tracking is acceptable practice
- GDPR / privacy compliance:
  - Do not track personal data without consent
  - Provide options for deletion/export of data
  - Anonymous usage can be tracked only with device ID (non-personal)

#### 6.5.6 Data Deletion & Export

- **activity:** delete or export raw progress data
- **analytics:** deletion/export per user or device may be required for GDPR
- Export format: e.g., JSON or CSV containing progress/events
- Deletion: ensure both activity and analytics data are removed if requested

#### 6.5.7 Event Handling Flow

On game completion the client updates activity counters and (if allowed) queues analytics events before scheduling the next sync/flush

1. Student completes game → triggers `onGameCompleted`
2. Increment local delta counters in IndexedDB (wins/losses, time, days played) scoped to the device ID (see `6.3.2`)
3. If the student is logged in and the sync interval has elapsed, push to the server (see `6.3.3`)
4. If analytics consent is given, enqueue PostHog events locally; drain the queue when connectivity resumes (see `6.5.3`)
5. Compute mastery/levels at runtime from merged counters; **never store computed fields**

### 6.6 Content Pack Management & Versioning

- Manifest tracks pack version, assets version, and overlay versions per `lang`; clients compare to local cache for updates
- Items are immutable; new letters/words append to dictionaries. Overlays may add localized text independently
- Asset URLs embed version segments, enabling service worker to prefetch new media while expiring old cache entries safely
- Release flow:
  - Publish updated manifest + overlay diffs to CDN
  - Notify users in-app; allow manual download or defer until on Wi-Fi
  - Trigger ISR revalidation via Next.js tags so marketing/app pages reflect new content version indicator
- MVP release ships alphabet + ~20 words; subsequent drops expand vocabulary modules and overlay coverage without altering the base schema

---
---
---

## 7. Technology & Delivery

### 7.1 Technology Philosophy
- **Free-tier first**: Lean on managed service free tiers; avoid bespoke infrastructure
- **Serverless core**: Next.js on Vercel, Supabase functions, and managed queues reduce ops overhead, and we don't want to deal with containers
- **Offline-first design**: Local storage is canonical until sync completes
- **Localization aware**: Deliver overlays and fallbacks without runtime branching costs
- **Cost optimization**: Cache aggressively, batch network calls, and reuse assets to stay within quotas
- **Reliability focus**: Layer monitoring (Sentry, New Relic) and quota observability to catch regressions early

### Key Requirements
- Offline capability at the core of the experience
- Anonymous usage by default with optional social login
- Local progress storage with optional account sync
- Multi-language support for native languages
- Cost-optimized infrastructure choices
- Privacy-compliant analytics with user consent

### 7.2 Infrastructure Stack

#### Core Platform
- **Next.js**: React framework with serverless functions for backend logic
- **Vercel**: Hosting, deployment, and serverless function execution
- **PWA**: Progressive Web App architecture for cross-platform compatibility

#### Data & Storage
- **Local Storage / IndexedDB**: Primary store for offline-first functionality and overlay fallbacks
- **Supabase**: 
  - Main database for user progress, favorites, and preferences
  - Authentication (Google, Facebook)
  - Edge functions handle delta merges and analytics webhooks
- **Content Packs & Assets**:
  - Manifest + overlay metadata downloaded on install/update; stored in IndexedDB with version stamps
  - Assets cached via Cache Storage during install/update passes; service worker replays caching loop to recover evicted files
  - Manifest version bump triggers in-app prompt and optional background download on Wi-Fi
  - Example asset URL: `https://assets.kartuli.app/en-ka/images/letter_a.svg?v=1`
  - Example content pack manifest: `https://content.kartuli.app/en-ka/master.json?v=1`

#### Analytics & Monitoring
- **PostHog**: User behavior analytics (with consent) including overlay fallback events
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

### 7.3 Application Architecture & Routing

- Next.js `app` directory uses `/<lang>/<targetLang>` pattern; root layout is pass-through. Locale layout renders `<html lang>` and wraps children in translation provider after validating supported pairs
- `next.config.js` defines static redirect from `/` to `/en/ka`. `generateStaticParams` prebuilds supported pairs, with ISR handling content version bumps; ISR pages are served cache-first; users see cached HTML until a reload or new service worker activation fetches the latest render from Vercel via stale-while-revalidate
- Route groups organize surfaces:
  - `(marketing)` → InfoLayout pages (`landing`, `terms`, `privacy`, `faq`, `contact`)
  - `[lang]/[targetLang]/(hub)` → HubLayout (`page`, `profile`, `favorites`, `search`, `offline`)
  - `[lang]/[targetLang]/(learning)` → LearningLayout (`lesson/[slug]`) and ImmersionLayout (`lesson/[slug]/play`, `summary`, `level-up`)
- Offline fallback page lives under HubLayout so dock/navigation remain accessible when connectivity drops
- Service worker intercepts navigation to serve cached shell + IndexedDB data; unsupported requests route to offline page with retry CTA

### 7.4 Data Flow Architecture

**User Activity Flow**
1. **IndexedDB Delta Counters** → Store per-item wins/losses, time spent data keyed by `targetLang` (see `6.3.3` for `synced` vs `not synced` registries)
2. **Delta Batching** → Accumulate additive deltas until sync interval or connectivity returns
3. **Supabase Merge** → Edge function merges `{item_id, delta, targetLang, device_id}` atomically and returns updated aggregates
4. **Overlay Adjustments** → When native-language overlay changes, client reuses same counters; no server mutation required
5. **PostHog Analytics** → Queue consented events locally; flush when online

**Authentication Flow**
1. **Anonymous Users** → Local storage only with client-generated ID
2. **Social Login** → Supabase Auth (Google, Facebook)
3. **Data Linking** → Optional merge of anonymous deltas/events into account; users can decline

**Content Delivery**
1. **Manifest + Overlays** → Cloudflare CDN, cached via service worker
2. **App Code** → Vercel deployment with Next.js PWA + server components
3. **Database** → Supabase for user data, favorites, and progress deltas

**Monitoring & Analytics**
1. **Sentry** → Error tracking
2. **New Relic** → Performance + uptime
3. **PostHog** → Engagement analytics (consent-based); overlays tracked via fallback events

### 7.5 Offline Storage & PWA Strategy

- IndexedDB stores content pack manifests, user counters/deltas, analytics queues, favorites, preferences, and auth tokens; it offers strong persistence even across long offline periods
- Cache Storage holds media assets (letters, later words) and application shell resources; the service worker proactively caches required assets and retries failed downloads to surface progress to the user; new service worker deployments automatically clear outdated page caches while preserving versioned asset caches so repeat visits stay fast without re-downloading stable media;
- Cache eviction is browser-dependent; The app replays the caching loop when it detects missing assets, keeping gameplay functional; If IndexedDB quota is exceeded during a content pack install the user sees a notification with retry guidance; smaller write failures during normal play are handled silently and retried later
- Dynamic pages (modules, lessons, games) render from cached shell plus IndexedDB data; static marketing/legal pages are cached directly for offline reading
- Add-to-home-screen, fullscreen mode, and optional background update flows follow PWA best practices without compromising the offline-first requirement

### 7.6 Storage Estimates

Metadata:
- Master content pack: ~2 MB
- Native content pack: ~1 MB
- Stored separately from assets and cached locally
- **3 - 5 MB total for Metadata**

Assets (each item = image + audio):
- Optimized WebP imagery (≈20–40 KB)
- Opus audio (<2 s, ≈15–25 KB)
- **40–60 KB total per item**

Estimates:
- **MVP** (33 letters + 20 words = 53 items): **6–7 MB** overall
- **Medium size content** (33 letters + 500 words): **28–38 MB** overall
- **Large pack** (33 letters + 2000 words): **93–123 MB** overall

Assets are cached and versioned, ensuring minimal re-downloads and integrity across updates

### 7.7 Development Conventions
- We follow [Conventional Commits](https://www.conventionalcommits.org/) with no domain scopes (e.g., `docs`, `feat`)

### 7.8 Consent Management

- Two independent consent toggles: passive offline storage (store visited content to visit offline even if not instaled) and analytics tracking
- Banner includes each toggle pre-checked to yes, accept button to confirm the choice, link to privacy page
- Legal stance: Georgia jurisdiction; GDPR compliance with opt-in, clear revocation, data export, and deletion pathways

### Tracking & Gamification (summary)
- Offline-first tracking stores cumulative wins/fails for each item, and total time spent playing
- Mastery thresholds sit at 3–5 wins for letters and 5–8 wins for words
- Levels emphasize alphabet mastery before vocabulary growth
- Optional visual rewards can overlay without changing core logic

---

## 8. To Discuss
- **Content tooling & localization pipeline**: Define the backoffice workflow for authoring packs, approving overlays, and rolling out partial translations without regressions
- **Beta research loop**: Pick target communities, feedback tooling, and qualitative interview cadence for the MVP pilot
- **Marketing & comms playbook**: Align on brand identity, social handles, guerrilla tactics, and messaging guardrails consistent with the free-forever promise
- **Support operations**: Establish contact channels, help center tooling, SLAs, and escalation paths for user issues
- **Legal & compliance**: Finalize privacy/terms copy, analytics consent language, data export/deletion process, and affiliate disclosures
- **Accessibility & QA readiness**: Plan device/browser matrix, assistive tech audits, and performance budgets ahead of launch; testing, accessibility audits, and cross-device/browser coverage remain planned and will be scheduled ahead of the MVP beta
- **Reliability & incident response**: Set monitoring thresholds, on-call responsibilities, and rollback procedures for production incidents