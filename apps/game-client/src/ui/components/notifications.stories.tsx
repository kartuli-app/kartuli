import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notifications, showNotification } from './notifications';
import { Surface } from './surface/surface';

type NotificationPreviewProps = {
  description: string;
  surfaceContext: 'shell' | 'panel';
  timeout: number;
};

function NotificationPreview({
  description,
  surfaceContext,
  timeout,
}: Readonly<NotificationPreviewProps>) {
  return (
    <Notifications>
      <Surface context={surfaceContext}>
        <div className={cn('flex', 'min-h-48', 'items-center', 'justify-center')}>
          <button
            type="button"
            onClick={() => {
              showNotification({ description, timeout });
            }}
            className={cn(
              'rounded-p-radius-full',
              'border',
              'border-s-color-panel-header-border',
              'bg-s-color-panel-bg',
              'px-4',
              'py-2',
              'font-bold',
              'text-p-color-neutral-900',
            )}
          >
            Show notification
          </button>
        </div>
      </Surface>
    </Notifications>
  );
}

const meta: Meta<typeof NotificationPreview> = {
  title: 'UI/Notifications',
  component: NotificationPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shared floating notification surface previewed against both shell and panel backgrounds. Click the trigger to inspect placement and contrast.',
      },
    },
  },
  argTypes: {
    description: {
      control: 'text',
      description: 'Notification message shown in the floating surface',
    },
    surfaceContext: {
      control: 'inline-radio',
      options: ['shell', 'panel'],
      description: 'Background surface behind the notification trigger',
    },
    timeout: {
      control: { type: 'number', min: 1000, step: 100 },
      description: 'Auto-dismiss duration in milliseconds',
    },
  },
  args: {
    description: 'Transliteration copied!',
    surfaceContext: 'shell',
    timeout: 3200,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const OnShellSurface: Story = {};

export const OnPanelSurface: Story = {
  args: {
    surfaceContext: 'panel',
  },
};
