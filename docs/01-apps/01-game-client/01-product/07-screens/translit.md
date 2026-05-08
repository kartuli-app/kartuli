---
description: Utility screen for transliterating text between Georgian and Latin with live output and token inspection.
---

# Translit Screen

## Purpose

Translit is the utility screen for transliterating text between Georgian and Latin.

It supports live output, direction switching, output copy, and token-level inspection.

## Route

- `/{locale}/translit`

## Navigation

- no back arrow
- dock is visible
- active dock item: `Translit`

Main exits:

- `Learn` from the dock -> `/{locale}/explore`
- `Settings` from the dock -> `/{locale}/settings`

## Layout

- top bar with title `Translit`
- source panel
- output panel
- bottom dock

## Directions

- Georgian -> Latin
- Latin -> Georgian

## Actions

- enter or paste source text
- clear source text
- switch direction
- copy output
- inspect token mapping

## Content

- source text is editable
- output is read-only
- output preserves whitespace runs
- punctuation stays attached to the surrounding token

## Behavior

- transliteration updates on every input change
- switching direction turns the current output into the new input
- token inspection reveals the matching source token for the selected output token
- token inspection uses token mapping, not character-position comparison
- direction is not persisted between visits in MVP

## Notes

- Translit is a utility screen, not part of the Study or Play flow.
- Source and output should remain clearly separated.
- The output panel should clearly communicate that it is read-only.
- Token inspection should remain reachable without requiring the user to infer hidden structure.
