import type { SharedContentData, SharedLetterItem, SharedWordItem } from './shared-content-data';
import {
  type SharedContentDataJson,
  sharedContentDataJsonSchema,
} from './shared-content-data-json-schema';

function mapSharedContentDataJsonToSharedContentData(
  json: SharedContentDataJson,
  source: string,
): SharedContentData {
  return {
    sharedModules: json.sharedModules.map((m) => ({ ...m, source })),
    sharedLessons: json.sharedLessons.map((l) => ({ ...l, source })),
    sharedItems: [
      ...(json.sharedLetterItems.map((item) => ({
        ...item,
        source,
        type: 'letter',
      })) as SharedLetterItem[]),
      ...(json.sharedWordItems.map((item) => ({
        ...item,
        source,
        type: 'word',
      })) as SharedWordItem[]),
    ],
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
