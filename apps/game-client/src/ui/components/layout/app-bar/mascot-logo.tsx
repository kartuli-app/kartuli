import { cn } from '@kartuli/ui/utils/cn';

export function MascotLogo() {
  return (
    <picture>
      <source srcSet="/images/mascot-64.webp" type="image/webp" />
      <img
        className={cn('scale-150', 'size-12')}
        src="/images/mascot-64.png"
        alt="kartuli.app mascot"
      />
    </picture>
  );
}
