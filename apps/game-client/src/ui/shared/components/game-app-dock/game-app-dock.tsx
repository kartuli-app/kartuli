'use client';

import { cn } from '@kartuli/ui/utils/cn';
import { useTranslation } from 'react-i18next';
import { GameAppDockMainLinks } from './game-app-dock-main-links';

export function GameAppDock() {
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(
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
        'bg-ds1-color-dock-bg',
      )}
    >
      <div
        className={cn(
          //

          'flex',
          'md:flex-col',
          //
          // 'border border-white',
          //
          'py-ds1-spacing-regular',
          'md:px-ds1-spacing-regular md:py-ds1-spacing-regular',
          //
          'gap-ds1-spacing-regular',
          'md:gap-ds1-spacing-regular',
          //
          'justify-center',
          'md:justify-start',
          'md:items-center',
        )}
      >
        <nav
          aria-label={t('accessibility.landmarks.sections')}
          className={cn(
            'flex md:flex-col',
            'gap-ds1-spacing-regular md:gap-ds1-spacing-regular',
            'md:items-center',
          )}
        >
          <GameAppDockMainLinks />
        </nav>
      </div>
    </div>
  );
}
