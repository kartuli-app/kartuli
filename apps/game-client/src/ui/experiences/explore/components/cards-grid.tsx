import { cn } from '@kartuli/ui/utils/cn';

export function CardsGrid({
  children,
  size,
}: Readonly<{ children: React.ReactNode; size: 'grid-item' | 'full' }>) {
  return (
    <div
      className={cn(
        'grid gap-8',
        'mx-auto',
        'w-full',
        'max-w-[400px] min-[600px]:max-w-full md:max-w-full',
        size === 'grid-item' && 'grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3',
        size === 'full' && 'grid-cols-1',
      )}
    >
      {children}
    </div>
  );
}
