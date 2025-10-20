import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeploymentDebugPanel> = {
  title: 'Components/DeploymentDebugPanel',
  component: DeploymentDebugPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A debug panel that displays environment information useful for debugging deployments and understanding the current runtime context.',
      },
    },
  },
  argTypes: {
    appName: {
      control: 'text',
      description: 'Application name (required for proper debugging)',
    },
    appVersion: {
      control: 'text',
      description: 'Application version (required for proper debugging)',
    },
    showDetailed: {
      control: 'boolean',
      description: 'Show additional debug information',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    appName: 'Storybook App',
    appVersion: '1.0.0',
    showDetailed: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appName: 'Game Client',
    appVersion: '1.2.3',
  },
};

export const WithDetailedInfo: Story = {
  args: {
    appName: 'Backoffice Client',
    appVersion: '2.1.0',
    showDetailed: true,
  },
};

export const CustomStyling: Story = {
  args: {
    appName: 'Custom App',
    appVersion: '3.0.0-beta',
    className: 'border-2 border-dashed',
  },
};

export const ProductionEnvironment: Story = {
  args: {
    appName: 'Production App',
    appVersion: '1.0.0',
    showDetailed: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of how the debug panel appears in production environment.',
      },
    },
  },
};
