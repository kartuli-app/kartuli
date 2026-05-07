---
description: Current MVP scope, explicit exclusions, and post-MVP candidates for the game client.
---

# Roadmap

This document owns the current MVP scope for the game client.

It should answer one question clearly: what is included in the MVP right now?

This document defines scope only.
The detailed behavior of included screens belongs in the screen docs.

## Current target: MVP

### Product loop

The MVP learning loop is:

**Explore -> Study (optional) -> Play -> repeat**

### Localization and routing

- English (`en`) is the default locale.
- Russian (`ru`) is also supported.
- The root route `/` redirects to the localized Explore entry using preferred locale resolution.
- Included routes are localized.
- Included routes have localized metadata.

### Recovery

- The MVP includes a global not-found page for invalid URLs.
- The MVP includes a Study resource not-found state for valid Study routes that cannot load their lesson or module review.
- The MVP includes a Play resource not-found state for valid Play routes that cannot load their lesson or module review.

### Learning content

- 1 alphabet module with multiple lessons
- 1 vocabulary module with multiple lessons
- lesson sets
- module review sets

### Explore

- Explore is the top-level learning entry.
- Explore lets the student choose between `Alphabet` and `Vocabulary`.
- Explore in MVP is curated, not personalized.

### Browser

- The MVP includes an alphabet browser and a vocabulary browser.
- Each browser lists authored lessons for its module.
- Each browser also includes one `Full review` entry for the whole module.
- Selecting a lesson or `Full review` exposes the next available actions: `Study` and `Play`.

### Study

- Study is available for lessons and module review sets.
- Study is optional. It is a preview step before Play, not a requirement.
- Study includes:
  - a summary of all items in the selected set
  - an item detail view
  - navigation between summary and detail
  - a persistent way to start Play

### Play

- Play is available for lessons and module review sets.
- Play includes:
  - lobby
  - round
  - feedback
  - results
- MVP gameplay uses one minigame type: `single-choice`.
- Included alphabet round variants:
  - question: Georgian letter, answers: transliteration
  - question: transliteration, answers: Georgian letter
- Included vocabulary round variants:
  - question: Georgian word, answers: student-language translation
  - question: student-language translation, answers: Georgian word
- Results focus on reviewing failed items and choosing the next step.

### Translit

- The MVP includes the Translit utility.
- Translit supports:
  - editable source text
  - live transliteration output
  - direction switch between Georgian and Latin
  - output copy
  - token-level inspection

### Settings

- The MVP includes the Settings utility.
- Settings supports language selection.

## Post-MVP candidates

- grammar content family
- more single-choice variants
- more minigame types
- mastery tracking derived from activity
- recommendation mode based on activity
- search
- favorites
- custom lessons
- account experience
- seasonal lessons
- offline mode
- additional supported languages
