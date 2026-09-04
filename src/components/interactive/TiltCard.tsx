'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch or screen is small/medium
    const checkMobileOrTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
    };
    checkMobileOrTouch();
    window.addEventListener('resize', checkMobileOrTouch);
    return () => window.removeEventListener('resize', checkMobileOrTouch);
  }, []);

  const calculateTilt = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const rY = (mouseX / width - 0.5) * 10;
    const rX = (mouseY / height - 0.5) * -10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    calculateTilt(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      calculateTilt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleReset = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleReset}
      onTouchStart={(e) => calculateTilt(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleReset}
      animate={
        rotateX === 0 && rotateY === 0 && isTouchDevice
          ? { rotateX: [0, 2, -2, 0], rotateY: [0, -3, 3, 0] }
          : { rotateX, rotateY }
      }
      transition={
        rotateX === 0 && rotateY === 0 && isTouchDevice
          ? { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          : { type: 'spring', stiffness: 300, damping: 20 }
      }
      style={{ transformStyle: 'preserve-3d' }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

