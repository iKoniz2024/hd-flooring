'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function smoothScrollToTop(duration = 750) {
  if (typeof window === 'undefined') return;
  const startPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  if (startPosition <= 0) return;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animationStep = (currentTime: number) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    const nextScrollY = startPosition * (1 - easedProgress);
    window.scrollTo(0, nextScrollY);

    if (progress < 1) {
      requestAnimationFrame(animationStep);
    }
  };

  requestAnimationFrame(animationStep);
}

export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    smoothScrollToTop(750);
  }, [pathname, searchParams]);

  return null;
}

