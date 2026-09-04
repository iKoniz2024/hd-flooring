'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollToTopSmooth = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    scrollToTopSmooth();

    const timer = setTimeout(scrollToTopSmooth, 100);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

