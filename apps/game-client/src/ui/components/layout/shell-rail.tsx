import { cn } from '@kartuli/ui/utils/cn';

type ShellRailProps = {
  placement: 'start' | 'end';
  children?: React.ReactNode;
};

export function ShellRail({ placement, children }: Readonly<ShellRailProps>) {
  // if there is no children, the rail is not rendered at all
  if (!children) {
    return null;
  }
  return (
    <div
      className={cn(
        'flex',
        'bg-rail-bg',
        'border-rail-border',
        //
        placement === 'start' && [
          //
          'fixed',
          'left-0',
          'bottom-0',
          'right-0',
          'z-20',
          // on mobile the start rail is in the botton and has the height of the dock
          // on desktop the start rail is in the side and has the height of the full screen
          'h-dock-height-mobile md:h-full',
          // on mobile the start rail is full width
          // on tablet the start rail is compact on the left
          // on desktop the start rail is expanded on the left
          'w-full md:w-rail-width-compact xl:w-rail-width-expanded',
          // on mobile the start rail content is centered
          // on tablet and desktop the start rail content is left aligned
          'justify-center md:justify-start',
          // on mobile the start rail border is on the top to separate it from the content
          // on tablet and desktop the start rail border is on the right to separate it from the content
          'border-t-(length:--c-rail-border-width) md:border-t-0',
          'border-r-0 md:border-r-(length:--c-rail-border-width)',
        ],
        //
        placement === 'end' && [
          //
          'top-0',
          'bottom-0',
          ' overflow-hidden',
          // on mobile the end rail is hidden
          // on wide desktop the end rail is in the side and has the height of the full screen
          'h-full',
          'hidden 2xl:flex 2xl:fixed',
          // when visible the end rail is expanded on the right
          'w-rail-width-expanded',
          'right-0',
          // on wide desktop the end rail border is on the left to separate it from the content
          'border-l-0 2xl:border-l-(length:--c-rail-border-width)',
        ],
      )}
    >
      {children}
    </div>
  );
}
