---
description: Planned product specification — Utility screen for changing the app language.
status: planned
intent: specification
---

# Settings Screen

> **Status: planned specification.** This page describes the target product; some elements already exist. See the [current implementation inventory](../../index.md) for shipped routes, architecture and known gaps. Do not treat this specification as evidence that all described behavior is implemented.

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
