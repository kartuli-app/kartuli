export interface CommonModule {
  id: string;
  lessonIds: string[];
  source: string;
}

export interface CommonLesson {
  id: string;
  itemIds: string[];
  source: string;
}

export interface CommonLetterItem {
  id: string;
  targetScript: string;
  transliteration: string;
  soundCategory: string;
  source: string;
  type: 'letter';
}

export interface CommonWordItem {
  id: string;
  targetScript: string;
  source: string;
  type: 'word';
}

export interface CommonData {
  commonModules: CommonModule[];
  commonLessons: CommonLesson[];
  commonLetterItems: CommonLetterItem[];
  commonWordItems: CommonWordItem[];
}
