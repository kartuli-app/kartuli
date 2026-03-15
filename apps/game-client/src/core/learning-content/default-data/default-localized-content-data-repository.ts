import DefaultDataLocalizedEnJson from '../data-sources/default-localized-data.en.json';
import type { LocalizedContentDataRepository } from '../localized-content-data/localized-content-data-repository';
import { parseAndMapLocalizedContentData } from '../localized-content-data/parse-and-map-localized-content-data';

export function defaultLocalizedContentDataRepository(): LocalizedContentDataRepository {
  const source = 'default';

  return {
    async get(locale: string) {
      if (locale !== 'en') {
        throw new Error('Unsupported locale');
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return parseAndMapLocalizedContentData(DefaultDataLocalizedEnJson, source);
    },
  };
}
