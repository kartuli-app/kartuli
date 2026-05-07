---
description: Time-scoped scope, deferred work, candidate routes, and reduced decision history for the game client.
---

# Roadmap and Decisions

This document owns time-scoped product scope, future work, candidate routes and pages, backlog, and reduced decision history.

## Current scope: MVP

### Internazionalization, seo and metadata
 - Localized routing with English (`en`) as default and Russian (`ru`) as supported locale
 - Localized metadata fallback per locale
 - SEO metadata for all included pages
 - Root route `/` redirecting to `Explore entry` via preferred locale resolution

### Learning content:

- 1 alphabet module with multiple lessons
- 1 vocabulary module with multiple lessons

### Explore experience:

- Explory entry to choose between alphabet and vocabulary browser experience

### Browser experience:

- Two sections: list of authored lessons cards and full review card (from the items of all lessons)

- Each card has title (lesson title or "Full review") and items preview grid

- ALl items are shown on the preview grid

- Preview grid shows 4 items per row, as many rows as needed

- Preview cell for letter items shows georgian letter and transliteration

- Preview cell for vocabulary items shows visual asset

- Selecting any card (lesson or full review) opens a non blocking bottom sheet with selected card title and Study and Play actions

### Study experience

- Shared experience navigation between summary and detail, with buttons to navigate between them and a persistent Play action

- Summary is a scrollable surface with a summary 

- Summary item cell for letter items shows georgian letter and transliteration

- Letter summary item cel

- Summary ce

  - summary with all the items
  - detailed flashcards for each item
  - navigation between summary and details
  - persistent Play action

### Play experience

- Game lobby
- Multiple game rounds
- Game results

#### Game rounds

- 1 type of minigame: single choice
- single choice variants for alphabet rounds:
  - question: georgian letter, answers: transliteration
  - question: transliteration, answers: georgian letter
- single choice variants for vocabulary rounds:
  - question: georgian word, answers: student language translation
  - question: student language translation, answers: georgian word

### Translit utility:

- Translit utility page with source text input and transliteration output
- Token inspection tooltip for transliteration output

### Settings utility:

- Language selection

## Post-MVP priorities (candidate future work, non sorted)

- optional consent gated analytics
- add audio playback to browser experience
- add audio playback to study experience
- add audio playback to play experience
- add grammar content family (explore, browser, study, play)
- more single choice minigame variants
- more minigame types
- offline mode
- mastery tracking derived from low-level activity
- recommendation mode based on user activity
- search experience
- favorites experience
- account experience
- spanish language support