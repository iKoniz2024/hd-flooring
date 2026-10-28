'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';


const commercialImages = [
  {
    title: 'Executive Open Office',
    subtitle: 'Commercial Hardwood & LVT',
    tag: 'Offices',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85&fm=webp',
  },
  {
    title: 'Corporate Boardroom',
    subtitle: 'Acoustic High-Traffic Flooring',
    tag: 'Boardrooms',
    src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85&fm=webp',
  },
  {
    title: 'Modern Business Workspace',
    subtitle: 'Commercial Engineered Planks',
    tag: 'Workspaces',
    src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1000&q=85&fm=webp',
  },
];

const residentialImages = [
  {
    title: 'Modern Living Room',
    subtitle: 'Natural Solid Hardwood',
    tag: 'Living Rooms',
    src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85&fm=webp',
  },
  {
    title: 'Master Bedroom Suite',
    subtitle: 'Luxury Hardwood & LVP',
    tag: 'Bedrooms',
    src: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    title: 'Warm Hardwood Home Interior',
    subtitle: 'Premium Finished Timber',
    tag: 'Apartments & Homes',
    src: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=85&fm=webp',
  },
];

export function ResidentialCommercial() {
  const { openBookModal } = useModal();
  const [commIdx, setCommIdx] = useState(0);
  const [resIdx, setResIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCommIdx((prev) => (prev + 1) % commercialImages.length);
      setResIdx((prev) => (prev + 1) % residentialImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextComm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCommIdx((prev) => (prev + 1) % commercialImages.length);
  };
  const prevComm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCommIdx((prev) => (prev - 1 + commercialImages.length) % commercialImages.length);
  };

  const nextRes = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResIdx((prev) => (prev + 1) % residentialImages.length);
  };
  const prevRes = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResIdx((prev) => (prev - 1 + residentialImages.length) % residentialImages.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-[#E85D04] text-xs font-bold tracking-wider uppercase">
          <Building2 className="w-3.5 h-3.5 text-[#E85D04]" />
          <span>Properties We Serve</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Commercial & <span className="text-[#E85D04]">Residential</span>
        </h2>
      </motion.div>

      {/* 2-Column Side-by-Side Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

        {/* Left Side: Commercial & Residential Showcase Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col gap-5"
        >
          {/* Commercial Floor Slider (3 Office Images) */}
          <div
            onClick={() => openBookModal('Commercial Flooring')}
            className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-stone-200 dark:border-stone-800 hover:border-[#E85D04] h-[220px] sm:h-[240px] w-full group cursor-pointer transition-all duration-300 bg-stone-950"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={commIdx}
                src={commercialImages[commIdx].src}
                alt={commercialImages[commIdx].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

            {/* Slider Nav Arrows */}
            <button
              onClick={prevComm}
              aria-label="Previous Commercial Floor"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-[#E85D04] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextComm}
              aria-label="Next Commercial Floor"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-[#E85D04] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Top Right Counter Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-[10px] font-bold text-white/90 border border-white/20 z-10">
              {commIdx + 1} / 3
            </div>

            {/* Bottom Overlay: Badge + 3 Thumbnails */}
            <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 flex items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950/85 backdrop-blur-md border border-[#E85D04]/40 shadow-xl max-w-[62%] sm:max-w-[65%]">
                <div className="w-6 h-6 rounded-lg bg-[#E85D04] text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <span className="text-[9px] font-black uppercase text-[#E85D04] tracking-wider block">
                    Commercial Flooring
                  </span>
                  <p className="text-[11px] font-bold text-white truncate">
                    {commercialImages[commIdx].title}
                  </p>
                </div>
              </div>

              {/* 3 Mini Thumbnails */}
              <div className="flex items-center gap-1.5 shrink-0 bg-stone-950/85 backdrop-blur-md p-1 rounded-xl border border-white/10">
                {commercialImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCommIdx(idx);
                    }}
                    title={img.title}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      commIdx === idx
                        ? 'border-[#E85D04] ring-2 ring-[#E85D04]/50 scale-105'
                        : 'border-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.tag} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Residential Floor Slider (3 Home & Apartment Images) */}
          <div
            onClick={() => openBookModal('Residential Flooring')}
            className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-stone-200 dark:border-stone-800 hover:border-[#E85D04] h-[220px] sm:h-[240px] w-full group cursor-pointer transition-all duration-300 bg-stone-950"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={resIdx}
                src={residentialImages[resIdx].src}
                alt={residentialImages[resIdx].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

            {/* Slider Nav Arrows */}
            <button
              onClick={prevRes}
              aria-label="Previous Residential Floor"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-[#E85D04] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextRes}
              aria-label="Next Residential Floor"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-[#E85D04] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Top Right Counter Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-[10px] font-bold text-white/90 border border-white/20 z-10">
              {resIdx + 1} / 3
            </div>

            {/* Bottom Overlay: Badge + 3 Thumbnails */}
            <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 flex items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950/85 backdrop-blur-md border border-[#E85D04]/40 shadow-xl max-w-[62%] sm:max-w-[65%]">
                <div className="w-6 h-6 rounded-lg bg-[#E85D04] text-white flex items-center justify-center shrink-0">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <span className="text-[9px] font-black uppercase text-[#E85D04] tracking-wider block">
                    Residential Flooring
                  </span>
                  <p className="text-[11px] font-bold text-white truncate">
                    {residentialImages[resIdx].title}
                  </p>
                </div>
              </div>

              {/* 3 Mini Thumbnails */}
              <div className="flex items-center gap-1.5 shrink-0 bg-stone-950/85 backdrop-blur-md p-1 rounded-xl border border-white/10">
                {residentialImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResIdx(idx);
                    }}
                    title={img.title}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      resIdx === idx
                        ? 'border-[#E85D04] ring-2 ring-[#E85D04]/50 scale-105'
                        : 'border-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.tag} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Commercial & Residential Cards */}
        <div className="lg:col-span-7 space-y-5">
          {/* Commercial Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => openBookModal('Commercial Flooring')}
            className="p-6 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800 hover:border-[#E85D04] shadow-md space-y-4 group transition-all duration-300 relative cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E85D04] text-white flex items-center justify-center font-bold shadow-md shadow-[#E85D04]/30">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-[#E85D04] bg-[#E85D04]/10 px-3 py-1 rounded-full border border-[#E85D04]/30">
                Commercial Flooring
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-playfair text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 group-hover:text-[#E85D04] transition-colors">
                Business & Office Flooring
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
                Heavy-duty flooring built for high-traffic office and retail spaces.
              </p>

              {/* 3 Office Flooring Photo Previews */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {commercialImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCommIdx(idx);
                    }}
                    className={`group/thumb relative rounded-xl overflow-hidden h-16 sm:h-20 border-2 transition-all cursor-pointer ${
                      commIdx === idx
                        ? 'border-[#E85D04] ring-2 ring-[#E85D04]/30 shadow-md scale-[1.02]'
                        : 'border-stone-200 dark:border-stone-700 opacity-80 hover:opacity-100 hover:border-[#E85D04]/60'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-1.5 sm:p-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-white line-clamp-1 leading-tight">
                        {img.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openBookModal('Commercial Flooring');
                }}
                className="py-2.5 px-5 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#E85D04]/20 hover:scale-105 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                Book Commercial Measure
              </button>
            </div>
          </motion.div>

          {/* Residential Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => openBookModal('Residential Flooring')}
            className="p-6 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800 hover:border-[#E85D04] shadow-md space-y-4 group transition-all duration-300 relative cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E85D04] text-white flex items-center justify-center font-bold shadow-md shadow-[#E85D04]/30">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-[#E85D04] bg-[#E85D04]/10 px-3 py-1 rounded-full border border-[#E85D04]/30">
                Home Flooring
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-playfair text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 group-hover:text-[#E85D04] transition-colors">
                Home & Apartment Flooring
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
                Hardwood, LVP, laminate, tile & carpet for Canadian residences.
              </p>

              {/* 3 Home & Apartment Flooring Photo Previews */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {residentialImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResIdx(idx);
                    }}
                    className={`group/thumb relative rounded-xl overflow-hidden h-16 sm:h-20 border-2 transition-all cursor-pointer ${
                      resIdx === idx
                        ? 'border-[#E85D04] ring-2 ring-[#E85D04]/30 shadow-md scale-[1.02]'
                        : 'border-stone-200 dark:border-stone-700 opacity-80 hover:opacity-100 hover:border-[#E85D04]/60'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-1.5 sm:p-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-white line-clamp-1 leading-tight">
                        {img.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openBookModal('Residential Flooring');
                }}
                className="py-2.5 px-5 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#E85D04]/20 hover:scale-105 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                Book Home Measure
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
