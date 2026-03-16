'use client';

import { useModulesCollection } from '@game-client/core/learning-content/db/modules-collection/use-modules-collection';
import { useOrderedLessonItemsCollection } from '@game-client/core/learning-content/db/ordered-lesson-items-collection/use-ordered-lesson-items-collection';
import { useOrderedModuleLessonsCollection } from '@game-client/core/learning-content/db/ordered-module-lessons-collection/use-ordered-module-lessons-collection';
import { useLiveQuery } from '@tanstack/react-db';
import { useMemo } from 'react';
import type { ModulesCollectionRow } from '../modules-collection/modules-collection';
import type { OrderedLessonItemRow } from '../ordered-lesson-items-collection/ordered-lesson-items-collection';
import type { OrderedModuleLessonRow } from '../ordered-module-lessons-collection/ordered-module-lessons-collection';
import type {
  HomeLessonAlphabetItemView,
  HomeLessonView,
  HomeLessonVocabularyItemView,
  HomeModuleView,
} from './home-modules-view-types';

function buildItemView(
  row: OrderedLessonItemRow,
): HomeLessonAlphabetItemView | HomeLessonVocabularyItemView {
  if (row.item.type === 'letter') {
    return {
      id: row.item.id,
      targetScript: row.item.targetScript,
      transliteration: row.item.transliteration,
      type: 'letter',
    };
  }

  return {
    id: row.item.id,
    targetScript: row.item.targetScript,
    translation: row.item.translation,
    type: 'word',
  };
}

function buildHomeModulesViewFromOrdered(
  modules: ModulesCollectionRow[] | undefined,
  orderedModuleLessons: OrderedModuleLessonRow[] | undefined,
  orderedLessonItems: OrderedLessonItemRow[] | undefined,
): HomeModuleView[] | undefined {
  if (!modules || !orderedModuleLessons || !orderedLessonItems) {
    return undefined;
  }

  const lessonsByModuleId = new Map<string, OrderedModuleLessonRow[]>();
  for (const row of orderedModuleLessons) {
    const list = lessonsByModuleId.get(row.moduleId);
    if (list) {
      list.push(row);
    } else {
      lessonsByModuleId.set(row.moduleId, [row]);
    }
  }

  const itemsByLessonId = new Map<string, OrderedLessonItemRow[]>();
  for (const row of orderedLessonItems) {
    const list = itemsByLessonId.get(row.lessonId);
    if (list) {
      list.push(row);
    } else {
      itemsByLessonId.set(row.lessonId, [row]);
    }
  }

  const result: HomeModuleView[] = [];

  for (const moduleRow of modules) {
    const moduleId = moduleRow.sharedModule.id;
    const lessonRows = lessonsByModuleId.get(moduleId) ?? [];

    const lessonsViews: HomeLessonView[] = [];

    for (const lessonRow of lessonRows) {
      const itemRows = itemsByLessonId.get(lessonRow.lesson.sharedLesson.id) ?? [];
      const itemsViews: Array<HomeLessonAlphabetItemView | HomeLessonVocabularyItemView> =
        itemRows.map((itemRow) => buildItemView(itemRow));

      lessonsViews.push({
        id: lessonRow.lesson.sharedLesson.id,
        title: lessonRow.lesson.localizedLesson.title,
        items: itemsViews,
      });
    }

    result.push({
      id: moduleId,
      title: moduleRow.localizedModule.title,
      lessons: lessonsViews,
    });
  }

  return result;
}

export interface UseHomeModulesViewResult {
  data: HomeModuleView[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function useHomeModulesView(locale: string): UseHomeModulesViewResult {
  const modulesCollection = useModulesCollection(locale);
  const orderedModuleLessonsCollection = useOrderedModuleLessonsCollection(locale);
  const orderedLessonItemsCollection = useOrderedLessonItemsCollection(locale);

  const {
    data: modulesItems,
    isLoading: isLoadingModules,
    isError: isErrorModules,
  } = useLiveQuery(modulesCollection);

  const {
    data: orderedModuleLessons,
    isLoading: isLoadingOrderedModuleLessons,
    isError: isErrorOrderedModuleLessons,
  } = useLiveQuery(orderedModuleLessonsCollection);

  const {
    data: orderedLessonItems,
    isLoading: isLoadingOrderedLessonItems,
    isError: isErrorOrderedLessonItems,
  } = useLiveQuery(orderedLessonItemsCollection);

  const isLoading =
    isLoadingModules || isLoadingOrderedModuleLessons || isLoadingOrderedLessonItems;

  const isError = isErrorModules || isErrorOrderedModuleLessons || isErrorOrderedLessonItems;

  const allReady =
    !isLoading &&
    modulesItems !== undefined &&
    orderedModuleLessons !== undefined &&
    orderedLessonItems !== undefined;
  const data = useMemo(
    () =>
      allReady
        ? buildHomeModulesViewFromOrdered(modulesItems, orderedModuleLessons, orderedLessonItems)
        : undefined,
    [allReady, modulesItems, orderedModuleLessons, orderedLessonItems],
  );

  return {
    data,
    isLoading,
    isError,
  };
}
