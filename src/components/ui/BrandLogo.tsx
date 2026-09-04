'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function BrandLogo({ className = 'h-10' }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme || 'dark';
  const isDark = currentTheme === 'dark';

  return (
    <div className={`relative flex items-center shrink-0 ${className}`}>
      {mounted ? (
        <img
          src={isDark ? '/assets/images/dark-logo.png' : '/assets/images/light-logo.png'}
          alt="HD Flooring Logo"
          className="h-full w-auto object-contain drop-shadow-md rounded"
        />
      ) : (
        <>
          <img
            src="/assets/images/light-logo.png"
            alt="HD Flooring Logo"
            className="h-full w-auto object-contain block dark:hidden drop-shadow-md rounded"
          />
          <img
            src="/assets/images/dark-logo.png"
            alt="HD Flooring Logo"
            className="h-full w-auto object-contain hidden dark:block drop-shadow-md rounded"
          />
        </>
      )}
    </div>
  );
}



