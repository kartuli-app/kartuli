'use client';

import { useLessonsCollection } from '@game-client/core/learning-content/db/lessons-collection/use-lessons-collection';
import { useModuleLessonEdgesCollection } from '@game-client/core/learning-content/db/module-lesson-edges-collection/use-module-lesson-edges-collection';
import { useMemo } from 'react';
import { createOrderedModuleLessonsCollection } from './ordered-module-lessons-collection';

/**
 * Returns a live-query collection of ordered module lessons that
 * joins module-lesson edges with the joined lessons collection.
 */
export function useOrderedModuleLessonsCollection(locale: string) {
  const moduleLessonEdgesCollection = useModuleLessonEdgesCollection();
  const lessonsCollection = useLessonsCollection(locale);

  return useMemo(
    () => createOrderedModuleLessonsCollection(moduleLessonEdgesCollection, lessonsCollection),
    [moduleLessonEdgesCollection, lessonsCollection],
  );
}
