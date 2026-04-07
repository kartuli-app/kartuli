import type { CommonData } from './common-data';
import { type CommonDataJson, commonDataJsonSchema } from './common-data-json-schema';

function mapCommonDataJsonToCommonData(json: CommonDataJson, source: string): CommonData {
  return {
    commonModules: json.commonModules.map((m) => ({ ...m, source })),
    commonLessons: json.commonLessons.map((l) => ({ ...l, source })),
    commonLetterItems: json.commonLetterItems.map((item) => ({ ...item, source, type: 'letter' })),
    commonWordItems: json.commonWordItems.map((item) => ({ ...item, source, type: 'word' })),
  };
}

/**
 * Parses unknown JSON with the common content schema and maps it to CommonData
 * by adding the given `source` to every entity.
 * @throws ZodError when the JSON does not match the schema
 */
export function parseAndMapCommonData(json: unknown, source: string): CommonData {
  const parsed = commonDataJsonSchema.parse(json);
  return mapCommonDataJsonToCommonData(parsed, source);
}
