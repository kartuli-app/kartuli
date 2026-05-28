'use client';

import { StudyCtaButton } from '@game-client/ui/experiences/study/components/study-cta-button';
import {
  MobileInfoBar,
  NavigationBar,
} from '@game-client/ui/experiences/study/components/study-navigation';
import type { StudyNavigationModel } from '@game-client/ui/experiences/study/components/study-screen.types';
import { StudySlidesCarousel } from '@game-client/ui/experiences/study/components/study-slides-carousel';
import { PiPlayFill } from 'react-icons/pi';

export function StudyScreenLayout({ nav }: Readonly<{ nav: StudyNavigationModel }>) {
  return (
    <div className="flex flex-1 min-h-0 min-w-0 flex-col gap-4 h-full max-w-[600px] w-full mx-auto">
      <NavigationBar {...nav} />
      <StudySlidesCarousel nav={nav} />
      <MobileInfoBar {...nav} />
      <div className="flex w-full">
        <StudyCtaButton label="Play now" icon={PiPlayFill} />
      </div>
    </div>
  );
}
