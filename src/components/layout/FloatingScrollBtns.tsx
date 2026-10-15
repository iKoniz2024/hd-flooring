'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { smoothScrollToTop } from '@/components/providers/ScrollToTop';

export function FloatingScrollBtns() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 250);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollToTop(750);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    // Hidden on mobile devices (< md) to avoid blocking cards and video players; shown on desktop
    <div className="hidden md:flex fixed right-4 bottom-[92px] z-30 flex-col gap-2 items-center pointer-events-auto">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-stone-900/90 dark:bg-stone-900/90 border border-stone-700/80 hover:border-[#E85D04] text-stone-300 hover:text-white hover:bg-[#E85D04] backdrop-blur-md shadow-md flex items-center justify-center transition-all duration-300 group cursor-pointer"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, y: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        className="w-10 h-10 rounded-full bg-stone-900/90 dark:bg-stone-900/90 border border-stone-700/80 hover:border-[#E85D04] text-stone-300 hover:text-white hover:bg-[#E85D04] backdrop-blur-md shadow-md flex items-center justify-center transition-all duration-300 group cursor-pointer"
      >
        <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200" />
      </motion.button>
    </div>
  );
}
