'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function BrandLogo({ className = 'h-14' }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme || 'light';
  const isDark = mounted ? currentTheme === 'dark' : false;

  if (imgError) {
    // Premium SVG Vector Logo for HD Flooring
    return (
      <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
        {/* Brand Icon Shield */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#E85D04] via-[#D95B16] to-[#F97316] p-0.5 shadow-xl shadow-[#E85D04]/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full bg-white dark:bg-stone-950 rounded-[12px] flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-center font-black tracking-tighter">
              <span className="text-[#E85D04] text-lg font-extrabold">H</span>
              <span className="text-[#1E293B] dark:text-white text-lg font-extrabold">D</span>
            </div>
          </div>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className="font-black tracking-tight text-xl sm:text-2xl text-stone-900 dark:text-white group-hover:text-[#E85D04] transition-colors">
              HD <span className="text-[#E85D04]">FLOORING</span>
            </span>
          </div>
          <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#E85D04] mt-0.5">
            Canadian Installation
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center shrink-0 ${className}`}>
      <img
        src={isDark ? '/assets/images/dark-logo.png' : '/assets/images/light-logo.png'}
        alt="HD Flooring Logo"
        onError={() => setImgError(true)}
        className="h-full w-auto object-contain drop-shadow-md rounded"
      />
    </div>
  );
}



