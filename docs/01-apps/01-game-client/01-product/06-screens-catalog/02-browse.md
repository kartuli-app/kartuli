---
description: Shared Browse screen for choosing alphabet or vocabulary lessons and module review sets.
---

# Browse Screen

## Purpose

Browse is the shared screen for choosing a lesson or a module review set before `Study` or `Play`.

The route decides which content family the screen is browsing.

## Routes

- `/{locale}/explore/alphabet`
- `/{locale}/explore/vocabulary`

Route-provided data:

- title
- content family
- authored lessons
- module review set

## Navigation

- back arrow to `/{locale}/explore`
- no dock

## Layout

- top bar with fixed subtitle `Explore`
- route-provided title
- lesson cards
- one `Full review` card
- selected-study-resource bottom sheet

## Card Format

- All browse cards use the same format.
- Each card includes:
  - title
  - preview grid
- The title is either the lesson title or `Full review`.
- The preview grid uses square slots.
- The grid structure stays the same across content families.
- The grid is for fast recognition, not full item detail.

## Selected Study Resource Bottom Sheet

- Selecting a card opens a non-blocking bottom sheet.
- The selected study resource is either:
  - a lesson
  - a module review set
- The sheet shows:
  - the selected card title
  - `Study`
  - `Play`
- The selected card title is either the lesson title or `Full review`.
- The sheet can be closed.
- The sheet can be dismissed with a gesture.
- Selecting another card updates the same sheet in place.
- The sheet does not close and reopen when the selection changes.

## Preview Visual Asset Variants

### Letter Preview Asset

- Georgian letter
- transliteration in brackets on the second row

Example:

```text
ი
[i]
```

### Word Preview Asset

- visual asset
- does not show the full text payload inside the grid

## Variants

- `Alphabet`
  - title: `Alphabet`
  - preview visual asset: letter preview asset
- `Vocabulary`
  - title: `Vocabulary`
  - preview visual asset: word preview asset
- `Selected resource`
  - when a lesson or `Full review` is selected, show contextual `Study` and `Play` actions

## Notes

- `Full review` is the UI label for the module review set.
- The card format and grid stay the same across content families.
- Only the preview visual asset changes by content family.
- Browse should not turn into embedded Study.
- Richer text belongs in Study, not in the browse grid.
- Additional content families should reuse the same screen, card, and grid, and only add a new preview visual asset variant.
