# kartuli.app DESIGN.md

This document is an agent-facing summary of the current design system.

`PRODUCT.md` remains the source of truth whenever behavior, structure, and design overlap. This file restates confirmed design decisions in a standard `DESIGN.md` format so implementation agents can work from a clear visual/system brief.

## 1. Visual Theme & Atmosphere

`kartuli.app` should feel like a focused mobile learning tool rather than a generic SaaS dashboard. The tone is clear, warm, encouraging, and lightly playful. The mascot is the main recurring personality layer and should soften low-content, recovery, and success/failure states without becoming noisy or childish.

The product should support both quiet reference behavior and faster game behavior without splitting into unrelated visual languages. Visual emphasis should come mostly from hierarchy, structure, and contrast in importance rather than from visual noise. The default surface language is rounded-rectangle based, calm, and restrained.

**Key characteristics**
- Mobile-first, with desktop support extending the same composition rather than replacing it
- Warm and encouraging tone with small, charming humor
- Calm, coherent surface language across Learn, Study, Play, Translit, Settings, and recovery states
- Product structure and interaction meaning take precedence over ornamental styling
- Floating and interruptive surfaces should feel special because they are used selectively

## 2. Color Palette & Roles

Exact color values are intentionally deferred. The design system is documented first through semantic families and roles.

### Semantic color families
- `neutral-*`: primary surface and reading system
- `accent-*`: brand emphasis, selection, current-context emphasis
- `positive-*`: correct/success/positive state family
- `negative-*`: wrong/error/destructive state family
- `focus-*`: dedicated focus treatment
- optional later: `warning-*` if the product grows a real warning family distinct from error/destructive states

### Surface roles
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

### State roles
- `neutral-*`
- `selected-*`
- `positive-*`
- `negative-*`
- `disabled-*`
- `muted-*`
- `focus-ring`

### Rules
- The neutral family carries most surface and reading behavior
- Accent is for emphasis, selection, and current context rather than arbitrary large fills
- Positive and negative are semantic state families, not decorative colors
- `selected`, `muted`, and `disabled` remain distinct:
  - `selected`: current choice or current context
  - `muted`: still interactive, but sound-dependent behavior is unavailable
  - `disabled`: unavailable and not interactive
- Muted is not an error state and should not reuse negative styling by default
- The lined alphabet-slot treatment is a decorative treatment layered inside `surface-slot`, not a separate surface family

## 3. Typography Rules

Exact font files and numeric sizes are intentionally deferred. Typography is modeled through foundations plus semantic roles.

### Foundations

#### Type foundations
- `type-1`: caption, helper, tooltip-scale text
- `type-2`: default body and control text
- `type-3`: small heading or emphasized support text
- `type-4`: prominent component text and word-level focal text
- `type-5`: page-title and larger results/title text
- `type-6`: largest focused display text such as single-letter Study detail

#### Font families
- `font-ui`
- `font-georgian`

#### Weights
- `weight-regular`
- `weight-medium`
- `weight-strong`

### Core rules
- Semantic typography roles map onto the foundation system
- One semantic role does not imply one unique token value
- Georgian script primarily differs by font-family swap inside shared semantic roles
- Transliteration, English, Russian, labels, body copy, and most controls use `font-ui`
- Georgian script uses `font-georgian`
- Responsive type scaling should focus on `type-5` and `type-6` first; smaller body and UI roles stay stable by default

### Typography role catalog

#### Page and content roles
- `page-eyebrow`
- `page-title`
- `support-copy`
- `section-title`
- `card-title`
- `card-support`
- `body`
- `body-strong`
- `caption`

#### Control roles
- `button-label`
- `input-label`
- `input-text`
- `tooltip-text`

#### Catalog preview roles
- `preview-letter-georgian`
- `preview-letter-translit`
- `preview-overflow`
- `preview-helper`

#### Study summary roles
- `summary-item-georgian`
- `summary-item-translit`
- `summary-item-translation`

#### Study detail roles
- Letter detail:
  - `detail-letter-georgian`
  - `detail-letter-translit`
  - `detail-letter-pronunciation`
- Word detail:
  - `detail-word-georgian`
  - `detail-word-translit`
  - `detail-word-translation`
- Shared detail support:
  - `detail-example`
  - `detail-note`

#### Play and utility roles
- `instruction-text`
- `cue-text`
- `answer-text`
- `progress-text`
- `result-score`
- `result-tone`
- `notification-text`
- `banner-text`

### Important distinction
- Letter detail hierarchy and word detail hierarchy stay distinct because a single Georgian letter and a full Georgian word/phrase are different focal jobs

## 4. Component Stylings

The system is organized around reusable product-facing component families rather than screen-by-screen one-offs.

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

### Study
- `study-nav-bar`
- `summary-card`
- `detail-card`
- `sticky-play-cta`

### Play
- `lobby-panel`
- `lobby-option-row`
- `progress-indicator`
- `cue-block`
- `answer-option`
- `feedback-notification`
- `results-review-block`
- `leave-game-confirmation`

### Utility and public
- `reading-surface`
- `settings-section`
- `privacy-banner`
- `translit-source-panel`
- `translit-output-panel`
- `token-inspection-tooltip`

### Relationship rules
- `destination-card` is a separate family from `lesson-card`
- `full-review-card` is a `lesson-card`-family variant, not a separate card family
- `preview-grid` is reusable across lesson-card-family components and Study summaries that intentionally reuse the same grid language
- `summary-card` is one family with lesson-type variants
- `detail-card` is one family with item-type variants
- `cue-block` is one family with text, visual, and audio-capable variants
- `answer-option` is its own family because it carries important Play-specific state semantics
- `selected-resource-drawer` is a non-blocking contextual drawer
- `leave-game-confirmation` is a blocking overlay
- `feedback-notification` belongs to the global notification family, with Play-specific usage

## 5. Layout Principles

Exact numeric spacing values and exact breakpoint widths are intentionally deferred. The layout system is documented through a small spacing foundation family plus semantic spacing roles.

### Spacing foundations
- `space-1`: tight
- `space-2`: small
- `space-3`: medium
- `space-4`: large
- `space-5`: extra-large

### Rules
- Many spacing roles may map to the same spacing foundation
- A spacing role describes the job, not a guaranteed unique value
- Outer page padding stays shared across the app, including Play
- Max-content-width behavior should stay shared across the app unless a route has an explicit product reason to differ

### Spacing role groups
- Outer shell:
  - `page-padding`
  - `page-max-width-gap`
  - `topbar-padding`
  - `main-content-gap`
- Headers:
  - `title-block-gap`
  - `header-support-gap`
  - `header-to-content-gap`
  - `header-actions-gap`
- Sections:
  - `section-stack-gap`
  - `section-header-gap`
  - `section-to-section-gap`
- Cards and surfaces:
  - `card-padding`
  - `card-stack-gap`
  - `card-title-gap`
  - `card-actions-gap`
  - `surface-padding`
- Preview grid:
  - `preview-grid-gap`
  - `preview-slot-padding`
  - `preview-text-gap`
- Study:
  - `study-nav-gap`
  - `summary-grid-gap`
  - `summary-item-padding`
  - `detail-card-padding`
  - `detail-content-gap`
  - `sticky-cta-padding`
- Play:
  - `play-header-gap`
  - `lobby-section-gap`
  - `cue-to-answers-gap`
  - `answer-stack-gap`
  - `results-section-gap`
  - `results-actions-gap`
- Overlay and feedback:
  - `drawer-padding`
  - `modal-padding`
  - `tooltip-padding`
  - `banner-padding`
  - `notification-padding`

### Layout patterns
- Preview grids are for fast recognition, not for full literal payload display
- Study summaries may reuse preview-grid language, but Study summary is allowed to reveal more than catalog preview
- Catalog overflow-slot behavior such as `+N` belongs to browse/catalog contexts, not Study summary

## 6. Depth & Elevation

Exact radii, border widths, and shadow values are intentionally deferred. The system uses a small shape and separation model.

### Foundations
- Radius:
  - `radius-1`
  - `radius-2`
  - `radius-3`
- Stroke:
  - `stroke-1`
  - `stroke-2`
- Shadow:
  - `shadow-1`
  - `shadow-2`

### Rules
- `radius-1`: tight internal elements
- `radius-2`: standard app surfaces
- `radius-3`: larger or more prominent surfaces
- The default surface language is rounded-rectangle based
- Most core surfaces should be separated by fill difference and stroke before shadow is introduced
- Most lesson cards, review cards, Study surfaces, Settings sections, and answer options should remain mostly flat and border-led by default
- `stroke-2` is for emphasis and strong state treatment rather than neutral default framing
- Shadows are reserved for floating or interruptive surfaces so they still feel special

### Surface hierarchy
- Smaller internal elements such as preview slots, inputs, and tooltips use tighter shape treatment
- Most app surfaces remain in the standard radius family
- Larger or more prominent surfaces such as destination cards, drawers, banners, and blocking overlays may use the more prominent radius family
- Drawers, notifications, tooltips, and blocking overlays may introduce lift
- Blocking overlays should feel more elevated than non-blocking drawers and notifications

## 7. Do’s and Don’ts

### Do
- Preserve the semantic distinction between reference behavior, Study review behavior, and Play interaction behavior
- Keep reusable component families visually related unless product meaning requires a distinction
- Prefer semantic roles mapped onto small foundation families over one-off custom values
- Keep the product calm and legible before trying to make it dramatic
- Use the mascot as the main personality layer rather than relying on loud visual styling
- Preserve the distinction between `selected`, `muted`, and `disabled`

### Don’t
- Do not treat mute as if it were an error
- Do not turn every card family into a visually unrelated special case
- Do not use shadow as the default separation method for every normal surface
- Do not let catalog preview behavior leak into Study or Play when the product behavior is different
- Do not introduce catalog overflow-slot behavior into Study summary
- Do not invent new visual tokens or visual families in derivative docs before they are confirmed in `PRODUCT.md`

## 8. Responsive Behavior

The product is mobile-first. Tablet and desktop preserve the same product structure rather than inventing a separate information architecture.

### Core rules
- Explore entry should aim to fit common mobile heights without scroll in the MVP
- Module-browser card grids use tiered layout:
  - mobile: 1 card per row
  - tablet: 2 cards per row
  - desktop: 3 cards per row
- The full-review card may span more width than standard lesson cards on wider layouts
- Study summary and detail preserve the same shell across devices while allowing denser structure on larger screens when the content benefits from it
- Touch-first interaction remains primary even when desktop keyboard support exists
- Responsive type scaling should focus on `type-5` and `type-6` first; smaller body and UI roles stay stable by default

## 9. Agent Prompt Guide

### How to use this file
- Use `PRODUCT.md` for product behavior, flow, and source-of-truth decisions
- Use this file for visual-system guidance, component-family relationships, and token-role structure
- When a design value is not specified numerically, keep the implementation internally consistent with the semantic system rather than inventing flashy one-off styling

### Foundation families available
- `space-*`
- `type-*`
- `radius-*`
- `stroke-*`
- `shadow-*`
- semantic color/state/surface role families

### Implementation rules for agents
- Work from semantic roles first, then map them onto the small foundation families
- Reuse shared component families instead of creating per-screen one-offs
- Swap to `font-georgian` only for Georgian script; keep transliteration and UI/support text in `font-ui`
- Preserve the distinction between `selected`, `muted`, `disabled`, `positive`, and `negative`
- Keep normal surfaces mostly flat and border-led; reserve shadow for floating and overlay surfaces
- Preserve the shared preview-grid language across lesson-card-family components and any Study summary that intentionally reuses it
