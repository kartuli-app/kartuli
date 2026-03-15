import { defaultSharedContentDataGet } from '../default-data/default-shared-content-data-get';
import { extendedSharedContentDataGet } from '../extended-data/extended-shared-content-data-get';
import { mergeSharedContentData } from '../integration/merge-shared-content-data';
import type { SharedContentData } from '../shared-content-data/shared-content-data';

export const combinedSharedContentDataGet = async (
  getters?: [() => Promise<SharedContentData>, () => Promise<SharedContentData>],
) => {
  const [getDefault, getExtended] = getters ?? [
    defaultSharedContentDataGet,
    extendedSharedContentDataGet,
  ];
  const [defaultData, extendedData] = await Promise.all([getDefault(), getExtended()]);
  return mergeSharedContentData(defaultData, extendedData);
};
