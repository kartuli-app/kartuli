import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { Surface } from '../surface/surface';
import { Dock } from './dock';
import { DockItem } from './dock-item';
import type { GameClientDockItemId } from './game-client-dock-items';
import { gameClientDockItems } from './game-client-dock-items';

type DockStoryActiveItemId = GameClientDockItemId | 'none' | 'wrong';

interface DockStoryProps extends Omit<ComponentProps<typeof Dock>, 'children'> {
  activeItemId: DockStoryActiveItemId;
}

const dockItemLabelById = {
  learn: 'Learn',
  translit: 'Translit',
  settings: 'Settings',
} satisfies Record<(typeof gameClientDockItems)[number]['id'], string>;

function DockStory({ activeItemId }: Readonly<DockStoryProps>) {
  return (
    <Dock>
      {gameClientDockItems.map((item) => (
        <DockItem
          key={item.id}
          href={item.href}
          icon={item.icon}
          activeIcon={item.activeIcon}
          label={dockItemLabelById[item.id]}
          active={item.id === activeItemId}
        />
      ))}
    </Dock>
  );
}

const dockItemControlLabels: Record<DockStoryActiveItemId, string> = {
  learn: 'Learn',
  translit: 'Translit',
  settings: 'Settings',
  none: 'None',
  wrong: 'Wrong',
};

const dockItemOptions = ['learn', 'translit', 'settings', 'none', 'wrong'] as const;

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
        labels: dockItemControlLabels,
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
    activeItemId: 'none',
  },
};

export const WithWrongActiveItem: Story = {
  args: {
    activeItemId: 'wrong',
  },
};
