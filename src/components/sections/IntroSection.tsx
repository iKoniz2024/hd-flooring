'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-inter overflow-hidden">
      {/* Premium Glassmorphic Card Container */}
      <div className="relative rounded-3xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-800 shadow-2xl p-8 sm:p-14 overflow-hidden text-center text-slate-100 backdrop-blur-xl">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
          {/* Top Badge - SLOW reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-manrope font-black uppercase tracking-widest shadow-lg shadow-red-500/10">
              <Sparkles className="w-4 h-4 text-sky-300 animate-pulse" />
              Flooring Installation You Can Count On
            </span>
          </motion.div>

          {/* Heading - SLOW reveal from TOP */}
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md"
          >
            Dependable Craftsmanship for{' '}
            <span className="brand-gradient-text block sm:inline">Canadian Spaces</span>
          </motion.h2>

          {/* Intro Description - SLOW reveal from BOTTOM */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
          >
            At HD Flooring, we make flooring installation simple, professional, and dependable. We partner with homeowners, business owners, contractors, and renovators across Canada to deliver long-lasting, flawless floors.
          </motion.p>

          {/* Feature Highlights Grid - SLOW staggered entrances from LEFT, BOTTOM, and RIGHT */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-red-500/50 transition-all duration-300 shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-lg mb-3">
                01
              </div>
              <h3 className="font-manrope font-extrabold text-white text-base mb-1">Subfloor Leveling</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Precision self-leveling and moisture testing ensure a squeak-free, flat foundation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-sky-500/50 transition-all duration-300 shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg mb-3">
                02
              </div>
              <h3 className="font-manrope font-extrabold text-white text-base mb-1">Master Installation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Expert solid wood, engineered, LVP, laminate, carpet & tile setters with zero shortcuts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-red-500/50 transition-all duration-300 shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-lg mb-3">
                03
              </div>
              <h3 className="font-manrope font-extrabold text-white text-base mb-1">Clean & Reliable</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dust-controlled tear-out, complete site cleanup, and on-time project delivery guaranteed.
              </p>
            </motion.div>
          </div>

          {/* CTA Link Button - SLOW reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4"
          >
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-sky-600 hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-red-600/30 transition-all duration-300 group"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


