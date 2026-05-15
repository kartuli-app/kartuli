import { ContentContainer } from '@game-client/ui/components/layout/content-container';
import { cn } from '@kartuli/ui/utils/cn';

type AppBarProps = {
  leading?: React.ReactNode;
  context?: React.ReactNode;
  title: React.ReactNode;
  action?: React.ReactNode;
};

export function AppBar({ leading, context, title, action }: Readonly<AppBarProps>) {
  return (
    <header
      className={cn(
        //
        'flex',
        'h-appbar-height',
        'items-center',
        'bg-appbar-bg',
        'border-b-(length:--c-appbar-border-width)',
        'border-appbar-border',
      )}
    >
      <ContentContainer>
        <div
          className={cn(
            //
            'flex',
            'items-center',
            'justify-start',
            'gap-4',
          )}
        >
          {leading ? (
            <div
              className={cn(
                //
                'flex',
                'shrink-0',
                'size-11',
                'items-center',
                'justify-center',
              )}
            >
              {leading}
            </div>
          ) : null}
          <div
            className={cn(
              //
              'flex',
              'flex-col',
              'items-start',
              'justify-center',
              'uppercase',
            )}
          >
            {context ? (
              <div
                className={cn(
                  //
                  'text-kartuli-color-primitive-neutral-500',
                  'text-sm',
                  'font-bold',
                )}
              >
                {context}
              </div>
            ) : null}

            <h1
              className={cn(
                //
                'text-kartuli-color-primitive-neutral-900',
                'text-xl',
                'font-black',
              )}
            >
              {title}
            </h1>
          </div>
          {action ? (
            <div
              className={cn(
                //
                'ml-auto',
                'flex',
                'size-11',
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
