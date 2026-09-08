'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, X, MapPin, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { useModal } from '@/lib/context/ModalContext';

interface ProjectPhoto {
  id: string;
  src: string;
  title: string;
  location: string;
}

const photoDescriptors: Record<string, string[]> = {
  'luxury-vinyl-flooring': [
    'Watertight Commercial Sheet Vinyl & Flash Coving',
    'Acoustic Click-Lock LVP Plank Installation',
    'Stone Polymer Core (SPC) Waterproof Planks',
    'Seamless Heat-Welded Vinyl Perimeter Joint',
    'Modern Slate-Look Luxury Vinyl Tile (LVT)',
    'High-Traffic Commercial Office Vinyl Fit',
    'Open Concept Basement Waterproof LVP Floor',
    'Precision Plank Layout & Expansion Jointing',
    'Healthcare-Grade Hygienic Sheet Vinyl Base',
    'Floating Click-Lock Vinyl over Concrete Slab',
    'Custom Perimeter Baseboard Trimming',
    'Non-Slip Commercial VCT Floor Setting',
  ],
  'laminate-flooring': [
    'High AC4 Wear-Layer Laminate Plank Lay',
    'Photo-Realistic Wood Grain Laminate Floor',
    'Acoustic IXPE Underlayment Cushion Setup',
    'Interlocking Click-System Laminate Planks',
    'Herringbone Pattern Laminate Fitting',
    'Living Room Scratch-Resistant Flooring',
    'Bedroom Laminate Plank Transformation',
    'Subfloor Moisture Barrier & Board Fit',
  ],
  'tile-flooring': [
    'Large-Format Porcelain Tile Setting',
    'Laser-Leveled Bathroom Floor & Wall Tiles',
    'Stain-Resistant Epoxy Grout Application',
    'Custom Mosaic Tile Entrance Foyer',
    'Polished Commercial Showroom Tile',
    'Waterproof Membrane Subfloor Preparation',
  ],
  'carpet-flooring': [
    'Plush Master Suite Carpet Stretch-In',
    'High-Density Acoustic Padding Cushion',
    'Non-Slip Commercial Berber Carpet Tiles',
    'Seamless Carpet Seam Heat-Bonding',
    'Quiet Boardroom Sound-Absorbing Carpet',
  ],
  'stair-flooring': [
    'Custom Hardwood Stair Tread Capping',
    'Bullnose Nosing & Riser Precision Fit',
    'Stain-Matched Solid Oak Staircase',
    'Curved Entryway Stair Transformation',
    'Durable Solid Wood Stair Runner Fit',
  ],
  'team-company': [
    'HD Flooring On-Site Installation Craftsmen',
    'Precision Board Scribing & Cutting Lead',
    'Self-Leveling Compound Pouring Team',
    'Final Quality Inspection Walkthrough',
  ],
  'hardwood-flooring': [
    'Solid White Oak Hardwood Installation',
    'Nail-Down Site-Finished Wood Floor',
    'Custom Stained Hardwood Living Area',
  ],
  'engineered-hardwood': [
    'Wide-Plank Engineered Oak Flooring',
    'Condominium Acoustic Engineered Wood',
  ],
  'flooring-replacement': [
    'Dust-Controlled Tear-Out & Disposal',
    'Surgical Board Replacement & Repair',
  ],
  'floor-preparation': [
    'Self-Leveling Pour & Subfloor Leveling',
  ],
};

const createPhotos = (folder: string, prefix: string, count: number, location: string): ProjectPhoto[] => {
  const list = photoDescriptors[folder] || ['On-Site Installation Project'];
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    const baseTitle = list[i % list.length];
    const cycle = Math.floor(i / list.length);
    const title = cycle > 0 ? `${baseTitle} (Site #${cycle + 1})` : baseTitle;
    return {
      id: `${prefix}-${num}`,
      src: `/assets/images/${folder}/${prefix}-${num}.jpg`,
      title,
      location,
    };
  });
};

const allProjectPhotos: ProjectPhoto[] = [
  ...createPhotos('luxury-vinyl-flooring', 'luxury-vinyl-flooring', 71, 'Saskatoon & Area'),
  ...createPhotos('laminate-flooring', 'laminate-flooring', 18, 'Saskatoon & Area'),
  ...createPhotos('tile-flooring', 'tile-flooring', 18, 'Saskatoon & Area'),
  ...createPhotos('carpet-flooring', 'carpet-flooring', 15, 'Regina & Area'),
  ...createPhotos('stair-flooring', 'stair-flooring', 5, 'Saskatoon & Area'),
  ...createPhotos('team-company', 'team-company', 4, 'Saskatoon, SK'),
  ...createPhotos('hardwood-flooring', 'hardwood-flooring', 3, 'Saskatoon, SK'),
  ...createPhotos('engineered-hardwood', 'engineered-hardwood', 2, 'Saskatoon, SK'),
  ...createPhotos('flooring-replacement', 'flooring-replacement', 2, 'Saskatoon, SK'),
  ...createPhotos('floor-preparation', 'floor-preparation', 1, 'Saskatoon, SK'),
];

export default function ProjectsPage() {
  const { openBookModal } = useModal();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const selectedPhoto = selectedIdx !== null ? allProjectPhotos[selectedIdx] : null;

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! === 0 ? allProjectPhotos.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! === allProjectPhotos.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Hero Section */}
      <PageHero
        badge="HD Flooring Workmanship Gallery"
        badgeIcon={Camera}
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

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10 overflow-hidden">
        {/* Gallery Header Counter */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Workmanship Gallery
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
                Showing {Math.min(visibleCount, allProjectPhotos.length)} of {allProjectPhotos.length} On-Site Photos
              </p>
            </div>
          </div>

          <button
            onClick={() => openBookModal('Project Gallery')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E85D04] text-white font-manrope font-bold text-xs uppercase tracking-wider hover:bg-[#d45203] transition-colors shadow-lg shadow-[#E85D04]/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Installation</span>
          </button>
        </div>

        {/* Pure Photo Gallery Grid (No category badges) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProjectPhotos.slice(0, visibleCount).map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index % 12) * 0.03 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedIdx(index)}
              className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 cursor-pointer shadow-lg hover:shadow-2xl transition-all transform-gpu"
            >
              {/* Photo Image */}
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />

              {/* Dark Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Zoom Button Icon */}
              <div className="absolute top-3 right-3 pointer-events-none">
                <div className="w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-3 left-3 right-3 space-y-1 text-left">
                <div className="flex items-center gap-1 text-[11px] font-manrope text-[#E85D04] font-semibold">
                  <MapPin className="w-3 h-3" />
                  <span>{photo.location}</span>
                </div>
                <h3 className="font-playfair text-sm sm:text-base font-bold text-white group-hover:text-[#E85D04] transition-colors line-clamp-1">
                  {photo.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More & Show Less Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
          {visibleCount < allProjectPhotos.length && (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 24, allProjectPhotos.length))}
              className="px-8 py-3.5 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#E85D04]/20 cursor-pointer"
            >
              Load More Photos ({allProjectPhotos.length - visibleCount} Remaining)
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
              {/* Top Header Bar */}
              <div className="p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/80">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#E85D04] font-semibold font-manrope">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedPhoto.location}</span>
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
                  Photo {selectedIdx + 1} of {allProjectPhotos.length}
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
