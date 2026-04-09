import type { LocalizedData } from './localized-data';
import { type LocalizedDataJson, localizedDataJsonSchema } from './localized-data-json-schema';

function mapLocalizedDataJsonToLocalizedData(
  json: LocalizedDataJson,
  source: string,
): LocalizedData {
  return {
    localizedModules: json.localizedModules.map((m) => ({ ...m, source })),
    localizedLessons: json.localizedLessons.map((l) => ({ ...l, source })),
    localizedLetterItems: json.localizedLetterItems.map((item) => ({
      ...item,
      source,
      type: 'letter',
    })),
    localizedWordItems: json.localizedWordItems.map((item) => ({ ...item, source, type: 'word' })),
  };
}

/**
 * Parses unknown JSON with the localized content schema and maps it to LocalizedContentData
 * by adding the given `source` to every entity.
 * @throws ZodError when the JSON does not match the schema
 */
export function parseAndMapLocalizedData(json: unknown, source: string): LocalizedData {
  const parsed = localizedDataJsonSchema.parse(json);
  return mapLocalizedDataJsonToLocalizedData(parsed, source);
}
