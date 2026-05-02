# UI System

This document owns reusable UI rules, design-system roles, responsive rules, component families, and non-route global UI surfaces.

It is the authoritative UI source of truth. [../DESIGN.md](../DESIGN.md) is derived assistant guidance only.

## UI contract

- `Confirmed`: screen-specific structure lives in [screens.md](screens.md)
- `Confirmed`: route-level navigation targets live in [routing-and-flows.md](routing-and-flows.md)
- `Confirmed`: this doc owns reusable visual/system rules and shared component families

## Screen anatomy

### Layout regions

- `Confirmed`: layout regions describe the stable frame of a screen
- `Confirmed`: `Main area` is always required
- `Confirmed`: `Top bar` is optional and depends on the route/screen contract

### Navigation chrome

- `Confirmed`: navigation chrome includes UI elements that help the user move around the route structure
- `Confirmed`: the same navigation concept may render as a dock, tab bar, or sidebar depending on device
- `Confirmed`: dock membership itself is owned by `routing-and-flows.md`

### Page header and title block

- `Confirmed`: some pages use only a compact top bar, while others use a fuller page header
- `Confirmed`: the default visible title treatment is a two-line title block
- Examples:
  - `kartuli.app` / `Explore`
  - `Explore` / `Alphabet`
  - `Study` / `{resource title}`
  - `Play` / `{resource title}`
- `Confirmed`: every route-rendered page still exposes one clear primary heading for document structure and accessibility

### Game top bar

- `Current MVP`: Lobby shows back arrow, Play title block, and sound toggle
- `Current MVP`: Round and Feedback show leave-game action, hybrid progress indicator, and sound toggle
- `Current MVP`: Results use a results-specific header and no back arrow

## Action placement

- `Confirmed`: actions may live inline in the main area when a separate action region is unnecessary
- `Confirmed`: a primary CTA may be sticky when a screen benefits from persistent progression actions
- `Confirmed`: Play answer controls live in a dedicated answer-control area rather than mixed with passive content

## Overlay and feedback families

### Family rules

- `Current MVP`: use a small overlay-and-feedback system rather than many unrelated surface concepts
- `Confirmed`: choose the family by interaction job first, not by visual shape first
- Families:
  - blocking overlay
  - context drawer
  - tooltip
  - notification

### Blocking overlays

- `Confirmed`: blocking overlays interrupt the current interaction until the student decides what to do
- `Current MVP`: the main blocking-overlay case is the Play leave confirmation surface
- `Confirmed`: smaller screens may use a bottom sheet, while larger screens may use a centered modal without changing the interaction role

### Context drawers

- `Confirmed`: context drawers are non-blocking and keep the underlying screen visible
- `Current MVP`: the main context-drawer case is the selected study-resource surface in module browsers

### Tooltips

- `Confirmed`: tooltips are anchored helper surfaces for local explanation or inspection
- `Current MVP`: examples include icon-button explanation and translit token inspection

### Notifications

- `Confirmed`: notifications are global, non-anchored feedback surfaces
- `Current MVP`: notification cases include:
  - sound toggled on or off
  - copy-to-clipboard confirmation
  - `Turn sound on to listen`
  - Play positive feedback
  - Play negative feedback
- `Confirmed`: notifications may vary by tone such as neutral, positive, and negative

## Preview-grid language

### Shared terms

- `lesson card`
  - browse/catalog card for one study resource
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

- `Confirmed`: preview grids optimize for fast recognition, not literal full payload display
- `Confirmed`: preview grids use fixed-size slots
- `Current MVP`: multi-card module-browser views keep equal card width and height
- `Current MVP`: a single full-review card may expand to more rows when it is shown on its own
- `Confirmed`: catalog overflow may use a `+N` slot
- `Confirmed`: Study summary never uses catalog-style overflow slots

### Preview asset families

- `Current MVP`: letter preview asset
  - Georgian script
  - lined background
  - transliteration in brackets
- `Current MVP`: word preview asset
  - image, emoji, or other representational visual
- `Post-MVP`: rule preview asset
  - illustration or symbolic marker
- `Confirmed`: consistency should come from the shared slot frame and per-type asset language, not from forcing every content type to look identical

### Catalog preview versus Study summary

- `Confirmed`: catalog cards optimize for quick selection
- `Confirmed`: Study summary reveals all items in the current resource
- `Confirmed`: alphabet catalog preview and alphabet Study summary may stay visually close
- `Confirmed`: vocabulary Study summary may reveal more information than the catalog preview while still borrowing the same underlying language

### Temporary emoji strategy

- `Current MVP`: emoji-based visuals are acceptable as a temporary preview language for word-based content
- `Confirmed`: emojis must live inside the same controlled slot frame as later curated assets
- `Confirmed`: the grid structure must not depend on emoji rendering as the final branded solution

## Global UI surfaces

### Privacy consent banner

- Status: `Current MVP`
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

- Status: `Current MVP`
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

- `Confirmed`: the design system is role-first and value-light
- `Confirmed`: semantic roles describe what an element is for, while a small set of shared foundation families later provide the actual values
- `Confirmed`: one semantic role does not imply one unique token value
- `Current MVP`: prefer a small number of foundation families with many semantic roles mapped onto them
- `Confirmed`: product structure and interaction meaning come before ornamental styling
- `Confirmed`: the product should feel clear, warm, encouraging, and lightly playful rather than loud or childishly gamified
- `Confirmed`: the reusable visual language should stay coherent across Learn, Study, Play, Translit, Settings, and recovery states

## Visual theme and color roles

### Atmosphere

- `Confirmed`: the product should feel like a focused mobile learning tool rather than a generic SaaS dashboard
- `Confirmed`: hierarchy, rhythm, and clear state styling should carry more weight than visual noise
- `Confirmed`: the mascot is the main personality layer and should soften low-content and recovery states without taking over the interface
- `Confirmed`: most surfaces should stay calm so floating/interruptive surfaces feel special

### Color families

- `Confirmed`: exact values are not locked yet
- Semantic families:
  - `neutral-*`
  - `accent-*`
  - `positive-*`
  - `negative-*`
  - `focus-*`
- `Confirmed`: neutral carries most reading and surface behavior
- `Confirmed`: accent is a signal color, not a default full-surface fill
- `Confirmed`: positive and negative are semantic state families, not decorative colors

### Surface roles

- `Confirmed`: the design system uses semantic surface roles before exact values are chosen
- Roles:
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
- `Confirmed`: normal cards and panels primarily reuse `surface-default`
- `Confirmed`: smaller framed internal elements reuse `surface-slot`
- `Confirmed`: floating layers reuse `surface-overlay`

### State roles

- `Confirmed`: the design system needs semantic state roles before exact values are chosen
- Roles:
  - `selected-*`
  - `positive-*`
  - `negative-*`
  - `disabled-*`
  - `muted-*`
  - `focus-ring`
- `Confirmed`: `selected`, `muted`, and `disabled` remain distinct meanings
- `Confirmed`: muted is not an error state and should not reuse negative styling by default

## Typography

### Foundation families

- `Confirmed`: exact fonts and numeric sizes are not locked yet
- Type foundations:
  - `type-1`
  - `type-2`
  - `type-3`
  - `type-4`
  - `type-5`
  - `type-6`
- Font-family foundations:
  - `font-ui`
  - `font-georgian`
- Weight foundations:
  - `weight-regular`
  - `weight-medium`
  - `weight-strong`

### Role mapping

- `Confirmed`: Georgian uses shared semantic roles with a font-family swap rather than a separate typography universe
- `Current MVP`: the biggest responsive type pressure sits on `type-5` and `type-6`
- `Confirmed`: smaller body and UI text usually stays stable unless a screen has a strong reason to differ

Key semantic roles:

- Page/content:
  - `page-eyebrow`
  - `page-title`
  - `support-copy`
  - `section-title`
  - `card-title`
  - `body`
  - `caption`
- Controls:
  - `button-label`
  - `input-text`
  - `tooltip-text`
- Browse preview:
  - `preview-letter-georgian`
  - `preview-letter-translit`
  - `preview-overflow`
- Study:
  - `summary-item-georgian`
  - `summary-item-translit`
  - `summary-item-translation`
  - `detail-letter-georgian`
  - `detail-word-georgian`
  - `detail-word-translation`
- Play:
  - `instruction-text`
  - `cue-text`
  - `answer-text`
  - `progress-text`
  - `result-score`
  - `result-tone`
- Utility/feedback:
  - `notification-text`
  - `banner-text`

## Layout, depth, and responsive rules

### Layout foundations

- `Confirmed`: use a small spacing family plus semantic spacing roles
- `Confirmed`: outer page padding stays shared across the app, including Play
- `Confirmed`: Study and Play rely on stronger vertical grouping than browse screens

### Shape and depth

- Shape roles:
  - `radius-1`
  - `radius-2`
  - `radius-3`
- Separation roles:
  - `stroke-1`
  - `stroke-2`
  - `shadow-1`
  - `shadow-2`
- `Confirmed`: most core surfaces are border-led and mostly flat by default
- `Confirmed`: shadow should be reserved for floating or interruptive surfaces
- `Confirmed`: blocking overlays should feel more elevated than drawers and notifications

### Responsive rule model

- `Confirmed`: the product remains mobile-first
- `Confirmed`: tablet and desktop preserve the same IA rather than inventing a separate one
- `Current MVP`: Explore entry should aim to fit common mobile heights without scroll
- `Current MVP`: module-browser card grids use:
  - mobile: 1 card per row
  - tablet: 2 cards per row
  - desktop: 3 cards per row
- `Current MVP`: the full-review card may span more width than standard lesson cards on wider layouts
- `Confirmed`: touch-first interaction remains primary even when desktop keyboard support exists

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

- `Confirmed`: `destination-card` is separate from `lesson-card`
- `Confirmed`: `full-review-card` is a lesson-card-family variant, not a separate family
- `Confirmed`: `preview-grid` may be reused in Study summary only when the product behavior supports it

### Study

- `study-nav-bar`
- `summary-card`
- `detail-card`
- `sticky-play-cta`

Relationship rules:

- `Confirmed`: `summary-card` is one family with lesson-type variants
- `Confirmed`: `detail-card` is one family with item-type variants

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

- `Confirmed`: `cue-block` is one family with content-type variants
- `Confirmed`: `answer-option` is its own family because it carries Play-specific state semantics

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

- `Confirmed`: preserve the distinction between reference behavior, Study review behavior, and Play interaction behavior
- `Confirmed`: keep reusable component families visually related unless product meaning requires a distinction
- `Confirmed`: prefer semantic roles mapped onto small foundation families over one-off custom values
- `Confirmed`: do not treat mute as an error
- `Confirmed`: do not let catalog-preview behavior leak into Study or Play where the product behavior differs
- `Confirmed`: do not introduce Study-summary overflow slots modeled after browse-card overflow
