import { Tooltip } from '@base-ui/react/tooltip';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { Surface } from '@game-client/ui/components/surface/surface';
import { DetailMetaBar } from '@game-client/ui/experiences/study/components/detail/detail-meta-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DetailMetaBar> = {
  title: 'Study/Detail/DetailMetaBar',
  component: DetailMetaBar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Tooltip.Provider delay={0} closeDelay={0}>
        <div className="w-md">
          <Surface context="shell">
            <Panel>
              <PanelSection>
                <Story />
              </PanelSection>
            </Panel>
          </Surface>
        </div>
      </Tooltip.Provider>
    ),
  ],
  args: {
    audioSrc: '/sounds/speech/letters/letter-ani.mp3',
    labels: {
      addFavorite: 'Add favorite',
      newBadge: 'New',
      playAudio: 'Play audio',
      removeFavorite: 'Remove favorite',
      stopAudio: 'Stop audio',
    },
    messages: {
      favoriteAdded: 'Letter ა added to favorites',
      favoriteRemoved: 'Letter ა removed from favorites',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
