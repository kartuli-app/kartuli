import './globals.css';

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh flex">{children}</body>
    </html>
  );
}
