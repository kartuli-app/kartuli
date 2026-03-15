import type { SharedContentData } from '../shared-content-data/shared-content-data';
import { extendedSharedContentDataRepository } from './extended-shared-content-data-repository';

export const extendedSharedContentDataGet = async (): Promise<SharedContentData> => {
  return extendedSharedContentDataRepository().get();
};
