import { z } from 'zod';

const moduleJsonSchema = z.object({
  id: z.string(),
  lessonIds: z.array(z.string()),
});

const lessonJsonSchema = z.object({
  id: z.string(),
  itemIds: z.array(z.string()),
});

const letterItemJsonSchema = z.object({
  id: z.string(),
  targetScript: z.string(),
  transliteration: z.string(),
  soundCategory: z.string(),
});

const wordItemJsonSchema = z.object({
  id: z.string(),
  targetScript: z.string(),
});

export const sharedContentDataJsonSchema = z.object({
  sharedModules: z.array(moduleJsonSchema),
  sharedLessons: z.array(lessonJsonSchema),
  sharedLetterItems: z.array(letterItemJsonSchema),
  sharedWordItems: z.array(wordItemJsonSchema),
});

export type SharedContentDataJson = z.infer<typeof sharedContentDataJsonSchema>;
