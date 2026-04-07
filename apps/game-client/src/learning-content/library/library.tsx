export interface Library {
  totalLettersCount: number;
  totalWordsCount: number;
  letterItems: LetterItem[];
  letterItemsById: Map<string, LetterItem>;
  wordItems: WordItem[];
  wordItemsById: Map<string, WordItem>;
  lessons: Lesson[];
  lessonsById: Map<string, Lesson>;
  modules: Module[];
  modulesById: Map<string, Module>;
}

export interface LetterItem {
  id: string;
  targetScript: string;
  transliteration: string;
  pronunciationHint: string;
  soundCategory: string;
  type: 'letter';
  commonSource: string;
  localizedSource: string;
}

export interface WordItem {
  id: string;
  targetScript: string;
  transliteration: string;
  translation: string;
  type: 'word';
  commonSource: string;
  localizedSource: string;
}

export interface Lesson {
  id: string;
  title: string;
  commonSource: string;
  localizedSource: string;
  itemIds: string[];
}

export interface Module {
  id: string;
  title: string;
  commonSource: string;
  localizedSource: string;
  lessonIds: string[];
}
