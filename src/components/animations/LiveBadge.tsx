'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Sparkles } from 'lucide-react';

const liveActivities = [
  '🔴 LIVE: 14 homeowners currently browsing Saskatoon flooring estimates',
  '⚡ Live Update: 1,200 sq.ft LVP installation completed today in Saskatoon, SK',
  '📅 Live Booking: John S. requested a free site measure in Regina 4 mins ago',
  '⭐ 5-Star Review: "Flawless Sheet Vinyl coving & subfloor leveling!" - Moose Jaw',
  '👷 Active Crews: 2 installation teams currently on-site in Saskatoon',
];

export function LiveBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % liveActivities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-4 flex justify-center font-inter px-4">
      <div className="px-4 py-2 rounded-full bg-slate-900/90 border border-red-500/30 backdrop-blur-md shadow-lg shadow-red-500/10 text-xs sm:text-sm font-medium text-slate-200 overflow-hidden relative max-w-xl text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="inline-flex items-center gap-2"
          >
            {liveActivities[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

