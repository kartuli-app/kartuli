import { describe, expect, it } from 'vitest';
import { getHomeModulesView } from './queries';
import { createBundledLibraryRepository } from './repository';
import {
  createRepoThatThrows,
  createRepoWithEmptyModules,
  createRepoWithIncompleteRussian,
} from './repository-fakes';

const AFFECTED_LESSON_ID = 'lesson-alphabet-buzzing-sounds';
const AFFECTED_LESSON_TITLE_EN = 'Buzzing Sounds';

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
    expect(typeof (letterPreview as { transliteration: string }).transliteration).toBe('string');
    expect((letterPreview as { transliteration: string }).transliteration).toBe('a');
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

  describe('empty modules (test repo with no modules)', () => {
    const repoEmpty = createRepoWithEmptyModules();

    it('returns empty array for any locale', async () => {
      const viewEn = await getHomeModulesView(repoEmpty, 'en');
      const viewRu = await getHomeModulesView(repoEmpty, 'ru');
      expect(viewEn).toEqual([]);
      expect(viewRu).toEqual([]);
    });
  });

  describe('error (test repo that throws)', () => {
    const repoThatThrows = createRepoThatThrows(new Error('Network error'));

    it('getHomeModulesView rejects with the same error', async () => {
      await expect(getHomeModulesView(repoThatThrows, 'en')).rejects.toThrow('Network error');
    });
  });
});
