import { cn } from '@kartuli/ui/utils/cn';

export function PanelLinkHoverFrame() {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none',
        'absolute inset-0 z-10',
        'rounded-[inherit]',
        'border-0',
        'group-hover:border-(length:--s-width-panel-border)',
        'group-hover:border-s-color-panel-border-hover',
      )}
    />
  );
}
