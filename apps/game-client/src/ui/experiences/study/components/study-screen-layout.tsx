'use client';

import { StudyCtaButton } from '@game-client/ui/experiences/study/components/study-cta-button';
import {
  MobileInfoBar,
  NavigationBar,
} from '@game-client/ui/experiences/study/components/study-navigation';
import type { StudyNavigationModel } from '@game-client/ui/experiences/study/components/study-screen.types';
import { StudySlidesCarousel } from '@game-client/ui/experiences/study/components/study-slides-carousel';
import { useTranslation } from 'react-i18next';
import { PiPlayFill } from 'react-icons/pi';

export function StudyScreenLayout({ nav }: Readonly<{ nav: StudyNavigationModel }>) {
  const { t } = useTranslation('study');
  return (
    <div className="mx-auto flex h-full max-w-[600px] min-h-0 w-full min-w-0 flex-1 flex-col gap-p-spacing-2">
      <NavigationBar {...nav} />
      <StudySlidesCarousel nav={nav} />
      <MobileInfoBar {...nav} />
      <div className="flex w-full px-p-spacing-1">
        <StudyCtaButton label={t('play_now')} icon={PiPlayFill} />
      </div>
    </div>
  );
}
