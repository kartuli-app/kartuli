---
description: Lightweight catalog of product UI components derived from the current screen definitions.
---

# Component Catalog

This document collects product UI components in a lightweight way.

Screen behavior stays in the screen docs.

## Purpose

This first pass focuses on product-level UI components.

Primitive controls and lower-level foundations can be added later.

## Components

### Dock

- Purpose: top-level navigation between the main product areas
- Used in:
  - [Explore Entry Screen](./07-screens/explore-entry.md)
  - [Translit Screen](./07-screens/translit.md)
  - [Settings Screen](./07-screens/settings.md)
- Items:
  - `Learn`
  - `Translit`
  - `Settings`
- Behavior:
  - exactly one item is active on each screen where the dock is visible
  - selecting another item navigates to that route immediately
- Notes:
  - the dock is not shown in Browse, Study, Play, or Recovery

### Top Bar

- Purpose: compact page-level header for route screens and route-owned states
- Used in:
  - [Browse Screen](./07-screens/browse.md)
  - [Study Screen](./07-screens/study.md)
  - [Play Lobby Screen](./07-screens/play/lobby.md)
  - [Play Mistakes Review Screen](./07-screens/play/mistakes-review.md)
  - [Recovery Screens](./07-screens/recovery.md)
  - [Translit Screen](./07-screens/translit.md)
  - [Settings Screen](./07-screens/settings.md)
- Common content:
  - title
  - optional subtitle
  - optional back arrow
- Variants:
  - back-arrow top bar
  - title-only top bar
- Notes:
  - the Play Round screen uses its own round header instead of the standard top bar
  - the Play Results screen uses its own results header instead of the standard top bar
  - the Explore Entry screen uses a branded header instead of the standard top bar
