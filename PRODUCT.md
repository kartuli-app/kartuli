# Product Documentation Master

This file is the root product source of truth for implementation-facing work on `kartuli.app`.

It owns the stable product model and points to the focused companion docs that own routing, screens, UI system rules, and time-scoped planning.

## Documentation contract

### Audience

- Developers implementing product work
- AI assistants helping with implementation, planning, and review

### Authority map

- [PRODUCT.md](PRODUCT.md)
  - Owns product definition, promise, principles, glossary, localization, brand/tone, learning-content model, sound model, privacy/storage/analytics policy, student-activity model, and mastery-tracking direction
- [product-documentation/routing-and-flows.md](product-documentation/routing-and-flows.md)
  - Owns information architecture, routing model, route notation, route catalog, metadata/indexability by route, route-state families, navigation model, and high-level flows
- [product-documentation/screens.md](product-documentation/screens.md)
  - Owns the screen contract template, route-screen catalog, and Play flow-screen specifications
- [product-documentation/ui-system.md](product-documentation/ui-system.md)
  - Owns reusable UI rules, anatomy, overlay families, preview-grid rules, design-system roles, responsive rules, component families, and global UI surfaces
- [product-documentation/roadmap-and-decisions.md](product-documentation/roadmap-and-decisions.md)
  - Owns MVP scope, future work, candidate routes/pages, backlog, and reduced decision history
- [DESIGN.md](DESIGN.md)
  - Owns no product truth; it is a short assistant guide derived from the authoritative docs above

### What this file must not do

- It must not duplicate the route catalog, screen catalog, or UI component catalog as full prose.
- It must not hold roadmap, backlog, or decision-history detail beyond short links.
- It must not hide unresolved product questions in a generic appendix. Open questions must live in the owning companion doc.

### Cross-document rules

- A canonical rule lives in exactly one document.
- Other documents may summarize that rule in one sentence and link back to the owner.
- Route-level navigation targets live in `routing-and-flows.md`.
- Screen-level structure, content, and actions live in `screens.md`.
- Reusable visual/system rules live in `ui-system.md`.

## Status vocabulary

Use only these status labels in the product docs:

- `Current MVP`
  - Committed current behavior or scope for the implementation-facing product model
- `Confirmed`
  - Stable cross-cutting product truth that is not tied to a release boundary
- `Post-MVP`
  - Intended future behavior that is not part of the current MVP
- `Candidate`
  - A possible future direction that is intentionally not committed yet
- `Open question`
  - A decision that still needs to be made and must stay visible in the owning doc

## Terminology normalization

- `module review set`
  - The product-model term for the generated study/play resource built from one module
- `Full review`
  - The user-facing label for a module review set
- `selected study-resource surface`
  - The product term for the contextual surface that appears after choosing a lesson or module review set in a module browser screen
- `selected-resource-drawer`
  - The UI component family name for that surface in the UI system
- `global not found`
  - The recovery state for URLs that do not match a controlled route pattern
- `resource unavailable`
  - The recovery state for valid controlled routes that cannot load the lesson or module review set they need

## Product overview

### Product definition

`kartuli.app` is a Georgian language learning app where students practice through short lessons and simple games.

### Core promise

When a student has a few free minutes, the app should help them feel:

**"I practiced some Georgian."**

### Product principles

- `Confirmed`: clear structure comes before stylistic flourish
- `Confirmed`: practice sessions stay short and usable
- `Current MVP`: learning is lesson-based and game-backed
- `Current MVP`: students choose what to practice through manual Explore
- `Post-MVP`: Recommended may become a second way to choose what to practice later
- `Confirmed`: the product is mobile-first, with desktop support extending the same structure

## Product model

### Glossary

#### Public section

- `Confirmed`: the information-facing part of the product
- Current public page: `/{locale}/privacy`

#### App section

- `Confirmed`: the learning-side part of the product
- Current top-level destinations: Learn, Translit, Settings

#### Learn

- `Confirmed`: the main learning area
- `Current MVP`: Learn resolves into manual Explore
- `Post-MVP`: Learn may later include Recommended as a separate entry mode

#### Explore

- `Current MVP`: manual lesson selection inside Learn

#### Recommended

- `Post-MVP`: guided lesson selection based on activity

#### Study

- `Confirmed`: the preview/review stage before Play
- `Confirmed`: Study is optional; it does not gate Play

#### Play

- `Confirmed`: the active game stage for one study resource

#### Game

- `Confirmed`: a Play session generated from one study resource
- `Current MVP`: Game structure is `Game Lobby -> Game Round -> Game Round Feedback -> Game Results`
- `Current MVP`: one session has one active round at a time
- `Current MVP`: the only format family is `single-choice`
- `Current MVP`: the round answer contract is 4 answers with 1 correct answer

#### Translit

- `Current MVP`: a utility route for Georgian <-> Latin transliteration

#### Settings

- `Current MVP`: a utility route for language, sound, privacy, and about

#### Failure states

- `Confirmed`: global not found and resource unavailable are separate concepts

### Modeling hierarchy

- `Confirmed`: use this hierarchy when modeling product behavior

`Route -> Page -> Screen / Flow screen -> UI state`

### Localization

- `Current MVP`: supported locales are English (`en`) and Russian (`ru`)
- `Current MVP`: default locale is English (`en`)
- `Confirmed`: localized public and app routes use the `/{locale}/...` pattern
- `Confirmed`: `/` is the non-localized locale-resolution route

### Brand, mascot, and tone

- `Confirmed`: brand name is `kartuli.app`
- `Confirmed`: the primary mascot is a Georgian dog illustration
- `Confirmed`: the mascot is the main recurring personality layer across the product
- `Confirmed`: voice stays clear, warm, encouraging, and lightly playful
- `Current MVP`: copy stays short and easy to scan
- `Confirmed`: low-content and recovery states should use the mascot and brand to avoid feeling generic

## Learning-content model

### Alphabet

- `Current MVP`: letters are a first-class learning content type
- Supported fields:
  - Georgian script
  - transliteration
  - pronunciation hint

### Vocabulary

- `Current MVP`: words and phrases are a first-class learning content type
- Supported fields:
  - Georgian script
  - transliteration
  - translation

### Grammar

- `Post-MVP`: grammar/rule items depend on the vocabulary model and are not yet fully defined

### Lessons

- `Confirmed`: a lesson is the user-facing unit the student can choose, study, and play

### Modules

- `Confirmed`: a module is a set of lessons
- `Current MVP`: vocabulary is explicitly module-based
- `Confirmed`: modules may also own a generated module review set

### Module review set

- `Confirmed`: a module review set is a generated study/play resource built from all items in one module
- `Confirmed`: it is derived from one authored module
- `Confirmed`: duplicate items are removed by first occurrence
- `Confirmed`: item order follows lesson order first, then item order inside each lesson
- `Confirmed`: it is not an authored lesson, but it is still a first-class study/play resource with dedicated Study and Play routes
- `Confirmed`: when a full resource title is needed, use `{module name}: Full review`

## Student activity and mastery

### Student activity

- `Current MVP`: item-level activity tracking exists
- Current tracked fact:
  - item view count
- `Confirmed`: low-level facts are intentionally simple so richer derived behavior can evolve later

### Mastery tracking

- `Candidate`: richer mastery interpretation can be derived from low-level activity later
- Candidate concepts:
  - viewed
  - practiced
  - needs review
  - strong
  - mastered

## Sound and preference model

### Global sound preference

- `Confirmed`: sound is a global app-level client-side preference
- States:
  - `enabled`
  - `disabled`
- `Current MVP`: first-time default is `enabled`
- `Confirmed`: the preference is persisted client-side
- `Confirmed`: it can be changed from Settings and relevant sound-capable screens
- `Confirmed`: disabling sound suppresses automatic and manual audio playback across browse preview audio, Study audio, and Play audio

### Muted interaction behavior

- `Confirmed`: muted behavior differs between lightweight preview audio and explicit audio controls
- `Current MVP`: alphabet preview audio fails silently when sound is disabled
- `Current MVP`: explicit Study and Play audio controls remain visible and tappable when sound is disabled
- `Current MVP`: muted explicit audio controls explain why playback is unavailable instead of behaving like true disabled controls
- `Confirmed`: turning sound off while audio is playing stops playback immediately

### Listening rounds and sound

- `Confirmed`: global sound and listening rounds are related but not the same concept
- `Current MVP`: global sound disabled defaults newly prepared audio-capable sessions to listening rounds off
- `Current MVP`: the Play Lobby is the last place where listening-round inclusion can change
- `Current MVP`: once a session starts, listening-round inclusion stays fixed until the user returns to the Lobby or leaves the session
- `Current MVP`: changing global sound during an active session affects playback immediately but does not regenerate the prepared round sequence
- Canonical route/screen behavior lives in:
  - [product-documentation/routing-and-flows.md](product-documentation/routing-and-flows.md)
  - [product-documentation/screens.md](product-documentation/screens.md)

### Client-side preference resolution

- `Confirmed`: some stored preferences resolve only after browser runtime is available
- `Confirmed`: unresolved boot-time preference state is not a user-facing preference value
- `Confirmed`: SSR/static output should avoid showing the wrong final sound or privacy state before client resolution
- `Confirmed`: preference-backed UI may render a neutral placeholder until the client resolves the stored value
- `Confirmed`: privacy-banner visibility is decided only after privacy-consent resolution

## Privacy, storage, and analytics

### Core distinction

- `Confirmed`: the product separates essential client-side storage, local learning-state storage, and optional analytics

### Essential client-side storage

- `Confirmed`: preferred UI language is stored client-side
- `Confirmed`: privacy-consent choice is stored client-side
- `Confirmed`: global sound preference is stored client-side
- `Confirmed`: this storage is essential to app behavior and is not controlled by analytics consent

### Local learning-state storage

- `Confirmed`: item activity state is stored locally
- `Confirmed`: anonymous local identifiers may be stored to keep local state coherent
- `Confirmed`: this is app-functionality storage, not optional analytics

### Privacy consent

- `Confirmed`: privacy consent is a global client-side preference
- States:
  - `unknown`
  - `granted`
  - `rejected`
- `Current MVP`: first-time default is `unknown`
- `Confirmed`: consent is persisted client-side
- `Confirmed`: consent can be changed later from Settings
- `Confirmed`: `unknown` is a pre-decision state, not a long-term preference to preserve intentionally

### Analytics behavior

- `Confirmed`: analytics are optional
- `Current MVP`: `unknown` disables analytics until the user makes a choice
- `Current MVP`: `granted` enables analytics
- `Current MVP`: `rejected` disables analytics
- `Current MVP`: there is no cookieless analytics fallback
- `Confirmed`: consent changes affect subsequent analytics behavior only

## Related companion docs

- Route work and page-holder planning:
  - [product-documentation/routing-and-flows.md](product-documentation/routing-and-flows.md)
- Screen implementation:
  - [product-documentation/screens.md](product-documentation/screens.md)
- Storybook and component catalog work:
  - [product-documentation/ui-system.md](product-documentation/ui-system.md)
- Scope planning and future work:
  - [product-documentation/roadmap-and-decisions.md](product-documentation/roadmap-and-decisions.md)
