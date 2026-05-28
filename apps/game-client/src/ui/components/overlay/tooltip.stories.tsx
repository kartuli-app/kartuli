import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { Tooltip } from '@game-client/ui/components/overlay/tooltip';
import { Surface } from '@game-client/ui/components/surface/surface';
import { cn } from '@kartuli/ui/utils/cn';
import type { Meta, StoryObj } from '@storybook/react-vite';

type TooltipPreviewProps = {
  content: string;
  side: 'top' | 'bottom' | 'left' | 'right';
  surfaceContext: 'shell' | 'panel';
};

function TooltipPreview({ content, side, surfaceContext }: Readonly<TooltipPreviewProps>) {
  return (
    <BaseTooltip.Provider delay={0} closeDelay={0}>
      <Surface context={surfaceContext}>
        <div className={cn('flex', 'min-h-48', 'items-center', 'justify-center')}>
          <Tooltip content={content} side={side}>
            <button
              type="button"
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
              Hover or focus me
            </button>
          </Tooltip>
        </div>
      </Surface>
    </BaseTooltip.Provider>
  );
}

const meta: Meta<typeof TooltipPreview> = {
  title: 'UI/Overlay/Tooltip',
  component: TooltipPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shared floating tooltip surface previewed against both shell and panel backgrounds for contrast checks.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Text shown inside the tooltip popup',
    },
    side: {
      control: 'inline-radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred tooltip side',
    },
    surfaceContext: {
      control: 'inline-radio',
      options: ['shell', 'panel'],
      description: 'Background surface behind the tooltip trigger',
    },
  },
  args: {
    content: 'Copy transliteration',
    side: 'top',
    surfaceContext: 'shell',
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
