import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './app-shell';

function AppShellStory() {
  return (
    <div className="flex min-h-screen">
      <AppShell
        appBar={
          <div className="flex h-height-appbar items-center border-b-(length:--s-width-shell-border) border-s-color-shell-border bg-s-color-shell-bg px-p-spacing-4 font-bold text-s-color-shell-content-primary">
            Shared app bar slot
          </div>
        }
        startRailContent={
          <nav aria-label="Example navigation" className="p-p-spacing-4">
            Navigation slot
          </nav>
        }
        endRailContent={
          <div aria-hidden="true" className="p-p-spacing-4 text-s-color-shell-content-decoration">
            Decoration slot
          </div>
        }
      >
        <div className="rounded-p-radius-2 border border-s-color-shell-border p-p-spacing-4">
          Shared content region
        </div>
      </AppShell>
    </div>
  );
}

const meta: Meta<typeof AppShellStory> = {
  title: 'UI/Layout/Shell/AppShell',
  component: AppShellStory,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive application shell with fixed app-bar, optional start/end rails, and content offsets.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
