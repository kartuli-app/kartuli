# E2E Testing Tool

This package contains end-to-end tests for the Kartuli platform using Playwright.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Install Playwright browsers:
   ```bash
   pnpm exec playwright install chromium
   ```

## Running Tests

### Local Development

Run tests against your local development server:

```bash
# Start the game client dev server first
pnpm dev

# In another terminal, run E2E tests
BASE_URL=http://localhost:3000 pnpm test
```

### Other Test Modes

```bash
# Run tests in headed mode (see browser)
pnpm test:headed

# Run tests in debug mode
pnpm test:debug

# Run tests with UI mode
pnpm test:ui
```

## Test Structure

- `tests/game-client/smoke.spec.ts` - V1 smoke tests (app boot + console errors)

## CI Integration

E2E tests run automatically in CI:

- **PR workflow**: Tests run against Vercel preview URLs
- **Main workflow**: Tests run against production deployment

### Artifacts

On test failure, artifacts are uploaded:
- Screenshots
- Video recordings
- Trace files
- Console logs

Artifacts are retained for 3 days (free tier friendly).

## Configuration

Tests are configured via `playwright.config.ts`:

- **Browser**: Chromium-only for V1
- **Timeouts**: 5s expect, 30s test
- **Workers**: 1 worker for stability
- **Retries**: 1 retry in CI, 0 locally
- **Base URL**: Set via `BASE_URL` environment variable

## Test Selectors

Use stable selectors for reliable tests:

- `data-testid="game-home"` - Main game client container
- `h1` with text "Game Client" - Page heading

## Future Phases

- **V1.1**: Primary flow smoke, navigation, assets sanity
- **V2**: Mobile viewport, Firefox, accessibility checks
