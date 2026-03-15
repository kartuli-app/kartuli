import { describe, expect, it } from 'vitest';
import { mergeSharedContentData } from './merge-shared-content-data';

describe('mergeSharedContentData', () => {
  it('merges entities by id with extended overwriting default', () => {
    const defaultData = {
      modules: [{ id: 'module-1', lessonIds: ['lesson-a'], source: 'default' }],
      lessons: [{ id: 'lesson-a', source: 'default' }],
      moduleLessonEdges: [
        { moduleId: 'module-1', lessonId: 'lesson-a', order: 0, source: 'default' },
      ],
      alphabetItems: [],
      vocabularyItems: [],
      lessonItemEdges: [],
    };
    const extendedData = {
      modules: [{ id: 'module-1', lessonIds: ['lesson-a', 'lesson-b'], source: 'extended' }],
      lessons: [
        { id: 'lesson-a', source: 'extended' },
        { id: 'lesson-b', source: 'extended' },
      ],
      moduleLessonEdges: [
        { moduleId: 'module-1', lessonId: 'lesson-a', order: 0, source: 'extended' },
        { moduleId: 'module-1', lessonId: 'lesson-b', order: 1, source: 'extended' },
      ],
      alphabetItems: [],
      vocabularyItems: [],
      lessonItemEdges: [],
    };
    const merged = mergeSharedContentData(defaultData, extendedData);
    expect(merged.modules).toHaveLength(1);
    expect(merged.modules[0].id).toBe('module-1');
    expect(merged.modules[0].lessonIds).toEqual(['lesson-a', 'lesson-b']);
    expect(merged.modules[0].source).toBe('extended');
    expect(merged.lessons).toHaveLength(2);
    expect(merged.lessons.find((l) => l.id === 'lesson-a')?.source).toBe('extended');
  });

  it('merges lessonItemEdges by composite key (lessonId, itemId) with extended overwriting', () => {
    const defaultData = {
      modules: [],
      lessons: [{ id: 'lesson-a', source: 'default' }],
      moduleLessonEdges: [],
      alphabetItems: [],
      vocabularyItems: [],
      lessonItemEdges: [
        { lessonId: 'lesson-a', itemId: 'letter-ani', order: 0, source: 'default' },
      ],
    };
    const extendedData = {
      modules: [],
      lessons: [],
      moduleLessonEdges: [],
      alphabetItems: [],
      vocabularyItems: [],
      lessonItemEdges: [
        { lessonId: 'lesson-a', itemId: 'letter-ani', order: 99, source: 'extended' },
      ],
    };
    const merged = mergeSharedContentData(defaultData, extendedData);
    expect(merged.lessonItemEdges).toHaveLength(1);
    expect(merged.lessonItemEdges[0].order).toBe(99);
    expect(merged.lessonItemEdges[0].source).toBe('extended');
  });

  it('unions entities and edges when ids do not overlap', () => {
    const defaultData = {
      modules: [{ id: 'module-a', lessonIds: ['lesson-a'], source: 'default' }],
      lessons: [{ id: 'lesson-a', source: 'default' }],
      moduleLessonEdges: [
        { moduleId: 'module-a', lessonId: 'lesson-a', order: 0, source: 'default' },
      ],
      alphabetItems: [],
      vocabularyItems: [],
      lessonItemEdges: [],
    };
    const extendedData = {
      modules: [{ id: 'module-b', lessonIds: ['lesson-b'], source: 'extended' }],
      lessons: [{ id: 'lesson-b', source: 'extended' }],
      moduleLessonEdges: [
        { moduleId: 'module-b', lessonId: 'lesson-b', order: 0, source: 'extended' },
      ],
      alphabetItems: [],
      vocabularyItems: [],
      lessonItemEdges: [],
    };
    const merged = mergeSharedContentData(defaultData, extendedData);
    expect(merged.modules).toHaveLength(2);
    expect(merged.modules.map((m) => m.id).sort((a, b) => a.localeCompare(b))).toEqual([
      'module-a',
      'module-b',
    ]);
    expect(merged.lessons).toHaveLength(2);
    expect(merged.moduleLessonEdges).toHaveLength(2);
  });
});
