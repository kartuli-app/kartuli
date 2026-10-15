import './globals.css';

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-s-color-shell-bg text-s-color-shell-content-primary h-dvh flex">
        {children}
      </body>
    </html>
  );
}
