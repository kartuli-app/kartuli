import { getSharedContentData } from '../shared-content-data/get-shared-content-data';
import { defaultSharedContentDataRepository } from './default-shared-content-data-repository';

export const defaultSharedContentDataGet = () =>
  getSharedContentData(defaultSharedContentDataRepository());
