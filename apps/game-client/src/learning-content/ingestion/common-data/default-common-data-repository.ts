import DefaultCommonDataJson from '../data-sources/default-common-data.json';
import type { CommonDataRepository } from './common-data-repository';
import { parseAndMapCommonData } from './parse-and-map-common-data';

export function defaultCommonDataRepository(): CommonDataRepository {
  const source = 'default';
  return {
    get() {
      return parseAndMapCommonData(DefaultCommonDataJson, source);
    },
  };
}
