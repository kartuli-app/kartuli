# Mission Vision

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

# Business Strategy

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

# Glossary

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
- **Content Pack Manifest**: Versioned index describing available master packs and native content packs, used by the client to determine downloads and fallbacks
- **Assets**: Media files (images, audio) shared per target language, referenced by items across the content system
- **Resources**: Links to learning content outside of the kartuli project: books, schools, forums, courses...

### Game Terms
- **Lesson Lobby**: Room with flashcards to learn or review the lesson items; flashcards display mastery and favorite status for each item; games are launched from here
- **Lesson Game**: Dynamic game generated for a lesson, uses the lesson items to create 5 to 20 minigame rounds; finishing a game will update the student activity registry
- **Minigame**: Round for a game with a question and multiple answer options, can be won if the answer is right or failed if the answer is wrong
- **Student activity**: Single record that accumulates wins and fails per item and time spent playing

### Gamification Terms
- **Progress**: Information computed (not stored) from student activity
- **Mastery Threshold**: Naumber of wins to mark an item as mastered (letters ≈ 3–5, words ≈ 5–8)
- **Mastered item**: Binary status indicating whether an item has met the mastery threshold
- **Student Level**: Progress tier determined by total mastered items, emphasizing early alphabet completion

### Analytics Terms
- **Analytics**: Optional student behavior tracking for app usage analysis, separate from activity and gamification
- **Analytics Consent**: Student permission required before sending any analytics events to external services
- **Event Categories**: Grouped analytics events (Acquisition, Activation/Engagement, Retention/Business Metrics)
- **Funnel Analysis**: Tracking student progression through key app flows (landing → app → lesson → game)
- **Anonymous Analytics**: Device-level tracking without personal data, using client-generated ID only
- **Data Export**: Student's right to receive their tracked data in portable format (JSON/CSV)
- **Data Deletion**: Student's right to have their tracked data permanently removed from all systems

### Features
- **Offline Capability**: Ability to learn without internet connection
- **Installation**: Download and persist the learning content in the device, for offline usage
- **Update**: Update the installed learning content when new content is released
- **Sync**: Synchronization of student progress between devices for registered students


---

# Roadmap

### Roadmap Maintenance Strategy

This document explains how the roadmap relates to GitHub Projects and when to update each.

#### Roadmap vs GitHub Projects
- **Roadmap**: High-level phases, milestones, and strategic direction
- **GitHub Projects**: Detailed issue tracking, task management, and active work

#### When to Update Roadmap
- Major phase completions
- New phases added to future planning
- Strategic direction changes
- Milestone achievements

#### When to Use GitHub Projects
- Active development work
- Bug tracking
- Feature implementation tasks
- Sprint planning

#### Maintenance Workflow
1. Use GitHub Projects for active work and detailed task management
2. Update roadmap when phases complete or new phases are planned
3. Keep roadmap focused on high-level strategy, not implementation details
4. Manual updates are sufficient - no complex automation needed


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

# Learning System

### Learning System Architecture Overview

The learning system is designed around offline-first functionality with optional synchronization, supporting both anonymous and registered users while maintaining cost efficiency.

#### Key Design Principles
- **Offline-first**: Local storage is canonical until sync completes
- **Anonymous by default**: No account required to start learning
- **Optional sync**: Registered users can sync progress across devices
- **Cost-optimized**: Designed to minimize infrastructure costs
- **Content-pack based**: Modular content delivery system

#### System Components
- **Content Packs**: Versioned content delivery system
- **Progress Tracking**: Local-first progress tracking with optional sync
- **Gamification**: Mastery-based progression system
- **Analytics**: Optional user behavior tracking with consent
- **Content Management**: Versioning and update system


### Data Model

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
  - `sentence_native` *(provided via native content packs; fallback to English)*

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
- **title_native** — display title in native language; fallback to English content pack
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
- Native content packs add `label_native`, `usage_native`, `sentence_native` per `lang`; missing fields fall back to English content pack
- Games are generated at runtime rather than stored in packs


### MVP Content Pack Scope

- Letters: Full Georgian alphabet with target-script names, transliteration, audio, and usage hints. Native content packs supply native-language usage; missing content packs fall back to English
- Words: ~20 launch words covering greetings (`hello`, `goodbye`), politeness (`please`, `thank you`), essentials (`water`, `bathroom`, `bus`, `market`), numbers (1–3), and common verbs
- Modules: Distinct areas for alphabet and vocabulary; vocabulary modules are small (6–8 items) to reinforce mastery; future packs can expand counts gradually
- Lessons: 4–6 items, balanced by skill or theme, mixing letters or words only within their module type; recommended lessons are generated by the recommendation algorithm
- Native content packs: Additional native languages reuse the same `modules`/`lessons` item IDs. If a specific word lacks localization, the UI surfaces English text while keeping the item active so progress continuity persists
- Content pack manifest enumerates available native content packs per native language; client uses this to determine where fallbacks apply


### Student Progress Tracking

The tracking system stores student activity deltas locally to remain offline-first and decoupled from gamification rules, enabling flexible mastery and level calculations that work even when students do not connect for extended periods

Gamification is computed from student activity

#### Stored Metrics

**Per device delta counters:**
- Letter wins and fails (per item)
- Total time spent learning (per session aggregate)

**Global user stats (computed from counters):**
- Total time spent
- Item mastery (binary, derived)
- User global level (derived)

#### Delta Counters & Storage

- Activity is tracked as additive deltas rather than immutable raw logs
- IndexedDB persists local deltas and the `device_id`, a client-generated identifier created once and reused for both activity reconciliation and analytics until the user clears data or logs out
- Delta merges are idempotent; replays or retries do not inflate totals
- Counters are keyed by `targetLang` so switching native languages keeps mastered letters/words intact

#### Sync Loop
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

#### Anonymous vs Registered Users

- Anonymous users operate entirely on-device using the generated device ID
- On login/signup, students can optionally merge their anonymous deltas into the account; the server consolidates them and replies with the unified counters
- Declining the merge starts the account with fresh counters, deleting the anonymous not synced activity stored locally

#### Analytics Queue

- Analytics events follow the same offline-first principles; see section `6.5` for queue behavior and consent requirements


### Gamification System

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


### Analytics (PostHog)

#### Purpose

Track **student acquisition, engagement, and funnels** for app usage analysis. Analytics is separate from student progress tracking and requires student consent

**Key principle**: **Student activity and gamification is separate from analytics.** Analytics is optional and respects student consent; activity tracking is necessary for offline-first functionality

#### Event Categories

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

#### Offline Handling

- Events queue locally if offline
- Sent to analytics provider when connection is available

#### Anonymous Users

- Device has a **client-generated ID** (`device_id`) reused across analytics and activity reconciliation for optional linking
- No personal data is tracked until consent
- If student consents to linking analytics after login/signup: merge previous anonymous events with the account
- If student does not consent to linking: keep anonymous events separate

#### Consent & Privacy

- **Consent is required** before sending any analytics events
- Consent is **per user, per device**
- Students can refuse analytics and still use the app normally
- A simple **informative banner** explaining how to stop tracking is acceptable practice
- GDPR / privacy compliance:
  - Do not track personal data without consent
  - Provide options for deletion/export of data
  - Anonymous usage can be tracked only with device ID (non-personal)

#### Data Deletion & Export

- **activity:** delete or export raw progress data
- **analytics:** deletion/export per user or device may be required for GDPR
- Export format: e.g., JSON or CSV containing progress/events
- Deletion: ensure both activity and analytics data are removed if requested

#### Event Handling Flow

On game completion the client updates activity counters and (if allowed) queues analytics events before scheduling the next sync/flush

1. Student completes game → triggers `onGameCompleted`
2. Increment local delta counters in IndexedDB (wins/losses, time, days played) scoped to the device ID (see `6.3.2`)
3. If the student is logged in and the sync interval has elapsed, push to the server (see `6.3.3`)
4. If analytics consent is given, enqueue PostHog events locally; drain the queue when connectivity resumes (see `6.5.3`)
5. Compute mastery/levels at runtime from merged counters; **never store computed fields**


### Content Pack Management & Versioning

- Manifest tracks pack version, assets version, and native content pack versions per `lang`; clients compare to local cache for updates
- Items are immutable; new letters/words append to dictionaries. Native content packs may add localized text independently
- Asset URLs embed version segments, enabling service worker to prefetch new media while expiring old cache entries safely
- Release flow:
  - Publish updated manifest + native content pack diffs to CDN
  - Notify students in-app; allow manual download or defer until on Wi-Fi
  - Trigger ISR revalidation via Next.js tags so marketing/app pages reflect new content version indicator
- MVP release ships alphabet + ~20 words; subsequent drops expand vocabulary modules and native content pack coverage without altering the base schema


---

# Product

## Shared

### Guiding Decisions

- Preserve the free-forever promise: no premium tiers, ads, or paywalls
- Ensure accessibility with WCAG-compliant colors, focus states, and screen reader support; Georgian-friendly typography

## Game Client

### Game Client UX Decisions

**Core UX Principles**
- Avoid friction
- Start learning immediately after the landing CTA; no account creation required
- Treat English (`en`) native content pack as canonical; additional native languages inherit progress and gracefully fall back to English content when selected native content is not available

**Game-Specific Design Decisions**
- Immediate learning access without barriers
- Anonymous-first approach with optional account creation
- Progress continuity across language switches
- Offline-first experience design



### Pages & Navigation Map

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
  - Navbar includes back arrow (modal to confirm exiting the game), time spent, current round and total rounds (3/10), and mute toggle

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


### Per Page Details

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
- Game flow: pre-roll countdown (3-2-1), rounds with question/answers/mascot feedback, round result modal highlighting correctness, optional mastery/favorite animations, tap to advance
- Game Summary reuses the carousel to review each round with green/red indicators and proposes next recommended activity, Hub return, or replay
- Level-up modal blocks interaction until dismissed, celebrates global or mastery achievements, and previews requirements for the next level


### Content Strategy
- Focus on high-utility language: alphabet mastery, greetings, politeness phrases, counting, and survival vocabulary that international residents need immediately
- Keep modules homogeneous (letters-only or words-only) while enabling short lessons so learners feel progress quickly
- Author content in structured JSON packs; reuse target-language media across native language packs to minimize duplication and cost
- Layer Georgian cultural context into imagery, example sentences, and audio so vocabulary reflects real Georgian life
- Support partial localization: native content packs can omit words not yet translated; UI falls back to English text while preserving items and progress
- Document editorial standards (tone, transliteration rules, audio quality) in the backoffice roadmap to sustain quality as packs scale beyond MVP


### Localization Strategy

- Default canonical language is English
- URLs follow `/<lang>/<targetLang>` pattern (e.g., `/en/ka`, `/es/ka`)
- UI strings localize using a server-provided translation provider keyed by `lang`; English assets serve as fallback for untranslated strings
- Content packs localize per `targetLang`, layering native-language translations on shared target-language items; if a native-language pack lacks a word, the system falls back to the English content while retaining the item
- Language preference persists in `localStorage`/`IndexedDB`; returning students are redirected client-side when their saved language differs from the current route, with an override option exposed on the redirect screen
- First-time visitors stay on the default `/en/ka` route, while deep links respect the shared URL
- User progress is keyed by target language and shared across native content packs; switching from Spanish UI to English retains mastered letters/words
- Unsupported combinations render a static `UnsupportedLanguagePage` with links to supported pairs and optional `noindex` metadata


### Native Language Redirect Flow
- Root path `/` permanently redirects to `/en/ka` (landing) via static Next.js redirect handled at the CDN/edge; no runtime cost
- When a student changes the native language, the selected language is stored on the device
- Info pages:
  - When a student visits a page with a different native language than the selected one, show a small non-intrusive banner that suggests visiting the selected language version of the current page
  - Students can dismiss the banner
- App pages:
  - When a student visits an app page with a different native language than the selected one, show a redirect modal that informs about the redirection to the selected language and performs the redirect after three seconds
  - Students can cancel the suggested redirect to keep the current native language


### Consent Management

- Two independent consent toggles: passive offline storage (store visited content to visit offline even if not installed) and analytics tracking
- Banner includes each toggle pre-checked to yes, accept button to confirm the choice, link to privacy page
- Legal stance: Georgia jurisdiction; GDPR compliance with opt-in, clear revocation, data export, and deletion pathways



## Backoffice

---

# Technology

## Shared

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


### Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages and PR titles.

#### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic change)
- `refactor` - Code refactoring (no feature change or bug fix)
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Infrastructure, tooling, dependencies, non-feature work

#### Scopes

Scopes identify which part of the monorepo is affected:

- `game-client` - Game client application
- `backoffice-client` - Backoffice client application
- `ui` - UI package
- `storybook` - Storybook tool
- `e2e` - E2E testing
- No scope - For global changes affecting multiple parts or the entire repository

#### Examples

**With scope:**
```
feat(game-client): add user authentication system
fix(ui): resolve button alignment on mobile
docs(storybook): update component documentation
chore(e2e): upgrade Playwright to v1.40
test(ui): add unit tests for Button component
```

**Without scope (global changes):**
```
feat: add monorepo structure
docs: update README
chore: configure ESLint for workspace
```

**With body and footer:**
```
feat(game-client): add offline sync capability

Implements delta merging for progress data when coming back online.
Uses last-write-wins strategy with timestamp comparison.

Closes #123
```

#### Rules

1. **Type and description are required**
2. **Scope is optional but recommended**
3. **Use lowercase** for type and scope
4. **Use present tense** in description ("add" not "added")
5. **No period** at the end of description
6. **Keep description under 72 characters**
7. **PR titles must follow this format** for changelog generation

### Code Style

#### General Principles

- Use TypeScript for all new code
- Follow the ESLint configuration
- Use Prettier for code formatting (configuration in workspace)
- Write meaningful variable and function names
- Prefer functional programming patterns where appropriate

#### Testing

- Test files live next to the file they are testing (no separate test folders)
- Maintain test coverage above 80%
- Use descriptive test names that explain the scenario
- Test both happy path and edge cases
- Use the test utilities from `@kartuli/test-utils`

#### File Naming

- Components: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`, `apiClient.ts`)
- Tests: Same name with `.test` or `.spec` suffix (e.g., `Button.test.tsx`)
- Constants: UPPER_SNAKE_CASE in dedicated files (e.g., `API_ENDPOINTS.ts`)

#### Import Order

1. External dependencies (React, third-party libs)
2. Internal packages (from workspace)
3. Relative imports from parent directories
4. Relative imports from same directory
5. Type imports (if not inlined)

Example:
```typescript
import { useState } from 'react';
import { Button } from '@kartuli/ui';
import { formatDate } from '../../utils/formatDate';
import { UserCard } from './UserCard';
import type { User } from './types';
```

### Documentation Hierarchy Maintenance

Our documentation uses a nested structure with README files at multiple levels. **It is critical** to update all relevant READMEs when adding, removing, or updating documentation files.

#### README Hierarchy

```
/docs/
├── README.md                           (Root - lists all major sections)
├── 07-technology/
│   ├── README.md                       (Parent - lists all technology docs)
│   └── 01-shared/
│       ├── README.md                   (Folder - lists shared tech docs)
│       ├── 01-guiding-decisions.md
│       ├── 02-infrastructure.md
│       ├── 03-development-conventions.md
│       └── 04-github-workflow.md
```

#### When Adding a Document

**Example**: Adding `/docs/07-technology/01-shared/05-deployment.md`

1. ✅ Create the document with proper numbering
2. ✅ Update `/docs/07-technology/01-shared/README.md` - Add link in the folder's README
3. ✅ Update `/docs/07-technology/README.md` - Add link in the parent README
4. ✅ Update `/docs/README.md` - Only if adding a new top-level section
5. ✅ Verify links work from root to the new document

#### When Renaming a Document

**Example**: Renaming `04-github-workflow.md` to `04-collaboration-workflow.md`

1. ✅ Rename the file
2. ✅ Update link in `/docs/07-technology/01-shared/README.md`
3. ✅ Update link in `/docs/07-technology/README.md`
4. ✅ Search for cross-references in other documents and update them
5. ✅ Verify all links still work

#### When Deleting a Document

**Example**: Removing `/docs/07-technology/01-shared/04-github-workflow.md`

1. ✅ Delete the file
2. ✅ Remove link from `/docs/07-technology/01-shared/README.md`
3. ✅ Remove link from `/docs/07-technology/README.md`
4. ✅ Search for cross-references in other documents
5. ✅ Remove or update those cross-references
6. ✅ Verify no broken links remain

#### When Reordering Documents

**Example**: Swapping order of two documents in a folder

1. ✅ Rename files to new numbers (e.g., `03-*.md` ↔ `04-*.md`)
2. ✅ Update all affected README.md files with new order
3. ✅ Update any cross-references that mention document numbers
4. ✅ Maintain logical flow within the folder

#### Quick Checklist

For **any** documentation change, always verify:

- [ ] Immediate folder's `README.md` updated
- [ ] Parent folder's `README.md` updated (if nested)
- [ ] Root `/docs/README.md` updated (if needed)
- [ ] Cross-references in other docs updated (for renames/deletes)
- [ ] All links tested from root to leaf
- [ ] Zero-padded numbering maintained (01, 02, 03...)
- [ ] Logical order preserved

#### Why This Matters

Breaking documentation links frustrates contributors and makes the project harder to navigate. By maintaining the README hierarchy at all levels, we ensure:

- **Discoverability**: Documentation is easy to find
- **Navigation**: Clear paths from root to any document
- **Reliability**: No broken links
- **Professional**: Well-organized, maintained project


### GitHub Workflow

This document describes how we use GitHub for collaboration, issue tracking, and release management.

## Issues and Pull Requests

### Creating Issues

All work should start with a GitHub issue. Use our issue template to ensure consistency:

1. Navigate to **Issues** → **New Issue**
2. Select **Feature or Task** template
3. Fill out all required sections:
   - **Type**: Select one (feat, chore, fix, docs, test)
   - **Scope**: Select applicable scope(s) (game-client, backoffice-client, ui, storybook, e2e, global)
   - **Description**: Clearly describe what needs to be done
   - **Acceptance Criteria**: List specific conditions for completion
4. Optionally add:
   - **Size**: Estimate effort (small/medium/large)
   - **Priority**: Set priority level (high/medium/low)
   - **Extra Tags**: Mark as `good first issue` or `help wanted` if appropriate

### Creating Pull Requests

#### From an Issue (Recommended)
The recommended approach is to create a PR directly from an issue:

1. Navigate to the issue
2. Click **"Create a branch"** in the right sidebar (or **"Development"** section)
3. This creates a linked branch and helps GitHub auto-link the PR to the issue

#### Manual PR Creation
If creating a PR manually:

1. Create your feature branch locally
2. Make your changes following our coding standards
3. Push your branch to GitHub
4. Create a pull request using our PR template
5. **Important**: Link to the issue using keywords in the PR description:
   - `Closes #123` - Closes the issue when PR is merged
   - `Fixes #456` - Same as `Closes`
   - `Resolves #789` - Same as `Closes`

#### PR Title Format
PR titles **must** follow conventional commit format for proper changelog generation.

See [Development Conventions](03-development-conventions.md#conventional-commits) for the complete specification.

**Quick examples**:
- `feat(game-client): add user authentication system`
- `fix(ui): resolve button alignment on mobile`
- `docs: update contributing guidelines`
- `chore(e2e): upgrade Playwright to v1.40`

### Label Propagation

When you create a PR from an issue or link it properly using keywords (`Closes #123`), our automation will:
- Automatically copy labels from the issue to the PR
- This helps maintain consistent labeling across issues and PRs

## Labels Structure

Our repository uses a structured labeling system to organize and categorize work.

### Scope Labels (Blue - `#0075ca`)
Define which part of the monorepo is affected:

- `scope:game-client` - Game client application
- `scope:backoffice-client` - Backoffice client application
- `scope:ui` - UI package
- `scope:storybook` - Storybook tool
- `scope:e2e` - E2E testing
- `scope:global` - Shared packages or general repository tasks

### Type Labels (Green - `#28a745`)
Aligned with conventional commit types:

- `type:feat` - New feature
- `type:chore` - Infrastructure, setup tasks, non-feature work
- `type:fix` - Bug fix
- `type:docs` - Documentation changes
- `type:test` - Testing-related changes

### Priority Labels (Red/Orange/Yellow)
Indicate urgency and importance:

- `priority:high` (Red - `#d73a4a`) - Urgent, blocking issues
- `priority:medium` (Orange - `#ff9800`) - Important, should be addressed soon
- `priority:low` (Yellow - `#ffd700`) - Nice to have, can wait

### Size Labels (Purple - `#9c27b0`)
Estimate the effort required:

- `size:small` - Quick fix, minor change (< 2 hours)
- `size:medium` - Moderate effort (2-8 hours)
- `size:large` - Significant work (> 8 hours)

### Extra Labels
Special purpose labels:

- `good first issue` (Purple - `#7057ff`) - Suitable for newcomers
- `help wanted` (Teal - `#008672`) - Community help is appreciated

### Applying Labels

**On Issues**: Apply labels when creating or updating issues. Required labels are Type and Scope.

**On PRs**: Labels are automatically propagated from linked issues. You can also add labels manually if needed.

## Linking Issues and PRs

### Automatic Linking
GitHub supports several methods to link PRs to issues:

1. **Using the GitHub UI**: Click "Create a branch" or "Development" section on an issue
2. **Using keywords in PR description**: `Closes #123`, `Fixes #456`, `Resolves #789`
3. **Using the PR sidebar**: Select linked issues in the "Development" section

### Closing Issues Automatically
When you use keywords like `Closes #123` in your PR description, GitHub will:
- Link the PR to issue #123
- Automatically close issue #123 when the PR is merged
- Add a reference in the issue timeline

### Multiple Issues
If your PR addresses multiple issues:
```
Closes #123
Closes #456
Fixes #789
```

## Versioning and Milestones

### Monorepo Versioning Strategy

Kartuli uses a monorepo structure with internal package dependencies. Our versioning approach:

- **Packages** (`/packages/*`): Consumed internally by apps and tools
- **Apps** (`/apps/*`): Consumer-facing applications (game-client, backoffice-client)
- **Tools** (`/tools/*`): Development and testing tools (storybook, e2e)

### Internal Versioning
- Packages are versioned internally but not published to npm
- Apps consume packages via workspace references
- Builds and deployments are triggered when package dependencies change
- We track versions in `package.json` files for dependency management

### Milestones for Release Planning
We use GitHub Milestones to track releases and feature sets:

1. **Creating Milestones**: Milestones represent planned releases or feature groups
2. **Assigning Issues**: Add issues to milestones during planning
3. **Tracking Progress**: Milestones show completion percentage
4. **Release Notes**: When a milestone is complete, we use it to generate release notes

### Conventional Commits for Changelog
We use conventional commit format to automatically generate changelogs:
- `feat:` - New features appear in release notes
- `fix:` - Bug fixes appear in release notes
- `chore:`, `docs:`, `test:` - Usually excluded from user-facing changelog

See [Development Conventions](03-development-conventions.md#conventional-commits) for complete commit format specification.

## GitHub Actions

### Syncing Labels to GitHub

Labels are defined in `.github/labels.yml`. To sync them with GitHub:

1. Navigate to **Actions** tab
2. Select **"Sync Labels"** workflow
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait for completion (usually < 30 seconds)

**When to sync**:
- After adding new labels to `.github/labels.yml`
- After modifying label names, colors, or descriptions
- When setting up a new repository

**Note**: The sync action uses `delete-other-labels: false`, meaning it won't delete labels created manually in GitHub.

### Automatic Label Propagation

The **"Propagate Labels from Issue to PR"** workflow runs automatically when:
- A new pull request is created
- The PR description contains issue keywords (`Closes #123`, `Fixes #456`, etc.)

This workflow:
1. Extracts the linked issue number from the PR description
2. Fetches labels from that issue
3. Applies the same labels to the PR

No manual action required - it runs automatically!

## Templates

### Issue Template
Located at `.github/ISSUE_TEMPLATE/feature_or_task.md`

Single comprehensive template for all issues (features, bugs, tasks, documentation).

**Required fields**:
- Type (feat, chore, fix, docs, test)
- Scope (game-client, backoffice-client, ui, storybook, e2e, global)
- Description
- Acceptance Criteria

**Optional fields**:
- Size estimate
- Priority level
- Extra tags (good first issue, help wanted)
- Notes and references

### Pull Request Template
Located at `.github/pull_request_template.md`

Standard template for all pull requests.

**Required sections**:
- Description
- Linked issues (using `Closes #` keywords)
- Type selection
- Scope selection

**Optional sections**:
- Screenshots
- Preview links
- Testing notes

**Important**: PR title must follow conventional commit format.



## Game Client

### Application Architecture & Routing

- Next.js `app` directory uses `/<lang>/<targetLang>` pattern; root layout is pass-through. Locale layout renders `<html lang>` and wraps children in translation provider after validating supported pairs
- `next.config.js` defines static redirect from `/` to `/en/ka`. `generateStaticParams` prebuilds supported pairs, with ISR handling content version bumps; ISR pages are served cache-first; students see cached HTML until a reload or new service worker activation fetches the latest render from Vercel via stale-while-revalidate
- Route groups organize surfaces:
  - `(marketing)` → InfoLayout pages (`landing`, `terms`, `privacy`, `faq`, `contact`)
  - `[lang]/[targetLang]/(hub)` → HubLayout (`page`, `profile`, `favorites`, `search`, `offline`)
  - `[lang]/[targetLang]/(learning)` → LearningLayout (`lesson/[slug]`) and ImmersionLayout (`lesson/[slug]/play`, `summary`, `level-up`)
- Offline fallback page lives under HubLayout so dock/navigation remain accessible when connectivity drops
- Service worker intercepts navigation to serve cached shell + IndexedDB data; unsupported requests route to offline page with retry CTA


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


### Offline Storage & PWA Strategy

- IndexedDB stores content pack manifests, user counters/deltas, analytics queues, favorites, preferences, and auth tokens; it offers strong persistence even across long offline periods
- Cache Storage holds media assets (letters, later words) and application shell resources; the service worker proactively caches required assets and retries failed downloads to surface progress to the user; new service worker deployments automatically clear outdated page caches while preserving versioned asset caches so repeat visits stay fast without re-downloading stable media;
- Cache eviction is browser-dependent; The app replays the caching loop when it detects missing assets, keeping gameplay functional; If IndexedDB quota is exceeded during a content pack install the user sees a notification with retry guidance; smaller write failures during normal play are handled silently and retried later
- Dynamic pages (modules, lessons, games) render from cached shell plus IndexedDB data; static marketing/legal pages are cached directly for offline reading
- Add-to-home-screen, fullscreen mode, and optional background update flows follow PWA best practices without compromising the offline-first requirement


### Storage Estimates

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


## Backoffice

---

# To Discuss

### To Discuss
- **Content tooling & localization pipeline**: Define the backoffice workflow for authoring packs, approving native content packs, and rolling out partial translations without regressions
- **Beta research loop**: Pick target communities, feedback tooling, and qualitative interview cadence for the MVP pilot
- **Marketing & comms playbook**: Align on brand identity, social handles, guerrilla tactics, and messaging guardrails consistent with the free-forever promise
- **Support operations**: Establish contact channels, help center tooling, SLAs, and escalation paths for user issues
- **Legal & compliance**: Finalize privacy/terms copy, analytics consent language, data export/deletion process, and affiliate disclosures
- **Accessibility & QA readiness**: Plan device/browser matrix, assistive tech audits, and performance budgets ahead of launch; testing, accessibility audits, and cross-device/browser coverage remain planned and will be scheduled ahead of the MVP beta
- **Reliability & incident response**: Set monitoring thresholds, on-call responsibilities, and rollback procedures for production incidents


---

