'use client';

import { Tooltip } from '@base-ui-components/react/tooltip';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { ImArrowLeft } from 'react-icons/im';
import { routeUtils } from '@/domains/app/routes/route-utils';
import { IconButton } from '@/domains/shared/components/icon-button';

export function AppBarBackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const showBackButton = routeUtils.shouldShowBackButton(pathname);
  const onBackButtonClick = () => router.push(routeUtils.getBackRoute(pathname));
  return showBackButton ? (
    <Tooltip.Provider>
      <Tooltip.Root delay={1}>
        <Tooltip.Trigger
          aria-label="Go back"
          render={(triggerProps) => {
            const { className, ...props } = triggerProps;
            return (
              <IconButton {...props} className={className} onClick={onBackButtonClick}>
                <ImArrowLeft className={clsx('size-6')} />
              </IconButton>
            );
          }}
        />
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom" align="start" sideOffset={8}>
            <Tooltip.Popup
              className={clsx(
                //
                'p-2',
                'rounded-lg',
                'shadow-lg',
                'text-sm',
                'bg-slate-500 text-white',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
              )}
            >
              Go back
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ) : null;
}
