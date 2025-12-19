import '../styles/globals.css';
import { clsx } from 'clsx';
import { Noto_Sans_Georgian } from 'next/font/google';
import { ServiceWorkerRegister } from './service-worker-register';

const font = Noto_Sans_Georgian({
  subsets: ['georgian'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-georgian',
});

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * TODO: Disable analytics and tracking during CI audits
   * This prevents analytics from skewing Lighthouse performance scores
   * Ideally, we should measure bot:
   * - with analytics (real users performance)
   * - without analytics (reference performance)
   */
  const _isCiAudit = process.env.CI_AUDIT === 'true';

  return (
    <html lang="en" className={clsx(font.variable)}>
      <body
        className={clsx(
          //
          'h-[100dvh]',
          'font-noto-sans-georgian',
          /**
           *  set the background color here to target some mobile browser nudge bars
           *  we want the nudge bars to have the same bg color as the dock
           *  when the dock is in the side, we want the nudge bars to have the same bg color as the app
           */
          'bg-ds-dock-bg lg:bg-ds-app-bg',
          'overflow-hidden',
        )}
      >
        {children}
        <ServiceWorkerRegister />
        {/* TODO: Future: Add analytics scripts here with !_isCiAudit condition */}
        {/* TODO: Current status: CI_AUDIT={_isCiAudit ? 'enabled' : 'disabled'} */}
      </body>
    </html>
  );
}
