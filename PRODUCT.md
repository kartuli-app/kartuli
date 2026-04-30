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

## Student activity

There is activity tracking at item level.

Tracked concept:
- item view count

This is intentionally low-level and supports richer derived behavior later.

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
- Study lesson unavailable
- Play lesson unavailable

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
- route pattern: `/{locale}/app/learn/lessons/{lessonId}`
- actual URL: `/en/app/learn/lessons/alphabet-intro`

Examples of defined root routes:
- `/`

Examples of defined public routes:
- `/{locale}/privacy`

Examples of app routes:
- `/{locale}/app/learn`
- `/{locale}/app/learn/explore`
- `/{locale}/app/learn/explore/alphabet`
- `/{locale}/app/learn/explore/vocabulary`
- `/{locale}/app/learn/lessons/{lessonId}`
- `/{locale}/app/learn/lessons/{lessonId}/play`
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
- Purpose: browse vocabulary modules and lessons
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Vocabulary catalog screen

#### `/{locale}/app/learn/lessons/{lessonId}`

- Kind: page route
- Purpose: preview one lesson before play
- Section: Learn / Study
- Metadata: lesson-specific metadata
- Canonical/share role: canonical shareable lesson route
- Unavailable handling: when the lesson cannot be found or loaded, this route shows the Study lesson unavailable screen
- Binding: Study screen

#### `/{locale}/app/learn/lessons/{lessonId}/play`

- Kind: page route
- Purpose: host the lesson game
- Section: Learn / Play
- Metadata: `noindex`
- Canonical/share role: not a primary search/share destination
- Unavailable handling: when the lesson cannot be found or loaded, this route shows the Play lesson unavailable screen
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

### Routing states

#### Global not-found state

- Trigger: the requested URL does not match a controlled route pattern after locale handling
- Metadata: `noindex`
- Binding: Not found screen

#### Study lesson unavailable state

- Trigger: `/{locale}/app/learn/lessons/{lessonId}` matches a valid route pattern, but the lesson resource cannot be found or loaded
- Metadata: `noindex`
- Binding: Study lesson unavailable screen

#### Play lesson unavailable state

- Trigger: `/{locale}/app/learn/lessons/{lessonId}/play` matches a valid route pattern, but the lesson resource cannot be found or loaded
- Metadata: `noindex`
- Binding: Play lesson unavailable screen

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
- `/{locale}/app/learn/lessons/{lessonId}`
- `/{locale}/app/learn/lessons/{lessonId}/play`

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
- the user opens `/{locale}/app/learn/lessons/{lessonId}` from a catalog/browser route or from a direct lesson URL
- Study opens on the lesson summary state by default
- the user can start Play immediately from the summary state
- the user can enter item detail by selecting one item from the lesson summary
- item detail shows one focused item at a time
- previous from the first item returns to the lesson summary
- next is disabled on the last item
- the Play action remains available from both summary and item detail
- current item position is internal Study UI state, not URL state

### Play flow

Play hosts a Game.

The Game begins at Game Lobby, then runs through one or more `Game Round -> Game Round Feedback` cycles, and ends at Game Results.

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
- Open questions:
  - Whether the top bar should use only the mascot/logo or mascot/logo plus brand text.

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
- Open questions:
  - What final title/copy should be used per locale?

### Study lesson unavailable screen

- Role: Explain that the Study route is valid but the requested lesson could not be found or loaded, then help the user recover.
- Entry point: `/{locale}/app/learn/lessons/{lessonId}` when the route matches but the lesson resource is unavailable.
- Main user question: How do I continue if this lesson cannot be opened?
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
  - The route format is valid, but this specific lesson could not be shown.
  - The lesson may not exist or may not be available right now.
- What this screen should not try to do:
  - It should not present itself as a generic global 404.
  - It should not expose raw resource IDs or technical failure details.
- Content:
  - Short unavailable title.
  - Short explanation that the lesson could not be found or loaded.
  - Primary recovery action to Learn.
- UI direction:
  - Reuse the normal app reading/action shell.
  - Keep the state calm and recoverable rather than alarming.
- Open questions:
  - Should the copy explicitly say "could not be found" or use softer wording such as "is not available"?

### Play lesson unavailable screen

- Role: Explain that the Play route is valid but the requested lesson could not be found or loaded, then help the user recover.
- Entry point: `/{locale}/app/learn/lessons/{lessonId}/play` when the route matches but the lesson resource is unavailable.
- Main user question: How do I continue if this lesson cannot be played?
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
  - The route format is valid, but this specific lesson cannot start in Play.
  - The lesson may not exist or may not be available right now.
- What this screen should not try to do:
  - It should not present itself as a generic global 404.
  - It should not expose raw resource IDs or technical failure details.
- Content:
  - Short unavailable title.
  - Short explanation that the lesson could not be found or loaded for Play.
  - Primary recovery action to Learn.
- UI direction:
  - Reuse the normal app reading/action shell.
  - Keep the state calm and recoverable rather than alarming.
- Open questions:
  - Should the Play unavailable copy mention Study as an alternative route later, or keep the MVP recovery path focused only on Learn?

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
- Open questions:
  - Exact mascot/logo treatment in the header.
  - Whether the mascot appears only in the header or also inside the cards.
  - Future interaction model for Explore / Recommended at the Learn entry level.

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
    - sound on/off toggle for alphabet audio preview
- Action placement:
  - Lesson selection starts from direct interaction inside lesson cards.
  - The selected lesson surface contains the progression actions.
- Primary actions:
  - Select one alphabet lesson.
  - Open the selected lesson in Study.
  - Open the selected lesson in Play.
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
  - Preview grid item cell:
    - fixed-width box
    - Georgian letter in large type
    - lined background behind the Georgian letter
    - transliteration below in brackets, smaller and lighter
    - Georgian letter and transliteration are vertically stacked
    - tapping a letter item selects the containing lesson
    - when sound is enabled, tapping a letter item also plays that letter's audio
  - Lessons section ordering:
    - sequential by position
    - top to bottom, then left to right
  - Section heading: `Full review`
  - Full review card:
    - title: `All the letters`
    - uses the same item-cell language as lesson cards
    - includes all alphabet letters
    - uses as many rows as needed
    - does not group the rows visually
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
- Open questions:
  - Exact visual treatment that makes the full review card feel distinct without changing its internal grid model.
  - What iconography and exact label treatment should the sound toggle use?
  - Should the sound preference persist across visits, and if so where should it be stored?

### Vocabulary catalog screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Layout regions: To be defined.
- Navigation chrome: To be defined.
- Action placement: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: Assumption: this screen lists vocabulary modules first, then lessons inside each module.
- UI direction: To be defined.
- Open questions: To be defined.

### Study screen

- Scope: Route-level container for lesson study.
- Role: Let the student preview a lesson, move between summary and item detail, and start Play whenever ready.
- Entry point: `/{locale}/app/learn/lessons/{lessonId}`.
- Main user question: Do I want to review this lesson summary, inspect one item in detail, or start playing now?
- Primary decision: Stay in summary, inspect a specific item, or start Play.
- Layout regions:
  - Top bar: required, for global route controls and lesson context.
  - Study navigation bar: required, for summary/detail navigation inside the lesson.
  - Main area: required, showing either the lesson summary card or one focused item detail card.
  - Sticky CTA area: required, with the Play action.
- Navigation chrome:
  - Back button target depends on lesson type and source catalog.
  - For alphabet lessons, back returns to `/{locale}/app/learn/explore/alphabet`.
  - The top bar keeps the lesson title/context visible.
  - Sound toggle is available when the current lesson type supports audio preview.
  - No dock.
  - No selected-lesson drawer behavior exists inside Study.
- Action placement:
  - Global route actions live in the top bar.
  - Summary/detail navigation lives in the study navigation bar.
  - Item selection lives inside the lesson summary card.
  - Play is available from a persistent CTA area.
- Primary actions:
  - Open Play immediately.
  - Open one item detail from the lesson summary.
  - Move to the previous or next study position.
- Secondary actions:
  - Return to the lesson summary.
  - Return to the source catalog/browser route.
  - Toggle sound on or off when the lesson type supports audio.
- What this screen should communicate:
  - Study is a preview/review step before Play, but it is optional.
  - The student can stay as long as needed or jump to Play immediately.
  - The lesson has both a summary view and focused item detail views.
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
    - in summary state, the position label can show the lesson item count
    - in item detail state, the position label shows the current item index such as `5 / 10`
    - previous from the first item returns to summary
    - next is disabled on the last item
  - Summary state:
    - lesson summary card variant for the current lesson type
    - selecting an item preview opens that item in detail
  - Item detail state:
    - one focused item detail card variant for the current lesson type
  - Alphabet lesson summary card:
    - similar to the alphabet lesson summary shown in the deepest catalog level
    - enough preview information to recognize the lesson as a set
    - alphabet item previews can still play audio when relevant
  - Letter detail card:
    - Georgian letter
    - transliteration
    - audio playback
    - pronunciation hint
    - example words with the target letter highlighted
    - optional example-word audio later
- UI direction:
  - The Study route uses one shared shell across lesson types.
  - Lesson types can swap in different summary card variants and item detail card variants without changing the shell.
  - Global route controls and study navigation controls should be visually distinct.
  - The focused item detail view should be able to show all essential item information at once.
  - Vertical scrolling inside summary or detail is acceptable when needed.
  - A sticky Play CTA is important, especially on mobile.
- Open questions:
  - What exact study navigation control layout should be used across mobile and desktop?
  - Should horizontal swipe between item details be included in the MVP, or added later if it complements the button navigation well?
  - How much student-specific item status, if any, should appear inside item detail later?

### Play screen

- Scope: Route-level container for the lesson game.
- Role: Host the full game flow for one lesson.
- Main user question: To be defined.
- Primary decision: To be defined.
- Contains flow screens:
  - Game Lobby
  - Game Round
  - Game Round Feedback
  - Game Results
- Entry point: Student arrives from Study or directly from a browser/catalog route for a specific lesson.
- Layout regions: To be defined.
- Navigation chrome: To be defined.
- Action placement: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- Exit points:
  - back to Study
  - replay game
  - go to another lesson / learn area
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: To be defined.
- UI direction: To be defined.
- Open questions: To be defined.

#### Game Lobby flow screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Layout regions: To be defined.
- Navigation chrome: To be defined.
- Action placement: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: To be defined.
- UI direction: To be defined.
- Open questions: To be defined.

#### Game Round flow screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Layout regions: To be defined.
- Navigation chrome: To be defined.
- Action placement: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: To be defined.
- UI direction: To be defined.
- Open questions: To be defined.

#### Game Round Feedback flow screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Layout regions: To be defined.
- Navigation chrome: To be defined.
- Action placement: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: To be defined.
- UI direction: To be defined.
- Open questions: To be defined.

#### Game Results flow screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Layout regions: To be defined.
- Navigation chrome: To be defined.
- Action placement: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: To be defined.
- UI direction: To be defined.
- Open questions: To be defined.

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
- UI direction:
  - Keep a practical utility-screen treatment.
  - Prioritize fast editing, clear panel separation, and readable large text.
  - Keep the same product behavior across devices.
  - Support hover/focus behavior on pointer devices and tap behavior on coarse-pointer devices.
- Open questions:
  - Should token tooltips later include translation for recognized vocabulary tokens?
  - Should translit direction persist between visits?
  - Should the screen later support loading example text from learning content?

### Settings screen

- Role: Provide global app utilities and metadata in a simple, low-frequency control surface.
- Entry point: Top-level route `/{locale}/app/settings`, reachable from the app dock as a primary destination.
- Main user question: "How do I adjust app-wide preferences and view app information quickly?"
- Primary decision: Update a global preference now (primarily UI language and optional analytics consent).
- Layout regions:
  - Top bar: required, with screen title: "Settings" and back button.
  - Main area: required, 1-column layout with 3 vertically stacked sections:
    - Language
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
- What this screen should not try to do:
  - It should not host learning flow actions (Explore/Study/Play decisions).
  - It should not become a catch-all for unrelated feature entry points.
  - It should not require complex multi-step interaction.
- Content:
  - Language section:
    - UI language selector.
    - Scope: affects UI language only.
    - Apply model: instant apply on selection.
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
- Open questions:
  - What exact microcopy should explain essential storage vs optional analytics?
  - What exact GitHub URL should be used?
  - What format should app/content hardcoded version strings follow?

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

Contents:
- To be defined

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
- Open questions:
  - What exact banner copy should be used per locale?
  - Where exactly should the banner sit on mobile and desktop layouts?

## Design system

Not defined yet.

## Components catalog

Not defined yet.

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
- Study page for lesson preview
- Play page hosting the lesson game:
  - Game Lobby screen
  - Game Round screen
    - 1 minigame type: question with 4 answer options
  - Game Round Feedback screen
  - Game Results screen
- Translit utility page
- Settings utility page for language, privacy, and about
- Privacy notice page
- Global not-found recovery screen
- Study lesson unavailable screen
- Play lesson unavailable screen
- Optional analytics with explicit privacy consent
- Non-dismissible privacy consent banner when consent is `unknown`
- Localized metadata fallback per locale
- Page-specific metadata for Privacy, Translit, Explore, and canonical lesson routes
- `noindex` routes:
  - `/`
  - `/{locale}/app/learn`
  - `/{locale}/app/learn/lessons/{lessonId}/play`
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
- Locale-level metadata is the fallback metadata layer
- Routes with distinct search/share value should use page-specific metadata
- Lesson routes are the canonical shareable lesson routes
- Route indexability is defined per route in the routes catalog
- Redirect routes, Settings, and Play routes use `noindex`
- Alphabet lessons normally contain 3 to 6 items
- Full alphabet review is the explicit exception to the normal alphabet lesson size
- Alphabet catalog prioritizes small lessons first and full review second
- Alphabet catalog supports direct per-letter audio preview
- Letter interaction selects the containing lesson context, not the letter as a standalone destination
- Alphabet catalog uses a dismissible non-modal selected-lesson surface with `Study` and `Play` actions
- Study is optional and Play can be launched directly from a browser/catalog route
- Study opens on lesson summary by default
- Study uses internal UI state for summary/detail position instead of encoding item position in the URL
- The product uses one global not-found screen for uncontrolled routes
- Valid Study and Play routes with missing lesson resources use route-owned unavailable screens instead of the global not-found screen
- Unsupported locale values do not use a dedicated error screen and are canonicalized when possible
