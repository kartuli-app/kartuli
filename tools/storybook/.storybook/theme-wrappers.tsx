import { type ReactNode, useEffect } from 'react';

interface ThemeWrapperProps {
  children: ReactNode;
}

type CssVariableMap = Record<`--${string}`, string>;

function useRootCssVariables(variables: CssVariableMap) {
  useEffect(() => {
    const rootStyle = document.documentElement.style;
    const previousValues = new Map<keyof CssVariableMap, string>();

    for (const [name, value] of Object.entries(variables) as [keyof CssVariableMap, string][]) {
      previousValues.set(name, rootStyle.getPropertyValue(name));
      rootStyle.setProperty(name, value);
    }

    return () => {
      for (const [name, previousValue] of previousValues) {
        if (previousValue) {
          rootStyle.setProperty(name, previousValue);
          continue;
        }
        rootStyle.removeProperty(name);
      }
    };
  }, [variables]);
}

const BRAND_EMERALD_RAMP = {
  '--p-color-brand-50': '#ecfdf5',
  '--p-color-brand-100': '#d1fae5',
  '--p-color-brand-200': '#a7f3d0',
  '--p-color-brand-300': '#6ee7b7',
  '--p-color-brand-400': '#34d399',
  '--p-color-brand-500': '#10b981',
  '--p-color-brand-600': '#059669',
  '--p-color-brand-700': '#047857',
  '--p-color-brand-800': '#065f46',
  '--p-color-brand-900': '#064e3b',
  '--p-color-brand-950': '#022c22',
} satisfies CssVariableMap;

const BRAND_ROSE_RAMP = {
  '--p-color-brand-50': '#fff1f2',
  '--p-color-brand-100': '#ffe4e6',
  '--p-color-brand-200': '#fecdd3',
  '--p-color-brand-300': '#fda4af',
  '--p-color-brand-400': '#fb7185',
  '--p-color-brand-500': '#f43f5e',
  '--p-color-brand-600': '#e11d48',
  '--p-color-brand-700': '#be123c',
  '--p-color-brand-800': '#9f1239',
  '--p-color-brand-900': '#881337',
  '--p-color-brand-950': '#4c0519',
} satisfies CssVariableMap;

function CssVariableThemeWrapper({
  children,
  variables,
}: Readonly<ThemeWrapperProps & { variables: CssVariableMap }>) {
  useRootCssVariables(variables);
  return children;
}

export function BrandEmeraldThemeWrapper({ children }: Readonly<ThemeWrapperProps>) {
  return (
    <CssVariableThemeWrapper variables={BRAND_EMERALD_RAMP}>{children}</CssVariableThemeWrapper>
  );
}

export function BrandRoseThemeWrapper({ children }: Readonly<ThemeWrapperProps>) {
  return <CssVariableThemeWrapper variables={BRAND_ROSE_RAMP}>{children}</CssVariableThemeWrapper>;
}
