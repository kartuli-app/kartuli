---
description: Stable conceptual model, glossary, localization, learning content, activity, and mastery for the product.
---

# Core

This document owns the stable conceptual model of the product.

## Glossary

### Public section

The information-facing part of the product.

Current public page:

- `/{locale}/privacy`

### App section

The learning-side part of the product.

Current top-level destinations:

- Learn
- Translit
- Settings

### Learn

The main learning area of the product.

### Explore

The manual lesson-selection mode inside Learn.

### Study

The preview and review stage before Play.

Study is optional and does not gate Play.

### Play

The active game stage for one study resource.

### Game

A Play session generated from one study resource.

The current game structure is:

- Game Lobby
- Game Round
- Game Round Feedback
- Game Results

Each session has one active round at a time.

### Translit

The utility route for Georgian <-> Latin transliteration.

### Settings

The utility route for app-wide preferences and metadata.

### Lesson

A user-facing study resource that the student can choose, study, and play.

### Module

A group of lessons.

### Module review set

A generated study and play resource built from all items in one module.

It is not an authored lesson, but it is still a first-class study and play resource with its own Study and Play routes.

When a full visible title is needed, use:

`{module name}: Full review`

### Global not found

The recovery state for a URL that does not match a controlled route pattern.

### Resource unavailable

The recovery state for a valid controlled route that cannot load the lesson or module review set it needs.

## Product modeling hierarchy

Use this hierarchy when modeling product behavior:

`Route -> Page -> Screen / Flow screen -> UI state`

Definitions:

- `Route`
  - a URL-addressable destination in the product model
- `Page`
  - the implementation bound to a route when that route renders UI
- `Screen`
  - a user-facing interface state presented by a page
- `Flow screen`
  - a screen inside a page flow that is not directly landable by URL
- `UI state`
  - a smaller transient state inside a screen

## Localization

- Supported locales: English (`en`) and Russian (`ru`)
- Default locale: English (`en`)
- Localized public and app routes use the `/{locale}/...` pattern
- `/` is the non-localized locale-resolution route

## Learning-content model

### Alphabet

Letters are a first-class learning content type.

They support:

- Georgian script
- transliteration
- pronunciation hint

### Vocabulary

Words and phrases are a first-class learning content type.

They support:

- Georgian script
- transliteration
- translation

### Lessons and modules

Lessons are the unit the student chooses, studies, and plays.

Modules group lessons together.

Vocabulary is currently organized as module-based content, and modules may also expose one generated module review set.

### Module review-set ordering

Module review sets are derived from one authored module.

Their item order follows:

- lesson order first
- item order inside each lesson second

If the same item appears more than once, the first occurrence wins and later repeats are skipped.

## Student activity

The product tracks activity at item level.

The low-level tracked fact is:

- item view count

This is intentionally simple so richer behavior can be derived later without changing the base model.

## Mastery

The documented product model does not currently expose a first-class mastery state.

The current foundation is low-level item activity. That foundation can support richer mastery interpretation later without changing the current core model.

