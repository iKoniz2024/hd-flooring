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
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 font-inter">
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-manrope font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Floor Transformation
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          See the HD Flooring Difference
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-xl mx-auto font-inter">
          Drag the slider to compare raw subfloor preparation with a flawlessly installed luxury hardwood finish.
        </p>
      </div>

      {/* Slider Container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 select-none cursor-ew-resize group"
      >
        {/* AFTER Image (Finished Hardwood Floor) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <span className="absolute top-4 right-4 bg-amber-500/90 text-stone-950 px-3.5 py-1.5 rounded-full font-manrope font-extrabold text-xs uppercase tracking-wider shadow-lg">
            After — Installed Hardwood
          </span>
        </div>

        {/* BEFORE Image (Subfloor Prep / Raw Concrete) */}
        <div
          className="absolute inset-0 bg-cover bg-center border-r-2 border-amber-400"
          style={{
            width: `${sliderPos}%`,
            backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <span className="absolute top-4 left-4 bg-stone-900/90 text-stone-100 px-3.5 py-1.5 rounded-full font-manrope font-semibold text-xs uppercase tracking-wider shadow-lg border border-stone-700">
            Before — Subfloor Prep
          </span>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.8)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-amber-500 text-stone-950 border-2 border-stone-950 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
