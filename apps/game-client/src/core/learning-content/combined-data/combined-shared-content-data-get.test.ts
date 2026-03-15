import { describe, expect, it } from 'vitest';
import {
  minimalSharedContentDataDefault,
  minimalSharedContentDataExtended,
} from '../test-utils/learning-content-fakes';
import { combinedSharedContentDataGet } from './combined-shared-content-data-get';

describe('combinedSharedContentDataGet', () => {
  it('merges default and extended data when getters are passed', async () => {
    const getDefault = async () => minimalSharedContentDataDefault;
    const getExtended = async () => minimalSharedContentDataExtended;
    const result = await combinedSharedContentDataGet([getDefault, getExtended]);

    expect(result.modules).toHaveLength(2);
    expect(result.modules.map((m) => m.id).sort((a, b) => a.localeCompare(b))).toEqual([
      'module-a',
      'module-b',
    ]);
    expect(result.lessons).toHaveLength(2);
    expect(result.lessonItemEdges).toHaveLength(1);
    expect(result.lessonItemEdges[0].order).toBe(99);
    expect(result.lessonItemEdges[0].source).toBe('extended');
  });

  it('rejects when first getter rejects', async () => {
    const error = new Error('Default failed');
    const getDefault = async () => {
      throw error;
    };
    const getExtended = async () => minimalSharedContentDataExtended;

    await expect(combinedSharedContentDataGet([getDefault, getExtended])).rejects.toThrow(
      'Default failed',
    );
  });

  it('rejects when second getter rejects', async () => {
    const error = new Error('Extended failed');
    const getDefault = async () => minimalSharedContentDataDefault;
    const getExtended = async () => {
      throw error;
    };

    await expect(combinedSharedContentDataGet([getDefault, getExtended])).rejects.toThrow(
      'Extended failed',
    );
  });
});
