'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3.5 max-w-3xl mx-auto font-inter">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800/90 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:border-[#E85D04]/50"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-jakarta font-bold text-stone-900 dark:text-stone-100 hover:text-[#E85D04] dark:hover:text-[#E85D04] transition-colors"
            >
              <span className="text-sm sm:text-base leading-snug">{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 sm:w-5 sm:h-5 text-[#E85D04] shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-inter border-t border-stone-200/60 dark:border-stone-800/60"
                >
                  <p className="pt-4">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

