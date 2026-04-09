import { z } from 'zod';

const localizedModuleJsonSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const localizedLessonJsonSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const localizedLetterItemJsonSchema = z.object({
  id: z.string(),
  pronunciationHint: z.string(),
});

const localizedWordItemJsonSchema = z.object({
  id: z.string(),
  translation: z.string(),
});

export const localizedDataJsonSchema = z.object({
  localizedModules: z.array(localizedModuleJsonSchema),
  localizedLessons: z.array(localizedLessonJsonSchema),
  localizedLetterItems: z.array(localizedLetterItemJsonSchema),
  localizedWordItems: z.array(localizedWordItemJsonSchema),
});

export type LocalizedDataJson = z.infer<typeof localizedDataJsonSchema>;
