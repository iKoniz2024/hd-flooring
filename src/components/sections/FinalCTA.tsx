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
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter"
    >
      <div className="relative rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 p-8 sm:p-12 lg:p-14 text-white shadow-2xl shadow-red-600/20 overflow-hidden">
        {/* Decorative Ambient Radial Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        {/* 2-Column Side-by-Side Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Side: Content & Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-white text-xs font-manrope font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Ready for a New Floor?</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Transform Your Space with HD Flooring
            </h2>

            <p className="text-sm sm:text-base font-inter text-slate-100 font-medium max-w-xl mx-auto lg:mx-0">
              Tell us about your project requirements and let our team help you take the next step with a free, no-obligation quote.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openBookModal()}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-red-600 font-manrope font-extrabold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-xl shadow-red-900/20 inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                <span>Book Us Now</span>
              </motion.button>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/contact-us"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-manrope font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 border border-white/30 whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-white shrink-0" />
                  <span>Contact Us</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Dedicated HD Flooring Showcase Photo Frame */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 h-[260px] sm:h-[320px] w-full">
              <img
                src="https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1000&q=90&fm=webp"
                alt="HD Flooring Installation Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-between text-xs shadow-lg">
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified Workmanship</span>
                </div>
                <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
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

