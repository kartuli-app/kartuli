import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { PiStudent } from 'react-icons/pi';
import { Surface } from '../../../../components/surface/surface';
import { ContentCard } from './content-card';

type ContentCardHeaderStoryProps = Omit<ComponentProps<typeof ContentCard>, 'children' | 'icon'> & {
  showIcon: boolean;
};

function ContentCardHeaderStory({
  showIcon,
  context,
  title,
  variant,
}: Readonly<ContentCardHeaderStoryProps>) {
  return (
    <ContentCard
      context={context}
      title={title}
      variant={variant}
      icon={showIcon ? PiStudent : undefined}
    >
      <div />
    </ContentCard>
  );
}

const meta: Meta<typeof ContentCardHeaderStory> = {
  title: 'Experiences/Explore/ContentCardHeader',
  component: ContentCardHeaderStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Header treatment used by Explore content cards. Stories render through the real card composition and sit on the shell surface used by the Explore screen.',
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
      description: 'Primary title shown in the card header',
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'inverted'],
      description: 'Visual treatment used for the header background and text colors',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to render the review icon beside the text content',
    },
  },
  args: {
    context: 'Alphabet',
    title: 'Full Review',
    variant: 'default',
    showIcon: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultWithoutIcon: Story = {};

export const DefaultWithIcon: Story = {
  args: {
    showIcon: true,
  },
};

export const InvertedWithoutIcon: Story = {
  args: {
    variant: 'inverted',
  },
  parameters: {
    a11y: { test: 'todo' },
  },
};

export const InvertedWithIcon: Story = {
  args: {
    variant: 'inverted',
    showIcon: true,
  },
  parameters: {
    a11y: { test: 'todo' },
  },
};
