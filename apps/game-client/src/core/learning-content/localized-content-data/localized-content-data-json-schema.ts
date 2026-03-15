import { z } from 'zod';

const localizedModuleJsonSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const localizedLessonJsonSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const localizedAlphabetItemJsonSchema = z.object({
  id: z.string(),
  pronunciationHint: z.string(),
});

const localizedVocabularyItemJsonSchema = z.object({
  id: z.string(),
  translation: z.string(),
});

export const localizedContentDataJsonSchema = z.object({
  localizedModules: z.array(localizedModuleJsonSchema),
  localizedLessons: z.array(localizedLessonJsonSchema),
  localizedAlphabetItems: z.array(localizedAlphabetItemJsonSchema),
  localizedVocabularyItems: z.array(localizedVocabularyItemJsonSchema),
});

export type LocalizedContentDataJson = z.infer<typeof localizedContentDataJsonSchema>;
