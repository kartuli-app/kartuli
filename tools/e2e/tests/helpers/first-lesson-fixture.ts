import { getDefaultRepository, getHomeModulesView } from '@game-client/core/library';

/**
 * E2E fixture: first lesson id and English title from the library.
 * Used by game-client production specs (smoke, offline) that need a stable lesson to navigate to.
 */
export async function getFirstLessonFixtureEn(): Promise<{
  firstLessonId: string;
  firstLessonTitleEn: string;
}> {
  const repo = getDefaultRepository();
  const view = await getHomeModulesView(repo, 'en');
  const firstLesson = view[0]?.lessons[0];
  if (!firstLesson) {
    throw new Error('Library has no modules or lessons');
  }
  return {
    firstLessonId: firstLesson.id,
    firstLessonTitleEn: firstLesson.title,
  };
}
