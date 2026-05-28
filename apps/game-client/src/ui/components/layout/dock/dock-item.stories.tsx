import { Surface } from '@game-client/ui/components/surface/surface';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ComponentType, SVGProps } from 'react';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
import {
  PiArrowsClockwiseBold,
  PiArrowsClockwiseLight,
  PiBookOpenTextFill,
  PiBookOpenTextLight,
} from 'react-icons/pi';
import { DockItem } from './dock-item';

const dockItemIcons = {
  learnOutline: PiBookOpenTextLight,
  learnActive: PiBookOpenTextFill,
  translitOutline: PiArrowsClockwiseLight,
  translitActive: PiArrowsClockwiseBold,
  settingsOutline: IoSettingsOutline,
  settingsActive: IoSettingsSharp,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

const dockItemIconOptions = Object.keys(dockItemIcons) as Array<keyof typeof dockItemIcons>;

const dockItemIconLabels: Record<keyof typeof dockItemIcons, string> = {
  learnOutline: 'Learn outline',
  learnActive: 'Learn active',
  translitOutline: 'Translit outline',
  translitActive: 'Translit active',
  settingsOutline: 'Settings outline',
  settingsActive: 'Settings active',
};

type DockItemStoryProps = Omit<ComponentProps<typeof DockItem>, 'icon' | 'activeIcon' | 'href'> & {
  icon: keyof typeof dockItemIcons;
  activeIcon: keyof typeof dockItemIcons;
};

function DockItemStory({ icon, activeIcon, ...props }: Readonly<DockItemStoryProps>) {
  return (
    <DockItem
      href="/"
      {...props}
      icon={dockItemIcons[icon]}
      activeIcon={dockItemIcons[activeIcon]}
    />
  );
}

const meta: Meta<typeof DockItemStory> = {
  title: 'UI/Layout/Dock/Item',
  component: DockItemStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact navigation action used in the game client dock. The icon controls expose the same icon set used by the live app while keeping the Storybook args serializable.',
      },
    },
    controls: {
      exclude: ['href'],
    },
  },
  decorators: [
    (Story) => (
      <Surface context="shell">
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
    },
    active: {
      control: 'boolean',
    },
    icon: {
      control: {
        type: 'select',
        labels: dockItemIconLabels,
      },
      options: dockItemIconOptions,
    },
    activeIcon: {
      control: {
        type: 'select',
        labels: dockItemIconLabels,
      },
      options: dockItemIconOptions,
    },
  },
  args: {
    label: 'Learn',
    active: false,
    icon: 'learnOutline',
    activeIcon: 'learnActive',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DefaultFocusVisible: Story = { parameters: { pseudo: { focusVisible: true } } };
export const DefaultHover: Story = { parameters: { pseudo: { hover: true } } };
export const DefaultHoverFocusVisible: Story = {
  parameters: { pseudo: { hover: true, focusVisible: true } },
};
export const Active: Story = { args: { active: true } };
export const ActiveFocusVisible: Story = {
  args: { active: true },
  parameters: { pseudo: { focusVisible: true } },
};
export const ActiveHover: Story = {
  args: { active: true },
  parameters: { pseudo: { hover: true } },
};
export const ActiveHoverFocusVisible: Story = {
  args: { active: true },
  parameters: { pseudo: { hover: true, focusVisible: true } },
};
export const Pressed: Story = { parameters: { pseudo: { active: true } } };
