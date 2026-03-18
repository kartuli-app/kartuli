'use client';

import { useItemTextsCollection } from '@game-client/core/learning-content/db/base/item-texts-collection/use-item-texts-collection';
import { useItemsCollection } from '@game-client/core/learning-content/db/base/items-collection/use-items-collection';
import { useLessonItemEdgesCollection } from '@game-client/core/learning-content/db/base/lesson-item-edges-collection/use-lesson-item-edges-collection';
import { useLessonTextsCollection } from '@game-client/core/learning-content/db/base/lesson-texts-collection/use-lesson-texts-collection';
import { useLessonsCollection } from '@game-client/core/learning-content/db/base/lessons-collection/use-lessons-collection';
import { useModuleLessonEdgesCollection } from '@game-client/core/learning-content/db/base/module-lesson-edges-collection/use-module-lesson-edges-collection';
import { useModuleTextsCollection } from '@game-client/core/learning-content/db/base/module-texts-collection/use-module-texts-collection';
import { useModulesCollection } from '@game-client/core/learning-content/db/base/modules-collection/use-modules-collection';
import { useStudentItemActivityEventsCollection } from '@game-client/core/learning-content/db/student/item-activity-events-collection/use-student-item-activity-events-collection';
import { useLang } from '@game-client/i18n/use-lang';
import { useLiveQuery } from '@tanstack/react-db';

export function NewModulesList() {
  const locale = useLang();
  console.info('🚀 ~ NewModulesList ~ lang:', locale);
  const contentRevision = '1.0.0';
  console.info('🚀 ~ NewModulesList ~ contentRevision:', contentRevision);
  //
  const itemsCollection = useItemsCollection({ contentRevision });
  const { data: items, isLoading: isItemsLoading } = useLiveQuery(itemsCollection);
  const itemTextsCollection = useItemTextsCollection({ contentRevision, locale });
  const { data: itemTexts, isLoading: isItemTextsLoading } = useLiveQuery(itemTextsCollection);
  //
  const lessonsCollection = useLessonsCollection({ contentRevision });
  const { data: lessons, isLoading: isLessonsLoading } = useLiveQuery(lessonsCollection);
  const lessonTextsCollection = useLessonTextsCollection({ contentRevision, locale });
  const { data: lessonTexts, isLoading: isLessonTextsLoading } =
    useLiveQuery(lessonTextsCollection);
  //
  const modulesCollection = useModulesCollection({ contentRevision });
  const { data: modules, isLoading: isModulesLoading } = useLiveQuery(modulesCollection);
  const moduleTextsCollection = useModuleTextsCollection({ contentRevision, locale });
  const { data: moduleTexts, isLoading: isModuleTextsLoading } =
    useLiveQuery(moduleTextsCollection);
  //
  const moduleLessonEdgesCollection = useModuleLessonEdgesCollection({ contentRevision });
  const { data: moduleLessonEdges, isLoading: isModuleLessonEdgesLoading } = useLiveQuery(
    moduleLessonEdgesCollection,
  );
  const lessonItemEdgesCollection = useLessonItemEdgesCollection({ contentRevision });
  const { data: lessonItemEdges, isLoading: isLessonItemEdgesLoading } =
    useLiveQuery(lessonItemEdgesCollection);
  //
  const itemActivityEventsCollection = useStudentItemActivityEventsCollection();
  const { data: itemActivityEvents, isLoading: isItemActivityEventsLoading } = useLiveQuery(
    itemActivityEventsCollection,
  );
  const isLoading =
    isItemsLoading &&
    isItemTextsLoading &&
    isLessonsLoading &&
    isLessonTextsLoading &&
    isModulesLoading &&
    isModuleTextsLoading &&
    isModuleLessonEdgesLoading &&
    isLessonItemEdgesLoading &&
    isItemActivityEventsLoading;

  if (!isLoading) {
    console.info('🚀🚀🚀 ~ NewModulesList ~ items:', items);
    console.info('🚀 ~ NewModulesList ~ itemTexts:', itemTexts);
    console.info('🚀 ~ NewModulesList ~ lessons:', lessons);
    console.info('🚀 ~ NewModulesList ~ lessonTexts:', lessonTexts);
    console.info('🚀 ~ NewModulesList ~ modules:', modules);
    console.info('🚀 ~ NewModulesList ~ moduleTexts:', moduleTexts);
    console.info('🚀 ~ NewModulesList ~ moduleLessonEdges:', moduleLessonEdges);
    console.info('🚀 ~ NewModulesList ~ lessonItemEdges:', lessonItemEdges);
    console.info('🚀 ~ NewModulesList ~ itemActivityEvents:', itemActivityEvents);
  }

  const handleClick = () => {
    if (!isLoading) {
      itemActivityEventsCollection.insert({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        itemId: 'letter-ani',
        eventType: 'click',
      });
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <button type="button" onClick={handleClick}>
      Add item activity event
    </button>
  );
}
