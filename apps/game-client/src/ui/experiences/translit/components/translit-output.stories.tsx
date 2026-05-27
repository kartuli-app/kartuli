import { Tooltip } from '@base-ui/react/tooltip';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelHeader } from '@game-client/ui/components/panel/panel-header';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { Surface } from '@game-client/ui/components/surface/surface';
import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useRef } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { TranslitOutput } from './translit-output';
import { getTranslitOutputSegments } from './translit-output-segments';

function TranslitOutputStoryRender(args: ComponentProps<typeof TranslitOutput>) {
  const tooltipPortalContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section aria-label="Transliteration preview" className="h-full">
      <div id="translit-output-story-label" className="sr-only">
        Transliteration
      </div>
      <div ref={tooltipPortalContainerRef} aria-hidden />
      <TranslitOutput {...args} tooltipPortalContainer={tooltipPortalContainerRef} />
    </section>
  );
}

const meta: Meta<typeof TranslitOutput> = {
  title: 'Screens/Translit/TranslitOutput',
  component: TranslitOutput,
  parameters: {
    layout: 'centered',
    a11y: {
      options: {
        rules: {
          'target-size': { enabled: false },
        },
      },
    },
    docs: {
      description: {
        component:
          'Read-only transliteration output surface with hoverable/focusable tokens that reveal the matching source segment in a tooltip.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Tooltip.Provider delay={0} closeDelay={0}>
        <div className="w-[28rem]">
          <Surface context="shell">
            <Panel className="h-[20rem]">
              <PanelHeader context="Transliteration" title="Latin" variant="default" />
              <PanelSection className={cn('h-full')}>
                <Story />
              </PanelSection>
            </Panel>
          </Surface>
        </div>
      </Tooltip.Provider>
    ),
  ],
  args: {
    ariaLabelledBy: 'translit-output-story-label',
    lang: 'ka-Latn',
    segments: getTranslitOutputSegments('ფ პ  გამარჯობა.\nბა', "p' p  gamarjoba.\nba"),
  },
  render: (args) => <TranslitOutputStoryRender {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShowsSourceTooltipOnHover: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const token = canvas.getByRole('button', { name: 'gamarjoba.' });

    await step('Hovering a token opens the tooltip with the source segment', async () => {
      await userEvent.hover(token);
      await waitFor(() => {
        expect(within(document.body).getByText('გამარჯობა.')).toBeInTheDocument();
      });
    });
  },
};

export const ShowsSourceTooltipOnFocus: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const token = canvas.getByRole('button', { name: "p'" });

    await step('Focusing a token opens the same tooltip for keyboard users', async () => {
      token.focus();
      await waitFor(() => {
        expect(within(document.body).getByText('ფ')).toBeInTheDocument();
      });
    });
  },
};
