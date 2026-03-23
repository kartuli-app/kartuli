import { defaultLng } from '@game-client/i18n/default-locale';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import { PREFERRED_LOCALE_KEY } from './preferred-locale-key';

export function getPreferredLocaleFromStorage(): SupportedLng {
  if (typeof localStorage === 'undefined') return defaultLng;
  try {
    const stored = localStorage.getItem(PREFERRED_LOCALE_KEY);
    if (stored && supportedLngs.includes(stored as SupportedLng)) {
      return stored as SupportedLng;
    }
  } catch {
    // ignore storage access errors
  }
  return defaultLng;
}
