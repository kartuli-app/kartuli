# Design System for kartuli.app

## 1. Visual Theme & Atmosphere

`kartuli.app` should feel like a focused mobile learning product: clear, warm, encouraging, and lightly playful. It is not a dense productivity dashboard and not a loud children’s game. The interface needs to support 2 modes without splitting into unrelated styles: quiet reference/review behavior in Explore and Study, and faster, more directed interaction in Play.

The mascot is the main personality layer. It should soften low-content screens, recovery states, and success/failure moments without becoming noisy or childish. Most of the product’s confidence should come from hierarchy, structure, rhythm, and semantic state styling rather than from ornamental effects.

The shape language is rounded-rectangle based. Normal surfaces should feel calm and coherent; floating and interruptive surfaces should feel more special because they are used selectively. Accent is a signal, not a default fill.

**Key Characteristics**
- Mobile-first learning product, desktop-supported but not desktop-led
- Warm, encouraging tone with small, charming humor
- Calm, reusable surface language across Learn, Study, Play, Translit, Settings, and recovery states
- Product structure and interaction meaning come before decorative styling
- Floating and interruptive surfaces are selective, not ubiquitous

## 2. Color Palette & Roles

The color system is semantic first.

### Brand and Accent
- **Accent** (`accent-*`): brand emphasis, selected state, current-context emphasis, CTA emphasis
- Accent should behave like a signal color, not a large arbitrary fill across the product

### Neutral System
- **Neutral** (`neutral-*`): page floors, default surfaces, framed slots, body text, secondary text, dividers, and quiet utility states
- The neutral family carries most reading and surface behavior

### State and Feedback
- **Positive** (`positive-*`): correct answers, success, positive feedback
- **Negative** (`negative-*`): wrong answers, destructive/error-like states
- **Focus** (`focus-*`): keyboard and accessibility focus treatment
- **Selected** (`selected-*`): current choice or current context
- **Muted** (`muted-*`): still interactive, but sound-dependent behavior is unavailable
- **Disabled** (`disabled-*`): unavailable and not interactive

### Surface Roles
- `app-bg`, `page-bg`
- `surface-default`, `surface-subtle`, `surface-prominent`, `surface-overlay`
- `surface-slot`, `surface-input`, `surface-answer`
- `surface-banner`, `surface-notification`

### Principles
- Muted is not an error state and should not reuse negative styling
- Selected, muted, and disabled must stay visually distinct
- Small internal framed elements should rely on `surface-slot`
- Drawers, blocking overlays, and tooltips should rely on `surface-overlay`
- The lined alphabet-slot treatment is a decorative layer inside the slot, not a separate surface family

## 3. Typography Rules

The typography system is built around 2 families: a general UI family and a Georgian-script family. Georgian does not get a separate hierarchy; it uses the same role structure with a family swap. This keeps the product coherent across English, Russian, transliteration, and Georgian while still letting Georgian script feel intentional and legible.

### Font Families
- **UI / Latin / Russian / transliteration**: `font-ui`
- **Georgian script**: `font-georgian`

### Weights
- `weight-regular`
- `weight-medium`
- `weight-strong`

### Type Scale
- `type-1`: captions, helper text, tooltips, micro support
- `type-2`: body text, controls, most default UI copy
- `type-3`: small headings and emphasized support text
- `type-4`: prominent component text and word-level focal text
- `type-5`: page titles and major result/title moments
- `type-6`: single-item display moments such as letter detail

### Hierarchy

| Role | Primary Tokens | Use | Notes |
|---|---|---|---|
| Page Identity | `page-eyebrow`, `page-title`, `support-copy` | Page headers across Explore, Study, Play, utilities | `page-title` is one of the main responsive pressure points |
| Section Heading | `section-title`, `card-title`, `card-support` | Screen sections, grouped cards, module headers | Should feel clear and structured, not oversized |
| Body / Controls | `body`, `body-strong`, `button-label`, `input-text`, `caption` | Reading text, controls, labels, helper text | Most UI should live here |
| Alphabet Preview | `preview-letter-georgian`, `preview-letter-translit`, `preview-helper` | Alphabet slots and audio-helper copy | Large Georgian mark over smaller transliteration |
| Study Summary | `summary-item-georgian`, `summary-item-translit`, `summary-item-translation` | Summary rows and grid items | More informative than catalog preview |
| Letter Detail | `detail-letter-georgian`, `detail-letter-translit`, `detail-letter-pronunciation` | Single-letter Study focus | `detail-letter-georgian` is the strongest type moment in Study |
| Word Detail | `detail-word-georgian`, `detail-word-translit`, `detail-word-translation`, `detail-example`, `detail-note` | Word and phrase Study detail | Prominent, but not display-sized like letter detail |
| Play / Feedback | `instruction-text`, `cue-text`, `answer-text`, `progress-text`, `result-score`, `result-tone`, `notification-text` | Game loop, results, notifications | Must stay fast to scan under interaction pressure |

### Principles
- One semantic role does not imply one unique token value
- The biggest responsive scaling pressure should sit on `type-5` and `type-6`
- Smaller body and UI text should stay stable unless a screen has a specific reason to differ
- Letter detail and word detail should stay distinct; a single Georgian letter and a full Georgian word/phrase are different focal jobs

## 4. Component Stylings

The component system should read as one product language with a few clear families, not as a different design for every screen. Browse, Study, Play, and utility surfaces each have their own interaction rhythm, but they should still look like they belong to the same app.

### Buttons and Controls

Buttons and small controls should feel straightforward and mobile-friendly rather than ornamental. Standard controls should sit comfortably inside the rounded-rectangle system; they should not become pills by default. Icon buttons, toggles, and inputs should feel like close relatives of card and slot surfaces rather than mini alien widgets.

### Browse Cards

There are 2 major browse-card families. **Destination cards** are top-level route choices such as Explore entry. They are more prominent, larger, and more choice-oriented. **Lesson cards** are flatter and more utilitarian. They sit inside the module-browser rhythm and are built around the preview-grid language. The full-review card is part of the lesson-card family, not a separate visual language.

Preview grids are the core recognition pattern for browse surfaces. Slots should be fixed and framed. Alphabet slots stack a Georgian letter over a smaller transliteration; vocabulary slots are visual-only in MVP. The preview grid should feel like a fast recognition device, not a tiny embedded Study screen.

### Study Surfaces

Study is built from a shared shell with a `summary-card`, a `detail-card`, and a sticky Play CTA. Summary can borrow the preview-grid language, but it is more informative than catalog preview. Detail is more focal, more text-forward, and calmer. Letter detail is allowed to become more display-like; word detail should stay prominent but more reading-oriented.

### Play Surfaces

Play should feel compact, fast, and directed. The Lobby is utilitarian and preparation-focused. During active play, cue and answers are the main composition. Answer options should feel equal in size and importance; they should not look like mixed-priority buttons. Feedback should stay lightweight and global enough to avoid turning each round into a new mini-screen.

### Utility, Public, and Overlay Surfaces

Utility and public screens should stay calmer and more typography-led. The `reading-surface` for Privacy should feel quiet and readable. The `privacy-banner` is persistent but not modal. The `selected-resource-drawer` is a non-blocking contextual drawer; the `leave-game-confirmation` is a blocking overlay. Those 2 should not collapse into the same surface language even if they share some styling primitives.

### Family Rules
- `destination-card` is separate from `lesson-card`
- `full-review-card` is part of the `lesson-card` family
- `preview-grid` is reusable across browse and Study summary contexts when the product behavior supports it
- `summary-card` is one family with lesson-type variants
- `detail-card` is one family with item-type variants
- `cue-block` is one family with text, visual, and audio-capable variants
- `answer-option` is its own family because it carries Play-specific state semantics

## 5. Layout Principles

The layout system uses a small spacing foundation family plus semantic spacing roles.

### Spacing System
- `space-1` to `space-5`
- The scale should cover tight, small, medium, large, and extra-large spacing jobs
- Many semantic roles may map to the same spacing token

### Core Layout Rules
- Outer page padding stays shared across the app, including Play
- Max-content-width behavior should stay shared unless a route has a product reason to differ
- Preview grids are for fast recognition, not literal payload display
- Study summary may reveal more than catalog preview while still borrowing the same underlying language
- Catalog overflow behavior such as `+N` belongs to browse/catalog contexts, not Study summary

### Grid and Grouping
- Explore and module-browser screens are card-grid driven
- Module-browser grids use 1 / 2 / 3 card columns across mobile / tablet / desktop tiers
- Full review can span more width than standard lesson cards on wider layouts
- Study and Play keep stronger vertical grouping and simpler horizontal structure than browse screens

### Whitespace Philosophy
- The product should feel structured, not crowded
- Most rhythm should come from repeated gaps, card padding, section spacing, and title-to-content spacing
- The system should avoid luxury whitespace and avoid cramped mini-app density

## 6. Depth & Elevation

The product should feel mostly flat, framed, and calm. Shadow is reserved for moments that need to feel lifted.

### Shape Foundations
- `radius-1`: tight internal elements
- `radius-2`: standard app surfaces
- `radius-3`: larger or more prominent surfaces

### Separation Foundations
- `stroke-1`: default framing
- `stroke-2`: emphasized framing / strong state treatment
- `shadow-1`: floating surface lift
- `shadow-2`: stronger overlay lift

### Elevation Model

| Level | Treatment | Use |
|---|---|---|
| Flat | fill + no lift | page floors, quiet content areas |
| Framed | `stroke-1`, usually `radius-2`, no shadow | lesson cards, Study surfaces, settings sections, answer options |
| Floating | framed + `shadow-1` | drawers, tooltips, notifications |
| Blocking | more prominent radius + `shadow-2` | leave-game confirmation and similar interruptive overlays |
| Emphasized State | `stroke-2` and/or semantic state color | selection, strong active state, focused surfaces |

### Principles
- Most core surfaces should stay border-led rather than shadow-led
- Preview slots, inputs, and other small internal elements should use tighter shape treatment
- Destination cards, banners, drawers, and overlays can use softer/prominent radius treatment
- Blocking overlays should feel more elevated than drawers and notifications

## 7. Do’s and Don’ts

### Do
- Preserve the distinction between reference behavior, Study review behavior, and Play interaction behavior
- Keep reusable component families visually related unless product meaning requires a split
- Prefer semantic roles mapped onto small foundation families over one-off values
- Let the mascot carry most of the product’s explicit personality
- Keep Play fast and focused, and keep Study calmer and more legible
- Preserve the distinction between `selected`, `muted`, `disabled`, `positive`, and `negative`

### Don’t
- Don’t treat mute as if it were an error
- Don’t turn every card family into a separate visual language
- Don’t use shadow as the default separation method for normal surfaces
- Don’t let catalog-preview behavior leak into Study or Play when the product behavior is different
- Don’t introduce `+N` overflow behavior into Study summary
- Don’t invent new tokens or surface families in implementation when a shared family already exists

## 8. Responsive Behavior

The product is mobile-first. Tablet and desktop preserve the same product structure rather than inventing a separate information architecture.

| Tier | Key Changes |
|---|---|
| Mobile | Single-column browse rhythm, strongest focus on touch, Explore should aim to fit common heights without scroll |
| Tablet | Module-browser grids expand to 2 columns, wider summary/detail layouts become more comfortable |
| Desktop | Module-browser grids expand to 3 columns, full-review can span wider, keyboard support becomes additive in Play |

### Responsive Rules
- `type-5` and `type-6` are the main responsive typography pressure points
- Study summary and detail keep the same shell across devices
- Play remains touch-first even when keyboard support exists
- Full review can widen before standard lesson cards do
- Dense content may become more table-like on larger screens, especially vocabulary summary

## 9. Agent Prompt Guide

### Quick System Reference
- Color families: `neutral-*`, `accent-*`, `positive-*`, `negative-*`, `focus-*`
- Surface roles: `surface-*`
- State roles: `selected-*`, `muted-*`, `disabled-*`
- Typography foundations: `type-*`, `font-ui`, `font-georgian`, `weight-*`
- Layout and shape foundations: `space-*`, `radius-*`, `stroke-*`, `shadow-*`

### Implementation Rules
- Start from semantic roles and shared families first
- Use existing token names even when numeric values are defined elsewhere
- Keep Georgian script in `font-georgian`; keep transliteration and UI/support text in `font-ui`
- Keep normal surfaces mostly flat and framed; reserve shadow for floating and blocking layers
- Reuse preview-grid language across lesson-card-family components and Study summaries that intentionally borrow it

### Example Prompts
- “Create an alphabet lesson card using the lesson-card family: `surface-default`, `card-title`, `preview-grid`, and alphabet preview slots with `preview-letter-georgian` above `preview-letter-translit`.”
- “Build a Study word detail surface using the shared detail-card family with `detail-word-georgian`, `detail-word-translit`, `detail-word-translation`, and a sticky Play CTA.”
- “Design a Play answer-option set as four equal framed options using shared answer-state semantics: neutral by default, `positive-*` for correct, `negative-*` for wrong, and non-winning locked options separated from muted audio states.”

### Iteration Guide
1. Treat accent as a signal, not a default large surface fill.
2. Keep browse, Study, and Play distinct in rhythm, but not in overall visual language.
3. Use `font-georgian` only for Georgian script; keep transliteration and UI/support text in `font-ui`.
4. Keep most surfaces flat and framed; add lift only when a surface truly floats or interrupts.
5. Preserve the distinction between `selected`, `muted`, `disabled`, `positive`, and `negative`.
6. If a new screen needs a card, first decide whether it belongs to destination-card, lesson-card, summary-card, or detail-card behavior before inventing a new card type.
