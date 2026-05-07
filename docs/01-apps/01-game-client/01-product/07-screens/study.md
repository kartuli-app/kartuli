---
description: Shared Study screen for reviewing a route-provided item set before Play.
---

# Study Screen

## Purpose

Study is the shared screen for reviewing a route-provided item set before `Play`.

The route decides which set is loaded, which content family it belongs to, which title is shown, and where the route-level back arrow returns.

## Routes

- `/{locale}/lessons/{lessonId}/study`
- `/{locale}/modules/{moduleId}/review/study`

Route-provided data:

- title
- content family
- item set
- back target

## Navigation

- route-level back arrow to the relevant Browse route
- no dock

## Layout

- top bar with route-provided title
- study navigation bar
- current card area
- persistent `Play` button

## Study Navigation Bar

- `Summary` icon button
- `Previous` arrow
- status text
- `Next` arrow

Behavior:

- `Summary` returns to summary
- `Summary` is active when the screen is already in summary
- `Previous` is disabled in summary
- status shows `{x} items` in summary
- `Next` from summary opens the first detail item
- status shows `{current}/{total}` in detail
- `Previous` from the first detail item returns to summary
- `Next` moves to the next detail item
- `Next` is disabled on the last detail item

## Persistent Play Button

- `Play` is always visible
- `Play` can be activated from summary or detail

## Summary Card

- Summary is scrollable.
- Summary shows all items in the current set.
- Selecting a summary item opens the detail card for that item.
- The same experience works for small sets and large sets.

## Summary Card Variants

### Letter Summary Cell

- same content model as the letter preview visual asset
- Georgian letter
- transliteration in brackets

### Word Summary Cell

- one summary item per row
- three blocks:
  - visual asset
  - Georgian block
  - translation block
- the Georgian block shows:
  - Georgian text
  - transliteration in brackets

## Detail Card

- Detail shows one item at a time.
- Every detail card includes:
  - main item content
  - two examples
  - one labeled note block
- In both examples, the current item is highlighted.
- The labeled note block uses the same structure across content families.
- The label changes by content family.

## Detail Card Variants

### Letter Detail Card

- larger letter display
- Georgian letter
- transliteration
- `Pronunciation hint` note block
- two example words with the current letter highlighted

### Word Detail Card

- detail visual asset
- Georgian text
- transliteration
- translation
- `Note` block
- two example phrases with the current word highlighted

## Notes

- Study is agnostic to whether the current set came from a lesson or a module review.
- Current item position is internal screen state, not URL state.
- Browse and Study may use related item representations, but Study can reveal more detail.
- Study should not gate `Play`.
