import { defaultLocale } from '@game-client/i18n';

/**
 * Path prefix for the app's default locale, derived from the app's i18n config
 * so tests stay in sync if the default locale changes.
 *
 * Use this in page specs that aren't about locale-specific behavior
 * (locale-specific tests live in i18n.spec.ts).
 *
 * @example `${defaultLocaleBase}/learn` -> `/en/learn`
 */
export const defaultLocaleBase = `/${defaultLocale}`;
