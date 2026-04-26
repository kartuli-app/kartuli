import '../../root-layout/globals.css';
import clsx from 'clsx';
import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

const georgianFont = localFont({
  src: '../../../public/fonts/mersad.ttf',
  variable: '--font-georgian',
  display: 'swap',
});

const defaultFont = Manrope({
  subsets: ['latin'],
  variable: '--font-default',
  display: 'swap',
});

export default function PosterRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={clsx(
        georgianFont.variable,
        defaultFont.variable,
        defaultFont.className,
        'bg-stone-200',
        'text-ds1-color-text-800',
      )}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
