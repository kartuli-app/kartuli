# Kartuli - Georgian Language Learning Platform

## Table of Contents
- [1. Mission & Vision](#1-mission--vision)
- [2. Project Roadmap](#2-project-roadmap)
- [3. Business Strategy](#3-business-strategy)
- [4. Glossary](#4-glossary)
- [5. Product Experience](#5-product-experience)
  - [5.1 Experience Overview](#51-experience-overview)
  - [5.2 Layouts & Navigation Map](#52-layouts--navigation-map)
  - [5.3 Landing & Marketing Surfaces](#53-landing--marketing-surfaces)
  - [5.4 Hub & Lesson Flow](#54-hub--lesson-flow)
  - [5.5 Reusable UI Components](#55-reusable-ui-components)
  - [5.6 Localization Strategy](#56-localization-strategy)
  - [5.7 Content Strategy](#57-content-strategy)
  - [5.8 Additional Surfaces](#58-additional-surfaces)
- [6. Learning System Specification](#6-learning-system-specification)
  - [6.1 Purpose & Scope](#61-purpose--scope)
  - [6.2 Data Model](#62-data-model)
  - [6.3 MVP Content Pack Scope](#63-mvp-content-pack-scope)
  - [6.4 User Progress Tracking](#64-user-progress-tracking)
  - [6.5 Gamification](#65-gamification)
  - [6.6 Analytics (PostHog)](#66-analytics-posthog)
  - [6.7 Content Pack Management & Versioning](#67-content-pack-management--versioning)
- [7. Technology & Delivery](#7-technology--delivery)
  - [7.1 Technology Philosophy](#71-technology-philosophy)
  - [7.2 Infrastructure Stack](#72-infrastructure-stack)
  - [7.3 Application Architecture & Routing](#73-application-architecture--routing)
  - [7.4 Data Flow Architecture](#74-data-flow-architecture)
  - [7.5 Offline Storage & PWA Strategy](#75-offline-storage--pwa-strategy)
  - [7.6 Storage Estimates](#76-storage-estimates)
  - [7.7 Development Conventions](#77-development-conventions)
  - [7.8 Consent Management](#78-consent-management)
- [8. To Discuss](#8-to-discuss)
- [9. Change Log](#9-change-log)

---

## 1. Mission & Vision

### Mission
To make Georgian language learning accessible and free for everyone, breaking down language barriers for international residents, newcomers, and travelers in Georgia.

### Vision
To become the go-to platform for Georgian language learning, ensuring that language is never a barrier to connecting with Georgian culture and community.

### Core Principles
- **Free Forever**: All learning content remains free forever
- **No Barriers**: No premium accounts, ads, paywalls, or content restrictions
- **Cost Optimization**: Actively optimize infrastructure costs to delay monetization needs as long as possible
- **Operational Monetization Only**: Revenue only covers operational costs (servers, databases, authentication, email services)

---

## 2. Project Roadmap

### Phase 1: MVP Launch
- Launch Georgian language learning PWA
- English as native language support
- Offline functionality
- Anonymous usage (default), optional social login (Google, Facebook)
- Basic learning features

### Future Phases (No Specific Order)
- **Multi-language Support**: Add Ukrainian, Russian, Belarusian, Hindi and Spanish language support (launch sequentially based on demonstrated demand, survey insights, and availability of a 200+ item localized content pack)
- **Additional Social Providers**: Add TikTok, Discord, Twitter, Apple social login options (prioritize by user adoption research and Supabase integration complexity)
- **Content Management System**: Build admin backoffice for content management
- **Newsletter Service**: Launch weekly/monthly email newsletters for subscribers
- **Streaming Bot**: Launch Twitch streaming bot that learns Georgian 24/7 (requires dedicated roadmap once core sync/content systems mature)

### Long-term Vision
- Expand to other underserved languages beyond Georgian
- Maintain free-forever principle across all languages

---

## 3. Business Strategy

### Target Market
- **Primary**: Non-Georgian speakers living in Georgia (international residents, students, workers)
- **Secondary**: People planning to move to Georgia
- **Tertiary**: Travelers wanting basic Georgian communication skills

### Value Proposition
**Free**, comprehensive Georgian language learning **without any content restrictions or premium barriers**, designed specifically for people living in or visiting Georgia. Users can learn Georgian in their **native language**. Includes **offline support** for learning anywhere, anytime.

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

## 4. Glossary

This section defines the key terms and concepts used throughout the Kartuli project. All stakeholders should use these terms consistently to ensure clear communication.

### Core Language Terms
- **Native Language**: The user's first language or primary language (e.g., English, Ukrainian, Russian, Belarusian, Hindi, Spanish)
- **Target Language**: The language the user is learning (Georgian for Kartuli)
- **Interface Language**: The language used for the app's UI, menus, and instructions (matches user's native language)
- **Learning Content**: The actual Georgian language lessons, exercises, and vocabulary

### User Types
- **Anonymous User**: A user who learns without creating an account, progress stored locally
- **Social User**: A user who logs in via social providers (Google, Facebook for MVP; TikTok, Discord, Twitter, Apple planned)
- **Registered User**: A user who creates an account for cloud sync and additional features
- **International Resident**: Non-Georgian speaker living in Georgia (primary target)
- **Future Resident**: Person planning to move to Georgia (secondary target)
- **Traveler**: Visitor wanting basic Georgian communication skills (tertiary target)

### Technical Terms
- **PWA**: Progressive Web App - mobile-first web application that works like a native app
- **Offline Capability**: Ability to learn without internet connection
- **Local Storage**: Progress and data stored on user's device
- **Cloud Sync**: Optional synchronization of progress to cloud when user registers
- **Serverless**: Architecture using managed cloud services without dedicated servers

### Content Terms
- **Activity**: A focused practice session (minigame) launched from a lesson; activities record per-round outcomes that roll up into mastery and streak tracking.
- **Lesson**: Curated subset of module items (4–10) designed to introduce or reinforce a specific concept before launching an activity.
- **Exercise**: Interactive practice affordances within a lesson lobby (e.g., flashcards, audio previews) that prepare the learner for activities.
- **Cultural Context**: Georgian cultural information integrated into lessons and activities to reinforce relevance and retention.
- **Master Content Pack**: Canonical target-language dataset for a `targetLang`, containing metadata, letters, words, modules, and lessons that all native overlays reference.
- **Native Content Overlay**: Language-specific overlay (a.k.a. native content pack) that augments the master content pack with native-language labels, usage hints, and example sentences while reusing the canonical IDs.
- **Content Pack Manifest**: Versioned index describing available master packs and native overlays, used by the client to determine downloads and fallbacks.
- **Module**: Themed collection of items (letters or words) defined within the master content pack to structure lessons and activities.
- **Letter Item**: Alphabet entry with glyph, names, transliteration, media, and usage hints.
- **Word Item**: Vocabulary entry with target term, transliteration, media, and example sentences.

-### Tracking & Gamification Terms
- **Tracking Data**: Raw activity records stored locally, including per-item stats, per-activity summaries, and global aggregates.
- **Correct Round**: Individual activity round completed accurately for a given item.
- **Incorrect Round**: Individual activity round completed inaccurately for a given item.
- **Mastery Threshold**: Number of correct rounds required to mark an item as mastered (letters ≈ 3–5, words ≈ 5–8).
- **Item Mastery**: Binary status indicating whether an item has met the mastery threshold.
- **Global Level**: Progress tier determined by total mastered items, emphasizing early alphabet completion.
- **Assets**: Shared media files (images, audio) referenced by items across the content system.
- **Consolidation**: Process of merging multiple raw activity entries into summarized records when threshold is exceeded (>20 entries).
- **Client-Generated ID**: Unique device identifier created locally for anonymous tracking and optional account linking.
- **Sync Interval**: Configurable time period (default 5 minutes) for pushing consolidated data to cloud storage.

### Analytics Terms
- **Analytics**: Optional user behavior tracking for app usage analysis, separate from progress tracking
- **PostHog**: Third-party analytics platform used for event tracking and user behavior analysis
- **Analytics Consent**: User permission required before sending any analytics events to external services
- **Event Categories**: Grouped analytics events (Acquisition, Activation/Engagement, Retention/Business Metrics)
- **Funnel Analysis**: Tracking user progression through key app flows (landing → app → lesson → activity)
- **Anonymous Analytics**: Device-level tracking without personal data, using client-generated ID only
- **Data Export**: User's right to receive their tracked data in portable format (JSON/CSV)
- **Data Deletion**: User's right to have their tracked data permanently removed from all systems

---

## 5. Product Experience

### 5.1 Experience Overview

**Core MVP scope**
- Georgian alphabet + ~20 foundational vocabulary words available at launch (2–3 themed mini-modules).
- Lesson lobby + activity loop delivering repeatable practice and mastery feedback.
- Offline-first experience with anonymous usage by default; Google and Facebook login offered for sync.
- Persistent progress per user even when they switch native languages; English UI/content serves as fallback when specific native-language overlays are missing.
- Mobile-first responsive design, optimized for touch interactions, gestures, and landscape/portrait transitions.

**Guiding decisions**
- Start learning immediately after the landing CTA; no account creation required.
- Preserve the free-forever promise: no premium tiers, ads, or paywalls.
- Embrace cost-efficient serverless infrastructure and cache-first delivery to keep operations lean.
- Ensure accessibility with WCAG-compliant colors, focus states, and screen reader support; Georgian-friendly typography delivered via Next.js fonts.
- Treat English (`en`) overlays as canonical; additional native languages inherit progress and gracefully fall back to English UI strings or content until localized packs reach parity.

#### Initialization flow
- `<InitClientApp>` mounts under the `/<lang>/<targetLang>` layout and orchestrates client startup tasks.
- A single `useEffect` first checks whether the saved language differs from the current route; if a redirect is required nothing else initializes and the component remounts on the new URL.
- When no redirect is needed, the splash screen remains for at least ~1 second while local mastery calculations, IndexedDB hydration, and the first sync attempt run in parallel.
- Initialization never hides server-rendered content from crawlers; SEO and Lighthouse continue to index the page without waiting on the splash screen.
- Users can bypass the suggested redirect from the splash screen to keep their current URL/language pairing.

**Supporting services (roadmap)**
- **Kartuli PWA**: Primary learning surface, installable and offline-capable on iOS/Android/desktop.
- **Admin Backoffice** *(post-MVP)*: Content management, analytics dashboards, and release tooling.
- **Newsletter Service** *(post-MVP)*: Periodic updates with learning tips and cultural notes.
- **Streaming Bot** *(experimental)*: Always-on demo channel showcasing activities and updates.

### 5.2 Layouts & Navigation Map

- **InfoLayout + InfoNavbar** power marketing and legal surfaces. Desktop shows a persistent right-column menu; mobile exposes a menu/back button on the left.
- **HubLayout + HubNavbar** own the authenticated experience shell with offline indicator, mute toggle, and dock (bottom on mobile, left rail on desktop) linking Hub, Profile, Favorites, and Search.
- **LearningLayout + BackNavbar** wrap lesson lobbies with clear back navigation, lesson titles, mute/offline indicators, and no dock to reduce clutter.
- **ImmersionLayout + MinimalNavbar** drive activities, countdowns, summaries, and level-up screens with logo + mute control only; in-activity back flows are handled in-app.
- Navigation docks surface core destinations; menu items cover terms, privacy, settings, and contact. Search lives within the dock and opens a dedicated search experience.
- UI states and controls (mute, offline, recommended lesson prompts) stay consistent as users move across layouts to support predictable micro-interactions.

### 5.3 Landing & Marketing Surfaces

- Root path `/` permanently redirects to `/en/ka` via static Next.js redirect handled at the CDN/edge; no runtime cost.
- SEO crawlers and Lighthouse receive fully rendered HTML; client-only redirects only trigger for returning users with stored language preferences.
- Language redirects honor offline state: if the destination page is not cached when offline, the app keeps the user on the requested route and surfaces an override option.
- Marketing pages (`/en/ka`, `/terms`, `/privacy`, `/faq`, future contact) reuse `InfoLayout`, ensuring consistent navigation and optional hero CTA placement.
- Landing hero emphasizes the free-forever promise, includes a Ukraine/Georgia support banner (dismissible), and drives users into the Hub CTA.
- Hero background is black with high-contrast CTA; content below returns to white for readability. Banner only appears on the landing page.
- Marketing pages remain indexable, but unsupported language pairs render a friendly static message explaining supported combinations and linking back to `/en/ka`.

### 5.4 Hub & Lesson Flow

- Hub highlights user stats (time played, level, mastered letters, mastered words, learning streak) and lists modules with per-module progress, imagery, and mastery counts.
- Only one module remains expanded at a time; recommended lesson auto-expands its module, scrolls into view, and can be surfaced via floating "Show Recommended Lesson" if off-screen.
- Module cards toggle expansion/collapse; lesson cards open the Lesson Lobby.
- Lesson Lobby presents a flashcard carousel (single card view, arrow controls, swipe gestures, desktop scroll-to-change), target/native/transliteration strings, imagery, audio, context sentences, mastery badges, and favorites for word lessons.
- Lobby actions include Start Game, Back, and Share (copy link + social targets). Recommended lessons preload countdown state for fast play.
- Activity flow: pre-roll countdown (3-2-1), rounds with question/answers/mascot feedback, round result overlay highlighting correctness, optional mastery/favorite animations, tap to advance.
- Activity Summary reuses the carousel to review each round with green/red indicators and proposes next recommended activity, Hub return, or replay.
- Level-up modal blocks interaction until dismissed, celebrates global or mastery achievements, and previews requirements for the next level.

### 5.5 Reusable UI Components

- **Flashcard Carousel** shared between Lesson Lobby and Activity Summary to reinforce recognition.
- **Mascot component** adapts to pre-roll, round feedback, mute interactions, level-up, offline, and profile surfaces.
- **Navbar variants** unify navigation affordances (logo, mute, offline, back/menu) while adjusting layout contextually.
- **Offline indicator & sync status** display across Hub surfaces and offline pages, reinforcing reliability of progress preservation.
- **Favorites & mastery indicators** appear wherever word items surface, keeping tracking consistent.

### 5.6 Localization Strategy

- Default supported interface languages are English (default) and Spanish; future languages ship as content overlays after localized packs reach parity.
- URLs follow `/<lang>/<targetLang>` pattern (e.g., `/en/ka`, `/es/ka`).
- UI strings localize using a server-provided translation provider keyed by `lang`. English assets serve as fallback for untranslated strings.
- Content packs localize per `targetLang`, overlaying native-language translations on shared target-language items. If a native-language pack lacks a word, the system falls back to the English overlay while retaining the item.
- Language preference persists in `localStorage`/`IndexedDB`; returning users are redirected client-side when their saved language differs from the current route, with an override option exposed on the splash screen.
- First-time visitors stay on the default `/en/ka` route, while deep links respect the shared URL and only perform client redirects when the target page is already cached offline.
- User progress is keyed by target language and shared across native-language overlays; switching from Spanish UI to English retains mastered letters/words.
- Unsupported combinations render a static `UnsupportedLanguagePage` with links to supported pairs and optional `noindex` metadata.

### 5.7 Content Strategy
- Focus on high-utility language: alphabet mastery, greetings, politeness phrases, counting, and survival vocabulary that international residents need immediately.
- Keep modules homogeneous (letters-only or words-only) while enabling short lessons so learners feel progress quickly.
- Author content in structured JSON packs; reuse target-language media across native-language overlays to minimize duplication and cost.
- Layer Georgian cultural context into imagery, example sentences, and audio so vocabulary reflects real Georgian life.
- Support partial localization: native-language overlays can omit words not yet translated; UI falls back to English text while preserving items and progress.
- Document editorial standards (tone, transliteration rules, audio quality) in the backoffice roadmap to sustain quality as packs scale beyond MVP.

### 5.8 Additional Surfaces
- Offline page mirrors Hub dock and shows cached availability + sync status so users trust that progress persists.
- Profile page provides account management, language selection (native + target), and progress summaries; switching native language immediately updates UI strings while preserving mastered item counts.
- Search page opens full-screen search with filters (letters vs words, mastery state) and integrates favorites.
- Favorites view surfaces starred words, allowing quick repetition and progress review.

---

## 6. Learning System Specification

### 6.1 Purpose & Scope
Deliver structured content for **native → target** language pairs optimized for **offline-first learning apps**.

**MVP pack contents**
- **Metadata** — pack-level info and versioning.
- **Letters** — Georgian alphabet entries with pronunciation aids.
- **Words** — ~20 high-impact vocabulary items with context sentences.
- **Modules** — themed collections (alphabet vs vocabulary).
- **Lessons** — curated subsets (4–6 items) to drive repetition.

Assets (images, audio) are shared across all packs. Runtime concepts (groups, games) are generated dynamically and are not stored in the pack.

### 6.2 Data Model

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
- `letters` and `words` use dictionaries for constant-time lookup.
- `modules` and `lessons` stay as ordered arrays to preserve author intent.
- Overlays add `label_native`, `usage_native`, `sentence_native` per `lang`; missing fields fall back to English overlay.
- Activities are generated at runtime rather than stored in packs.

### 6.3 MVP Content Pack Scope

- Letters: Full Georgian alphabet with target-script names, transliteration, audio, and usage hints. Localized overlays supply native-language usage; missing overlays fall back to English.
- Words: ~20 launch words covering greetings (`hello`, `goodbye`), politeness (`please`, `thank you`), essentials (`water`, `bathroom`, `bus`, `market`), numbers (1–3), and common verbs.
- Modules: Distinct areas for alphabet and vocabulary. Vocabulary modules are small (6–8 items) to reinforce mastery; future packs can expand counts gradually.
- Lessons: 4–6 items, balanced by skill or theme, mixing letters or words only within their module type. Recommended lessons rotate between letter and word practice to stabilize retention.
- Overlays: Additional native languages reuse the same `modules`/`lessons` item IDs. If a specific word lacks localization, the UI surfaces English text while keeping the item active so progress continuity persists.
- Content pack manifest enumerates available overlays per native language; client uses this to determine where fallbacks apply.

### 6.4 User Progress Tracking

The tracking system stores activity deltas locally to remain offline-first and decoupled from gamification rules, enabling flexible mastery and level calculations that work even when users do not connect for extended periods.

#### 6.4.1 Stored Metrics

**Per device delta counters:**
- Letter wins and losses (per item)
- Total time spent learning (per session aggregate)
- Days played (set of YYYY-MM-DD values)
- Last synced markers per device

**Global user stats (computed from counters):**
- Total activities played
- Total time spent
- Total activities completed (>50% rounds correct)
- Item mastery (binary, derived)
- User global level (derived)
- Native-language overlay usage (for analytics only; progress remains tied to target language)

#### 6.4.2 Delta Counters & Storage

- Activity is tracked as additive deltas rather than immutable raw logs.
- IndexedDB persists local deltas and the device-generated identifier used for reconciliation.
- Delta merges are idempotent; replays or retries do not inflate totals.
- Counters are keyed by `targetLang` so switching native languages keeps mastered letters/words intact.

#### 6.4.3 Sync & Consolidation

- Local deltas persist offline indefinitely; consolidation occurs when uploads succeed.
- When online, the client batches `{item_id, delta, device_id}` records to a Supabase Postgres function that merges them in a single transaction and returns updated totals when required.
- After a successful sync, the client clears the acknowledged deltas while retaining the running counters.
- Sync attempts fire every 5 minutes by default; the interval is feature-flagged for future tuning and automatically retries after failures without losing unsynced deltas.

#### 6.4.4 Anonymous vs Registered Users

- Anonymous users operate entirely on-device using the generated device ID.
- On login/signup, users can optionally merge their anonymous deltas into the account; the server consolidates them and replies with the unified counters.
- Declining the merge starts the account with fresh counters without touching the anonymous profile stored locally.
- When users change native-language overlays, the client sends the same counters; the server neither resets nor duplicates progress.

#### 6.4.5 Analytics Queue

- Behavioral analytics events share the same offline-first philosophy: a PostHog-bound queue stored in IndexedDB drains only after consent and connectivity are both present.
- Analytics consent is independent from activity tracking; declining analytics keeps counters functional.
- Overlay switches emit a `ui_language_changed` analytics event (with consent) to monitor localization adoption; no activity data is tied to this event.
- Each analytics payload receives a UUID; the server deduplicates acknowledgements and the queue retries automatically until acknowledgement succeeds.

### 6.5 Gamification
- Item mastery is binary: letters typically require 3–5 wins; words 5–8 wins. Modules and lessons stay homogeneous (letters-only or words-only) so thresholds remain consistent.
- Extra wins beyond the threshold do not change mastery status, and mastery cannot be lost.
- Global levels emphasize early alphabet mastery before vocabulary expansion.

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

- Modules and lessons inherit progress from their items; mastery completes once all contained items meet thresholds.
- Optional points or visual rewards can layer on top without altering mastery or level logic.
- Recommended mode surfaces the next lesson based on lowest mastery; free mode exposes full mastery metrics for manual exploration.
- Global streaks use device-local time with a 15-minute post-midnight grace window to avoid accidental resets.

### 6.6 Analytics (PostHog)

#### 6.6.1 Purpose

Track **user acquisition, engagement, and funnels** for app usage analysis. Analytics is separate from user progress tracking and requires user consent.

**Key principle**: **User progress is separate from analytics.** Analytics is optional and respects user consent; progress tracking is necessary for offline-first functionality.

#### 6.6.2 Event Categories

1. **Acquisition**  
   - `landing_page_view`
   - `privacy_page_view`
   - `faq_page_view`

2. **Activation / Engagement**  
   - `app_home_opened`
   - `lesson_selected`
   - `activity_started`
   - `activity_completed`
   - `ui_language_changed`
   - `native_language_fallback_shown`

3. **Retention / Business Metrics**  
   - `item_mastered` (behavioral analytics only; progress system remains canonical and drives recommended mode)
   - `level_mastered` (optional; mostly for dashboards)
   - `favorite_toggled`
   - Funnels (landing → app → lesson → game)

#### 6.6.3 Offline Handling

- Events queued locally if offline
- Sent to PostHog when connection is available
- Similar to Supabase activity sync; reuse entry UUIDs to avoid duplicate sends on retries

#### 6.6.4 Anonymous Users

- Device has a **client-generated ID** reused across analytics and progress for optional linking
- No personal data is tracked until consent
- If user consents to linking after login/signup:
  - Merge previous anonymous events with account
  - If no consent: keep anonymous events separate

#### 6.6.5 Consent & Privacy

- **Consent is required** before sending any analytics events
- Consent is **per user, per device**
- Users can refuse analytics and still use the app normally
- A simple **informative banner** explaining how to stop tracking is acceptable practice
- GDPR / privacy compliance:
  - Do not track personal data without consent
  - Provide options for deletion/export of data
  - Anonymous usage can be tracked only with device ID (non-personal)

#### 6.6.6 Data Deletion & Export

- **Supabase:** delete or export raw progress data
- **PostHog:** deletion/export per user or device may be required for GDPR
- Export format: e.g., JSON or CSV containing progress/events
- Deletion: ensure both Supabase and PostHog data are removed if requested

#### 6.6.7 Event Handling Flow

1. User completes game → triggers `onGameCompleted`.
2. Increment local delta counters in IndexedDB (wins/losses, time, days played) scoped to the device ID.
3. If user is logged in and the sync interval has elapsed, batch `{item_id, delta, device_id}` payloads to the Supabase Postgres function; clear acknowledged deltas on success.
4. If analytics consent is given, enqueue PostHog events locally; drain the queue when connectivity resumes.
5. Compute mastery/levels at runtime from merged counters; **never store computed fields**.

### 6.7 Content Pack Management & Versioning

- Manifest tracks pack version, assets version, and overlay versions per `lang`; clients compare to local cache for updates.
- Items are immutable; new letters/words append to dictionaries. Overlays may add localized text independently.
- Asset URLs embed version segments, enabling service worker to prefetch new media while expiring old cache entries safely.
- Release flow:
  - Publish updated manifest + overlay diffs to CDN.
  - Notify users in-app; allow manual download or defer until on Wi-Fi.
  - Trigger ISR revalidation via Next.js tags so marketing/app pages reflect new content version indicator.
- MVP release ships alphabet + ~20 words; subsequent drops expand vocabulary modules and overlay coverage without altering the base schema.

---

## 7. Technology & Delivery

### 7.1 Technology Philosophy
- **Free-tier first**: Lean on managed service free tiers; avoid bespoke infrastructure.
- **Serverless core**: Next.js on Vercel, Supabase functions, and managed queues reduce ops overhead.
- **Offline-first design**: Local storage is canonical until sync completes.
- **Localization aware**: Deliver overlays and fallbacks without runtime branching costs.
- **Cost optimization**: Cache aggressively, batch network calls, and reuse assets to stay within quotas.
- **Reliability focus**: Layer monitoring (Sentry, New Relic) and quota observability to catch regressions early.

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
- **Local Storage / IndexedDB**: Primary store for offline-first functionality and overlay fallbacks.
- **Supabase**: 
  - Main database for user progress, favorites, and preferences.
  - Authentication (Google, Facebook).
  - Edge functions handle delta merges and analytics webhooks.
- **Content Packs & Assets**:
  - Manifest + overlay metadata downloaded on install/update; stored in IndexedDB with version stamps.
  - Assets cached via Cache Storage during install/update passes; service worker replays caching loop to recover evicted files.
  - Manifest version bump triggers in-app prompt and optional background download on Wi-Fi.
  - Example asset URL: `https://assets.kartuli.app/en-ka/images/letter_a.svg?v=1`
  - Example content pack manifest: `https://content.kartuli.app/en-ka/master.json?v=1`

#### Analytics & Monitoring
- **PostHog**: User behavior analytics (with consent) including overlay fallback events.
- **Sentry**: Error tracking and performance monitoring.
- **New Relic**: Application performance monitoring and uptime tracking.

#### CDN & Communication
- **Cloudflare**: 
  - CDN for static assets and content delivery; `assets.kartuli.app` proxies Supabase storage for media, while `content.kartuli.app` serves manifests and content packs from public GitHub-backed storage so each origin stays isolated but follows identical caching policies.
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

- Next.js `app` directory uses `/<lang>/<targetLang>` pattern; root layout is pass-through. Locale layout renders `<html lang>` and wraps children in translation provider after validating supported pairs.
- `next.config.js` defines static redirect from `/` to `/en/ka`. `generateStaticParams` prebuilds supported pairs, with ISR handling content version bumps. ISR pages are served cache-first; users see cached HTML until a reload or new service worker activation fetches the latest render from Vercel via stale-while-revalidate.
- Route groups organize surfaces:
  - `(marketing)` → InfoLayout pages (`landing`, `terms`, `privacy`, `faq`, `contact`).
  - `[lang]/[targetLang]/(hub)` → HubLayout (`page`, `profile`, `favorites`, `search`, `offline`).
  - `[lang]/[targetLang]/(learning)` → LearningLayout (`lesson/[slug]`) and ImmersionLayout (`lesson/[slug]/play`, `summary`, `level-up`).
- Offline fallback page lives under HubLayout so dock/navigation remain accessible when connectivity drops.
- Service worker intercepts navigation to serve cached shell + IndexedDB data; unsupported requests route to offline page with retry CTA.

### 7.4 Data Flow Architecture

**User Progress Flow**
1. **IndexedDB Delta Counters** → Store per-item wins/losses, time, streak data keyed by `targetLang`.
2. **Delta Batching** → Accumulate additive deltas until sync interval or connectivity returns.
3. **Supabase Merge** → Edge function merges `{item_id, delta, targetLang, device_id}` atomically and returns updated aggregates.
4. **Overlay Adjustments** → When native-language overlay changes, client reuses same counters; no server mutation required.
5. **PostHog Analytics** → Queue consented events locally; flush when online.

**Authentication Flow**
1. **Anonymous Users** → Local storage only with client-generated ID.
2. **Social Login** → Supabase Auth (Google, Facebook).
3. **Data Linking** → Optional merge of anonymous deltas/events into account; users can decline.

**Content Delivery**
1. **Manifest + Overlays** → Cloudflare CDN, cached via service worker.
2. **App Code** → Vercel deployment with Next.js PWA + server components.
3. **Database** → Supabase for user data, favorites, and progress deltas.

**Monitoring & Analytics**
1. **Sentry** → Error tracking.
2. **New Relic** → Performance + uptime.
3. **PostHog** → Engagement analytics (consent-based); overlays tracked via fallback events.

### 7.5 Offline Storage & PWA Strategy

- IndexedDB stores content pack manifests, user counters/deltas, analytics queues, favorites, preferences, and auth tokens. It offers strong persistence even across long offline periods.
- Cache Storage holds media assets (letters, later words) and application shell resources. The service worker proactively caches required assets and retries failed downloads to surface progress to the user. New service worker deployments automatically clear outdated page caches while preserving versioned asset caches so repeat visits stay fast without re-downloading stable media.
- Cache eviction is browser-dependent. The app replays the caching loop when it detects missing assets, keeping gameplay functional. If IndexedDB quota is exceeded during a content pack install the user sees a notification with retry guidance; smaller write failures during normal play are handled silently and retried later.
- Dynamic pages (modules, lessons, games) render from cached shell plus IndexedDB data; static marketing/legal pages are cached directly for offline reading.
- Add-to-home-screen, fullscreen mode, and optional background update flows follow PWA best practices without compromising the offline-first requirement.

### 7.6 Storage Estimates

- Letters-only MVP: ~1 MB metadata + <1 MB media (WebP images + short audio) → well within mobile constraints.
- Updated MVP (letters + ~200 foundational words with imagery/audio): ~18 MB total (≈4 MB metadata + 7 MB imagery + 7 MB audio) assuming versioned caching and reuse across overlays.
- Larger packs (letters + 1000 words): ~58 MB total; still feasible across modern iOS/Android devices.
- Assets use WebP for imagery and short optimized audio (<2s) to minimize footprint. Versioned file names maintain cache integrity during service worker upgrades.

### 7.7 Development Conventions
We follow Conventional Commits with domain scopes (e.g., `docs(ui)`, `feat(content)`). TypeScript, ESLint, and Prettier are mandatory for new code. Husky pre-commit hooks run lint/format checks. Feature flags rely on environment-based configuration to keep bundles lean.

### 7.8 Consent Management

- Two independent consent toggles: offline storage (content + assets) and analytics tracking.
- Banner defaults to minimal mode; users explicitly opt into analytics. Declining offline storage limits bulk content download but allows minimal gameplay.
- Provide easy access to consent settings from Profile and during onboarding.
- Legal stance: Georgia jurisdiction; GDPR compliance with opt-in, clear revocation, data export, and deletion pathways.

### Tracking & Gamification (summary)
- Offline-first tracking stores raw activity per item, per game, and globally.
- Consolidation keeps storage small while enabling mastery calculations.
- Mastery thresholds sit at 3–5 wins for letters and 5–8 wins for words.
- Levels emphasize alphabet mastery before vocabulary growth.
- Optional visual rewards can overlay without changing core logic.

---

## 8. To Discuss
- **Content tooling & localization pipeline**: Define the backoffice workflow for authoring packs, approving overlays, and rolling out partial translations without regressions.
- **Beta research loop**: Pick target communities, feedback tooling, and qualitative interview cadence for the MVP pilot.
- **Marketing & comms playbook**: Align on brand identity, social handles, guerrilla tactics, and messaging guardrails consistent with the free-forever promise.
- **Support operations**: Establish contact channels, help center tooling, SLAs, and escalation paths for user issues.
- **Legal & compliance**: Finalize privacy/terms copy, analytics consent language, data export/deletion process, and affiliate disclosures.
- **Accessibility & QA readiness**: Plan device/browser matrix, assistive tech audits, and performance budgets ahead of launch; testing, accessibility audits, and cross-device/browser coverage remain planned and will be scheduled ahead of the MVP beta.
- **Reliability & incident response**: Set monitoring thresholds, on-call responsibilities, and rollback procedures for production incidents.

## 9. Change Log
- **2025-10-03**: Merged comprehensive UI/UX, layout, localization fallback, cross-language progress, and technology updates from `kartuli updates.md`. Refined open questions and removed obsolete references.
- **2025-10-01**: Added letters-only MVP scope, delta counter sync architecture, consent updates, and offline/PWA strategy consolidation from `updates.md`.
- **2025-09-28**: Consolidated documentation from `docs.md`, `landing-ux-and-redirect-strategy.md`, and `learning-system.md`.