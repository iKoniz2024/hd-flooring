'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-red-500/20 bg-red-500/5 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2.5 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 text-red-500 dark:text-red-400 transition-all duration-300 shadow-sm hover:shadow-red-500/20 focus:outline-none"
      aria-label="Toggle Dark / Light Mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0.8 }}
        transition={{ duration: 0.4, ease: 'backOut' }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
        ) : (
          <Moon className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
        )}
      </motion.div>
    </motion.button>
  );
}
