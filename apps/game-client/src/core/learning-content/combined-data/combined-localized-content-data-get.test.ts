import { describe, expect, it } from 'vitest';
import {
  minimalLocalizedContentDataDefault,
  minimalLocalizedContentDataExtended,
} from '../test-utils/learning-content-fakes';
import { combinedLocalizedContentDataGet } from './combined-localized-content-data-get';

describe('combinedLocalizedContentDataGet', () => {
  it('merges default and extended data when getters are passed', async () => {
    const getDefault = async (_locale: string) => minimalLocalizedContentDataDefault;
    const getExtended = async (_locale: string) => minimalLocalizedContentDataExtended;
    const result = await combinedLocalizedContentDataGet('en', [getDefault, getExtended]);

    expect(result.localizedModules).toHaveLength(2);
    expect(result.localizedModules.map((m) => m.id).sort()).toEqual(['module-a', 'module-b']);
    expect(result.localizedLessons).toHaveLength(2);
    expect(result.localizedModules.find((m) => m.id === 'module-b')?.title).toBe('Module B');
  });

  it('rejects when first getter rejects', async () => {
    const error = new Error('Default failed');
    const getDefault = async (_locale: string) => {
      throw error;
    };
    const getExtended = async (_locale: string) => minimalLocalizedContentDataExtended;

    await expect(combinedLocalizedContentDataGet('en', [getDefault, getExtended])).rejects.toThrow(
      'Default failed',
    );
  });

  it('rejects when second getter rejects', async () => {
    const error = new Error('Extended failed');
    const getDefault = async (_locale: string) => minimalLocalizedContentDataDefault;
    const getExtended = async (_locale: string) => {
      throw error;
    };

    await expect(combinedLocalizedContentDataGet('en', [getDefault, getExtended])).rejects.toThrow(
      'Extended failed',
    );
  });
});
