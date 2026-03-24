import DefaultDataLocalizedEnJson from '../data-sources/default-localized-data.en.json';
import DefaultDataLocalizedRuJson from '../data-sources/default-localized-data.ru.json';
import type { LocalizedContentDataRepository } from '../localized-content-data/localized-content-data-repository';
import { parseAndMapLocalizedContentData } from '../localized-content-data/parse-and-map-localized-content-data';

export function defaultLocalizedContentDataRepository(): LocalizedContentDataRepository {
  const source = 'default';

  return {
    get(locale: string) {
      if (locale === 'en') {
        return parseAndMapLocalizedContentData(DefaultDataLocalizedEnJson, source);
      }
      if (locale === 'ru') {
        return parseAndMapLocalizedContentData(DefaultDataLocalizedRuJson, source);
      }
      throw new Error('Unsupported locale');
    },
  };
}
