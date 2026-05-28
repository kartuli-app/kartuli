'use client';

import type { ReactNode } from 'react';

export function StudyDetailFrame({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-4 pt-[10%] @container">
      {children}
    </div>
  );
}
