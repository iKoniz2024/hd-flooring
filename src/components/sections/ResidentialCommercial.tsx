'use client';

import { motion } from 'framer-motion';
import { Home, Building2, ShieldCheck } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const commercialSpaces = ['Offices', 'Retail Stores', 'Restaurants', 'Showrooms'];

export function ResidentialCommercial() {
  const { openBookModal } = useModal();

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
          Residential & <span className="text-[#E85D04]">Commercial</span>
        </h2>
      </motion.div>

      {/* 2-Column Side-by-Side Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

        {/* Left Side: Clean Showcase Photo Frame */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative transform-gpu"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[380px] sm:h-[420px] w-full group">
            <img
              src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1000&q=90&fm=webp"
              alt="Residential and Commercial Flooring Showcase"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

            {/* Single Clean Badge */}
            <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-stone-950/80 backdrop-blur-md border border-[#E85D04]/40 shadow-xl space-y-0.5">
              <span className="text-[11px] font-black uppercase text-[#E85D04] tracking-wider">Certified Installation</span>
              <p className="text-xs font-bold text-white">Homes & Businesses</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Clean Residential & Commercial Cards */}
        <div className="lg:col-span-7 space-y-5">
          {/* Residential Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800 hover:border-[#E85D04] shadow-md space-y-4 group transition-all duration-300 relative"
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
                Hardwood, LVP, laminate, tile & carpet.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => openBookModal('Residential Flooring')}
                className="py-2.5 px-5 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#E85D04]/20 hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4" />
                Book Home Measure
              </button>
            </div>
          </motion.div>

          {/* Commercial Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800 hover:border-[#E85D04] shadow-md space-y-4 group transition-all duration-300 relative"
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
                Heavy-duty flooring built for high-traffic spaces.
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {commercialSpaces.map((space) => (
                  <span
                    key={space}
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                  >
                    {space}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => openBookModal('Commercial Flooring')}
                className="py-2.5 px-5 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#E85D04]/20 hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4" />
                Book Commercial Measure
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}



