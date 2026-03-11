import { itemsShared, lessonsShared, modulesShared } from './data/data.shared';
import type { LessonRecord, LibraryItemRecord, ModuleRecord } from './types';

export const modulesById: Record<string, ModuleRecord> = Object.fromEntries(
  modulesShared.map((m) => [m.id, m]),
);

export const lessonsById: Record<string, LessonRecord> = Object.fromEntries(
  lessonsShared.map((l) => [l.id, l]),
);

export const itemsById: Record<string, LibraryItemRecord> = Object.fromEntries(
  itemsShared.map((i) => [i.id, i]),
);
