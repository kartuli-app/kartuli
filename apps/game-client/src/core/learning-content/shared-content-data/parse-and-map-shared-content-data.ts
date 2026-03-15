import type { SharedContentData } from './shared-content-data';
import {
  type SharedContentDataJson,
  sharedContentDataJsonSchema,
} from './shared-content-data-json-schema';

function mapSharedContentDataJsonToSharedContentData(
  json: SharedContentDataJson,
  source: string,
): SharedContentData {
  return {
    modules: json.modules.map((m) => ({ ...m, source })),
    lessons: json.lessons.map((l) => ({ ...l, source })),
    moduleLessonEdges: json.moduleLessonEdges.map((e) => ({ ...e, source })),
    alphabetItems: json.alphabetItems.map((item) => ({ ...item, source })),
    vocabularyItems: json.vocabularyItems.map((item) => ({ ...item, source })),
    lessonItemEdges: json.lessonItemEdges.map((e) => ({ ...e, source })),
  };
}

/**
 * Parses unknown JSON with the shared content schema and maps it to SharedContentData
 * by adding the given `source` to every entity and edge.
 * @throws ZodError when the JSON does not match the schema
 */
export function parseAndMapSharedContentData(json: unknown, source: string): SharedContentData {
  const parsed = sharedContentDataJsonSchema.parse(json);
  return mapSharedContentDataJsonToSharedContentData(parsed, source);
}
