'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { StudyScreenLayout } from '@game-client/ui/experiences/study/components/study-screen-layout';
import { createStudyNavigationState } from '@game-client/ui/experiences/study/components/study-screen-navigation';
import { useStudyScreen } from '@game-client/ui/experiences/study/components/use-study-screen';
import { Suspense } from 'react';

function StudyScreenResolved({ items }: Readonly<{ items: ReadonlyArray<LetterItem> }>) {
  const nav = useStudyScreen(items);
  return <StudyScreenLayout nav={nav} />;
}

function StudyScreenFallback({ items }: Readonly<{ items: ReadonlyArray<LetterItem> }>) {
  const navigationState = createStudyNavigationState(items, 'summary');
  const noop = () => {};

  return (
    <StudyScreenLayout
      nav={{
        ...navigationState,
        navigateToSlide: noop,
        handlePrevious: noop,
        handleNext: noop,
        handleGoToSummary: noop,
        handleSelectItem: noop,
      }}
    />
  );
}

export function StudyScreen({ items }: Readonly<{ items: ReadonlyArray<LetterItem> }>) {
  return (
    <Suspense fallback={<StudyScreenFallback items={items} />}>
      <StudyScreenResolved items={items} />
    </Suspense>
  );
}
