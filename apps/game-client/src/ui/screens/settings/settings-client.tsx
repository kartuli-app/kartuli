'use client';

import {
  getCurrentSupportedLocale,
  getLocalizedPathnameForLocale,
  PREFERRED_LOCALE_KEY,
  type SupportedLocale,
  supportedLocales,
} from '@game-client/i18n';
import { useNavigation } from '@game-client/navigation';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

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
      className="focus-ring w-full rounded-xl border border-ds1-color-text-300 px-4 py-3 text-left font-semibold text-ds1-color-text-900 transition-colors hover:bg-ds1-color-text-100"
      aria-label={label}
    >
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
    <main className="px-6 py-10 sm:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('language_section')}
          </h1>
          <p className="max-w-2xl text-base text-ds1-color-text-700 sm:text-lg">
            {t('current_language', { language: currentLanguageLabel })}
          </p>
        </div>

        <ul aria-label={t('language_section')} className="flex w-full max-w-sm flex-col gap-3">
          {switchableLocales.map((locale) => (
            <li key={locale}>
              <LanguageSwitchButton
                locale={locale}
                label={t(`languages.${locale}`)}
                onClick={handleLanguageSwitch}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
