'use client';

import {
  getLocalizedPathnameForLocale,
  PREFERRED_LOCALE_KEY,
  type SupportedLocale,
  supportedLocales,
} from '@game-client/i18n';
import { useCurrentRouteLocale, useNavigation } from '@game-client/navigation';
import { RadioButton } from '@game-client/ui/components/inputs/radio-button';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelHeader } from '@game-client/ui/components/panel/panel-header';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function SettingsClient() {
  const { t } = useTranslation('settings');
  const { i18n } = useTranslation('common');
  const { localizedPathname, navigate } = useNavigation();
  const currentLocale = useCurrentRouteLocale();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleLanguageSwitch = (locale: SupportedLocale) => {
    if (locale === currentLocale || isSwitching) return;
    setIsSwitching(true);
    const newPath = getLocalizedPathnameForLocale(localizedPathname, locale);
    i18n
      .changeLanguage(locale)
      .then(() => {
        Cookies.set(PREFERRED_LOCALE_KEY, locale, { path: '/' });
        navigate(newPath);
      })
      .catch(() => {
        setIsSwitching(false);
      });
  };

  return (
    <main className="flex flex-col h-full">
      <Panel>
        <PanelHeader context={t('app_settings')} title={t('language_section')} variant="default" />
        <PanelSection>
          <fieldset className="border-none p-0">
            <legend className="sr-only">{t('language_section')}</legend>
            {supportedLocales.map((locale) => (
              <RadioButton
                key={locale}
                name="language"
                value={locale}
                label={t(`languages.${locale}`)}
                checked={locale === currentLocale}
                disabled={isSwitching}
                onChange={() => handleLanguageSwitch(locale)}
              />
            ))}
          </fieldset>
        </PanelSection>
      </Panel>
    </main>
  );
}
