'use client';

import { StudyNavigationButton } from '@game-client/ui/experiences/study/components/study-navigation-button';
import type { StudyNavigationModel } from '@game-client/ui/experiences/study/components/study-screen.types';
import { StudyStatusPill } from '@game-client/ui/experiences/study/components/study-status-pill';
import { useTranslation } from 'react-i18next';
import { PiCaretLeft, PiCaretRight, PiHouseLight } from 'react-icons/pi';

export function NavigationBar(props: Readonly<StudyNavigationModel>) {
  const {
    totalItems,
    currentItem,
    canGoPrevious,
    canGoNext,
    canGoToSummary,
    handlePrevious,
    handleNext,
    handleGoToSummary,
  } = props;
  const { t } = useTranslation('study');

  return (
    <div className="hidden w-full grid-cols-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] items-center gap-3 md:grid px-1">
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          className="w-full min-w-0"
          label={t('nav.previous')}
          icon={PiCaretLeft}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          label={t('nav.summary')}
          icon={PiHouseLight}
          disabled={!canGoToSummary}
          onClick={handleGoToSummary}
          size="icon"
        />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyStatusPill currentItem={currentItem} totalItems={totalItems} className="w-32" />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          className="w-full min-w-0"
          label={t('nav.next')}
          icon={PiCaretRight}
          disabled={!canGoNext}
          onClick={handleNext}
          iconPosition="right"
        />
      </div>
    </div>
  );
}

export function MobileInfoBar(props: Readonly<StudyNavigationModel>) {
  const {
    totalItems,
    currentItem,
    canGoPrevious,
    canGoNext,
    canGoToSummary,
    handlePrevious,
    handleNext,
    handleGoToSummary,
  } = props;
  const { t } = useTranslation('study');

  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] items-center gap-2 md:hidden px-1">
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          className="w-full"
          label={t('nav.previous')}
          visualLabel={t('nav.prev_short')}
          icon={PiCaretLeft}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          label={t('nav.summary')}
          icon={PiHouseLight}
          disabled={!canGoToSummary}
          onClick={handleGoToSummary}
          size="icon"
        />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyStatusPill currentItem={currentItem} totalItems={totalItems} />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          className="w-full"
          label={t('nav.next')}
          visualLabel={t('nav.next')}
          icon={PiCaretRight}
          disabled={!canGoNext}
          onClick={handleNext}
          iconPosition="right"
        />
      </div>
    </div>
  );
}
