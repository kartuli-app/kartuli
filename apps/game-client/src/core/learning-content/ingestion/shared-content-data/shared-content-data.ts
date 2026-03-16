export interface SharedModule {
  id: string;
  lessonIds: string[];
  source: string;
}

export interface SharedLesson {
  id: string;
  itemIds: string[];
  source: string;
}

export interface SharedAlphabetItem {
  id: string;
  targetScript: string;
  transliteration: string;
  soundCategory: string;
  source: string;
}

export interface SharedVocabularyItem {
  id: string;
  targetScript: string;
  source: string;
}

export interface SharedContentData {
  modules: SharedModule[];
  lessons: SharedLesson[];
  alphabetItems: SharedAlphabetItem[];
  vocabularyItems: SharedVocabularyItem[];
}
