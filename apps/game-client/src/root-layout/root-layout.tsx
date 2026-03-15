import { ServiceWorkerProvider } from '@game-client/service-worker/service-worker-provider';
import './globals.css';
import clsx from 'clsx';
import { Noto_Sans_Georgian } from 'next/font/google';
import { RootQueryClientProvider } from './root-query-client-provider';

const notoSansGeorgian = Noto_Sans_Georgian({
  weight: ['400', '700'],
  display: 'block',
  variable: '--font-noto-sans-georgian',
});

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        notoSansGeorgian.variable,
        //
        'bg-brand-neutral-100',
        'text-brand-neutral-900',
        'scrollbar-gutter-stable',
      )}
    >
      <body className="h-dvh flex font-noto-sans-georgian ">
        <RootQueryClientProvider>
          <ServiceWorkerProvider>{children}</ServiceWorkerProvider>
        </RootQueryClientProvider>
      </body>
    </html>
  );
}
