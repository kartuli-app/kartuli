import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { PiStudent } from 'react-icons/pi';
import { Surface } from '../surface/surface';
import { Panel } from './panel';
import { PanelHeader } from './panel-header';
import { PanelSection } from './panel-section';

type PanelHeaderLeadingMode = 'none' | 'icon';
type PanelHeaderTrailingMode = 'none' | 'badge' | 'two-actions';

type PanelStoryProps = {
  context: string;
  title: string;
  variant: 'default' | 'inverted';
  leadingMode: PanelHeaderLeadingMode;
  trailingMode: PanelHeaderTrailingMode;
  interactive: boolean;
};

function PanelActionButton({
  children,
  label,
  variant,
}: Readonly<{ children: ReactNode; label: string; variant: PanelStoryProps['variant'] }>) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-p-radius-full',
        'border',
        'p-2',
        variant === 'default' && 'border-s-color-panel-header-border',
        variant === 'default' && 'bg-s-color-panel-bg',
        variant === 'default' && 'text-s-color-panel-header-content-secondary',
        variant === 'default' && 'hover:bg-p-color-neutral-200',
        variant === 'inverted' && 'border-p-color-neutral-50',
        variant === 'inverted' && 'bg-p-color-neutral-50',
        variant === 'inverted' && 'text-p-color-brand-500',
        variant === 'inverted' && 'hover:bg-p-color-neutral-200',
      )}
    >
      {children}
    </button>
  );
}

function PanelBadge({
  children,
  variant,
}: Readonly<{ children: ReactNode; variant: PanelStoryProps['variant'] }>) {
  return (
    <span
      className={cn(
        'inline-flex',
        'items-center',
        'rounded-p-radius-full',
        'px-3',
        'py-1',
        'text-sm',
        'font-bold',
        'uppercase',
        variant === 'default' && 'bg-p-color-neutral-200',
        variant === 'default' && 'text-p-color-neutral-900',
        variant === 'inverted' && 'bg-p-color-neutral-50',
        variant === 'inverted' && 'text-p-color-brand-500',
      )}
    >
      {children}
    </span>
  );
}

function renderLeading(mode: PanelHeaderLeadingMode) {
  if (mode === 'none') {
    return undefined;
  }

  return <PiStudent className="size-11" aria-hidden="true" />;
}

function renderTrailing(mode: PanelHeaderTrailingMode, variant: PanelStoryProps['variant']) {
  if (mode === 'none') {
    return undefined;
  }

  if (mode === 'badge') {
    return <PanelBadge variant={variant}>Beta</PanelBadge>;
  }

  return (
    <>
      <PanelBadge variant={variant}>New</PanelBadge>
      <PanelActionButton label="Settings" variant={variant}>
        <IoSettingsOutline className="size-5" aria-hidden="true" />
      </PanelActionButton>
    </>
  );
}

function PanelStory({
  context,
  title,
  variant,
  leadingMode,
  trailingMode,
  interactive,
}: Readonly<PanelStoryProps>) {
  const panel = (
    <Panel className={interactive ? 'hover:border-s-color-panel-border-hover' : undefined}>
      <PanelHeader
        context={context}
        title={title}
        variant={variant}
        leading={renderLeading(leadingMode)}
        trailing={renderTrailing(trailingMode, variant)}
      />
      <PanelSection className={cn('flex', 'flex-col', 'gap-4')}>
        <div className={cn('h-4', 'w-2/3', 'rounded-p-radius-1', 'bg-p-color-neutral-200')} />
        <div className={cn('grid', 'grid-cols-3', 'gap-2')}>
          <div className={cn('h-10', 'rounded-p-radius-1', 'bg-p-color-neutral-100')} />
          <div className={cn('h-10', 'rounded-p-radius-1', 'bg-p-color-neutral-100')} />
          <div className={cn('h-10', 'rounded-p-radius-1', 'bg-p-color-neutral-100')} />
        </div>
      </PanelSection>
    </Panel>
  );

  if (!interactive) {
    return panel;
  }

  return (
    <Link href="/" className="flex cursor-pointer active:scale-95">
      {panel}
    </Link>
  );
}

const meta: Meta<typeof PanelStory> = {
  title: 'UI/Panel',
  component: PanelStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shared panel primitives for reusable utility and Explore surfaces. Interactivity belongs to the caller, not the base panel shell.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Surface context="shell">
          <Story />
        </Surface>
      </div>
    ),
  ],
  argTypes: {
    context: {
      control: 'text',
      description: 'Uppercase contextual label shown above the title',
    },
    title: {
      control: 'text',
      description: 'Primary title shown in the panel header',
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'inverted'],
      description: 'Visual treatment used for the header background and text colors',
    },
    leadingMode: {
      control: 'inline-radio',
      options: ['none', 'icon'],
      description: 'Leading content rendered in the header',
    },
    trailingMode: {
      control: 'inline-radio',
      options: ['none', 'badge', 'two-actions'],
      description: 'Trailing content rendered in the header',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the example uses Explore-style interactive composition',
    },
  },
  args: {
    context: 'Alphabet',
    title: 'Full Review',
    variant: 'default',
    leadingMode: 'none',
    trailingMode: 'none',
    interactive: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultHeader: Story = {};

export const InvertedHeader: Story = {
  args: {
    variant: 'inverted',
  },
  parameters: {
    a11y: { test: 'todo' },
  },
};

export const LeadingOnly: Story = {
  args: {
    leadingMode: 'icon',
  },
};

export const TrailingOnly: Story = {
  args: {
    trailingMode: 'badge',
  },
};

export const LeadingWithTwoTrailingItems: Story = {
  args: {
    leadingMode: 'icon',
    trailingMode: 'two-actions',
  },
};

export const NonInteractiveComposedPanel: Story = {
  args: {
    context: 'Settings',
    title: 'Language',
    trailingMode: 'badge',
  },
};

export const ExploreInteractiveComposedPanel: Story = {
  args: {
    context: 'Alphabet',
    title: 'Lesson 1',
    interactive: true,
  },
};
