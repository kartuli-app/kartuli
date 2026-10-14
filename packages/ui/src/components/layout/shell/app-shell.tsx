import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { ContentContainer } from './content-container';
import { ShellRail } from './shell-rail';

export interface AppShellProps {
  appBar: ReactNode;
  startRailContent?: ReactNode;
  endRailContent?: ReactNode;
  children: ReactNode;
}

function MainContent({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="bg-s-color-shell-bg flex-1">
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
}

export function AppShell({
  appBar,
  startRailContent,
  endRailContent,
  children,
}: Readonly<AppShellProps>) {
  return (
    <div className={cn('flex-1', 'flex flex-col', 'relative')}>
      <div
        className={cn(
          'fixed',
          'top-0',
          'left-0',
          startRailContent && 'left-0 md:left-width-rail-compact xl:left-width-rail-expanded',
          'right-0',
          endRailContent && 'right-0 2xl:mr-width-rail-expanded',
          'z-20',
        )}
      >
        {appBar}
      </div>

      <div
        className={cn(
          'mt-height-appbar',
          startRailContent && 'ml-0 md:ml-width-rail-compact xl:ml-width-rail-expanded',
          startRailContent && 'pb-height-dock-mobile md:pb-0',
          endRailContent && 'mr-0 2xl:mr-width-rail-expanded',
          'flex',
          'grow',
        )}
      >
        <MainContent>{children}</MainContent>
      </div>

      <ShellRail placement="start">{startRailContent}</ShellRail>
      <ShellRail placement="end">{endRailContent}</ShellRail>
    </div>
  );
}
