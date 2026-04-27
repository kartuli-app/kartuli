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
- short, usable practice sessions
- simple lesson-based learning flow
- students choose what to practice via two ways: explore (manual) or recommended (based on activity)
- product decisions come before visual styling
- clear structure
- focused on mobile users, desktop is supported but not the main focus

# Core

## Terminology / glossary

### Public section

The information-facing section of the site/app, distinct from learning-side pages.

Examples of public pages:
- `/[locale]/landing`
- `/[locale]/terms`
- `/[locale]/privacy`

### App section

The learning-side section of the site/app, distinct from public pages.

Examples of app pages:
- `/[locale]/app/learn/recommended`
- `/[locale]/app/learn/explore`
- `/[locale]/app/learn/explore/alphabet`
- `/[locale]/app/learn/explore/vocabulary`
- `/[locale]/app/learn/study/[lessonId]`
- `/[locale]/app/learn/play/[lessonId]`
- `/[locale]/app/translit`
- `/[locale]/app/settings`

### Learn

The user-facing main learning area.

Contains the two entry routes (Explore and Recommended) and the Study and Play stages.

### Explore

The manual lesson selection mode inside Learn.

### Recommended

The guided lesson selection mode inside Learn.

### Study

The lesson preview/review stage before Play.

### Play

The active lesson game stage / route-level stage.

Play hosts a Game.

### Game

The playable interaction structure inside the Play stage.

A Game is composed of:
- Game Lobby
- Game Round
- Game Round Feedback
- Game Results

### Translit

The utility page for translit.

### Settings

The utility page for settings.

### Route

A URL-addressable destination.

### Page

The implementation bound to a route.

### Screen

A user-facing interface state.

### Flow screen

A screen inside a route/page flow that is not directly landable by URL.

### UI state

A smaller transient state inside a screen.

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

Current tracked concept:
- item view count

This is intentionally low-level and supports richer derived behavior.

## Mastery tracking

This section is still early.

Current direction:
- raw activity facts are stored at low level
- richer interpretation can be derived later

Possible future learning-state concepts:
- viewed
- practiced
- needs review
- strong
- mastered

# Information architecture

## Sections

### App section

The app section is the section of the site/app that is related to learning and practice.

#### Current app sections

- Learn
  - Explore
  - Study
  - Play
- Translit
- Settings

#### Future app sections

- Learn
  - Recommended
- Favorites
- Search (may belong to Explore)
- Progress
- Auth / Profile
- Offline (current state, installation)
- Onboarding
- Not found

### Public section

The public section is the section of the site/app that is not related to learning.

This section is planned, but no public pages are implemented in the MVP.

#### Current public sections

Not defined yet.

#### Possible future public sections

- Landing page
- Terms
- Privacy

## Routing model

Current direction:
- public pages live under `/{locale}/...`
- app pages live under `/{locale}/app/...`

Examples of public pages:
- `/{locale}/landing`
- `/{locale}/terms`
- `/{locale}/privacy`

Examples of app pages:
- `/{locale}/app/learn/explore`
- `/{locale}/app/learn/explore/alphabet`
- `/{locale}/app/learn/explore/vocabulary`
- `/{locale}/app/learn/study/[lessonId]`
- `/{locale}/app/learn/play/[lessonId]`
- `/{locale}/app/translit`
- `/{locale}/app/settings`

## Route / page / screen / flow-step model

### Route

A URL-addressable destination.

Examples:
- `/[locale]/app/learn/explore`
- `/[locale]/app/learn/explore/alphabet`
- `/[locale]/app/learn/study/[lessonId]`
- `/[locale]/app/learn/play/[lessonId]`

### Page

The implementation bound to a route.

### Screen

A user-facing interface state.

A screen may be:
- a route screen
- a flow screen inside a route page

### Flow screen

A screen that appears inside a route-based experience and is not directly landable by URL.

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

## Navigation rules

### Dock visibility rule

The dock is visible on top-level routes

The dock is hidden on internal / deeper routes.

Top-level routes (dock visible):
- Learn (Explore and Recommended), 1 single dock button for both
- Translit
- Settings

Internal / deeper routes (dock hidden):
- Explore alphabet
- Explore vocabulary
- Study
- Play

### Back button rule

- Routes show a back button by default.
- Learn entry routes (Explore and Recommended) do not show a back button.
- Deeper learning routes such as Study show a back button.
- Back button targets are route-specific. Example: Explore alphabet targets Explore.
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

The Game contains Game Lobby, Game Round, Game Round Feedback, and Game Results.

## Utility flows

### Change language flow

Not defined yet.

### Translit flow

Not defined yet.

# Screens

## Screen contract template

Each screen should define:

- Role
- Entry point
- Main user question
- Primary decision
- Shell / Navigation
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
- Shell / Navigation: To be defined.
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
- Shell / Navigation: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: MVP assumption: this screen lists alphabet lessons, not individual letters.
- UI direction: To be defined.
- Open questions: To be defined.

### Vocabulary catalog screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Shell / Navigation: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: MVP assumption: this screen lists vocabulary modules first, then lessons inside each module.
- UI direction: To be defined.
- Open questions: To be defined.

### Study screen

- Role: Preview all items in a lesson before playing.
- Entry point: To be defined.
- Main user question: Am I ready to play this lesson?
- Primary decision: To be defined.
- Shell / Navigation: To be defined.
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
- Contains flow screens:
  - Game Lobby
  - Game Round
  - Game Round Feedback
  - Game Results
- Entry point: Student arrives from Study for a specific lesson.
- Exit points:
  - back to Study
  - replay game
  - go to another lesson / learn area
- Shell / Navigation: To be defined.
- Open questions: To be defined.

#### Game Lobby flow screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Shell / Navigation: To be defined.
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
- Shell / Navigation: To be defined.
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
- Shell / Navigation: To be defined.
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
- Shell / Navigation: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: To be defined.
- UI direction: To be defined.
- Open questions: To be defined.

### Translit screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Shell / Navigation: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: To be defined.
- UI direction: To be defined.
- Open questions: To be defined.

### Settings screen

- Role: To be defined.
- Entry point: To be defined.
- Main user question: To be defined.
- Primary decision: To be defined.
- Shell / Navigation: To be defined.
- Primary actions: To be defined.
- Secondary actions: To be defined.
- What this screen should communicate: To be defined.
- What this screen should not try to do: To be defined.
- Content: To be defined.
- UI direction: To be defined.
- Open questions: To be defined.

# UI

## Screen surfaces

Every screen is composed of 3 surfaces:
1. Top bar
2. Main
3. Controls

### Top bar area

There are different types of top bar areas, depending on the page / screen:
- standard top bar
- game top bar

#### Standard top bar

The contents depend on the screen.

Layout:
- app logo or back button
- screen title
- contextual actions

#### Game top bar

Contents:
- To be defined

### Bottom area

There are different types of control areas:
- dock (buttons for top-level navigation)
- CTA area (buttons for screen-specific actions like "play" or "continue")
- game controls area (answer buttons for game rounds)

## Design system

Not defined yet.

## Components catalog

Not defined yet.

# Releases

## MVP

### Included

- Learn / Explore entry (choice between Alphabet and Vocabulary)
- Explore pages for alphabet and vocabulary lessons
- Study page for lesson preview
- Play page hosting the lesson game:
  - Game Lobby screen
  - Game Round screen
    - 1 minigame type: question with 4 answer options
  - Game Round Feedback screen
  - Game Results screen
- Translit utility page
- Settings page for language switching

## Next releases

### Future work (prioritized)
- offline mode
- examples based on user activity
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

# Open questions

Not defined yet.

# Decisions log

- Recommendation mode is postponed until after MVP
- Grammar is postponed until after MVP
- Item-level activity tracking exists and is sufficient as a low-level base for future derived behavior
- Learn opens directly into Explore for the MVP
- Explore entry is a two-choice gateway: Alphabet or Vocabulary
- The dock is visible on top-level destination screens and hidden on internal learning flow screens

# Next steps

Not defined yet.
