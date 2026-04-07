import type { CommonData } from './common-data';

export interface CommonDataRepository {
  get(): CommonData;
}
