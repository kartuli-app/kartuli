import { describe, expect, it } from 'vitest';
import {
  getStudySwipeDistanceThreshold,
  getStudySwipeNavigationDirection,
  STUDY_SWIPE_DISTANCE_RATIO_THRESHOLD,
  STUDY_SWIPE_MIN_DISTANCE_THRESHOLD,
  STUDY_SWIPE_VELOCITY_THRESHOLD,
} from './study-screen-swipe';

describe('getStudySwipeDistanceThreshold', () => {
  it('uses the minimum distance threshold for narrower slides', () => {
    expect(getStudySwipeDistanceThreshold(320)).toBe(STUDY_SWIPE_MIN_DISTANCE_THRESHOLD);
  });

  it('uses the width-relative threshold for wider slides', () => {
    expect(getStudySwipeDistanceThreshold(600)).toBe(600 * STUDY_SWIPE_DISTANCE_RATIO_THRESHOLD);
  });
});

describe('getStudySwipeNavigationDirection', () => {
  const narrowSlideWidth = 320;
  const wideSlideWidth = 600;

  it('returns forward for a left swipe that clears the distance threshold', () => {
    expect(
      getStudySwipeNavigationDirection({
        offsetX: -STUDY_SWIPE_MIN_DISTANCE_THRESHOLD,
        velocityX: 0,
        slideWidth: narrowSlideWidth,
      }),
    ).toBe('forward');
  });

  it('returns back for a right swipe that clears the distance threshold', () => {
    expect(
      getStudySwipeNavigationDirection({
        offsetX: STUDY_SWIPE_MIN_DISTANCE_THRESHOLD,
        velocityX: 0,
        slideWidth: narrowSlideWidth,
      }),
    ).toBe('back');
  });

  it('uses the width-relative threshold for wider slides', () => {
    expect(
      getStudySwipeNavigationDirection({
        offsetX: -(wideSlideWidth * STUDY_SWIPE_DISTANCE_RATIO_THRESHOLD),
        velocityX: 0,
        slideWidth: wideSlideWidth,
      }),
    ).toBe('forward');
  });

  it('returns forward for a fast left fling even when the drag distance is short', () => {
    expect(
      getStudySwipeNavigationDirection({
        offsetX: -16,
        velocityX: -STUDY_SWIPE_VELOCITY_THRESHOLD,
        slideWidth: wideSlideWidth,
      }),
    ).toBe('forward');
  });

  it('returns back for a fast right fling even when the drag distance is short', () => {
    expect(
      getStudySwipeNavigationDirection({
        offsetX: 16,
        velocityX: STUDY_SWIPE_VELOCITY_THRESHOLD,
        slideWidth: wideSlideWidth,
      }),
    ).toBe('back');
  });

  it('returns null when the gesture is too small and too slow', () => {
    expect(
      getStudySwipeNavigationDirection({
        offsetX: getStudySwipeDistanceThreshold(wideSlideWidth) - 1,
        velocityX: STUDY_SWIPE_VELOCITY_THRESHOLD - 1,
        slideWidth: wideSlideWidth,
      }),
    ).toBeNull();
  });
});
