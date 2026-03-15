import { defaultSharedContentDataGet } from '../default-data/default-shared-content-data-get';
import { extendedSharedContentDataGet } from '../extended-data/extended-shared-content-data-get';
import { mergeSharedContentData } from '../integration/merge-shared-content-data';

export const combinedSharedContentDataGet = async () => {
  const [defaultData, extendedData] = await Promise.all([
    defaultSharedContentDataGet(),
    extendedSharedContentDataGet(),
  ]);
  return mergeSharedContentData(defaultData, extendedData);
};
