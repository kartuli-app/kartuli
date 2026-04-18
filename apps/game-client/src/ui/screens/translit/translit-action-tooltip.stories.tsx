import { Tooltip } from '@base-ui/react/tooltip';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { expect, waitFor, within } from 'storybook/test';
// `storybook/test` re-exports testing-library's synthetic userEvent, which
// dispatches pointer events but does NOT move the real browser pointer, so it
// never triggers CSS `:hover` pseudo-classes. For interaction stories that
// need real hover (this component uses `hover:bg-brand-text-100` and Base UI
// tooltips open on real pointerenter), we use `vitest/browser` userEvent
// which drives Playwright's real mouse while running in browser mode.
// `expect`, `waitFor`, `within` still come from `storybook/test` so they
// remain available in Storybook's UI when debugging.
import { userEvent } from 'vitest/browser';
import { TranslitActionTooltip } from './translit-action-tooltip';

/**
 * Stories for TranslitActionTooltip, the icon-button-with-tooltip used in the
 * translit screen. They're intentionally placed next to the component (not in
 * packages/ui) to exercise cross-package story discovery — Storybook's main.ts
 * picks them up via the apps/game-client glob.
 */
const meta: Meta<typeof TranslitActionTooltip> = {
  title: 'Screens/Translit/TranslitActionTooltip',
  component: TranslitActionTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon-style action button with a Base UI tooltip. Used on the translit screen for clear / switch-direction / copy actions. Demonstrates hover bg, tooltip placement (top/bottom), and disabled state.',
      },
    },
  },
  // Give the tooltip somewhere to live and cut the hover delay so play()
  // functions don't have to sit around waiting.
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
    tooltipDisabled: {
      control: 'boolean',
      description: 'When true, the tooltip never shows (used while a toast is visible)',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 32 },
    },
  },
  args: {
    tooltipLabel: 'Clear',
    side: 'top',
    sideOffset: 12,
    tooltipDisabled: false,
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

export const TooltipDisabled: Story = {
  name: 'Tooltip disabled',
  args: {
    tooltipDisabled: true,
    tooltipLabel: 'This label should never appear',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `tooltipDisabled` is true, hovering does not open the popup. The translit screen sets this while a copy-success toast is visible to avoid two overlays appearing at once.',
      },
    },
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
      // Base UI exposes open state via `data-popup-open` on the trigger.
      expect(trigger).not.toHaveAttribute('data-popup-open');
    });

    await step('Hovering the trigger opens the tooltip', async () => {
      await userEvent.hover(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-popup-open');
      });
      // And the label text is rendered somewhere on the page (Base UI
      // portals Tooltip.Popup to document.body, so we search the whole DOM).
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

    const bgOf = (element: Element) => getComputedStyle(element).backgroundColor;

    // Capture whatever the resting background is. The exact value depends on
    // Tailwind class-merge order (bg-transparent vs the base bg-brand-text-200
    // from buttonIconClassNames) — we only care that it changes on hover.
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
