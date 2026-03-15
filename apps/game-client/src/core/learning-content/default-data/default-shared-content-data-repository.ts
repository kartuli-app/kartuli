import DefaultSharedContentDataJson from '../data-sources/default-shared-data.json';
import { parseAndMapSharedContentData } from '../shared-content-data/parse-and-map-shared-content-data';
import type { SharedContentDataRepository } from '../shared-content-data/shared-content-data-repository';

export function defaultSharedContentDataRepository(): SharedContentDataRepository {
  const source = 'default';
  return {
    async get() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return parseAndMapSharedContentData(DefaultSharedContentDataJson, source);
    },
  };
}
