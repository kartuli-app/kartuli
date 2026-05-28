import { cn } from '@kartuli/ui/utils/cn';

export function LetterPreviewPlaceholder({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'aspect-square',
        'justify-center',
        'flex',
        'flex-col',
        'gap-0',
        'pointer-events-none',
        className,
      )}
    >
      <div
        className={cn(
          //
          'font-georgian',
          'text-4xl',
          'flex',
          'items-center',
          'justify-center',
          'relative',
          '',
        )}
      >
        <span className="absolute top-3/10 left-0 h-[2px] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="absolute top-6/10 left-0 h-[2px] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="z-10 text-transparent">{'-'}</span>
      </div>
      <div
        className={cn(
          //
          'text-xl',
          'flex',
          'items-center',
          'justify-center',
        )}
      >
        <span className="text-transparent">[</span>
        <span className="text-transparent">{'-'}</span>
        <span className="text-transparent">]</span>
      </div>
    </div>
  );
}
