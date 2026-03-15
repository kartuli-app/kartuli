import { z } from 'zod';

const moduleJsonSchema = z.object({
  id: z.string(),
  lessonIds: z.array(z.string()),
});

const lessonJsonSchema = z.object({
  id: z.string(),
});

const moduleLessonEdgeJsonSchema = z.object({
  moduleId: z.string(),
  lessonId: z.string(),
  order: z.number(),
});

const alphabetItemJsonSchema = z.object({
  id: z.string(),
  targetScript: z.string(),
  transliteration: z.string(),
  soundCategory: z.string(),
});

const vocabularyItemJsonSchema = z.object({
  id: z.string(),
  targetScript: z.string(),
});

const lessonItemEdgeJsonSchema = z.object({
  lessonId: z.string(),
  itemId: z.string(),
  order: z.number(),
});

export const sharedContentDataJsonSchema = z.object({
  modules: z.array(moduleJsonSchema),
  lessons: z.array(lessonJsonSchema),
  moduleLessonEdges: z.array(moduleLessonEdgeJsonSchema),
  alphabetItems: z.array(alphabetItemJsonSchema),
  vocabularyItems: z.array(vocabularyItemJsonSchema),
  lessonItemEdges: z.array(lessonItemEdgeJsonSchema),
});

export type SharedContentDataJson = z.infer<typeof sharedContentDataJsonSchema>;
