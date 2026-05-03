import { Tooltip } from '@base-ui/react/tooltip';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { expect, waitFor, within } from 'storybook/test';
import { TooltipButton } from './tooltip-button';

async function getBrowserUserEventOrNull() {
  try {
    const mod = await import('vitest/browser');
    return mod.userEvent;
  } catch {
    return null;
  }
}

const meta: Meta<typeof TooltipButton> = {
  title: 'UI/TooltipButton',
  component: TooltipButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Reusable app-local button trigger with a Base UI tooltip. Used by translit today and kept outside screen folders so it can be reused elsewhere before promotion to the shared UI package.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Tooltip.Provider delay={0} closeDelay={0}>
        <div style={{ padding: '6rem' }}>
          <Story />
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
    const userEvent = await getBrowserUserEventOrNull();
    if (!userEvent) return;

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
    const userEvent = await getBrowserUserEventOrNull();
    if (!userEvent) return;

    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Copy transliteration' });
    const bgOf = (element: Element) => getComputedStyle(element).backgroundColor;
    const idleBg = bgOf(trigger);

    await step('Hovering the trigger changes the background color', async () => {
      await userEvent.hover(trigger);
      await waitFor(() => {
        expect(bgOf(trigger)).not.toEqual(idleBg);
      });
    });

    await step('Unhovering restores the resting background', async () => {
      await userEvent.unhover(trigger);
      await waitFor(() => {
        expect(bgOf(trigger)).toEqual(idleBg);
      });
    });
  },
};
