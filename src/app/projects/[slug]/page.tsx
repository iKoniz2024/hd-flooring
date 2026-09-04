'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowLeft, Maximize2, ChevronLeft, ChevronRight, X, Sparkles, Images, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { projectsData } from '@/data/projects';
import { useModal } from '@/lib/context/ModalContext';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openBookModal } = useModal();

  const project = projectsData.find((p) => p.slug === slug) || projectsData[0];

  const allImages = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.coverImage];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const scrollToTopSmooth = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    scrollToTopSmooth();
    const timer = setTimeout(scrollToTopSmooth, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  const activeImage = allImages[activeImageIndex] || project.coverImage;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge={`${project.propertyType} • ${project.category}`}
        title={project.title}
        subtitle={`${project.location} • Installation Case Study`}
        backgroundImage={project.coverImage}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
        primaryCta={{
          label: 'Get Similar Flooring',
          onClick: () => openBookModal(project.title),
        }}
      />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12 overflow-hidden">

        {/* Featured Main Image Box - Zoom Expansion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 h-[320px] sm:h-[480px] bg-slate-900">
            <img
              src={activeImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
              <span className="text-white text-xs font-manrope font-semibold bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                Photo {activeImageIndex + 1} of {allImages.length}
              </span>
              <button
                onClick={() => setLightboxOpen(true)}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-manrope font-bold flex items-center gap-2 hover:bg-red-500 transition-colors shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
                View Fullscreen
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-24 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-red-500 scale-105 shadow-md shadow-red-500/30'
                      : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Challenge, Solution, Result Grid - Alternating Left, Up, Right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 font-inter">
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
          >
            <span className="text-xs font-manrope font-bold text-red-500 uppercase tracking-widest">
              01 — The Challenge
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.challenge}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
          >
            <span className="text-xs font-manrope font-bold text-sky-400 uppercase tracking-widest">
              02 — Our Solution
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
          >
            <span className="text-xs font-manrope font-bold text-red-500 uppercase tracking-widest">
              03 — The Result
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.result}
            </p>
          </motion.div>
        </div>

        {/* Category Photo Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 pt-4"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-red-500 uppercase tracking-wider">
                <Images className="w-4 h-4 text-sky-400" />
                Category Showcase Gallery
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                All {project.category} Project Photos
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/95 border border-red-500/30 text-slate-100 shadow-md shadow-red-500/10 shrink-0 whitespace-nowrap">
              <Camera className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span className="text-xs font-manrope font-extrabold text-slate-200">
                <span className="text-red-400 font-black">{allImages.length}</span> HD Photos
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allImages.map((imgUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group relative h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer shadow-md"
              >
                <img
                  src={imgUrl}
                  alt={`${project.category} photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-red-600/90 text-white shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 font-manrope shadow-xl"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-playfair text-xl font-bold text-slate-900 dark:text-slate-100">
              Want a Similar Floor Transformation?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Book a free site consultation for your space today.
            </p>
          </div>
          <button
            onClick={() => openBookModal(project.category)}
            className="px-6 py-3 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition-colors shrink-0 shadow-lg shadow-red-600/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-200" />
            Book This Service
          </button>
        </motion.div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4">
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={activeImage}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between w-full font-manrope text-slate-300 text-xs px-2">
                <span>
                  {project.title} — ({activeImageIndex + 1} / {allImages.length})
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevImage}
                    className="p-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-red-500 text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-red-500 text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

