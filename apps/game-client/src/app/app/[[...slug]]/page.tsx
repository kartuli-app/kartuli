'use client';

import { AppShell } from '@/domains/app/components/app-shell/app-shell';

// Single entry point for all /app/* routes
// AppShell wraps AppContent, which handles all routing internally via usePathname()
export default function AppPage() {
  return <AppShell />;
}
