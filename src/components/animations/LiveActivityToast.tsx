'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const liveNotifications = [
  {
    id: 1,
    title: 'New Consultation Booked',
    desc: 'John S. requested an estimate for Hardwood Flooring',
    time: '2 mins ago',
    city: 'Saskatoon, SK',
    service: 'Solid Hardwood Flooring',
  },
  {
    id: 2,
    title: 'Site Assessment Requested',
    desc: 'Elena M. booked site measure for Luxury Vinyl Plank',
    time: ' Just now',
    city: 'Regina, SK',
    service: 'Luxury Vinyl & Sheet Vinyl',
  },
  {
    id: 3,
    title: 'New 5-Star Review',
    desc: '“Flawless subfloor leveling & zero squeaks!”',
    time: '5 mins ago',
    city: 'Toronto, ON',
    service: 'Tile & Porcelain Flooring',
  },
  {
    id: 4,
    title: 'Commercial Project Started',
    desc: '1,200 sq.ft. VCT Vinyl Tile installation underway',
    time: '12 mins ago',
    city: 'Moose Jaw, SK',
    service: 'Self Leveling & Floor Prep',
  },
];

export function LiveActivityToast() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openBookModal } = useModal();

  useEffect(() => {
    // Initial delay before showing first toast
    const initialTimer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 3000);

    // Interval to cycle notifications
    const cycleInterval = setInterval(() => {
      if (isDismissed) return;
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % liveNotifications.length);
        setIsVisible(true);
      }, 800);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleInterval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = liveNotifications[currentIdx];

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 pointer-events-auto max-w-xs sm:max-w-sm">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative p-4 rounded-2xl bg-slate-900/95 border border-red-500/30 backdrop-blur-2xl shadow-2xl shadow-black/60 text-slate-100 flex items-start gap-3.5 group cursor-pointer"
            onClick={() => openBookModal(current.service)}
          >
            {/* Live Indicator Pulse Dot */}
            <div className="relative shrink-0 pt-0.5">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-slate-950" />
              </span>
            </div>

            {/* Content */}
            <div className="space-y-1 flex-1 font-inter">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-manrope font-extrabold uppercase tracking-wider text-red-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  {current.title}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-manrope">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {current.time}
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-100 leading-snug">
                {current.desc}
              </p>

              <div className="flex items-center justify-between text-[11px] font-manrope text-slate-400 pt-1">
                <span className="text-sky-300 font-medium">📍 {current.city}</span>
                <span className="text-red-400 group-hover:underline font-bold">Book Similar →</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
