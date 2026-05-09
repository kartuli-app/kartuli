description: Utility screen for changing the app language.
---

# Settings Screen

## Purpose

Settings is the utility screen for changing the app language.

## Route

- `/{locale}/settings`

## Navigation

- no back arrow
- dock is visible
- active dock item: `Settings`

Main exits:

- `Learn` from the dock -> `/{locale}/explore`
- `Translit` from the dock -> `/{locale}/translit`

## Layout

- top bar with title `Settings`
- one language section
- bottom dock

## Actions

- `Change language` updates the stored preferred locale and navigates to the equivalent localized route immediately.

## Content

- title: `Settings`
- one `Language` section
- current language value
- language choices: English (`en`) and Russian (`ru`)

## Notes

- Settings supports language selection only.
- Language changes apply immediately.
