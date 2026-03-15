import ExtendedSharedContentDataJson from '../data-sources/extended-shared-data.json';
import {
  type SharedContentDataJson,
  sharedContentDataJsonSchema,
} from '../shared-content-data/shared-content-data-json-schema';

import type { SharedContentDataRepository } from '../shared-content-data/shared-content-data-repository';

export function extendedSharedContentDataRepository(): SharedContentDataRepository {
  const source = 'extended';
  return {
    async get() {
      const sharedContentDataJson: SharedContentDataJson = sharedContentDataJsonSchema.parse(
        ExtendedSharedContentDataJson,
      );

      return {
        modules: sharedContentDataJson.modules.map((module) => ({
          ...module,
          source,
        })),
        lessons: sharedContentDataJson.lessons.map((lesson) => ({
          ...lesson,
          source,
        })),
        moduleLessonEdges: sharedContentDataJson.moduleLessonEdges.map((edge) => ({
          ...edge,
          source,
        })),
        alphabetItems: sharedContentDataJson.alphabetItems.map((item) => ({
          ...item,
          source,
        })),
        vocabularyItems: sharedContentDataJson.vocabularyItems.map((item) => ({
          ...item,
          source,
        })),
        lessonItemEdges: sharedContentDataJson.lessonItemEdges.map((edge) => ({
          ...edge,
          source,
        })),
      };
    },
  };
}
