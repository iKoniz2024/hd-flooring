'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
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
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Our Flooring Portfolio"
        title="See the Difference Craftsmanship Makes"
        subtitle="Explore completed residential and commercial flooring installations across Saskatoon, SK, and Saskatchewan communities."
        backgroundImage="/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-52.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects' },
        ]}
        primaryCta={{
          label: 'Request Free Estimate',
          onClick: openBookModal,
        }}
      />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12 overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 font-manrope"
        >
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-colors ${
                activeFilter === cat
                  ? 'text-white bg-red-600 shadow-md shadow-red-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-200/60 dark:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-xl overflow-hidden group flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-manrope font-bold uppercase tracking-wider shadow">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 text-slate-200 text-xs font-manrope font-medium backdrop-blur-md">
                        {project.propertyType}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-red-500 font-manrope font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-inter line-clamp-2 leading-relaxed">
                      {project.result}
                    </p>

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 font-manrope">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1.5 group/link shrink-0"
                      >
                        View Case Study
                        <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover/link:translate-x-1 transition-transform" />
                      </Link>

                      <button
                        onClick={() => openBookModal(project.category)}
                        className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors shrink-0"
                      >
                        Get Similar Quote →
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
