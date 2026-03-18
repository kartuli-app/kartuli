import type {
  LocalizedItem,
  LocalizedLesson,
  LocalizedModule,
} from '../../ingestion/localized-content-data/localized-content-data';

export type CombinedLocalizedModuleRow = LocalizedModule;

export type CombinedLocalizedLessonRow = LocalizedLesson;

export type CombinedLocalizedItemRow = LocalizedItem;

export type CombinedLocalizedContentRows = {
  locale: string;
  combinedLocalizedModulesRows: CombinedLocalizedModuleRow[];
  combinedLocalizedLessonsRows: CombinedLocalizedLessonRow[];
  combinedLocalizedItemsRows: CombinedLocalizedItemRow[];
};
