'use client';

import {
  getCurrentSupportedLocale,
  getLocalizedPathnameForLocale,
  PREFERRED_LOCALE_KEY,
  type SupportedLocale,
  supportedLocales,
} from '@game-client/i18n';
import { useNavigation } from '@game-client/navigation';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import { cn } from '@kartuli/ui/utils/cn';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { IoLanguage } from 'react-icons/io5';

function LanguageSwitchButton({
  locale,
  label,
  onClick,
}: Readonly<{
  locale: SupportedLocale;
  label: string;
  onClick: (locale: SupportedLocale) => void;
}>) {
  return (
    <button
      type="button"
      onClick={() => onClick(locale)}
      className={clsx(
        'cursor-pointer',
        'focus-ring',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'bg-ds1-color-text-200',
        'hover:bg-ds1-color-text-300',
        'data-[pressed]:bg-ds1-color-text-300',
        'active:scale-95',
        'transition-transform duration-300',
        'border',
        'border-ds1-color-text-300',
        'inline-flex items-center gap-3 rounded-xl px-4 py-3',
        'w-full sm:w-auto',
        'text-left font-bold text-ds1-color-text-900',
      )}
      aria-label={label}
    >
      <HiOutlineSwitchHorizontal className="size-5 shrink-0 text-ds1-color-text-700" />
      <span>{label}</span>
    </button>
  );
}

export function SettingsClient({
  initialLocale,
}: Readonly<{
  initialLocale: SupportedLocale;
}>) {
  const { t } = useTranslation('settings');
  const { i18n } = useTranslation('common');
  const { localizedPathname, navigate } = useNavigation();
  const currentLocale = getCurrentSupportedLocale(i18n.resolvedLanguage, initialLocale);
  const currentLanguageLabel = t(`languages.${currentLocale}`);
  const switchableLocales = supportedLocales.filter((locale) => locale !== currentLocale);

  const handleLanguageSwitch = (locale: SupportedLocale) => {
    Cookies.set(PREFERRED_LOCALE_KEY, locale, { path: '/' });
    const newPath = getLocalizedPathnameForLocale(localizedPathname, locale);
    i18n.changeLanguage(locale).then(() => {
      navigate(newPath);
    });
  };

  return (
    <main>
      <ResponsiveContainer className="py-ds1-spacing-xlarge sm:py-ds1-spacing-3xlarge">
        <section
          aria-labelledby="settings-language-section-title"
          className={cn(
            'flex w-full flex-col gap-ds1-spacing-large',
            'rounded-3xl border border-ds1-color-text-300 bg-ds1-color-text-50',
            'p-ds1-spacing-large sm:p-ds1-spacing-xlarge',
            'shadow-sm',
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-full',
                'border border-ds1-color-text-300 bg-ds1-color-text-200',
              )}
              aria-hidden="true"
            >
              <IoLanguage className="size-5 text-ds1-color-text-700" />
            </div>
            <h1
              id="settings-language-section-title"
              className="text-sm font-extrabold uppercase tracking-[0.18em] text-ds1-color-text-600"
            >
              {t('language_section')}
            </h1>
          </div>

          <p className="text-lg font-semibold text-ds1-color-text-900">
            {t('current_language', { language: currentLanguageLabel })}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {switchableLocales.map((locale) => (
              <LanguageSwitchButton
                key={locale}
                locale={locale}
                label={t(`languages.${locale}`)}
                onClick={handleLanguageSwitch}
              />
            ))}
          </div>
        </section>
      </ResponsiveContainer>
    </main>
  );
}
