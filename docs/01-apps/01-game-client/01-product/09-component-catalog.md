---
description: Lightweight catalog of product UI components derived from the current screen definitions.
---

# Component Catalog

This document collects product UI components in a lightweight way.

Screen docs define composition and behavior.

This catalog defines the product components those screens are built from.

## Purpose

This first pass focuses on product-level UI components.

Primitive controls and lower-level foundations can be added later.

## Format

Each component entry focuses on:

- purpose
- inputs
- contains
- variants
- notes

This document does not describe primitives yet.

This first pass stays close to the current screen docs.

It only promotes blocks that are already clear product components.

Screen-level copy and one-off layout content stay in the screen docs until they need their own reusable component.

## Components

### Dock

- Purpose:
  - top-level navigation between the main product areas
- Inputs:
  - navigation items
  - active item
  - per-item target
- Contains:
  - one row of navigation items
- Variants:
  - none in this first pass
- Notes:
  - exactly one item is active on each screen where the dock is visible
  - selecting another item navigates to that route immediately
  - the dock is not shown in Browse, Study, Play, or Recovery

Current dock items:

  - `Learn`
  - `Translit`
  - `Settings`

### Top Bar

- Purpose:
  - compact page-level header for route screens and route-owned states
- Inputs:
  - title
  - subtitle
  - left-slot content
  - optional right-slot content
- Contains:
  - left slot
  - title block
  - right slot
- Variants:
  - `standard`
    - uses a back arrow in the left slot
  - `branded`
    - uses the brand logo in the left slot
- Notes:
  - `standard` is the default form
  - the title block remains the same across variants
  - the Play Round screen uses a separate `RoundHeader`
  - the Play Results screen uses a separate results header

### Destination Card

- Purpose:
  - large primary destination link from Explore entry into one learning area
- Inputs:
  - title
  - card copy
  - destination target
  - optional visual treatment
- Contains:
  - title
  - card copy
  - destination visual treatment
- Variants:
  - none in this first pass
- Notes:
  - `Alphabet` and `Vocabulary` are content instances, not component variants
  - future destinations such as `Grammar` can reuse the same component
  - destination cards should feel like top-level choices, not like lesson cards
  - the screen-level support copy in Explore entry is not part of `DestinationCard`
