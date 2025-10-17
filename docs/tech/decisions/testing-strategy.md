---
section: Tech/Decisions
title: Testing Strategy
date: 2025-10-05
status: Accepted
issue: "#2"
---

# Testing Strategy: Unit, Integration, and E2E

**Date**: 2025-10-05

**Issue**: [#2](https://github.com/rocescoca/kartuli/issues/2)

## Context

We need a comprehensive testing strategy that ensures code quality and prevents regressions as the Georgian language learning platform grows.

## Decision

We will implement a **three-tier testing approach**:

### Unit Testing
- **vitest** for fast unit tests
- **@testing-library/react** for component testing
- **Co-located tests** next to source files

### Integration Testing
- **vitest** for integration tests
- **API testing** for serverless functions
- **Component interaction testing**

### End-to-End Testing
- **Playwright** for E2E testing (planned)
- **User journey testing** for critical paths
- **Cross-browser compatibility** testing

## Consequences

### Positive
✅ **Fast feedback** - vitest provides quick test execution  
✅ **Reliable components** - Testing Library ensures accessible components  
✅ **User confidence** - E2E tests verify complete workflows  
✅ **Regression prevention** - Comprehensive test coverage  

### Negative
⚠️ **Maintenance overhead** - Tests need to be kept up to date  
⚠️ **E2E complexity** - Playwright tests can be flaky  

## Implementation

### Current Test Structure
```
src/
  components/
    Button.tsx
    Button.test.tsx    # Co-located unit tests
  __tests__/           # Integration tests
e2e/                   # E2E tests (planned)
```

### Testing Tools Implementation
- **vitest** - Currently used for unit and integration testing
- **@testing-library/react** - Component testing utilities are integrated
- **Playwright** - E2E testing is planned for future implementation
