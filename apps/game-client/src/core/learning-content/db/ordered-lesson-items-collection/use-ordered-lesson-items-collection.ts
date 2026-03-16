'use client';

import { useLessonItemEdgesCollection } from '@game-client/core/learning-content/db/lesson-item-edges-collection/use-lesson-item-edges-collection';
import { useMultitypeItemsCollection } from '@game-client/core/learning-content/db/multitype-items-collection/use-multitype-items-collection';
import { useMemo } from 'react';
import { createOrderedLessonItemsCollection } from './ordered-lesson-items-collection';

/**
 * Returns a live-query collection of ordered lesson items that
 * joins lesson-item edges with the unified multitype items collection.
 */
export function useOrderedLessonItemsCollection(locale: string) {
  const lessonItemEdgesCollection = useLessonItemEdgesCollection();
  const multitypeItemsCollection = useMultitypeItemsCollection(locale);

  return useMemo(
    () => createOrderedLessonItemsCollection(lessonItemEdgesCollection, multitypeItemsCollection),
    [lessonItemEdgesCollection, multitypeItemsCollection],
  );
}
