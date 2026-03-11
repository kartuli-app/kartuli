'use client';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export type BannerAction = {
  label: string;
  onClick: () => void;
  children?: ReactNode;
};

export function BannerMessage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        //
        'font-bold text-xl',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function BannerButton({
  label,
  onClick,
  children,
  className,
}: BannerAction & { className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        //
        'px-3 py-1.5',
        'border border-white rounded',
        'hover:bg-white hover:text-black',
        className,
      )}
      aria-label={label}
    >
      {children ?? label}
    </button>
  );
}

export function BannerCloseButton({
  onDismiss,
  dismissLabel,
  className,
}: {
  onDismiss: () => void;
  dismissLabel: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onDismiss}
      className={clsx(
        //
        'px-3 py-1.5',
        'border border-white rounded',
        'hover:bg-white hover:text-black',
        className,
      )}
      aria-label={dismissLabel}
    >
      {dismissLabel}
    </button>
  );
}

type BannerProps = {
  children: ReactNode;
  actions?: BannerAction[];
  onDismiss: () => void;
  dismissLabel: string;
  dismissable?: boolean;
  testId?: string;
  ariaLive?: 'polite' | 'assertive';
  className?: string;
};

export function Banner({
  children,
  actions,
  onDismiss,
  dismissLabel,
  dismissable = true,
  testId,
  ariaLive = 'polite',
  className,
}: BannerProps) {
  return (
    <output
      data-testid={testId}
      className={clsx(
        //
        'border-2 border-black bg-black text-white p-4',
        'flex flex-wrap items-center gap-3',
        className,
      )}
      aria-live={ariaLive}
    >
      <div className="flex-1 min-w-0">{children}</div>
      <div className="flex items-center gap-2">
        {actions?.map((action, i) => (
          <BannerButton key={i} label={action.label} onClick={action.onClick}>
            {action.children}
          </BannerButton>
        ))}
        {dismissable && <BannerCloseButton onDismiss={onDismiss} dismissLabel={dismissLabel} />}
      </div>
    </output>
  );
}
