import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kartuli - Backoffice',
  description: 'Georgian language learning backoffice',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
