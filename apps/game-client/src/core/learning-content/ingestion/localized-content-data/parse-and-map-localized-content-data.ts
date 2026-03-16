import type { LocalizedContentData } from './localized-content-data';
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
    localizedAlphabetItems: json.localizedAlphabetItems.map((item) => ({
      ...item,
      source,
    })),
    localizedVocabularyItems: json.localizedVocabularyItems.map((item) => ({
      ...item,
      source,
    })),
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
