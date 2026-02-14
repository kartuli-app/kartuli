---
section: Tech/Decisions
title: Design System
date: 2025-10-06
status: Accepted
issue: "#3"
---

# Design System: Token-Driven Architecture with Tailwind CSS v4

**Date**: 2025-10-06

**Issue**: [#3](https://github.com/kartuli-app/kartuli/issues/3)

## Context

We need a scalable design system that ensures consistency across all applications while supporting our Georgian language learning platform's accessibility requirements and offline-first architecture.

## Decision

We will implement a **token-driven design system** using Tailwind CSS v4 with OKLCH color space, CSS custom properties for runtime theme customization, and a monorepo package structure for shared design tokens and components.

### Core Technologies
- **Tailwind CSS v4** with token-driven design
- **OKLCH color space** for better perceptual uniformity
- **CSS custom properties** for runtime theme customization
- **@kartuli/theme** package for design tokens
- **@kartuli/ui** package for React components
- **Storybook** for component development and documentation

### Design Principles
- **Accessibility First** - WCAG 2.1 AA compliance
- **Cultural Sensitivity** - Georgian language and cultural context
- **Offline-First** - Optimized for PWA and offline learning
- **Cost Optimization** - Efficient bundle sizes and performance

## Consequences

### Positive
✅ **Consistency** - Unified visual language across all applications  
✅ **Scalability** - Token system grows with the platform  
✅ **Accessibility** - Built-in WCAG compliance  
✅ **Performance** - Optimized for offline-first learning  
✅ **Maintainability** - Centralized design decisions  
✅ **Cultural Integration** - Georgian language optimization  

### Negative
⚠️ **Learning curve** - Team needs design system expertise  
⚠️ **Bundle size** - Additional CSS and component overhead  
⚠️ **Complexity** - More sophisticated build process  

## Implementation

### Current Package Structure
```
packages/
├── theme/           # Design tokens and CSS variables
│   ├── src/
│   │   └── default-theme.css
│   └── package.json
└── ui/              # React components
    ├── src/
    │   └── components/
    │       ├── Button.tsx
    │       └── Button.stories.tsx
    └── package.json
```

### Design Tokens Implementation
The theme package uses Tailwind CSS v4's `@theme` directive with OKLCH color space:
```css
@theme {
  --color-primary-500: oklch(55% 0.22 250);
  --color-neutral-500: oklch(55% 0 0);
  --text-base: 1rem;
  --spacing-4: 1rem;
}
```

### Component Usage Pattern
Components are consumed via the `@kartuli/ui` package:
```tsx
import { Button } from '@kartuli/ui/components/Button';
```

### Quality Assurance Setup
- **Chromatic** configured for visual regression testing
- **axe-core** integrated for automated accessibility testing
- **Lighthouse CI** planned for performance monitoring