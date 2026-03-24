import ExtendedSharedContentDataJson from '../data-sources/extended-shared-data.json';
import { parseAndMapSharedContentData } from '../shared-content-data/parse-and-map-shared-content-data';
import type { SharedContentDataRepository } from '../shared-content-data/shared-content-data-repository';

export function extendedSharedContentDataRepository(): SharedContentDataRepository {
  const source = 'extended';
  return {
    get() {
      return parseAndMapSharedContentData(ExtendedSharedContentDataJson, source);
    },
  };
}
