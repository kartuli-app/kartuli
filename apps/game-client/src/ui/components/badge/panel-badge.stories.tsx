import { PanelBadge } from '@game-client/ui/components/badge/panel-badge';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { Surface } from '@game-client/ui/components/surface/surface';
import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof PanelBadge> = {
  title: 'UI/Badge/PanelBadge',
  component: PanelBadge,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-md">
        <Surface context="shell">
          <Panel>
            <PanelSection className={cn('flex flex-wrap gap-p-spacing-2')}>
              <Story />
            </PanelSection>
          </Panel>
        </Surface>
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'positive', 'danger', 'accent'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    shape: {
      control: 'inline-radio',
      options: ['pill', 'rounded'],
    },
  },
  args: {
    children: 'New',
    variant: 'neutral',
    size: 'sm',
    shape: 'pill',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PositiveRounded: Story = {
  args: {
    variant: 'positive',
    shape: 'rounded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-p-spacing-2">
      <PanelBadge variant="neutral">like in</PanelBadge>
      <PanelBadge variant="positive" shape="rounded">
        New
      </PanelBadge>
      <PanelBadge variant="danger">Favorite</PanelBadge>
      <PanelBadge variant="accent">Featured</PanelBadge>
    </div>
  ),
};
