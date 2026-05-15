import { cn } from '@kartuli/ui/utils/cn';

export function ContentCardSection({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        //
        'w-full',
        'px-4',
        'py-2',
        'gap-4',
        'flex',
      )}
    >
      {children}
    </div>
  );
}
