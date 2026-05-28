import type { LetterItem } from '@game-client/learning-content/library/library';
import type { StudyNavigationState } from '@game-client/ui/experiences/study/components/study-screen.types';
import {
  getStudySlideIndex,
  type StudyScreenCurrentItem,
} from '@game-client/ui/experiences/study/components/study-screen-url-state';

export function createStudyNavigationState(
  items: ReadonlyArray<LetterItem>,
  currentItem: StudyScreenCurrentItem,
): StudyNavigationState {
  const totalItems = items.length;
  const currentSlideIndex = getStudySlideIndex(currentItem);
  const lastSlideIndex = totalItems;

  return {
    items,
    totalItems,
    currentItem,
    currentSlideIndex,
    lastSlideIndex,
    canGoPrevious: currentSlideIndex > 0,
    canGoNext: currentSlideIndex < lastSlideIndex,
    canGoToSummary: currentSlideIndex > 0,
  };
}
