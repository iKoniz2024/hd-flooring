'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Maximize2,
  Play,
  Image as ImageIcon,
  Award,
  ThermometerSnowflake,
  Layers,
  Truck
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { UniversalVideoPlayer } from '@/components/video/UniversalVideoPlayer';

export interface QuickViewProduct {
  _id: string;
  title: string;
  description: string;
  category?: string;
  categoryName?: string;
  price: number;
  image: string;
  images?: string[];
  videoUrl?: string;
}

interface ProductQuickViewModalProps {
  product: QuickViewProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onGetQuote?: (title: string) => void;
}

export function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  onGetQuote,
}: ProductQuickViewModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mediaTab, setMediaTab] = useState<'video' | 'photos'>('video');

  // Reset selected image index and media tab when product changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setLightboxOpen(false);
    setMediaTab(product?.videoUrl ? 'video' : 'photos');
  }, [product]);

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

  if (!isOpen || !product) return null;

  // Combine primary image and additional gallery images
  const allImages = Array.from(
    new Set([product.image, ...(product.images || [])])
  ).filter(Boolean);

  const currentActiveImage = allImages[selectedImageIdx] || product.image;

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

          {/* Modal Container: App-like sheet on mobile, rounded card on tablet/desktop */}
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
                  <span className="truncate max-w-[120px] sm:max-w-none">{product.categoryName || 'Flooring'}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold shrink-0">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline">In Stock & Ready for In-Home Sample</span>
                  <span className="sm:hidden">In Stock</span>
                </span>
              </div>

              {/* Close Button: generous touch target */}
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
                
                {/* LEFT COLUMN: Media Showcase & Material Trust Chips */}
                <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
                  {/* Media Switcher Tab (if video is available) */}
                  {product.videoUrl && (
                    <div className="flex items-center justify-between gap-1 p-1 bg-stone-100 dark:bg-stone-850 rounded-xl sm:rounded-2xl border border-stone-200/80 dark:border-stone-750">
                      <div className="flex items-center gap-1 w-full">
                        <button
                          type="button"
                          onClick={() => setMediaTab('video')}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            mediaTab === 'video'
                              ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/30'
                              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Video Tour</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setMediaTab('photos')}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            mediaTab === 'photos'
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
                  {mediaTab === 'video' && product.videoUrl ? (
                    <div className="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-lg border border-stone-200/90 dark:border-stone-800">
                      <UniversalVideoPlayer
                        url={product.videoUrl}
                        title={product.title}
                        poster={product.image}
                        autoPlay={false}
                        muted={false}
                        className="w-full h-full !rounded-xl sm:!rounded-2xl border-0 shadow-none"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => setLightboxOpen(true)}
                      className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/80 group cursor-pointer shadow-md"
                    >
                      <Image
                        src={currentActiveImage}
                        alt={product.title}
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md sm:rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium">
                        {selectedImageIdx === 0 ? 'Primary Showroom View' : `Photo ${selectedImageIdx + 1} of ${allImages.length}`}
                      </div>
                    </div>
                  )}

                  {/* High-Resolution Photo Gallery Strip: Smooth Horizontal Touch Swipe */}
                  {allImages.length > 0 && (
                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E85D04]" />
                          <span>Surface & Grain Previews</span>
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
                              setMediaTab('photos');
                            }}
                            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                              mediaTab === 'photos' && selectedImageIdx === idx
                                ? 'border-[#E85D04] ring-2 ring-[#E85D04]/30 scale-105 shadow-md'
                                : 'border-stone-200 dark:border-stone-700 opacity-75 hover:opacity-100 hover:border-[#E85D04]/60'
                            }`}
                          >
                            <Image
                              src={imgUrl}
                              alt={`${product.title} thumb ${idx + 1}`}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Architectural Flooring Specifications: 2-col on mobile, 4-col on desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-0.5 text-center">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] mx-auto mb-1" />
                      <div className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase">Grade</div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mt-0.5">Commercial</div>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
                      <ThermometerSnowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] mx-auto mb-1" />
                      <div className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase">Testing</div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mt-0.5">SK Climate</div>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
                      <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] mx-auto mb-1" />
                      <div className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase">Fitting</div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mt-0.5">Click / Glue</div>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] mx-auto mb-1" />
                      <div className="text-[9px] sm:text-[10px] font-extrabold text-[#E85D04] uppercase">Warranty</div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 dark:text-stone-200 mt-0.5">Guaranteed</div>
                    </div>
                  </div>

                  {/* Free Sample Delivery Notice */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-stone-700 dark:text-stone-300 text-[10px] sm:text-[11px]">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] shrink-0" />
                    <span>Complimentary in-home material samples brought right to your door in Saskatoon.</span>
                  </div>
                </div>

                {/* RIGHT COLUMN: Details, Pricing & Call-to-Actions */}
                <div className="lg:col-span-6 space-y-4 sm:space-y-5 flex flex-col justify-between">
                  <div className="space-y-3.5 sm:space-y-4">
                    {/* Product Title */}
                    <div>
                      <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white leading-tight">
                        {product.title}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-medium">
                        HD Flooring Showroom Collection · Saskatoon, SK
                      </p>
                    </div>

                    {/* Luxury Price Card */}
                    <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-50/80 via-amber-50/30 to-stone-50 dark:from-stone-850 dark:via-stone-850 dark:to-stone-800 border border-orange-200/70 dark:border-stone-700 shadow-xs flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="font-playfair text-2xl sm:text-4xl font-black text-[#E85D04]">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          / SQ.FT
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-[#E85D04]/25">
                        Supply & Install Available
                      </span>
                    </div>

                    {/* Description & Features */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
                        <span>Material Specification & Features</span>
                      </h4>
                      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50/90 dark:bg-stone-850/60 border border-stone-200/80 dark:border-stone-800 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line max-h-32 sm:max-h-36 overflow-y-auto">
                        {product.description}
                      </div>
                    </div>

                    {/* Quality Assurance Card */}
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 flex items-start gap-2.5 sm:gap-3">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#E85D04] shrink-0 mt-0.5" />
                      <div className="text-[10px] sm:text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed">
                        <strong className="text-[#E85D04]">HD Flooring Workmanship Assurance:</strong> All materials are engineered for Canadian climate stability, backed by manufacturer durability warranty and licensed commercial installer guarantee.
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
                        if (onGetQuote) onGetQuote(product.title);
                      }}
                      className="w-full min-h-[46px] sm:min-h-[50px] py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 active:brightness-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#E85D04]/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                    >
                      <Sparkles className="hidden sm:inline-block w-4 h-4 shrink-0" />
                      <span>Get Free Estimate & Sample</span>
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/13068808404?text=Hi%20HD%20Flooring%2C%20I%20am%20interested%20in%20the%20product%20${encodeURIComponent(product.title)}%20($${product.price.toFixed(2)}/sq.ft).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[44px] py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 active:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#25D366]" />
                      <span>Chat on WhatsApp</span>
                    </motion.a>

                    <p className="text-center text-[9px] sm:text-[10px] text-stone-500 dark:text-stone-400">
                      🔒 No obligation · 100% Free Consultation in Saskatoon & Surrounding Areas
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
                      alt={product.title}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center text-stone-300 text-xs font-semibold">
                    <span>{product.title} — ({selectedImageIdx + 1} of {allImages.length})</span>
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
