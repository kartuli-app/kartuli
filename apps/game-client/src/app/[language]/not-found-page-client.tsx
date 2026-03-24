'use client';
import { usePathname } from 'next/navigation';

export function NotFoundPageClient() {
  const pathname = usePathname();
  return (
    <div>
      <p>Requested resource not found: {pathname}</p>
    </div>
  );
}
