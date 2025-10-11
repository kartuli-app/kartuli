# Kartuli Data Content Model

## Files and purpose (4 + 1)

- **master-pack-items-ka.vX.json**: full master items (alphabet, vocabulary, grammar).
- **native-pack-items-ka-<locale>.vX.json**: full native items.
- **master-pack-course-ka.vY.json**: master lessons + modules.
- **native-pack-course-ka-<locale>.vY.json**: native lessons + modules.
- **content-manifest.json**: versions + per-type counts

> You may skip persisting source packs and only persist the **localized bundle** to cut cold-start compute. Either way, render from the **localized bundle** in memory.

## Asset paths and derivation (relative-only)

- JSON packs store **relative** `image_paths`, `audio_paths`, `thumbnail_path`.
- Client derives full URLs from fixed bases:
  - Alphabet → `ALPHABET_BASE/images/` and `/audios/`
  - Vocabulary → `VOCAB_BASE/images/` and `/audios/`
  - Grammar → `GRAMMAR_BASE/images/` and `/audios/`
  - Lesson thumbnails → `LESSONS_BASE/images`
  - Module thumbnails → `MODULES_BASE/images`
- Assets are optional to support text-only mode.

## Size expectations

- Source JSON remains tiny (<1 MB total uncompressed at ~2k vocab).
- **Defer audio/images** without blocking core UX.

## Arrays vs maps

- **Source packs (CDN)** use arrays (historical format; stable, small).
- **Localized bundle** uses **maps by `id`** for O(1) lookups and **edge maps** for inverse relations.
- **Optional order arrays** exist only where UI needs a canonical render order.

---

## Future-proof knobs for size optimization

- Key minification for packs (e.g., `content→c`, `image_paths→im`) if you need ~10–30% JSON reduction.

```ts
/**
 * Data Content model for Kartuli
 */

/* ────────────────────────────── Shared ────────────────────────────── */

interface Assets {
  /** Relative file names only; client derives full URLs from fixed base url + type */
  image_paths: string[];
  audio_paths: string[];
}

/* ────────────────────────────── Vocabulary ────────────────────────────── */

interface MasterVocabularyItemContent {
  target: string; // e.g., "გამარჯობა"
  transliteration: string; // e.g., "gamarjoba"
}

interface MasterVocabularyItemExample {
  id: string;
  target: string; // e.g., "გამარჯობა ვიქტორ, როგორ ხარ?"
  transliteration: string; // e.g., "gamarjoba vikt’or, rogor khar?"
}

interface MasterVocabularyItem {
  id: string;
  content: MasterVocabularyItemContent;
  assets: Assets;
  examples: MasterVocabularyItemExample[];
}

interface NativeVocabularyItemContent {
  native: string; // e.g., "hello"
}

interface NativeVocabularyItemExample {
  id: string;
  native: string; // e.g., "hello Viktor, how are you?
}

interface NativeVocabularyItem {
  id: string;
  content: NativeVocabularyItemContent;
  examples: NativeVocabularyItemExample[];
}

interface LocalizedVocabularyItemContent
  extends MasterVocabularyItemContent,
    NativeVocabularyItemContent {}

interface LocalizedVocabularyItemExample
  extends MasterVocabularyItemExample,
    NativeVocabularyItemExample {}

interface LocalizedVocabularyItem {
  id: string;
  content: LocalizedVocabularyItemContent;
  assets: Assets;
  examples: LocalizedVocabularyItemExample[];
}

/* ────────────────────────────── Alphabet ────────────────────────────── */

interface MasterAlphabetItemContent {
  glyph: string; // e.g., "ა"
  name: string; // e.g., "ანი"
  transliteration: string; // e.g., "ani"
}

interface MasterAlphabetItem {
  id: string;
  content: MasterAlphabetItemContent;
  assets: Assets;
}

interface NativeAlphabetItemContent {
  native: string; // e.g., "a"
}

interface NativeAlphabetItem {
  id: string;
  content: NativeAlphabetItemContent;
  pronunciation_hint: string; // e.g., "Like in car, dad, bat, fast"
}

interface LocalizedAlphabetItemContent
  extends MasterAlphabetItemContent,
    NativeAlphabetItemContent {}

interface LocalizedAlphabetItem {
  id: string;
  content: LocalizedAlphabetItemContent;
  assets: Assets;
  pronunciation_hint: string;
}

/* ────────────────────────────── Grammar ────────────────────────────── */

interface MasterGrammarItemContent {
  target: string;
  transliteration: string;
}

interface MasterGrammarItemExample {
  id: string;
  target: string;
  transliteration: string;
}

interface MasterGrammarItem {
  id: string;
  content: MasterGrammarItemContent;
  assets: Assets;
  examples: MasterGrammarItemExample[];
}

interface NativeGrammarItemContent {
  native: string;
}

interface NativeGrammarItemExample {
  id: string;
  native: string;
}

interface NativeGrammarItem {
  id: string;
  content: NativeGrammarItemContent;
  examples: NativeGrammarItemExample[];
}

interface LocalizedGrammarItemContent extends MasterGrammarItemContent, NativeGrammarItemContent {}
interface LocalizedGrammarItemExample extends MasterGrammarItemExample, NativeGrammarItemExample {}

interface LocalizedGrammarItem {
  id: string;
  content: LocalizedGrammarItemContent;
  assets: Assets;
  examples: LocalizedGrammarItemExample[];
}

/* ────────────────────────────── Lessons ────────────────────────────── */

interface MasterLessonContent {
  target: string;
  transliteration: string;
}

interface MasterLesson {
  id: string;
  type: 'alphabet' | 'vocabulary' | 'grammar';
  item_ids: string[];
  content: MasterLessonContent;
  /** Relative file names only; client derives full URLs from fixed base url + type */
  thumbnail_path: string;
}

interface NativeLessonContent {
  native: string;
}

interface NativeLesson {
  id: string;
  content: NativeLessonContent;
}

interface LocalizedLessonContent extends MasterLessonContent, NativeLessonContent {}

interface LocalizedLesson {
  id: string;
  type: 'alphabet' | 'vocabulary' | 'grammar';
  item_ids: string[];
  thumbnail_path: string;
  content: LocalizedLessonContent;
}

/* ────────────────────────────── Modules ────────────────────────────── */

interface MasterModuleContent {
  target: string;
  transliteration: string;
}

interface MasterModule {
  id: string;
  type: 'alphabet' | 'vocabulary' | 'grammar';
  lesson_ids: string[];
  content: MasterModuleContent;
  /** Relative file names only; client derives full URLs from fixed base url + type */
  thumbnail_path: string;
}

interface NativeModuleContent {
  native: string;
}

interface NativeModule {
  id: string;
  content: NativeModuleContent;
}

interface LocalizedModuleContent extends MasterModuleContent, NativeModuleContent {}

interface LocalizedModule {
  id: string;
  type: 'alphabet' | 'vocabulary' | 'grammar';
  lesson_ids: string[];
  thumbnail_path: string;
  content: LocalizedModuleContent;
}

/* ────────────────────────────── Source packs (CDN) ─────────────────── */

interface MasterContentPackItems {
  version: string;
  target_lang: string; // e.g., "ka"
  schema_version: string; // bump on schema changes
  generated_at: string; // ISO8601 UTC
  total_assets_bytes_raw: number; // informational/debug
  alphabet_items: MasterAlphabetItem[];
  vocabulary_items: MasterVocabularyItem[];
  grammar_items: MasterGrammarItem[];
}

interface MasterContentPackCourse {
  version: string;
  target_lang: string;
  schema_version: string;
  generated_at: string;
  total_assets_bytes_raw: number;
  lessons: MasterLesson[];
  modules: MasterModule[];
}

interface NativeContentPackItems {
  version: string;
  target_lang: string; // e.g., "ka"
  native_lang: string; // e.g., "en"
  schema_version: string;
  generated_at: string;
  alphabet_items: NativeAlphabetItem[];
  vocabulary_items: NativeVocabularyItem[];
  grammar_items: NativeGrammarItem[];
}

interface NativeContentPackCourse {
  version: string;
  schema_version: string;
  target_lang: string;
  native_lang: string;
  generated_at: string;
  lessons: NativeLesson[];
  modules: NativeModule[];
}

/* ────────────────────────────── Localized bundle (client-built) ────── */

interface LocalizedContentPackMeta {
  /** Opaque identifier of this localized bundle (hash or UUID). */
  pack_id: string;
  target_lang: string;
  native_lang: string;
  schema_version: string;
  generated_at: string;
  source_versions: {
    master_items: string;
    native_items: string;
    master_course: string;
    native_course: string;
  };
  /** Optional sanity/debug information mirroring manifest counts. */
  stats?: {
    alphabet_items: number;
    vocabulary_items: number;
    grammar_items: number;
    lessons: number;
    modules: number;
    total_assets_bytes_raw?: number;
  };
  /** Optional: include if you want CDN swap without app redeploy. */
  asset_bases?: {
    alphabet: { image_base: string; audio_base: string };
    vocabulary: { image_base: string; audio_base: string };
    grammar: { image_base: string; audio_base: string };
    lesson_thumbs_base: string;
    module_thumbs_base: string;
  };
}

interface LocalizedContentPackData {
  /** O(1) lookups by id. */
  alphabetItemsById: Record<string, LocalizedAlphabetItem>;
  vocabularyItemsById: Record<string, LocalizedVocabularyItem>;
  grammarItemsById: Record<string, LocalizedGrammarItem>;
  lessonsById: Record<string, LocalizedLesson>;
  modulesById: Record<string, LocalizedModule>;
  /** Inverse edges for fast incremental materialization. */
  itemIdToLessonIds: Record<string, string[]>;
  lessonIdToModuleIds: Record<string, string[]>;
  /** Optional canonical render order for listings. */
  lessonOrder?: string[];
  moduleOrder?: string[];
}

interface LocalizedContentPack {
  meta: LocalizedContentPackMeta;
  data: LocalizedContentPackData;
}

/* ────────────────────────────── Manifest ───────────────────────────── */

interface ContentPackManifest {
  version: string; // manifest version
  target_lang: string; // e.g., "ka"
  schema_version: string; // must match packs' schema_version
  generated_at: string; // ISO8601 UTC
  total_assets_bytes_raw: number;

  // Master items pack
  master_content_pack_items_version: string;
  master_content_pack_alphabet_items_count: number;
  master_content_pack_vocabulary_items_count: number;
  master_content_pack_grammar_items_count: number;

  // Master course pack
  master_content_pack_course_version: string;
  master_content_pack_lessons_count: number;
  master_content_pack_modules_count: number;

  // Native packs keyed by learner locale (one-level codes like "en", "es")
  native_content_packs: Record<
    string,
    {
      native_content_pack_items_version: string;
      native_content_pack_alphabet_items_count: number;
      native_content_pack_vocabulary_items_count: number;
      native_content_pack_grammar_items_count: number;

      native_content_pack_course_version: string;
      native_content_pack_lessons_count: number;
      native_content_pack_modules_count: number;
    }
  >;
}
```
