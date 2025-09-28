# Kartuli - Georgian Language Learning Platform

## Table of Contents
- [1. Mission & Vision](#1-mission--vision)
- [2. Project Roadmap](#2-project-roadmap)
- [3. Business Strategy](#3-business-strategy)
- [4. Glossary](#4-glossary)
- [5. Product Experience](#5-product-experience)
  - [5.1 Core Experience](#51-core-experience)
  - [5.2 Landing Experience & Redirect Strategy](#52-landing-experience--redirect-strategy)
  - [5.3 Content Strategy](#53-content-strategy)
- [6. Learning System Specification](#6-learning-system-specification)
  - [6.1 Purpose](#61-purpose)
  - [6.2 Data Model](#62-data-model)
  - [6.3 Example Content Pack – en-ka v0.1](#63-example-content-pack--en-ka-v01)
  - [6.4 Tracking](#64-tracking)
  - [6.5 Gamification](#65-gamification)
- [7. Technology & Delivery](#7-technology--delivery)

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
- **Multi-language Support**: Add Ukrainian, Russian, Belarusian, Hindi and Spanish language support
- **Additional Social Providers**: Add TikTok, Discord, Twitter, Apple social login options
- **Content Management System**: Build admin backoffice for content management
- **Newsletter Service**: Launch weekly/monthly email newsletters for subscribers
- **Streaming Bot**: Launch Twitch streaming bot that learns Georgian 24/7

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
- **Possible sources of income**: 
 Affiliate partnerships with learning resources (books, courses), learning platforms (online classes) or physical language schools
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
- **Lesson**: A structured learning unit covering specific Georgian language concepts
- **Exercise**: Interactive practice activities within lessons
- **Vocabulary**: Georgian words and phrases with translations
- **Cultural Context**: Georgian cultural information integrated into language learning
- **Content Pack**: Bundled dataset for a native → target language pair, including metadata, letters, words, modules, and lessons
- **Module**: Themed collection of items (letters or words) defined in a content pack
- **Lesson**: Curated subset of module items (4–10) used for structured practice
- **Letter Item**: Alphabet entry with glyph, names, transliteration, media, and usage hints
- **Word Item**: Vocabulary entry with target term, transliteration, media, and example sentences

### Tracking & Gamification Terms
- **Tracking Data**: Raw gameplay records stored locally, including per-item stats, per-game summaries, and global aggregates
- **Correct Round**: Individual gameplay round completed accurately for a given item
- **Incorrect Round**: Individual gameplay round completed inaccurately for a given item
- **Mastery Threshold**: Number of correct rounds required to mark an item as mastered (letters ≈ 3–5, words ≈ 5–8)
- **Item Mastery**: Binary status indicating whether an item has met the mastery threshold
- **Global Level**: Progress tier determined by total mastered items, emphasizing early alphabet completion
- **Assets**: Shared media files (images, audio) referenced by items across content packs

---

## 5. Product Experience

### 5.1 Core Experience

**Core features (MVP)**
- Georgian language lessons and exercises
- Offline support to learn without internet connection
- Anonymous usage by default with optional social login (Google, Facebook for MVP)
- Multi-language interface starting with English
- Mobile-first design optimized for on-the-go learning

**Key product decisions**
- Learners start immediately without registration; social login stays optional
- Progress persists locally with optional cloud sync for registered users
- Offline-first architecture ensures core functionality works without internet
- Free-forever promise: no premium tiers, ads, or content restrictions
- Interface localizes into the learner's native language (English → Ukrainian, Russian, Belarusian, Hindi, Spanish roadmap)

**Applications & Services**
- **Kartuli PWA**: Mobile-first Progressive Web App with offline capability, optimized for iOS, Android, and desktop
- **Admin Backoffice (future)**: Content management system covering lessons, exercises, vocabulary, analytics, and administration
- **Newsletter Service (future)**: Weekly/monthly updates highlighting progress insights, cultural content, and seasonal topics
- **Streaming Bot (future)**: Twitch bot that continuously uses the app to showcase effectiveness and entertain viewers

### 5.2 Landing Experience & Redirect Strategy

**Purpose**
Define the user experience for landing pages, initial app access, and client-side redirects in the Kartuli PWA.

**Page types**
- **Marketing / static**: `/`, `/terms`, `/privacy`, `/faq`
- **App**: `/en-ka/app`, `/en-ka/app/module/[module-slug]`, `/en-ka/app/lesson/[lesson-slug]`, `/en-ka/app/favorites`

**Initial user flow with modal redirect**
1. **Landing page `/`**: Display modal "Redirecting to the app" with a 3-second countdown and a button "No, I want to stay here." If the countdown completes, perform a client-side redirect to `/en-ka/app`.
2. **Landing page `/en-ka`**: Same modal and countdown; redirect to `/en-ka/app` unless cancelled.
3. **App pages**: No modal; users enter the core learning experience immediately.
4. **Static pages (terms, privacy, FAQ)**: No modal and no redirect so informational content remains accessible.

**Query parameter handling**
- Append `?noredirect=true` to `/` or `/en-ka` to disable the modal/redirect for deterministic navigation (e.g., `/en-ka?noredirect=true`).

**SEO & Lighthouse**
- Avoid server-side redirects so landing content remains visible to crawlers.
- Client-side modal redirect maintains Lighthouse scores when meaningful content stays above the fold.
- Optionally skip the countdown for known crawlers to keep metrics stable.
- Mirror content on `/` and `/en-ka` to maintain consistent SEO signals.

**Analytics**
- Modal-triggered navigation is tracked as a client-side event.
- `noredirect` prevents unintended redirects or loops for internal navigation.
- Users retain control over redirects, balancing discoverability for new visitors with speed for returning users.

**Summary**
- Client-side modal redirect only; no automatic server-side redirect
- Landing page `/` remains the SEO anchor
- Countdown balances rapid access and content visibility
- Query parameter provides deterministic control over redirect behavior
- App pages remain unaffected by the modal pattern

### 5.3 Content Strategy
- Emphasize practical, real-world usage for people living in Georgia
- Provide progressive learning paths from basic to advanced
- Integrate Georgian cultural context directly into lessons
- Plan for community-driven content contributions in the future

---

## 6. Learning System Specification

### 6.1 Purpose
Deliver structured content for **native → target** language pairs optimized for **offline-first learning apps**. Each pack contains:
- **Metadata** — pack-level info and versioning
- **Letters** — dictionary of alphabet items
- **Words** — dictionary of vocabulary items
- **Modules** — ordered groups of items by theme
- **Lessons** — curated subsets of items (4–10 items per lesson)

Assets (images, audio) are shared across all packs. Runtime concepts (groups, games) are generated dynamically and are not part of the pack.

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

#### Words
- **id** — stable slug, e.g., `dog`
- **label_native** — native language label, e.g., `dog`
- **term_target** — target script word, e.g., `ძაღლი`
- **transliteration** — Latin transliteration, e.g., `dzaghli`
- **images** — array of image paths
- **audios** — array of audio paths
- **examples** — array of objects with:
  - `sentence_target` — target script sentence
  - `sentence_translit` — optional transliteration
  - `sentence_native` — optional translation

#### Modules
- **id** — slug, e.g., `animals`
- **area** — `"alphabet"` or `"vocabulary"`
- **title_native** — display title in native language
- **title_target** — display title in target language (optional)
- **item_type** — `"letter"` or `"word"`
- **item_ids** — ordered array of item ids

#### Lessons
- **id** — slug, e.g., `pets`
- **module_id** — reference to parent module
- **title_native** — display title in native language
- **title_target** — display title in target language (optional)
- **item_type** — `"letter"` or `"word"`
- **item_ids** — ordered array of 4–10 item ids

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
- Additional gloss fields can be added later without reworking the model
- Groups and games are generated at runtime rather than stored in packs

### 6.3 Example Content Pack – en-ka v0.1

```json
{
  "metadata": {
    "pack_id": "en-ka",
    "version": "0.1",
    "created_at": "2025-09-28T00:00:00Z",
    "language_target": "ka",
    "language_native": "en",
    "assets_version": "1.0",
    "description": "English to Georgian beginner pack"
  },

  "letters": {
    "letter_a": {
      "id": "letter_a",
      "glyph": "ა",
      "name_target": "ანი",
      "name_translit": "ani",
      "label_native": "a",
      "images": ["letters/a.svg"],
      "audios": ["letters/a.mp3"],
      "usage_native": "like 'a' in father"
    },
    "letter_b": {
      "id": "letter_b",
      "glyph": "ბ",
      "name_target": "ბანი",
      "name_translit": "bani",
      "label_native": "b",
      "images": ["letters/b.svg"],
      "audios": ["letters/b.mp3"],
      "usage_native": "like 'b' in boy"
    },
    "letter_g": {
      "id": "letter_g",
      "glyph": "გ",
      "name_target": "განი",
      "name_translit": "gani",
      "label_native": "g",
      "images": ["letters/g.svg"],
      "audios": ["letters/g.mp3"],
      "usage_native": "like 'g' in go"
    }
  },

  "words": {
    "dog": {
      "id": "dog",
      "label_native": "dog",
      "term_target": "ძაღლი",
      "transliteration": "dzaghli",
      "images": ["animals/dog.svg"],
      "audios": ["animals/dog.mp3"],
      "examples": [
        {
          "sentence_target": "ძაღლი კუდს ამოძრავებს",
          "sentence_translit": "dzaghli k'uds amodzravebs",
          "sentence_native": "The dog is wagging its tail."
        }
      ]
    },
    "cat": {
      "id": "cat",
      "label_native": "cat",
      "term_target": "კატა",
      "transliteration": "kata",
      "images": ["animals/cat.svg"],
      "audios": ["animals/cat.mp3"],
      "examples": [
        {
          "sentence_target": "კატა ძინავს",
          "sentence_translit": "kata dzinavs",
          "sentence_native": "The cat is sleeping."
        }
      ]
    },
    "cow": {
      "id": "cow",
      "label_native": "cow",
      "term_target": "ძროხა",
      "transliteration": "dzrokha",
      "images": ["animals/cow.svg"],
      "audios": ["animals/cow.mp3"],
      "examples": [
        {
          "sentence_target": "ძროხა ძოვს ბალახს",
          "sentence_translit": "dzrokha dzovs balakhs",
          "sentence_native": "The cow is eating grass."
        }
      ]
    },
    "january": {
      "id": "january",
      "label_native": "January",
      "term_target": "იანვარი",
      "transliteration": "ianvari",
      "images": ["calendar/january.svg"],
      "audios": ["calendar/january.mp3"],
      "examples": [
        {
          "sentence_target": "იანვარი ზამთარშია",
          "sentence_translit": "ianvari zamt'arshia",
          "sentence_native": "January is in winter."
        }
      ]
    },
    "monday": {
      "id": "monday",
      "label_native": "Monday",
      "term_target": "ორშაბათი",
      "transliteration": "orshabati",
      "images": ["calendar/monday.svg"],
      "audios": ["calendar/monday.mp3"],
      "examples": [
        {
          "sentence_target": "ორშაბათი კვირის პირველი დღეა",
          "sentence_translit": "orshabati kviris pirveli dghea",
          "sentence_native": "Monday is the first day of the week."
        }
      ]
    }
  },

  "modules": [
    {
      "id": "animals",
      "area": "vocabulary",
      "title_native": "Animals",
      "title_target": "ცხოველები",
      "item_type": "word",
      "item_ids": ["dog", "cat", "cow"]
    },
    {
      "id": "calendar",
      "area": "vocabulary",
      "title_native": "Calendar",
      "title_target": "კალენდარი",
      "item_type": "word",
      "item_ids": ["january", "monday"]
    }
  ],

  "lessons": [
    {
      "id": "pets",
      "module_id": "animals",
      "title_native": "Pets",
      "title_target": "შინაური ცხოველები",
      "item_type": "word",
      "item_ids": ["dog", "cat"]
    },
    {
      "id": "farm",
      "module_id": "animals",
      "title_native": "Farm Animals",
      "title_target": "ფერმის ცხოველები",
      "item_type": "word",
      "item_ids": ["cow"]
    },
    {
      "id": "months",
      "module_id": "calendar",
      "title_native": "Months",
      "title_target": "თვეები",
      "item_type": "word",
      "item_ids": ["january"]
    },
    {
      "id": "days_of_week",
      "module_id": "calendar",
      "title_native": "Days of the Week",
      "title_target": "კვირის დღეები",
      "item_type": "word",
      "item_ids": ["monday"]
    }
  ]
}
```

### 6.4 Tracking
The tracking system stores raw user data locally to remain offline-first and decoupled from gamification rules, enabling flexible mastery and level calculations.

**Tracked metrics**
- **Per game (incremental entry)**: Append a record after each session containing:
  - `items`: dictionary keyed by item id, where each value stores the wins and losses earned for that item in the session (e.g., `{ "dog": { "wins": 1, "losses": 0 } }`).
  - `time_spent_learning_in_seconds`: total time spent in that game session.
  - `days_played`: ISO date(s) touched by that session (usually a single day).
- **Consolidated progress**: When incremental entries are merged, maintain running totals for:
  - `items`: dictionary keyed by item id with cumulative `wins` and `losses`.
  - `time_spent_learning_in_seconds`: sum of time across all consolidated sessions.
  - `days_played`: union of all days on which at least one session occurred.
- **Global user stats**: Derived values like total games played, total games won (>50% correct rounds), rolling streaks, etc., computed from the consolidated data.

**Incremental entry example**

```json
{
  "items": {
    "dog": { "wins": 1, "losses": 0 },
    "cat": { "wins": 0, "losses": 1 }
  },
  "time_spent_learning_in_seconds": 180,
  "days_played": ["2025-10-01"]
}
```

(Optional) A client may attach a transient identifier per game/session for debugging, but it is not required and is discarded during consolidation.

**Consolidation**
- When incremental entries exceed a threshold (e.g., 20), merge them into the consolidated store:
  - Sum `wins` and `losses` per item id.
  - Add `time_spent_learning_in_seconds` to the global total.
  - Merge `days_played` arrays (set union, no duplicates).
- After consolidation, delete or archive the incremental entries that were merged.

**Consolidated data example**

```json
{
  "items": {
    "dog": { "wins": 7, "losses": 2 },
    "cat": { "wins": 5, "losses": 4 }
  },
  "time_spent_learning_in_seconds": 960,
  "days_played": ["2025-09-28", "2025-09-30", "2025-10-01"]
}
```

**Notes**
- Only total time per game is tracked; per-item time is derived indirectly if needed but not stored.
- `days_played` is tracked at the session/global level to support streak logic.
- Tracking remains offline-first and can be synced later without altering mastery logic.

### 6.5 Gamification
- Item mastery is binary: letters typically require 3–5 wins; words 5–8 wins.
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

---

## 7. Technology & Delivery

### Technology Philosophy
- Prefer managed solutions and providers whenever possible
- Prioritize serverless architecture to minimize operational overhead and costs
- Continuously optimize infrastructure to delay monetization needs

### Key Requirements
- Offline capability at the core of the experience
- Anonymous usage by default with optional social login
- Local progress storage with optional account sync
- Multi-language support for native languages
- Cost-optimized infrastructure choices

### Development Conventions
We use [Conventional Commits](https://www.conventionalcommits.org/) format for all commits:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Commit types**
- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation-only change
- `style`: change that does not affect code meaning
- `refactor`: code change that neither fixes a bug nor adds a feature
- `perf`: performance improvement
- `test`: add or correct tests
- `chore`: update build process or auxiliary tools

**Examples**
- `docs: add project overview and mission statement`
- `feat(auth): add Google and Facebook social login`
- `fix(pwa): resolve offline sync issue`
- `chore: update dependencies`

### Tracking & Gamification (summary)
- Offline-first tracking stores raw activity per item, per game, and globally
- Consolidation keeps storage small while enabling mastery calculations
- Mastery thresholds sit at 3–5 wins for letters and 5–8 wins for words
- Levels emphasize alphabet mastery before vocabulary growth
- Optional visual rewards can overlay without changing core logic

---

## 8. Change Log
- **2025-09-28**: Consolidated documentation from `docs.md`, `landing-ux-and-redirect-strategy.md`, and `learning-system.md`