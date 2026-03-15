import { getSharedContentData } from '../shared-content-data/get-shared-content-data';
import { extendedSharedContentDataRepository } from './extended-shared-content-data-repository';

export const extendedSharedContentDataGet = () =>
  getSharedContentData(extendedSharedContentDataRepository());
