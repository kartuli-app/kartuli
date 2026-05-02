---
description: Reusable UI rules, global surfaces, responsive behavior, and component families for the game client.
---

# UI System

This document owns reusable UI rules, global UI surfaces, responsive behavior, and component families.

It is the authoritative UI source of truth. `DESIGN.md` may summarize this material for AI assistants, but it does not replace it.

## UI contract

- screen-specific structure belongs in [Screens](./07-screens.md)
- route-level navigation targets belong in [Routing and Flows](./06-routing-and-flows.md)
- reusable visual and component-family rules belong here

## Screen anatomy

### Layout regions

Layout regions describe the stable frame of a screen.

- `Main area` is always required
- `Top bar` is optional and depends on the screen contract

### Navigation chrome

Navigation chrome covers UI elements that help the user move around the route structure.

The same navigation concept may render as:

- a dock
- a tab bar
- a sidebar

Dock membership itself is defined in [Routing and Flows](./06-routing-and-flows.md).

### Page header and title block

Some pages use only a compact top bar, while others use a fuller page header.

The default visible title treatment is a two-line title block.

Examples:

- `kartuli.app` / `Explore`
- `Explore` / `Alphabet`
- `Study` / `{resource title}`
- `Play` / `{resource title}`

Every route-rendered page still needs one clear primary heading for document structure and accessibility.

### Game top bar

The Play header changes by flow state:

- Lobby shows a back arrow, the Play title block, and the sound toggle
- Round and Feedback show the leave-game action, the hybrid progress indicator, and the sound toggle
- Results use a results-specific header and no back arrow

## Action placement

- actions may live inline when a separate action region is unnecessary
- a primary CTA may be sticky when a screen benefits from persistent progression actions
- Play answer controls live in a dedicated answer-control area rather than mixed with passive content

## Overlay and feedback families

Use a small set of overlay families.

Choose the family by interaction job first, not by visual shape first.

Families:

- blocking overlay
- context drawer
- tooltip
- notification

### Blocking overlays

Blocking overlays interrupt the current interaction until the student decides what to do.

The main blocking-overlay case is the Play leave confirmation surface.

Smaller screens may use a bottom sheet, while larger screens may use a centered modal without changing the interaction role.

### Context drawers

Context drawers are non-blocking and keep the underlying screen visible.

The main context-drawer case is the selected study-resource surface in module browsers.

### Tooltips

Tooltips are anchored helper surfaces for local explanation or inspection.

Current examples include:

- icon-button explanation
- translit token inspection

### Notifications

Notifications are global, non-anchored feedback surfaces.

Current notification cases include:

- sound toggled on or off
- copy-to-clipboard confirmation
- `Turn sound on to listen`
- Play positive feedback
- Play negative feedback

Notifications may vary by tone, such as:

- neutral
- positive
- negative

## Preview-grid language

### Shared terms

- `lesson card`
  - browse or catalog card for one study resource
- `preview grid`
  - the grid inside a lesson card
- `preview slot`
  - one fixed position inside a preview grid
- `preview asset`
  - the visual content inside a preview slot
- `summary card`
  - the Study summary surface for one study resource
- `summary item`
  - one item representation inside a summary card
- `detail card`
  - one focused item surface inside Study or Study-like review

### Shared preview-grid rules

- preview grids optimize for fast recognition, not literal full-payload display
- preview grids use fixed-size slots
- multi-card module-browser views keep equal card width and height
- a single full-review card may expand to more rows when it is shown on its own
- catalog overflow may use a `+N` slot
- Study summary never uses catalog-style overflow slots

### Preview asset families

Current preview asset families:

- letter preview asset
  - Georgian script
  - lined background
  - transliteration in brackets
- word preview asset
  - image, emoji, or other representational visual

If a new content type is introduced later, it should reuse the same slot and frame logic instead of inventing a separate preview-grid language.

### Catalog preview versus Study summary

- catalog cards optimize for quick selection
- Study summary reveals all items in the current resource
- alphabet catalog preview and alphabet Study summary may stay visually close
- vocabulary Study summary may reveal more information than the catalog preview while still borrowing the same underlying language

### Temporary emoji strategy

Emoji-based visuals are acceptable as a temporary preview language for word-based content.

Rules:

- emojis should live inside the same controlled slot frame as later curated assets
- the grid structure should not depend on emoji rendering as the final branded solution

## Global UI surfaces

### Privacy consent banner

- Role: collect the first optional-analytics decision without forcing a full-screen interruption
- Trigger: app init after privacy consent resolves to `unknown`
- Primary actions:
  - `Accept`
  - `Reject`
- Secondary actions:
  - open Privacy page
- Content:
  - short explanation of essential storage
  - short explanation of optional analytics
  - explicit `Accept` and `Reject` actions
- UI direction:
  - persistent until a choice is made
  - visible without hiding the active route
  - explicit, non-deceptive action hierarchy
- Open questions:
  - exact banner copy per locale
  - final placement on mobile and desktop

### Play leave confirmation surface

- Role: prevent accidental loss of session progress during an active round or feedback state
- Trigger: leave-game action during active Play after the session has started
- Primary actions:
  - `Resume game`
  - `Leave game`
- Secondary actions:
  - none
- Content:
  - short confirmation title
  - short message that current session progress will be lost
  - `Leave game` targets the canonical Study route for the current resource
- UI direction:
  - smaller screens use a bottom-sheet treatment
  - larger screens use a centered modal treatment
  - resume should feel like the safe default
- Open questions:
  - None

## Design-system principles

- the system is role-first and value-light
- semantic roles describe what an element is for, while a small set of shared foundation families provide the actual values
- one semantic role does not imply one unique token value
- product structure and interaction meaning come before ornamental styling
- the product should feel clear, warm, encouraging, and lightly playful rather than loud or overly decorative
- the reusable visual language should stay coherent across Learn, Study, Play, Translit, Settings, and recovery states

## Visual theme and color roles

### Atmosphere

- the product should feel like a focused mobile learning tool rather than a generic SaaS dashboard
- hierarchy, rhythm, and clear state styling should carry more weight than visual noise
- the mascot is the main recurring personality layer and should soften low-content and recovery states without taking over the interface
- most surfaces should stay calm so floating and interruptive surfaces feel special

### Color families

This doc defines semantic color roles first and leaves exact values flexible.

Semantic families:

- `neutral-*`
- `accent-*`
- `positive-*`
- `negative-*`
- `focus-*`

Rules:

- neutral carries most reading and surface behavior
- accent is a signal color, not a default large surface fill
- positive and negative are semantic state families, not decorative colors

### Surface roles

Semantic surface roles:

- `app-bg`
- `page-bg`
- `surface-default`
- `surface-subtle`
- `surface-prominent`
- `surface-overlay`
- `surface-slot`
- `surface-input`
- `surface-answer`
- `surface-banner`
- `surface-notification`

Rules:

- normal cards and panels primarily reuse `surface-default`
- smaller framed internal elements reuse `surface-slot`
- floating layers reuse `surface-overlay`

### State roles

Semantic state roles:

- `selected-*`
- `positive-*`
- `negative-*`
- `disabled-*`
- `muted-*`
- `focus-ring`

Rules:

- `selected`, `muted`, and `disabled` remain distinct meanings
- muted is not an error state and should not reuse negative styling by default

## Typography

### Foundation families

This doc defines typography foundations and semantic roles without locking exact font files or exact numeric sizes.

Type foundations:

- `type-1`
- `type-2`
- `type-3`
- `type-4`
- `type-5`
- `type-6`

Font-family foundations:

- `font-ui`
- `font-georgian`

Weight foundations:

- `weight-regular`
- `weight-medium`
- `weight-strong`

### Typography rules

- Georgian uses shared semantic roles with a font-family swap rather than a separate typography universe
- the largest responsive pressure sits on `type-5` and `type-6`
- smaller body and UI text usually stays stable unless a specific screen needs a stronger reason to differ

### Key semantic roles

Page and content roles:

- `page-eyebrow`
- `page-title`
- `support-copy`
- `section-title`
- `card-title`
- `body`
- `caption`

Control roles:

- `button-label`
- `input-text`
- `tooltip-text`

Browse preview roles:

- `preview-letter-georgian`
- `preview-letter-translit`
- `preview-overflow`

Study roles:

- `summary-item-georgian`
- `summary-item-translit`
- `summary-item-translation`
- `detail-letter-georgian`
- `detail-word-georgian`
- `detail-word-translation`

Play roles:

- `instruction-text`
- `cue-text`
- `answer-text`
- `progress-text`
- `result-score`
- `result-tone`

Utility and feedback roles:

- `notification-text`
- `banner-text`

## Layout, depth, and responsive rules

### Layout foundations

- use a small spacing family plus semantic spacing roles
- outer page padding stays shared across the app, including Play
- Study and Play rely on stronger vertical grouping than browse screens

### Shape and depth

Shape roles:

- `radius-1`
- `radius-2`
- `radius-3`

Separation roles:

- `stroke-1`
- `stroke-2`
- `shadow-1`
- `shadow-2`

Rules:

- most core surfaces are border-led and mostly flat by default
- shadow should be reserved for floating or interruptive surfaces
- blocking overlays should feel more elevated than drawers and notifications

### Responsive rule model

- the product remains mobile-first
- tablet and desktop preserve the same information architecture rather than inventing a different one
- Explore entry should aim to fit common mobile heights without scroll
- module-browser card grids use:
  - mobile: 1 card per row
  - tablet: 2 cards per row
  - desktop: 3 cards per row
- the full-review card may span more width than standard lesson cards on wider layouts
- touch-first interaction remains primary even when desktop keyboard support exists

## Component families

### Shared control primitives

- `button`
- `icon-button`
- `toggle-row`
- `input-field`
- `text-area`

### Shell and navigation

- `page-header`
- `topbar-row`
- `title-block`
- `support-copy`
- `dock`

### Browse and catalog

- `destination-card`
- `section-header`
- `module-header`
- `lesson-card`
- `full-review-card`
- `preview-grid`
- `preview-slot`
- `selected-resource-drawer`

Relationship rules:

- `destination-card` is separate from `lesson-card`
- `full-review-card` is a lesson-card-family variant, not a separate family
- `preview-grid` may be reused in Study summary only when the product behavior supports it

### Study

- `study-nav-bar`
- `summary-card`
- `detail-card`
- `sticky-play-cta`

Relationship rules:

- `summary-card` is one family with lesson-type variants
- `detail-card` is one family with item-type variants

### Play

- `lobby-panel`
- `lobby-option-row`
- `progress-indicator`
- `cue-block`
- `answer-option`
- `feedback-notification`
- `results-review-block`
- `leave-game-confirmation`

Relationship rules:

- `cue-block` is one family with content-type variants
- `answer-option` is its own family because it carries Play-specific state semantics

### Utility and public

- `reading-surface`
- `settings-section`
- `privacy-banner`
- `translit-source-panel`
- `translit-output-panel`
- `token-inspection-tooltip`

### Overlay relationships

- `selected-resource-drawer` belongs to the context-drawer family
- `leave-game-confirmation` belongs to the blocking-overlay family
- `token-inspection-tooltip` belongs to the tooltip family
- `feedback-notification` belongs to the notification family

## Design guardrails

- preserve the distinction between reference behavior, Study review behavior, and Play interaction behavior
- keep reusable component families visually related unless product meaning requires a distinction
- prefer semantic roles mapped onto small foundation families over one-off custom values
- do not treat mute as an error
- do not let catalog-preview behavior leak into Study or Play where the product behavior differs
- do not introduce Study-summary overflow slots modeled after browse-card overflow

