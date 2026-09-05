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
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
  {
    name: 'Engineered Hardwood',
    tag: 'Engineered Wood',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
  {
    name: 'Luxury Vinyl & Sheet Vinyl',
    tag: 'LVP / LVT / VCT',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
  {
    name: 'Laminate Flooring',
    tag: 'Laminate',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
  {
    name: 'Carpet Flooring',
    tag: 'Carpet & Padding',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
  {
    name: 'Tile & Porcelain Installation',
    tag: 'Tile & Porcelain',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
  {
    name: 'Stair Flooring & Capping',
    tag: 'Stairwork',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
  {
    name: 'Flooring Repairs & Replacement',
    tag: 'Repairs & Restorations',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
  {
    name: 'Self Leveling & Floor Prep',
    tag: 'Subfloor Prep',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=960&q=55&fm=webp',
  },
];

const typingWords = [
  'Solid Hardwood Floors',
  'Luxury Vinyl Planks (LVP)',
  'Engineered Hardwood',
  'Tile & Porcelain Setting',
  'Stair Flooring & Capping',
  'Laminate Flooring',
  'Subfloor Leveling & Prep',
];

export function Hero() {
  const { openBookModal } = useModal();
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // Typing Animation State
  const [wordIdx, setWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = typingWords[wordIdx];
    const speed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % typingWords.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIdx]);

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
        {/* Active Category Showcase Badge - Slow smooth top-down reveal & continuous float */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIdx}
            initial={{ opacity: 0, y: -45, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.85 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900/95 border-2 border-red-500/60 text-slate-100 shadow-2xl shadow-red-600/20 backdrop-blur-md"
          >
            <Camera className="w-4.5 h-4.5 text-red-500 animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-manrope font-extrabold tracking-wider text-slate-100">
              <span className="text-red-400 font-black">Featured {currentSlideIdx + 1}/9:</span> {currentSlide.name}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Main Headline - SLOW 1.8s smooth entrance & DYNAMIC TYPING ANIMATION */}
        <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] flex flex-col items-center gap-2 sm:gap-3">
          <motion.span
            initial={{ opacity: 0, x: -100, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block font-black text-white"
          >
            Professional Flooring Installation.
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-4xl lg:text-5xl font-manrope font-extrabold text-slate-200 flex flex-wrap items-center justify-center gap-2 pt-1"
          >
            <span>Specializing in</span>
            <span className="brand-gradient-text font-black inline-flex items-center min-h-[1.3em]">
              {currentText}
              <span className="animate-pulse text-sky-400 font-normal ml-0.5">|</span>
            </span>
          </motion.div>
        </h1>

        {/* Subtitle - SLOW 1.8s smooth slide up from BOTTOM */}
        <motion.p
          initial={{ opacity: 0, y: 55, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter text-slate-100 max-w-3xl mx-auto text-base sm:text-2xl leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-extrabold"
        >
          Transform your home or business with professionally installed flooring from HD Flooring. From timeless hardwood and engineered wood to luxury vinyl, laminate, carpet, and tile — tailored to your lifestyle and budget.
        </motion.p>

        {/* Hero Interactive Search Bar - SLOW 1.6s smooth reveal from TOP */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2"
        >
          <HeroSearch />
        </motion.div>

        {/* CTA Buttons - SLOW 1.6s smooth entrance from LEFT & RIGHT + continuous gentle float */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 pt-2 w-full max-w-md sm:max-w-none mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openBookModal()}
            className="w-full sm:w-auto px-7 sm:px-9 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-sky-600 hover:brightness-115 text-white font-manrope font-black text-xs sm:text-sm uppercase tracking-widest shadow-2xl shadow-red-600/40 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-sky-200 shrink-0 animate-pulse" />
              <span>Book Us Now</span>
            </motion.span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/services"
              className="w-full sm:w-auto px-7 sm:px-9 py-4 sm:py-4.5 rounded-full bg-slate-900/95 hover:bg-slate-800 border-2 border-slate-600 hover:border-red-500 text-white font-manrope font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center gap-2 text-center whitespace-nowrap shadow-xl backdrop-blur-md"
            >
              <span>Explore Services</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Category Interactive Indicator Dots - SLOW reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.3 }}
          className="pt-4 flex items-center justify-center gap-2.5"
        >
          {categorySlides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIdx(idx)}
              title={slide.name}
              className={`h-3 rounded-full transition-all duration-500 cursor-pointer ${
                currentSlideIdx === idx
                  ? 'w-10 bg-red-500 shadow-lg shadow-red-500/60'
                  : 'w-3 bg-slate-400/60 hover:bg-white'
              }`}
            />
          ))}
        </motion.div>

        {/* Supporting Trust Indicators - SLOW 1.6s staggered entrance with continuous gentle floating */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm sm:text-base font-manrope font-black text-white border-t border-slate-700/80 drop-shadow-md">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Home className="w-5 h-5 text-red-500 shrink-0" />
            </motion.div>
            <span>Residential & Commercial</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Award className="w-5 h-5 text-sky-400 shrink-0" />
            </motion.div>
            <span>Professional Installation</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
            </motion.div>
            <span>Quality Workmanship</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

