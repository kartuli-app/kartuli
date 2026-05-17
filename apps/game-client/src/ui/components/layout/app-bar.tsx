import { ContentContainer } from '@game-client/ui/components/layout/content-container';
import { cn } from '@kartuli/ui/utils/cn';
import { AppBarTitle } from './app-bar-title';

type AppBarProps = {
  leading?: React.ReactNode;
  eyeBrow: React.ReactNode;
  title: React.ReactNode;
  action?: React.ReactNode;
};

export function AppBar({ leading, eyeBrow, title, action }: Readonly<AppBarProps>) {
  return (
    <header
      className={cn(
        //
        'flex',
        'h-height-appbar',
        'items-center',
        'bg-s-color-shell-bg',
        'border-b-(length:--s-width-shell-border)',
        'border-s-color-shell-border',
      )}
    >
      <ContentContainer>
        <div
          className={cn(
            //
            'flex',
            'min-w-0',
            'w-full',
            'items-center',
            'justify-start',
            'gap-p-spacing-4',
          )}
        >
          {leading ? (
            <div
              className={cn(
                //
                'flex',
                'shrink-0',
                'items-center',
                'justify-center',
              )}
            >
              {leading}
            </div>
          ) : null}

          <AppBarTitle title={title} eyeBrow={eyeBrow} />

          {action ? (
            <div
              className={cn(
                //
                'flex',
                'shrink-0',
                'items-center',
                'justify-center',
              )}
            >
              {action}
            </div>
          ) : null}
        </div>
      </ContentContainer>
    </header>
  );
}
