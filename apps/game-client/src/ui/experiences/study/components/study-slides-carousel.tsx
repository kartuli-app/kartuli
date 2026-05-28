'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { Panel } from '@game-client/ui/components/panel/panel';
import { LetterStudyDetailSlide } from '@game-client/ui/experiences/study/components/detail/letter-study-detail-slide';
import type { StudyNavigationModel } from '@game-client/ui/experiences/study/components/study-screen.types';
import { getStudySwipeNavigationDirection } from '@game-client/ui/experiences/study/components/study-screen-swipe';
import { LetterStudySummarySlide } from '@game-client/ui/experiences/study/components/summary/letter-study-summary-slide';
import { animate, motion, type PanInfo, useMotionValue } from 'motion/react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const STUDY_SLIDE_ANIMATION_BASE_DURATION_SECONDS = 0.1;
const STUDY_SLIDE_ANIMATION_EXTRA_DURATION_SECONDS = 0.02;
const STUDY_SLIDE_ANIMATION_MAX_DURATION_SECONDS = 0.2;

type StudySlide =
  | {
      key: 'summary';
      kind: 'summary';
    }
  | {
      key: string;
      kind: 'detail';
      item: LetterItem;
      itemIndex: number;
    };

function getStudySlides(items: ReadonlyArray<LetterItem>): StudySlide[] {
  return [
    { key: 'summary', kind: 'summary' },
    ...items.map<StudySlide>((item, itemIndex) => ({
      key: item.id,
      kind: 'detail',
      item,
      itemIndex,
    })),
  ];
}

function getStudySlideAnimationDuration(fromSlideIndex: number, toSlideIndex: number): number {
  const distance = Math.abs(toSlideIndex - fromSlideIndex);

  if (distance <= 1) return STUDY_SLIDE_ANIMATION_BASE_DURATION_SECONDS;

  return Math.min(
    STUDY_SLIDE_ANIMATION_BASE_DURATION_SECONDS +
      STUDY_SLIDE_ANIMATION_EXTRA_DURATION_SECONDS * (distance - 1),
    STUDY_SLIDE_ANIMATION_MAX_DURATION_SECONDS,
  );
}

export function StudySlidesCarousel({ nav }: Readonly<{ nav: StudyNavigationModel }>) {
  const slides = useMemo(() => getStudySlides(nav.items), [nav.items]);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const trackX = useMotionValue(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const hasInitializedTrackRef = useRef(false);
  const previousSlideIndexRef = useRef(nav.currentSlideIndex);
  const previousSlideWidthRef = useRef(0);
  const trackAnimationRef = useRef<{ stop: () => void } | null>(null);
  const pendingFocusSlideIndexRef = useRef<number | null>(null);

  const stopTrackAnimation = () => {
    trackAnimationRef.current?.stop();
    trackAnimationRef.current = null;
  };

  const focusSlideIfNeeded = (slideIndex: number) => {
    if (pendingFocusSlideIndexRef.current !== slideIndex) return;

    slideRefs.current[slideIndex]?.focus();
    pendingFocusSlideIndexRef.current = null;
  };

  const animateTrackToSlide = (fromSlideIndex: number, toSlideIndex: number) => {
    if (slideWidth <= 0) return;

    stopTrackAnimation();
    trackAnimationRef.current = animate(trackX, -toSlideIndex * slideWidth, {
      duration: getStudySlideAnimationDuration(fromSlideIndex, toSlideIndex),
      ease: 'easeOut',
      onComplete: () => {
        trackAnimationRef.current = null;
        focusSlideIfNeeded(toSlideIndex);
      },
    });
  };

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || hasInitializedTrackRef.current) return;

    const initialSlideWidth = viewport.clientWidth;
    if (initialSlideWidth <= 0) return;

    setSlideWidth(initialSlideWidth);
    trackX.set(-nav.currentSlideIndex * initialSlideWidth);
    previousSlideWidthRef.current = initialSlideWidth;
    previousSlideIndexRef.current = nav.currentSlideIndex;
    hasInitializedTrackRef.current = true;
  }, [nav.currentSlideIndex, trackX]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const nextSlideWidth = entries[0]?.contentRect.width ?? viewport.clientWidth;
      if (nextSlideWidth <= 0) return;

      setSlideWidth((currentSlideWidth) =>
        currentSlideWidth === nextSlideWidth ? currentSlideWidth : nextSlideWidth,
      );
    });

    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (slideWidth <= 0 || !hasInitializedTrackRef.current) return;

    const targetX = -nav.currentSlideIndex * slideWidth;
    const widthChanged = previousSlideWidthRef.current !== slideWidth;
    const slideChanged = previousSlideIndexRef.current !== nav.currentSlideIndex;

    if (widthChanged) {
      stopTrackAnimation();
      trackX.set(targetX);
      previousSlideWidthRef.current = slideWidth;
      previousSlideIndexRef.current = nav.currentSlideIndex;
      return;
    }

    if (!slideChanged) return;

    const fromSlideIndex = previousSlideIndexRef.current;
    previousSlideWidthRef.current = slideWidth;
    previousSlideIndexRef.current = nav.currentSlideIndex;
    animateTrackToSlide(fromSlideIndex, nav.currentSlideIndex);
  }, [nav.currentSlideIndex, slideWidth, trackX]);

  useEffect(() => {
    return () => {
      stopTrackAnimation();
    };
  }, []);

  const handleTrackDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (slideWidth <= 0) return;

    const swipeDirection = getStudySwipeNavigationDirection({
      offsetX: info.offset.x,
      velocityX: info.velocity.x,
      slideWidth,
    });

    if (swipeDirection === 'forward' && nav.canGoNext) {
      nav.handleNext();
      return;
    }

    if (swipeDirection === 'back' && nav.canGoPrevious) {
      nav.handlePrevious();
      return;
    }

    animateTrackToSlide(nav.currentSlideIndex, nav.currentSlideIndex);
  };

  const handleSummaryItemSelect = (itemIndex: number) => {
    pendingFocusSlideIndexRef.current = itemIndex + 1;
    nav.handleSelectItem(itemIndex);
  };

  const trackWidth = slideWidth > 0 ? slideWidth * slides.length : `${slides.length * 100}%`;
  const individualSlideWidth = slideWidth > 0 ? slideWidth : `${100 / slides.length}%`;

  return (
    <div
      ref={viewportRef}
      className="relative flex flex-1 min-h-0 min-w-0 w-full overflow-hidden touch-pan-y"
    >
      <Panel className="h-full min-h-0 w-full p-2 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 flex min-h-0 will-change-transform overflow-hidden"
          style={{ x: trackX, width: trackWidth }}
          drag="x"
          dragConstraints={{ left: -(nav.lastSlideIndex * slideWidth), right: 0 }}
          dragDirectionLock
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={stopTrackAnimation}
          onDragEnd={handleTrackDragEnd}
        >
          {slides.map((slide, slideIndex) => {
            const isActive = slideIndex === nav.currentSlideIndex;

            return (
              <section
                key={slide.key}
                ref={(element) => {
                  slideRefs.current[slideIndex] = element;
                }}
                aria-hidden={!isActive}
                aria-label={
                  slide.kind === 'summary' ? 'Summary slide' : `Detail slide ${slide.itemIndex + 1}`
                }
                className="flex h-full min-h-0 min-w-0 shrink-0 overflow-hidden"
                data-active={isActive ? 'true' : 'false'}
                data-study-slide-index={slideIndex}
                inert={!isActive}
                style={{ width: individualSlideWidth }}
                tabIndex={isActive ? -1 : undefined}
              >
                {slide.kind === 'summary' ? (
                  <LetterStudySummarySlide
                    items={nav.items}
                    onSelectItem={handleSummaryItemSelect}
                  />
                ) : (
                  <LetterStudyDetailSlide item={slide.item} />
                )}
              </section>
            );
          })}
        </motion.div>
      </Panel>
    </div>
  );
}
