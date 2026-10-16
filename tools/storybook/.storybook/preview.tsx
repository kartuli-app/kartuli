import '@game-client/ui/components/feedback/notifications';
import type { Preview } from '@storybook/react-vite';
import './storybook.css';
import { resolveStorybookTheme, STORYBOOK_THEMES, StorybookThemeWrapper } from './theme-wrappers';

const reviewViewports = {
  'review-mobile': {
    name: 'Mobile · 390 × 844',
    styles: { width: '390px', height: '844px' },
  },
  'review-tablet': {
    name: 'Tablet · 900 × 900',
    styles: { width: '900px', height: '900px' },
  },
  'review-desktop': {
    name: 'Desktop · 1600 × 1000',
    styles: { width: '1600px', height: '1000px' },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: reviewViewports,
    },
    a11y: {
      // Matches the tag set used in our Playwright + axe-core setup
      // (tools/e2e/tests/helpers/expect-a11y.ts) so component-level and
      // page-level scans enforce the same rules.
      options: {
        runOnly: [
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22a',
          'wcag22aa',
          'best-practice',
        ],
      },
      // Violations fail the Vitest-addon component tests (CLI/CI). Opt a
      // specific story out by setting `parameters.a11y.test` to the warning
      // mode (does not fail the run) or `'off'` (skips entirely). See
      // https://storybook.js.org/docs/writing-tests/accessibility-testing#test-behavior
      test: 'error',
    },
  },
  globalTypes: {
    theme: {
      description: 'Design System review theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: Object.values(STORYBOOK_THEMES).map((theme) => ({
          value: theme.id,
          title: theme.label,
          right: theme.kind === 'real' ? 'Real' : 'Stress',
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'game-default',
  },
  decorators: [
    // Wrap every story canvas in a `<main>` landmark. Components are rendered
    // in isolation in Storybook with no surrounding page, which makes axe's
    // `region` rule (best-practice, "all page content must sit inside a
    // landmark") fire against any atomic component that doesn't provide its
    // own landmark. Supplying the landmark here mirrors what the hosting page
    // gives it in the real app, so the rule passes legitimately instead of
    // being silenced per-story.
    //
    // If a future story renders its own `<main>` internally, opt it out of
    // `landmark-no-duplicate-main` via `parameters.a11y.config.rules`.
    (Story, context) => {
      const theme = resolveStorybookTheme(context.globals.theme);
      return (
        <StorybookThemeWrapper key={theme.id} themeId={theme.id}>
          <main>
            <Story />
          </main>
        </StorybookThemeWrapper>
      );
    },
  ],
};

export default preview;
