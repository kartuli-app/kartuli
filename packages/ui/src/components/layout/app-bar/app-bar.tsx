import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { ContentContainer } from '../shell/content-container';

export interface AppBarProps {
  leading?: ReactNode;
  title: ReactNode;
  trailingPrimary?: ReactNode;
  trailingSecondary?: ReactNode;
}

const actionSlotClassName = cn('flex', 'shrink-0', 'items-center', 'justify-center', 'size-12');

export function AppBar({
  leading,
  title,
  trailingPrimary,
  trailingSecondary,
}: Readonly<AppBarProps>) {
  return (
    <header
      className={cn(
        'flex',
        'h-height-appbar',
        'items-center',
        'bg-s-color-shell-bg',
        'border-b-(length:--s-width-shell-border)',
        'border-s-color-shell-border-mobile',
        'xl:border-s-color-shell-border',
      )}
    >
      <ContentContainer>
        <div
          className={cn(
            'flex',
            'min-w-0',
            'w-full',
            'items-center',
            'justify-start',
            'gap-p-spacing-2',
          )}
        >
          {leading ? <div className={actionSlotClassName}>{leading}</div> : null}

          {title}

          <div className={cn('flex', 'shrink-0', 'flex-nowrap', 'items-center', 'gap-p-spacing-2')}>
            <div className={actionSlotClassName}>{trailingSecondary}</div>
            <div className={actionSlotClassName}>{trailingPrimary}</div>
          </div>
        </div>
      </ContentContainer>
    </header>
  );
}
