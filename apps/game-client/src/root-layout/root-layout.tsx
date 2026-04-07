import './globals.css';
import {
  defaultLocale,
  I18nProvider,
  type SupportedLocale,
  supportedLocales,
} from '@game-client/i18n';
import clsx from 'clsx';
import { redirect } from 'next/navigation';
import { RootDatabaseInitializer } from './root-database-initializer';
import { RootQueryClientProvider } from './root-query-client-provider';

function getRedirectUrlForUnsupportedLocalePath(locale: string): string {
  return `/${defaultLocale}/unsupported-locale/${locale}`;
}

export async function RootLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  if (!supportedLocales.includes(locale as SupportedLocale)) {
    return redirect(getRedirectUrlForUnsupportedLocalePath(locale));
  }
  return (
    <html
      lang={locale}
      className={clsx(
        //
        'bg-brand-dock-bg md:bg-brand-app-bg',
        'text-brand-text-800',
      )}
    >
      <body className="h-dvh flex">
        <RootQueryClientProvider>
          <RootDatabaseInitializer />
          <I18nProvider locale={locale}>{children}</I18nProvider>
        </RootQueryClientProvider>
      </body>
    </html>
  );
}
