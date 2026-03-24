import type { AvailableItemRow } from '@game-client/core/learning-content/collections/derived/available-items-collection/create-available-items-collection';
import type { AvailableLessonRow } from '@game-client/core/learning-content/collections/derived/available-lessons-collection/create-available-lessons-collection';
import type { AvailableModuleRow } from '@game-client/core/learning-content/collections/derived/available-modules-collection/create-available-modules-collection';
import type {
  CombinedSharedLessonItemEdgeRow,
  CombinedSharedModuleLessonEdgeRow,
} from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import type { FullLibrary } from './library/full-library/full-library';

export type HomePageModuleView = {
  id: string;
  title: string;
  lessons: HomePageLessonView[];
};

export type HomePageLessonView = {
  id: string;
  title: string;
  items: HomePageLessonItemView[];
};

export type HomePageLetterItemView = {
  id: string;
  targetScript: string;
  transliteration: string;
  type: 'letter';
};

export type HomePageWordItemView = {
  id: string;
  targetScript: string;
  translation: string;
  transliteration: string;
  type: 'word';
};

export type HomePageLessonItemView = HomePageLetterItemView | HomePageWordItemView;

export type HomePageView = {
  modules: HomePageModuleView[];
};

export async function getHomePageView(fullLibrary: FullLibrary): Promise<HomePageView> {
  const availableItems = fullLibrary.availableLibrary.availableItems;
  const availableLessons = fullLibrary.availableLibrary.availableLessons;
  const availableModules = fullLibrary.availableLibrary.availableModules;
  const moduleLessonEdges = fullLibrary.sharedData.combinedSharedModuleLessonEdgesRows;
  const lessonItemEdges = fullLibrary.sharedData.combinedSharedLessonItemEdgesRows;
  // group lesson item edges by lesson id and sort by order
  const sortedLessonItemEdges = lessonItemEdges.sort((a, b) => a.order - b.order);
  const lessonItemEdgesGroupedByLessonId = sortedLessonItemEdges.reduce(
    (acc, lessonItemEdge) => {
      acc[lessonItemEdge.lessonId] = [...(acc[lessonItemEdge.lessonId] || []), lessonItemEdge];
      return acc;
    },
    {} as Record<string, CombinedSharedLessonItemEdgeRow[]>,
  );
  // group module lesson edges by module id and sort by order and then by module id
  const sortedModuleLessonEdges = moduleLessonEdges.sort((a, b) => {
    const orderCompare = a.order - b.order;
    if (orderCompare !== 0) return orderCompare;
    return a.moduleId.localeCompare(b.moduleId);
  });
  const moduleLessonEdgesGroupedByModuleId = sortedModuleLessonEdges.reduce(
    (acc, moduleLessonEdge) => {
      acc[moduleLessonEdge.moduleId] = [
        ...(acc[moduleLessonEdge.moduleId] || []),
        moduleLessonEdge,
      ];
      return acc;
    },
    {} as Record<string, CombinedSharedModuleLessonEdgeRow[]>,
  );
  // map by id
  const availableItemsByItemId = availableItems.reduce(
    (acc, availableItem) => {
      acc[availableItem.id] = availableItem;
      return acc;
    },
    {} as Record<string, AvailableItemRow>,
  );
  const availableLessonsByLessonId = availableLessons.reduce(
    (acc, availableLesson) => {
      acc[availableLesson.id] = availableLesson;
      return acc;
    },
    {} as Record<string, AvailableLessonRow>,
  );
  const availableModulesByModuleId = availableModules.reduce(
    (acc, availableModule) => {
      acc[availableModule.id] = availableModule;
      return acc;
    },
    {} as Record<string, AvailableModuleRow>,
  );

  const modules: HomePageModuleView[] = [];
  for (const moduleId in moduleLessonEdgesGroupedByModuleId) {
    const moduleLessonEdges = moduleLessonEdgesGroupedByModuleId[moduleId];
    const module = availableModulesByModuleId[moduleId];
    if (module) {
      const lessons: HomePageLessonView[] = [];
      for (const moduleLessonEdge of moduleLessonEdges) {
        const lesson = availableLessonsByLessonId[moduleLessonEdge.lessonId];
        if (lesson) {
          const items: HomePageLessonItemView[] = [];
          for (const lessonItemEdge of lessonItemEdgesGroupedByLessonId[lesson.sharedLesson.id]) {
            const item = availableItemsByItemId[lessonItemEdge.itemId];
            if (item) {
              if (item.sharedItem.type === 'letter') {
                items.push({
                  id: item.sharedItem.id,
                  targetScript: item.sharedItem.targetScript,
                  transliteration: item.sharedItem.transliteration,
                  type: item.sharedItem.type,
                });
              } else if (item.sharedItem.type === 'word') {
                items.push({
                  id: item.sharedItem.id,
                  targetScript: item.sharedItem.targetScript,
                  transliteration: item.sharedItem.transliteration,
                  translation: 'aaa',
                  type: item.sharedItem.type,
                });
              }
            }
          }
          if (items.length > 0) {
            lessons.push({
              id: lesson.sharedLesson.id,
              title: lesson.localizedLesson.title,
              items: items,
            });
          }
        }
      }
      if (lessons.length > 0) {
        modules.push({
          id: module.sharedModule.id,
          title: module.localizedModule.title,
          lessons: lessons,
        });
      }
    }
  }

  return {
    modules,
  };
}
