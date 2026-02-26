import { SerwistProviderWrapper } from '../../app/serwist-provider';
import './globals.css';

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh flex">
        <SerwistProviderWrapper>{children}</SerwistProviderWrapper>
      </body>
    </html>
  );
}
