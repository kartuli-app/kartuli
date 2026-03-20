'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function RootQueryClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => {
    console.info('💾 [root-query-client-provider] 💾 creating query client');
    return new QueryClient();
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
