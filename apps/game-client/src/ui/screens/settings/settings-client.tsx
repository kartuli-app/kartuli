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
    <button type="button" onClick={() => onClick(locale)} className="border p-2" aria-label={label}>
      {label}
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
      <h1>{t('language_section')}</h1>
      <p>{t('current_language', { language: currentLanguageLabel })}</p>
      <ul aria-label={t('language_section')}>
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
    </main>
  );
}
