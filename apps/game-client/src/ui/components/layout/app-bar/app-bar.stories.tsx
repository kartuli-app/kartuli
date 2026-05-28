import { Surface } from '@game-client/ui/components/surface/surface';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IoArrowBackOutline, IoSettingsOutline } from 'react-icons/io5';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { AppBar } from './app-bar';
import { AppBarIconButton, GameAppBarIconLink } from './app-bar-icon-action';

const appBarIcons = {
  back: IoArrowBackOutline,
  search: PiMagnifyingGlass,
  settings: IoSettingsOutline,
} as const;

const appBarActionLabels: Record<keyof typeof appBarIcons, string> = {
  back: 'Go back',
  search: 'Search',
  settings: 'Settings',
};

type AppBarActionKind = 'button' | 'link';
type TrailingMode = 'none' | 'primary-only' | 'secondary-only' | 'both';

type AppBarStoryProps = {
  eyeBrow: string;
  title: string;
  showLeading: boolean;
  leadingKind: AppBarActionKind;
  leadingIcon: keyof typeof appBarIcons;
  trailingMode: TrailingMode;
};

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
    return {};
  }

  if (mode === 'primary-only') {
    return {
      trailingPrimary: renderAppBarAction('button', 'search', '/search'),
    };
  }

  if (mode === 'secondary-only') {
    return {
      trailingSecondary: renderAppBarAction('link', 'search', '/search'),
    };
  }

  return {
    trailingSecondary: renderAppBarAction('link', 'search', '/search'),
    trailingPrimary: renderAppBarAction('button', 'settings', '/settings'),
  };
}

function AppBarStory({
  eyeBrow,
  title,
  showLeading,
  leadingKind,
  leadingIcon,
  trailingMode,
}: Readonly<AppBarStoryProps>) {
  const trailingSlots = renderTrailing(trailingMode);

  return (
    <AppBar
      eyeBrow={eyeBrow}
      title={title}
      leading={showLeading ? renderAppBarAction(leadingKind, leadingIcon, '/') : undefined}
      trailingPrimary={trailingSlots.trailingPrimary}
      trailingSecondary={trailingSlots.trailingSecondary}
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
          'Top-level shell bar that balances an optional leading action with two reserved trailing action slots around a truncating title block.',
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
    },
    title: {
      control: 'text',
    },
    showLeading: {
      control: 'boolean',
    },
    leadingKind: {
      control: 'inline-radio',
      options: ['button', 'link'],
    },
    leadingIcon: {
      control: 'inline-radio',
      options: ['back', 'search', 'settings'],
    },
    trailingMode: {
      control: 'inline-radio',
      options: ['none', 'primary-only', 'secondary-only', 'both'],
    },
  },
  args: {
    eyeBrow: 'kartuli.app',
    title: 'Alphabet',
    showLeading: true,
    leadingKind: 'link',
    leadingIcon: 'back',
    trailingMode: 'primary-only',
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
    trailingMode: 'both',
  },
};

export const SecondaryOnly: Story = {
  args: {
    trailingMode: 'secondary-only',
  },
};

export const LongTitleWithTwoTrailingActions: Story = {
  args: {
    eyeBrow: 'kartuli.app learning journey and progress overview',
    title: 'Explore the Georgian alphabet through letters, sounds, and pattern groups',
    trailingMode: 'both',
  },
  render: (args) => (
    <div className="w-full max-w-[320px]">
      <AppBarStory {...args} />
    </div>
  ),
};
