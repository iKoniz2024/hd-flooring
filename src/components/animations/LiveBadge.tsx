'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const liveActivities = [
  '🟢 Live: Hardwood consultation booked in Mississauga',
  '🟢 Live: Luxury Vinyl project started in Toronto',
  '🟢 Live: Engineered Wood site assessment requested in Oakville',
  '🟢 Live: Commercial tile installation completed in Vaughan',
];

export function LiveBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % liveActivities.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-4 flex justify-center font-manrope">
      <div className="px-4 py-2 rounded-full bg-stone-900/90 dark:bg-stone-900/95 border border-amber-500/30 backdrop-blur-md shadow-lg shadow-black/20 text-xs font-medium text-stone-200 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {liveActivities[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
