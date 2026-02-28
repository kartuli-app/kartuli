'use client';

import { useTranslation } from 'react-i18next';
import { useRouterContext } from '../app-shell/use-router-context';
import type { SupportedLng } from './config';
import { PREFERRED_LOCALE_KEY } from './I18nShell';
import { useLang } from './use-lang';

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
      <span className="text-sm opacity-80">{lang === 'en' ? t('langEn') : t('langRu')}</span>
      <button
        type="button"
        onClick={switchLang}
        className="rounded border border-input bg-background px-2 py-1 text-sm hover:bg-muted"
        aria-label={`Switch to ${other}`}
      >
        {other === 'en' ? t('langEn') : t('langRu')}
      </button>
    </div>
  );
}
