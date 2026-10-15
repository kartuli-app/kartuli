import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShellRail } from './shell-rail';

const meta: Meta<typeof ShellRail> = {
  title: 'UI/Layout/Shell/ShellRail',
  component: ShellRail,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Responsive start and end rail used by the shared application shell.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-dvh bg-s-color-panel-bg">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Start: Story = {
  args: {
    placement: 'start',
    children: (
      <nav
        aria-label="Example start rail"
        className="flex w-full items-center justify-center p-p-spacing-4 text-s-color-shell-content-primary md:items-start"
      >
        Start rail
      </nav>
    ),
  },
  globals: {
    viewport: { value: 'review-tablet', isRotated: false },
  },
};

export const End: Story = {
  args: {
    placement: 'end',
    children: (
      <aside
        aria-label="Example end rail"
        className="p-p-spacing-4 text-s-color-shell-content-primary"
      >
        End rail
      </aside>
    ),
  },
  globals: {
    viewport: { value: 'review-desktop', isRotated: false },
  },
};
