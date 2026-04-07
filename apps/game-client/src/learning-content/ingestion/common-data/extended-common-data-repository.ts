import ExtendedCommonDataJson from '../data-sources/extended-common-data.json';
import type { CommonDataRepository } from './common-data-repository';
import { parseAndMapCommonData } from './parse-and-map-common-data';

export function extendedCommonDataRepository(): CommonDataRepository {
  const source = 'extended';
  return {
    get() {
      return parseAndMapCommonData(ExtendedCommonDataJson, source);
    },
  };
}
