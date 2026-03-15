import type { SharedContentData } from '../shared-content-data/shared-content-data';

function mergeById<T extends { id: string }>(defaultItems: T[], extendedItems: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of defaultItems) {
    map.set(item.id, item);
  }
  for (const item of extendedItems) {
    map.set(item.id, item);
  }
  return Array.from(map.values());
}

function mergeModuleLessonEdges(
  defaultEdges: SharedContentData['moduleLessonEdges'],
  extendedEdges: SharedContentData['moduleLessonEdges'],
): SharedContentData['moduleLessonEdges'] {
  const map = new Map<string, (typeof defaultEdges)[number]>();
  for (const edge of defaultEdges) {
    map.set(`${edge.moduleId}\0${edge.lessonId}`, edge);
  }
  for (const edge of extendedEdges) {
    map.set(`${edge.moduleId}\0${edge.lessonId}`, edge);
  }
  return Array.from(map.values());
}

function mergeLessonItemEdges(
  defaultEdges: SharedContentData['lessonItemEdges'],
  extendedEdges: SharedContentData['lessonItemEdges'],
): SharedContentData['lessonItemEdges'] {
  const map = new Map<string, (typeof defaultEdges)[number]>();
  for (const edge of defaultEdges) {
    map.set(`${edge.lessonId}\0${edge.itemId}`, edge);
  }
  for (const edge of extendedEdges) {
    map.set(`${edge.lessonId}\0${edge.itemId}`, edge);
  }
  return Array.from(map.values());
}

export function mergeSharedContentData(
  defaultData: SharedContentData,
  extendedData: SharedContentData,
): SharedContentData {
  return {
    modules: mergeById(defaultData.modules, extendedData.modules),
    lessons: mergeById(defaultData.lessons, extendedData.lessons),
    moduleLessonEdges: mergeModuleLessonEdges(
      defaultData.moduleLessonEdges,
      extendedData.moduleLessonEdges,
    ),
    alphabetItems: mergeById(defaultData.alphabetItems, extendedData.alphabetItems),
    vocabularyItems: mergeById(defaultData.vocabularyItems, extendedData.vocabularyItems),
    lessonItemEdges: mergeLessonItemEdges(
      defaultData.lessonItemEdges,
      extendedData.lessonItemEdges,
    ),
  };
}
