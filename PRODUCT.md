# Document rules

This document is the working product source of truth for the Georgian learning app.

It is meant to support:
- product definition
- route and screen planning
- UI planning
- AI-assisted coding
- future iteration

Rules:
- if something is not explicitly confirmed, it should be written as an open question, TODO, or future direction
- this is not a project status report
- this is not a changelog
- time-based scope should live mainly in the Releases section
- screen-specific details should live in Screens
- reusable visual/system decisions should live in UI

# Product overview

## Product definition

A Georgian language learning app where students practice through short lessons and simple games.

## Core promise

When a student has a few free minutes, the app should help them feel:

**"I practiced some Georgian."**

## Product principles:
- clear structure
- short, usable practice sessions
- simple lesson-based learning flow
- students choose what to practice via two ways: explore (manual) or recommended (based on activity)
- product decisions come before visual styling
- focused on mobile users, desktop is supported but not the main focus

# Concepts

## Terminology / glossary

### Public section

The information-facing section of the site/app, distinct from learning-side pages.

Examples of public pages:
- `/{locale}/privacy`

### App section

The learning-side section of the site/app, distinct from public pages.

Examples of app pages:
- `/{locale}/app/learn`
- `/{locale}/app/learn/explore`
- `/{locale}/app/translit`
- `/{locale}/app/settings`

### Learn

The user-facing main learning area.

It includes the Learn entry route and the deeper learning routes and stages inside the learning experience.

### Explore

The manual lesson selection mode inside Learn.

### Recommended

The guided lesson selection mode candidate inside Learn.

### Study

The lesson preview/review stage before Play.

### Play

The active lesson game stage / route-level stage.

Play hosts a Game.

### Game

The playable interaction structure inside the Play stage.

A Game is a session generated from one study resource.

A Game begins at the Game Lobby, then runs through one or more round cycles, and ends at Game Results.

Game structure:
- Game Lobby
- Game Round
- Game Round Feedback
- Game Results

Round loop:
- Game Round -> Game Round Feedback
- repeat until the game is complete
- then continue to Game Results

Direction:
- a session has one active round at a time
- a round is defined by its completion condition, not just by one tap
- each round has:
  - a format family
  - a variant
  - an instruction prompt
  - a cue payload
  - answer payloads
  - a completion rule
  - a feedback rule
- the MVP format family is `single-choice`
- the MVP round contract uses 4 answers with 1 correct answer

### Translit

The utility page for transliterating text between Georgian and Latin scripts in both directions.

### Settings

The utility page for settings.

### Not found

The recovery-oriented screen family used when a route cannot be resolved or a valid route cannot load the resource it needs.

## Localization

- Supported locales: English (`en`) and Russian (`ru`)
- Default locale: English (`en`)
- Localized public and app routes use the `/{locale}/...` pattern
- The root route `/` is a locale-resolution redirect route

## Brand, mascot, and tone

- Brand name: `kartuli.app`
- The primary brand character is a Georgian dog illustration used as the app mascot.
- The mascot is the main recurring personality element across the app.
- The mascot can appear in contextual variants such as teacher mode, glasses, happy success, or sad failure.
- The voice is clear, warm, encouraging, and lightly playful.
- Humor stays small, occasional, and charming. It does not become noisy, childish, or distracting.
- Low-content screens use branding and the mascot to avoid feeling empty or generic.
- MVP copy stays short and easy to scan. Personality comes mostly from the mascot, visual direction, and a small amount of microcopy.

## Metadata, discovery, and sharing

### Metadata model

- Metadata is localized for every supported locale.
- Locale-level metadata exists as the fallback metadata layer.
- Page-specific metadata is used for routes with distinct search intent, sharing value, or route-specific meaning.

### Canonical and alternate URLs

- Indexable localized routes should expose page-aware canonical URLs.
- Indexable localized routes should expose language alternates for supported locales.
- Redirect routes should not be treated as canonical destinations.

### Indexability rule

- Indexability is defined per route in the routes catalog.
- Routes with distinct user-facing value may be indexed.
- Redirect routes use `noindex`.
- Utility-only or transient routes may use `noindex`.

### Metadata scope by route type

- Public page routes use page-specific metadata.
- App routes with clear standalone value use page-specific metadata.
- Route-specific `noindex` decisions are documented in the routes catalog.
- Locale-level metadata remains the fallback when a route-specific layer does not exist yet.

## Product modeling concepts

### Route

A URL-addressable destination in the product model.

A route may resolve to:
- a rendered page
- a redirect
- a not-found state

Examples:
- `/{locale}/privacy`
- `/{locale}/app/learn`
- `/{locale}/app/settings`

### Page

The implementation bound to a route when that route renders UI.

A route may exist without a user-facing page when it is redirect-only.

### Screen

A user-facing interface state presented by a page.

A screen may be:
- the main screen of a page
- a flow screen inside a page flow

### Flow screen

A screen inside a route/page flow that is not directly landable by URL.

Example: game flow screens inside Play:
- Game Lobby screen
- Game Round screen
- Game Round Feedback screen
- Game Results screen

### UI state

A smaller transient state inside a screen.

Examples:
- answer selected
- answer correct
- answer incorrect
- loading next round
- paused
- error

### Modeling rule

Use this hierarchy:

`Route -> Page -> Screen / Flow Step -> UI State`

## Learning content

### Alphabet (letter items)

Letters are a first-class learning content type.

They support:
- native script (e.g. ა, ბ, გ)
- transliteration (e.g. a, b, g)
- pronunciation hint (e.g. /a/, /b/, /g/)

### Vocabulary (word items)

Words are a first-class learning content type.

They support:
- native script (e.g. გამარჯობა, მადლობა)
- transliteration (e.g. gamarjoba, madloba)
- translation (e.g. hello, goodbye)

### Grammar (rule items)

Rules are a second-class learning content type. They need words to be useful.

Rule items modeling is not decided yet because they would require extending the vocabulary module. 

They should support:
- WHEN ... THEN ...

### Lessons

A lesson is the user-facing unit the student chooses, studies, and plays.

### Modules

A module is a set of lessons.

For vocabulary, modules are important and should remain a first-class concept.

Examples:
- Animals (lessons: pets, farm animals, wild animals...)
- Countries (lessons: Related to Georgia, Europe, Asia...)

### Module review set

A module review set is a generated study/play resource built from all items in one module.

Direction:
- it is derived from one authored module
- items are deduplicated by first occurrence
- item order follows lesson order first, then item order inside each lesson
- it is not a fake authored lesson, but it is still a first-class study/play resource with its own review routes

## Student activity

There is activity tracking at item level.

Tracked concept:
- item view count

This is intentionally low-level and supports richer derived behavior later.

## Sound

### Global sound preference

Sound is a global app-level client-side preference.

States:
- `enabled`
- `disabled`

Direction:
- the default state for a first-time user is `enabled`
- the sound preference is persisted client-side
- the sound preference can be changed from any relevant sound-capable screen and from Settings
- when sound is disabled, automatic and manual audio playback is suppressed across catalog preview audio, Study audio, and Play support audio
- when sound is enabled, audio-capable screens may autoplay or expose replay controls according to their own screen rules

### Muted interaction behavior

Muted behavior depends on whether the audio affordance is lightweight preview behavior or an explicit audio control.

Direction:
- lightweight preview audio in the alphabet catalog fails silently when sound is disabled
- explicit audio controls in Study and Play remain visible when sound is disabled
- explicit audio controls affected by mute are not treated as true disabled controls in the MVP
- muted explicit audio controls remain tappable so they can explain why playback is unavailable
- tapping an explicit audio control while sound is disabled shows lightweight feedback such as `Turn sound on to listen`
- turning sound off while audio is currently playing stops that playback immediately

## Client-side preference resolution

Some client-stored preferences must be resolved after the app reaches the browser runtime.

Direction:
- client-stored preferences such as global sound and privacy consent have an internal boot-time resolution state before their persisted value is known
- this internal resolution state is not a user-facing product preference state
- the app should not treat unresolved client preference state as if it were a real resolved preference value
- SSR or static output should avoid showing the wrong final sound or privacy state and then flipping immediately after hydration
- preference-backed controls may render a stable neutral placeholder or non-committed shell until the client resolves the real stored value
- privacy-banner visibility is decided only after the privacy consent preference has been resolved on the client
- once resolved:
  - sound uses its real `enabled` or `disabled` state
  - privacy consent uses its real `unknown`, `granted`, or `rejected` state

## Privacy, storage, and analytics

### Core distinction

The product distinguishes between:
- essential client-side storage needed for app behavior
- local learning-state storage needed for app functionality
- optional analytics

These are related, but they are not the same thing.

### Essential client-side storage

The app always uses a small amount of client-side storage for core app behavior.

Direction:
- preferred UI language is stored client-side
- privacy consent choice is stored client-side
- global sound preference is stored client-side

This storage is considered essential for the app experience and is not controlled by the analytics consent choice.

### Local learning-state storage

The app stores learning-related state locally on the device.

Direction:
- item activity state is stored locally
- anonymous local identifiers are stored to keep local state coherent

This is app functionality storage, not optional analytics.

### Privacy consent

Privacy consent is a global client-side preference with 3 states:
- `unknown`
- `granted`
- `rejected`

Direction:
- default state for a first-time user is `unknown`
- the consent state is persisted client-side
- consent can be updated later from Settings
- `unknown` is a pre-decision state, not a long-term user preference to intentionally keep

### Analytics behavior

Analytics are optional.

Direction:
- when consent is `unknown`, analytics are disabled
- when consent is `granted`, analytics are enabled
- when consent is `rejected`, analytics are disabled
- there is no cookieless analytics fallback

Changing the consent choice affects subsequent analytics behavior only.

### Listening rounds versus global sound

Global sound and listening rounds are related, but they are not the same thing.

Direction:
- global sound being disabled forces listening rounds off for newly prepared sessions
- global sound being enabled allows listening rounds, but the student can still turn listening rounds off in the Play Lobby
- the Play Lobby is the last place where listening-round inclusion can change in the MVP
- once a Play session starts, listening-round inclusion remains fixed until the student returns to the Lobby or ends the session
- toggling global sound during an active Play session affects playback immediately, but it does not change the prepared round sequence

## Mastery tracking

This section is still early.

Direction:
- raw activity facts are stored at low level
- richer interpretation can be derived later

Candidate learning-state concepts:
- viewed
- practiced
- needs review
- strong
- mastered

# Information architecture

## Sections

### App section

The app section is the section of the site/app that is related to learning and practice.

#### App sections

- Learn
  - Explore
  - Study
  - Play
- Translit
- Settings

#### Additional section candidates

- Learn
  - Recommended
- Favorites
- Search (may belong to Explore)
- Progress
- Auth / Profile
- Offline status / installation
- Onboarding

### Public section

The public section is the section of the site/app that is not related to learning.

#### Public sections

- Privacy

#### Additional public page candidates

- Landing page
- Terms

## Routing model

Direction:
- the root route `/` is non-localized
- public routes live under `/{locale}/...`
- app routes live under `/{locale}/app/...`

### Browse routes versus resource routes

Direction:
- browse/discovery routes may encode learning area and grouping
- Study and Play routes encode the resource family and the explicit action
- canonical Study and Play routes do not encode the discovery path that led to them

### Locale canonicalization

Direction:
- unsupported locale values do not produce a dedicated locale-error screen
- when the route intent is recognized and can be normalized, the app redirects to the equivalent route under a supported locale
- when the route intent is not recognized, unsupported locale values fall through to global not-found handling

### Not-found handling

The product uses 2 not-found families:
- global not-found for uncontrolled routes that do not match a controlled route pattern
- route-owned resource unavailable handling for valid routes that cannot load their required resource

Current route-owned unavailable cases:
- Study resource unavailable
- Play resource unavailable

### Route notation

Use route patterns in this document, not framework file-path syntax.

Notation rules:
- use `/` for the non-localized root route
- use `/{locale}/...` for localized route patterns
- use `{paramName}` for dynamic segments such as `{lessonId}`
- use actual URLs only as concrete examples when helpful

Examples:
- route pattern: `/`
- actual URL: `/`
- route pattern: `/{locale}/privacy`
- actual URL: `/en/privacy`
- route pattern: `/{locale}/app/learn/lessons/{lessonId}/study`
- actual URL: `/en/app/learn/lessons/alphabet-intro/study`
- route pattern: `/{locale}/app/learn/modules/{moduleId}/review/study`
- actual URL: `/en/app/learn/modules/alphabet/review/study`

Examples of defined root routes:
- `/`

Examples of defined public routes:
- `/{locale}/privacy`

Examples of app routes:
- `/{locale}/app/learn`
- `/{locale}/app/learn/explore`
- `/{locale}/app/learn/explore/alphabet`
- `/{locale}/app/learn/explore/vocabulary`
- `/{locale}/app/learn/lessons/{lessonId}/study`
- `/{locale}/app/learn/lessons/{lessonId}/play`
- `/{locale}/app/learn/modules/{moduleId}/review/study`
- `/{locale}/app/learn/modules/{moduleId}/review/play`
- `/{locale}/app/translit`
- `/{locale}/app/settings`

## Routes catalog

### Root routes

#### `/`

- Kind: redirect route
- Purpose: resolve the best localized entry URL for the current visitor
- Metadata: `noindex`
- Canonical/share role: not a canonical destination
- Resolution order:
  - preferred locale cookie
  - browser `Accept-Language` header
  - default locale `en`
- Defined behavior:
  - `/` -> `/en/app/learn` when no supported cookie or supported browser language is found
  - `/` -> `/{locale}/app/learn` when a supported locale is resolved
- Future direction:
  - the root route may later choose between a landing route and `/{locale}/app/learn` based on visitor state
- Binding: none

### Public routes

#### `/{locale}/privacy`

- Kind: page route
- Purpose: show the privacy notice
- Section: Public
- Metadata: page-specific metadata
- Linked from: Settings, privacy consent banner
- Standalone entry: yes
- In-app return target: `/{locale}/app/learn`
- Binding: Privacy screen

### App routes

#### `/{locale}/app/learn`

- Kind: redirect route
- Purpose: stable top-level entry route for Learn
- Section: Learn
- Metadata: `noindex`
- Canonical/share role: not a canonical destination
- Defined behavior: redirects to `/{locale}/app/learn/explore`
- Open question: the selection logic between Explore and Recommended is not defined yet
- Binding: none

#### `/{locale}/app/learn/explore`

- Kind: page route
- Purpose: enter manual lesson selection
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Explore entry screen

#### `/{locale}/app/learn/explore/alphabet`

- Kind: page route
- Purpose: browse alphabet lessons
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Alphabet catalog screen

#### `/{locale}/app/learn/explore/vocabulary`

- Kind: page route
- Purpose: browse vocabulary content; currently renders the only authored vocabulary module browser directly
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Vocabulary catalog screen

#### `/{locale}/app/learn/lessons/{lessonId}/study`

- Kind: page route
- Purpose: preview one authored lesson before play
- Section: Learn / Study
- Metadata: lesson-specific metadata
- Canonical/share role: canonical shareable authored lesson Study route
- Unavailable handling: when the lesson cannot be found or loaded, this route shows the Study resource unavailable screen
- Binding: Study screen

#### `/{locale}/app/learn/lessons/{lessonId}/play`

- Kind: page route
- Purpose: host the lesson game
- Section: Learn / Play
- Metadata: `noindex`
- Canonical/share role: not a primary search/share destination
- Unavailable handling: when the lesson cannot be found or loaded, this route shows the Play resource unavailable screen
- Binding: Play screen

#### `/{locale}/app/learn/modules/{moduleId}/review/study`

- Kind: page route
- Purpose: preview the generated review set for one module before play
- Section: Learn / Study
- Metadata: module-specific metadata
- Canonical/share role: canonical shareable module review Study route
- Unavailable handling: when the module review set cannot be found or loaded, this route shows the Study resource unavailable screen
- Binding: Study screen

#### `/{locale}/app/learn/modules/{moduleId}/review/play`

- Kind: page route
- Purpose: host the lesson game for one generated module review set
- Section: Learn / Play
- Metadata: `noindex`
- Canonical/share role: not a primary search/share destination
- Unavailable handling: when the module review set cannot be found or loaded, this route shows the Play resource unavailable screen
- Binding: Play screen

#### `/{locale}/app/translit`

- Kind: page route
- Purpose: access the bidirectional translit utility
- Section: Translit
- Metadata: page-specific metadata
- Binding: Translit screen

#### `/{locale}/app/settings`

- Kind: page route
- Purpose: access global app preferences and app metadata
- Section: Settings
- Metadata: `noindex`
- Canonical/share role: utility route, not a primary search destination
- Binding: Settings screen

### Additional route candidates

These route patterns are referenced in the broader product direction but are not fully defined in the routes catalog yet.

- `/{locale}/landing`
- `/{locale}/terms`
- `/{locale}/app/learn/recommended`
- `/{locale}/app/learn/explore/vocabulary/modules/{moduleId}`
- `/{locale}/app/learn/explore/grammar`
- `/{locale}/app/learn/explore/grammar/modules/{moduleId}`
- `/{locale}/app/learn/sets/{setId}/study`
- `/{locale}/app/learn/sets/{setId}/play`

### Routing states

#### Global not-found state

- Trigger: the requested URL does not match a controlled route pattern after locale handling
- Metadata: `noindex`
- Binding: Not found screen

#### Study resource unavailable state

- Trigger: `/{locale}/app/learn/lessons/{lessonId}/study` or `/{locale}/app/learn/modules/{moduleId}/review/study` matches a valid Study route pattern, but the required resource cannot be found or loaded
- Metadata: `noindex`
- Binding: Study resource unavailable screen

#### Play resource unavailable state

- Trigger: `/{locale}/app/learn/lessons/{lessonId}/play` or `/{locale}/app/learn/modules/{moduleId}/review/play` matches a valid Play route pattern, but the required resource cannot be found or loaded
- Metadata: `noindex`
- Binding: Play resource unavailable screen

## Navigation model

### Top-level destinations

- Learn
- Translit
- Settings

### Redirect routes

- `/` is a locale-resolution redirect route.
- It resolves to `/{locale}/app/learn` using locale detection.
- `/{locale}/app/learn` is a redirect route.
- It exists as the stable top-level entry route for Learn.
- It resolves to `/{locale}/app/learn/explore`.

### Dock membership and visibility

The dock is visible on top-level destinations.

Top-level routes with dock visible:
- Learn entry behavior through `/{locale}/app/learn` resolving to `/{locale}/app/learn/explore`
- `/{locale}/app/translit`
- `/{locale}/app/settings`

Internal / deeper routes with dock hidden:
- `/{locale}/app/learn/explore/alphabet`
- `/{locale}/app/learn/explore/vocabulary`
- `/{locale}/app/learn/lessons/{lessonId}/study`
- `/{locale}/app/learn/lessons/{lessonId}/play`
- `/{locale}/app/learn/modules/{moduleId}/review/study`
- `/{locale}/app/learn/modules/{moduleId}/review/play`

### Back button behavior

- Routes show a back button by default.
- Learn entry behavior does not show a back button.
- Deeper learning routes such as Study show a back button.
- Back button targets are route-specific.
- App-owned back actions use explicit in-product route targets, not raw browser-history navigation.
- Example: `/{locale}/app/learn/explore/alphabet` targets `/{locale}/app/learn/explore`.
- Example: `/{locale}/app/settings` targets `/{locale}/app/learn`.
- Example: `/{locale}/privacy` targets `/{locale}/app/learn` when rendered with an in-app top bar.
- Play uses custom back/exit behavior when needed instead of a normal back pattern.

# Flows

## Learning flows

The main learning flow is:

`Explore or Recommended -> optional Study -> Play -> Repeat`

### Explore flow

Direction:
- the user lands on `/{locale}/app/learn/explore`
- the screen presents the two current learning paths: Alphabet and Vocabulary
- the user chooses one path
- selecting Alphabet navigates to `/{locale}/app/learn/explore/alphabet`
- selecting Vocabulary navigates to `/{locale}/app/learn/explore/vocabulary`

### Study flow

Direction:
- the user opens `/{locale}/app/learn/lessons/{lessonId}/study` or `/{locale}/app/learn/modules/{moduleId}/review/study` from a catalog/browser route or from a direct URL
- Study opens on the summary state by default
- the user can start Play immediately from the summary state
- the user can enter item detail by selecting one item from the summary
- item detail shows one focused item at a time
- previous from the first item returns to the summary
- next is disabled on the last item
- the Play action remains available from both summary and item detail
- current item position is internal Study UI state, not URL state

### Play flow

Play hosts a Game.

Direction:
- entering the Play route opens the Game Lobby for one study resource
- the Lobby prepares a game plan from the current study resource before the student starts
- the Lobby shows:
  - exact round count
  - variant summary
  - whether listening rounds are included
- the Lobby exposes an `Include listening rounds` toggle
- the listening-rounds toggle defaults from the current global sound preference:
  - when global sound is enabled, listening rounds are enabled by default
  - when global sound is disabled, listening rounds are disabled by default
- if global sound is disabled, listening rounds cannot be enabled until sound is enabled again
- changing the listening-rounds setting in the Lobby regenerates the prepared game plan
- once the student starts the session, the listening-rounds setting is fixed for that session in the MVP
- the Game then runs through one or more `Game Round -> Game Round Feedback` cycles and ends at Game Results
- every item in the current study resource should appear at least once as a target in the session
- distractor answers come from the same study resource
- when multiple round variants are available, the session may mix them
- exact coverage weighting and sequencing policies can evolve later without changing the UI contract

## Utility flows

### Change language flow

Direction:
- the user opens Settings
- the user sees the current UI language and the available alternative language options
- selecting a language updates the stored language preference immediately
- the app switches the UI language immediately
- the app navigates to the equivalent localized route
- the updated language preference is used on later visits
- there is no separate confirmation step

### Privacy consent flow

Direction:
- on app init, the app first resolves the stored privacy consent state from client-side storage before deciding whether the banner should appear
- on app init, the app checks the stored privacy consent choice
- if no consent choice exists, the state is treated as `unknown`
- if the state is `unknown`, the app shows a non-dismissible privacy banner
- the banner remains visible until the user explicitly chooses `Accept` or `Reject`
- if the user chooses `Accept`, the consent state becomes `granted`
- if the user chooses `Reject`, the consent state becomes `rejected`
- if the stored state is `granted`, optional analytics start immediately on app init
- if the stored state is `rejected`, optional analytics remain disabled on app init
- the privacy page must be reachable from the banner
- the consent choice can also be reviewed and changed later in Settings

### Translit flow

Direction:
- the user opens `/{locale}/app/translit`
- the user enters or pastes text into the source area
- the page transliterates the source text on every input change
- the transliteration mapping uses the letter-item library
- the user can clear the source text at any time
- the user can switch direction between Georgian -> Latin and Latin -> Georgian
- when direction is switched, the current output becomes the new input
- the output area remains read-only
- the user can copy the output to the clipboard
- the output is segmented by token and whitespace runs
- hovering, focusing, or tapping an output token reveals the matching source token
- token inspection is useful because transliteration is not character-count preserving
- the top bar back action returns to `/{locale}/app/learn`

# Screens

## Screen contract template

Each screen should define:

- Role
- Entry point
- Main user question
- Primary decision
- Layout regions
- Navigation chrome
- Action placement
- Primary actions
- Secondary actions
- What this screen should communicate
- What this screen should not try to do
- Content
- UI direction
- Open questions

## Screens catalog:

### Privacy screen

- Role: Present the privacy notice as readable longform content and explain what storage and analytics behavior the app uses.
- Entry point: Public route `/{locale}/privacy`, reachable from Settings, the privacy consent banner, and direct links.
- Main user question: What does the app store, what does consent control, and where can I read the full privacy notice?
- Primary decision: Read and understand the privacy notice.
- Layout regions:
  - Top bar: required, with back button and short route title.
  - Main area: required, longform content container for the localized privacy document.
- Navigation chrome:
  - Back button target: `/{locale}/app/learn`.
  - No dock.
  - This route may be opened directly, but the app-owned back action still uses an in-product target.
- Action placement:
  - No primary CTA region.
  - Navigation action lives in the top bar.
- Primary actions:
  - Read the privacy notice.
- Secondary actions:
  - Return to Learn through the top bar back action.
- What this screen should communicate:
  - The page is a public legal/information surface.
  - Essential storage and optional analytics are distinct.
  - Consent controls optional analytics only.
- What this screen should not try to do:
  - It should not become a settings editor.
  - It should not replace the privacy consent banner.
  - It should not mix legal content with extra promotional or learning content.
- Content:
  - Top bar title: `Privacy`
  - Main content source:
    - `privacy-en.md`
    - `privacy-ru.md`
  - Markdown content structure:
    - document title / H1: `Privacy Notice`
    - section headings with `h2` / `h3` as needed
    - paragraphs, lists, and links rendered as readable longform content
- UI direction:
  - Use a simple, calm reading layout.
  - Prioritize typography, spacing, and readable line length over decoration.
  - The page can reuse app layout primitives, but it should read like a public legal page rather than a normal app utility surface.

### Not found screen

- Role: Help the user recover when they request a URL that does not map to a controlled route.
- Entry point: Rendered by the routing layer when the requested URL does not match a controlled route pattern after locale handling.
- Main user question: Where should I go now that this page does not exist?
- Primary decision: Return to a safe known destination in the app.
- Layout regions:
  - Top bar: required, with back button and short route title.
  - Main content area with message and recovery actions.
- Navigation chrome:
  - Back button target: `/{locale}/app/learn`.
  - No dock.
- Action placement:
  - Recovery actions live in the main content area.
- Primary actions:
  - Go to Learn.
- Secondary actions:
  - None required for MVP.
- What this screen should communicate:
  - The requested page does not exist.
  - The user can still continue using the app from a safe destination.
- What this screen should not try to do:
  - It should not expose technical routing details.
  - It should not depend on browser-history behavior for recovery.
  - It should not show the raw attempted URL in the MVP UI.
- Content:
  - Top bar title: `Page not found`
  - Clear not-found title.
  - Short explanation.
  - Primary recovery action to Learn.
- UI direction:
  - Keep a calm branded recovery treatment.
  - Prioritize clarity and recovery over clever copy.
  - Avoid a dead-end error-page feeling.

### Study resource unavailable screen

- Role: Explain that the Study route is valid but the requested study resource could not be found or loaded, then help the user recover.
- Entry point: `/{locale}/app/learn/lessons/{lessonId}/study` or `/{locale}/app/learn/modules/{moduleId}/review/study` when the route matches but the study resource is unavailable.
- Main user question: How do I continue if this study resource cannot be opened?
- Primary decision: Return to Learn and choose another lesson.
- Layout regions:
  - Top bar: required, with back button and short route title.
  - Main content area with the unavailable message and recovery action.
- Navigation chrome:
  - Back button target: `/{locale}/app/learn`.
  - No dock.
- Action placement:
  - Recovery action lives in the main content area.
- Primary actions:
  - Go to Learn.
- Secondary actions:
  - Return to Learn through the top bar back action.
- What this screen should communicate:
  - The route format is valid, but this specific study resource could not be shown.
  - The lesson or module review set may not exist or may not be available right now.
- What this screen should not try to do:
  - It should not present itself as a generic global 404.
  - It should not expose raw resource IDs or technical failure details.
- Content:
  - Short unavailable title.
  - Short explanation that the requested study resource could not be found or loaded.
  - Primary recovery action to Learn.
- UI direction:
  - Reuse the normal app reading/action shell.
  - Keep the state calm and recoverable rather than alarming.

### Play resource unavailable screen

- Role: Explain that the Play route is valid but the requested study resource could not be found or loaded, then help the user recover.
- Entry point: `/{locale}/app/learn/lessons/{lessonId}/play` or `/{locale}/app/learn/modules/{moduleId}/review/play` when the route matches but the study resource is unavailable.
- Main user question: How do I continue if this study resource cannot be played?
- Primary decision: Return to Learn and choose another lesson.
- Layout regions:
  - Top bar: required, with back button and short route title.
  - Main content area with the unavailable message and recovery action.
- Navigation chrome:
  - Back button target: `/{locale}/app/learn`.
  - No dock.
- Action placement:
  - Recovery action lives in the main content area.
- Primary actions:
  - Go to Learn.
- Secondary actions:
  - Return to Learn through the top bar back action.
- What this screen should communicate:
  - The route format is valid, but this specific study resource cannot start in Play.
  - The lesson or module review set may not exist or may not be available right now.
- What this screen should not try to do:
  - It should not present itself as a generic global 404.
  - It should not expose raw resource IDs or technical failure details.
- Content:
  - Short unavailable title.
  - Short explanation that the requested study resource could not be found or loaded for Play.
  - Primary recovery action to Learn.
  - The MVP recovery path stays focused on Learn and does not add a secondary Study alternative here.
- UI direction:
  - Reuse the normal app reading/action shell.
  - Keep the state calm and recoverable rather than alarming.

### Explore entry screen

- Role: Act as the top-level manual learning entry screen.
- Entry point: `/{locale}/app/learn` resolving to `/{locale}/app/learn/explore`.
- Main user question: What do I want to learn?
- Primary decision: Choose between Alphabet and Vocabulary.
- Layout regions:
  - A branded header area.
  - A learning choice area with large tappable cards.
- Navigation chrome:
  - No back button.
  - Dock visible.
  - The top bar/header includes branding instead of a back action.
- Action placement:
  - Each learning path is a full-card tap target.
- Primary actions:
  - Open Alphabet catalog.
  - Open Vocabulary catalog.
- Secondary actions:
  - Use the dock to go to Translit.
  - Use the dock to go to Settings.
- What this screen should communicate:
  - This is the app's main learning home in the MVP flow.
  - The student is choosing a learning path, not starting a lesson yet.
  - The app has a friendly branded personality.
- What this screen should not try to do:
  - It does not explain the whole product in detail.
  - It does not mix manual Explore with future Recommended logic.
  - It does not overload the screen with dense copy or secondary actions.
- Content:
  - Header:
    - mascot/logo
    - brand line: `kartuli.app`
    - title: `Explore`
    - support line: `Choose what you want to learn.`
  - Alphabet card:
    - visual: alphabet-focused visual, preferably using Georgian letters and/or the mascot
    - heading: `Alphabet`
    - copy: `Learn Georgian letters step by step.`
  - Vocabulary card:
    - visual: vocabulary-focused visual, preferably using everyday objects, categories, and/or the mascot
    - heading: `Vocabulary`
    - copy: `Learn useful words and phrases by topic.`
- UI direction:
  - The layout is mobile-first.
  - The MVP target is to fit common mobile heights without scroll.
  - Desktop keeps the same composition and scales it up with more space and larger type.
  - Both cards use the same structure and height.
  - The shell remains compatible with a future Explore / Recommended switch.
  - The learning choice area remains compatible with a future third card such as Grammar.

### Module browser screen pattern

- Scope: Shared screen pattern for browsing one authored module, selecting one study resource from it, and launching Study or Play.
- Current variants:
  - Alphabet catalog screen
  - Vocabulary catalog screen
- Future variants:
  - Grammar catalog screen
- Role: Let the student browse the lessons inside one module, browse the generated full-review resource for that module, and choose what to study or play next.
- Entry point:
  - when only one module exists for a learning track, the top-level track route may render this module browser directly
  - when multiple modules exist later, the top-level track route may become a module list and module-specific routes may render this module browser
- Main user question: Which lesson or module review set do I want to work with right now?
- Primary decision: Select one authored lesson or one generated module review set, then continue to Study or Play.
- Layout regions:
  - Top bar: required.
  - Module header: required, showing the current module title.
  - Lessons section: required.
  - Full review section: required, below authored lessons.
  - Selected study-resource surface: required when a resource is selected.
- Navigation chrome:
  - Back button target depends on the parent browse route.
  - No dock.
  - Contextual top-bar actions depend on lesson type; non-audio module browsers do not add preview-audio controls.
- Action placement:
  - Direct interaction inside lesson cards or review cards selects one study resource.
  - The selected study-resource surface contains the progression actions.
- Primary actions:
  - Select one lesson.
  - Select the generated module review set.
  - Open the selected study resource in Study.
  - Open the selected study resource in Play.
- Secondary actions:
  - Return to the parent browse route.
- What this screen should communicate:
  - Modules group authored lessons.
  - Every module also exposes a generated full-review study resource.
  - Card order follows authored lesson order.
  - The selected study-resource surface controls what Study and Play will open.
- What this screen should not try to do:
  - It should not explain module internals in technical terms.
  - It should not turn the selected study-resource surface into an embedded Study experience.
  - It should not require separate confirmation before changing selection.
- Content:
  - Module review behavior:
    - the generated review resource is derived from the current module
    - item order follows authored lesson order first, then item order inside each lesson
    - duplicate items keep their first occurrence and are skipped on later repeats
    - every module browser contains exactly one generated full-review card inside the `Full review` section
    - that generated full-review card does not need its own visible card title in the catalog because the section label already names it
    - when a route or screen needs the full resource title, the generated review lesson uses the pattern `{module name}: Full review`
  - Selection behavior:
    - tapping anywhere on a lesson card selects it
    - tapping any preview asset inside the card also selects it
    - in non-audio module browsers, preview interaction does not add extra behavior beyond selection
  - Selected study-resource surface:
    - no overlay
    - dismissible
    - selecting another resource updates it in place
    - contains only the selected title plus `Study` and `Play`
- UI direction:
  - Multi-card module browser views keep equal card width and height.
  - The generated module review card may be visually distinct, but it still uses the same preview-grid language.
  - The selected study-resource surface is non-modal.
  - The selected study-resource surface can appear as a bottom drawer on smaller viewports and a side surface on larger viewports.

### Alphabet catalog screen

- Role: Let the student browse grouped alphabet content, preview letter audio, and select which alphabet content to study or play next.
- Entry point: `/{locale}/app/learn/explore/alphabet`, reached from the Explore entry screen.
- Main user question: Which alphabet set do I want to work with right now?
- Primary decision: Select one alphabet lesson context, then continue to Study or Play.
- Layout regions:
  - Top bar: required, with back button, a 2-line title, and a sound toggle action.
  - Main area: required, with 2 stacked sections:
    - Lessons
    - Full review
  - Selected lesson surface: contextual and dismissible when a lesson is selected.
- Navigation chrome:
  - Back button target: `/{locale}/app/learn/explore`.
  - Top bar title:
    - line 1: `Explore`
    - line 2: `Alphabet`
  - Top bar contextual action:
    - sound on/off toggle for the global sound preference as it affects alphabet audio preview
- Action placement:
  - Lesson selection starts from direct interaction inside lesson cards.
  - The selected lesson surface contains the progression actions.
- Primary actions:
  - Select one alphabet lesson.
  - Open the selected lesson or module review set in Study.
  - Open the selected lesson or module review set in Play.
- Secondary actions:
  - Return to Explore through the top bar back action.
  - Toggle alphabet audio preview on or off.
- What this screen should communicate:
  - Alphabet practice is available as small focused lessons.
  - Full alphabet review is also available from the same screen.
  - Card order implies progression from earlier to later lessons.
  - Letter interaction can be used as a lightweight rosetta-stone reference behavior.
  - The current selection controls which lesson Study and Play will open.
- What this screen should not try to do:
  - It should not become the dense reference/study surface for the full alphabet.
  - It should not explain module structure in the UI.
  - It should not turn the selected lesson surface into "Study inside the catalog."
- Content:
  - Section heading: `Lessons`
  - Page-level audio helper:
    - when sound is enabled: `Tap any letter to hear the Georgian pronunciation.`
    - when sound is disabled: `Enable sound to hear the Georgian pronunciation.`
  - Current lesson set:
    - `The five vowels`
    - `Sounds you know`
    - `More easy sounds`
    - `Puff and Pop`
    - `The K family`
    - `Hissing sounds`
    - `Buzzing sounds`
  - Chunk lesson card structure:
    - title only
    - compact 1-row preview grid showing all lesson items
    - no subtitle
    - no badge or progress state
    - the whole card is selectable as one lesson context
  - Alphabet preview asset:
    - fixed-width visual slot
    - Georgian letter in large type
    - lined background behind the Georgian letter
    - transliteration below in brackets, smaller and lighter
    - Georgian letter and transliteration are vertically stacked
    - tapping a letter preview asset selects the containing lesson
    - when sound is enabled, tapping a letter preview asset also plays that letter's audio
    - when sound is disabled, tapping a letter preview asset does not show a sound-warning toast
  - Lessons section ordering:
    - sequential by position
    - top to bottom, then left to right
  - Section heading: `Full review`
  - Full review card:
    - does not show its own visible card title in the catalog
    - uses the same preview-grid language as lesson cards
    - includes all alphabet letters
    - uses as many rows as needed
    - does not group the rows visually
    - targets the module review routes, not a fake authored lesson
  - Selected lesson surface:
    - close / dismiss action
    - selected lesson title
    - `Study` action
    - `Play` action
    - no overlay
    - selecting another lesson updates this surface in place
    - dismissing the surface clears the current lesson selection
- UI direction:
  - The layout is mobile-first.
  - Mobile uses 1 lesson card per row.
  - Tablet uses 2 lesson cards per row.
  - Desktop uses 3 lesson cards per row.
  - The full review card sits below the lesson grid.
  - On wider layouts, the full review card spans the available width.
  - Chunk lesson cards should align cleanly in the responsive grid.
  - The full review card should be visually distinct from the chunk lesson cards while keeping the same internal alphabet-item language.
  - The selected lesson surface is non-modal.
  - The selected lesson surface can appear as a bottom drawer on smaller viewports and a side surface on larger viewports.
  - The selected lesson surface must not block changing the current selection.

### Vocabulary catalog screen

- Role: Let the student browse the lessons inside the current vocabulary module, preview the module through a visual grid, and select what to study or play next.
- Entry point: `/{locale}/app/learn/explore/vocabulary`, which currently renders the only authored vocabulary module browser directly.
- Main user question: Which vocabulary set do I want to work with right now?
- Primary decision: Select one vocabulary lesson or the generated module review set, then continue to Study or Play.
- Layout regions:
  - Top bar: required, with back button and a 2-line title.
  - Module header: required, showing the current vocabulary module title.
  - Main area: required, with 2 stacked sections:
    - Lessons
    - Full review
  - Selected study-resource surface: contextual and dismissible when a resource is selected.
- Navigation chrome:
  - Back button target: `/{locale}/app/learn/explore`.
  - Top bar title:
    - line 1: `Explore`
    - line 2: `Vocabulary`
  - No sound toggle.
- Action placement:
  - Lesson and review selection starts from direct interaction inside the cards.
  - The selected study-resource surface contains the progression actions.
- Primary actions:
  - Select one vocabulary lesson.
  - Select the generated module review set.
  - Open the selected study resource in Study.
  - Open the selected study resource in Play.
- Secondary actions:
  - Return to Explore through the top bar back action.
- What this screen should communicate:
  - Vocabulary practice is organized into lessons inside one module.
  - A generated full-review resource exists for the whole module.
  - Lesson order follows authored order.
  - Visual preview assets help the student recognize the lesson quickly without reading dense text.
- What this screen should not try to do:
  - It should not become a dense text-heavy vocabulary table.
  - It should not add preview-audio behavior that belongs to alphabet-specific browsing.
  - It should not turn the selected study-resource surface into embedded Study.
- Content:
  - Current route behavior:
    - `/{locale}/app/learn/explore/vocabulary` currently acts as the module browser for the only authored vocabulary module
    - the current authored vocabulary module title is `Everyday basics`
    - future multiple-module behavior can move the per-module browser to `/{locale}/app/learn/explore/vocabulary/modules/{moduleId}`
  - Section heading: `Lessons`
  - Vocabulary lesson card structure:
    - title only
    - compact preview grid
    - no subtitle
    - no badge or progress state
    - the whole card is selectable as one lesson context
  - Vocabulary preview asset:
    - fixed-size visual slot
    - emoji only for the MVP preview language
    - no text inside the slot
  - Vocabulary preview ordering:
    - preview assets follow first-authored item order
    - when the preview grid does not show every item, the last slot may become an overflow slot such as `+N`
  - Section heading: `Full review`
  - Full review card:
    - does not show its own visible card title in the catalog
    - uses the same preview-grid language as lesson cards
    - represents the generated module review resource
    - follows the generated module review ordering rules from the shared module browser pattern
  - Selected study-resource surface:
    - close / dismiss action
    - selected title
    - `Study` action
    - `Play` action
    - no overlay
    - selecting another resource updates this surface in place
    - dismissing the surface clears the current selection
- UI direction:
  - The screen uses the shared module browser pattern.
  - The layout is mobile-first.
  - Mobile uses 1 lesson card per row.
  - Tablet uses 2 lesson cards per row.
  - Desktop uses 3 lesson cards per row.
  - Multi-card views preserve equal card height and width.
  - The generated full-review card sits below the lesson grid.
  - On wider layouts, the full-review card can span the available width.

### Study screen

- Scope: Route-level container for study resources.
- Role: Let the student preview a study resource, move between summary and item detail, and start Play whenever ready.
- Entry point:
  - `/{locale}/app/learn/lessons/{lessonId}/study`
  - `/{locale}/app/learn/modules/{moduleId}/review/study`
- Main user question: Do I want to review this summary, inspect one item in detail, or start playing now?
- Primary decision: Stay in summary, inspect a specific item, or start Play.
- Layout regions:
  - Top bar: required, for global route controls and lesson context.
  - Study navigation bar: required, for summary/detail navigation inside the lesson.
  - Main area: required, showing either the summary card or one focused detail card.
  - Sticky CTA area: required, with the Play action.
- Navigation chrome:
  - Back button target depends on lesson type and source catalog.
  - For alphabet lessons, back returns to `/{locale}/app/learn/explore/alphabet`.
  - For vocabulary lessons, back returns to `/{locale}/app/learn/explore/vocabulary`.
  - The top bar keeps the lesson title/context visible.
  - Sound toggle is available when the current lesson type may expose item audio in Study.
  - If a specific item has no audio, its detail card simply omits the audio control.
  - No dock.
  - No selected-lesson drawer behavior exists inside Study.
- Action placement:
  - Global route actions live in the top bar.
  - Summary/detail navigation lives in the study navigation bar.
  - Item selection lives inside the summary card.
  - Play is available from a persistent CTA area.
- Primary actions:
  - Open Play immediately.
  - Open one item detail from the summary.
  - Move to the previous or next study position.
- Secondary actions:
  - Return to the summary.
  - Return to the source catalog/browser route.
  - Toggle sound on or off when the lesson type supports audio.
- What this screen should communicate:
  - Study is a preview/review step before Play, but it is optional.
  - The student can stay as long as needed or jump to Play immediately.
  - The study resource has both a summary view and focused item detail views.
  - The same overall Study structure can support different lesson types.
- What this screen should not try to do:
  - It should not force Study before Play.
  - It should not hide lesson context while the student is inside item detail.
  - It should not replace item detail with a second drawer or nested overlay pattern.
  - It should not turn item position into route/URL state for the MVP.
- Content:
  - Shared Study shell:
    - summary state
    - item detail state
    - persistent Play action in both states
  - Study navigation bar:
    - summary/home action
    - previous action
    - current position label
    - next action
    - the shared control order stays stable across devices:
      - summary/home and previous on the leading side
      - current position label centered
      - next on the trailing side
    - in summary state, the position label can show the study resource item count
    - in item detail state, the position label shows the current item index such as `5 / 10`
    - previous from the first item returns to summary
    - next is disabled on the last item
  - Summary state:
    - summary card variant for the current lesson type
    - summary shows all items in the current study resource
    - summary can scroll when needed
    - selecting a summary item opens that item in detail
    - summary item interaction does not play audio directly
  - Item detail state:
    - one focused detail card variant for the current lesson type
    - horizontal swipe between item details is not part of the MVP control model
  - Alphabet summary card:
    - uses the same preview-grid language as the alphabet catalog
    - shows all items in the current study resource
    - summary item interaction opens letter detail without playing audio
  - Letter detail card:
    - Georgian letter
    - transliteration
    - audio playback
    - when sound is disabled, the audio control remains visible and shows lightweight enable-sound feedback on tap
    - pronunciation hint
    - example words with the target letter highlighted
    - optional example-word audio later
  - Vocabulary summary card:
    - is a real Study summary, not just the catalog card repeated
    - shows all items in the current study resource
    - each summary item contains:
      - visual asset
      - Georgian block with the Georgian text first and transliteration below
      - translation
    - summary items may use a more table-like row structure on larger screens and a more stacked structure on smaller screens
  - Word detail card:
    - Georgian block with the Georgian text first and transliteration below
    - translation
    - visual asset
    - audio playback when available for that specific item
    - when sound is disabled, the audio control remains visible and shows lightweight enable-sound feedback on tap
    - example phrase in Georgian only, with the target word or phrase highlighted
    - note area when a note exists for that item
- UI direction:
  - The Study route uses one shared shell across lesson types.
  - Lesson types can swap in different summary card variants and detail card variants without changing the shell.
  - Global route controls and study navigation controls should be visually distinct.
  - The focused item detail view should be able to show all essential item information at once.
  - Vertical scrolling inside summary or detail is acceptable when needed.
  - Summary cards may be richer and more text-forward than catalog preview cards.
  - Vocabulary Study summary should preserve readability across devices even when items are multi-word phrases.
  - A sticky Play CTA is important, especially on mobile.

### Play screen

- Scope: Route-level container for the game flow of one study resource.
- Role: Host the full game flow for one lesson or one module review set.
- Main user question: Am I ready to start this session, how do I answer each round, and what do I want to do when the session ends?
- Primary decision: Start the prepared session, answer the current round, and decide what to do after Results.
- Contains flow screens:
  - Game Lobby
  - Game Round
  - Game Round Feedback
  - Game Results
- Entry point:
  - `/{locale}/app/learn/lessons/{lessonId}/play`
  - `/{locale}/app/learn/modules/{moduleId}/review/play`
  - Student arrives from Study or directly from a browser/catalog route for a specific lesson or module review set.
- Layout regions:
  - Header / top bar region.
  - Main game region that swaps between Lobby, Round, Feedback, and Results.
  - Optional persistent support areas such as answer-state feedback or keyboard hints when useful.
- Navigation chrome:
  - Lobby uses a back-style return path instead of an in-round leave-game action.
  - Active rounds and feedback use a leave-game action rather than a normal back-arrow pattern.
  - Results use exit and replay actions rather than a normal back-arrow pattern.
- Action placement:
  - Lobby actions live in the main game region.
  - Round answer actions live in the answer-options region.
  - Correct feedback auto-progresses after a wait period, with optional skip interaction.
  - Wrong feedback requires explicit acknowledgment before continuing.
  - Results actions live in the results action area.
- Primary actions:
  - Start the prepared session.
  - Answer the active round.
  - Replay the session after Results.
- Secondary actions:
  - Leave Play.
  - Return to Study or Learn after the session.
- Exit points:
  - back to Study
  - replay game
  - go to another lesson / learn area
- What this screen should communicate:
  - Play is the core interactive experience of the app.
  - The session is generated from the chosen study resource before it starts.
  - Only one round is active at a time.
  - Answers resolve immediately and feedback is brief, clear, and fast.
- What this screen should not try to do:
  - It should not feel like a slow worksheet with manual submit/continue steps between every answer.
  - It should not show multiple unresolved questions at once.
  - It should not depend on unfinished long-term weighting policies to define the visible UI structure.
- Content:
  - Session generation:
    - the Lobby prepares the game plan before the student starts
    - the prepared plan includes exact round count, variant summary, and whether listening rounds are included
    - the Lobby can regenerate the prepared plan when the listening-rounds option changes
  - Sound behavior:
    - the Play header keeps one visible sound control/state across Lobby, Round, and Feedback
    - in the Lobby, that control updates the global sound preference immediately
    - during active rounds and feedback, the global sound toggle remains a real toggle
    - toggling global sound during active Play affects playback immediately
    - toggling global sound during active Play does not silently regenerate the prepared round sequence
    - listening-round inclusion remains fixed for the session even when global sound changes
  - Round contract:
    - one active round at a time
    - MVP format family: `single-choice`
    - MVP answer contract:
      - 4 answers
      - 1 correct answer
      - immediate answer submission on selection
    - MVP round states:
      - neutral
      - right
      - wrong
      - disabled
  - MVP single-choice variants:
    - Alphabet:
      - Georgian letter -> transliteration answers
      - transliteration -> Georgian letter answers
      - audio -> Georgian letter answers
    - Vocabulary:
      - English text -> Georgian answers
      - Georgian text -> English answers
      - visual asset -> Georgian answers
  - Feedback behavior:
    - correct feedback uses a short wait period and then auto-advances
    - the correct-feedback wait period can be skipped by the student
    - wrong feedback reveals the correct answer and does not auto-advance in the MVP
    - wrong feedback preserves the selected wrong answer state
    - wrong feedback continues only when the student explicitly acknowledges the correct answer
  - Leave-game behavior:
    - leaving from an active round or feedback state opens a leave-game confirmation surface because the current session progress would be discarded
    - leaving from the Lobby or from Results does not use that confirmation surface
  - Keyboard support:
    - desktop answer bindings use `1`, `2`, `3`, and `4`
    - during feedback, `Space` can continue when continuing is allowed
- UI direction:
  - The Play route should prioritize speed, clarity, and focus over heavy explanation.
  - Correct and wrong answer states should be visually distinct and readable at a glance.
  - The active round should never compete visually with unresolved feedback from a previous round.
  - Keyboard support should feel native on desktop without complicating touch-first interaction patterns.

#### Game Lobby flow screen

- Role: Present the prepared game session clearly, let the student understand what kind of session will run, and start Play with minimal friction.
- Entry point: Entered immediately after the Play route resolves one study resource and prepares its initial game plan.
- Main user question: Am I ready to start this session, and do I want to adjust its listening-rounds setting first?
- Primary decision: Start the prepared session.
- Layout regions:
  - Lobby header: required.
  - Session summary area: required.
  - Session options area: required.
  - Primary action area: required.
- Navigation chrome:
  - A normal back arrow returns to the source Study route.
  - The sound toggle remains visible.
  - The header uses the Play two-line pattern:
    - line 1: `Play`
    - line 2: study resource title
  - For authored lessons, the second line is the lesson name.
  - For module review resources, the second line uses the pattern `{module name}: Full review`.
  - No dock.
- Action placement:
  - Session summary and options live in the main content area.
  - The primary `Start` action is visually dominant and may be sticky on mobile.
  - A secondary `Back to Study` action lives near the primary action rather than in the header.
- Primary actions:
  - Start the prepared session.
- Secondary actions:
  - Back to Study.
  - Return through the header back arrow.
  - Toggle sound.
  - Include or exclude listening rounds.
- What this screen should communicate:
  - The game session is already prepared from the current study resource.
  - The student can understand the session before committing to Start.
  - Listening rounds are an optional part of the session when audio-capable items exist.
  - The Lobby is the last place where the session plan can change in the MVP.
- What this screen should not try to do:
  - It should not become another Study summary.
  - It should not overload the student with detailed item previews.
  - It should not hide the exact round count or make the session feel mysterious before starting.
- Content:
  - Session summary:
    - exact round count
    - explicit but compact variant summary
    - separate indication of whether listening rounds are included
  - Listening rounds option:
    - shown only when the current study resource has audio-capable items
    - defaults from the current global sound preference
    - if global sound is turned off in the Lobby, listening rounds switch off immediately and the prepared plan regenerates
    - if global sound is turned on in the Lobby, listening rounds may default back on and regenerate the prepared plan
    - if listening rounds are off, turning sound on again does not force them back on; the student can still choose whether to include them before starting
  - Resource preview:
    - no additional item preview is required in the Lobby for the MVP
  - Header/title examples:
    - `Play` / `Pets`
    - `Play` / `Alphabet: Full review`
    - `Play` / `Animals: Full review`
- UI direction:
  - The Lobby should feel compact and utilitarian, but still like the start of the core game experience.
  - The exact round count should be easy to notice.
  - The variant summary should be compact enough to scan quickly.
  - The Start action should dominate visually.
  - Desktop keyboard guidance does not need to be shown yet in the Lobby.

#### Game Round flow screen

- Role: Present one active round, keep the player focused on one decision, and accept an immediate answer.
- Entry point: Entered when the next prepared round becomes active after the Lobby or after the previous feedback state finishes.
- Main user question: What is the correct answer for this cue?
- Primary decision: Answer the current round now.
- Layout regions:
  - Round header: required.
  - Cue area: required.
  - Answer area: required.
- Navigation chrome:
  - Leave-game action is visible.
  - Round progress is always visible as a hybrid indicator that combines a progress bar and numeric count.
  - The current sound state/control remains visible.
  - The lesson/module title is hidden during active rounds to keep focus on the round itself.
  - No dock.
- Action placement:
  - Cue-specific controls such as replay live inside the cue area.
  - The instruction prompt sits in or just above the answer area.
  - The 4 answer options live in the answer area.
  - Desktop keyboard hints may appear on the answer options when keyboard bindings are active.
- Primary actions:
  - Answer with one of the 4 options.
  - Replay the cue audio on listening rounds.
- Secondary actions:
  - Leave the session.
- What this screen should communicate:
  - There is only one active round at a time.
  - The round is fast and focused.
  - Answering is immediate; there is no separate submit step.
- What this screen should not try to do:
  - It should not show multiple unresolved questions.
  - It should not keep the lesson title or other non-essential context on screen during the round.
  - It should not require a manual confirm/continue action before answer resolution.
- Content:
  - Shared round structure:
    - one cue area
    - one answer area
    - one generic instruction prompt such as `Tap the right answer`
    - the MVP prompt remains literal text rather than a lighter abstract treatment
  - Cue behavior:
    - the cue area changes by round variant
    - cue payloads may be text, visual asset, or audio
    - listening rounds autoplay once when the round appears
    - listening rounds expose a replay control
    - replay is allowed multiple times before answering
    - if sound is disabled, listening-round autoplay is suppressed
    - if sound is disabled, the replay control remains visible and tappable, and it shows lightweight enable-sound feedback instead of playing audio
    - if cue audio is playing and the student answers, the audio stops immediately
    - if cue audio is playing and the student turns sound off, the audio stops immediately
  - Answer area:
    - always 4 equal answer options in the MVP
    - answer payloads may be Georgian text, transliteration, or English text depending on the variant
    - answer payloads are not images in the MVP
  - Input guard:
    - each new round begins with a short input-guard window before answers become active
    - the purpose of the guard is to prevent accidental carry-over taps and double submission across transitions
    - the initial MVP target for this guard is about `200 ms`
    - once the guard ends, answers become active immediately
  - Input behavior:
    - tapping or pressing a bound key answers immediately
    - there is no separate selected/pre-submit state
    - after an answer is submitted, all answer inputs lock immediately
  - Keyboard support:
    - desktop answer bindings use `1`, `2`, `3`, and `4`
    - those bindings are shown only when active and useful
- UI direction:
  - The round should feel split into 2 clear areas: cue and answers.
  - The answer options should feel equal in importance and size.
  - The progress display should be visible without pulling focus away from the cue.
  - Keyboard support should be additive, not visually noisy.

#### Game Round Feedback flow screen

- Role: Resolve the answered round, teach what happened, and then transition to the next round.
- Entry point: Entered immediately after an answer resolves.
- Main user question: Was I right, and if I was wrong, what was the correct answer?
- Primary decision:
  - on correct: continue immediately or let the short wait finish
  - on wrong: acknowledge the correct answer and continue
- Layout regions:
  - The round header remains visible.
  - The cue area remains visible.
  - The answer area remains visible in feedback state.
  - A lightweight feedback surface such as a toast, floating icon, or emoji may appear above the round content.
- Navigation chrome:
  - Leave-game action remains available.
  - Round progress remains visible.
  - The current sound state/control remains visible.
  - Answer hotkeys are no longer active during feedback.
- Action placement:
  - Correct feedback can be skipped by direct interaction with the feedback surface or safe round area, and by `Space` on desktop.
  - Wrong feedback continues by acknowledging the correct answer area itself, and by `Space` on desktop.
- Primary actions:
  - Continue from feedback.
- Secondary actions:
  - Leave the session.
- What this screen should communicate:
  - Correct answers should feel instant and encouraging.
  - Wrong answers should clearly show what was correct before the game continues.
  - Feedback is part of the learning loop, not just an interruption.
- What this screen should not try to do:
  - It should not show the next round at the same time as unresolved feedback.
  - It should not rely on a big explicit `Skip` button for basic flow.
  - It should not say only `wrong` without showing the correction.
- Content:
  - Feedback surface:
    - lightweight toast-like or floating feedback is acceptable in the MVP
    - the MVP can start with simple icon/emoji treatment and evolve later into richer streak/praise feedback
    - the positive feedback cue should appear as a small global floating surface above the round content
  - Correct feedback:
    - the chosen answer resolves into the right state
    - a lightweight positive feedback cue appears
    - a short wait period begins
    - the initial MVP target for that wait is about `500 ms`
    - the game auto-advances when that wait ends
    - the student may skip the remaining wait
  - Wrong feedback:
    - the chosen wrong answer stays visible in the wrong state
    - the correct answer becomes visible in the right state
    - the remaining non-correct answers become disabled
    - the game does not auto-advance
    - the student must acknowledge the correct answer to continue
  - Keyboard support:
    - during feedback, answer bindings `1`, `2`, `3`, and `4` are disabled
    - `Space` continues from feedback when allowed
- UI direction:
  - Correct feedback should be fast and low-friction.
  - Wrong feedback should stop long enough to teach, without turning into a separate heavy screen.
  - The answer-state colors and icons should be understandable even without text.
  - The feedback surface should leave room for later additions such as streaks or praise without forcing them into MVP.

#### Game Results flow screen

- Role: Close the game session, show what the student missed, and direct them into the next useful action.
- Entry point: Entered after the last round finishes and the session resolves into final results.
- Main user question: How did I do, what should I review again, and what do I want to do next?
- Primary decision: Replay, return to Study, or choose something else after reviewing the failed items.
- Layout regions:
  - Results header: required.
  - Failed-items review area: required.
  - Results action area: required.
- Navigation chrome:
  - No back arrow.
  - The Results header uses a 2-line pattern:
    - line 1: summary score such as `Game results: 9/10`
    - line 2: lightweight tone such as `Very good`, `Not bad`, or `Keep trying`
  - Mascot/image treatment may appear here to add personality.
  - No dock.
- Action placement:
  - The failed-items review area lives in the body.
  - The CTA actions live below the review area.
- Primary actions:
  - Play again.
  - Back to Study.
  - Choose something else.
- Secondary actions:
  - None required in the header for the MVP.
- What this screen should communicate:
  - The session is over.
  - The most useful thing to review now is what the student missed.
  - The student can immediately replay, study again, or move on.
- What this screen should not try to do:
  - It should not show the wrong answers again as learning content.
  - It should not become a full separate Study route.
  - It should not focus on variant or session-generation details after the game is already over.
- Content:
  - Results summary:
    - right count versus total such as `9/10`
    - lightweight tone/mood feedback
  - Failed-items review:
    - results reuse a limited Study-like body pattern
    - only failed items are shown in the review area
    - if the same item was failed multiple times in different round variants, it still appears only once here
    - failed items are shown with the correct answer/detail only
    - wrong answer options are not shown again in Results
    - the review area may use:
      - a failed-items summary view
      - a focused failed-item detail view
    - the failed-items review opens on its summary view first in the MVP
    - this can visually reuse the Study body pattern while keeping Results-specific header and CTA actions
    - if no items were failed, a success card should occupy the same review space
  - Failed-item detail:
    - may reuse the same detail-card system as Study for the current item type
    - should emphasize the correct form rather than the previous wrong choice
  - Results actions:
    - `Play again` returns to the Lobby first, not directly into a new session
    - `Back to Study` returns to the current study resource
    - `Choose something else` returns to Learn
- UI direction:
  - Results should feel reflective and useful, not just celebratory.
  - The review area should feel closely related to Study, but not identical in framing.
  - The failed-items review should help the student learn again immediately without overloading the screen.
  - The CTA area should make the three next steps easy to compare.

### Translit screen

- Role: Transliterate text between Georgian and Latin scripts and help students inspect token-level mapping between source and output.
- Entry point: Top-level route `/{locale}/app/translit`, reachable from the app dock as a primary destination.
- Main user question: "How do I transliterate this text and inspect how the tokens map between scripts?"
- Primary decision: Enter source text, inspect the output, and optionally reverse direction or copy the result.
- Layout regions:
  - Top bar: required, with screen title: "Translit" and back button.
  - Main area: required, 2 vertically stacked panels:
    - Source panel
    - Transliteration panel
- Navigation chrome:
  - Dock/tab/primary app navigation is visible (top-level destination behavior).
  - Back button target: `/{locale}/app/learn`.
  - No custom flow navigation.
- Action placement:
  - Source panel actions live inline in the source panel header.
  - Output actions live inline in the output panel header.
  - Token inspection is embedded directly in the output surface.
- Primary actions:
  - Type or paste source text.
  - Switch transliteration direction.
  - Copy the output.
  - Inspect token mapping in the output.
- Secondary actions:
  - Clear the source text.
- What this screen should communicate:
  - Transliteration happens immediately as the source text changes.
  - The same utility supports both Georgian -> Latin and Latin -> Georgian.
  - Output tokens can be inspected against their source tokens.
  - Transliteration is token-aligned, not character-count aligned.
- What this screen should not try to do:
  - It should not become a full translation screen.
  - It should not become part of lesson progression.
  - It should not imply that character positions always match between source and output.
- Content:
  - Source panel:
    - Source label.
    - Active source script label: Georgian or Latin.
    - Text input area.
    - Placeholder copy based on current direction.
    - Clear action.
    - Switch-direction action.
  - Transliteration panel:
    - Transliteration label.
    - Active output script label: Latin or Georgian.
    - Read-only transliteration output.
    - Copy action.
  - Token inspection behavior:
    - Output is split into tokens and whitespace runs.
    - Whitespace remains preserved.
    - Punctuation stays attached to the surrounding token.
    - Hovering, focusing, or tapping an output token reveals the matching source token.
    - Example: source `გამარჯობა` -> output `gamarjoba`, and the output token tooltip reveals `გამარჯობა`.
    - Example: source `თ ტ` becomes output `t' t`, so token inspection is more useful than character-count comparison.
  - Direction persistence:
    - translit direction is not persisted between visits in the MVP
- UI direction:
  - Keep a practical utility-screen treatment.
  - Prioritize fast editing, clear panel separation, and readable large text.
  - Keep the same product behavior across devices.
  - Support hover/focus behavior on pointer devices and tap behavior on coarse-pointer devices.

### Settings screen

- Role: Provide global app utilities and metadata in a simple, low-frequency control surface.
- Entry point: Top-level route `/{locale}/app/settings`, reachable from the app dock as a primary destination.
- Main user question: "How do I adjust app-wide preferences and view app information quickly?"
- Primary decision: Update a global preference now (primarily UI language, sound, and optional analytics consent).
- Layout regions:
  - Top bar: required, with screen title: "Settings" and back button.
  - Main area: required, 1-column layout with 4 vertically stacked sections:
    - Language
    - Sound
    - Privacy
    - About
- Navigation chrome:
  - Dock/tab/primary app navigation is visible (top-level destination behavior).
  - Back button target: `/{locale}/app/learn`.
  - No custom flow navigation; this is not part of Learn flow progression.
- Action placement:
  - Inline actions inside each section.
  - No sticky CTA region.
- Primary actions:
  - Change UI language (instant apply).
  - Toggle global sound on or off.
  - Accept optional analytics.
  - Reject optional analytics.
- Secondary actions:
  - Open Privacy page link from the Privacy section.
  - Open GitHub link from the About section.
- What this screen should communicate:
  - Settings is for global app preferences, not lesson activity.
  - Changes are straightforward and immediate where applicable.
  - App/version information is transparent and easy to find.
  - Essential app storage and optional analytics are different concepts.
  - Global sound is shared across the relevant learning screens.
- What this screen should not try to do:
  - It should not host learning flow actions (Explore/Study/Play decisions).
  - It should not become a catch-all for unrelated feature entry points.
  - It should not require complex multi-step interaction.
- Content:
  - Language section:
    - UI language selector.
    - Scope: affects UI language only.
    - Apply model: instant apply on selection.
  - Sound section:
    - Global sound toggle.
    - Scope: affects app-wide playback behavior across catalog preview audio, Study audio, and Play audio.
    - Apply model: instant apply on toggle.
  - Privacy section:
    - Essential storage status row.
    - Essential storage is always on and is not user-editable.
    - Analytics consent status row.
    - Analytics consent status is one of:
      - not chosen yet
      - accepted
      - rejected
    - `unknown` is only the pre-decision state; Settings does not offer a reset-to-unknown control.
    - Actions depend on analytics consent status:
      - if not chosen yet: show `Accept` and `Reject`
      - if accepted: show `Reject`
      - if rejected: show `Accept`
    - Link to Privacy page.
  - About section:
    - Application version (hardcoded for now).
    - Content version (hardcoded for now).
    - Link to project GitHub.
- UI direction:
  - Keep a conservative, practical utility-screen presentation.
  - Same behavior and same layout across devices.
  - Single-column structure with clear section boundaries and concise copy.

# UI

## Screen anatomy

Screen UI should be described using separate concepts for layout regions, navigation chrome, and action placement.

### Layout regions

Layout regions describe the stable structural frame of a screen.

Direction:
- Top bar: optional
- Main area: required

## Navigation chrome

Navigation chrome describes UI elements that help the user move around the app or route structure.

### Dock / tab bar / sidebar

This is one navigation concept that may appear in different forms depending on device and layout.

Direction:
- mobile may use a bottom dock or tab bar
- desktop may use a sidebar
- dock membership is defined in the Navigation model

### Back button

Back button behavior is defined in the Navigation model.

### Top bar

The top bar is optional and may contain navigation and contextual actions.

#### Standard top bar

The contents depend on the screen.

Direction:
- app logo or back button
- screen title
- contextual actions

### Page heading semantics

- Every route-rendered page exposes one primary page heading.
- The primary heading supports document structure and accessibility. It is not only an SEO concern.
- A top bar title may also serve as the primary heading when the screen does not need a separate content heading.
- Longform content screens such as Privacy keep the primary `h1` inside the content area. Their top bar title remains navigation chrome.
- Screens without a top bar still need a clear primary page heading in the main content area.

#### Game top bar

Contents vary by Play flow state:
- Lobby:
  - back arrow
  - two-line Play title
  - sound toggle
- Round and Feedback:
  - leave-game action
  - hybrid progress indicator
  - sound toggle
- Results:
  - results-specific two-line header
  - no back arrow

## Action placement

Action placement describes where interactive actions live within a screen.

### Inline actions

Direction:
- actions may live inside the main area
- some screens may not have a separate action region

### Sticky CTA

Direction:
- a primary CTA may be sticky when a screen benefits from persistent progression actions

### Game controls

Direction:
- game answer controls may live in a dedicated game control area outside normal inline content

## Overlay and feedback system

### Overlay families

Direction:
- the MVP uses a small overlay-and-feedback system rather than many unrelated surface concepts
- overlay choice is defined by interaction job first, not by visual shape first
- the main families are:
  - blocking overlay
  - context drawer
  - tooltip
  - notification

### Blocking overlays

Direction:
- blocking overlays interrupt the current interaction until the student decides what to do
- blocking overlays are used for destructive or progress-losing decisions
- the current MVP blocking-overlay case is the Play leave confirmation surface
- blocking overlays dim the background and visually separate themselves from the underlying screen
- visual presentation may vary by viewport without changing the interaction role:
  - smaller screens may use a bottom sheet
  - larger screens may use a centered modal

### Context drawers

Direction:
- context drawers are non-blocking overlays tied to the current screen context
- context drawers keep the underlying screen visible and let the user keep working from the same screen
- context drawers are used when the student selects a resource and needs contextual next actions without entering a separate route
- the current MVP context-drawer case is the selected study-resource surface in module browsers

### Tooltips

Direction:
- tooltips are anchored helper surfaces attached to a specific trigger or inspected element
- tooltips are used for local explanation or inspection, not for global status feedback
- current MVP tooltip cases include:
  - icon-button explanation
  - translit token inspection

### Notifications

Direction:
- notifications are global, non-anchored feedback surfaces
- notifications appear in one shared global location rather than attaching themselves to each trigger
- the MVP uses the notification family for lightweight status, confirmation, and feedback moments
- current MVP notification cases include:
  - sound toggled on or off
  - copy-to-clipboard confirmation
  - `Turn sound on to listen`
  - Play positive feedback
  - Play negative feedback
- notifications may vary by tone, such as:
  - neutral
  - positive
  - negative

## Preview grid system

### Browse and Study terminology

Direction:
- lesson card:
  - the card used in browse/catalog/module-browser screens
- preview grid:
  - the grid inside a lesson card
- preview slot:
  - one fixed position inside a preview grid
- preview asset:
  - the visual content inside one preview slot
- summary card:
  - the summary surface used inside Study for one lesson or module review resource
- summary item:
  - one item representation inside a summary card
- detail card:
  - one focused single-item surface inside Study item detail
- these shared UI terms can then be specialized by item type:
  - letter preview asset / word preview asset / rule preview asset
  - letter summary item / word summary item / rule summary item
  - letter detail card / word detail card / rule detail card

### Shared preview grid

The default preview language for lesson cards and module review cards is a fixed visual preview grid.

Direction:
- the preview grid is for fast recognition, not for showing the full lesson or module payload literally
- preview grids use fixed-size visual slots
- the summary card shell can stay shared while the visual assets inside the slots vary by item type
- alphabet is the clearest case where the preview grid can show all lesson items
- other lesson types may show only a representative subset of items in the preview grid
- when a module/browser view shows multiple cards together, those cards should keep the same width and height
- when a single review card is shown on its own, it may expand to as many rows as needed
- if a lesson has more previewable items than the grid should show, the last slot may become an overflow slot such as `+N`
- the exact maximum slot count is not locked yet and should be validated against real content while preserving equal card heights in multi-card module views

### Visual preview asset types

Direction:
- each preview slot contains one visual preview asset
- letter visual preview asset:
  - Georgian script
  - notepad-like lined background
  - transliteration in brackets
- word visual preview asset:
  - image or other representational visual
- rule visual preview asset:
  - illustration, symbolic visual, or other designed rule marker
- mixed lessons may combine different visual preview asset types inside the same preview grid
- consistency should come from the shared slot frame and the per-type asset style, not from forcing all item types to look identical

### Catalog preview versus Study summary

Direction:
- catalog preview cards optimize for recognition and quick selection
- Study summary reveals all items in the current study resource, even when scrolling is needed
- Study summary does not use catalog-style overflow slots such as `+N`
- Study summary can reuse the same preview-grid language while adding richer per-item information when the lesson type benefits from it
- alphabet catalog preview and alphabet Study summary can stay very close to each other
- vocabulary and grammar Study summary may reveal more than the catalog preview while keeping the same shared preview-grid model

### Temporary emoji strategy

Direction:
- emojis are acceptable as temporary visual preview assets for word-based and rule-based lesson previews
- emojis should live inside the same controlled preview-slot frame as later curated assets
- the preview-grid layout should not depend on emojis as the final visual system
- later iterations can replace emojis with curated SVGs, illustrations, or images without redesigning the preview-grid structure
- emoji rendering varies by platform, so emojis are acceptable as a temporary curation shortcut but not as the final branded visual language

## Global UI surfaces

### Privacy consent banner

- Role: Collect the initial optional analytics decision without turning it into a disruptive full-screen interruption.
- Entry point: Appears automatically on app init when privacy consent state is `unknown`.
- Main user question: "Do I want to allow optional analytics for this app?"
- Primary decision: Accept or reject optional analytics.
- Layout regions:
  - The active page remains visible in the background.
  - A persistent banner region is required.
- Navigation chrome:
  - Existing route/app navigation remains visible.
  - The banner does not replace the active route.
- Action placement:
  - Two explicit actions inside the banner: `Accept` and `Reject`.
  - Link to Privacy page inside the banner.
- Primary actions:
  - Accept optional analytics.
  - Reject optional analytics.
- Secondary actions:
  - Open Privacy page.
- What this surface should communicate:
  - Optional analytics are off until a choice is made.
  - Some essential client-side storage is always used for app behavior.
  - The user must make a choice for the banner to disappear.
- What this surface should not try to do:
  - It should not block basic reading/navigation with a heavy modal treatment.
  - It should not hide `Reject` behind a secondary screen or vague text link.
  - It should not bundle unrelated settings into the first-choice banner.
- Content:
  - Short explanation of essential storage.
  - Short explanation of optional analytics.
  - `Accept` action.
  - `Reject` action.
  - Link to Privacy page.
- UI direction:
  - Non-intrusive visual treatment.
  - Persistent until choice is made.
  - Clear, explicit actions with concise copy.

### Play leave confirmation surface

- Role: Prevent accidental loss of session progress when the student tries to leave an active game.
- Entry point: Triggered from the leave-game action during an active Play round or feedback state.
- Main user question: Do I want to keep playing, or leave and discard this current session?
- Primary decision: Resume the active session or leave it.
- Layout regions:
  - The active Play screen remains visible in the background.
  - A confirmation surface is required above it.
- Navigation chrome:
  - The active Play route remains in place behind the confirmation surface.
  - This surface is not used from the Lobby or from Results.
- Action placement:
  - The confirmation message and both actions live inside the confirmation surface.
- Primary actions:
  - Resume game.
  - Leave game.
- Secondary actions:
  - None required for the MVP.
- What this surface should communicate:
  - Leaving now will discard the current session progress.
  - The student can safely continue without losing progress if the leave action was accidental.
- What this surface should not try to do:
  - It should not become a detailed results preview.
  - It should not offer too many alternate destinations.
  - It should not rely on browser-history behavior to decide where to go next.
- Content:
  - Short confirmation title.
  - Short explanation that current session progress will be lost.
  - `Resume game` action.
  - `Leave game` action.
  - `Leave game` returns to the source Study route.
- UI direction:
  - Keep the surface small, decisive, and interruption-focused.
  - It uses a bottom-sheet treatment on smaller screens and a centered modal treatment on larger screens.
  - It should still feel lighter than a full route change.
  - The resume action should feel like the safe default.

## Design system

Not defined yet.

## Components catalog

Not defined yet.

## Remaining open questions

These questions remain intentionally open after the MVP product pass. They are grouped by when they should be revisited next.

### UI phase questions

- Privacy screen:
  - whether the top bar should use only the mascot/logo or mascot/logo plus brand text
- Not found screen:
  - final title/copy per locale
- Study resource unavailable screen:
  - whether the copy should say `could not be found` or use softer wording such as `is not available`
- Explore entry screen:
  - exact mascot/logo treatment in the header
  - whether the mascot appears only in the header or also inside the cards
- Module browser screen pattern:
  - exact visual hierarchy between the module header and the section headings
  - how different the generated module review card should feel from authored lesson cards
- Alphabet catalog screen:
  - exact visual treatment that makes the full review card feel distinct without changing its internal grid model
  - sound-toggle iconography and label treatment
- Game Lobby flow screen:
  - exact visual format for the compact variant summary
  - visual treatment for the `Back to Study` action
- Game Results flow screen:
  - exact visual tone/mood buckets such as `Very good`, `Not bad`, or `Keep trying`
- Privacy consent banner:
  - exact banner copy per locale
  - final placement on mobile and desktop
- Settings screen:
  - exact microcopy that explains essential storage versus optional analytics

### Future / post-MVP questions

- Explore entry screen:
  - future interaction model for Explore / Recommended at the Learn entry level
- Vocabulary catalog screen:
  - exact preview-slot count before overflow, once real content is authored
- Study screen:
  - how much student-specific item status, if any, should appear inside item detail later
- Translit screen:
  - whether token tooltips should later include translation for recognized vocabulary tokens
  - whether the screen should later support loading example text from learning content
- Settings screen:
  - exact GitHub URL
  - exact format for hardcoded app/content version strings

# Releases

## MVP

### Included

- Root route `/` resolving to `/{locale}/app/learn` via locale detection
- Localized routing with English (`en`) as default and Russian (`ru`) as supported locale
- Learn entry route redirecting to Explore
- Explore entry page (choice between Alphabet and Vocabulary)
- Explore Alphabet page for alphabet lessons
- Alphabet catalog supports per-letter audio preview with a sound toggle and selected-lesson Study / Play actions
- Explore Vocabulary page for vocabulary lessons
- Vocabulary catalog uses the shared module-browser pattern with non-audio preview selection and Study / Play actions
- Study page for lesson preview
- Play page hosting the lesson game:
  - Game Lobby screen
  - Game Round screen
    - 1 format family: single-choice
    - multiple single-choice variants across alphabet and vocabulary
  - Game Round Feedback screen
  - Game Results screen
- Translit utility page
- Settings utility page for language, privacy, and about
- Privacy notice page
- Global not-found recovery screen
- Study resource unavailable screen
- Play resource unavailable screen
- Optional analytics with explicit privacy consent
- Non-dismissible privacy consent banner when consent is `unknown`
- Localized metadata fallback per locale
- Page-specific metadata for Privacy, Translit, Explore, and canonical lesson and module review Study routes
- `noindex` routes:
  - `/`
  - `/{locale}/app/learn`
  - `/{locale}/app/learn/lessons/{lessonId}/play`
  - `/{locale}/app/learn/modules/{moduleId}/review/play`
  - `/{locale}/app/settings`

## Next releases

### Future work (prioritized)
- offline mode
- mastery tracking
- recommendation mode based on user activity
- profile (anonymous)

## Future work (not prioritized)
- more minigames
- search
- favorites
- onboarding
- landing page
- root route logic for new vs returning users
- auth with activity sync
- broader public pages

## Ideas / backlog

This section can hold future ideas that are not yet committed.

# Decisions log

- Recommendation mode is postponed to a later release
- Grammar is postponed to a later release
- Item-level activity tracking exists and is sufficient as a low-level base for richer derived behavior later
- The Learn entry route resolves to Explore
- Explore entry is a two-choice gateway: Alphabet or Vocabulary
- The dock is visible on top-level destination screens and hidden on internal learning flow screens
- Privacy consent has 3 states: `unknown`, `granted`, `rejected`
- `unknown` disables analytics and shows a non-dismissible privacy banner until the user chooses
- `granted` enables optional analytics
- `rejected` disables optional analytics
- There is no cookieless analytics fallback
- Essential client-side storage remains on even when optional analytics are rejected
- Global sound is an app-level client-side preference that is persisted locally
- Global sound can be changed from Settings and from relevant sound-capable screens
- Lightweight alphabet-catalog preview audio fails silently when sound is disabled
- Explicit audio controls in Study and Play stay visible when sound is disabled and show lightweight enable-sound feedback on tap
- Locale-level metadata is the fallback metadata layer
- Routes with distinct search/share value should use page-specific metadata
- Browse/discovery routes may encode learning area and grouping, but canonical Study and Play routes do not encode discovery path
- Study and Play use explicit action segments in their routes
- Lesson and module review Study routes are the canonical shareable study routes
- Route indexability is defined per route in the routes catalog
- Redirect routes, Settings, and Play routes use `noindex`
- Module browser screens use a shared pattern: module header, Lessons section, Full review section, and a dismissible selected study-resource surface
- Every authored module generates exactly one synthetic `Full review` lesson, and its catalog card is unlabeled because the section label already provides the visible title
- Alphabet lessons normally contain 3 to 6 items
- Full alphabet review is the explicit exception to the normal alphabet lesson size
- Alphabet catalog prioritizes small lessons first and full review second
- Alphabet catalog supports direct per-letter audio preview
- Letter interaction selects the containing lesson context, not the letter as a standalone destination
- Alphabet catalog uses a dismissible non-modal selected-lesson surface with `Study` and `Play` actions
- Non-audio module browsers keep the same selection-and-drawer pattern without preview-audio behavior
- Vocabulary lessons are words-only in the current MVP model
- The first authored vocabulary module in the MVP is `Everyday basics`
- Vocabulary preview assets use emoji-only slots in the MVP preview language
- Vocabulary preview ordering follows first-authored item order, with overflow handled in the last slot when needed
- Study is optional and Play can be launched directly from a browser/catalog route
- Study opens on lesson summary by default
- Study uses internal UI state for summary/detail position instead of encoding item position in the URL
- Study summary shows all items in the current study resource; overflow slots belong only to catalog previews
- Study summary item interaction opens item detail and does not play audio directly
- Vocabulary Study summary items contain a visual asset, Georgian block, and translation
- Word detail cards support optional item-level audio, a Georgian-only example phrase, and an optional note area
- Study uses one stable navigation-bar pattern across devices, and horizontal swipe between item details is not part of the MVP
- Play sessions are generated from one study resource and prepared in the Lobby before the student starts
- Every item in the study resource should appear at least once as a target in the session
- Listening rounds are a Lobby-level session option that regenerates the prepared plan and is fixed once the session starts in the MVP
- Toggling global sound during active Play affects playback immediately but does not change the prepared round sequence
- The MVP game format family is single-choice with 4 answers and 1 correct answer
- The MVP includes multiple single-choice variants across alphabet and vocabulary
- The Lobby shows the exact round count, a compact explicit variant summary, and whether listening rounds are included
- The Play header uses a two-line pattern: `Play` on the first line and the study resource title on the second line
- Listening-rounds controls are hidden when the current study resource has no audio-capable items
- Once a Play session starts, listening-round inclusion no longer changes until the student returns to the Lobby or ends the session
- Listening-round inclusion stays fixed for the current session even when the global sound toggle changes
- Play answers submit immediately; there is no separate submit or continue step before feedback
- Each round begins with a short input-guard window before answers become active
- The MVP round progress indicator uses a hybrid bar-plus-number pattern
- Correct feedback auto-advances after a short wait period, and the student may skip that wait period
- Wrong feedback continues only after explicitly acknowledging the correct answer
- Wrong feedback reveals the correct answer and does not auto-advance in the MVP
- Desktop Play supports keyboard answer bindings for `1`, `2`, `3`, and `4`, with `Space` used to continue from feedback when allowed
- Leaving from an active round or feedback state opens a confirmation surface because session progress would otherwise be lost
- Leave-game confirmation uses a bottom sheet on smaller screens, a centered modal on larger screens, and `Leave game` returns to the source Study route
- Results focus on failed items and show only the correct answer/detail for them
- Failed items are deduplicated in Results even if they were missed multiple times across the session
- Results may reuse a limited Study-like body pattern for failed-item review while keeping Results-specific header and CTA actions
- Results failed-item review opens on its summary view first in the MVP
- `Play again` returns to the Lobby first rather than starting a new session immediately
- The product uses one global not-found screen for uncontrolled routes
- Module review sets are first-class study/play resources with dedicated review routes
- Valid Study and Play routes with missing lesson or module review resources use route-owned unavailable screens instead of the global not-found screen
- Unsupported locale values do not use a dedicated error screen and are canonicalized when possible
- Lesson and module preview cards use a shared preview-grid system with type-specific visual assets
- Multi-card module browser views prioritize equal card size; single review cards may expand to more rows
- Temporary emoji-based visual assets are acceptable for word-based and rule-based lesson previews
