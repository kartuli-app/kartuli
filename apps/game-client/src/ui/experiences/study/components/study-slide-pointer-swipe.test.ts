import { act, renderHook } from '@testing-library/react';
import type { MotionValue } from 'motion/react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  clampStudyTrackOffsetX,
  classifyStudyPointerGesture,
  STUDY_POINTER_GESTURE_SLOP_PX,
  useStudySummarySlidePointerSwipe,
} from './study-slide-pointer-swipe';

interface CapturedPointerInit {
  pointerId: number;
  clientX: number;
  clientY?: number;
  timeStamp?: number;
}

function dispatchCapturedPointer(
  handlers: ReturnType<typeof useStudySummarySlidePointerSwipe>,
  target: HTMLElement,
  type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel',
  init: CapturedPointerInit,
) {
  const handlerName =
    type === 'pointerdown'
      ? 'onPointerDownCapture'
      : type === 'pointermove'
        ? 'onPointerMoveCapture'
        : type === 'pointerup'
          ? 'onPointerUpCapture'
          : 'onPointerCancelCapture';

  const handler = handlers[handlerName];
  const nativeEvent = new PointerEvent(type, {
    bubbles: true,
    cancelable: true,
    isPrimary: true,
    button: 0,
    buttons: type === 'pointerdown' ? 1 : 0,
    pointerId: init.pointerId,
    clientX: init.clientX,
    clientY: init.clientY ?? 0,
  });

  handler({
    pointerId: init.pointerId,
    clientX: init.clientX,
    clientY: init.clientY ?? 0,
    timeStamp: init.timeStamp ?? 0,
    isPrimary: true,
    button: 0,
    currentTarget: target,
    preventDefault: () => nativeEvent.preventDefault(),
  } as ReactPointerEvent<HTMLElement>);
}

function runHorizontalSwipe(
  handlers: ReturnType<typeof useStudySummarySlidePointerSwipe>,
  target: HTMLElement,
  endType: 'pointerup' | 'pointercancel',
) {
  act(() => {
    dispatchCapturedPointer(handlers, target, 'pointerdown', { pointerId: 1, clientX: 100 });
    dispatchCapturedPointer(handlers, target, 'pointermove', {
      pointerId: 1,
      clientX: 160,
      timeStamp: 16,
    });
    dispatchCapturedPointer(handlers, target, 'pointermove', {
      pointerId: 1,
      clientX: 200,
      timeStamp: 32,
    });
    dispatchCapturedPointer(handlers, target, endType, { pointerId: 1, clientX: 200 });
  });
}

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

describe('useStudySummarySlidePointerSwipe', () => {
  const slideStride = 400;

  function renderSwipeHook() {
    const target = document.createElement('div');
    const onSwipeEnd = vi.fn();
    const trackX = { set: vi.fn() } as unknown as MotionValue<number>;

    const { result } = renderHook(() =>
      useStudySummarySlidePointerSwipe({
        enabled: true,
        currentSlideIndex: 0,
        slideStride,
        lastSlideIndex: 3,
        trackX,
        stopTrackAnimation: vi.fn(),
        onSwipeEnd,
      }),
    );

    return { target, onSwipeEnd, handlers: result.current };
  }

  it('ends a horizontal swipe with offset and velocity on pointerup', () => {
    const { target, onSwipeEnd, handlers } = renderSwipeHook();

    runHorizontalSwipe(handlers, target, 'pointerup');

    expect(onSwipeEnd).toHaveBeenCalledOnce();
    expect(onSwipeEnd).toHaveBeenCalledWith({ offsetX: 100, velocityX: 2500 });
  });

  it('aborts a horizontal swipe without navigation signal on pointercancel', () => {
    const { target, onSwipeEnd, handlers } = renderSwipeHook();

    runHorizontalSwipe(handlers, target, 'pointercancel');

    expect(onSwipeEnd).toHaveBeenCalledOnce();
    expect(onSwipeEnd).toHaveBeenCalledWith({ offsetX: 0, velocityX: 0 });
  });
});
