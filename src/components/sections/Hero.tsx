'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Layers, Hammer, Grid, Wrench, Shield } from 'lucide-react';
import { HeroSearch } from '@/components/interactive/HeroSearch';
import Link from 'next/link';

const heroServices = [
  {
    title: 'Hardwood Flooring',
    subtitle: 'Solid & Engineered',
    icon: Hammer,
    href: '/services/hardwood-flooring',
  },
  {
    title: 'Luxury Vinyl (LVP)',
    subtitle: '100% Waterproof',
    icon: Layers,
    href: '/services/luxury-vinyl-flooring',
  },
  {
    title: 'Tile & Porcelain',
    subtitle: 'Kitchen & Bathroom',
    icon: Grid,
    href: '/services/tile-flooring',
  },
  {
    title: 'Laminate Floors',
    subtitle: 'High Durability',
    icon: Shield,
    href: '/services/laminate-flooring',
  },
  {
    title: 'Subfloor & Stairs',
    subtitle: 'Leveling & Capping',
    icon: Wrench,
    href: '/services/stair-flooring',
  },
];

const categorySlides = [
  {
    name: 'Solid Hardwood Flooring',
    tag: 'Real Wood Grain',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1920&q=95',
  },
  {
    name: 'Luxury Vinyl Plank (LVP)',
    tag: '100% Waterproof',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1920&q=95',
  },
  {
    name: 'Tile & Porcelain Installation',
    tag: 'Kitchen & Bathroom',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1920&q=95',
  },
  {
    name: 'Premium Laminate Flooring',
    tag: 'Herringbone & Planks',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1920&q=95',
  },
  {
    name: 'Stair Capping & Subfloor Prep',
    tag: 'Wood Treads & Leveling',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1920&q=95',
  },
];

export function Hero() {
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
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-0 px-4 sm:px-6 lg:px-8 bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      {/* Background Slideshow */}
      <div className="absolute inset-x-0 top-0 bottom-24 sm:bottom-28 lg:bottom-32 overflow-hidden pointer-events-none z-0 opacity-85 dark:opacity-80 transition-opacity">
        {categorySlides.map((slide, idx) => (
          <motion.div
            key={slide.image}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{
              opacity: currentSlideIdx === idx ? 1 : 0,
              scale: currentSlideIdx === idx ? 1.08 : 1.0,
            }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: currentSlideIdx === idx ? 6.5 : 0, ease: 'easeOut' },
            }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 bottom-24 sm:bottom-28 lg:bottom-32 bg-gradient-to-r from-stone-100/85 via-stone-100/50 to-stone-100/15 dark:from-stone-950/85 dark:via-stone-950/50 dark:to-stone-950/20 pointer-events-none z-10" />

      {/* Left Slide Control Button */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-stone-900/90 hover:bg-amber-500 text-stone-900 dark:text-white hover:text-stone-950 border border-stone-300 dark:border-stone-700 shadow-xl transition-all hover:scale-110 pointer-events-auto"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Slide Control Button */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-stone-900/90 hover:bg-amber-500 text-stone-900 dark:text-white hover:text-stone-950 border border-stone-300 dark:border-stone-700 shadow-xl transition-all hover:scale-110 pointer-events-auto"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto w-full relative z-20 space-y-8">
        <div className="max-w-4xl text-left space-y-6 pb-8">
          {/* Minimal Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIdx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 dark:bg-stone-900/90 border border-amber-500/50 text-stone-900 dark:text-stone-100 shadow-md backdrop-blur-md"
            >
              <Camera className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
              <span className="text-xs font-semibold">
                <span className="text-amber-600 dark:text-amber-400">Featured ({currentSlideIdx + 1}/5):</span> {currentSlide.name}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Minimal Headline */}
          <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 dark:text-white leading-[1.15]">
            Professional Flooring Installation
            <div className="text-xl sm:text-3xl font-extrabold text-stone-700 dark:text-stone-300 flex items-center gap-2 pt-1">
              <span>Specializing in</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlideIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-amber-600 dark:text-amber-400 font-black inline-flex items-center"
                >
                  {currentSlide.name}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          {/* Ultra Minimal Subtitle */}
          <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base font-normal max-w-2xl">
            Quality Canadian installation for residential & commercial spaces.
          </p>

          {/* Interactive Search Bar Widget */}
          <div className="pt-1 max-w-3xl relative z-50">
            <HeroSearch />
          </div>
        </div>

        {/* 5-Card Quick Services Banner Grid (50% Inside / 50% Outside ipropertybd Style) */}
        <div className="relative z-30 -mb-24 sm:-mb-28 lg:-mb-32">
          <div className="mb-3 text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Our Core Flooring Services</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {heroServices.map((srv, idx) => {
              const Icon = srv.icon;
              const isActive = currentSlideIdx === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setCurrentSlideIdx(idx)}
                  onClick={() => setCurrentSlideIdx(idx)}
                  className={`group relative rounded-2xl border transition-all duration-500 ease-out overflow-hidden flex flex-col justify-between min-h-[190px] cursor-pointer p-6 pb-14 ${
                    isActive
                      ? 'bg-stone-950 text-white border-amber-500 shadow-2xl -translate-y-2'
                      : 'bg-white dark:bg-stone-900 hover:bg-stone-950 dark:hover:bg-stone-950 border-stone-200 dark:border-stone-800 hover:border-amber-500/80 shadow-2xl hover:-translate-y-2.5'
                  }`}
                >
                  {/* Top Animated Gold Accent Bar */}
                  <div
                    className={`h-1 bg-amber-500 transition-all duration-500 absolute top-0 left-0 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />

                  <div className="space-y-3">
                    {/* Icon Box */}
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-lg ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 border-amber-500 scale-110'
                          : 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-500 group-hover:scale-110'
                      }`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3
                        className={`font-playfair font-black text-base sm:text-lg transition-colors duration-300 leading-snug ${
                          isActive ? 'text-amber-400' : 'text-stone-900 dark:text-stone-100 group-hover:text-white'
                        }`}
                      >
                        {srv.title}
                      </h3>
                      <p
                        className={`text-xs font-semibold transition-colors duration-300 mt-1 ${
                          isActive ? 'text-stone-300' : 'text-stone-500 dark:text-stone-400 group-hover:text-stone-300'
                        }`}
                      >
                        {srv.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Right Corner Gold Chevron Box */}
                  <Link
                    href={srv.href}
                    className={`absolute bottom-0 right-0 w-11 h-11 rounded-tl-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-lg transition-all duration-300 ${
                      isActive ? 'bg-amber-400 scale-110' : 'group-hover:bg-amber-400 group-hover:scale-110'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
