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
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 font-inter overflow-hidden">
      {/* Header with Zoom-In */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-manrope font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          Interactive Floor Transformation
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
          See the HD Flooring Difference
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-inter">
          Drag the slider to compare raw subfloor preparation with a flawlessly installed luxury hardwood finish.
        </p>
      </motion.div>

      {/* Slider Container with Zoom Expansion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-red-500/30 select-none cursor-ew-resize group"
      >
        {/* AFTER Image (Finished Hardwood Floor) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=960&q=55&fm=webp')`,
          }}
        >
          <span className="absolute top-4 right-4 bg-red-600/90 text-white px-3.5 py-1.5 rounded-full font-manrope font-extrabold text-xs uppercase tracking-wider shadow-lg">
            After — Installed Hardwood
          </span>
        </div>

        {/* BEFORE Image (Subfloor Prep / Raw Concrete) */}
        <div
          className="absolute inset-0 bg-cover bg-center border-r-2 border-red-500"
          style={{
            width: `${sliderPos}%`,
            backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=960&q=55&fm=webp')`,
          }}
        >
          <span className="absolute top-4 left-4 bg-slate-900/90 text-slate-100 px-3.5 py-1.5 rounded-full font-manrope font-semibold text-xs uppercase tracking-wider shadow-lg border border-slate-700">
            Before — Subfloor Prep
          </span>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
          style={{ left: `${sliderPos}%` }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-red-600 text-white border-2 border-slate-950 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <SlidersHorizontal className="w-5 h-5 text-sky-200" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

