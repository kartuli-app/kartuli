import { useMemo } from 'react';
import { useLessonItemEdgesCollection } from '../../base/lesson-item-edges-collection/use-lesson-item-edges-collection';
import { useModuleLessonEdgesCollection } from '../../base/module-lesson-edges-collection/use-module-lesson-edges-collection';
import { useAvailableItemsCollection } from '../../derived/available-items-collection/use-available-items-collection';
import { useAvailableLessonsCollection } from '../../derived/available-lessons-collection/use-available-lessons-collection';
import { useAvailableModulesCollection } from '../../derived/available-modules-collection/use-available-modules-collection';
import { createHomeRowsCollection } from './create-home-rows-collection';

export function useHomeRowsCollection({
  locale,
  contentRevision,
}: {
  locale: string;
  contentRevision: string;
}) {
  const moduleLessonEdgesCollection = useModuleLessonEdgesCollection({
    contentRevision,
  });

  const lessonItemEdgesCollection = useLessonItemEdgesCollection({
    contentRevision,
  });

  const availableItemsCollection = useAvailableItemsCollection({
    locale,
    contentRevision,
  });

  const availableLessonsCollection = useAvailableLessonsCollection({
    locale,
    contentRevision,
  });

  const availableModulesCollection = useAvailableModulesCollection({
    locale,
    contentRevision,
  });

  return useMemo(() => {
    return createHomeRowsCollection({
      availableModulesCollection,
      availableLessonsCollection,
      availableItemsCollection,
      moduleLessonEdgesCollection,
      lessonItemEdgesCollection,
    });
  }, [
    availableModulesCollection,
    availableLessonsCollection,
    availableItemsCollection,
    moduleLessonEdgesCollection,
    lessonItemEdgesCollection,
  ]);
}
