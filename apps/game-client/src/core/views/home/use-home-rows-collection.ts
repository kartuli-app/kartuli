import { useLessonItemEdgesCollection } from '@game-client/core/learning-content/collections/base/lesson-item-edges-collection/use-lesson-item-edges-collection';
import { useModuleLessonEdgesCollection } from '@game-client/core/learning-content/collections/base/module-lesson-edges-collection/use-module-lesson-edges-collection';
import { useAvailableLessonsCollection } from '@game-client/core/learning-content/collections/derived/available-lessons-collection/use-available-lessons-collection';
import { useAvailableModulesCollection } from '@game-client/core/learning-content/collections/derived/available-modules-collection/use-available-modules-collection';
import { useAvailableItemsWithActivityCollection } from '@game-client/core/views/shared/available-items-with-activity-collection/use-available-items-with-activity-collection';
import { useMemo } from 'react';
import { createHomeRowsCollection } from './create-home-rows-collection';

export function useHomeRowsCollection({
  locale,
  contentRevision,
  ownerId,
}: {
  locale: string;
  contentRevision: string;
  ownerId: string;
}) {
  const moduleLessonEdgesCollection = useModuleLessonEdgesCollection({
    contentRevision,
  });

  const lessonItemEdgesCollection = useLessonItemEdgesCollection({
    contentRevision,
  });

  const availableItemsWithActivityCollection = useAvailableItemsWithActivityCollection({
    locale,
    ownerId,
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
      availableItemsWithActivityCollection,
      moduleLessonEdgesCollection,
      lessonItemEdgesCollection,
    });
  }, [
    availableModulesCollection,
    availableLessonsCollection,
    availableItemsWithActivityCollection,
    moduleLessonEdgesCollection,
    lessonItemEdgesCollection,
  ]);
}
