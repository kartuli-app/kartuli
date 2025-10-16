import type { Preview } from '@storybook/react';
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
      // Accessibility addon config
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
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
