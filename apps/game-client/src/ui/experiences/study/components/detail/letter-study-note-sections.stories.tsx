import type { LetterItem } from '@game-client/learning-content/library/library';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { Surface } from '@game-client/ui/components/surface/surface';
import {
  InfoTextNotesSection,
  PronunciationHintSection,
  RuntimeExamplesSection,
} from '@game-client/ui/experiences/study/components/detail/letter-study-note-sections';
import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';

const item: Pick<LetterItem, 'id' | 'targetScript' | 'notes'> = {
  id: 'letter-ani',
  targetScript: 'ა',
  notes: [
    {
      kind: 'pronunciation_hint',
      highlight: 'a',
      examples: ['father', 'spa'],
    },
    {
      kind: 'info_text',
      text: 'This is the first Georgian letter.',
    },
    {
      kind: 'info_text',
      text: 'Its sound stays steady and open.',
    },
  ],
};

const meta = {
  title: 'Study/Detail/LetterStudyNoteSections',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-md">
        <Surface context="shell">
          <Panel>
            <PanelSection>
              <div className={cn('flex flex-col gap-p-spacing-3')}>
                <Story />
              </div>
            </PanelSection>
          </Panel>
        </Surface>
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pronunciation: Story = {
  render: () => <PronunciationHintSection badgeLabel="like in" notes={item.notes} />,
};

export const RuntimeExamples: Story = {
  render: () => <RuntimeExamplesSection badgeLabel="example" item={item} />,
};

export const InfoTextNotes: Story = {
  render: () => <InfoTextNotesSection notes={item.notes} />,
};
