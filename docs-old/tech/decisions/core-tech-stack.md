---
section: Tech/Decisions
title: Core Tech Stack
date: 2025-10-04
status: Accepted
issue: "#2"
---

# Core Tech Stack: Next.js, React, TypeScript, and Testing

**Date**: 2025-10-04

**Issue**: [#2](https://github.com/kartuli-app/kartuli/issues/2)

## Context

We need to establish the core technology stack for building the Georgian language learning platform with modern web technologies.

## Decision

We will use the following core technologies:

### Frontend Framework
- **Next.js** with App Router for React applications
- **React** as the UI library
- **TypeScript** for type safety and developer experience

### Testing Framework
- **vitest** for unit and integration testing
- **@testing-library/react** for component testing
- **Playwright** (planned) for E2E testing

### Development Tools
- **Turbopack** for Next.js applications (fast bundling)
- **TypeScript strict mode** for maximum type safety

## Consequences

### Positive
✅ **Modern stack** - Industry-standard technologies  
✅ **Type safety** - TypeScript prevents runtime errors  
✅ **Fast development** - Next.js + Turbopack for quick iteration  
✅ **Comprehensive testing** - Unit, integration, and E2E coverage  

### Negative
⚠️ **Bundle size** - React + Next.js adds overhead  
⚠️ **Learning curve** - Team needs TypeScript expertise  

## Implementation

### Current Apps Structure
```
apps/
  game-client/     # Learning game (Next.js)
  backoffice-client/ # Content management (Next.js)
```

### Testing Implementation Status
- **Unit tests** - Individual functions and components are tested with vitest
- **Integration tests** - Component interactions are tested with vitest
- **E2E tests** - Full user workflows testing is planned with Playwright
