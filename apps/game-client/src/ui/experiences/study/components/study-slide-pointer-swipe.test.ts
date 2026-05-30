import { describe, expect, it } from 'vitest';
import {
  clampStudyTrackOffsetX,
  classifyStudyPointerGesture,
  STUDY_POINTER_GESTURE_SLOP_PX,
} from './study-slide-pointer-swipe';

describe('classifyStudyPointerGesture', () => {
  it('stays pending inside the slop box', () => {
    expect(classifyStudyPointerGesture(4, 4)).toBe('pending');
    expect(classifyStudyPointerGesture(STUDY_POINTER_GESTURE_SLOP_PX - 1, 0)).toBe('pending');
  });

  it('chooses horizontal when horizontal movement dominates', () => {
    expect(classifyStudyPointerGesture(24, 4)).toBe('horizontal');
  });

  it('chooses vertical when vertical movement dominates', () => {
    expect(classifyStudyPointerGesture(4, 24)).toBe('vertical');
  });
});

describe('clampStudyTrackOffsetX', () => {
  const slideStride = 400;
  const lastSlideIndex = 3;

  it('offsets from the current slide rest position', () => {
    expect(clampStudyTrackOffsetX(-80, 1, slideStride, lastSlideIndex)).toBe(-480);
  });

  it('clamps to the first slide', () => {
    expect(clampStudyTrackOffsetX(120, 0, slideStride, lastSlideIndex)).toBe(0);
  });

  it('clamps to the last slide', () => {
    expect(clampStudyTrackOffsetX(-200, 3, slideStride, lastSlideIndex)).toBe(-1200);
  });
});
