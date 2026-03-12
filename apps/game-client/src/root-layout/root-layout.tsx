import { ServiceWorkerProvider } from '@game-client/service-worker/service-worker-provider';
import './globals.css';
import { Noto_Sans_Georgian } from 'next/font/google';

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
    <html lang="en" className={`${notoSansGeorgian.variable} scrollbar-gutter-stable bg-black`}>
      <body className="h-dvh flex font-noto-sans-georgian">
        <ServiceWorkerProvider>{children}</ServiceWorkerProvider>
      </body>
    </html>
  );
}
