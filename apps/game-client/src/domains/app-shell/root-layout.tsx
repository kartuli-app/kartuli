import { SerwistProviderWrapper } from '../../app/serwist-provider';
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
    <html lang="en" className={`${notoSansGeorgian.variable}`}>
      <body className="h-dvh flex font-noto-sans-georgian">
        <SerwistProviderWrapper>{children}</SerwistProviderWrapper>
      </body>
    </html>
  );
}
