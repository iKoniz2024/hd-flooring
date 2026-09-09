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
    barBg: 'bg-[#E85D04]',
    iconBg: 'bg-[#E85D04]/10 border-[#E85D04]/30 text-[#E85D04] group-hover:bg-[#E85D04] group-hover:text-white',
    activeIconBg: 'bg-[#E85D04] text-white border-[#E85D04] shadow-md shadow-[#E85D04]/30',
    activeText: 'text-[#E85D04]',
    btnBg: 'bg-[#E85D04] text-white',
    activeBorder: 'border-[#E85D04]',
    glowColor: 'shadow-[#E85D04]/20',
  },
  {
    title: 'Luxury Vinyl (LVP)',
    subtitle: '100% Waterproof',
    icon: Layers,
    href: '/services/luxury-vinyl-flooring',
    barBg: 'bg-[#E85D04]',
    iconBg: 'bg-[#E85D04]/10 border-[#E85D04]/30 text-[#E85D04] group-hover:bg-[#E85D04] group-hover:text-white',
    activeIconBg: 'bg-[#E85D04] text-white border-[#E85D04] shadow-md shadow-[#E85D04]/30',
    activeText: 'text-[#E85D04]',
    btnBg: 'bg-[#E85D04] text-white',
    activeBorder: 'border-[#E85D04]',
    glowColor: 'shadow-[#E85D04]/20',
  },
  {
    title: 'Tile & Porcelain',
    subtitle: 'Kitchen & Bathroom',
    icon: Grid,
    href: '/services/tile-flooring',
    barBg: 'bg-[#E85D04]',
    iconBg: 'bg-[#E85D04]/10 border-[#E85D04]/30 text-[#E85D04] group-hover:bg-[#E85D04] group-hover:text-white',
    activeIconBg: 'bg-[#E85D04] text-white border-[#E85D04] shadow-md shadow-[#E85D04]/30',
    activeText: 'text-[#E85D04]',
    btnBg: 'bg-[#E85D04] text-white',
    activeBorder: 'border-[#E85D04]',
    glowColor: 'shadow-[#E85D04]/20',
  },
  {
    title: 'Laminate Floors',
    subtitle: 'High Durability',
    icon: Shield,
    href: '/services/laminate-flooring',
    barBg: 'bg-[#E85D04]',
    iconBg: 'bg-[#E85D04]/10 border-[#E85D04]/30 text-[#E85D04] group-hover:bg-[#E85D04] group-hover:text-white',
    activeIconBg: 'bg-[#E85D04] text-white border-[#E85D04] shadow-md shadow-[#E85D04]/30',
    activeText: 'text-[#E85D04]',
    btnBg: 'bg-[#E85D04] text-white',
    activeBorder: 'border-[#E85D04]',
    glowColor: 'shadow-[#E85D04]/20',
  },
  {
    title: 'Subfloor & Stairs',
    subtitle: 'Leveling & Capping',
    icon: Wrench,
    href: '/services/stair-flooring',
    barBg: 'bg-[#E85D04]',
    iconBg: 'bg-[#E85D04]/10 border-[#E85D04]/30 text-[#E85D04] group-hover:bg-[#E85D04] group-hover:text-white',
    activeIconBg: 'bg-[#E85D04] text-white border-[#E85D04] shadow-md shadow-[#E85D04]/30',
    activeText: 'text-[#E85D04]',
    btnBg: 'bg-[#E85D04] text-white',
    activeBorder: 'border-[#E85D04]',
    glowColor: 'shadow-[#E85D04]/20',
  },
];

const categorySlides = [
  {
    name: 'Solid Hardwood Flooring',
    tag: 'Real Wood Grain',
    image: 'https://www.floorstores.com/wp-content/uploads/2026/06/67907_847_solidtech_campaign_image_03.webp',
  },
  {
    name: 'Luxury Vinyl Plank (LVP)',
    tag: '100% Waterproof',
    image: 'https://static.homeguide.com/assets/images/content/homeguide-living-room-with-luxury-vinap-plank-lvp-flooring-by-Floorzz.jpg',
  },
  {
    name: 'Tile & Porcelain Installation',
    tag: 'Kitchen & Bathroom',
    image: 'https://apollotile.com/cdn/shop/files/How-to-Install-Porcelain-Tile.jpg?v=1763720975&width=1600',
  },
  {
    name: 'Premium Laminate Flooring',
    tag: 'Herringbone & Planks',
    image: 'https://www.eurostyleflooring.ca/wp-content/uploads/eurostyle-the-norwegian-stavanger-laminate-002.jpg',
  },
  {
    name: 'Stair Capping & Subfloor Prep',
    tag: 'Wood Treads & Leveling',
    image: 'https://www.merinolaminates.com/wp-content/uploads/2025/12/Featured-image-2-4.jpg',
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
    <section className="relative pt-36 sm:pt-44 lg:pt-48 pb-0 px-4 sm:px-6 lg:px-8 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      {/* Background Slideshow */}
      <div className="absolute inset-x-0 top-0 bottom-24 sm:bottom-28 lg:bottom-32 overflow-hidden pointer-events-none z-0 opacity-95 transition-opacity">
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
            className="absolute inset-0 pointer-events-none transform-gpu will-change-transform"
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover object-[center_70%] sm:object-[center_75%]"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        ))}
      </div>

      {/* Premium Smoked Blackish Glass Overlay - Left side 15%, Right side 75% smoked black glass */}
      <div className="absolute inset-x-0 top-0 bottom-24 sm:bottom-28 lg:bottom-32 backdrop-blur-[3px] bg-gradient-to-l from-black/75 via-black/45 to-black/15 pointer-events-none z-10" />

      {/* Left Slide Control Button */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-stone-900/90 hover:bg-[#E85D04] text-stone-900 dark:text-white hover:text-white border border-stone-300 dark:border-stone-700 shadow-xl transition-all hover:scale-110 pointer-events-auto"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Slide Control Button */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-stone-900/90 hover:bg-[#E85D04] text-stone-900 dark:text-white hover:text-white border border-stone-300 dark:border-stone-700 shadow-xl transition-all hover:scale-110 pointer-events-auto"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto w-full relative z-20 space-y-8">
        <div className="max-w-4xl text-left space-y-6 pb-8">
          {/* Minimal Badge - Logo Red & Sky Mixed */}


          {/* Hero Headline with Coral Red & Teal Brand Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-jakarta text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]"
          >
            Professional Flooring Installation
            <div className="text-xl sm:text-3xl font-extrabold text-stone-200 flex items-center gap-2 pt-1 flex-wrap">
              <span>Built for Canadian Spaces —</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlideIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[#E85D04] font-black inline-flex items-center"
                >
                  {currentSlide.name}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-stone-200 text-sm sm:text-base font-semibold max-w-2xl"
          >
            Hardwood, luxury vinyl plank, laminate, carpet & tile installation for Canadian homes and businesses.
          </motion.p>

          {/* Interactive Search Bar Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="pt-1 max-w-3xl relative z-50 space-y-4"
          >
            <HeroSearch />




          </motion.div>
        </div>

        {/* 5-Card Quick Services Banner Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="relative z-30 -mb-24 sm:-mb-28 lg:-mb-32"
        >


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {heroServices.map((srv, idx) => {
              const Icon = srv.icon;
              const isActive = currentSlideIdx === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.65 + idx * 0.08 }}
                  onMouseEnter={() => setCurrentSlideIdx(idx)}
                  onClick={() => setCurrentSlideIdx(idx)}
                  className={`group relative rounded-3xl transition-all duration-500 ease-out overflow-hidden flex flex-col justify-between min-h-[190px] cursor-pointer p-6 pb-14 backdrop-blur-xl ${isActive
                    ? `bg-white/95 dark:bg-stone-900/90 border-2 ${srv.activeBorder} shadow-2xl ${srv.glowColor} -translate-y-2`
                    : 'bg-white/85 dark:bg-stone-900/85 hover:bg-white/95 dark:hover:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800/90 hover:border-[#E85D04]/60 dark:hover:border-[#E85D04]/60 shadow-xl hover:shadow-2xl hover:-translate-y-2'
                    }`}
                >
                  {/* Floor Background Image Overlay - Only Visible on Active Card */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
                    <img
                      src={categorySlides[idx].image}
                      alt={srv.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'scale-105 opacity-25 dark:opacity-30' : 'opacity-0 scale-100'
                        }`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-white/30 dark:from-stone-900/95 dark:via-stone-900/80 dark:to-stone-900/40" />
                    )}
                  </div>

                  {/* Top Animated Brand Color Accent Bar */}
                  <div
                    className={`h-1.5 ${srv.barBg} transition-all duration-500 absolute top-0 left-0 z-10 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />

                  <div className="space-y-3 relative z-10">
                    {/* Icon Box with Brand Color Mix */}
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-lg ${isActive ? `${srv.activeIconBg} scale-110` : srv.iconBg
                        }`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3
                        className={`font-jakarta font-extrabold text-base sm:text-lg transition-colors duration-300 leading-snug ${isActive ? srv.activeText : 'text-stone-900 dark:text-stone-100 group-hover:text-[#E85D04] dark:group-hover:text-[#E85D04]'
                          }`}
                      >
                        {srv.title}
                      </h3>
                      <p
                        className={`text-xs font-semibold transition-colors duration-300 mt-1 ${isActive ? 'text-stone-600 dark:text-stone-300' : 'text-stone-500 dark:text-stone-400'
                          }`}
                      >
                        {srv.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Right Corner Brand Color Action Box */}
                  <Link
                    href={srv.href}
                    className={`absolute bottom-0 right-0 w-11 h-11 rounded-tl-2xl z-10 ${srv.btnBg} flex items-center justify-center font-black shadow-lg transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
