import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentContainer } from './content-container';

const meta: Meta<typeof ContentContainer> = {
  title: 'UI/Layout/Shell/ContentContainer',
  component: ContentContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Centered shared content width and responsive padding contract.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-dvh w-full bg-s-color-shell-bg">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <section className="rounded-p-radius-2 border border-s-color-panel-border bg-s-color-panel-bg p-p-spacing-4 text-s-color-panel-content-primary">
        <h1 className="text-2xl font-black">Centered content</h1>
        <p className="text-s-color-panel-content-secondary">
          Resize the canvas to inspect the shared maximum width and responsive padding.
        </p>
      </section>
    ),
  },
};
