'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function MouseSpotlight() {
  const [position, setPosition] = useState({ x: 200, y: 300 });
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      setPosition({ x: clientX, y: clientY });
      setHasInteracted(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
      animate={
        hasInteracted
          ? {
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(239, 68, 68, 0.12), transparent 80%)`,
            }
          : {
              background: [
                'radial-gradient(600px circle at 20% 30%, rgba(239, 68, 68, 0.12), transparent 80%)',
                'radial-gradient(600px circle at 80% 60%, rgba(56, 189, 248, 0.12), transparent 80%)',
                'radial-gradient(600px circle at 50% 80%, rgba(239, 68, 68, 0.12), transparent 80%)',
                'radial-gradient(600px circle at 20% 30%, rgba(239, 68, 68, 0.12), transparent 80%)',
              ],
            }
      }
      transition={{ duration: hasInteracted ? 0.2 : 12, repeat: hasInteracted ? 0 : Infinity, ease: 'easeInOut' }}
    />
  );
}

