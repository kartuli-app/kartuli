import { describe, expect, it } from 'vitest';
import { localePackRu } from './data/data.locale.ru';
import { getHomeModulesView } from './queries';
import type { LibraryContentRepository } from './repository';
import { createBundledLibraryRepository } from './repository';
import type { AppLocale } from './types';

const AFFECTED_LESSON_ID = 'lesson-alphabet-buzzing-sounds';
const AFFECTED_LESSON_TITLE_EN = 'Buzzing Sounds';

/** Repository that returns a Russian locale pack missing one item so one lesson is unavailable (for tests only). */
function createRepoWithIncompleteRussian(): LibraryContentRepository {
  const real = createBundledLibraryRepository();
  const ruPackWithoutJani = {
    ...localePackRu,
    items: { ...localePackRu.items },
  };
  delete ruPackWithoutJani.items['letter-jani'];

  return {
    ...real,
    getLocalePack: async (locale: AppLocale) =>
      locale === 'ru' ? ruPackWithoutJani : real.getLocalePack(locale),
  };
}

describe('getHomeModulesView', () => {
  const repo = createBundledLibraryRepository();

  it('returns localized module and lesson titles for en', async () => {
    const view = await getHomeModulesView(repo, 'en');
    expect(view).toHaveLength(1);
    expect(view[0].id).toBe('module-alphabet');
    expect(view[0].title).toBe('Alphabet');
    expect(view[0].lessons.length).toBeGreaterThan(0);
    expect(view[0].lessons[0].title).toBe('The Five Vowels');
  });

  it('projects letter preview items with targetScript as text', async () => {
    const view = await getHomeModulesView(repo, 'en');
    const firstLesson = view[0].lessons[0];
    expect(firstLesson.previewItems.length).toBeGreaterThan(0);
    const letterPreview = firstLesson.previewItems.find((p) => p.type === 'letter');
    expect(letterPreview).toBeDefined();
    expect(letterPreview?.type).toBe('letter');
    expect(typeof (letterPreview as { text: string }).text).toBe('string');
    expect((letterPreview as { text: string }).text).toBe('ა');
  });

  it('with real data, en and ru both have all 7 lessons', async () => {
    const viewEn = await getHomeModulesView(repo, 'en');
    const viewRu = await getHomeModulesView(repo, 'ru');
    expect(viewEn[0].lessons.length).toBe(7);
    expect(viewRu[0].lessons.length).toBe(7);
  });

  describe('locale availability (test repo with incomplete ru pack)', () => {
    const repoIncompleteRu = createRepoWithIncompleteRussian();

    it('en includes the affected lesson (Buzzing Sounds)', async () => {
      const view = await getHomeModulesView(repoIncompleteRu, 'en');
      const module = view[0];
      const lesson = module.lessons.find((l) => l.id === AFFECTED_LESSON_ID);
      expect(lesson).toBeDefined();
      expect(lesson?.title).toBe(AFFECTED_LESSON_TITLE_EN);
    });

    it('ru excludes the lesson when an item is missing (letter-jani)', async () => {
      const view = await getHomeModulesView(repoIncompleteRu, 'ru');
      const module = view[0];
      const lesson = module.lessons.find((l) => l.id === AFFECTED_LESSON_ID);
      expect(lesson).toBeUndefined();
    });

    it('ru still includes the module with remaining lessons', async () => {
      const view = await getHomeModulesView(repoIncompleteRu, 'ru');
      expect(view).toHaveLength(1);
      expect(view[0].id).toBe('module-alphabet');
      expect(view[0].lessons.length).toBe(6);
      expect(view[0].lessons.every((l) => l.id !== AFFECTED_LESSON_ID)).toBe(true);
    });

    it('en has 7 lessons, ru has 6 when one item missing in ru', async () => {
      const viewEn = await getHomeModulesView(repoIncompleteRu, 'en');
      const viewRu = await getHomeModulesView(repoIncompleteRu, 'ru');
      expect(viewEn[0].lessons.length).toBe(7);
      expect(viewRu[0].lessons.length).toBe(6);
    });
  });
});
