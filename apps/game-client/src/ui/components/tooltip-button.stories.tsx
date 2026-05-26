import { Tooltip } from '@base-ui/react/tooltip';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { HeaderActionButton } from './header-action-button';
import { Panel } from './panel/panel';
import { PanelHeader } from './panel/panel-header';
import { Surface } from './surface/surface';

const meta: Meta<typeof HeaderActionButton> = {
  title: 'UI/HeaderActionButton',
  component: HeaderActionButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Header action button with a built-in tooltip. Used by translit panel headers and still exported through the legacy `TooltipButton` alias for compatibility.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Tooltip.Provider delay={0} closeDelay={0}>
        <div className="w-[28rem]">
          <Surface context="shell">
            <Panel>
              <PanelHeader
                context="Source"
                title="Georgian"
                trailing={<Story />}
                variant="default"
              />
            </Panel>
          </Surface>
        </div>
      </Tooltip.Provider>
    ),
  ],
  argTypes: {
    side: {
      control: 'radio',
      options: ['top', 'bottom'],
      description: 'Which side of the trigger the tooltip prefers',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 32 },
    },
  },
  args: {
    tooltipLabel: 'Clear',
    side: 'top',
    sideOffset: 12,
    children: <RiDeleteBin6Fill className="size-5" aria-hidden="true" />,
    'aria-label': 'Clear',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SideTop: Story = {
  name: 'Side: top (default)',
  args: {
    side: 'top',
    tooltipLabel: 'Clear',
  },
};

export const SideBottom: Story = {
  name: 'Side: bottom',
  args: {
    side: 'bottom',
    tooltipLabel: 'Switch to Latin → Georgian',
    children: <HiOutlineSwitchHorizontal className="size-5" aria-hidden="true" />,
    'aria-label': 'Switch to Latin → Georgian',
  },
};

export const ShowsTooltipOnHover: Story = {
  name: 'Shows tooltip on hover (interaction test)',
  args: {
    tooltipLabel: 'Clear text',
    'aria-label': 'Clear text',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Clear text' });

    await step('Tooltip is not open before hovering', async () => {
      expect(trigger).not.toHaveAttribute('data-popup-open');
    });

    await step('Hovering the trigger opens the tooltip', async () => {
      await userEvent.hover(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-popup-open');
      });
      await waitFor(() => {
        expect(within(document.body).getByText('Clear text')).toBeInTheDocument();
      });
    });

    await step('Unhovering closes the tooltip', async () => {
      await userEvent.unhover(trigger);
      await waitFor(() => {
        expect(trigger).not.toHaveAttribute('data-popup-open');
      });
    });
  },
};

export const ChangesBackgroundOnHover: Story = {
  name: 'Changes background on hover (interaction test)',
  args: {
    tooltipLabel: 'Copy transliteration',
    'aria-label': 'Copy transliteration',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Copy transliteration' });

    await step('The trigger keeps the semantic action token classes', async () => {
      expect(trigger.className).toContain('hover:bg-s-color-panel-action-outline-hover-bg');
      expect(trigger.className).toContain('focus-visible:ring-s-color-panel-action-outline-ring');
    });
  },
};
