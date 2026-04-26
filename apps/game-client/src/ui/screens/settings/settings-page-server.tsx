import { type SupportedLocale, supportedLocales } from '@game-client/i18n';
import { SettingsClient } from './settings-client';

export async function SettingsPageServer({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const initialLocale = supportedLocales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : supportedLocales[0];

  return <SettingsClient initialLocale={initialLocale} />;
}
