import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { AppBar } from './app-bar';

interface AppBarStoryProps {
  title: string;
  eyeBrow: string;
  showLeading: boolean;
  trailingMode: 'none' | 'primary-only' | 'secondary-only' | 'both';
}

function Action({ label }: Readonly<{ label: string }>) {
  return (
    <button
      type="button"
      aria-label={label}
      className="size-12 rounded-full border border-s-color-shell-border"
    >
      {label.slice(0, 1)}
    </button>
  );
}

function Title({ title, eyeBrow }: Readonly<Pick<AppBarStoryProps, 'title' | 'eyeBrow'>>) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start justify-center uppercase">
      <div className="w-full truncate text-xs font-bold text-s-color-shell-content-secondary">
        {eyeBrow}
      </div>
      <h1 className="w-full truncate text-lg font-black text-s-color-shell-content-primary">
        {title}
      </h1>
    </div>
  );
}

function trailingSlots(mode: AppBarStoryProps['trailingMode']): {
  trailingPrimary?: ReactNode;
  trailingSecondary?: ReactNode;
} {
  if (mode === 'primary-only') {
    return { trailingPrimary: <Action label="Primary action" /> };
  }
  if (mode === 'secondary-only') {
    return { trailingSecondary: <Action label="Search" /> };
  }
  if (mode === 'both') {
    return {
      trailingPrimary: <Action label="Primary action" />,
      trailingSecondary: <Action label="Secondary action" />,
    };
  }
  return {};
}

function AppBarStory({ title, eyeBrow, showLeading, trailingMode }: Readonly<AppBarStoryProps>) {
  return (
    <AppBar
      leading={showLeading ? <Action label="Back" /> : undefined}
      title={<Title title={title} eyeBrow={eyeBrow} />}
      {...trailingSlots(trailingMode)}
    />
  );
}

const meta: Meta<typeof AppBarStory> = {
  title: 'UI/Layout/AppBar/AppBar',
  component: AppBarStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Framework-neutral shell bar with generic leading, title, and trailing composition slots.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[480px] bg-s-color-shell-bg">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    eyeBrow: { control: 'text' },
    showLeading: { control: 'boolean' },
    trailingMode: {
      control: 'inline-radio',
      options: ['none', 'primary-only', 'secondary-only', 'both'],
    },
  },
  args: {
    title: 'Dashboard',
    eyeBrow: 'Application',
    showLeading: true,
    trailingMode: 'primary-only',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutTrailing: Story = { args: { trailingMode: 'none' } };
export const TwoTrailingActions: Story = { args: { trailingMode: 'both' } };
export const SecondaryOnly: Story = { args: { trailingMode: 'secondary-only' } };
export const LongTitleWithTwoTrailingActions: Story = {
  args: {
    eyeBrow: 'Application workspace and progress overview',
    title: 'A deliberately long application title that demonstrates truncation',
    trailingMode: 'both',
  },
  render: (args) => (
    <div className="w-full max-w-[320px]">
      <AppBarStory {...args} />
    </div>
  ),
};
