import DefaultSharedContentDataJson from '../data-sources/default-shared-data.json';
import { parseAndMapSharedContentData } from '../shared-content-data/parse-and-map-shared-content-data';
import type { SharedContentDataRepository } from '../shared-content-data/shared-content-data-repository';

export function defaultSharedContentDataRepository(): SharedContentDataRepository {
  const source = 'default';
  return {
    async get() {
      const globalProcess = (
        globalThis as typeof globalThis & {
          process?: { env?: Record<string, string | undefined> };
        }
      ).process;
      // slow down the loading time in development to make it easier to see the loading state
      if (globalProcess?.env?.NODE_ENV === 'development') {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      return parseAndMapSharedContentData(DefaultSharedContentDataJson, source);
    },
  };
}
