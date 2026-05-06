---
description: Per-screen implementation contract for the Study screen in the game client.
---

# Study Screen

## Summary

- Role: preview one study resource, move between summary and detail, and launch Play whenever ready
- Entry point: `/{locale}/app/learn/lessons/{lessonId}/study` and `/{locale}/app/learn/modules/{moduleId}/review/study`
- Route binding: `/{locale}/app/learn/lessons/{lessonId}/study`, `/{locale}/app/learn/modules/{moduleId}/review/study`
- Screen type: route screen
- Parent flow: Study flow
- Primary user question: do I stay in summary, inspect a specific item, or start playing now?
- Primary decision: stay in summary, inspect an item, or open Play

## Source links

- Routing: [Routing and Flows](../06-routing-and-flows.md)
- UI system: [Ui System](../08-ui-system.md)
- Component catalog: [Component Catalog](../12-component-catalog.md)
- Audio: [Audio and Sound](../10-audio-and-sound.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Top bar | yes | `TopBar`, `MutedAudioControl` | Resource context stays visible; sound toggle appears only when the resource family exposes Study audio |
| Study navigation bar | yes | `StudyNavBar` | Summary/detail navigation lives here |
| Main area | yes | `SummaryCard`, `DetailCard` | Shows summary or one focused detail card |
| Sticky Play CTA area | yes | `StickyPlayCta` | Play remains persistently available |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome with resource context | default, audio-capable | [Component Catalog](../12-component-catalog.md) |
| `MutedAudioControl` | Explicit Study audio control when available | available, muted explicit control | [Component Catalog](../12-component-catalog.md) |
| `StudyNavBar` | Summary/detail navigation | summary, detail | [Component Catalog](../12-component-catalog.md) |
| `SummaryCard` | Shows all items in the current resource | lesson-type variants | [Component Catalog](../12-component-catalog.md) |
| `DetailCard` | Shows one focused item | alphabet detail, vocabulary detail | [Component Catalog](../12-component-catalog.md) |
| `StickyPlayCta` | Persistent Play launch action | summary, detail | [Component Catalog](../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| summary | route loads or user returns from detail | show summary card and persistent Play CTA | Study opens on summary by default |
| alphabet detail | user opens one alphabet item from summary | show one focused alphabet detail card | Item position remains internal UI state |
| vocabulary detail | user opens one vocabulary item from summary | show one focused vocabulary detail card | Item position remains internal UI state |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Return to owning browse route | use the route back action | navigate to the canonical browse target for the current resource family | [Routing and Flows](../06-routing-and-flows.md) |
| Open item detail from summary | interact with a summary item | open that item in detail view | This screen |
| Move to previous study position | use previous navigation from detail | move to the previous item, or return to summary from the first detail item | This screen |
| Move to next study position | use next navigation from detail | move to the next item, unless already at the last item | This screen |
| Return to summary | use summary navigation from detail | show summary view again | This screen |
| Open Play | activate the persistent Play action | navigate to the canonical Play route for the current resource | [Routing and Flows](../06-routing-and-flows.md) |
| Toggle sound | use the explicit audio control when available | update global sound preference for Study audio behavior | [Audio and Sound](../10-audio-and-sound.md) |

## Content

- Study is optional and opens on summary by default.
- Summary shows all items in the current resource.
- Summary item interaction opens detail and does not play audio directly.
- Alphabet detail includes Georgian letter, transliteration, pronunciation hint, and audio playback.
- Vocabulary detail includes Georgian block, translation, visual asset, optional audio, Georgian-only example phrase, and optional note area.

## Behavior notes

- Canonical browse return targets come from [Routing and Flows](../06-routing-and-flows.md).
- Previous from the first detail item returns to summary.
- Next is disabled on the last item.
- Item position remains internal UI state, not URL state.
- Muted explicit audio controls remain visible and explain why playback is unavailable.

## Design notes

- Use one shared Study shell across lesson types.
- Lesson types swap summary and detail variants without changing shell behavior.
- Sticky Play CTA is especially important on mobile.

## Accessibility notes

- The page needs one clear primary heading and clear resource context.
- Summary items and detail navigation should remain usable as clear tap and keyboard targets.
- The disabled end state for `Next` should remain perceivable.

## Not this

- Do not gate Play behind finishing Study.
- Do not make summary item interaction play audio directly.
- Do not move item position into URL state.
- Do not hide explicit audio controls when sound is disabled.

## Storybook coverage

- Study composition: summary
- Study composition: alphabet detail
- Study composition: vocabulary detail
- `SummaryCard`: alphabet
- `SummaryCard`: vocabulary
- `DetailCard`: alphabet
- `DetailCard`: vocabulary
- `StickyPlayCta`: summary
- `StickyPlayCta`: detail

## Open questions

- How much student-specific item status, if any, should appear in item detail later.
