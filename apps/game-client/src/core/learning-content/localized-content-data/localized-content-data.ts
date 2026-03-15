interface LocalizedModule {
  id: string;
  title: string;
  source: string;
}

interface LocalizedLesson {
  id: string;
  title: string;
  source: string;
}

interface LocalizedAlphabetItem {
  id: string;
  pronunciationHint: string;
  source: string;
}

interface LocalizedVocabularyItem {
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
