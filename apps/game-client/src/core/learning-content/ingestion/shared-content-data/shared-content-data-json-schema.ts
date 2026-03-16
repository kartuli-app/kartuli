import { z } from 'zod';

const moduleJsonSchema = z.object({
  id: z.string(),
  lessonIds: z.array(z.string()),
});

const lessonJsonSchema = z.object({
  id: z.string(),
  itemIds: z.array(z.string()),
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

export const sharedContentDataJsonSchema = z.object({
  modules: z.array(moduleJsonSchema),
  lessons: z.array(lessonJsonSchema),
  alphabetItems: z.array(alphabetItemJsonSchema),
  vocabularyItems: z.array(vocabularyItemJsonSchema),
});

export type SharedContentDataJson = z.infer<typeof sharedContentDataJsonSchema>;
