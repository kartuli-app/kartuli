import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IoArrowBackOutline, IoSettingsOutline } from 'react-icons/io5';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { Surface } from '../surface/surface';
import { AppBar } from './app-bar';
import { AppBarIconButton, GameAppBarIconLink } from './app-bar-icon-action';

const appBarIcons = {
  back: IoArrowBackOutline,
  search: PiMagnifyingGlass,
  settings: IoSettingsOutline,
} as const;

const appBarIconOptions = Object.keys(appBarIcons) as Array<keyof typeof appBarIcons>;

const appBarIconLabels: Record<keyof typeof appBarIcons, string> = {
  back: 'Back',
  search: 'Search',
  settings: 'Settings',
};

const appBarActionLabels: Record<keyof typeof appBarIcons, string> = {
  back: 'Go back',
  search: 'Search',
  settings: 'Settings',
};

type AppBarActionKind = 'button' | 'link';
type TrailingMode = 'none' | 'one' | 'two' | 'mixed';

type AppBarStoryProps = {
  eyeBrow: string;
  title: string;
  showLeading: boolean;
  leadingKind: AppBarActionKind;
  leadingIcon: keyof typeof appBarIcons;
  trailingMode: TrailingMode;
};

function AppBarStatusChip({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span
      className={cn(
        'inline-flex',
        'shrink-0',
        'items-center',
        'rounded-p-radius-full',
        'bg-s-color-shell-action-selected-bg',
        'px-3',
        'py-1',
        'text-sm',
        'font-bold',
        'text-s-color-shell-action-selected-content',
        'uppercase',
      )}
    >
      {children}
    </span>
  );
}

function renderAppBarAction(
  kind: AppBarActionKind,
  iconKey: keyof typeof appBarIcons,
  href: string,
) {
  const Icon = appBarIcons[iconKey];
  const label = appBarActionLabels[iconKey];

  if (kind === 'link') {
    return <GameAppBarIconLink href={href} label={label} icon={Icon} />;
  }

  return <AppBarIconButton label={label} icon={Icon} onClick={() => {}} />;
}

function renderTrailing(mode: TrailingMode) {
  if (mode === 'none') {
    return undefined;
  }

  if (mode === 'one') {
    return renderAppBarAction('button', 'search', '/search');
  }

  if (mode === 'two') {
    return (
      <>
        {renderAppBarAction('link', 'search', '/search')}
        {renderAppBarAction('button', 'settings', '/settings')}
      </>
    );
  }

  return (
    <>
      <AppBarStatusChip>Beta</AppBarStatusChip>
      {renderAppBarAction('button', 'settings', '/settings')}
    </>
  );
}

function AppBarStory({
  eyeBrow,
  title,
  showLeading,
  leadingKind,
  leadingIcon,
  trailingMode,
}: Readonly<AppBarStoryProps>) {
  return (
    <AppBar
      eyeBrow={eyeBrow}
      title={title}
      leading={showLeading ? renderAppBarAction(leadingKind, leadingIcon, '/') : undefined}
      trailing={renderTrailing(trailingMode)}
    />
  );
}

const meta: Meta<typeof AppBarStory> = {
  title: 'UI/AppBar',
  component: AppBarStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Top-level shell bar that balances a fixed leading slot and a flexible trailing slot around a truncating title block.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[480px]">
        <Surface context="shell">
          <Story />
        </Surface>
      </div>
    ),
  ],
  argTypes: {
    eyeBrow: {
      control: 'text',
      description: 'Secondary contextual text shown above the title',
    },
    title: {
      control: 'text',
      description: 'Primary app bar title',
    },
    showLeading: {
      control: 'boolean',
      description: 'Whether the leading action is rendered',
    },
    leadingKind: {
      control: 'inline-radio',
      options: ['button', 'link'],
      description: 'Whether the leading action is a button or a link',
    },
    leadingIcon: {
      control: {
        type: 'select',
        labels: appBarIconLabels,
      },
      options: appBarIconOptions,
      description: 'The icon rendered in the leading action',
    },
    trailingMode: {
      control: 'inline-radio',
      options: ['none', 'one', 'two', 'mixed'],
      description: 'The content rendered in the trailing region',
    },
  },
  args: {
    eyeBrow: 'kartuli.app',
    title: 'Alphabet',
    showLeading: true,
    leadingKind: 'link',
    leadingIcon: 'back',
    trailingMode: 'one',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTrailing: Story = {
  args: {
    trailingMode: 'none',
  },
};

export const TwoTrailingActions: Story = {
  args: {
    trailingMode: 'two',
  },
};

export const MixedTrailingContent: Story = {
  args: {
    trailingMode: 'mixed',
  },
};

export const LongTitleWithTwoTrailingActions: Story = {
  args: {
    eyeBrow: 'kartuli.app learning journey and progress overview',
    title: 'Explore the Georgian alphabet through letters, sounds, and pattern groups',
    trailingMode: 'two',
  },
  render: (args) => (
    <div className="w-full max-w-[320px]">
      <AppBarStory {...args} />
    </div>
  ),
};

export const Comparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AppBarStory
        eyeBrow="kartuli.app"
        title="Alphabet"
        showLeading
        leadingKind="link"
        leadingIcon="back"
        trailingMode="one"
      />
      <AppBarStory
        eyeBrow="Browse"
        title="Vocabulary and review sets with intentionally long copy"
        showLeading={false}
        leadingKind="button"
        leadingIcon="back"
        trailingMode="two"
      />
      <AppBarStory
        eyeBrow="kartuli.app"
        title="Translit"
        showLeading
        leadingKind="button"
        leadingIcon="back"
        trailingMode="mixed"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
