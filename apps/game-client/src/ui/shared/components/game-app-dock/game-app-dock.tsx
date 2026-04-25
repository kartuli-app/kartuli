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
        'bg-brand-dock-bg',
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
        <nav
          aria-label={t('accessibility.landmarks.sections')}
          className={cn(
            'flex md:flex-col',
            'gap-brand-regular md:gap-brand-regular',
            'md:items-center',
          )}
        >
          <GameAppDockMainLinks />
        </nav>
      </div>
    </div>
  );
}
