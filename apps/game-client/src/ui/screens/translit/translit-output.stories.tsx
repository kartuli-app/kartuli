import { Tooltip } from '@base-ui/react/tooltip';
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
        <div style={{ width: '28rem', height: '18rem', padding: '2rem', background: 'white' }}>
          <Story />
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
