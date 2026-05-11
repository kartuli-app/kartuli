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
        'h-(--app-bar-height)',
        'items-center',
        'bg-kartuli-color-semantic-surface',
        'border-b-2',
        'border-kartuli-color-semantic-surface-border',
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
