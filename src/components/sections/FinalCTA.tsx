'use client';

import { motion } from 'framer-motion';
import { Sparkles, PhoneCall } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';
import Link from 'next/link';

export function FinalCTA() {
  const { openBookModal } = useModal();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter"
    >
      <div className="relative rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 p-10 sm:p-16 text-white shadow-2xl shadow-red-600/20 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 text-center lg:text-left relative z-10 max-w-xl">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-950/40 border border-white/20 text-white text-xs font-manrope font-extrabold uppercase tracking-wider text-center max-w-full">
            Ready for a New Floor?
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Transform Your Space with HD Flooring
          </h2>
          <p className="text-sm sm:text-base font-inter text-slate-100 font-medium">
            Tell us about your project requirements and let our team help you take the next step.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 relative z-10 w-full lg:w-auto">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openBookModal()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-slate-950 text-white font-manrope font-bold text-[11px] sm:text-xs uppercase tracking-wider hover:bg-slate-900 transition-colors shadow-xl shadow-black/30 inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
            <span>Book Us Now</span>
          </motion.button>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-manrope font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 border border-white/30 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span>Contact Us</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

