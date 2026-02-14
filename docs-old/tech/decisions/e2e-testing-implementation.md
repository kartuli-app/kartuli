---
section: Tech/Decisions
title: E2E Testing Implementation
date: 2025-01-20
status: Accepted
issue: "#16"
---

# E2E Testing Implementation: Playwright Strategy

**Date**: 2025-01-20

**Issue**: [#16](https://github.com/kartuli-app/kartuli/issues/16)

## Context

We need a comprehensive E2E testing strategy to ensure the Georgian language learning platform works correctly across different environments and user journeys. The current testing setup includes unit and integration tests with vitest, but lacks end-to-end validation of the complete user experience.

## Decision

We will implement E2E testing using **Playwright** with a phased approach:

### Tool Structure
- **Location**: `/tools/e2e/` as a dedicated tool package
- **Scope**: V1 focuses on `game-client` only
- **Runner**: Playwright with Chromium-only for initial implementation

### V1 Implementation (Immediate)
- **App boot test**: Verify game client loads and shows stable marker
- **Console error test**: Ensure no error-level console messages on first load
- **Skip 404 test**: Deferred to later phase

### CI/CD Integration
- **PR workflow**: E2E tests run against Vercel preview URLs after deployment
- **Main workflow**: E2E smoke tests run against production deployment
- **Artifacts**: Screenshots, traces, videos uploaded on failure with 3-day retention

### Configuration
- **Environment**: Single `BASE_URL` variable drives test execution
- **Timeouts**: 5s expect, 30s test, 30s overall
- **Concurrency**: 1 worker for stability
- **Retry policy**: 1 retry in CI, 0 locally

## Consequences

### Positive
✅ **Quality gate** - E2E tests validate complete user workflows  
✅ **Environment validation** - Tests run against real deployed applications  
✅ **Regression prevention** - Catches integration issues missed by unit tests  
✅ **CI integration** - Automated testing in deployment pipeline  
✅ **Artifact collection** - Debug information available on failures  

### Negative
⚠️ **Maintenance overhead** - E2E tests require ongoing maintenance  
⚠️ **Execution time** - Adds ~1-2 minutes to CI pipeline  
⚠️ **Flakiness risk** - Network and timing issues can cause false failures  

## Implementation

### Current Status: V1 Complete
- Playwright installed and configured in `/tools/e2e/`
- V1 smoke tests implemented (app boot + console errors)
- CI integration added to PR and main workflows
- Stable selectors using `data-testid` attributes
- Documentation and setup guides created

### Future Phases
- **V1.1**: Primary flow smoke, navigation testing, assets sanity
- **V2**: Mobile viewport testing, Firefox support, accessibility checks

### Test Structure
```
tools/e2e/
  tests/
    game-client/
      smoke.spec.ts    # V1: boot + console errors
  playwright.config.ts # Configuration
  package.json         # Dependencies and scripts
```

### CI Integration
- Tests run after Vercel deployment in both PR and main workflows
- Artifacts uploaded on failure with 3-day retention (free tier friendly)
- Browser installation automated in CI pipeline
