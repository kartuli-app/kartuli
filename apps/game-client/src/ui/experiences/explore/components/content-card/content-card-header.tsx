import { cn } from '@kartuli/ui/utils/cn';
import { ContentCardSection } from './content-card-section';

type ContentCardHeaderProps = {
  context: string;
  title: string;
  variant: 'default' | 'inverted';
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export function ContentCardHeader({
  context,
  title,
  variant,
  icon,
}: Readonly<ContentCardHeaderProps>) {
  const Icon = icon;

  return (
    <div
      className={cn(
        'uppercase',
        'border-b-(length:--s-width-panel-border)',
        'border-b-s-color-panel-header-border',
        variant === 'default' && 'bg-s-color-panel-header-bg',
        variant === 'inverted' && 'bg-s-color-panel-header-inverted-bg',
      )}
    >
      <ContentCardSection>
        <div className="flex justify-start gap-p-spacing-2 w-full">
          {icon && (
            <div
              className={cn(
                //
                'flex',
                'items-center',
                'justify-center',
                'h-full',
                'aspect-square',
                variant === 'default' && 'text-s-color-panel-header-content-secondary',
                variant === 'inverted' && 'text-s-color-panel-header-inverted-content-secondary',
              )}
            >
              {Icon ? <Icon className="size-11 text-inherit" /> : null}
            </div>
          )}
          <div className="flex flex-col">
            <div
              className={cn(
                //
                'text-sm',
                'font-bold',
                variant === 'default' && 'text-s-color-panel-header-content-secondary',
                variant === 'inverted' && 'text-s-color-panel-header-inverted-content-secondary',
              )}
            >
              {context}
            </div>
            <div
              className={cn(
                //
                'text-xl',
                'font-black',
                variant === 'default' && 'text-s-color-panel-header-content-primary',
                variant === 'inverted' && 'text-s-color-panel-header-inverted-content-primary',
              )}
            >
              {title}
            </div>
          </div>
          {icon && (
            <div
              className={cn(
                //
                'flex',
                'items-center',
                'justify-center',
                'h-full',
                'aspect-square',
                variant === 'default' && 'text-s-color-panel-header-content-secondary',
                variant === 'inverted' && 'text-s-color-panel-header-inverted-content-secondary',
              )}
            >
              {Icon ? <Icon className="size-11 text-inherit" /> : null}
            </div>
          )}
        </div>
      </ContentCardSection>
    </div>
  );
}
