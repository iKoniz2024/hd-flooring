'use client';

import { motion } from 'framer-motion';
import { Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
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
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter transform-gpu"
    >
      <div className="relative rounded-3xl bg-[#FAF6F0] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-8 sm:p-12 lg:p-14 text-stone-900 dark:text-white shadow-xl overflow-hidden">
        {/* Decorative Ambient Subtle Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />

        {/* 2-Column Side-by-Side Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Side: Content & Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E85D04] animate-pulse" />
              <span>Free Estimate Request</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-white leading-tight">
              Transform Your Space with <span className="text-[#E85D04]">HD Flooring</span>
            </h2>

            <p className="text-sm sm:text-base font-inter text-stone-600 dark:text-stone-300 font-medium max-w-xl mx-auto lg:mx-0">
              Tell us about your project requirements and let our team help you take the next step with a free, no-obligation quote.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openBookModal()}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#E85D04] text-white font-manrope font-extrabold text-xs uppercase tracking-wider hover:bg-[#d45203] transition-colors shadow-xl shadow-[#E85D04]/25 inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white shrink-0" />
                <span>Book Us Now</span>
              </motion.button>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/contact-us"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white dark:bg-stone-800 hover:bg-stone-100 text-[#E85D04] font-manrope font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 border border-[#E85D04]/40 shadow-sm whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <span>Contact Us</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Dedicated HD Flooring Showcase Photo Frame */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200/80 dark:border-stone-800 h-[260px] sm:h-[320px] w-full">
              <img
                src="https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1000&q=90&fm=webp"
                alt="HD Flooring Installation Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-between text-xs shadow-lg">
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <span>Certified Workmanship</span>
                </div>
                <span className="text-[10px] font-extrabold text-[#E85D04] uppercase tracking-wider bg-[#E85D04]/20 px-2 py-0.5 rounded border border-[#E85D04]/40">
                  100% Guaranteed
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

