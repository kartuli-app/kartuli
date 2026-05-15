import { MainContent } from '@game-client/ui/components/layout/main-content';
import { cn } from '@kartuli/ui/utils/cn';
import { ShellRail } from './shell-rail';

type AppShellProps = {
  appBar: React.ReactNode;
  startRailContent?: React.ReactNode;
  endRailContent?: React.ReactNode;
  children: React.ReactNode;
};
export function AppShell({
  appBar,
  startRailContent,
  endRailContent,
  children,
}: Readonly<AppShellProps>) {
  return (
    <div
      className={cn(
        //
        'flex-1',
        'flex flex-col',
        'relative',
        'bg-surface-shell',
      )}
    >
      {/* app bar wrapper */}
      <div
        className={cn(
          //
          'fixed',
          'top-0',
          // if there is no start rail content, there is no margin left
          // if there is a start rail content, the margin left is the width of the start rail
          // compact on tablet, expanded on desktop
          'left-0',
          startRailContent && 'left-0 md:left-rail-width-compact xl:left-rail-width-expanded',
          'right-0',
          // if there is no end rail content, there is no margin right
          // if there is a end rail content, the margin right is the width of the end rail
          // expanded on wide desktop
          endRailContent && 'right-0 2xl:mr-rail-width-expanded',
          'z-20',
        )}
      >
        {appBar}
      </div>

      {/* main content wrapper */}
      <div
        className={cn(
          //
          // the margin top is the height of the app bar
          'mt-appbar-height',
          // if there is no start rail content, there is no margin left
          // if there is a start rail content, the margin left is the width of the start rail
          // compact on tablet, expanded on desktop
          startRailContent && 'ml-0 md:ml-rail-width-compact xl:ml-rail-width-expanded',
          // if there is no start rail content, there is no padding bottom
          // if there is a start rail content, the padding bottom is the height of the dock
          // on mobile the padding bottom is the height of the dock
          // on desktop the padding bottom is 0
          startRailContent && 'pb-dock-height-mobile md:pb-0',
          // if there is no end rail content, there is no margin right
          // if there is a end rail content, the margin right is the width of the end rail
          // expanded on wide desktop
          endRailContent && 'mr-0 2xl:mr-rail-width-expanded',
          'flex',
          'grow',
          //
        )}
      >
        <MainContent>{children}</MainContent>
      </div>

      {/* start rail, will not be rendered if there is no start rail content */}
      <ShellRail placement="start">{startRailContent}</ShellRail>
      {/* end rail, will not be rendered if there is no end rail content */}
      <ShellRail placement="end">{endRailContent}</ShellRail>
    </div>
  );
}
