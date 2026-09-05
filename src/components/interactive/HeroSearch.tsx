'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
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
        <div className="relative flex items-center p-2 rounded-2xl bg-white/95 dark:bg-stone-900/95 border border-stone-300 dark:border-stone-800 focus-within:border-amber-500 backdrop-blur-xl shadow-2xl transition-all">
          <Search className="w-5 h-5 text-amber-500 ml-4 shrink-0" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flooring type, e.g. Hardwood, Vinyl, Tile..."
            autoComplete="off"
            className="w-full pl-3 pr-4 py-3 bg-transparent text-stone-900 dark:text-white placeholder:text-stone-500 dark:placeholder:text-stone-400 text-sm font-semibold outline-none"
          />

          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}


