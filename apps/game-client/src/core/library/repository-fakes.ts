/**
 * Test-only repository fakes for driving loading, error, empty, and partial-content scenarios.
 * Use in queries tests, modules-list tests, and any other tests that need controlled library data.
 */
import { localePackRu } from './data/data.locale.ru';
import type { LibraryContentRepository } from './repository';
import { createBundledLibraryRepository } from './repository';
import type { AppLocale } from './types';

const realRepo = createBundledLibraryRepository();

/** Repository that returns a Russian locale pack missing one item so one lesson is unavailable (for tests only). */
export function createRepoWithIncompleteRussian(): LibraryContentRepository {
  const ruPackWithoutJani = {
    ...localePackRu,
    items: { ...localePackRu.items },
  };
  delete ruPackWithoutJani.items['letter-jani'];

  return {
    ...realRepo,
    getLocalePack: async (locale: AppLocale) =>
      locale === 'ru' ? ruPackWithoutJani : realRepo.getLocalePack(locale),
  };
}

/** Repository that returns no modules, so getHomeModulesView returns [] (empty / content not found). */
export function createRepoWithEmptyModules(): LibraryContentRepository {
  return {
    ...realRepo,
    getAllModules: async () => [],
  };
}

/** Repository that rejects on getAllModules so getHomeModulesView fails (error state). */
export function createRepoThatThrows(
  error: Error = new Error('Repository error'),
): LibraryContentRepository {
  return {
    ...realRepo,
    getAllModules: async () => {
      throw error;
    },
  };
}
