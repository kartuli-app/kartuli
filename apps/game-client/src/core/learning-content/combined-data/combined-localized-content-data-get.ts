import { defaultLocalizedContentDataGet } from '../default-data/default-localized-content-data-get';
import { extendedLocalizedContentDataGet } from '../extended-data/extended-localized-content-data-get';
import { mergeLocalizedContentData } from '../integration/merge-localized-content-data';
import type { LocalizedContentData } from '../localized-content-data/localized-content-data';

export const combinedLocalizedContentDataGet = async (
  locale: string,
  getters?: [
    (locale: string) => Promise<LocalizedContentData>,
    (locale: string) => Promise<LocalizedContentData>,
  ],
) => {
  const [getDefault, getExtended] = getters ?? [
    defaultLocalizedContentDataGet,
    extendedLocalizedContentDataGet,
  ];
  const [defaultData, extendedData] = await Promise.all([getDefault(locale), getExtended(locale)]);
  return mergeLocalizedContentData(defaultData, extendedData);
};
