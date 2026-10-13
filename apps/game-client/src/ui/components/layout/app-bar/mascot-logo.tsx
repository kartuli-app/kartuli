import { cn } from '@kartuli/ui/utils/cn';

export function MascotLogo() {
  return (
    <picture>
      <source srcSet="/images/mascot-144.webp" type="image/webp" />
      <img
        className={cn('scale-150', 'size-12')}
        src="/images/mascot-144.png"
        alt="kartuli.app mascot"
      />
    </picture>
  );
}
