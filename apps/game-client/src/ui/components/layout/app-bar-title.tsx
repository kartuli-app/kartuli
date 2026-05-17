import { cn } from '@kartuli/ui/utils/cn';

export function AppBarTitle({
  title,
  eyeBrow,
}: Readonly<{ title: React.ReactNode; eyeBrow: React.ReactNode }>) {
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
    </div>
  );
}
