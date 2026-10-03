'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  MapPin,
  Building2,
  Tag,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Wrench
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export interface ProjectDetailItem {
  _id?: string;
  id?: string;
  title: string;
  location: string;
  category: string;
  propertyType?: 'Residential' | 'Commercial' | string;
  coverImage: string;
  galleryImages?: string[];
  challenge?: string;
  solution?: string;
  result?: string;
}

interface ProjectDetailModalProps {
  project: ProjectDetailItem | null;
  isOpen: boolean;
  onClose: () => void;
  onGetEstimate?: (projectTitle: string) => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onGetEstimate,
}: ProjectDetailModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Reset selected image index when project changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setLightboxOpen(false);
  }, [project]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxOpen, onClose]);

  if (!isOpen || !project) return null;

  // Combine cover image and additional gallery images
  const allImages = Array.from(
    new Set([project.coverImage, ...(project.galleryImages || [])])
  ).filter(Boolean);

  const currentActiveImage = allImages[selectedImageIdx] || project.coverImage;

  const handleNextImage = () => {
    setSelectedImageIdx((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 250, damping: 25 }}
            className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Top Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#E85D04] via-orange-400 to-[#E85D04]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 lg:p-10 max-h-[85vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Interactive Image Carousel */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Main Active Image Box */}
                  <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 group shadow-inner">
                    <Image
                      src={currentActiveImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => setLightboxOpen(true)}
                    />

                    {/* Left/Right Carousel Arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-[#E85D04] text-white border border-white/20 transition-all cursor-pointer shadow-md"
                          title="Previous Photo"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-[#E85D04] text-white border border-white/20 transition-all cursor-pointer shadow-md"
                          title="Next Photo"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                      title="View Fullscreen Lightbox"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-manrope font-semibold">
                      Photo {selectedImageIdx + 1} of {allImages.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {allImages.length > 1 && (
                    <div>
                      <p className="text-[11px] font-manrope font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Project Photos ({allImages.length})
                      </p>
                      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                        {allImages.map((imgUrl, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIdx(idx)}
                            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                              selectedImageIdx === idx
                                ? 'border-[#E85D04] ring-2 ring-[#E85D04]/30 scale-105'
                                : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <Image
                              src={imgUrl}
                              alt={`${project.title} thumb ${idx + 1}`}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Project Specifications & Story */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Badges & Header */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-extrabold uppercase tracking-wider">
                        <Tag className="w-3.5 h-3.5" />
                        {project.category}
                      </span>

                      {project.propertyType && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-manrope font-extrabold border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                          <Building2 className="w-3.5 h-3.5 text-[#E85D04]" />
                          {project.propertyType}
                        </span>
                      )}
                    </div>

                    <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      {project.title}
                    </h2>

                    <div className="flex items-center gap-2 text-xs font-manrope font-semibold text-slate-500 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-[#E85D04]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Project Details Cards (Challenge, Solution, Result) */}
                  <div className="space-y-3 text-xs sm:text-sm">
                    {project.challenge && (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
                        <h4 className="font-manrope font-extrabold text-[#E85D04] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5" />
                          Project Scope & Challenge
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                          {project.challenge}
                        </p>
                      </div>
                    )}

                    {project.solution && (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
                        <h4 className="font-manrope font-extrabold text-[#E85D04] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5" />
                          HD Flooring Execution & Solution
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                          {project.solution}
                        </p>
                      </div>
                    )}

                    {project.result && (
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                        <h4 className="font-manrope font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Final Outcome
                        </h4>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-inter">
                          {project.result}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <button
                      onClick={() => {
                        onClose();
                        if (onGetEstimate) onGetEstimate(project.title);
                      }}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Request Free Estimate for Similar Project</span>
                    </button>

                    <a
                      href={`https://wa.me/13068808404?text=${encodeURIComponent(
                        `Hi HD Flooring, I saw your project "${project.title}" in your gallery and would like a quote for my project.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-manrope font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                      <span>Chat Directly on WhatsApp</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Fullscreen Lightbox for Project Photos */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-[#E85D04] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <Image
                src={currentActiveImage}
                alt={project.title}
                fill
                sizes="(max-width: 1200px) 100vw, 80vw"
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between w-full font-manrope text-slate-300 text-xs px-2">
              <span>
                {project.title} — ({selectedImageIdx + 1} / {allImages.length})
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevImage}
                  className="p-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-[#E85D04] text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="p-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-[#E85D04] text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
