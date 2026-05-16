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
import { Dock } from './dock';
import { DockItem } from './dock-item';
import { gameClientDockItems } from './game-client-dock';

type DockStoryProps = Omit<ComponentProps<typeof Dock>, 'children'> & {
  activeItemId?: string;
};

function DockStory({ activeItemId }: Readonly<DockStoryProps>) {
  return (
    <Dock>
      {gameClientDockItems.map((item) => (
        <DockItem
          key={item.id}
          href={item.href}
          icon={item.icon}
          activeIcon={item.activeIcon}
          label={item.label}
          active={item.id === activeItemId}
        />
      ))}
    </Dock>
  );
}

const dockItemLabels = [...new Set(gameClientDockItems.map((item) => item.label)), 'None', 'Wrong'];
const dockItemOptions = [
  ...new Set(gameClientDockItems.map((item) => item.id)),
  undefined,
  'wrong',
];

const meta: Meta<typeof DockStory> = {
  title: 'UI/Dock',
  component: DockStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Compact navigation dock used in the game client.',
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
    activeItemId: {
      control: {
        type: 'select',
        labels: dockItemLabels,
      },
      options: dockItemOptions,
      description: 'The ID of the active item',
    },
  },
  args: {
    activeItemId: 'learn',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Story scenarios:
// - with active item
// - with no active items
// - with wrong active item

export const WithActiveItem: Story = {
  args: {
    activeItemId: 'learn',
  },
};

export const WithNoActiveItem: Story = {
  args: {
    activeItemId: undefined,
  },
};

export const WithWrongActiveItem: Story = {
  args: {
    activeItemId: 'wrong',
  },
};
