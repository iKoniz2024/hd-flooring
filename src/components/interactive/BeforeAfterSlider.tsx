'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

export function BeforeAfterSlider() {
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

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 font-inter overflow-hidden">
      {/* Header with SLOW Smooth Reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-4 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-manrope font-black uppercase tracking-widest shadow-lg shadow-red-500/10">
          <Sparkles className="w-4 h-4 text-sky-300 animate-pulse" />
          Interactive Floor Transformation
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 leading-tight">
          See the <span className="brand-gradient-text">HD Flooring Difference</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Drag the interactive slider to compare raw subfloor preparation with a flawlessly installed luxury hardwood finish.
        </p>
      </motion.div>

      {/* Slider Container with SLOW Smooth Zoom & Expansion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[400px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-red-500/40 select-none cursor-ew-resize group backdrop-blur-xl"
      >
        {/* AFTER Image (Finished Luxury Hardwood Floor) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=75&fm=webp')`,
          }}
        >
          <span className="absolute top-5 right-5 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full font-manrope font-black text-xs uppercase tracking-widest shadow-2xl border border-white/20 backdrop-blur-md">
            AFTER — Installed Luxury Hardwood
          </span>
        </div>

        {/* BEFORE Image (Raw Concrete Subfloor Preparation) */}
        <div
          className="absolute inset-0 bg-cover bg-center border-r-4 border-red-500 shadow-2xl"
          style={{
            width: `${sliderPos}%`,
            backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=75&fm=webp')`,
          }}
        >
          <span className="absolute top-5 left-5 bg-slate-950/90 text-red-400 border border-red-500/50 px-4 py-2 rounded-full font-manrope font-black text-xs uppercase tracking-widest shadow-2xl backdrop-blur-md whitespace-nowrap">
            BEFORE — Subfloor Leveling & Prep
          </span>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_25px_rgba(239,68,68,1)] z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-950 text-white border-2 border-red-500 shadow-2xl flex items-center justify-center group-hover:scale-115 transition-transform"
          >
            <SlidersHorizontal className="w-5 h-5 text-red-400" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

