'use client';

import { Select } from '@base-ui/react/select';
import { PREFERRED_LOCALE_KEY, type SupportedLocale, supportedLocales } from '@game-client/i18n/';
import { useNavigation } from '@game-client/navigation/navigation-context';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { LuChevronsUpDown, LuEarth } from 'react-icons/lu';

const getNewPathForNewLocale = (path: string, newLocale: string) => {
  const queryStart = path.indexOf('?');
  const hashStart = path.indexOf('#');
  let suffixStart = path.length;
  if (queryStart >= 0) {
    suffixStart = queryStart;
  } else if (hashStart >= 0) {
    suffixStart = hashStart;
  }
  const pathOnly = path.slice(0, suffixStart);
  const suffix = path.slice(suffixStart);
  const segments = pathOnly.split('/').filter(Boolean);
  const first = segments[0];
  if (first && supportedLocales.includes(first as SupportedLocale)) {
    const rest = segments.slice(1);
    const basePath = rest.length > 0 ? `/${newLocale}/${rest.join('/')}` : `/${newLocale}`;
    return basePath + suffix;
  }
  const trimmed = pathOnly.startsWith('/') ? pathOnly.slice(1) : pathOnly;
  const basePath = trimmed ? `/${newLocale}/${trimmed}` : `/${newLocale}`;
  return basePath + suffix;
};

export function LanguageSelectorOld({ className }: Readonly<{ className?: string }>) {
  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.resolvedLanguage;
  const { navigate, localizedPathname } = useNavigation();

  const languageOptions = supportedLocales.map((locale) => ({
    value: locale,
    label: t(`language_selector.lang_${locale}`),
  }));

  const handleValueChange = async (value: string | null) => {
    if (!value || value === currentLocale) return;
    Cookies.set(PREFERRED_LOCALE_KEY, value);
    const newPath = getNewPathForNewLocale(localizedPathname, value);
    i18n.changeLanguage(value).then(() => {
      navigate(newPath);
    });
  };

  return (
    <Select.Root<string>
      // Keep page scroll enabled while the popup is open
      modal={false}
      value={currentLocale}
      onValueChange={(value: string | null) => handleValueChange(value)}
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
          'border-brand-text-300',
          // Text color aligned with brand neutral on dark background
          'text-brand-text-700',
          // Transparent background so it blends with app bar
          'bg-transparent',
          // Hover background color using brand primary palette
          'hover:bg-brand-text-600',
          'hover:text-brand-text-50',
          // Remove default focus outline for custom ring
          'focus-visible:outline-none',
          // Use ring for accessible focus indication
          'focus-visible:ring-2',
          // Focus ring color using brand primary palette
          'focus-visible:ring-brand-text-900',
          className,
        )}
      >
        <LuEarth
          className={clsx(
            // Icon size tuned for control height
            'size-4',
            // Icon color aligned with neutral text on dark background
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
          {(value: SupportedLocale | null) =>
            languageOptions.find((item) => item.value === value)?.label ?? ''
          }
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
          <LuChevronsUpDown
            className={clsx(
              // Icon size tuned for control height
              'size-4',
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
              'border-brand-text-300',
              // Dark background to match app bar theme
              'bg-brand-text-50',
              // Light text color for contrast on dark background
              'text-brand-text-800',
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
                'bg-brand-text-50',
              )}
            >
              {languageOptions.map(({ value, label }) => (
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
                    'data-highlighted:bg-brand-text-600',
                    // Highlight text color to keep contrast on highlight
                    'data-highlighted:text-brand-text-50',
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
