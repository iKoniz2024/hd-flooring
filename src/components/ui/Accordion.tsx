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
    <div className="space-y-3 max-w-3xl mx-auto font-inter">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-manrope font-semibold text-slate-900 dark:text-slate-100 hover:text-red-500 transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-red-500 shrink-0 transition-transform duration-300 ${
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
                  transition={{ duration: 0.2 }}
                  className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-inter border-t border-slate-100 dark:border-slate-800/80"
                >
                  <p className="pt-3">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
