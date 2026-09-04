'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Award, Home, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSearch } from '@/components/interactive/HeroSearch';
import { useModal } from '@/lib/context/ModalContext';
import Link from 'next/link';

const categorySlides = [
  {
    name: 'Solid Hardwood Flooring',
    tag: 'Hardwood',
    image: '/assets/images/hardwood-flooring/hardwood-flooring-01.jpg',
  },
  {
    name: 'Engineered Hardwood',
    tag: 'Engineered Wood',
    image: '/assets/images/engineered-hardwood/engineered-hardwood-01.jpg',
  },
  {
    name: 'Luxury Vinyl & Sheet Vinyl',
    tag: 'LVP / LVT / VCT',
    image: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-01.jpg',
  },
  {
    name: 'Laminate Flooring',
    tag: 'Laminate',
    image: '/assets/images/laminate-flooring/laminate-flooring-01.jpg',
  },
  {
    name: 'Carpet Flooring',
    tag: 'Carpet & Padding',
    image: '/assets/images/carpet-flooring/carpet-flooring-01.jpg',
  },
  {
    name: 'Tile & Porcelain Installation',
    tag: 'Tile & Porcelain',
    image: '/assets/images/tile-flooring/tile-flooring-01.jpg',
  },
  {
    name: 'Stair Flooring & Capping',
    tag: 'Stairwork',
    image: '/assets/images/stair-flooring/stair-flooring-01.jpg',
  },
  {
    name: 'Flooring Repairs & Replacement',
    tag: 'Repairs & Restorations',
    image: '/assets/images/flooring-replacement/flooring-replacement-01.jpg',
  },
  {
    name: 'Self Leveling & Floor Prep',
    tag: 'Subfloor Prep',
    image: '/assets/images/floor-preparation/floor-preparation-01.jpg',
  },
];

export function Hero() {
  const { openBookModal } = useModal();
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % categorySlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIdx((prev) => (prev + 1) % categorySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIdx((prev) => (prev - 1 + categorySlides.length) % categorySlides.length);
  };

  const currentSlide = categorySlides[currentSlideIdx];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950 text-slate-100">
      {/* Seamless Stacked Crossfade Slideshow - 0% Black Gap / 0% Flicker */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {categorySlides.map((slide, idx) => (
          <motion.div
            key={slide.image}
            initial={false}
            animate={{
              opacity: currentSlideIdx === idx ? 1 : 0,
              scale: currentSlideIdx === idx ? 1.15 : 1.0,
            }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: currentSlideIdx === idx ? 6 : 0, ease: 'easeOut' },
            }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: `url('${slide.image}')`,
            }}
          />
        ))}
      </div>

      {/* Very Soft Light Tint to Keep Text Clean While Image Remains 100% Visible */}
      <div className="absolute inset-0 bg-slate-950/30 pointer-events-none z-10" />
      
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none z-10"
      />
      <motion.div
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-1/3 w-[400px] h-[250px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none z-10"
      />

      {/* Side Slide Navigators */}
      <div className="hidden md:flex absolute inset-x-4 top-1/2 -translate-y-1/2 items-center justify-between z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          aria-label="Previous Category"
          className="p-3 rounded-full bg-slate-950/40 hover:bg-red-600 text-white border border-white/20 backdrop-blur-md transition-all duration-300 pointer-events-auto shadow-lg hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Category"
          className="p-3 rounded-full bg-slate-950/40 hover:bg-red-600 text-white border border-white/20 backdrop-blur-md transition-all duration-300 pointer-events-auto shadow-lg hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-7 relative z-20">
        {/* Active Category Showcase Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIdx}
            initial={{ opacity: 0, y: -15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.85 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 dark:bg-slate-900/95 border border-red-500/40 text-slate-100 shadow-xl shadow-red-600/10 backdrop-blur-md"
          >
            <Camera className="w-4 h-4 text-red-500 animate-pulse shrink-0" />
            <span className="text-xs font-manrope font-extrabold tracking-wider text-slate-200">
              <span className="text-red-400 font-black">Featured {currentSlideIdx + 1}/9:</span> {currentSlide.name}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Main Headline - Slide Down */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-md"
        >
          Professional Flooring Installation. <br className="hidden sm:inline" />
          <span className="brand-gradient-text">Built for Canadian Spaces.</span>
        </motion.h1>

        {/* Subtitle - Slide from Left */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-inter text-slate-200 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed drop-shadow-sm font-medium"
        >
          Transform your home or business with professionally installed flooring from HD Flooring. From timeless hardwood and engineered wood to luxury vinyl, laminate, carpet, and tile — tailored to your lifestyle and budget.
        </motion.p>

        {/* Hero Interactive Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2"
        >
          <HeroSearch />
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none mx-auto">
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
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-100 font-manrope font-bold text-[11px] sm:text-xs uppercase tracking-widest hover:border-red-500/50 transition-all duration-300 inline-flex items-center justify-center gap-1.5 text-center whitespace-nowrap shadow-lg backdrop-blur-md"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
            </Link>
          </motion.div>
        </div>

        {/* Category Interactive Indicator Dots */}
        <div className="pt-4 flex items-center justify-center gap-2">
          {categorySlides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIdx(idx)}
              title={slide.name}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentSlideIdx === idx
                  ? 'w-9 bg-red-500 shadow-md shadow-red-500/50'
                  : 'w-2.5 bg-slate-500/60 hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Supporting Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-manrope text-slate-300 border-t border-slate-700/60"
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

