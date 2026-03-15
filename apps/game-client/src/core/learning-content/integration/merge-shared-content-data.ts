import type { SharedContentData } from '../shared-content-data/shared-content-data';

function mergeById<T extends { id: string }>(
  defaultItems: T[],
  extendedItems: T[],
  entityLabel: string,
): T[] {
  const map = new Map<string, T>();
  for (const item of defaultItems) {
    if (map.has(item.id)) {
      console.warn(`Duplicate ${entityLabel} id in default data: ${item.id}. Keeping last.`);
    }
    map.set(item.id, item);
  }
  const extendedIdsSeen = new Set<string>();
  for (const item of extendedItems) {
    if (extendedIdsSeen.has(item.id)) {
      console.warn(`Duplicate ${entityLabel} id in extended data: ${item.id}. Keeping last.`);
    }
    extendedIdsSeen.add(item.id);
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
    const key = `${edge.moduleId}\0${edge.lessonId}`;
    if (map.has(key)) {
      console.warn(
        `Duplicate moduleLessonEdge (moduleId, lessonId) in default data: ${edge.moduleId}, ${edge.lessonId}. Keeping last.`,
      );
    }
    map.set(key, edge);
  }
  const extendedKeysSeen = new Set<string>();
  for (const edge of extendedEdges) {
    const key = `${edge.moduleId}\0${edge.lessonId}`;
    if (extendedKeysSeen.has(key)) {
      console.warn(
        `Duplicate moduleLessonEdge (moduleId, lessonId) in extended data: ${edge.moduleId}, ${edge.lessonId}. Keeping last.`,
      );
    }
    extendedKeysSeen.add(key);
    map.set(key, edge);
  }
  return Array.from(map.values());
}

function mergeLessonItemEdges(
  defaultEdges: SharedContentData['lessonItemEdges'],
  extendedEdges: SharedContentData['lessonItemEdges'],
): SharedContentData['lessonItemEdges'] {
  const map = new Map<string, (typeof defaultEdges)[number]>();
  for (const edge of defaultEdges) {
    const key = `${edge.lessonId}\0${edge.itemId}`;
    if (map.has(key)) {
      console.warn(
        `Duplicate lessonItemEdge (lessonId, itemId) in default data: ${edge.lessonId}, ${edge.itemId}. Keeping last.`,
      );
    }
    map.set(key, edge);
  }
  const extendedKeysSeen = new Set<string>();
  for (const edge of extendedEdges) {
    const key = `${edge.lessonId}\0${edge.itemId}`;
    if (extendedKeysSeen.has(key)) {
      console.warn(
        `Duplicate lessonItemEdge (lessonId, itemId) in extended data: ${edge.lessonId}, ${edge.itemId}. Keeping last.`,
      );
    }
    extendedKeysSeen.add(key);
    map.set(key, edge);
  }
  return Array.from(map.values());
}

export function mergeSharedContentData(
  defaultData: SharedContentData,
  extendedData: SharedContentData,
): SharedContentData {
  return {
    modules: mergeById(defaultData.modules, extendedData.modules, 'module'),
    lessons: mergeById(defaultData.lessons, extendedData.lessons, 'lesson'),
    moduleLessonEdges: mergeModuleLessonEdges(
      defaultData.moduleLessonEdges,
      extendedData.moduleLessonEdges,
    ),
    alphabetItems: mergeById(defaultData.alphabetItems, extendedData.alphabetItems, 'alphabetItem'),
    vocabularyItems: mergeById(
      defaultData.vocabularyItems,
      extendedData.vocabularyItems,
      'vocabularyItem',
    ),
    lessonItemEdges: mergeLessonItemEdges(
      defaultData.lessonItemEdges,
      extendedData.lessonItemEdges,
    ),
  };
}
