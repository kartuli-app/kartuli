'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

const studyNoteSectionAlignClassName = {
  center: 'items-center',
  start: 'items-start',
} as const;

const studyNoteSectionSizeClassName = {
  compact: 'gap-p-spacing-1',
  default: 'gap-p-spacing-2',
} as const;

export interface StudyNoteSectionProps {
  badge?: ReactNode;
  children: ReactNode;
  align?: 'center' | 'start';
  size?: 'compact' | 'default';
  className?: string;
}

export function StudyNoteSection({
  align = 'center',
  badge,
  children,
  className,
  size = 'default',
}: Readonly<StudyNoteSectionProps>) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-col',
        studyNoteSectionAlignClassName[align],
        studyNoteSectionSizeClassName[size],
        className,
      )}
    >
      {badge}
      {children}
    </div>
  );
}
