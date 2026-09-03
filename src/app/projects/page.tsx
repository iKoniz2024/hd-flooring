'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Building2, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { projectsData } from '@/data/projects';
import { useModal } from '@/lib/context/ModalContext';

const filterCategories = [
  'All',
  'Hardwood',
  'Engineered Hardwood',
  'Vinyl',
  'Tile',
  'Residential',
  'Commercial',
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { openBookModal } = useModal();

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Residential' || activeFilter === 'Commercial') {
      return project.propertyType === activeFilter;
    }
    return project.category === activeFilter;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-manrope font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Our Flooring Portfolio
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-stone-100">
            See the Difference Craftsmanship Makes
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base font-inter">
            Explore completed residential and commercial flooring installations across Toronto, GTA, and Canadian communities.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-manrope">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === cat
                  ? 'text-stone-950 bg-amber-500 shadow-md shadow-amber-500/20'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-200/60 dark:bg-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-xl overflow-hidden group flex flex-col justify-between"
              >
                {/* Cover Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-manrope font-bold uppercase tracking-wider shadow">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-stone-900/80 text-stone-200 text-xs font-manrope font-medium backdrop-blur-md">
                      {project.propertyType}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-amber-500 font-manrope">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-inter line-clamp-2 leading-relaxed">
                    {project.result}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 font-manrope">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 group/link"
                    >
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={() => openBookModal(project.category)}
                      className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                      Get Similar Quote →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
