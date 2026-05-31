'use client';

import type { StudyNavigationState } from '@game-client/ui/experiences/study/components/study-screen.types';
import { cn } from '@kartuli/ui/utils/cn';
import { useTranslation } from 'react-i18next';

export interface StudyStatusPillProps
  extends Pick<StudyNavigationState, 'currentItem' | 'totalItems'> {
  className?: string;
}

export function StudyStatusPill({
  className,
  currentItem,
  totalItems,
}: Readonly<StudyStatusPillProps>) {
  const { t } = useTranslation('study');
  return (
    <div
      className={cn(
        'flex',
        'h-11',
        'w-24',
        'shrink-0',
        'min-w-0',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-s-color-shell-status-bg',
        'px-3',
        'font-bold',
        'uppercase',
        'text-s-color-shell-status-content-primary',
        className,
      )}
    >
      {currentItem === 'summary' ? (
        <div className="flex items-center justify-center gap-1 text-xs">
          <span className="font-bold">{totalItems}</span> {t('status.letters')}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-1 text-base">
          <div className="w-6 text-right font-bold text-s-color-shell-status-content-primary">
            {currentItem + 1}
          </div>
          <div className="w-3 text-center text-s-color-shell-status-content-secondary">/</div>
          <div className="w-6 text-s-color-shell-status-content-secondary">{totalItems}</div>
        </div>
      )}
    </div>
  );
}
