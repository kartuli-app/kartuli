'use client';

import { Select } from '@base-ui/react/select';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import { useLang } from '@game-client/i18n/use-lang';
import { PREFERRED_LOCALE_KEY } from '@game-client/local-storage/preferred-locale-key';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import clsx from 'clsx';
import { ChevronsUpDownIcon, EarthIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LanguageSelect({ className }: Readonly<{ className?: string }>) {
  const { t } = useTranslation('common');
  const lang = useLang();
  const { path, navigate } = useRouterContext();

  const switchLang = (nextLang: SupportedLng) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(PREFERRED_LOCALE_KEY, nextLang);
    }
    const segments = path.split('/').filter(Boolean);
    const rest = segments.slice(1);
    const newPath = rest.length > 0 ? `/${nextLang}/${rest.join('/')}` : `/${nextLang}`;
    navigate(newPath);
  };

  const items: ReadonlyArray<{ value: SupportedLng; label: string }> = [
    { value: 'en', label: t('langEn') },
    { value: 'ru', label: t('langRu') },
  ];

  return (
    <Select.Root<SupportedLng>
      // Keep page scroll enabled while the popup is open
      modal={false}
      value={lang}
      onValueChange={(value: SupportedLng | null) => {
        if (!value || value === lang) return;
        switchLang(value);
      }}
    >
      <Select.Trigger
        aria-label="Language"
        className={clsx(
          // Use flexbox layout for the trigger contents
          'flex',
          // Vertically center the icon and text
          'items-center',
          // Center content horizontally when width shrinks
          'justify-center',
          // Horizontal gap between icon, label, and chevron
          'gap-brand-regular',
          // Vertical padding to match brand control height
          'py-brand-regular',
          // Horizontal padding to match brand control width
          'px-brand-large',
          // Rounded corners to match other buttons/inputs
          'rounded-lg',
          // Small text size to match UI scale
          'text-sm',
          // Pointer cursor to indicate interactivity
          'cursor-pointer',
          // Base border for control outline
          'border',
          // Border color aligned with brand neutral on dark background
          'border-brand-neutral-50',
          // Text color aligned with brand neutral on dark background
          'text-brand-neutral-50',
          // Transparent background so it blends with app bar
          'bg-transparent',
          // Hover background color using brand primary palette
          'hover:bg-brand-primary-400',
          // Remove default focus outline for custom ring
          'focus-visible:outline-none',
          // Use ring for accessible focus indication
          'focus-visible:ring-2',
          // Focus ring color using brand primary palette
          'focus-visible:ring-brand-primary-300',
          className,
        )}
      >
        <EarthIcon
          className={clsx(
            // Icon size tuned for control height
            'size-4',
            // Icon color aligned with neutral text on dark background
            'text-brand-neutral-50',
          )}
        />
        <Select.Value
          className={clsx(
            // Minimum width so labels do not shrink too much
            'min-w-12',
            // Align text to the left inside the trigger
            'text-left',
          )}
        >
          {(value: SupportedLng | null) => items.find((item) => item.value === value)?.label ?? ''}
        </Select.Value>
        <Select.Icon
          className={clsx(
            // Flex container so chevron is centered
            'flex',
            // Vertically center the chevron icon
            'items-center',
            // Horizontally center the chevron icon
            'justify-center',
          )}
        >
          <ChevronsUpDownIcon
            className={clsx(
              // Icon size tuned for control height
              'size-4',
              // Icon color aligned with neutral text on dark background
              'text-brand-neutral-50',
            )}
            aria-hidden="true"
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          // Always prefer rendering the popup below the trigger
          side="bottom"
          // Use standard positioning instead of overlapping the trigger
          alignItemWithTrigger={false}
          // Small vertical offset so the popup is visually separated
          sideOffset={8}
          className={clsx(
            // Ensure popup renders above sticky app bar
            'z-20',
          )}
        >
          <Select.Popup
            className={clsx(
              // Small margin so popup is visually separated from trigger
              'mt-0',
              // Minimum width so items have consistent width
              'min-w-32',
              // Rounded corners to match trigger styling
              'rounded-lg',
              // Subtle border for popup outline
              'border',
              // Border color aligned with neutral palette for popup
              'border-brand-neutral-200',
              // Dark background to match app bar theme
              'bg-brand-neutral-900',
              // Light text color for contrast on dark background
              'text-brand-neutral-50',
              // Elevation shadow so popup feels layered
              'shadow-lg',
              // Hide overflow so rounded corners clip content
              'overflow-hidden',
            )}
          >
            <Select.List
              className={clsx(
                // Vertical padding around the list of items
                // 'py-1',
              )}
            >
              {items.map(({ value, label }) => (
                <Select.Item
                  key={value}
                  value={value}
                  className={clsx(
                    // Flex layout so item content aligns nicely
                    'flex',
                    // Pointer cursor to indicate clickability
                    'cursor-pointer',
                    // Prevent text selection while navigating items
                    'select-none',
                    // Vertically center the label text
                    'items-center',
                    // Horizontal padding inside each option
                    'px-3',
                    // Vertical padding inside each option
                    'py-2',
                    // Small text to match trigger size
                    'text-sm',
                    // Highlight background when item is focused/hovered
                    'data-highlighted:bg-brand-primary-400',
                    // Highlight text color to keep contrast on highlight
                    'data-highlighted:text-brand-neutral-900',
                    // Use bolder font for the selected option
                    'data-selected:font-semibold',
                  )}
                >
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
