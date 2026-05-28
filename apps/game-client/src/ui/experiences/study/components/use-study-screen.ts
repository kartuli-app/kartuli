'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import type { StudyNavigationModel } from '@game-client/ui/experiences/study/components/study-screen.types';
import { createStudyNavigationState } from '@game-client/ui/experiences/study/components/study-screen-navigation';
import {
  getStudyScreenCurrentItem,
  getStudyScreenCurrentItemFromSlideIndex,
  getStudyScreenUrl,
  STUDY_ITEM_SEARCH_PARAM,
} from '@game-client/ui/experiences/study/components/study-screen-url-state';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useStudyScreen(items: ReadonlyArray<LetterItem>): StudyNavigationModel {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentItem = getStudyScreenCurrentItem(items, searchParams.get(STUDY_ITEM_SEARCH_PARAM));
  const navigationState = createStudyNavigationState(items, currentItem);

  const navigateToSlide = (targetSlideIndex: number) => {
    const nextCurrentItem = getStudyScreenCurrentItemFromSlideIndex(items.length, targetSlideIndex);
    if (nextCurrentItem === currentItem) return;

    const nextItemId = nextCurrentItem === 'summary' ? null : (items[nextCurrentItem]?.id ?? null);
    if (nextCurrentItem !== 'summary' && nextItemId === null) return;

    const nextUrl = getStudyScreenUrl(pathname, searchParams.toString(), nextItemId);
    router.push(nextUrl, { scroll: false });
  };

  const handleSelectItem = (itemIndex: number) => {
    if (!items[itemIndex]) return;
    navigateToSlide(itemIndex + 1);
  };

  const handlePrevious = () => {
    if (!navigationState.canGoPrevious) return;
    navigateToSlide(navigationState.currentSlideIndex - 1);
  };

  const handleNext = () => {
    if (!navigationState.canGoNext) return;
    navigateToSlide(navigationState.currentSlideIndex + 1);
  };

  const handleGoToSummary = () => {
    if (!navigationState.canGoToSummary) return;
    navigateToSlide(0);
  };

  return {
    ...navigationState,
    navigateToSlide,
    handlePrevious,
    handleNext,
    handleGoToSummary,
    handleSelectItem,
  };
}
