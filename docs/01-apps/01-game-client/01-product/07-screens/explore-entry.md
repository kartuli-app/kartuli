---
description: Top-level Learn entry screen for choosing Alphabet or Vocabulary.
---

# Explore Entry Screen

## Purpose

Explore entry is the top-level Learn screen.

It lets the student choose whether to go to `Alphabet` or `Vocabulary`.

This screen is curated, not personalized.

## Route

- Entry route: `/{locale}/explore`
- Initial localized route: yes

## Navigation

- No back arrow
- Dock is visible
- Active dock item: `Learn`

Main exits:

- `Alphabet` -> `/{locale}/explore/alphabet`
- `Vocabulary` -> `/{locale}/explore/vocabulary`
- `Translit` from the dock -> `/{locale}/translit`
- `Settings` from the dock -> `/{locale}/settings`

## Layout

- branded header
- screen title and short support copy
- two large destination cards
- bottom dock

## Content

- Title: `Explore`
- Support copy: `Choose what you want to learn.`
- `Alphabet` card copy: `Learn Georgian letters step by step.`
- `Vocabulary` card copy: `Learn useful words and phrases by topic.`

## Variants

- Default
  - shows the header, the two destination cards, and the dock

## Notes

- The two destinations should feel like primary choices, not like lesson cards.
- This screen does not include recommendations.
- This screen should fit common mobile heights without scroll.
