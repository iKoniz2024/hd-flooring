'use client';

import { motion } from 'framer-motion';
import { Sparkles, PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';
import Link from 'next/link';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function FinalCTA() {
  const { openBookModal } = useModal();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="py-10 sm:py-16 lg:py-20 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter transform-gpu"
    >
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#FAF6F0] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-5 sm:p-10 lg:p-14 text-stone-900 dark:text-white shadow-xl overflow-hidden">
        {/* Decorative Ambient Glow */}
        <div className="absolute right-0 top-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center relative z-10">
          
          {/* Left Side: Content & Action Buttons */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5 text-center lg:text-left">
            {/* Pill Badge: whitespace-nowrap prevents awkward line breaks on phones */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-[10px] sm:text-xs font-manrope font-extrabold uppercase tracking-wider whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-[#E85D04] animate-pulse shrink-0" />
              <span>Free In-Home Estimate</span>
            </div>

            {/* Main Heading: Responsive typography that doesn't split into 1-word lines */}
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white leading-[1.2] sm:leading-tight">
              Transform Your Space with <span className="text-[#E85D04]">HD Flooring</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-base font-inter text-stone-600 dark:text-stone-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Tell us about your project requirements and let our Saskatoon craftsmen help you take the next step with a free, no-obligation quote.
            </p>

            {/* Responsive Actions: Primary full width on mobile, Call & WhatsApp in clean 50/50 row */}
            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openBookModal()}
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-full bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] text-white font-manrope font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#E85D04]/25 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free Estimate</span>
                <ArrowRight className="w-4 h-4 shrink-0 hidden sm:inline" />
              </motion.button>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/13068808404?text=Hi%20HD%20Flooring%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20flooring%20installation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-[#25D366] font-manrope font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 sm:gap-2 border border-[#25D366]/40 shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp</span>
                </motion.a>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact-us"
                    className="w-full px-3.5 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-full bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-manrope font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 sm:gap-2 border border-stone-300 dark:border-stone-700 shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#E85D04] shrink-0" />
                    <span>Contact Us</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Side: Showcase Photo Frame */}
          <div className="lg:col-span-5 relative group w-full mt-2 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 dark:border-stone-800 h-[220px] sm:h-[280px] lg:h-[340px] w-full">
              <img
                src="/assets/images/before-after/cta-flooring-transformation.jpg"
                alt="HD Flooring Before and After Transformation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-between text-xs shadow-lg">
                <div className="flex items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] shrink-0" />
                  <span>Certified Workmanship</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase tracking-wider bg-[#E85D04]/20 px-2 py-0.5 rounded border border-[#E85D04]/40 shrink-0">
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
