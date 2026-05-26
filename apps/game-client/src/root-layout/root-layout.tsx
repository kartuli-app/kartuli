import './globals.css';
import type { SupportedLocale } from '@game-client/i18n';
import { I18nProvider } from '@game-client/i18n';
import { cn } from '@kartuli/ui/utils/cn';
import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import { RootDatabaseInitializer } from './root-database-initializer';
import { RootQueryClientProvider } from './root-query-client-provider';

const georgianFont = localFont({
  src: '../../public/fonts/mersad.ttf',
  variable: '--font-georgian-family',
  display: 'swap',
});

const defaultFont = Manrope({
  subsets: ['latin'],
  variable: '--font-default-family',
  display: 'swap',
});

export function RootLayout({
  children,
  locale,
}: Readonly<{
  locale: SupportedLocale;
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={locale}
      className={cn(georgianFont.variable, defaultFont.variable, defaultFont.className)}
    >
      <body className="bg-s-color-shell-bg h-dvh flex">
        <RootQueryClientProvider>
          <RootDatabaseInitializer />
          <I18nProvider locale={locale}>{children}</I18nProvider>
        </RootQueryClientProvider>
      </body>
    </html>
  );
}
