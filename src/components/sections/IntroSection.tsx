'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        {/* Top Pill Badge - UPOR THEKE NAMBE (From Top) */}
        <motion.div
          initial={{ opacity: 0, y: -90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-manrope font-black uppercase tracking-widest shadow-sm">
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
            Flooring Installation You Can Count On
          </span>
        </motion.div>

        {/* Heading - BAM THEKE ASBE (From Left) */}
        <motion.h2
          initial={{ opacity: 0, x: -140 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight"
        >
          Dependable Craftsmanship for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-sky-600 block sm:inline">
            Canadian Spaces
          </span>
        </motion.h2>

        {/* Description - DAN THEKE ASBE (From Right) */}
        <motion.p
          initial={{ opacity: 0, x: 140 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed font-medium max-w-3xl mx-auto"
        >
          At HD Flooring, we make flooring installation simple, professional, and dependable. We partner with homeowners, business owners, contractors, and renovators across Canada to deliver long-lasting, flawless floors.
        </motion.p>
      </div>

      {/* 3 Premium Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-14">
        {/* Card 1 - BAM THEKE ASBE (From Left) */}
        <motion.div
          initial={{ opacity: 0, x: -140 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8 }}
          className="group relative p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-md">
            <Layers className="w-7 h-7" />
          </div>
          <div className="text-xs font-manrope font-black uppercase tracking-widest text-red-500 mb-2">
            Foundation First
          </div>
          <h3 className="font-manrope font-extrabold text-xl text-slate-900 dark:text-white mb-3">
            Subfloor Leveling & Prep
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Precision self-leveling compound, moisture testing, and plywood boarding ensure a 100% squeak-free, flat foundation.
          </p>
        </motion.div>

        {/* Card 2 - NIC THEKE UTHTE (From Bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8 }}
          className="group relative p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="text-xs font-manrope font-black uppercase tracking-widest text-sky-500 mb-2">
            15+ Years Experience
          </div>
          <h3 className="font-manrope font-extrabold text-xl text-slate-900 dark:text-white mb-3">
            Master Craftsmanship
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Expert solid wood, engineered, LVP, laminate, carpet, and tile setters with exact expansion spacing and clean trims.
          </p>
        </motion.div>

        {/* Card 3 - DAN THEKE ASBE (From Right) */}
        <motion.div
          initial={{ opacity: 0, x: 140 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8 }}
          className="group relative p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="text-xs font-manrope font-black uppercase tracking-widest text-red-500 mb-2">
            Turnkey Service
          </div>
          <h3 className="font-manrope font-extrabold text-xl text-slate-900 dark:text-white mb-3">
            Clean & Dust-Controlled
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Old floor tear-out, complete dust containment, furniture care, and waste haul-away — delivered on schedule.
          </p>
        </motion.div>
      </div>

      {/* CTA Button - NIC THEKE UTHTE (From Bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="pt-12 text-center"
      >
        <Link
          href="/about-us"
          className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-slate-900 hover:bg-red-600 text-white font-manrope font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-red-600/30 transition-all duration-300 group"
        >
          <span>Learn More About Us</span>
          <ArrowRight className="w-4 h-4 text-sky-400 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
        </Link>
      </motion.div>
    </section>
  );
}
