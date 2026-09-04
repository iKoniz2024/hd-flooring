'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Award, Home } from 'lucide-react';
import { HeroSearch } from '@/components/interactive/HeroSearch';
import { useModal } from '@/lib/context/ModalContext';
import Link from 'next/link';

export function Hero() {
  const { openBookModal } = useModal();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Background Image Layer with Zoom Pulsing */}
      <motion.div
        animate={{ scale: [1.02, 1.08, 1.02] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-30 mix-blend-luminosity"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Brand Vignette & Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-slate-50/60 dark:from-slate-950 dark:via-slate-950/80 dark:to-slate-950/60 pointer-events-none" />
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-1/3 w-[400px] h-[250px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-20">
        {/* Top Floating Badge - Zoom In */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/30 backdrop-blur-md shadow-lg shadow-red-600/10"
        >
          <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="text-xs font-manrope font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
            Canadian Flooring Standards & Craftsmanship
          </span>
        </motion.div>

        {/* Main Headline - Slide Down */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.1]"
        >
          Professional Flooring Installation. <br className="hidden sm:inline" />
          <span className="brand-gradient-text">Built for Canadian Spaces.</span>
        </motion.h1>

        {/* Subtitle - Slide from Left */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-inter text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed"
        >
          Transform your home or business with professionally installed flooring from HD Flooring. From timeless hardwood and engineered wood to luxury vinyl, laminate, carpet, and tile — tailored to your lifestyle and budget.
        </motion.p>

        {/* Hero Interactive Search Bar - Zoom In Expansion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2"
        >
          <HeroSearch />
        </motion.div>

        {/* CTA Buttons - Left and Right Slide */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full max-w-md sm:max-w-none mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openBookModal()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-sky-600 hover:brightness-110 text-white font-manrope font-extrabold text-[11px] sm:text-xs uppercase tracking-widest shadow-2xl shadow-red-600/30 transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200 shrink-0" />
            <span>Book Us Now</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/services"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-manrope font-bold text-[11px] sm:text-xs uppercase tracking-widest hover:border-red-500/50 transition-all duration-300 inline-flex items-center justify-center gap-1.5 text-center whitespace-nowrap shadow-sm"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500 shrink-0" />
            </Link>
          </motion.div>
        </div>

        {/* Supporting Trust Indicators - Staggered Zoom In */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-manrope text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80"
        >
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-2">
            <Home className="w-4 h-4 text-red-500" />
            Residential & Commercial
          </motion.div>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} className="flex items-center gap-2">
            <Award className="w-4 h-4 text-sky-500" />
            Professional Installation
          </motion.div>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            Quality Workmanship
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

