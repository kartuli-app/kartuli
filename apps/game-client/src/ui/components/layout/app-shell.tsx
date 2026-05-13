import { MainContainer } from '@game-client/ui/components/layout/main-container';
import { cn } from '@kartuli/ui/utils/cn';
import { ShellRail } from './shell-rail';

type AppShellProps = {
  appBar: React.ReactNode;
  startRail?: React.ReactNode;
  endRail?: React.ReactNode;
  children: React.ReactNode;
};
export function AppShell({ appBar, startRail, endRail, children }: Readonly<AppShellProps>) {
  return (
    <div
      className={cn(
        //
        'flex-1',
        'flex flex-col',
        'relative',
      )}
    >
      <div
        className={cn(
          //
          'fixed',
          'top-0',
          'left-0',
          startRail && 'left-0 md:left-(--rail-collapsed-width) xl:left-(--rail-expanded-width)',
          'right-0',
          endRail && 'right-0 2xl:mr-(--rail-expanded-width)',
          'z-20',
        )}
      >
        {appBar}
      </div>

      <div
        className={cn(
          //
          'mt-(--app-bar-height)',
          startRail && 'ml-0 md:ml-(--rail-collapsed-width) xl:ml-(--rail-expanded-width)',
          startRail && 'pb-(--rail-dock-height) md:pb-0',
          endRail && 'mr-0 2xl:mr-(--rail-expanded-width)',
          'flex',
          'grow',
          //
        )}
      >
        <MainContainer>{children}</MainContainer>
      </div>

      <ShellRail placement="start">{startRail}</ShellRail>
      <ShellRail placement="end">{endRail}</ShellRail>
    </div>
  );
}
