import { cn } from '@kartuli/ui/utils/cn';
import { ContentCardHeader } from './content-card-header';
import { ContentCardSection } from './content-card-section';

type ContentCardProps = {
  context: string;
  title: string;
  variant: 'default' | 'inverted';
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export function ContentCard({
  context,
  title,
  variant,
  children,
  icon,
}: Readonly<ContentCardProps>) {
  return (
    <div
      className={cn(
        //
        'w-full min-w-0',
        'flex',
        'flex-col',
        'shadow-sm',
        'group',
        'overflow-hidden',
        // card styles
        'active:scale-95',
        'rounded-p-radius-1',
        // colors and borders
        'bg-s-color-panel-bg',
        'border-(length:--s-width-panel-border)',
        'border-s-color-panel-border',
        'hover:border-s-color-panel-border-hover',
      )}
    >
      <ContentCardHeader context={context} title={title} variant={variant} icon={icon} />
      <ContentCardSection>{children}</ContentCardSection>
    </div>
  );
}
