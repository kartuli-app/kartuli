import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelHeader } from '@game-client/ui/components/panel/panel-header';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { Surface } from '@game-client/ui/components/surface/surface';
import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { TranslitInput } from './translit-input';

function TranslitInputStoryRender(args: ComponentProps<typeof TranslitInput>) {
  const [value, setValue] = useState(args.value ?? '');

  useEffect(() => {
    setValue(args.value ?? '');
  }, [args.value]);

  return (
    <Panel className="h-[20rem]">
      <PanelHeader context="Source" title="Georgian" variant="default" />
      <PanelSection className={cn('h-full', 'px-4', 'py-4')}>
        <TranslitInput
          {...args}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </PanelSection>
    </Panel>
  );
}

const meta: Meta<typeof TranslitInput> = {
  title: 'Screens/Translit/TranslitInput',
  component: TranslitInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Editable transliteration source surface extracted from the translit screen so it can be reviewed independently.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem]">
        <Surface context="shell">
          <Story />
        </Surface>
      </div>
    ),
  ],
  args: {
    ariaLabelledBy: 'translit-input-story-label',
    className: 'text-2xl font-georgian',
    id: 'translit-input-story',
    lang: 'ka-GE',
    placeholder: 'გამარჯობა',
    value: 'გამარჯობა',
  },
  render: (args) => (
    <>
      <div id="translit-input-story-label" className="sr-only">
        Georgian input
      </div>
      <TranslitInputStoryRender {...args} />
    </>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    value: '',
  },
};
