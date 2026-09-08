'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

const transformations = [
  {
    id: 'hardwood',
    label: 'Solid Oak Hardwood',
    icon: '🪵',
    beforeImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=90&fm=webp', // Real active room subfloor renovation
    afterImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=90&fm=webp', // Beautiful finished solid oak floor
    beforeTitle: 'BEFORE — Raw Concrete & Subfloor Prep',
    afterTitle: 'AFTER — Precision Installed Oak Hardwood',
  },
  {
    id: 'vinyl',
    label: 'Waterproof LVP Planks',
    icon: '💧',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=90&fm=webp',
    afterImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90&fm=webp',
    beforeTitle: 'BEFORE — Uneven Base & Moisture Prep',
    afterTitle: 'AFTER — 100% Waterproof Luxury Vinyl',
  },
  {
    id: 'tile',
    label: 'Porcelain Tile & Grout',
    icon: '🏛️',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=90&fm=webp',
    afterImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=90&fm=webp',
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

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={sectionRef} className="w-full relative py-20 px-4 sm:px-6 font-inter overflow-hidden bg-[#FAF6F0]/90 dark:bg-stone-950 border-y border-stone-200/80 dark:border-stone-800">
      {/* Fixed Stationary Golden Background Image Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full bg-fixed bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1655012325185-9e4091a0481c?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        />
        {/* Soft edge vignette to ensure text contrast */}
        <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/40 pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - UPOR THEKE NAMBE (From Top) */}
      <motion.div
        initial={{ opacity: 0, y: -90 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-8 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
          <span>Before & After Visuals</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
          See the <span className="text-[#E85D04]">HD Flooring Difference</span>
        </h2>
      </motion.div>

      {/* Category Tabs Switcher - NIC THEKE UTHTE (From Bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-2 sm:gap-4 mb-8 flex-wrap"
      >
        {transformations.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveCategory(idx);
              setSliderPos(50);
            }}
            className={`px-5 py-2.5 rounded-full font-manrope font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border shadow-md ${activeCategory === idx
                ? 'bg-[#E85D04] text-white border-[#E85D04] shadow-[#E85D04]/30 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#E85D04]/50'
              }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Interactive App-Window Slider Container - NIC THEKE UTHTE (From Bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl overflow-hidden bg-slate-900 border-2 border-[#E85D04]/30 shadow-2xl shadow-slate-900/50"
      >


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
            <span className="absolute top-5 right-5 bg-[#E85D04] text-white px-4 py-2 rounded-full font-manrope font-black text-xs uppercase tracking-widest shadow-2xl border border-white/20 backdrop-blur-md">
              {current.afterTitle}
            </span>
          </div>

          {/* BEFORE Image (Raw Renovation Subfloor) */}
          <div
            className="absolute inset-0 bg-cover bg-center border-r-4 border-[#E85D04] shadow-2xl transition-all duration-300"
            style={{
              width: `${sliderPos}%`,
              backgroundImage: `url('${current.beforeImage}')`,
            }}
          >
            <span className="absolute top-5 left-5 bg-white/95 dark:bg-slate-950/95 text-[#E85D04] border border-[#E85D04]/40 px-4 py-2 rounded-full font-manrope font-black text-xs uppercase tracking-widest shadow-2xl backdrop-blur-md whitespace-nowrap">
              {current.beforeTitle}
            </span>
          </div>

          {/* Glowing Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#E85D04] shadow-[0_0_30px_rgba(232,93,4,1)] z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-13 h-13 rounded-full bg-white dark:bg-slate-950 text-stone-900 dark:text-white border-2 border-[#E85D04] shadow-2xl flex items-center justify-center group"
            >
              <SlidersHorizontal className="w-6 h-6 text-[#E85D04] group-hover:scale-110 transition-transform" />
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>

    </section>
  );
}

