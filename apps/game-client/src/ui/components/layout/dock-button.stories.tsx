import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ComponentType, SVGProps } from 'react';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
import {
  PiArrowsClockwiseBold,
  PiArrowsClockwiseLight,
  PiBookOpenTextFill,
  PiBookOpenTextLight,
} from 'react-icons/pi';
import { Surface } from '../surface/surface';
import { DockButton } from './dock-button';

const dockButtonIcons = {
  learnOutline: PiBookOpenTextLight,
  learnActive: PiBookOpenTextFill,
  translitOutline: PiArrowsClockwiseLight,
  translitActive: PiArrowsClockwiseBold,
  settingsOutline: IoSettingsOutline,
  settingsActive: IoSettingsSharp,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

const dockButtonIconOptions = Object.keys(dockButtonIcons) as Array<keyof typeof dockButtonIcons>;

const dockButtonIconLabels: Record<keyof typeof dockButtonIcons, string> = {
  learnOutline: 'Learn outline',
  learnActive: 'Learn active',
  translitOutline: 'Translit outline',
  translitActive: 'Translit active',
  settingsOutline: 'Settings outline',
  settingsActive: 'Settings active',
};

type DockButtonStoryProps = Omit<ComponentProps<typeof DockButton>, 'icon' | 'iconActive'> & {
  icon: keyof typeof dockButtonIcons;
  iconActive: keyof typeof dockButtonIcons;
};

function DockButtonStory({ icon, iconActive, ...props }: Readonly<DockButtonStoryProps>) {
  return (
    <DockButton {...props} icon={dockButtonIcons[icon]} iconActive={dockButtonIcons[iconActive]} />
  );
}

const meta: Meta<typeof DockButtonStory> = {
  title: 'UI/DockButton',
  component: DockButtonStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact navigation button used in the game client dock. The icon controls expose the same icon set used by the live app while keeping the Storybook args serializable.',
      },
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
      description: 'The label of the button',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the button is active',
    },
    href: {
      control: 'text',
      description: 'The href of the button',
    },
    icon: {
      control: {
        type: 'select',
        labels: dockButtonIconLabels,
      },
      options: dockButtonIconOptions,
      description: 'The icon shown when the button is inactive',
    },
    iconActive: {
      control: {
        type: 'select',
        labels: dockButtonIconLabels,
      },
      options: dockButtonIconOptions,
      description: 'The icon shown when the button is active',
    },
  },
  args: {
    label: 'Learn',
    isActive: false,
    href: '/',
    icon: 'learnOutline',
    iconActive: 'learnActive',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  name: 'Active',
  args: {
    isActive: true,
  },
};
