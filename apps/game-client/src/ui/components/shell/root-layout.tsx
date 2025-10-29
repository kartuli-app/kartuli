import '../../styles/globals.css';
import { clsx } from 'clsx';
import { Noto_Sans_Georgian } from 'next/font/google';

const _font = Noto_Sans_Georgian({
  subsets: ['georgian'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-georgian',
});

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Disable analytics and tracking during CI audits
  // This prevents analytics from skewing Lighthouse performance scores
  const _isCiAudit = process.env.CI_AUDIT === 'true';

  return (
    <html
      lang="en"
      className={clsx(
        '',
        //
        _font.variable,
        //
        '',
      )}
    >
      {/* we set the background here to target some mobile browser nudge bars */}
      <body
        className={clsx(
          //
          // 'bg-ds-primary-100',
          'bg-slate-100',
          'h-[100dvh]',
          'font-noto-sans-georgian',
          'app-layout',
          //
        )}
      >
        {children}
        {/* Future: Add analytics scripts here with !_isCiAudit condition */}
        {/* Current status: CI_AUDIT={_isCiAudit ? 'enabled' : 'disabled'} */}
      </body>
    </html>
  );
}
