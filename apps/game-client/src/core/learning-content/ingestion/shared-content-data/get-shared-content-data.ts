import type { SharedContentData } from './shared-content-data';
import type { SharedContentDataRepository } from './shared-content-data-repository';

export const getSharedContentData = async (
  repo: SharedContentDataRepository,
): Promise<SharedContentData> => {
  return repo.get();
};
