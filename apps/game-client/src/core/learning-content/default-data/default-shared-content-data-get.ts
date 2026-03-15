import type { SharedContentData } from '../shared-content-data/shared-content-data';
import { defaultSharedContentDataRepository } from './default-shared-content-data-repository';

export const defaultSharedContentDataGet = async (): Promise<SharedContentData> => {
  return defaultSharedContentDataRepository().get();
};
