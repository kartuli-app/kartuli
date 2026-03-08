'use client';

import { defaultLng } from '@game-client/i18n/default-locale';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import { useLang } from '@game-client/i18n/use-lang';
import { PREFERRED_LOCALE_KEY } from '@game-client/local-storage/preferred-locale-key';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import { useTranslation } from 'react-i18next';

const OTHER_LANG: Record<SupportedLng, SupportedLng> = {
  en: 'ru',
  ru: 'en',
};

export function LanguageSwitcher() {
  const { t } = useTranslation('common');
  const lang = useLang();
  const { path, navigate } = useRouterContext();
  const other = OTHER_LANG[lang];

  const switchLang = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(PREFERRED_LOCALE_KEY, other);
    }
    const segments = path.split('/').filter(Boolean);
    const rest = segments.slice(1);
    const newPath = rest.length > 0 ? `/${other}/${rest.join('/')}` : `/${other}`;
    navigate(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm opacity-80">{lang === defaultLng ? t('langEn') : t('langRu')}</span>
      <button
        type="button"
        onClick={switchLang}
        className="rounded border border-input bg-background px-2 py-1 text-sm hover:bg-muted"
        aria-label={`Switch to ${other}`}
      >
        {other === defaultLng ? t('langEn') : t('langRu')}
      </button>
    </div>
  );
}
