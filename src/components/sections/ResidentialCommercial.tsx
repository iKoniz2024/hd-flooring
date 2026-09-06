'use client';

import { motion } from 'framer-motion';
import { Home, Building2, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const commercialSpaces = [
  'Offices',
  'Retail Stores',
  'Restaurants',
  'Showrooms',
  'Condominiums',
  'Rental Properties',
  'Property Developments',
  'Hospitality Spaces',
];

export function ResidentialCommercial() {
  const { openBookModal } = useModal();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-red-500" />
          <span>For Home & Business</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Residential & Commercial Flooring
        </h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
          We install high-quality flooring for residential houses, condos, retail stores, and commercial offices.
        </p>
      </motion.div>

      {/* 2-Column Side-by-Side Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Side: Dedicated Large Showcase Photo Frame Beside Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 sticky top-28 space-y-6"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[520px] sm:h-[600px] w-full group">
            <img
              src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=75&fm=webp"
              alt="Residential and Commercial Flooring Showcase"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

            {/* Overlay Badges */}
            <div className="absolute top-6 left-6 p-4 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-xl space-y-1">
              <span className="text-xs font-black uppercase text-red-500 tracking-wider">Flooring Installation</span>
              <p className="text-xs font-bold text-stone-900 dark:text-white">Homes, Apartments & Businesses</p>
            </div>

            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-700 dark:text-stone-200">Certified Workmanship</span>
                <span className="text-sky-500 font-extrabold">Fully Insured</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Clear square-foot quotes, fast project completion, and minimal disruption for your space.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Clean Residential & Commercial Cards (NO images inside cards) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Residential Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800/90 hover:border-red-500/60 shadow-xl space-y-6 group transition-all duration-500 hover:-translate-y-1 relative"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center justify-center font-bold shadow-md group-hover:bg-red-600 group-hover:text-white transition-all">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
                Home Flooring
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 group-hover:text-red-500 transition-colors">
                Home & Apartment Flooring
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Transform your bedrooms, living rooms, kitchens, and basements with durable, beautiful flooring. We install solid hardwood, luxury vinyl plank, laminate, tile, and plush carpets for any home renovation.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <button
                onClick={() => openBookModal('Residential Flooring')}
                className="py-3 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-red-600/20"
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
            className="p-8 rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800/90 hover:border-sky-500/60 shadow-xl space-y-6 group transition-all duration-500 hover:-translate-y-1 relative"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold shadow-md group-hover:bg-sky-500 group-hover:text-white transition-all">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
                Commercial Flooring
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 group-hover:text-sky-500 transition-colors">
                Business & Office Flooring
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Heavy-duty flooring built for high foot traffic in commercial spaces. We work with business owners and property managers to install durable commercial vinyl, laminate, carpet tiles, and porcelain flooring.
              </p>

              <div className="pt-2">
                <span className="block text-xs font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
                  Suitable for:
                </span>
                <div className="flex flex-wrap gap-2">
                  {commercialSpaces.map((space) => (
                    <span
                      key={space}
                      className="text-[11px] font-bold px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-red-500" />
                      {space}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <button
                onClick={() => openBookModal('Commercial Flooring')}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-sky-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-red-600/20"
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



