export interface HomeLessonAlphabetItemView {
  id: string;
  targetScript: string;
  transliteration: string;
  type: 'letter';
}

export interface HomeLessonVocabularyItemView {
  id: string;
  targetScript: string;
  translation: string;
  type: 'word';
}

export interface HomeLessonView {
  id: string;
  title: string;
  items: Array<HomeLessonAlphabetItemView | HomeLessonVocabularyItemView>;
}

export interface HomeModuleView {
  id: string;
  title: string;
  lessons: HomeLessonView[];
}

export interface UseHomeModulesViewResult {
  data: HomeModuleView[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
