'use client';

import { useEffect, useRef } from 'react';

export function MouseSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleMove = (clientX: number, clientY: number) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
            containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
            containerRef.current.style.opacity = '1';
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-10 hidden dark:block opacity-0 transition-opacity duration-500 transform-gpu"
      style={{
        background: 'radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(232, 93, 4, 0.12), transparent 80%)',
        willChange: 'background',
      }}
    />
  );
}
