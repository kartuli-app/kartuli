import type { LetterItem } from '@game-client/learning-content/library/library';

export const STUDY_ITEM_SEARCH_PARAM = 'item';

export type StudyScreenCurrentItem = number | 'summary';

export function getStudySlideIndex(currentItem: StudyScreenCurrentItem): number {
  return currentItem === 'summary' ? 0 : currentItem + 1;
}

export function getStudyScreenCurrentItemFromSlideIndex(
  itemsCount: number,
  slideIndex: number,
): StudyScreenCurrentItem {
  const lastSlideIndex = Math.max(0, itemsCount);
  const boundedSlideIndex = Math.max(0, Math.min(slideIndex, lastSlideIndex));

  if (boundedSlideIndex === 0) return 'summary';

  return boundedSlideIndex - 1;
}

export function getStudyScreenCurrentItem(
  items: ReadonlyArray<Pick<LetterItem, 'id'>>,
  itemId: string | null,
): StudyScreenCurrentItem {
  if (!itemId) return 'summary';

  const itemIndex = items.findIndex((item) => item.id === itemId);
  return itemIndex === -1 ? 'summary' : itemIndex;
}

export function getStudyScreenUrl(
  pathname: string,
  searchParams: string,
  itemId: string | null,
): string {
  const nextSearchParams = new URLSearchParams(searchParams);

  if (itemId === null) {
    nextSearchParams.delete(STUDY_ITEM_SEARCH_PARAM);
  } else {
    nextSearchParams.set(STUDY_ITEM_SEARCH_PARAM, itemId);
  }

  const nextQueryString = nextSearchParams.toString();
  return nextQueryString === '' ? pathname : `${pathname}?${nextQueryString}`;
}
