import clsx from 'clsx';
import { GameAppDockItems } from './game-app-dock-items';

export function GameAppDock() {
  return (
    <div
      className={clsx(
        //
        'flex',
        'justify-center',
        'items-center',
        'md:items-start',
        //
        'sticky bottom-0 z-50',
        'md:top-0 md:absolute',
        //
        'w-full',
        'md:w-20',
        //
        // 'min-h-20',
        'h-auto',
        'md:h-full',
        //
        'text-white',
        'bg-brand-dock-bg',
      )}
    >
      <div
        className={clsx(
          //

          'flex',
          'md:flex-col',
          //
          // 'border border-white',
          //
          'py-brand-regular',
          'md:px-brand-regular md:py-brand-regular',
          //
          'gap-brand-regular',
          'md:gap-brand-regular',
          //
          'justify-center',
          'md:justify-start',
          'md:items-center',
        )}
      >
        <GameAppDockItems />
      </div>
    </div>
  );
}
