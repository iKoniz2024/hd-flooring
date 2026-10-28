'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface TransformationItem {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeTitle: string;
  afterTitle: string;
}

const transformations: TransformationItem[] = [
  {
    id: 'corridor',
    title: 'Commercial Corridor Flooring',
    beforeImage: '/assets/images/before-after/corridor-before.jpg',
    afterImage: '/assets/images/before-after/corridor-after.png',
    beforeTitle: 'BEFORE',
    afterTitle: 'AFTER',
  },
  {
    id: 'lobby',
    title: 'Hospital & Reception Lobby',
    beforeImage: '/assets/images/before-after/lobby-before.jpg',
    afterImage: '/assets/images/before-after/lobby-after.png',
    beforeTitle: 'BEFORE',
    afterTitle: 'AFTER',
  },
];

function ComparisonCard({ item, index }: { item: TransformationItem; index: number }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore if capture was already released
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-2 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E85D04]" />
          <h3 className="font-jakarta font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            {item.title}
          </h3>
        </div>
        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
          Slide to compare
        </span>
      </div>

      {/* Interactive Slider Area */}
      <div className="rounded-3xl overflow-hidden bg-slate-900 border-2 border-[#E85D04]/30 shadow-2xl shadow-slate-900/40">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[360px] sm:h-[440px] lg:h-[460px] select-none cursor-ew-resize overflow-hidden touch-none"
        >
          {/* AFTER Image (Finished Floor) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-150"
            style={{
              backgroundImage: `url('${item.afterImage}')`,
            }}
          >
            <span className="absolute top-4 right-4 bg-[#E85D04] text-white px-3.5 py-1.5 rounded-full font-manrope font-extrabold text-xs uppercase tracking-widest shadow-xl border border-white/20 backdrop-blur-md pointer-events-none">
              {item.afterTitle}
            </span>
          </div>

          {/* BEFORE Image (Raw / Old Floor) */}
          <div
            className="absolute inset-0 bg-cover bg-center border-r-4 border-[#E85D04] shadow-2xl transition-all duration-150"
            style={{
              width: `${sliderPos}%`,
              backgroundImage: `url('${item.beforeImage}')`,
            }}
          >
            <span className="absolute top-4 left-4 bg-white/95 dark:bg-slate-950/95 text-[#E85D04] border border-[#E85D04]/40 px-3.5 py-1.5 rounded-full font-manrope font-extrabold text-xs uppercase tracking-widest shadow-xl backdrop-blur-md pointer-events-none whitespace-nowrap">
              {item.beforeTitle}
            </span>
          </div>

          {/* Glowing Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#E85D04] shadow-[0_0_25px_rgba(232,93,4,1)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-950 text-stone-900 dark:text-white border-2 border-[#E85D04] shadow-2xl flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 text-[#E85D04]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BeforeAfterSlider() {
  return (
    <section className="w-full relative py-20 px-4 sm:px-6 font-inter overflow-hidden bg-[#FAF6F0]/90 dark:bg-stone-950 border-y border-stone-200/80 dark:border-stone-800">
      {/* Fixed Stationary Golden Background Image Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed opacity-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1655012325185-9e4091a0481c?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        />
        {/* Soft edge vignette to ensure text contrast */}
        <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/40 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
            <span>Before & After Visuals</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            See the <span className="text-[#E85D04]">HD Flooring Difference</span>
          </h2>
        </motion.div>

        {/* 2-Card Comparisons Grid (No Filter Buttons) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {transformations.map((item, idx) => (
            <ComparisonCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
