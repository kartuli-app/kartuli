export type LocalizedModuleRow = {
  id: string; // same as moduleId
  title: string;
  source: string;
};

export type LocalizedLessonRow = {
  id: string; // same as lessonId
  title: string;
  description?: string;
  source: string;
};

export type LocalizedAlphabetItemRow = {
  id: string; // same as itemId
  type: 'letter';
  pronunciationHint: string;
  source: string;
};

export type LocalizedVocabularyItemRow = {
  id: string; // same as itemId
  type: 'word';
  translation: string;
  source: string;
};

export type LocalizedItemRow = LocalizedAlphabetItemRow | LocalizedVocabularyItemRow;

export type CombinedLocalizedContentRows = {
  locale: string;
  localizedModulesRows: LocalizedModuleRow[];
  localizedLessonsRows: LocalizedLessonRow[];
  localizedItemsRows: LocalizedItemRow[];
};
