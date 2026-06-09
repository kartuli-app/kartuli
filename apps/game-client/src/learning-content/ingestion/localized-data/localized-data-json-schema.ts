import { z } from 'zod';

const localizedModuleJsonSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const localizedLessonJsonSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const pronunciationHintNoteJsonSchema = z.object({
  kind: z.literal('pronunciation_hint'),
  highlight: z.string().trim().min(1),
  examples: z.array(z.string().trim().min(1)).min(1),
});

const infoNoteJsonSchema = z.object({
  kind: z.literal('info_text'),
  text: z.string().trim().min(1),
});

const localizedLetterItemJsonSchema = z.object({
  id: z.string(),
  notes: z
    .array(z.discriminatedUnion('kind', [pronunciationHintNoteJsonSchema, infoNoteJsonSchema]))
    .optional(),
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
