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

type AppBarStoryProps = {
  eyeBrow: string;
  title: string;
  showLeading: boolean;
  leadingKind: AppBarActionKind;
  leadingIcon: keyof typeof appBarIcons;
  showAction: boolean;
  actionKind: AppBarActionKind;
  actionIcon: keyof typeof appBarIcons;
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

function AppBarStory({
  eyeBrow,
  title,
  showLeading,
  leadingKind,
  leadingIcon,
  showAction,
  actionKind,
  actionIcon,
}: Readonly<AppBarStoryProps>) {
  return (
    <AppBar
      eyeBrow={eyeBrow}
      title={title}
      leading={showLeading ? renderAppBarAction(leadingKind, leadingIcon, '/') : undefined}
      action={showAction ? renderAppBarAction(actionKind, actionIcon, '/search') : undefined}
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
          'Top-level shell bar that balances leading and trailing actions around a truncating title block.',
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
    showAction: {
      control: 'boolean',
      description: 'Whether the trailing action is rendered',
    },
    actionKind: {
      control: 'inline-radio',
      options: ['button', 'link'],
      description: 'Whether the trailing action is a button or a link',
    },
    actionIcon: {
      control: {
        type: 'select',
        labels: appBarIconLabels,
      },
      options: appBarIconOptions,
      description: 'The icon rendered in the trailing action',
    },
  },
  args: {
    eyeBrow: 'kartuli.app',
    title: 'Alphabet',
    showLeading: true,
    leadingKind: 'link',
    leadingIcon: 'back',
    showAction: true,
    actionKind: 'button',
    actionIcon: 'search',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLeading: Story = {
  args: {
    showLeading: false,
  },
};

export const WithoutAction: Story = {
  args: {
    showAction: false,
  },
};

export const WithoutActions: Story = {
  args: {
    showLeading: false,
    showAction: false,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Explore the Georgian alphabet through letters, sounds, and pattern groups',
  },
};

export const LongEyeBrowAndTitle: Story = {
  args: {
    eyeBrow: 'kartuli.app learning journey and progress overview',
    title: 'Explore the Georgian alphabet through letters, sounds, and pattern groups',
  },
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
        showAction
        actionKind="button"
        actionIcon="search"
      />
      <AppBarStory
        eyeBrow="Browse"
        title="Vocabulary and review sets with intentionally long copy"
        showLeading={false}
        leadingKind="button"
        leadingIcon="back"
        showAction
        actionKind="link"
        actionIcon="settings"
      />
      <AppBarStory
        eyeBrow="kartuli.app"
        title="Settings"
        showLeading
        leadingKind="button"
        leadingIcon="back"
        showAction={false}
        actionKind="button"
        actionIcon="search"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
