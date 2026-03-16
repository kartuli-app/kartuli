export interface LocalizedModule {
  id: string;
  title: string;
  source: string;
}

export interface LocalizedLesson {
  id: string;
  title: string;
  source: string;
}

export interface LocalizedAlphabetItem {
  id: string;
  pronunciationHint: string;
  source: string;
}

export interface LocalizedVocabularyItem {
  id: string;
  translation: string;
  source: string;
}

export interface LocalizedContentData {
  localizedModules: LocalizedModule[];
  localizedLessons: LocalizedLesson[];
  localizedAlphabetItems: LocalizedAlphabetItem[];
  localizedVocabularyItems: LocalizedVocabularyItem[];
}
