import { ContentContainer } from '@game-client/ui/components/layout/content-container';
import { cn } from '@kartuli/ui/utils/cn';
import { AppBarTitle } from './app-bar-title';

type AppBarProps = {
  leading?: React.ReactNode;
  eyeBrow: string;
  title: string;
  trailingPrimary?: React.ReactNode;
  trailingSecondary?: React.ReactNode;
};

const actionSlotClassName = cn('flex', 'shrink-0', 'items-center', 'justify-center', 'size-12');

export function AppBar({
  leading,
  eyeBrow,
  title,
  trailingPrimary,
  trailingSecondary,
}: Readonly<AppBarProps>) {
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
          {leading ? <div className={actionSlotClassName}>{leading}</div> : null}

          <AppBarTitle title={title} eyeBrow={eyeBrow} />

          <div
            className={cn(
              //
              'flex',
              'shrink-0',
              'flex-nowrap',
              'items-center',
              'gap-p-spacing-2',
            )}
          >
            <div className={actionSlotClassName}>{trailingSecondary}</div>
            <div className={actionSlotClassName}>{trailingPrimary}</div>
          </div>
        </div>
      </ContentContainer>
    </header>
  );
}
