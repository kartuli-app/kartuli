import { defaultLocalizedContentDataGet } from '../default-data/default-localized-content-data-get';
import { extendedLocalizedContentDataGet } from '../extended-data/extended-localized-content-data-get';
import { mergeLocalizedContentData } from '../integration/merge-localized-content-data';

export const combinedLocalizedContentDataGet = async (locale: string) => {
  const [defaultData, extendedData] = await Promise.all([
    defaultLocalizedContentDataGet(locale),
    extendedLocalizedContentDataGet(locale),
  ]);
  return mergeLocalizedContentData(defaultData, extendedData);
};
