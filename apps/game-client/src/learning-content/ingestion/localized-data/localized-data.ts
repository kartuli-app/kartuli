import type { LocalizedLetterNote } from '@game-client/learning-content/letter-notes';

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

export interface LocalizedLetterItem {
  id: string;
  notes?: LocalizedLetterNote[];
  source: string;
  type: 'letter';
}

export interface LocalizedWordItem {
  id: string;
  translation: string;
  source: string;
  type: 'word';
}

export interface LocalizedData {
  localizedModules: LocalizedModule[];
  localizedLessons: LocalizedLesson[];
  localizedLetterItems: LocalizedLetterItem[];
  localizedWordItems: LocalizedWordItem[];
}
