import { localePackEn } from './data.locale.en';
import { localePackRu } from './data.locale.ru';
import { modulesShared } from './data.shared';
import { itemsById, lessonsById, modulesById } from './indexes';
import type {
  AppLocale,
  LessonRecord,
  LibraryItemRecord,
  LibraryLocalePack,
  ModuleRecord,
} from './types';

export interface LibraryContentRepository {
  getAllModules(): Promise<ModuleRecord[]>;
  getModuleById(id: string): Promise<ModuleRecord | null>;
  getLessonById(id: string): Promise<LessonRecord | null>;
  getLessonsByIds(ids: string[]): Promise<LessonRecord[]>;
  getItemsByIds(ids: string[]): Promise<LibraryItemRecord[]>;
  getLocalePack(locale: AppLocale): Promise<LibraryLocalePack>;
}

const localePacks: Record<AppLocale, LibraryLocalePack> = {
  en: localePackEn,
  ru: localePackRu,
};

export function createBundledLibraryRepository(): LibraryContentRepository {
  return {
    async getAllModules() {
      return [...modulesShared];
    },

    async getModuleById(id: string) {
      return modulesById[id] ?? null;
    },

    async getLessonById(id: string) {
      return lessonsById[id] ?? null;
    },

    async getLessonsByIds(ids: string[]) {
      return ids.map((id) => lessonsById[id]).filter(Boolean) as LessonRecord[];
    },

    async getItemsByIds(ids: string[]) {
      return ids.map((id) => itemsById[id]).filter(Boolean) as LibraryItemRecord[];
    },

    async getLocalePack(locale: AppLocale) {
      return localePacks[locale];
    },
  };
}

let defaultRepository: LibraryContentRepository | null = null;

export function getDefaultRepository(): LibraryContentRepository {
  if (!defaultRepository) {
    defaultRepository = createBundledLibraryRepository();
  }
  return defaultRepository;
}
