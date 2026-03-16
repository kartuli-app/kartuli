import DefaultDataLocalizedEnJson from '../data-sources/default-localized-data.en.json';
import DefaultDataLocalizedRUJson from '../data-sources/default-localized-data.ru.json';
import type { LocalizedContentDataRepository } from '../localized-content-data/localized-content-data-repository';
import { parseAndMapLocalizedContentData } from '../localized-content-data/parse-and-map-localized-content-data';

export function defaultLocalizedContentDataRepository(): LocalizedContentDataRepository {
  const source = 'default';

  return {
    async get(locale: string) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (locale === 'en') {
        return parseAndMapLocalizedContentData(DefaultDataLocalizedEnJson, source);
      }
      if (locale === 'ru') {
        return parseAndMapLocalizedContentData(DefaultDataLocalizedRUJson, source);
      }

      throw new Error('Unsupported locale');
    },
  };
}
