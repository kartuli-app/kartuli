'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Client-side redirect as fallback (Next.js config redirect should handle it, but this ensures it works)
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/app/freestyle');
  }, [router]);

  return null;
}
