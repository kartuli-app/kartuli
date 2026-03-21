import type {
  LocalizedContentData,
  LocalizedLetterItem,
  LocalizedWordItem,
} from './localized-content-data';
import {
  type LocalizedContentDataJson,
  localizedContentDataJsonSchema,
} from './localized-content-data-json-schema';

function mapLocalizedContentDataJsonToLocalizedContentData(
  json: LocalizedContentDataJson,
  source: string,
): LocalizedContentData {
  return {
    localizedModules: json.localizedModules.map((m) => ({ ...m, source })),
    localizedLessons: json.localizedLessons.map((l) => ({ ...l, source })),
    localizedItems: [
      ...(json.localizedLetterItems.map((item) => ({
        ...item,
        source,
        type: 'letter',
      })) as LocalizedLetterItem[]),
      ...(json.localizedWordItems.map((item) => ({
        ...item,
        source,
        type: 'word',
      })) as LocalizedWordItem[]),
    ],
  };
}

/**
 * Parses unknown JSON with the localized content schema and maps it to LocalizedContentData
 * by adding the given `source` to every entity.
 * @throws ZodError when the JSON does not match the schema
 */
export function parseAndMapLocalizedContentData(
  json: unknown,
  source: string,
): LocalizedContentData {
  const parsed = localizedContentDataJsonSchema.parse(json);
  return mapLocalizedContentDataJsonToLocalizedContentData(parsed, source);
}
