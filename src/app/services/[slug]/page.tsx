'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ArrowLeft, HelpCircle, Images, Camera, Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { servicesData } from '@/data/services';
import { Accordion } from '@/components/ui/Accordion';
import { useModal } from '@/lib/context/ModalContext';

const serviceCategoryImages: Record<string, string[]> = {
  'hardwood-flooring': [
    '/assets/images/hardwood-flooring/hardwood-flooring-01.jpg',
    '/assets/images/hardwood-flooring/hardwood-flooring-02.jpg',
    '/assets/images/hardwood-flooring/hardwood-flooring-03.jpg',
  ],
  'engineered-hardwood-flooring': [
    '/assets/images/engineered-hardwood/engineered-hardwood-01.jpg',
    '/assets/images/engineered-hardwood/engineered-hardwood-02.jpg',
  ],
  'luxury-vinyl-flooring': [
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-01.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-02.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-03.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-04.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-05.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-06.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-07.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-08.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-09.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-10.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-11.jpg',
    '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-12.jpg',
  ],
  'laminate-flooring': [
    '/assets/images/laminate-flooring/laminate-flooring-01.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-02.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-03.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-04.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-05.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-06.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-07.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-08.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-09.jpg',
    '/assets/images/laminate-flooring/laminate-flooring-10.jpg',
  ],
  'carpet-flooring': [
    '/assets/images/carpet-flooring/carpet-flooring-01.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-02.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-03.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-04.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-05.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-06.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-07.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-08.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-09.jpg',
    '/assets/images/carpet-flooring/carpet-flooring-10.jpg',
  ],
  'tile-flooring': [
    '/assets/images/tile-flooring/tile-flooring-01.jpg',
    '/assets/images/tile-flooring/tile-flooring-02.jpg',
    '/assets/images/tile-flooring/tile-flooring-03.jpg',
    '/assets/images/tile-flooring/tile-flooring-04.jpg',
    '/assets/images/tile-flooring/tile-flooring-05.jpg',
    '/assets/images/tile-flooring/tile-flooring-06.jpg',
    '/assets/images/tile-flooring/tile-flooring-07.jpg',
    '/assets/images/tile-flooring/tile-flooring-08.jpg',
    '/assets/images/tile-flooring/tile-flooring-09.jpg',
    '/assets/images/tile-flooring/tile-flooring-10.jpg',
  ],
  'stair-flooring': [
    '/assets/images/stair-flooring/stair-flooring-01.jpg',
    '/assets/images/stair-flooring/stair-flooring-02.jpg',
    '/assets/images/stair-flooring/stair-flooring-03.jpg',
    '/assets/images/stair-flooring/stair-flooring-04.jpg',
    '/assets/images/stair-flooring/stair-flooring-05.jpg',
  ],
  'flooring-replacement': [
    '/assets/images/flooring-replacement/flooring-replacement-01.jpg',
    '/assets/images/flooring-replacement/flooring-replacement-02.jpg',
  ],
  'floor-preparation': [
    '/assets/images/floor-preparation/floor-preparation-01.jpg',
  ],
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openBookModal } = useModal();

  const service = servicesData.find((s) => s.slug === slug) || servicesData[0];
  const galleryPhotos = serviceCategoryImages[slug] || [service.heroImage];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const scrollToTopSmooth = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    scrollToTopSmooth();
    const timer = setTimeout(scrollToTopSmooth, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % galleryPhotos.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-16">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-red-500 hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          Back to All Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden">
          {/* Left Text: Slide from Left + Zoom */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-manrope font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Specialized Service
            </span>
            <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              {service.title}
            </h1>
            <p className="text-red-500 font-manrope font-bold text-sm sm:text-base">
              {service.tagline}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-inter">
              {service.fullDesc}
            </p>

            <div className="pt-2">
              <button
                onClick={() => openBookModal(service.title)}
                className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-sky-600 hover:brightness-110 text-white font-manrope font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-red-600/20"
              >
                Book {service.title.split(' ')[0]} Installation
              </button>
            </div>
          </motion.div>

          {/* Right Image: Slide from Right + Zoom */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 h-[340px] sm:h-[400px]"
          >
            <img
              src={service.heroImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-6">
              <button
                onClick={() => {
                  setActiveImageIdx(0);
                  setLightboxOpen(true);
                }}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-manrope font-bold flex items-center gap-2 hover:bg-red-500 transition-colors shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Why Choose {service.title}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-inter">
              Top advantages of choosing this flooring material for your space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium font-manrope">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-red-500 uppercase tracking-wider">
                <Images className="w-4 h-4 text-sky-400" />
                Category Showcase Gallery
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {service.title} Project Photos
              </h2>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/95 border border-red-500/30 text-slate-100 shadow-md shadow-red-500/10 shrink-0 whitespace-nowrap">
              <Camera className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span className="text-xs font-manrope font-extrabold text-slate-200">
                <span className="text-red-400 font-black">{galleryPhotos.length}</span> HD Photos
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryPhotos.map((imgUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
                onClick={() => {
                  setActiveImageIdx(idx);
                  setLightboxOpen(true);
                }}
                className="group relative h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer shadow-md"
              >
                <img
                  src={imgUrl}
                  alt={`${service.title} photo ${idx + 1}`}
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl bg-slate-900/60 dark:bg-slate-900/80 border border-red-500/20 space-y-4"
        >
          <h3 className="font-playfair text-xl font-bold text-slate-100">
            Ideal For Rooms & Spaces
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {service.idealFor.map((room) => (
              <span
                key={room}
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-manrope font-bold"
              >
                {room}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Our Step-by-Step Installation Process
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {service.process.map((stepName, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2"
              >
                <span className="font-playfair font-extrabold text-red-500 text-lg">
                  0{idx + 1}
                </span>
                <p className="text-xs font-manrope font-bold text-slate-800 dark:text-slate-200">
                  {stepName}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                Got Questions?
              </div>
              <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion items={service.faqs} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-1 text-center sm:text-left font-manrope">
            <h3 className="font-playfair text-2xl font-extrabold text-white">
              Ready to Install {service.title}?
            </h3>
            <p className="text-xs font-medium text-slate-100">
              Contact HD Flooring today for a free in-home site assessment & estimate.
            </p>
          </div>

          <button
            onClick={() => openBookModal(service.title)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-900 transition-colors shrink-0 shadow-lg shadow-black/30 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-200" />
            <span>Get Free Quote</span>
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
                  src={galleryPhotos[activeImageIdx]}
                  alt={service.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between w-full font-manrope text-slate-300 text-xs px-2">
                <span>
                  {service.title} — ({activeImageIdx + 1} / {galleryPhotos.length})
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

