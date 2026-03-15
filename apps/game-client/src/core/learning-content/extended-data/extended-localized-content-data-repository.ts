import ExtendedLocalizedDataEnJson from '../data-sources/extended-localized-data.en.json';
import type { LocalizedContentDataRepository } from '../localized-content-data/localized-content-data-repository';
import { parseAndMapLocalizedContentData } from '../localized-content-data/parse-and-map-localized-content-data';

export function extendedLocalizedContentDataRepository(): LocalizedContentDataRepository {
  const source = 'extended';

  return {
    async get(locale: string) {
      if (locale !== 'en') {
        throw new Error('Unsupported locale');
      }

      return parseAndMapLocalizedContentData(ExtendedLocalizedDataEnJson, source);
    },
  };
}
