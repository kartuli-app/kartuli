import DefaultDataLocalizedEnJson from '../data-sources/default-localized-data.en.json';
import DefaultDataLocalizedRuJson from '../data-sources/default-localized-data.ru.json';
import type { LocalizedDataRepository } from './localized-data-repository';
import { parseAndMapLocalizedData } from './parse-and-map-localized-data';

export function defaultLocalizedDataRepository(): LocalizedDataRepository {
  const source = 'default';

  return {
    get(locale: string) {
      if (locale === 'en') {
        return parseAndMapLocalizedData(DefaultDataLocalizedEnJson, source);
      }
      if (locale === 'ru') {
        return parseAndMapLocalizedData(DefaultDataLocalizedRuJson, source);
      }
      throw new Error('Unsupported locale');
    },
  };
}
