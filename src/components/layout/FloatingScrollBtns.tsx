'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { smoothScrollToTop } from '@/components/providers/ScrollToTop';

export function FloatingScrollBtns() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
    <div className="fixed right-4 bottom-8 z-50 flex flex-col gap-2.5 items-center pointer-events-auto">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-3 rounded-full bg-slate-900/90 dark:bg-slate-900/90 border border-red-500/40 text-red-500 hover:text-red-400 hover:bg-red-500/20 backdrop-blur-md shadow-lg shadow-red-500/10 transition-all duration-300 group"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.15, y: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        className="p-3 rounded-full bg-slate-900/90 dark:bg-slate-900/90 border border-sky-500/40 text-sky-400 hover:text-sky-300 hover:bg-sky-500/20 backdrop-blur-md shadow-lg shadow-sky-500/10 transition-all duration-300 group"
      >
        <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200" />
      </motion.button>
    </div>
  );
}
