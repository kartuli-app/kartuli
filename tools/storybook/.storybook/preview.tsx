import type { Preview } from '@storybook/react-vite';
import './storybook.css';
import { BackofficeThemeWrapper, GameThemeWrapper } from './theme-wrappers';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default', icon: 'circle' },
          { value: 'game', title: 'Game', icon: 'graphbar' },
          { value: 'backoffice', title: 'Backoffice', icon: 'admin' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'default';

      // Apply theme wrapper based on selected theme
      switch (theme) {
        case 'game':
          return (
            <GameThemeWrapper>
              <Story />
            </GameThemeWrapper>
          );
        case 'backoffice':
          return (
            <BackofficeThemeWrapper>
              <Story />
            </BackofficeThemeWrapper>
          );
        default:
          return <Story />;
      }
    },
  ],
};

export default preview;
