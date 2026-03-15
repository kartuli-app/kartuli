interface SharedModule {
  id: string;
  lessonIds: string[];
  source: string;
}

interface SharedLesson {
  id: string;
  source: string;
}

interface SharedModuleLessonEdge {
  moduleId: string;
  lessonId: string;
  order: number;
  source: string;
}

interface SharedAlphabetItem {
  id: string;
  targetScript: string;
  transliteration: string;
  soundCategory: string;
  source: string;
}

interface SharedVocabularyItem {
  id: string;
  targetScript: string;
  source: string;
}

interface SharedLessonItemEdge {
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
