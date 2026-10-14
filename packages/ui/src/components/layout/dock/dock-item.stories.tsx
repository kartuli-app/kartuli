import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, SVGProps } from 'react';
import { DockItem } from './dock-item';

function StoryLink({ children, ...props }: ComponentProps<'a'>) {
  return <a {...props}>{children}</a>;
}

function OutlineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <title>Outlined book</title>
      <path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4V4Z" />
    </svg>
  );
}

function ActiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <title>Filled book</title>
      <path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4V4Z" />
    </svg>
  );
}

interface DockItemStoryProps {
  label: string;
  active: boolean;
}

function DockItemStory(props: Readonly<DockItemStoryProps>) {
  return (
    <DockItem
      {...props}
      href="/overview"
      icon={OutlineIcon}
      activeIcon={ActiveIcon}
      linkComponent={StoryLink}
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
          'Framework-neutral dock link with injected navigation, selected state, and responsive presentation.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-s-color-shell-bg p-p-spacing-4">
        <Story />
      </div>
    ),
  ],
  args: { label: 'Overview', active: false },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DefaultFocusVisible: Story = { parameters: { pseudo: { focusVisible: true } } };
export const DefaultHover: Story = { parameters: { pseudo: { hover: true } } };
export const Active: Story = { args: { active: true } };
export const ActiveFocusVisible: Story = {
  args: { active: true },
  parameters: { pseudo: { focusVisible: true } },
};
export const Pressed: Story = { parameters: { pseudo: { active: true } } };
