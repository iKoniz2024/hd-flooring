'use client';

import { Sparkles, Phone } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

export function CostCalculatorCTA() {
  const { openBookModal } = useModal();

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-[#E85D04]/30 shadow-2xl shadow-[#E85D04]/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Need a Custom Commercial Quote?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-manrope font-medium">
              Free on-site laser measurements & written estimates in Saskatchewan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 relative z-10 font-manrope shrink-0">
            <a
              href="tel:+13068808404"
              className="px-5 py-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +1 (306) 880-8404</span>
            </a>

            <button
              onClick={() => openBookModal()}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
              <span>Book Free Measure</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
