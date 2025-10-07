### Data Model

#### Letters
- **id** — stable slug, e.g., `letter_a`
- **glyph** — target script letter, e.g., `ა`
- **name_target** — target name, e.g., `ანი`
- **name_translit** — Latin transliteration, e.g., `ani`
- **label_native** — native language label, e.g., `a`
- **images** — array of SVG paths
- **audios** — array of audio paths
- **usage_native** — short usage hint, e.g., "like 'a' in father"

#### Words *(shared core data)*
- **id** — stable slug, e.g., `hello`
- **term_target** — target script word, e.g., `გამარჯობა`
- **transliteration** — Latin transliteration, e.g., `gamarjoba`
- **images** — array of image paths
- **audios** — array of audio paths
- **examples** — array of objects with:
  - `sentence_target`
  - `sentence_translit` *(optional)*
  - `sentence_native` *(provided via native content packs; fallback to English)*

#### Modules
- **id** — slug, e.g., `animals`
- **area** — `"alphabet"` or `"vocabulary"`
- **title_native** — display title in native language
- **title_target** — display title in target language (optional)
- **item_type** — `"letter"` or `"word"`
- **item_ids** — ordered array of item ids

#### Lessons
- **id** — slug, e.g., `greetings_intro`
- **module_id** — reference to parent module
- **title_native** — display title in native language; fallback to English content pack
- **title_target** — optional target-language name
- **item_type** — `"letter"` or `"word"`
- **item_ids** — ordered array of 4–6 item ids

#### Metadata
- **pack_id** — language pair, e.g., `en-ka`
- **version** — semantic version, e.g., `0.1`
- **created_at** — ISO date
- **language_target** — target language code
- **language_native** — native language code
- **assets_version** — version of assets
- **description** — human-readable description

#### Notes
- `letters` and `words` use dictionaries for constant-time lookup
- `modules` and `lessons` stay as ordered arrays to preserve author intent
- Native content packs add `label_native`, `usage_native`, `sentence_native` per `lang`; missing fields fall back to English content pack
- Games are generated at runtime rather than stored in packs
