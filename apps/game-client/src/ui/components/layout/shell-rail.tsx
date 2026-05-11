import { cn } from '@kartuli/ui/utils/cn';

type ShellRailProps = {
  placement: 'start' | 'end';
  children?: React.ReactNode;
};

export function ShellRail({ placement, children }: Readonly<ShellRailProps>) {
  if (!children) {
    return null;
  }
  return (
    <div
      className={cn(
        'flex',
        'bg-kartuli-color-semantic-surface',
        'border-kartuli-color-semantic-surface-border',
        //
        placement === 'start' && [
          //
          'fixed',
          'left-0',
          'bottom-0',
          'right-0',
          'h-(--rail-dock-height) md:h-full',
          'w-full md:w-(--rail-collapsed-width) lg:w-(--rail-expanded-width)',
          'justify-center md:justify-start',
          'z-20',
          'border-t-2 md:border-t-0',
          'border-r-0 md:border-r-2',
        ],
        placement === 'end' && [
          //
          'hidden 2xl:flex 2xl:fixed overflow-hidden',
          'right-0 top-0 bottom-0',
          'h-full',
          'w-(--rail-expanded-width)',
          'border-l-0 2xl:border-l-2',
        ],
      )}
    >
      {children}
    </div>
  );
}
