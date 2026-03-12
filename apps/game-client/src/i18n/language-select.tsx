'use client';

import type { SupportedLng } from '@game-client/i18n/supported-locales';
import { useLang } from '@game-client/i18n/use-lang';
import { PREFERRED_LOCALE_KEY } from '@game-client/local-storage/preferred-locale-key';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const OTHER_LANG: Record<SupportedLng, SupportedLng> = {
  en: 'ru',
  ru: 'en',
};

export function LanguageSelect({ className }: Readonly<{ className?: string }>) {
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
    <select
      value={lang}
      onChange={switchLang}
      className={clsx(
        //
        'p-brand-regular',
        'rounded-lg',
        'text-sm',
        'cursor-pointer',
        'border',
        'border-brand-neutral-50',
        'text-brand-neutral-50',
        'hover:bg-brand-primary-400',
        '[&>option]:text-brand-neutral-900',
        className,
      )}
    >
      <option value="en">{t('langEn')}</option>
      <option value="ru">{t('langRu')}</option>
    </select>
  );
}
