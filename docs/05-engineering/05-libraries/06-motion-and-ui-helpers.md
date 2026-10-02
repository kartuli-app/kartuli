---
description: Study animation behavior, icon composition and shared class-merging conventions.
status: implemented
intent: reference
---

# Motion, Icons and Class Helpers

## Motion

Game Client's study carousel imports `animate`, `motion`, `useMotionValue` and `PanInfo` from `motion/react`. `study-slide-pointer-swipe.ts` owns pointer/swipe calculations, while `study-slides-carousel.tsx` integrates visual movement. Keep gesture calculation and browser animation responsibilities separate when changing navigation.

Unit tests can validate swipe decisions using controlled inputs; a mocked Motion implementation does not validate real browser layout, animation completion or reduced-motion behavior. Check keyboard/button alternatives and cancellation in browser stories/routes. A repository-wide reduced-motion policy is not yet implemented by the presence of this dependency.

## Icons

React Icons provides components from several icon families, including the families prebundled in Storybook. Keep decorative icons hidden from assistive technology where appropriate and supply accessible names on icon-only controls. A new icon family may require Storybook dependency-optimization review, especially if stories fail while the app works.

## Class composition

`packages/ui/src/utils/cn.tsx` composes clsx and tailwind-merge and is imported as `@kartuli/ui/utils/cn`. Use it for conditional utility classes rather than reimplementing the composition at each call site. Class merging is not proof that custom token families behave as intended; inspect resulting classes and rendered styles when adding variants.

Sources: `apps/game-client/src/ui/experiences/study/components`, app `src/ui/components`, shared `cn` and Storybook config. Visual conventions belong to [Design System](../../04-design-system/index.md); this page owns library integration considerations.
