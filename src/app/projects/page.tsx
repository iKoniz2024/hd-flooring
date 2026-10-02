'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, X, MapPin, ChevronLeft, ChevronRight, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { useModal } from '@/lib/context/ModalContext';

interface ProjectPhoto {
  id: string;
  src: string;
  title: string;
  location: string;
  category?: string;
  propertyType?: string;
}

export default function ProjectsPage() {
  const { openBookModal } = useModal();
  const [projectPhotos, setProjectPhotos] = useState<ProjectPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const formatted: ProjectPhoto[] = data.data.flatMap((item: {
            _id: string;
            title: string;
            location: string;
            coverImage: string;
            galleryImages?: string[];
            category?: string;
            propertyType?: string;
          }) => {
            const allImages = Array.from(new Set([item.coverImage, ...(item.galleryImages || [])])).filter(Boolean);
            return allImages.map((imgSrc, idx) => ({
              id: `${item._id}-${idx}`,
              src: imgSrc,
              title: item.title,
              location: item.location || 'Saskatoon & Area',
              category: item.category || 'Flooring Project',
              propertyType: item.propertyType || 'Residential',
            }));
          });
          setProjectPhotos(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch projects gallery:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const selectedPhoto = selectedIdx !== null && projectPhotos[selectedIdx] ? projectPhotos[selectedIdx] : null;

  const handlePrev = () => {
    if (selectedIdx === null || projectPhotos.length === 0) return;
    setSelectedIdx((prev) => (prev! === 0 ? projectPhotos.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (selectedIdx === null || projectPhotos.length === 0) return;
    setSelectedIdx((prev) => (prev! === projectPhotos.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-x-clip">
      {/* Dynamic Mouse Spotlight & Ambient Lighting */}
      <MouseSpotlight />

      {/* Ambient Background Light Blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      {/* Hero Section */}
      <PageHero
        badge="HD Flooring Workmanship Gallery"
        badgeIcon="camera"
        title="Our Flooring Project Gallery"
        backgroundImage="/assets/images/engineered-hardwood/engineered-hardwood-01.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Project Gallery' },
        ]}
        primaryCta={{
          label: 'Request Free Estimate',
          onClick: openBookModal,
        }}
      />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10 relative z-10">
        {/* Gallery Header Counter */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] flex items-center justify-center shadow-sm">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Workmanship Gallery
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-inter font-medium">
                {loading
                  ? 'Loading project photos from database...'
                  : `Showing ${Math.min(visibleCount, projectPhotos.length)} of ${projectPhotos.length} On-Site Photos`}
              </p>
            </div>
          </div>

          <button
            onClick={() => openBookModal('Project Gallery')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E85D04] to-[#f06810] text-white font-manrope font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#E85D04]/30 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Installation</span>
          </button>
        </div>

        {/* Gallery State Views */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-9 h-9 text-[#E85D04] animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Fetching project gallery...
            </p>
          </div>
        ) : projectPhotos.length === 0 ? (
          <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
              <ImageIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-playfair">No Project Photos Available Yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Our team is currently updating our project portfolio. Check back soon or request a free estimate today to view our material samples!
              </p>
            </div>
            <button
              onClick={() => openBookModal('Project Gallery Empty')}
              className="px-6 py-3 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#E85D04]/20 cursor-pointer"
            >
              Request Free Estimate & Samples
            </button>
          </div>
        ) : (
          /* Pure Photo Gallery Grid (Glassmorphism & Glowing Hover Accents) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projectPhotos.slice(0, visibleCount).map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index % 12) * 0.03 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedIdx(index)}
                className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/90 backdrop-blur-md cursor-pointer shadow-lg hover:shadow-2xl hover:border-[#E85D04]/50 transition-all duration-300 transform-gpu"
              >
                {/* Top Glowing Orange Accent Line on Hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                {/* Photo Image */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />

                {/* Dark Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Zoom Button Icon */}
                <div className="absolute top-3 right-3 pointer-events-none z-20">
                  <div className="w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1 text-left z-20">
                  <div className="flex items-center justify-between gap-1 text-[11px] font-manrope text-[#E85D04] font-bold">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{photo.location}</span>
                    </div>
                    {photo.category && (
                      <span className="px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-extrabold uppercase tracking-wider">
                        {photo.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-playfair text-sm sm:text-base font-bold text-white group-hover:text-[#E85D04] transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More & Show Less Buttons */}
        {!loading && projectPhotos.length > 24 && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            {visibleCount < projectPhotos.length && (
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 24, projectPhotos.length))}
                className="px-8 py-3.5 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#E85D04]/20 cursor-pointer"
              >
                Load More Photos ({projectPhotos.length - visibleCount} Remaining)
              </button>
            )}

            {visibleCount > 24 && (
              <button
                onClick={() => {
                  setVisibleCount(24);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-manrope font-bold text-xs uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-700 cursor-pointer shadow-lg"
              >
                Show Less / Hide Extra Photos ↑
              </button>
            )}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Top Glowing Orange Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90 rounded-t-3xl z-30" />
              {/* Top Header Bar */}
              <div className="p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/80">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#E85D04] font-semibold font-manrope">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedPhoto.location}</span>
                    {selectedPhoto.category && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-slate-800 text-white text-[10px] uppercase font-bold">
                        {selectedPhoto.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-white">
                    {selectedPhoto.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedIdx(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-[#E85D04] transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Display */}
              <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[450px]">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-h-[60vh] sm:max-h-[70vh] w-auto object-contain select-none"
                />

                {/* Left/Right Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-[#E85D04] transition-colors flex items-center justify-center shadow-lg backdrop-blur-md"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-[#E85D04] transition-colors flex items-center justify-center shadow-lg backdrop-blur-md"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-manrope font-semibold">
                  Photo {selectedIdx + 1} of {projectPhotos.length}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedIdx(null);
                      openBookModal(selectedPhoto.title);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#E85D04] text-white text-xs font-manrope font-bold uppercase tracking-wider hover:bg-[#d45203] transition-colors shadow-lg shadow-[#E85D04]/20"
                  >
                    Get Free Estimate For Similar Work
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
