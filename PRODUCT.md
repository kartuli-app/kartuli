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

## Localization

- Supported locales: English (`en`) and Russian (`ru`)
- Default locale: English (`en`)
- Localized public and app routes use the `/{locale}/...` pattern
- The root route `/` is a locale-resolution redirect route

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
- Not found

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
- route pattern: `/{locale}/app/learn/study/{lessonId}`
- actual URL: `/en/app/learn/study/alphabet-intro`

Examples of defined root routes:
- `/`

Examples of defined public routes:
- `/{locale}/privacy`

Examples of app routes:
- `/{locale}/app/learn`
- `/{locale}/app/learn/explore`
- `/{locale}/app/learn/explore/alphabet`
- `/{locale}/app/learn/explore/vocabulary`
- `/{locale}/app/learn/study/{lessonId}`
- `/{locale}/app/learn/play/{lessonId}`
- `/{locale}/app/translit`
- `/{locale}/app/settings`

## Routes catalog

### Root routes

#### `/`

- Kind: redirect route
- Purpose: resolve the best localized entry URL for the current visitor
- Resolution order:
  - preferred locale cookie
  - browser `Accept-Language` header
  - default locale `en`
- Defined behavior:
  - `/` -> `/en` when no supported cookie or supported browser language is found
  - `/` -> `/{locale}` when a supported locale is resolved
- Binding: none

### Public routes

#### `/{locale}/privacy`

- Kind: page route
- Purpose: show the privacy notice
- Section: Public
- Linked from: Settings, privacy consent banner

### App routes

#### `/{locale}/app/learn`

- Kind: redirect route
- Purpose: stable top-level entry route for Learn
- Section: Learn
- Defined behavior: redirects to `/{locale}/app/learn/explore`
- Open question: the selection logic between Explore and Recommended is not defined yet
- Binding: none

#### `/{locale}/app/learn/explore`

- Kind: page route
- Purpose: enter manual lesson selection
- Section: Learn / Explore
- Binding: Explore entry screen

#### `/{locale}/app/learn/explore/alphabet`

- Kind: page route
- Purpose: browse alphabet lessons
- Section: Learn / Explore
- Binding: Alphabet catalog screen

#### `/{locale}/app/learn/explore/vocabulary`

- Kind: page route
- Purpose: browse vocabulary modules and lessons
- Section: Learn / Explore
- Binding: Vocabulary catalog screen

#### `/{locale}/app/learn/study/{lessonId}`

- Kind: page route
- Purpose: preview one lesson before play
- Section: Learn / Study
- Binding: Study screen

#### `/{locale}/app/learn/play/{lessonId}`

- Kind: page route
- Purpose: host the lesson game
- Section: Learn / Play
- Binding: Play screen

#### `/{locale}/app/translit`

- Kind: page route
- Purpose: access the bidirectional translit utility
- Section: Translit
- Binding: Translit screen

#### `/{locale}/app/settings`

- Kind: page route
- Purpose: access global app preferences and app metadata
- Section: Settings
- Binding: Settings screen

### Additional route candidates

These route patterns are referenced in the broader product direction but are not fully defined in the routes catalog yet.

- `/{locale}/landing`
- `/{locale}/terms`
- `/{locale}/app/learn/recommended`

## Navigation model

### Top-level destinations

- Learn
- Translit
- Settings

### Redirect routes

- `/` is a locale-resolution redirect route.
- It resolves to `/{locale}` using locale detection.
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
- `/{locale}/app/learn/study/{lessonId}`
- `/{locale}/app/learn/play/{lessonId}`

### Back button behavior

- Routes show a back button by default.
- Learn entry behavior does not show a back button.
- Deeper learning routes such as Study show a back button.
- Back button targets are route-specific.
- Example: `/{locale}/app/learn/explore/alphabet` targets `/{locale}/app/learn/explore`.
- Example: `/{locale}/app/settings` targets `/{locale}/app/learn`.
- Play uses custom back/exit behavior when needed instead of a normal back pattern.

# Flows

## Learning flows

The main learning flow is:

`Explore or Recommended -> Study -> Play -> Repeat`

### Explore flow

Not defined yet.

### Study flow

Study leads to Play.

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

### Explore entry screen

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

### Alphabet catalog screen

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
- Content: Assumption: this screen lists alphabet lessons, not individual letters.
- UI direction: To be defined.
- Open questions: To be defined.

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

- Role: Preview all items in a lesson before playing.
- Entry point: To be defined.
- Main user question: Am I ready to play this lesson?
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
- Entry point: Student arrives from Study for a specific lesson.
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

- Learn entry route redirecting to Explore
- Explore entry page (choice between Alphabet and Vocabulary)
- Explore Alphabet page for alphabet lessons
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
- Optional analytics with explicit privacy consent

## Next releases

### Future work (prioritized)
- offline mode
- mastery tracking
- recommendation mode based on user activity
- profile (anonymous)

## Future work (not prioritized)
- more minigames
- sound
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
