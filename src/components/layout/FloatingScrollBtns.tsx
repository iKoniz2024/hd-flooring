'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
            className="p-3 rounded-full bg-stone-900/90 dark:bg-stone-900/90 border border-amber-500/40 text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 backdrop-blur-md shadow-lg shadow-amber-500/10 transition-all duration-300 group"
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
        className="p-3 rounded-full bg-stone-900/90 dark:bg-stone-900/90 border border-amber-500/40 text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 backdrop-blur-md shadow-lg shadow-amber-500/10 transition-all duration-300 group"
      >
        <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200" />
      </motion.button>
    </div>
  );
}
