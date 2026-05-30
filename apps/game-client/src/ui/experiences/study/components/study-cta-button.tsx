'use client';

import { ShellActionButton } from '@game-client/ui/components/actions/shell-action';
import { cn } from '@kartuli/ui/utils/cn';
import type { ComponentType, SVGProps } from 'react';

export function StudyCtaButton({
  className,
  label,
  icon,
  onClick,
}: Readonly<{
  className?: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}>) {
  const Icon = icon;

  return (
    <ShellActionButton
      aria-label={label}
      onClick={onClick}
      className={cn(className)}
      size="cta"
      variant="primary"
    >
      <Icon className="shrink-0 size-7 text-inherit" />
      <div className="text-2xl uppercase text-inherit">{label}</div>
    </ShellActionButton>
  );
}
