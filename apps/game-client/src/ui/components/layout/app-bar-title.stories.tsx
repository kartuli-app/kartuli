import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { Surface } from '../surface/surface';
import { AppBarTitle } from './app-bar-title';

type AppBarTitleStoryProps = ComponentProps<typeof AppBarTitle>;

function AppBarTitleStory({ title, eyeBrow }: Readonly<AppBarTitleStoryProps>) {
  return <AppBarTitle title={title} eyeBrow={eyeBrow} />;
}

const meta: Meta<typeof AppBarTitleStory> = {
  title: 'UI/AppBarTitle',
  component: AppBarTitleStory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Title component used in the app bar.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[200px]">
        <Surface context="shell">
          <Story />
        </Surface>
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: {
        type: 'text',
        description: 'The title of the app bar',
      },
    },
    eyeBrow: {
      control: {
        type: 'text',
        description: 'The eye brow of the app bar',
      },
    },
  },
  args: {
    title: 'Alphabet',
    eyeBrow: 'kartuli.app',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Story scenarios:
// - default
// - long eye brow
// - long title
// - long eye brow and long title

export const Default: Story = {
  args: {
    eyeBrow: 'kartuli.app',
    title: 'Alphabet',
  },
};

export const LongEyeBrow: Story = {
  args: {
    eyeBrow: 'Long Eye Brow (really long)',
    title: 'Alphabet',
  },
};

export const LongTitle: Story = {
  args: {
    eyeBrow: 'kartuli.app',
    title: 'Long Title (really long)',
  },
};

export const LongEyeBrowAndLongTitle: Story = {
  args: {
    eyeBrow: 'Long Eye Brow (really long)',
    title: 'Long Title (really long)',
  },
};
