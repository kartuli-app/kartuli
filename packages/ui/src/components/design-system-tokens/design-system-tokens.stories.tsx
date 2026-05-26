import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesignSystemTokens } from './design-system-tokens';

const meta: Meta<typeof DesignSystemTokens> = {
  title: 'UI/DesignSystemTokens',
  component: DesignSystemTokens,
  parameters: {
    docs: {
      description: {
        component:
          'Visual reference for the live shared token contract: primitive palettes, spacing, radius, and font aliases.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
