import { cn } from '@kartuli/ui/utils/cn';
// import { ViewTransition } from 'react';

export function AppBarTitle({ title, eyeBrow }: Readonly<{ title: string; eyeBrow: string }>) {
  return (
    <div
      className={cn(
        //
        'flex',
        'min-w-0',
        'flex-1',
        'flex-col',
        'items-start',
        'justify-center',
        'uppercase',
      )}
    >
      {/* <ViewTransition key={`${eyeBrow}`} name="eyebrow"> */}
      <div
        className={cn(
          //
          'w-full',
          'truncate',
          'text-s-color-shell-content-secondary',
          'text-sm',
          'font-bold',
        )}
      >
        {eyeBrow}
      </div>
      {/* </ViewTransition> */}
      {/* <ViewTransition key={`${title}`} name="title"> */}
      <h1
        className={cn(
          //
          'w-full',
          'text-s-color-shell-content-primary',
          'text-xl',
          'font-black',
          'truncate',
        )}
      >
        {title}
      </h1>
      {/* </ViewTransition> */}
    </div>
  );
}
