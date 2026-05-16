import { cn } from '@kartuli/ui/utils/cn';

const surfaceClasses = cn('w-full', 'p-10');

type SurfaceProps = {
  children: React.ReactNode;
  context: 'shell' | 'panel' | 'detail';
};

export function Surface({ children, context }: Readonly<SurfaceProps>) {
  return (
    <div
      className={
        //
        cn(
          surfaceClasses,
          context === 'shell' && 'bg-s-color-shell-bg',
          context === 'panel' && 'bg-s-color-panel-bg',
          context === 'detail' && 'bg-s-color-detail-bg',
        )
      }
    >
      {children}
    </div>
  );
}
