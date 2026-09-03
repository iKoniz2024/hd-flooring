'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Award, Home } from 'lucide-react';
import { HeroSearch } from '@/components/interactive/HeroSearch';
import { useModal } from '@/lib/context/ModalContext';
import Link from 'next/link';

export function Hero() {
  const { openBookModal } = useModal();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-stone-950 text-stone-100">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity scale-105 transition-transform duration-10000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Luxury Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-20">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md shadow-lg shadow-amber-500/10"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-manrope font-semibold text-amber-400 uppercase tracking-widest">
            Canadian Flooring Standards & Craftsmanship
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-100 leading-[1.1]"
        >
          Professional Flooring Installation. <br className="hidden sm:inline" />
          <span className="gold-gradient-text">Built for Canadian Spaces.</span>
        </motion.h1>

        {/* Subtitle / Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-inter text-stone-300 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed"
        >
          Transform your home or business with professionally installed flooring from HD Flooring. From timeless hardwood and engineered wood to luxury vinyl, laminate, carpet, and tile — tailored to your lifestyle and budget.
        </motion.p>

        {/* Hero Interactive Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-2"
        >
          <HeroSearch />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={() => openBookModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:brightness-110 text-stone-950 font-manrope font-bold text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Book Us Now
          </button>

          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-200 font-manrope font-semibold text-xs uppercase tracking-widest hover:border-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </Link>
        </motion.div>

        {/* Supporting Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-manrope text-stone-400 border-t border-stone-800/80"
        >
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-amber-500" />
            Residential & Commercial
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Professional Installation
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            Quality Workmanship
          </div>
        </motion.div>
      </div>
    </section>
  );
}
