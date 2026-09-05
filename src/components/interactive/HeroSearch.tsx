'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/services';

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const match = servicesData.find(
      (s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.slug.toLowerCase().includes(query.toLowerCase())
    );

    if (match) {
      router.push(`/services/${match.slug}`);
    } else {
      router.push(`/services`);
    }
  };

  return (
    <div className="w-full max-w-2xl relative z-50 font-inter">
      {/* Main Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center p-2 rounded-2xl bg-white/95 dark:bg-stone-900/95 border border-stone-300 dark:border-stone-800 focus-within:border-red-500 backdrop-blur-xl shadow-2xl transition-all">
          <Search className="w-5 h-5 text-red-500 ml-4 shrink-0" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flooring type, e.g. Hardwood, Vinyl, Tile..."
            autoComplete="off"
            className="w-full pl-3 pr-4 py-3 bg-transparent text-stone-900 dark:text-white placeholder:text-stone-500 dark:placeholder:text-stone-400 text-sm font-semibold outline-none"
          />

          {/* Animated Multi-Color Brand Search Button */}
          <motion.button
            type="submit"
            animate={{
              backgroundColor: ['#dc2626', '#f59e0b', '#0ea5e9', '#dc2626'],
              boxShadow: [
                '0 10px 25px -5px rgba(220, 38, 38, 0.4)',
                '0 10px 25px -5px rgba(245, 158, 11, 0.4)',
                '0 10px 25px -5px rgba(14, 165, 233, 0.4)',
                '0 10px 25px -5px rgba(220, 38, 38, 0.4)',
              ],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 shadow-lg cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}


