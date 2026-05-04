import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesignSystemTokens } from './design-system-tokens';

const meta: Meta<typeof DesignSystemTokens> = {
  title: 'UI/DesignSystemTokens',
  component: DesignSystemTokens,
  parameters: {
    docs: {
      description: {
        component: 'Visual reference for design tokens: color, typography, spacing, and radius.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
