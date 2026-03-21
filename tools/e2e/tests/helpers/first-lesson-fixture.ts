/**
 * E2E fixture: first lesson id and English title from the library.
 * Used by game-client production specs (smoke, offline) that need a stable lesson to navigate to.
 */
export async function getFirstLessonFixtureEn(): Promise<{
  firstLessonId: string;
  firstLessonTitleEn: string;
}> {
  return {
    firstLessonId: 'lesson-alphabet-vowels',
    firstLessonTitleEn: 'The Five Vowels',
  };
}
