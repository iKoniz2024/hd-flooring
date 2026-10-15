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
  Wrench,
  Play,
  Image as ImageIcon,
  Award,
  Truck,
  CalendarCheck
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { UniversalVideoPlayer } from '@/components/video/UniversalVideoPlayer';

export interface ProjectDetailItem {
  _id?: string;
  id?: string;
  title: string;
  location: string;
  category: string;
  propertyType?: 'Residential' | 'Commercial' | string;
  coverImage: string;
  galleryImages?: string[];
  videoUrl?: string;
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
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video'>('video');

  // Reset selected image index and media tab when project changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setLightboxOpen(false);
    setActiveMediaTab(project?.videoUrl ? 'video' : 'photos');
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
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 font-inter">
          {/* Backdrop with rich blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container: App-like bottom sheet on mobile, rounded card on tablet/desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-5xl bg-white dark:bg-stone-900 border-t sm:border border-stone-200/90 dark:border-stone-800 rounded-t-[28px] sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92dvh] sm:max-h-[88vh] flex flex-col"
          >
            {/* Top Accent Gradient Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#E85D04] via-amber-400 to-[#E85D04] shrink-0" />

            {/* Mobile Drag Handle Indicator */}
            <div className="sm:hidden flex justify-center pt-2 pb-0.5 bg-stone-50/80 dark:bg-stone-900/80">
              <div className="w-10 h-1 rounded-full bg-stone-300 dark:bg-stone-700" />
            </div>

            {/* Modal Top Header Bar: Sticky for smooth phone scrolling */}
            <div className="px-4 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between border-b border-stone-100 dark:border-stone-800/80 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md sticky top-0 z-20 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-3 overflow-hidden pr-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/25 text-[#E85D04] text-[10px] sm:text-xs font-black uppercase tracking-wider shrink-0">
                  <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{project.category}</span>
                </span>

                {project.propertyType && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] sm:text-xs font-bold border border-stone-200 dark:border-stone-700 uppercase tracking-wider shrink-0">
                    <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E85D04]" />
                    <span>{project.propertyType}</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold shrink-0">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline">Verified Installation by HD Flooring</span>
                  <span className="sm:hidden">Verified</span>
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 sm:p-2 rounded-full bg-stone-200/70 dark:bg-stone-800 hover:bg-[#E85D04] hover:text-white text-stone-600 dark:text-stone-300 transition-all cursor-pointer shadow-xs shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Main Modal Body: Scrollable with touch momentum */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
                
                {/* LEFT COLUMN: Media Display & Project Execution Highlights */}
                <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
                  {/* Media Switcher Tab (if video is available) */}
                  {project.videoUrl && (
                    <div className="flex items-center justify-between gap-1 p-1 bg-stone-100 dark:bg-stone-850 rounded-xl sm:rounded-2xl border border-stone-200/80 dark:border-stone-750">
                      <div className="flex items-center gap-1 w-full">
                        <button
                          type="button"
                          onClick={() => setActiveMediaTab('video')}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            activeMediaTab === 'video'
                              ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/30'
                              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Video Tour</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveMediaTab('photos')}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            activeMediaTab === 'photos'
                              ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm'
                              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                          }`}
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Photos ({allImages.length})</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Main Media Box: 16:9 Aspect Ratio with Responsive Touch Scaling */}
                  {activeMediaTab === 'video' && project.videoUrl ? (
                    <div className="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-lg border border-stone-200/90 dark:border-stone-800">
                      <UniversalVideoPlayer
                        url={project.videoUrl}
                        title={project.title}
                        poster={project.coverImage}
                        autoPlay={false}
                        muted={false}
                        className="w-full h-full !rounded-xl sm:!rounded-2xl border-0 shadow-none"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/80 group shadow-md">
                      <Image
                        src={currentActiveImage}
                        alt={project.title}
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => setLightboxOpen(true)}
                      />

                      {/* Left/Right Carousel Arrows */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevImage();
                            }}
                            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-stone-950/70 hover:bg-[#E85D04] text-white border border-white/20 transition-all cursor-pointer shadow-md"
                            title="Previous Photo"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextImage();
                            }}
                            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-stone-950/70 hover:bg-[#E85D04] text-white border border-white/20 transition-all cursor-pointer shadow-md"
                            title="Next Photo"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        className="absolute top-2.5 right-2.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md text-white opacity-85 hover:opacity-100 transition-opacity cursor-pointer"
                        title="View Fullscreen Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>

                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md sm:rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium">
                        Photo {selectedImageIdx + 1} of {allImages.length}
                      </div>
                    </div>
                  )}

                  {/* Always Visible: Project Photos Thumbnail Strip with Touch Pan */}
                  {allImages.length > 0 && (
                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E85D04]" />
                          <span>Installation Gallery ({allImages.length} Photos)</span>
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-[#E85D04] font-semibold">Tap photo to zoom</span>
                      </div>

                      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-700 -mx-1 px-1 touch-pan-x">
                        {allImages.map((imgUrl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSelectedImageIdx(idx);
                              setActiveMediaTab('photos');
                            }}
                            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                              activeMediaTab === 'photos' && selectedImageIdx === idx
                                ? 'border-[#E85D04] ring-2 ring-[#E85D04]/30 scale-105 shadow-md'
                                : 'border-stone-200 dark:border-stone-700 opacity-75 hover:opacity-100 hover:border-[#E85D04]/60'
                            }`}
                          >
                            <Image
                              src={imgUrl}
                              alt={`${project.title} thumb ${idx + 1}`}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Craftsmanship Highlights: 2-col on mobile, 4-col on desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-0.5 text-center">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] mx-auto mb-1" />
                      <div className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase">Location</div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mt-0.5 truncate">
                        {project.location || 'Saskatoon'}
                      </div>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] mx-auto mb-1" />
                      <div className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase">Execution</div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mt-0.5">Licensed Team</div>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
                      <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] mx-auto mb-1" />
                      <div className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase">Turnaround</div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mt-0.5">On Schedule</div>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] mx-auto mb-1" />
                      <div className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase">Warranty</div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mt-0.5">Guaranteed</div>
                    </div>
                  </div>

                  {/* Free On-Site Consultation Notice */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-stone-700 dark:text-stone-300 text-[10px] sm:text-[11px]">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] shrink-0" />
                    <span>Free on-site measurements and project quotes across Saskatoon & surrounding areas.</span>
                  </div>
                </div>

                {/* RIGHT COLUMN: Project Details & Conversion CTAs */}
                <div className="lg:col-span-6 space-y-4 sm:space-y-5 flex flex-col justify-between">
                  <div className="space-y-3.5 sm:space-y-4">
                    {/* Project Title & Location */}
                    <div>
                      <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white leading-tight">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E85D04] shrink-0" />
                        <span>{project.location}</span>
                        <span className="text-stone-300 dark:text-stone-700">·</span>
                        <span>HD Flooring Saskatchewan Portfolio</span>
                      </div>
                    </div>

                    {/* Project Story Cards (Challenge, Execution, Outcome) */}
                    <div className="space-y-2.5 sm:space-y-3">
                      {project.challenge && (
                        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50/90 dark:bg-stone-850/60 border border-stone-200/80 dark:border-stone-800 space-y-1">
                          <h4 className="font-extrabold text-[#E85D04] uppercase tracking-wider text-[10px] sm:text-[11px] flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Project Scope & Challenge</span>
                          </h4>
                          <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {project.challenge}
                          </p>
                        </div>
                      )}

                      {project.solution && (
                        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50/90 dark:bg-stone-850/60 border border-stone-200/80 dark:border-stone-800 space-y-1">
                          <h4 className="font-extrabold text-[#E85D04] uppercase tracking-wider text-[10px] sm:text-[11px] flex items-center gap-1.5">
                            <Wrench className="w-3.5 h-3.5" />
                            <span>HD Flooring Execution & Solution</span>
                          </h4>
                          <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {project.solution}
                          </p>
                        </div>
                      )}

                      {project.result && (
                        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
                          <h4 className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[10px] sm:text-[11px] flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Final Outcome & Craftsmanship</span>
                          </h4>
                          <p className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {project.result}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Quality Assurance Card */}
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 flex items-start gap-2.5 sm:gap-3">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#E85D04] shrink-0 mt-0.5" />
                      <div className="text-[10px] sm:text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed">
                        <strong className="text-[#E85D04]">HD Flooring Workmanship Assurance:</strong> Every residential and commercial project is executed by licensed installers with subfloor prep, precision cuts, and full warranty coverage.
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions: Touch-friendly heights & vibrant feedback */}
                  <div className="pt-3 sm:pt-4 border-t border-stone-200/80 dark:border-stone-800 space-y-2 sm:space-y-2.5">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onClose();
                        if (onGetEstimate) onGetEstimate(project.title);
                      }}
                      className="w-full min-h-[46px] sm:min-h-[50px] py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 active:brightness-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#E85D04]/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                    >
                      <Sparkles className="hidden sm:inline-block w-4 h-4 shrink-0" />
                      <span>Request Free Estimate for Similar Project</span>
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/13068808404?text=Hi%20HD%20Flooring%2C%20I%20saw%20your%20project%20"${encodeURIComponent(project.title)}"%20and%20would%20like%20a%20free%20quote%20for%20a%20similar%20flooring%20job.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[44px] py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 active:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#25D366]" />
                      <span>Chat Directly on WhatsApp</span>
                    </motion.a>

                    <p className="text-center text-[9px] sm:text-[10px] text-stone-500 dark:text-stone-400">
                      🔒 100% Free Consultation in Saskatoon & Surrounding Areas · Transparent Pricing
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Fullscreen Image Lightbox Modal */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-60 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
              >
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-stone-900 border border-stone-700 text-stone-200 hover:text-white hover:bg-[#E85D04] transition-colors cursor-pointer z-10"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                  <div className="relative w-full h-[60vh] sm:h-[75vh] rounded-xl sm:rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
                    <Image
                      src={currentActiveImage}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between w-full text-stone-300 text-xs px-2 font-semibold">
                    <span>
                      {project.title} — ({selectedImageIdx + 1} of {allImages.length})
                    </span>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="p-2 sm:p-2.5 rounded-full bg-stone-900 border border-stone-700 hover:border-[#E85D04] text-white transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="p-2 sm:p-2.5 rounded-full bg-stone-900 border border-stone-700 hover:border-[#E85D04] text-white transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
}
