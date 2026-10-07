---
description: Translation initialization, resource namespaces, route locale and cookie behavior.
status: implemented
intent: reference
---

# i18next and Locale Cookies

## Role and configuration

Game Client `src/i18n/i18n-config.ts` initializes i18next with `initReactI18next`, bundled resources, the default locale, `common` as default namespace and `fallbackLng: false`. Namespace names are derived from the default resource object. Interpolation escaping is disabled because React escapes rendered text; avoid sending those values to unsafe HTML sinks.

Locale routing is separate from translation lookup. `src/proxy.ts` resolves a supported cookie preference, then the first Accept-Language entry, then English, and redirects bare paths. `src/i18n/i18n-constants.ts` defines `en`, `ru` and `preferred-locale`.

## Changing translations or locales

Update the appropriate namespace resources for both supported locales. Check keys in the UI, including settings/options, page titles and recovery states. Missing translations are not automatically covered by a fallback language because fallback is disabled.

Adding a locale also requires route/proxy matcher review, supported-locale helpers, content localization data, resource assembly, metadata and tests. Do not change only the resource import and assume routing accepts it.

## js-cookie and persistence

The settings client writes the `preferred-locale` cookie with `path: '/'` and no explicit expiry. Treat it as the current session-cookie configuration, not a documented permanent preference. This cookie influences later requests; translation state and the current URL still need to remain consistent during client navigation.

## Verification and troubleshooting

Game Client test setup imports the i18n initializer. A test using a fresh module or different namespace may need explicit context rather than relying on unrelated test order. Check the route locale, resource namespace and key before changing fallback behavior to hide a missing string.

Use route tests and browser navigation to verify a preference change, a bare URL, unsupported locale input and a reload. Canonical route inventory is in [Game Client](../../01-apps/01-game-client/index.md); storage/privacy implications belong to [Data & Privacy](../../09-data-and-privacy/index.md).
