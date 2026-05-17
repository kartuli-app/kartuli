import { ContentContainer } from '@game-client/ui/components/layout/content-container';
import { cn } from '@kartuli/ui/utils/cn';
import { AppBarTitle } from './app-bar-title';

type AppBarProps = {
  leading?: React.ReactNode;
  eyeBrow: string;
  title: string;
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
                'size-12',
              )}
            >
              {leading}
            </div>
          ) : null}

          <AppBarTitle title={title} eyeBrow={eyeBrow} />

          <div
            className={cn(
              //
              'flex',
              'shrink-0',
              'items-center',
              'justify-center',
              'size-12',
            )}
          >
            {action}
          </div>
        </div>
      </ContentContainer>
    </header>
  );
}
