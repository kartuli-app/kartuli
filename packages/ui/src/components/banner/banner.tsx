'use client';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { BUTTON_BASE_CLASSES } from '../button';

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
        'font-bold text-md',
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
        BUTTON_BASE_CLASSES,
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
        BUTTON_BASE_CLASSES,
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
  showDismissButton?: boolean;
  testId?: string;
  ariaLive?: 'polite' | 'assertive';
  className?: string;
};

export function Banner({
  children,
  actions,
  onDismiss,
  dismissLabel,
  showDismissButton = true,
  testId,
  ariaLive = 'polite',
  className,
}: BannerProps) {
  return (
    <output
      data-testid={testId}
      className={clsx(
        //
        'bg-zinc-900 text-white w-full',
        'flex flex-wrap',
        className,
      )}
      aria-live={ariaLive}
    >
      <div
        className={clsx(
          //
          'mx-auto max-w-md w-full',
          'p-4',
          'justify-between',
          'items-center',
          'flex',
          'gap-2',
        )}
      >
        <div className="flex-1 min-w-0">{children}</div>
        <div className="flex items-center gap-2">
          {actions?.map((action, i) => (
            <BannerButton key={i} label={action.label} onClick={action.onClick}>
              {action.children}
            </BannerButton>
          ))}
          {showDismissButton && (
            <BannerCloseButton onDismiss={onDismiss} dismissLabel={dismissLabel} />
          )}
        </div>
      </div>
    </output>
  );
}
