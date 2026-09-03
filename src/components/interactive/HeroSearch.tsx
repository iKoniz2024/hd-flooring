'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { servicesData } from '@/data/services';
import { motion, AnimatePresence } from 'framer-motion';

const quickTags = [
  'Hardwood Flooring',
  'Luxury Vinyl',
  'Laminate',
  'Tile Flooring',
  'Replacement',
];

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const filteredServices = servicesData.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

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

  const handleTagClick = (tag: string) => {
    const match = servicesData.find((s) =>
      s.title.toLowerCase().includes(tag.toLowerCase())
    );
    if (match) {
      router.push(`/services/${match.slug}`);
    } else {
      router.push('/services');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative z-20 font-inter">
      {/* Main Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center p-2 rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 bg-white/90 border border-red-500/30 backdrop-blur-xl shadow-2xl shadow-red-950/20 focus-within:border-red-500 transition-all duration-300">
          <Search className="w-5 h-5 text-red-500 ml-4 shrink-0" />

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search flooring type, e.g. Hardwood, Vinyl, Tile..."
            className="w-full pl-3 pr-4 py-3 bg-transparent text-slate-100 placeholder:text-slate-400 text-sm font-manrope outline-none"
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-sky-600 hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-lg shadow-red-600/30 transition-all"
          >
            Search
            <ArrowRight className="w-4 h-4 text-sky-200" />
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown Popup */}
      <AnimatePresence>
        {isOpen && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 rounded-2xl bg-slate-900/95 border border-red-500/30 backdrop-blur-2xl shadow-2xl shadow-black/80 z-30 space-y-1"
          >
            {filteredServices.length > 0 ? (
              filteredServices.slice(0, 4).map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/services/${service.slug}`);
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-red-500/10 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-sm font-manrope font-semibold text-slate-100 group-hover:text-red-400">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 font-inter">
                      {service.shortDesc}
                    </p>
                  </div>
                  <Sparkles className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))
            ) : (
              <div className="p-3 text-xs text-slate-400 text-center font-manrope">
                No matching flooring category found. Press Enter to view all services.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Suggestion Tags */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-3">
        <span className="text-xs text-slate-400 font-manrope font-medium">
          Popular:
        </span>
        {quickTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="text-xs px-3 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-manrope transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
