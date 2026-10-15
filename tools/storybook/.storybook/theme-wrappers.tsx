import { type ReactNode, useEffect } from 'react';

interface ThemeWrapperProps {
  children: ReactNode;
  themeId: unknown;
}

export interface CssVariableMap {
  [variableName: `--${string}`]: string;
}

export type StorybookThemeId = 'game-default' | 'backoffice' | 'stress-emerald' | 'stress-rose';

export interface StorybookThemeDefinition {
  id: StorybookThemeId;
  label: string;
  kind: 'real' | 'synthetic';
  variables: CssVariableMap;
}

const BACKOFFICE_PRIMITIVES = {
  '--p-color-brand-50': '#ecfdf5',
  '--p-color-brand-100': '#d1fae5',
  '--p-color-brand-200': '#a7f3d0',
  '--p-color-brand-300': '#6ee7b7',
  '--p-color-brand-400': '#34d399',
  '--p-color-brand-500': '#059669',
  '--p-color-brand-600': '#047857',
  '--p-color-brand-700': '#065f46',
  '--p-color-brand-800': '#064e3b',
  '--p-color-brand-900': '#022c22',
  '--p-color-brand-950': '#011c16',
  '--p-color-accent-50': '#fff1f2',
  '--p-color-accent-100': '#ffe4e6',
  '--p-color-accent-200': '#fecdd3',
  '--p-color-accent-300': '#fda4af',
  '--p-color-accent-400': '#fb7185',
  '--p-color-accent-500': '#f43f5e',
  '--p-color-accent-600': '#e11d48',
  '--p-color-accent-700': '#be123c',
  '--p-color-accent-800': '#9f1239',
  '--p-color-accent-900': '#881337',
  '--p-color-accent-950': '#4c0519',
} satisfies CssVariableMap;

const STRESS_EMERALD_PRIMITIVES = {
  '--p-color-brand-50': '#ecfdf5',
  '--p-color-brand-100': '#d1fae5',
  '--p-color-brand-200': '#a7f3d0',
  '--p-color-brand-300': '#6ee7b7',
  '--p-color-brand-400': '#34d399',
  '--p-color-brand-500': '#10b981',
  '--p-color-brand-600': '#047857',
  '--p-color-brand-700': '#047857',
  '--p-color-brand-800': '#065f46',
  '--p-color-brand-900': '#064e3b',
  '--p-color-brand-950': '#022c22',
} satisfies CssVariableMap;

const STRESS_ROSE_PRIMITIVES = {
  '--p-color-brand-50': '#fff1f2',
  '--p-color-brand-100': '#ffe4e6',
  '--p-color-brand-200': '#fecdd3',
  '--p-color-brand-300': '#fda4af',
  '--p-color-brand-400': '#fb7185',
  '--p-color-brand-500': '#f43f5e',
  '--p-color-brand-600': '#be123c',
  '--p-color-brand-700': '#be123c',
  '--p-color-brand-800': '#9f1239',
  '--p-color-brand-900': '#881337',
  '--p-color-brand-950': '#4c0519',
} satisfies CssVariableMap;

export const STORYBOOK_THEMES = {
  'game-default': {
    id: 'game-default',
    label: 'Game / Default',
    kind: 'real',
    variables: {},
  },
  backoffice: {
    id: 'backoffice',
    label: 'Backoffice',
    kind: 'real',
    variables: BACKOFFICE_PRIMITIVES,
  },
  'stress-emerald': {
    id: 'stress-emerald',
    label: 'Stress: Emerald',
    kind: 'synthetic',
    variables: STRESS_EMERALD_PRIMITIVES,
  },
  'stress-rose': {
    id: 'stress-rose',
    label: 'Stress: Rose',
    kind: 'synthetic',
    variables: STRESS_ROSE_PRIMITIVES,
  },
} as const satisfies Record<StorybookThemeId, StorybookThemeDefinition>;

export function resolveStorybookTheme(themeId: unknown): StorybookThemeDefinition {
  if (typeof themeId === 'string' && Object.hasOwn(STORYBOOK_THEMES, themeId)) {
    return STORYBOOK_THEMES[themeId as StorybookThemeId];
  }

  return STORYBOOK_THEMES['game-default'];
}

export function applyRootCssVariables(
  rootStyle: CSSStyleDeclaration,
  variables: CssVariableMap,
): () => void {
  const previousValues = new Map<string, { value: string; priority: string }>();

  for (const [name, value] of Object.entries(variables)) {
    previousValues.set(name, {
      value: rootStyle.getPropertyValue(name),
      priority: rootStyle.getPropertyPriority(name),
    });
    rootStyle.setProperty(name, value);
  }

  return () => {
    for (const [name, previous] of previousValues) {
      if (previous.value) {
        rootStyle.setProperty(name, previous.value, previous.priority);
        continue;
      }
      rootStyle.removeProperty(name);
    }
  };
}

function useRootCssVariables(variables: CssVariableMap) {
  useEffect(() => applyRootCssVariables(document.documentElement.style, variables), [variables]);
}

export function StorybookThemeWrapper({ children, themeId }: Readonly<ThemeWrapperProps>) {
  const theme = resolveStorybookTheme(themeId);
  useRootCssVariables(theme.variables);
  return children;
}
