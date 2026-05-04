import './globals.css';
import { I18nProvider } from '@game-client/i18n';
import { cn } from '@kartuli/ui/utils/cn';
import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import { RootDatabaseInitializer } from './root-database-initializer';
import { RootQueryClientProvider } from './root-query-client-provider';

const georgianFont = localFont({
  src: '../../public/fonts/mersad.ttf',
  variable: '--font-georgian',
  display: 'swap',
});

const defaultFont = Manrope({
  subsets: ['latin'],
  variable: '--font-default',
  display: 'swap',
});

export async function RootLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  return (
    <html
      lang={locale}
      className={cn(georgianFont.variable, defaultFont.variable, defaultFont.className)}
    >
      <body className="bg-white text-black">
        <RootQueryClientProvider>
          <RootDatabaseInitializer />
          <I18nProvider locale={locale}>{children}</I18nProvider>
        </RootQueryClientProvider>
      </body>
    </html>
  );
}
