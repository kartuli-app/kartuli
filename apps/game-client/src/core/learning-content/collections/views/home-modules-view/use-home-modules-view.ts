'use client';

import { useLiveQuery } from '@tanstack/react-db';
import { useMemo } from 'react';

import type { HomeRow } from './create-home-rows-collection';
import { useHomeRowsCollection } from './use-home-rows-collection';

export type HomeModuleView = {
  id: string;
  title: string;
  lessons: HomeLessonView[];
};

export type HomeLessonView = {
  id: string;
  title: string;
  items: HomeLessonItemView[];
};

export type HomeLetterItemView = {
  id: string;
  targetScript: string;
  transliteration: string;
  pronunciationHint: string | null;
  type: 'letter';
};

export type HomeWordItemView = {
  id: string;
  targetScript: string;
  translation: string;
  type: 'word';
};

export type HomeLessonItemView = HomeLetterItemView | HomeWordItemView;

export type UseHomeModulesViewResult = {
  data: HomeModuleView[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

function buildHomeLessonItemView(row: HomeRow): HomeLessonItemView {
  const sharedItem = row.item.sharedItem;
  const itemText = row.item.localizedItem;

  if (sharedItem.type === 'letter' && itemText.type === 'letter') {
    return {
      id: sharedItem.id,
      type: 'letter',
      targetScript: sharedItem.targetScript,
      transliteration: sharedItem.transliteration,
      pronunciationHint: itemText.pronunciationHint,
    };
  }

  if (sharedItem.type === 'word' && itemText.type === 'word') {
    return {
      id: sharedItem.id,
      type: 'word',
      targetScript: sharedItem.targetScript,
      translation: itemText.translation,
    };
  }

  throw new Error(
    `Unsupported home item row for item "${sharedItem.id}" with type "${sharedItem.type}"`,
  );
}

function groupHomeRows(rows: HomeRow[]): HomeModuleView[] {
  const sortedRows = [...rows].sort((a, b) => {
    const moduleIdCompare = a.module.sharedModule.id.localeCompare(b.module.sharedModule.id);
    if (moduleIdCompare !== 0) return moduleIdCompare;

    const lessonOrderCompare = a.moduleLessonEdge.order - b.moduleLessonEdge.order;
    if (lessonOrderCompare !== 0) return lessonOrderCompare;

    return a.lessonItemEdge.order - b.lessonItemEdge.order;
  });

  const modulesById = new Map<string, HomeModuleView>();
  const lessonsByModuleAndLessonId = new Map<string, HomeLessonView>();

  for (const row of sortedRows) {
    const moduleId = row.module.sharedModule.id;
    const lessonId = row.lesson.sharedLesson.id;
    const lessonKey = `${moduleId}:${lessonId}`;

    let moduleView = modulesById.get(moduleId);
    if (!moduleView) {
      moduleView = {
        id: moduleId,
        title: row.module.localizedModule.title,
        lessons: [],
      };
      modulesById.set(moduleId, moduleView);
    }

    let lessonView = lessonsByModuleAndLessonId.get(lessonKey);
    if (!lessonView) {
      lessonView = {
        id: lessonId,
        title: row.lesson.localizedLesson.title,
        items: [],
      };
      lessonsByModuleAndLessonId.set(lessonKey, lessonView);
      moduleView.lessons.push(lessonView);
    }

    lessonView.items.push(buildHomeLessonItemView(row));
  }

  return Array.from(modulesById.values());
}

export function useHomeModulesView({
  locale,
  contentRevision,
}: {
  locale: string;
  contentRevision: string;
}): UseHomeModulesViewResult {
  const homeRowsCollection = useHomeRowsCollection({ locale, contentRevision });

  const { data: homeRows, isLoading, isError } = useLiveQuery(homeRowsCollection);

  const data = useMemo(() => {
    if (isLoading || homeRows === undefined) {
      return undefined;
    }

    return groupHomeRows(homeRows);
  }, [homeRows, isLoading]);

  return {
    data,
    isLoading,
    isError,
  };
}
