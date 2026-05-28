import {
  ShellActionButton,
  ShellActionLink,
  type ShellActionSize,
  type ShellActionVariant,
} from '@game-client/ui/components/actions/shell-action';
import { Surface } from '@game-client/ui/components/surface/surface';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PiMagnifyingGlass, PiPlayFill } from 'react-icons/pi';

type ShellActionKind = 'button' | 'link';

type ShellActionStoryProps = {
  kind: ShellActionKind;
  label: string;
  size: ShellActionSize;
  variant: ShellActionVariant;
};

function renderActionContent(size: ShellActionSize, label: string) {
  if (size === 'icon') {
    return <PiMagnifyingGlass className="size-6 text-inherit" aria-hidden="true" />;
  }

  if (size === 'cta') {
    return (
      <>
        <PiPlayFill className="size-7 text-inherit" aria-hidden="true" />
        <span className="text-2xl uppercase text-inherit">{label}</span>
      </>
    );
  }

  return <span className="text-sm uppercase text-inherit">{label}</span>;
}

function ShellActionStory({ kind, label, size, variant }: Readonly<ShellActionStoryProps>) {
  const content = renderActionContent(size, label);

  if (kind === 'link') {
    return (
      <ShellActionLink
        href="/search"
        aria-label={label}
        size={size}
        variant={variant}
        className={size === 'pill' ? 'min-w-28' : undefined}
      >
        {content}
      </ShellActionLink>
    );
  }

  return (
    <ShellActionButton
      aria-label={label}
      size={size}
      variant={variant}
      className={size === 'pill' ? 'min-w-28' : undefined}
    >
      {content}
    </ShellActionButton>
  );
}

const meta: Meta<typeof ShellActionStory> = {
  title: 'UI/Actions/ShellAction',
  component: ShellActionStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shared shell-surface action primitive used by app-bar actions, study navigation buttons, and primary shell CTA buttons.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[28rem]">
        <Surface context="shell">
          <div className="flex items-center justify-center">
            <Story />
          </div>
        </Surface>
      </div>
    ),
  ],
  argTypes: {
    kind: {
      control: 'inline-radio',
      options: ['button', 'link'],
    },
    size: {
      control: 'inline-radio',
      options: ['icon', 'pill', 'cta'],
    },
    variant: {
      control: 'inline-radio',
      options: ['ghost', 'selected', 'secondary', 'primary'],
    },
  },
  args: {
    kind: 'button',
    label: 'Search',
    size: 'pill',
    variant: 'ghost',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const GhostPill: Story = {};

export const SelectedPill: Story = {
  args: {
    variant: 'selected',
  },
};

export const SecondaryPill: Story = {
  args: {
    variant: 'secondary',
    label: 'Next',
  },
};

export const PrimaryCta: Story = {
  args: {
    label: 'Play now',
    size: 'cta',
    variant: 'primary',
  },
};

export const GhostIconLink: Story = {
  args: {
    kind: 'link',
    size: 'icon',
    variant: 'ghost',
    label: 'Search',
  },
};
