export interface SharedModule {
  id: string;
  lessonIds: string[];
  source: string;
}

export interface SharedLesson {
  id: string;
  source: string;
}

export interface SharedModuleLessonEdge {
  moduleId: string;
  lessonId: string;
  order: number;
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

export interface SharedLessonItemEdge {
  lessonId: string;
  itemId: string;
  order: number;
  source: string;
}

export interface SharedContentData {
  modules: SharedModule[];
  lessons: SharedLesson[];
  moduleLessonEdges: SharedModuleLessonEdge[];
  alphabetItems: SharedAlphabetItem[];
  vocabularyItems: SharedVocabularyItem[];
  lessonItemEdges: SharedLessonItemEdge[];
}
