import DefaultSharedContentDataJson from '../data-sources/default-shared-data.json';
import { parseAndMapSharedContentData } from '../shared-content-data/parse-and-map-shared-content-data';
import type { SharedContentDataRepository } from '../shared-content-data/shared-content-data-repository';

export function defaultSharedContentDataRepository(): SharedContentDataRepository {
  const source = 'default';
  return {
    get() {
      return parseAndMapSharedContentData(DefaultSharedContentDataJson, source);
    },
  };
}
