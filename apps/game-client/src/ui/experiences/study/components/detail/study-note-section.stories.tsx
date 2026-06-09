import { PanelBadge } from '@game-client/ui/components/badge/panel-badge';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { Surface } from '@game-client/ui/components/surface/surface';
import { StudyNoteSection } from '@game-client/ui/experiences/study/components/detail/study-note-section';
import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof StudyNoteSection> = {
  title: 'Study/Detail/StudyNoteSection',
  component: StudyNoteSection,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-md">
        <Surface context="shell">
          <Panel>
            <PanelSection>
              <Story />
            </PanelSection>
          </Panel>
        </Surface>
      </div>
    ),
  ],
  args: {
    align: 'center',
    size: 'default',
    badge: <PanelBadge variant="neutral">like in</PanelBadge>,
    children: (
      <div className={cn('text-md text-s-color-panel-content-secondary md:text-xl')}>
        sample content
      </div>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StackedNotes: Story = {
  args: {
    align: 'start',
    badge: undefined,
    children: (
      <div className="flex w-full flex-col gap-p-spacing-2">
        <div className={cn('text-md text-s-color-panel-content-secondary md:text-xl')}>
          First note
        </div>
        <div className={cn('text-md text-s-color-panel-content-secondary md:text-xl')}>
          Second note
        </div>
      </div>
    ),
  },
};
