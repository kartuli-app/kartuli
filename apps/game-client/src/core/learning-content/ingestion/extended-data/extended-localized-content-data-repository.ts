import ExtendedLocalizedDataEnJson from '../data-sources/extended-localized-data.en.json';
import ExtendedLocalizedDataRuJson from '../data-sources/extended-localized-data.ru.json';
import type { LocalizedContentDataRepository } from '../localized-content-data/localized-content-data-repository';
import { parseAndMapLocalizedContentData } from '../localized-content-data/parse-and-map-localized-content-data';

export function extendedLocalizedContentDataRepository(): LocalizedContentDataRepository {
  const source = 'extended';

  return {
    get(locale: string) {
      if (locale === 'en') {
        return parseAndMapLocalizedContentData(ExtendedLocalizedDataEnJson, source);
      }
      if (locale === 'ru') {
        return parseAndMapLocalizedContentData(ExtendedLocalizedDataRuJson, source);
      }
      throw new Error('Unsupported locale');
    },
  };
}
