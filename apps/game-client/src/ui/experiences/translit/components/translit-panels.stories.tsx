import { Tooltip } from '@base-ui/react/tooltip';
import { HeaderActionButton } from '@game-client/ui/components/header-action-button';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelHeader } from '@game-client/ui/components/panel/panel-header';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { Surface } from '@game-client/ui/components/surface/surface';
import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FaRegCopy } from 'react-icons/fa6';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TranslitInput } from './translit-input';
import { TranslitOutput } from './translit-output';
import { getTranslitOutputSegments } from './translit-output-segments';

function TranslitPanelsPreview() {
  const inputContextId = 'translit-panels-source-context';
  const inputTitleId = 'translit-panels-source-title';
  const outputContextId = 'translit-panels-output-context';
  const outputTitleId = 'translit-panels-output-title';

  return (
    <Tooltip.Provider delay={0} closeDelay={0}>
      <Surface context="shell">
        <div className={cn('flex', 'w-[28rem]', 'flex-col', 'gap-4')}>
          <Panel className="h-[18rem]">
            <PanelHeader
              context="Source"
              contextId={inputContextId}
              title="Georgian"
              titleId={inputTitleId}
              trailing={
                <>
                  <HeaderActionButton aria-label="Clear text" tooltipLabel="Clear text">
                    <RiDeleteBin6Line className="size-5" aria-hidden="true" />
                  </HeaderActionButton>
                  <HeaderActionButton
                    aria-controls="translit-panels-source translit-panels-output"
                    aria-label="Switch to Latin → Georgian"
                    tooltipLabel="Switch to Latin → Georgian"
                  >
                    <HiOutlineSwitchHorizontal className="size-5" aria-hidden="true" />
                  </HeaderActionButton>
                </>
              }
              variant="default"
            />
            <PanelSection className={cn('h-full', 'px-4', 'py-4')}>
              <TranslitInput
                ariaLabelledBy={`${inputContextId} ${inputTitleId}`}
                className="text-2xl font-georgian"
                id="translit-panels-source"
                lang="ka-GE"
                readOnly
                value="გამარჯობა"
              />
            </PanelSection>
          </Panel>

          <Panel className="h-[18rem]">
            <PanelHeader
              context="Transliteration"
              contextId={outputContextId}
              title="Latin"
              titleId={outputTitleId}
              trailing={
                <HeaderActionButton
                  aria-label="Copy transliteration"
                  tooltipLabel="Copy transliteration"
                >
                  <FaRegCopy className="size-5" aria-hidden="true" />
                </HeaderActionButton>
              }
              variant="default"
            />
            <PanelSection className={cn('h-full')}>
              <TranslitOutput
                ariaLabelledBy={`${outputContextId} ${outputTitleId}`}
                className="text-2xl font-georgian"
                lang="ka-Latn"
                segments={getTranslitOutputSegments('გამარჯობა', 'gamarjoba')}
              />
            </PanelSection>
          </Panel>
        </div>
      </Surface>
    </Tooltip.Provider>
  );
}

const meta: Meta<typeof TranslitPanelsPreview> = {
  title: 'Screens/Translit/TranslitPanels',
  component: TranslitPanelsPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Visual composition preview of the translit source and output panels with their header actions, input surface, and output surface together.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
