/** Supported UI locales. Aligned with existing SupportedLng (en, ru only). */
export type AppLocale = 'en' | 'ru';

export type ItemType = 'letter' | 'word' | 'rule';

// ----- Shared records (locale-independent) -----

export interface ModuleRecord {
  id: string;
  lessonIds: string[];
}

export interface LessonRecord {
  id: string;
  moduleId: string;
  itemIds: string[];
}

export interface BaseItemRecord {
  id: string;
  type: ItemType;
}

export interface LetterItemRecord extends BaseItemRecord {
  type: 'letter';
  targetScript: string;
  transliteration: string;
  ipa: string;
  soundCategory: string;
  drawingGuide?: {
    imageUrl?: string;
    animationUrl?: string;
  };
}

export interface WordItemRecord extends BaseItemRecord {
  type: 'word';
  imageUrl: string;
}

export interface RuleItemRecord extends BaseItemRecord {
  type: 'rule';
}

export type LibraryItemRecord = LetterItemRecord | WordItemRecord | RuleItemRecord;

// ----- Locale text packs -----

export interface ModuleLocaleText {
  title: string;
}

export interface LessonLocaleText {
  title: string;
  description?: string;
}

export interface LetterItemLocaleText {
  nativeName: string;
  pronunciationHint: string;
}

export interface WordItemLocaleText {
  label: string;
}

export interface RuleItemLocaleText {
  title: string;
  body?: string;
}

export interface LibraryLocalePack {
  modules: Record<string, ModuleLocaleText>;
  lessons: Record<string, LessonLocaleText>;
  items: Record<string, LetterItemLocaleText | WordItemLocaleText | RuleItemLocaleText>;
}

// ----- Home projection types -----

export interface HomeModuleView {
  id: string;
  title: string;
  lessons: HomeLessonCardView[];
}

export interface HomeLessonCardView {
  id: string;
  title: string;
  previewItems: HomeLessonPreviewItem[];
}

export type HomeLessonPreviewItem =
  | { id: string; type: 'letter'; text: string }
  | { id: string; type: 'word'; imageUrl: string; alt: string }
  | { id: string; type: 'rule'; label: string };
