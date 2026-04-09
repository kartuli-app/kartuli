import ExtendedLocalizedDataEnJson from '../data-sources/extended-localized-data.en.json';
import ExtendedLocalizedDataRuJson from '../data-sources/extended-localized-data.ru.json';
import type { LocalizedDataRepository } from './localized-data-repository';
import { parseAndMapLocalizedData } from './parse-and-map-localized-data';

export function extendedLocalizedDataRepository(): LocalizedDataRepository {
  const source = 'extended';

  return {
    get(locale: string) {
      if (locale === 'en') {
        return parseAndMapLocalizedData(ExtendedLocalizedDataEnJson, source);
      }
      if (locale === 'ru') {
        return parseAndMapLocalizedData(ExtendedLocalizedDataRuJson, source);
      }
      throw new Error('Unsupported locale');
    },
  };
}
