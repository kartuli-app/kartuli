### Localization Strategy

- Default canonical language is English
- URLs follow `/<lang>/<targetLang>` pattern (e.g., `/en/ka`, `/es/ka`)
- UI strings localize using a server-provided translation provider keyed by `lang`; English assets serve as fallback for untranslated strings
- Content packs localize per `targetLang`, layering native-language translations on shared target-language items; if a native-language pack lacks a word, the system falls back to the English content while retaining the item
- Language preference persists in `localStorage`/`IndexedDB`; returning students are redirected client-side when their saved language differs from the current route, with an override option exposed on the redirect screen
- First-time visitors stay on the default `/en/ka` route, while deep links respect the shared URL
- User progress is keyed by target language and shared across native content packs; switching from Spanish UI to English retains mastered letters/words
- Unsupported combinations render a static `UnsupportedLanguagePage` with links to supported pairs and optional `noindex` metadata
