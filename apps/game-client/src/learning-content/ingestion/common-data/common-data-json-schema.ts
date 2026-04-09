import { z } from 'zod';

const commonModuleJsonSchema = z.object({
  id: z.string(),
  lessonIds: z.array(z.string()),
});

const commonLessonJsonSchema = z.object({
  id: z.string(),
  itemIds: z.array(z.string()),
});

const commonLetterItemJsonSchema = z.object({
  id: z.string(),
  targetScript: z.string(),
  transliteration: z.string(),
  soundCategory: z.string(),
});

const commonWordItemJsonSchema = z.object({
  id: z.string(),
  targetScript: z.string(),
});

export const commonDataJsonSchema = z.object({
  commonModules: z.array(commonModuleJsonSchema),
  commonLessons: z.array(commonLessonJsonSchema),
  commonLetterItems: z.array(commonLetterItemJsonSchema),
  commonWordItems: z.array(commonWordItemJsonSchema),
});

export type CommonDataJson = z.infer<typeof commonDataJsonSchema>;
