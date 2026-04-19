'use client';

import { Select } from '@base-ui/react/select';
import { PREFERRED_LOCALE_KEY, type SupportedLocale, supportedLocales } from '@game-client/i18n';
import { useNavigation } from '@game-client/navigation/navigation-context';
import {
  buttonIconClassNames,
  iconClassNames,
} from '@game-client/ui/shared/components/game-app-bar/game-app-bar-elements';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

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

export function LanguageSelector() {
  const { t, i18n } = useTranslation('common');
  const { navigate, localizedPathname } = useNavigation();
  const currentLanguage = i18n.resolvedLanguage;
  const currentLocale: SupportedLocale =
    supportedLocales.find(
      (locale) => currentLanguage === locale || currentLanguage?.startsWith(`${locale}-`),
    ) ?? supportedLocales[0];

  const languageOptions = supportedLocales.map((locale) => ({
    value: locale,
    label: t(`language_selector.lang_${locale}`),
  }));

  const activeLanguageLabel =
    languageOptions.find((option) => option.value === currentLocale)?.label ?? currentLocale;
  const activeShortLabel = activeLanguageLabel.slice(0, 3).toUpperCase();

  const handleValueChange = (value: string | null) => {
    if (!value || value === currentLocale) return;
    Cookies.set(PREFERRED_LOCALE_KEY, value, { path: '/' });
    const newPath = getNewPathForNewLocale(localizedPathname, value);
    i18n.changeLanguage(value).then(() => {
      navigate(newPath);
    });
  };

  return (
    <Select.Root<string>
      modal={false}
      value={currentLocale}
      onValueChange={(value: string | null) => handleValueChange(value)}
    >
      <Select.Trigger
        aria-label={t('accessibility.language')}
        className={clsx(
          iconClassNames,
          buttonIconClassNames,
          'active:scale-none',
          'relative z-30 flex flex-col items-center justify-center',
        )}
      >
        <IoLanguage className="size-5 text-brand-text-500" />
        <span className="font-bold text-xs text-brand-text-900">{activeShortLabel}</span>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          side="bottom"
          alignItemWithTrigger={false}
          sideOffset={8}
          className="z-30"
        >
          <Select.Popup
            className={clsx(
              'mt-0',
              'min-w-32',
              'rounded-lg',
              'border',
              'border-brand-text-300',
              'bg-brand-text-50',
              'text-brand-text-800',
              'shadow-lg',
              'overflow-hidden',
            )}
          >
            <Select.List className="bg-brand-text-50">
              {languageOptions.map(({ value, label }) => (
                <Select.Item
                  key={value}
                  value={value}
                  className={clsx(
                    'flex',
                    'cursor-pointer',
                    'select-none',
                    'items-center',
                    'px-3',
                    'py-3',
                    'text-sm',
                    'data-highlighted:bg-brand-text-600',
                    'data-highlighted:text-brand-text-50',
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
