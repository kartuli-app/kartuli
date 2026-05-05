---
version: alpha
name: kartuli.app
description: |
  A mobile-first Georgian language learning app for short lessons and simple games.
  The visual system is warm, focused, lightly playful, and neutral-first. Most UI is calm
  and border-led, with primary color used as a restrained signal for progression, active
  navigation, and selected context. Success and fail colors exist as semantic tokens for
  Play feedback, but the initial theme keeps them restrained so the interface can mature
  from a stable neutral foundation.

colors:

  # Required by the @google/design.md linter as a top-level primary sentinel.
  # Not a brand token — use brand-color-* tokens in the app instead.
  primary: "#ca00e8"

  brand-color-primary-soft: "#edb1ff"
  brand-color-primary: "#ca00e8"
  brand-color-primary-strong: "#570065"

  brand-color-neutral-soft: "#c3c7c7"
  brand-color-neutral: "#767979"
  brand-color-neutral-strong: "#101111"

  brand-color-semantic-success-soft: "#aafebb"
  brand-color-semantic-success: "#32e970"
  brand-color-semantic-success-strong: "#0d5a27"

  brand-color-semantic-error-soft: "#f19d9d"
  brand-color-semantic-error: "#942121"
  brand-color-semantic-error-strong: "#460a0a"

typography:
  brand-typography-title:
    fontSize: 24px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: -0.2px

  brand-typography-subtitle:
    fontSize: 18px
    fontWeight: 600
    lineHeight: 23px
    letterSpacing: 0px

  brand-typography-button:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px

rounded:
  brand-radius-none: 0px
  brand-radius-1: 8px
  brand-radius-2: 16px
  brand-radius-3: 24px
  brand-radius-full: 9999px

spacing:
  brand-spacing-1: 4px
  brand-spacing-2: 8px
  brand-spacing-3: 12px
  brand-spacing-4: 16px

components:
  appbar-title:
    backgroundColor: "transparent"
    textColor: "{colors.brand-color-neutral}"
    typography: "{typography.brand-typography-title}"

  button-primary:
    backgroundColor: "{colors.brand-color-primary}"
    textColor: "{colors.brand-color-neutral-soft}"
    typography: "{typography.brand-typography-button}"
    rounded: "{rounded.brand-radius-3}"
    padding: "{spacing.brand-spacing-3}"
---

## Overview

`kartuli.app` is a Georgian language learning product for short lessons and simple games. The core product promise is simple: when a student has a few free minutes, the interface should help them feel, “I practiced some Georgian.”

The design system is mobile-first, touch-first, and learning-first. It should feel warm, focused, encouraging, and lightly playful without becoming childish or visually noisy. The mascot is the main personality layer; the interface itself should stay calm, structured, and reusable.

The MVP is optimized for mobile web. On desktop, the app should render inside a centered mobile app shell rather than becoming a separate desktop product. Desktop support is intentional, but desktop optimization is post-MVP.

**Key characteristics:**

- Neutral-first visual system with restrained primary color usage.
- Rounded-rectangle shape language.
- Border-led surfaces rather than shadow-led surfaces.
- Short-session learning rhythm: Explore → optional Study → Play → Repeat.
- Georgian script gets a dedicated font family, but not a separate visual universe.
- Play states must be fast to scan and clearly distinct.
- Study and Explore should feel calmer than Play.
- AI tools must compose from the defined tokens and component families instead of inventing new styles.

## Colors

The color system is semantic and neutral-first. Most UI should be built from background, surface, border, and text tokens. Primary, success, and fail tokens exist from the start, but their first theme values are intentionally restrained.

### Compatibility Alias

- **Primary** (`{colors.primary}` — `#3A352F`) exists as a conventional `DESIGN.md` compatibility alias.
- App code and Tailwind utilities should prefer the searchable token name `{colors.brand-color-primary}`.

### Neutral Foundation

- **Background** (`{colors.brand-color-bg}`): outer app background and mobile shell surroundings.
- **Page** (`{colors.brand-color-page}`): page floor inside the app shell.
- **Surface** (`{colors.brand-color-surface}`): default cards, panels, controls, answer options, and normal content blocks.
- **Surface Muted** (`{colors.brand-color-surface-muted}`): preview slots, subtle panels, quiet grouped areas, and low-emphasis fills.
- **Surface Raised** (`{colors.brand-color-surface-raised}`): surfaces that need to separate from the page without changing the visual language.
- **Surface Overlay** (`{colors.brand-color-surface-overlay}`): bottom sheets, drawers, notifications, and blocking overlays.

### Borders and Text

- **Border** (`{colors.brand-color-border}`): default 1px framing for cards, slots, inputs, answer options, and sections.
- **Border Strong** (`{colors.brand-color-border-strong}`): emphasized selected/focused framing when color alone is not enough.
- **Text** (`{colors.brand-color-text}`): primary readable text.
- **Text Muted** (`{colors.brand-color-text-muted}`): support copy, captions, helper copy, inactive navigation labels.
- **Text Subtle** (`{colors.brand-color-text-subtle}`): disabled text and least-emphasis metadata.
- **Text Inverse** (`{colors.brand-color-text-inverse}`): text on primary filled actions.

### Primary

- **Primary Soft** (`{colors.brand-color-primary-soft}`): selected background, active context tint, and light emphasis.
- **Primary** (`{colors.brand-color-primary}`): primary CTA, active navigation, selected resource border/icon, and tiny emphasis moments.
- **Primary Strong** (`{colors.brand-color-primary-strong}`): pressed state, high emphasis, and stronger CTA feedback.

Primary is a signal, not a default fill. It should not be used to make every card colorful.

### Success and Fail

- **Success Soft** (`{colors.brand-color-success-soft}`): correct answer background and positive feedback tint.
- **Success** (`{colors.brand-color-success}`): correct answer border/icon/text signal.
- **Success Strong** (`{colors.brand-color-success-strong}`): strong positive state only when required.

- **Fail Soft** (`{colors.brand-color-fail-soft}`): wrong answer background and negative feedback tint.
- **Fail** (`{colors.brand-color-fail}`): wrong answer border/icon/text signal.
- **Fail Strong** (`{colors.brand-color-fail-strong}`): destructive or high-emphasis negative state only when required.

The initial success/fail values are restrained and close to neutral. This is intentional. Correct and wrong states must also use copy, icons, border strength, and layout so that they remain understandable before the palette becomes more colorful.

### Muted, Disabled, and Focus

- **Muted** (`{colors.brand-color-muted}`): still-interactive but sound-dependent behavior is unavailable.
- **Disabled** (`{colors.brand-color-disabled}`): unavailable and not interactive.
- **Focus** (`{colors.brand-color-focus}`): keyboard/accessibility focus ring.

Muted is not an error and must not use fail styling.

## Typography

The type system uses a general UI stack plus a Georgian-script stack. Georgian does not get a separate hierarchy; it uses the same role structure with a family swap where needed.

### Families

- **UI text:** Inter/system stack for English, Russian, transliteration, controls, and interface copy.
- **Georgian text:** Noto Sans Georgian stack for Georgian letters, words, and example phrases.

### Roles

- `{typography.brand-type-page-title}`: page identity, major route title, result title.
- `{typography.brand-type-section-title}`: section headings and module headers.
- `{typography.brand-type-card-title}`: lesson cards, destination cards, product-specific card titles.
- `{typography.brand-type-body}`: default readable UI copy.
- `{typography.brand-type-body-strong}`: answer options, emphasized body, compact labels.
- `{typography.brand-type-caption}`: helper text, captions, dock labels, small metadata.
- `{typography.brand-type-button}`: buttons and control labels.
- `{typography.brand-type-georgian-display}`: single-letter detail moments.
- `{typography.brand-type-georgian-word}`: focused Georgian word or phrase.
- `{typography.brand-type-georgian-body}`: Georgian examples, summary items, and readable Georgian copy.

### Principles

- Keep body text stable and legible.
- Put responsive typography pressure mainly on page titles and Georgian display moments.
- Do not create a separate typography universe for Georgian.
- Do not use heavy display type everywhere. The learning flow should feel calm and fast to scan.

## Layout

The layout system is mobile-first and shell-scoped.

### Mobile App Shell

- On mobile, the app fills the viewport.
- On tablet and desktop for MVP, the app remains inside a centered mobile shell.
- Recommended maximum shell width: 430px.
- Desktop should not stretch app bars, bottom docks, bottom sheets, or overlays across the full browser width.
- Dedicated desktop layouts are post-MVP.

### Spacing

Spacing uses a small scale:

- `{spacing.brand-spacing-1}`: 4px — micro gaps.
- `{spacing.brand-spacing-2}`: 8px — tight internal grouping.
- `{spacing.brand-spacing-3}`: 12px — compact control gaps.
- `{spacing.brand-spacing-4}`: 16px — default page/card spacing.
- `{spacing.brand-spacing-5}`: 20px — larger card padding.
- `{spacing.brand-spacing-6}`: 24px — section separation and larger internal rhythm.
- `{spacing.brand-spacing-8}`: 32px — major vertical grouping.
- `{spacing.brand-spacing-10}`: 40px — rare large breathing space.

### Page Rhythm

- Default page padding should start at `{spacing.brand-spacing-4}`.
- Cards and sections should use repeated gaps rather than one-off spacing.
- Explore and catalog screens are card-driven.
- Study and Play use stronger vertical grouping.
- Play should avoid luxury whitespace; it must stay compact and directed.

## Elevation & Depth

The system should feel mostly flat, framed, and calm.

### Elevation Model

- **Flat:** page floors and quiet content areas.
- **Framed:** normal cards, lesson cards, summary/detail cards, answer options, settings sections.
- **Floating:** bottom sheets, drawers, notifications, tooltips.
- **Blocking:** leave-game confirmation and other interruptive overlays.
- **Emphasized State:** selected, correct, wrong, focused, or active surfaces.

Normal content should separate with background and border, not shadows. Shadow is reserved for overlays and floating surfaces.

### Shadow Policy

- Do not use shadow as the default card treatment.
- If a floating surface needs lift, use one subtle shadow consistently in implementation.
- Blocking overlays may use a stronger shadow than notifications or drawers.
- The exact shadow values should live in CSS/Tailwind implementation, not as a custom top-level token group in this file until the specification formally supports it.

## Shapes

The shape language is rounded-rectangle based, calm, and touch-friendly.

### Radius Scale

- `{rounded.brand-radius-none}`: 0px — rare reset.
- `{rounded.brand-radius-sm}`: 8px — internal slots, compact controls.
- `{rounded.brand-radius-md}`: 14px — default cards, inputs, answer options, buttons.
- `{rounded.brand-radius-lg}`: 22px — destination cards, detail cards, sheets, prominent surfaces.
- `{rounded.brand-radius-shell}`: 28px — desktop mobile shell.
- `{rounded.brand-radius-full}`: 9999px — icon buttons, badges, pills when needed.

### Principles

- Most app surfaces use `{rounded.brand-radius-md}`.
- Prominent cards and overlays may use `{rounded.brand-radius-lg}`.
- Do not make every control a pill.
- Use full radius only for circular icon buttons, badges, and explicitly pill-shaped controls.

## Components

This section defines component families and their intended behavior. Production components should use the front matter tokens and should not introduce raw hex values or one-off spacing.

### Shell and Page

**`app-shell`**  
The app viewport boundary. On desktop, the shell is centered with max width around 430px and rounded corners. All fixed/sticky UI chrome must be scoped to the shell.

**`page`**  
Default screen surface. Uses `{colors.brand-color-page}` with shared padding.

**`page-header` / `title-block`**  
Used for visible page identity. Some pages use a compact top bar, others use a larger title block. Every route still needs one primary heading for accessibility.

### Buttons

**`button-primary`**  
Primary CTA. Use for Start Play, Continue, Accept, and the single most important action in a context.

**`button-secondary`**  
Neutral secondary action. Use for Back to Study, Cancel, Choose something else, and lower-priority actions.

**`button-muted`**  
Use for sound-dependent actions that remain visible but unavailable because sound is off.

**`button-disabled`**  
Use only for unavailable non-interactive controls.

Primary buttons use filled primary. Secondary buttons stay neutral. Do not invent extra button colors.

### Cards

**`card`**  
Default framed surface.

**`card-muted`**  
Subtle grouped or inactive panel.

**`selected-card`**  
Selected context, such as selected resource or active choice. Uses primary-soft background and primary/border emphasis in implementation.

**`destination-card`**  
Top-level route choice, such as Alphabet or Vocabulary from Explore. Larger and more choice-oriented than lesson cards.

**`lesson-card`**  
Browse/catalog card for an authored lesson or module review set. Flatter and more utilitarian than destination cards.

### Preview Grid

**`preview-slot`**  
Fixed-size framed slot used inside lesson cards and summary cards. Alphabet slots stack Georgian script over transliteration. Vocabulary slots may use emoji or visual placeholders in MVP.

Preview grids optimize for fast recognition, not full payload display. Catalog overflow behavior such as `+N` belongs to browse/catalog contexts and must not leak into Study summaries.

### Study

**`summary-card`**  
Overview of all items in the current resource. May borrow preview-grid language, but reveals more than catalog preview.

**`detail-card`**  
Focused item review. Letter detail may use `{typography.brand-type-georgian-display}`. Word detail uses `{typography.brand-type-georgian-word}` and should stay prominent but readable.

Study uses one shared shell across lesson types. Lesson type changes should swap summary/detail variants, not the whole layout.

### Play

**`answer-option`**  
Default answer choice. Four options should feel equal in size and importance.

**`answer-option-selected`**  
Selected answer before resolution or selected context where applicable.

**`answer-option-correct`**  
Correct resolved answer. Must be distinct through color, border, icon, and copy.

**`answer-option-wrong`**  
Chosen wrong answer. Must be distinct from correct, disabled, and muted.

Play should feel compact, fast, and directed. Feedback should be lightweight and should not turn every round into a new heavy screen.

### Navigation and Overlays

**`bottom-dock`**  
Visible only on top-level destinations: Learn, Translit, Settings. For MVP, do not convert to sidebar on desktop.

**`bottom-sheet`**  
Mobile contextual or blocking surface. For MVP, do not automatically replace with desktop drawer/dialog unless explicitly requested.

**`notification`**  
Global feedback such as sound toggled, copy confirmation, correct/wrong feedback, or “Turn sound on to listen.”

Overlays must be scoped to the app shell, not the full browser viewport.

## Do's and Don'ts

### Do

- Do use neutral tokens for most UI.
- Do use `{colors.brand-color-primary}` only for primary CTAs, active navigation, selected resource state, and small emphasis.
- Do use success/fail tokens only for semantic feedback.
- Do keep selected, muted, disabled, success, and fail visually distinct.
- Do keep Play fast and compact.
- Do keep Study calmer and more legible.
- Do keep Georgian script in the Georgian font stack.
- Do make Storybook the implementation truth for tokens and reusable components.
- Do use token-based Tailwind utilities in implementation.
- Do keep desktop MVP inside a centered mobile shell.

### Don't

- Don't use raw hex colors in components.
- Don't use Tailwind default palette utilities for branded UI.
- Don't create `primary-50` through `primary-900` shade scales in the MVP.
- Don't invent new color families without updating this file.
- Don't treat muted audio as an error state.
- Don't make every card colorful.
- Don't use shadow as the default separation method.
- Don't stretch bottom navigation, top bars, sheets, or overlays to full desktop width.
- Don't convert the MVP into a full responsive desktop redesign.
- Don't let generated AI screens introduce new navbars, button styles, or typography scales.