import '../styles/globals.css';
import { clsx } from 'clsx';
import { Noto_Sans_Georgian } from 'next/font/google';

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
  // TODO: Disable analytics and tracking during CI audits
  // TODO: This prevents analytics from skewing Lighthouse performance scores
  // TODO: const _isCiAudit = process.env.CI_AUDIT === 'true';

  return (
    <html lang="en" className={clsx(font.variable)}>
      <body
        className={clsx(
          //
          'h-[100dvh]',
          'font-noto-sans-georgian',
          // we set the background color here to target some mobile browser nudge bars
          'bg-violet-50',
          'text-slate-800',
          'overflow-hidden',
        )}
      >
        {children}
        {/* TODO: Future: Add analytics scripts here with !_isCiAudit condition */}
        {/* TODO: Current status: CI_AUDIT={_isCiAudit ? 'enabled' : 'disabled'} */}
      </body>
    </html>
  );
}
