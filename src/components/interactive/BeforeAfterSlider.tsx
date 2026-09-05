'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

const transformations = [
  {
    id: 'hardwood',
    label: 'Solid Oak Hardwood',
    icon: '🪵',
    beforeImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=75&fm=webp', // Real active room subfloor renovation
    afterImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=75&fm=webp', // Beautiful finished solid oak floor
    beforeTitle: 'BEFORE — Raw Concrete & Subfloor Prep',
    afterTitle: 'AFTER — Precision Installed Oak Hardwood',
  },
  {
    id: 'vinyl',
    label: 'Waterproof LVP Planks',
    icon: '💧',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=75&fm=webp',
    afterImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=75&fm=webp',
    beforeTitle: 'BEFORE — Uneven Base & Moisture Prep',
    afterTitle: 'AFTER — 100% Waterproof Luxury Vinyl',
  },
  {
    id: 'tile',
    label: 'Porcelain Tile & Grout',
    icon: '🏛️',
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=75&fm=webp',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=75&fm=webp',
    beforeTitle: 'BEFORE — Subfloor Boarding & Membrane',
    afterTitle: 'AFTER — High-Strength Porcelain Tile',
  },
];

export function BeforeAfterSlider() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const current = transformations[activeCategory];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 font-inter overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-4 mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-manrope font-black uppercase tracking-widest shadow-sm">
          <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
          Real Canadian Floor Transformations
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
          See the <span className="brand-gradient-text">HD Flooring Difference</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Drag the handle below to compare raw subfloor preparation with a finished, high-end installation.
        </p>
      </motion.div>

      {/* Category Tabs Switcher */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
        {transformations.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveCategory(idx);
              setSliderPos(50);
            }}
            className={`px-5 py-2.5 rounded-full font-manrope font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border shadow-md ${
              activeCategory === idx
                ? 'bg-red-600 text-white border-red-500 shadow-red-600/30 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-red-500/50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive App-Window Slider Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl overflow-hidden bg-slate-900 border-2 border-red-500/30 shadow-2xl shadow-slate-900/50"
      >
        {/* Mock Window Top Bar */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-manrope font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-3 text-slate-300 font-bold hidden sm:inline">HD Flooring Transformation Studio</span>
          </div>
          <div className="text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            {Math.round(sliderPos)}% Unfinished • {100 - Math.round(sliderPos)}% Finished
          </div>
        </div>

        {/* Interactive Slider Area */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[420px] sm:h-[540px] select-none cursor-ew-resize overflow-hidden"
        >
          {/* AFTER Image (Finished Floor) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-300"
            style={{
              backgroundImage: `url('${current.afterImage}')`,
            }}
          >
            <span className="absolute top-5 right-5 bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-full font-manrope font-black text-xs uppercase tracking-widest shadow-2xl border border-white/20 backdrop-blur-md">
              {current.afterTitle}
            </span>
          </div>

          {/* BEFORE Image (Raw Renovation Subfloor) */}
          <div
            className="absolute inset-0 bg-cover bg-center border-r-4 border-red-500 shadow-2xl transition-all duration-300"
            style={{
              width: `${sliderPos}%`,
              backgroundImage: `url('${current.beforeImage}')`,
            }}
          >
            <span className="absolute top-5 left-5 bg-slate-950/95 text-red-400 border border-red-500/50 px-4 py-2 rounded-full font-manrope font-black text-xs uppercase tracking-widest shadow-2xl backdrop-blur-md whitespace-nowrap">
              {current.beforeTitle}
            </span>
          </div>

          {/* Glowing Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_30px_rgba(239,68,68,1)] z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-13 h-13 rounded-full bg-slate-950 text-white border-2 border-red-500 shadow-2xl flex items-center justify-center group"
            >
              <SlidersHorizontal className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Trust Metrics Bar Underneath */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-center text-xs font-manrope font-extrabold text-slate-700 dark:text-slate-300">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          ⚡ 100% Flat Subfloor Leveling Guarantee
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          🔊 Soundproof Acoustic Underlayment
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          🛡️ 25-Year Manufacturer Installation Warranty
        </div>
      </div>
    </section>
  );
}

