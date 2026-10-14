import { cn } from '@kartuli/ui/utils/cn';

const surfaceClasses = cn('w-full', 'p-10');

interface SurfaceProps {
  children: React.ReactNode;
  context: 'shell' | 'panel';
}

export function Surface({ children, context }: Readonly<SurfaceProps>) {
  return (
    <div
      className={
        //
        cn(
          surfaceClasses,
          context === 'shell' && 'bg-s-color-shell-bg',
          context === 'panel' && 'bg-s-color-panel-bg',
        )
      }
    >
      {children}
    </div>
  );
}
