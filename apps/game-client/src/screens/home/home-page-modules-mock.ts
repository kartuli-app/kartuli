import type { HomeModuleView } from '@game-client/core/views/home/use-home-modules-view';

/**
 * Fixture for home page tests (mocked `useModulesList`).
 * Lesson titles and ids match production content; `items` are omitted here to keep
 * the file small. To snapshot-test full grids, paste your captured `data` from the
 * app (as `HomeModuleView[]`) and cast with `as unknown as HomeModuleView[]`.
 */
export const mockHomeModulesListData = [
  {
    id: 'module-alphabet',
    title: 'Alphabet',
    lessons: [
      { id: 'lesson-alphabet-vowels', title: 'The Five Vowels', items: [] },
      { id: 'lesson-alphabet-sounds-you-know', title: 'Sounds You Know', items: [] },
      { id: 'lesson-alphabet-more-easy-sounds', title: 'More Easy Sounds', items: [] },
      { id: 'lesson-alphabet-puff-and-pop', title: 'Puff and Pop', items: [] },
      { id: 'lesson-alphabet-k-family', title: 'The K Family', items: [] },
      { id: 'lesson-alphabet-hissing-sounds', title: 'Hissing Sounds', items: [] },
      { id: 'lesson-alphabet-buzzing-sounds', title: 'Buzzing Sounds', items: [] },
    ],
  },
  {
    id: 'module-basic-vocabulary',
    title: 'Basic Vocabulary',
    lessons: [{ id: 'lesson-georgian-101', title: 'Georgian 101', items: [] }],
  },
] as const satisfies readonly HomeModuleView[];
