import { describe, expect, it } from 'vitest';
import { getHomeModulesView } from './queries';
import { createBundledLibraryRepository } from './repository';

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
});
