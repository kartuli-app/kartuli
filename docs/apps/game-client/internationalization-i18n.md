---
section: Apps/Game Client
title: Internationalization (i18n)
description: How locale and translations are implemented in the game client — URL-based locale, type-safe keys, and how to add a new language.
type: standard
---

# Internationalization (i18n) — game client

## Overview

The game client supports multiple languages with **URL-based locale**: the first path segment is the language (`/en`, `/ru`). There is no middleware; locale is derived on the client from the path. Translations are type-safe and live in TypeScript locale files. Preferred locale is stored in `localStorage` and used when the user visits `/`.

Product context and phases: [Offline Multilanguage Game POC](../../product/offline-multilanguage-game-poc.md).

---

## Implementation summary

| What | Where |
|------|--------|
| **Locale from URL** | First path segment; parsed in `pathToLang()` and in `parseRoute()` for view routing |
| **i18n runtime** | `i18next` + `react-i18next`; initialized in `config.ts` with namespace resources |
| **Provider** | `I18nShell` wraps the app: derives `lang` from path, sets `document.documentElement.lang`, redirects `/` to preferred locale, wraps children in `I18nProvider` which calls `i18n.changeLanguage(lang)` |
| **Locale files** | `apps/game-client/src/locales/{lang}/{namespace}.ts` (e.g. `en/common.ts`, `ru/game.ts`, `en/metadata.ts`) with `as const` exports |
| **Metadata (SEO)** | `metadata` namespace holds `title`, `description`, and `keywords` per locale; `getLocaleMetadata(lang, pathSegments)` builds Next.js `Metadata` (title, description, keywords, openGraph, twitter) and, when path segments are passed, `alternates.canonical` and `alternates.languages` (hreflang). `generateMetadata` in the catch-all page calls it so each route gets locale-specific meta and correct canonical + language links. |
| **Type-safe keys** | `i18next.d.ts` augments i18next so `t('common.save')` etc. are type-checked against the locale shape |
| **Language switcher** | `LanguageSwitcher` in the shell header; switches locale + URL and persists to `localStorage` |
| **Supported locales** | Defined in `config.ts` (`supportedLngs`) and in `route-utils.ts` (`SUPPORTED_LANGS`); both must stay in sync |
| **Static paths** | `generateStaticParams` in `app/[[...spaRoute]]/page.tsx` pre-renders `/`, `/en`, `/ru` (and any new locale roots you add) |

---

## Developer experience

### Working with translations

1. **Use the correct namespace**  
   Namespaces are per domain: `common` (shared: save, cancel, home, language names, SW banner, etc.), `game`, `learn`, `debug`, `metadata` (SEO title, description, keywords; used server-side by `generateMetadata`, not via `t()` in UI). Use the namespace that owns the string (e.g. learn screen → `useTranslation('learn')`).

2. **Call `t()` with typed keys**  
   Keys are inferred from the locale modules. Use dot notation for nested keys: `t('common.sw.dismiss')`, `t('learn.back')`. If you add a new key to a locale file, add it to **all** locale files for that namespace (en, ru, and any future locales) so types and runtime stay consistent.

3. **Shared components (e.g. in `packages/ui`)**  
   Do **not** put i18n inside the shared package. The consumer (game-client) calls `t()` and passes the result as props. Example: `DeploymentDebugPanel` receives `labels` and `appName`; the game-client debug page builds `labels` from `t('debug.…')` and passes them in.

4. **Navigation and `lang`**  
   Use `useLang()` from `domains/i18n/use-lang` to get the current locale and build paths: `navigate(\`/${lang}/learn/${lessonId}\`)` so links stay locale-aware.

5. **Testing**  
   Unit tests that render the shell mock `../utils/browser` (including `setDocumentLang`). E2E smoke tests for locale and language switcher live in `tools/e2e/tests/game-client/production/i18n.spec.ts` and assert `html` `lang` and visible content per locale.

### Adding or changing translation keys

- **Add the key** in every locale file for that namespace, e.g. `locales/en/common.ts` and `locales/ru/common.ts`.
- Keep the **same key structure** in all locales (only values differ). The `i18next.d.ts` types are driven by the English locale shape; other locales must match that shape.
- Use **nested objects** where it helps: e.g. `sw: { dismiss: 'Dismiss', ... }` in `common` so keys stay grouped.

---

## Adding a new locale (e.g. Spanish `es`)

To support a new locale such as `es`, update the following in order. This keeps routing, i18n config, static generation, and (optionally) the service worker in sync.

### 1. Locale files

Create a new folder and one file per namespace, mirroring the existing locales:

- `apps/game-client/src/locales/es/common.ts`
- `apps/game-client/src/locales/es/debug.ts`
- `apps/game-client/src/locales/es/game.ts`
- `apps/game-client/src/locales/es/learn.ts`
- `apps/game-client/src/locales/es/metadata.ts` (title, description, keywords for SEO; used by `generateMetadata`)

Copy the structure from `locales/en/*.ts` (or `ru`) and replace the values with Spanish. Export with `as const` so types stay consistent.

### 2. i18n config

**File:** `apps/game-client/src/domains/i18n/config.ts`

- Add `supportedLngs`: change to `['en', 'ru', 'es'] as const`.
- Import the new locale modules (e.g. `esCommon`, `esDebug`, `esGame`, `esLearn`, `esMetadata`).
- Add an `es` key to the `resources` object with the same namespace structure as `en` and `ru` (including `metadata`).
- Add `'metadata'` to the `ns` array if not already present.

### 3. Routing (app shell)

**File:** `apps/game-client/src/domains/app-shell/route-utils.ts`

- Add `'es'` to `SUPPORTED_LANGS`: `const SUPPORTED_LANGS = ['en', 'ru', 'es'] as const`.
- No other change needed; `parseRoute` and `isSupportedLang` will then accept `es` as the first segment.

### 4. Static generation

**File:** `apps/game-client/src/app/[[...spaRoute]]/page.tsx`

- Add the new locale root to `STATIC_PATHS`, e.g. `{ spaRoute: ['es'] }`, so that `/es` is pre-rendered at build time.

### 5. Locale-specific metadata (SEO)

**File:** `apps/game-client/src/config/get-locale-metadata.ts`

- Import the new locale’s metadata module (e.g. `esMetadata` from `../locales/es/metadata`).
- Add `es: esMetadata` to `metadataByLocale` (must include `title`, `description`, `keywords`).
- Add `es: 'es_ES'` (or the appropriate [Open Graph locale](https://ogp.me/#optional)) to `ogLocaleByLang`.
- Add `es: 'es'` to `hreflangByLang` so alternates.languages (hreflang) uses the correct code.

### 6. Language switcher (UX)

**File:** `apps/game-client/src/domains/i18n/LanguageSwitcher.tsx`

- Currently the switcher is built for **two** locales (`OTHER_LANG: Record<SupportedLng, SupportedLng>` and a single “other” button). For a **third** locale you have two options:
  - **Option A:** Extend the mapping (e.g. cycle: en → ru → es → en) and keep a single “Switch to next” button.
  - **Option B:** Replace the single button with a small dropdown or list of locale links so the user can pick any language.

- Add the new language label to **common** in every locale: e.g. `langEs: 'Spanish'` (and the localized form in each language). Use it in the switcher UI for the new option.

### 7. Service worker (offline)

The service worker currently precaches only `/en` and serves `/en` and `/en/*` from cache. To support `/es` (and `/ru`) offline:

- **File:** `apps/game-client/src/domains/service-worker/get-aditional-precache-entries.ts`  
  Add entries for each locale root you want offline, e.g. `{ url: '/es', revision }` (and `/ru` if not already there), using the same `revision` as for `/en`.

- **File:** `apps/game-client/src/domains/service-worker/service-worker.ts`  
  Update the fetch handler so that navigation to `/es` and `/es/*` (and other locale roots) is served from the precached shell for that locale, in the same way as `/en` and `/en/*`. Today the logic is hardcoded to `/en`; it would need to branch on the first path segment or a small allowlist of locale roots.

### 8. E2E and debug expectations (optional)

- If you have e2e tests that assert locale-specific content, add a test for `/es` (and the switcher to/from `es`) in `tools/e2e/tests/game-client/production/i18n.spec.ts`.
- If you use shared debug-page expectations and want the debug page under `/es/debug` to be covered, extend the expectations or e2e config as needed (e.g. add `es` to the list of locales under test).

### 9. i18next type declarations (optional)

**File:** `apps/game-client/src/domains/i18n/i18next.d.ts`

- The `resources` type there is used for **key** structure, not for listing every locale. Typically it’s driven by one locale (e.g. English). You do **not** need to add `es` to this file unless you introduce a new namespace or key shape that TypeScript should know about.

---

## References

### In-repo code

- [I18n config](https://github.com/kartuli-app/kartuli/blob/main/apps/game-client/src/domains/i18n/config.ts)
- [Route utils (SUPPORTED_LANGS)](https://github.com/kartuli-app/kartuli/blob/main/apps/game-client/src/domains/app-shell/route-utils.ts)
- [Locale files](https://github.com/kartuli-app/kartuli/blob/main/apps/game-client/src/locales/)
- [Static params and generateMetadata](https://github.com/kartuli-app/kartuli/blob/main/apps/game-client/src/app/[[...spaRoute]]/page.tsx)
- [getLocaleMetadata](https://github.com/kartuli-app/kartuli/blob/main/apps/game-client/src/config/get-locale-metadata.ts)

### Related docs

- [Offline Multilanguage Game POC](../../product/offline-multilanguage-game-poc.md) — Product spec and phases
- [Game Client Hub](./index.md) — Overview and links
