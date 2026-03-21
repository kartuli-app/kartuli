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

export interface SharedLetterItem {
  id: string;
  targetScript: string;
  transliteration: string;
  soundCategory: string;
  source: string;
  type: 'letter';
}

export interface SharedWordItem {
  id: string;
  targetScript: string;
  source: string;
  type: 'word';
}

export type SharedItem = SharedLetterItem | SharedWordItem;

export interface SharedContentData {
  sharedModules: SharedModule[];
  sharedLessons: SharedLesson[];
  sharedItems: SharedItem[];
}
