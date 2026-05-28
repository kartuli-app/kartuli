import type { LetterItem } from '@game-client/learning-content/library/library';
import type { StudyScreenCurrentItem } from '@game-client/ui/experiences/study/components/study-screen-url-state';

export interface StudyNavigationState {
  items: ReadonlyArray<LetterItem>;
  totalItems: number;
  currentItem: StudyScreenCurrentItem;
  currentSlideIndex: number;
  lastSlideIndex: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  canGoToSummary: boolean;
}

export interface StudyNavigationModel extends StudyNavigationState {
  navigateToSlide: (targetSlideIndex: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleGoToSummary: () => void;
  handleSelectItem: (itemIndex: number) => void;
}
