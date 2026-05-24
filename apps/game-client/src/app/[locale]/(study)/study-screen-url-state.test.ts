import { describe, expect, it } from 'vitest';
import {
  getStudyScreenCurrentItem,
  getStudyScreenUrl,
  STUDY_ITEM_SEARCH_PARAM,
} from './study-screen-url-state';

const items = [{ id: 'letter-ani' }, { id: 'letter-bani' }, { id: 'letter-gani' }];

describe('getStudyScreenCurrentItem', () => {
  it('returns summary when no item is selected', () => {
    expect(getStudyScreenCurrentItem(items, null)).toBe('summary');
  });

  it('returns the matching item index when the item id exists', () => {
    expect(getStudyScreenCurrentItem(items, 'letter-bani')).toBe(1);
  });

  it('falls back to summary for an unknown item id', () => {
    expect(getStudyScreenCurrentItem(items, 'letter-unknown')).toBe('summary');
  });
});

describe('getStudyScreenUrl', () => {
  it('adds the selected item to the query string', () => {
    expect(getStudyScreenUrl('/en/study/lesson/lesson-1', '', 'letter-ani')).toBe(
      `/en/study/lesson/lesson-1?${STUDY_ITEM_SEARCH_PARAM}=letter-ani`,
    );
  });

  it('preserves unrelated search params when updating the current item', () => {
    expect(
      getStudyScreenUrl('/en/study/module/module-1', 'foo=bar&item=letter-ani', 'letter-gani'),
    ).toBe('/en/study/module/module-1?foo=bar&item=letter-gani');
  });

  it('removes the item param when returning to summary', () => {
    expect(getStudyScreenUrl('/en/study/lesson/lesson-1', 'item=letter-ani', null)).toBe(
      '/en/study/lesson/lesson-1',
    );
  });
});
