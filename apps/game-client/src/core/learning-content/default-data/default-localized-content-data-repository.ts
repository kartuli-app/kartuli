import DefaultDataLocalizedEnJson from '../data-sources/default-localized-data.en.json';
import type { LocalizedContentData } from '../localized-content-data/localized-content-data';
import type { LocalizedContentDataJson } from '../localized-content-data/localized-content-data-json-schema';
import { localizedContentDataJsonSchema } from '../localized-content-data/localized-content-data-json-schema';
import type { LocalizedContentDataRepository } from '../localized-content-data/localized-content-data-repository';

export function defaultLocalizedContentDataRepository(): LocalizedContentDataRepository {
  const source = 'default';

  return {
    async get(locale: string) {
      if (locale !== 'en') {
        throw new Error('Unsupported locale');
      }

      const localizedContentDataJson: LocalizedContentDataJson =
        localizedContentDataJsonSchema.parse(DefaultDataLocalizedEnJson);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return mapJsonToLocalizedContentData(localizedContentDataJson, source);
    },
  };
}

function mapJsonToLocalizedContentData(
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
