'use client';

import { Home, Building2, CheckCircle2, Sparkles } from 'lucide-react';
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
  'Commercial Facilities',
];

export function ResidentialCommercial() {
  const { openBookModal } = useModal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Residential Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
              <Home className="w-6 h-6" />
            </div>

            <span className="text-xs font-manrope font-bold text-red-500 uppercase tracking-widest">
              Residential Flooring
            </span>

            <h3 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors">
              Transform Your Home From the Ground Up
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
              Flooring has a major impact on how your home looks and feels. HD Flooring provides professional installation for homes, condos, apartments, renovations, and new residential projects. Whether you want the natural character of hardwood, the practicality of luxury vinyl, the comfort of carpet, or the durability of tile, we'll help bring your flooring project together.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => openBookModal('Residential Flooring')}
              className="w-full py-3.5 rounded-2xl bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 font-manrope font-bold text-xs uppercase tracking-wider hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              Book Residential Consultation
            </button>
          </div>
        </div>

        {/* Commercial Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-slate-100 border border-red-500/20 shadow-2xl space-y-6 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Building2 className="w-6 h-6" />
            </div>

            <span className="text-xs font-manrope font-bold text-sky-400 uppercase tracking-widest">
              Commercial Flooring
            </span>

            <h3 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-100 group-hover:text-sky-400 transition-colors">
              Flooring Designed for Busy Commercial Spaces
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-inter">
              Commercial flooring needs to combine appearance, durability, functionality, and professional installation. HD Flooring works with businesses, property owners, contractors, and renovation teams to install flooring for a variety of commercial environments.
            </p>

            <div className="pt-2">
              <span className="block text-xs font-manrope font-semibold text-sky-400 mb-2">
                Suitable for:
              </span>
              <div className="flex flex-wrap gap-2">
                {commercialSpaces.map((space) => (
                  <span
                    key={space}
                    className="text-[11px] font-manrope px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-red-500" />
                    {space}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => openBookModal('Commercial Flooring')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-sky-600 hover:brightness-110 text-white font-manrope font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
            >
              <Sparkles className="w-4 h-4 text-sky-200" />
              Discuss Commercial Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
