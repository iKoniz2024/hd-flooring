'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ShieldCheck, Tag, Maximize2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export interface QuickViewProduct {
  _id: string;
  title: string;
  description: string;
  category?: string;
  categoryName?: string;
  price: number;
  image: string;
  images?: string[];
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

  // Reset selected image index when product changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setLightboxOpen(false);
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
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
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
                
                {/* Left Column: Image Gallery Viewers */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Main Active Image Box */}
                  <div
                    onClick={() => setLightboxOpen(true)}
                    className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 group cursor-pointer shadow-inner"
                  >
                    <Image
                      src={currentActiveImage}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white opacity-80 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-manrope font-semibold">
                      {selectedImageIdx === 0 ? 'Primary Image View' : `Photo ${selectedImageIdx + 1} of ${allImages.length}`}
                    </div>
                  </div>

                  {/* Thumbnail Gallery Strip */}
                  {allImages.length > 1 && (
                    <div>
                      <p className="text-[11px] font-manrope font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        Product Gallery ({allImages.length} Photos)
                      </p>
                      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
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
                              alt={`${product.title} thumb ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Details & Pricing */}
                <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-extrabold uppercase tracking-wider">
                        <Tag className="w-3.5 h-3.5" />
                        {product.categoryName || 'Flooring Material'}
                      </span>

                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-manrope font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        In Stock & Ready
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      {product.title}
                    </h2>

                    {/* Price Card */}
                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700 flex items-baseline gap-2">
                      <span className="font-playfair text-3xl font-black text-[#E85D04]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-manrope font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        PER SQUARE FOOT
                      </span>
                    </div>

                    {/* Description & Features */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-manrope font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Material Specification & Features
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed whitespace-pre-line">
                        {product.description}
                      </p>
                    </div>

                    {/* Quality Assurance Note */}
                    <div className="p-3.5 rounded-xl bg-orange-50 dark:bg-slate-800/40 border border-orange-200 dark:border-slate-700/60 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        <span className="font-bold text-[#E85D04]">HD Flooring Workmanship Assurance:</span> All materials come with manufacturer durability warranty & commercial installer guarantee.
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onClose();
                        if (onGetQuote) onGetQuote(product.title);
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#E85D04]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Get Free Estimate & Material Sample</span>
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/13068808404?text=Hi%20HD%20Flooring%2C%20I%20am%20interested%20in%20the%20product%20${encodeURIComponent(product.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-manrope font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                      <span>Chat on WhatsApp About Product</span>
                    </motion.a>
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
                className="fixed inset-0 z-60 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
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
                      alt={product.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center font-manrope text-slate-300 text-xs">
                    <span>{product.title} — ({selectedImageIdx + 1} / {allImages.length})</span>
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
