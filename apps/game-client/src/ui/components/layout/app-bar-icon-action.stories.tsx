import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType, SVGProps } from 'react';
import { IoArrowBackOutline, IoSettingsOutline } from 'react-icons/io5';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { Surface } from '../surface/surface';
import { AppBarIconButton, GameAppBarIconLink } from './app-bar-icon-action';

const appBarActionIcons = {
  back: IoArrowBackOutline,
  search: PiMagnifyingGlass,
  settings: IoSettingsOutline,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

const appBarActionIconOptions = Object.keys(appBarActionIcons) as Array<
  keyof typeof appBarActionIcons
>;

const appBarActionIconLabels: Record<keyof typeof appBarActionIcons, string> = {
  back: 'Back',
  search: 'Search',
  settings: 'Settings',
};

type AppBarActionKind = 'button' | 'link';

type AppBarIconActionStoryProps = {
  kind: AppBarActionKind;
  label: string;
  icon: keyof typeof appBarActionIcons;
  href: string;
};

function AppBarIconActionStory({ kind, label, icon, href }: Readonly<AppBarIconActionStoryProps>) {
  const Icon = appBarActionIcons[icon];

  if (kind === 'link') {
    return <GameAppBarIconLink href={href} label={label} icon={Icon} />;
  }

  return <AppBarIconButton label={label} icon={Icon} onClick={() => {}} />;
}

const meta: Meta<typeof AppBarIconActionStory> = {
  title: 'UI/AppBarIconAction',
  component: AppBarIconActionStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Circular ghost action used in the app bar for both button and link interactions.',
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
    kind: {
      control: 'inline-radio',
      options: ['button', 'link'],
      description: 'Whether the action renders as a button or a link',
    },
    label: {
      control: 'text',
      description: 'Accessible label announced to assistive technology',
    },
    icon: {
      control: {
        type: 'select',
        labels: appBarActionIconLabels,
      },
      options: appBarActionIconOptions,
      description: 'The icon rendered inside the action',
    },
    href: {
      control: 'text',
      description: 'The link destination when `kind` is `link`',
    },
  },
  args: {
    kind: 'button',
    label: 'Search',
    icon: 'search',
    href: '/search',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Story scenarios:
// - default
// - hover
// - focus visible
// - pressed

export const ButtonDefault: Story = {};

export const ButtonHover: Story = {
  parameters: {
    pseudo: { hover: true },
  },
};

export const ButtonFocusVisible: Story = {
  parameters: {
    pseudo: { focusVisible: true },
  },
};

export const ButtonPressed: Story = {
  parameters: {
    pseudo: { active: true },
  },
};

export const LinkDefault: Story = {
  args: {
    kind: 'link',
  },
};

export const LinkHover: Story = {
  args: {
    kind: 'link',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const LinkFocusVisible: Story = {
  args: {
    kind: 'link',
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

export const LinkPressed: Story = {
  args: {
    kind: 'link',
  },
  parameters: {
    pseudo: { active: true },
  },
};
