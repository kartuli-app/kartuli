import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, SVGProps } from 'react';
import { Dock } from './dock';
import { DockItem } from './dock-item';

function StoryLink({ children, ...props }: ComponentProps<'a'>) {
  return <a {...props}>{children}</a>;
}

function CircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <title>Outlined circle</title>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function FilledCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <title>Filled circle</title>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

interface DockStoryProps {
  activeItem: 'overview' | 'library' | 'account' | 'none';
}

const items = [
  { id: 'overview', label: 'Overview' },
  { id: 'library', label: 'Library' },
  { id: 'account', label: 'Account' },
] as const;

function DockStory({ activeItem }: Readonly<DockStoryProps>) {
  return (
    <Dock ariaLabel="Example navigation">
      {items.map((item) => (
        <DockItem
          key={item.id}
          href={`/${item.id}`}
          label={item.label}
          icon={CircleIcon}
          activeIcon={FilledCircleIcon}
          active={item.id === activeItem}
          linkComponent={StoryLink}
        />
      ))}
    </Dock>
  );
}

const meta: Meta<typeof DockStory> = {
  title: 'UI/Layout/Dock/Dock',
  component: DockStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Responsive navigation dock for shell composition.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-s-color-shell-bg">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    activeItem: {
      control: 'select',
      options: ['overview', 'library', 'account', 'none'],
    },
  },
  args: { activeItem: 'overview' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithActiveItem: Story = {};
export const WithNoActiveItem: Story = { args: { activeItem: 'none' } };
