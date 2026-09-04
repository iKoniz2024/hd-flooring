'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-red-500/20 bg-red-500/5 animate-pulse" />
    );
  }

  const currentTheme = resolvedTheme || theme || 'dark';
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 transition-all duration-300 shadow-sm focus:outline-none flex items-center justify-center shrink-0 cursor-pointer"
      aria-label="Toggle Dark / Light Mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: 1 }}
        transition={{ duration: 0.3, ease: 'backOut' }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
        ) : (
          <Moon className="w-4 h-4 text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
        )}
      </motion.div>
    </motion.button>
  );
}
