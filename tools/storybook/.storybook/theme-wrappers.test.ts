import { afterEach, describe, expect, it } from 'vitest';
import backofficeThemeCss from '../../../apps/backoffice-client/src/domains/app-shell/theme.css?raw';
import {
  applyRootCssVariables,
  type CssVariableMap,
  resolveStorybookTheme,
  STORYBOOK_THEMES,
} from './theme-wrappers';

const allowedThemeVariable =
  /^--p-color-(brand|accent)-(50|100|200|300|400|500|600|700|800|900|950)$/;
const themeVariableNames = new Set(
  Object.values(STORYBOOK_THEMES).flatMap((theme) => Object.keys(theme.variables)),
);

function parseCssVariables(css: string): CssVariableMap {
  return Object.fromEntries(
    [...css.matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gm)].map((match) => [
      match[1],
      match[2]?.trim(),
    ]),
  ) as CssVariableMap;
}

afterEach(() => {
  for (const variableName of themeVariableNames) {
    document.documentElement.style.removeProperty(variableName);
  }
});

describe('Storybook theme wrappers', () => {
  it('defines real and synthetic modes with permitted primitive namespaces', () => {
    expect(Object.keys(STORYBOOK_THEMES)).toEqual([
      'game-default',
      'backoffice',
      'stress-emerald',
      'stress-rose',
    ]);
    expect(Object.keys(STORYBOOK_THEMES['game-default'].variables)).toHaveLength(0);
    expect(Object.keys(STORYBOOK_THEMES.backoffice.variables)).toHaveLength(22);
    expect(Object.keys(STORYBOOK_THEMES['stress-emerald'].variables)).toHaveLength(11);
    expect(Object.keys(STORYBOOK_THEMES['stress-rose'].variables)).toHaveLength(11);

    for (const [themeId, theme] of Object.entries(STORYBOOK_THEMES)) {
      for (const variableName of Object.keys(theme.variables)) {
        expect(variableName, themeId).toMatch(allowedThemeVariable);
        if (theme.kind === 'synthetic') {
          expect(variableName, themeId).toMatch(/^--p-color-brand-/);
        }
      }
    }
  });

  it('keeps the Storybook Backoffice preview in exact parity with the production theme', () => {
    expect(parseCssVariables(backofficeThemeCss)).toEqual(STORYBOOK_THEMES.backoffice.variables);
  });

  it('falls back to the untouched Game default for unknown theme ids', () => {
    expect(resolveStorybookTheme('not-a-theme')).toBe(STORYBOOK_THEMES['game-default']);
    expect(resolveStorybookTheme(undefined)).toBe(STORYBOOK_THEMES['game-default']);
  });

  it('cleans every owned variable while switching repeatedly between themes', () => {
    const rootStyle = document.documentElement.style;
    let cleanup = applyRootCssVariables(rootStyle, STORYBOOK_THEMES.backoffice.variables);

    expect(rootStyle.getPropertyValue('--p-color-brand-600')).toBe('#047857');
    expect(rootStyle.getPropertyValue('--p-color-accent-600')).toBe('#e11d48');

    cleanup();
    cleanup = applyRootCssVariables(rootStyle, STORYBOOK_THEMES['stress-emerald'].variables);
    expect(rootStyle.getPropertyValue('--p-color-brand-600')).toBe('#047857');
    expect(rootStyle.getPropertyValue('--p-color-accent-600')).toBe('');

    cleanup();
    cleanup = applyRootCssVariables(rootStyle, STORYBOOK_THEMES['stress-rose'].variables);
    expect(rootStyle.getPropertyValue('--p-color-brand-600')).toBe('#be123c');
    expect(rootStyle.getPropertyValue('--p-color-accent-600')).toBe('');

    cleanup();
    cleanup = applyRootCssVariables(rootStyle, STORYBOOK_THEMES.backoffice.variables);
    expect(rootStyle.getPropertyValue('--p-color-brand-600')).toBe('#047857');
    expect(rootStyle.getPropertyValue('--p-color-accent-600')).toBe('#e11d48');

    cleanup();
    cleanup = applyRootCssVariables(rootStyle, STORYBOOK_THEMES['game-default'].variables);
    expect(rootStyle.getPropertyValue('--p-color-brand-600')).toBe('');
    expect(rootStyle.getPropertyValue('--p-color-accent-600')).toBe('');
    cleanup();
  });

  it('restores pre-existing inline values and priorities on cleanup', () => {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--p-color-brand-600', 'sentinel', 'important');

    const cleanup = applyRootCssVariables(rootStyle, STORYBOOK_THEMES.backoffice.variables);
    expect(rootStyle.getPropertyValue('--p-color-brand-600')).toBe('#047857');

    cleanup();
    expect(rootStyle.getPropertyValue('--p-color-brand-600')).toBe('sentinel');
    expect(rootStyle.getPropertyPriority('--p-color-brand-600')).toBe('important');
  });
});
