import type { Meta, StoryObj } from '@storybook/react-vite';
import { TokenDemoButton } from './token-demo-button';

const meta: Meta<typeof TokenDemoButton> = {
  title: 'UI/TokenDemoButton',
  component: TokenDemoButton,
  parameters: {
    docs: {
      description: {
        component:
          'Minimal shared UI surface that keeps the shared Tailwind color and spacing test tokens exercised in Storybook without reintroducing app styling dependencies.',
      },
    },
  },
  args: {
    children: 'Token demo',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
