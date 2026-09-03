'use client';

import { Sparkles, PhoneCall } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';
import Link from 'next/link';

export function FinalCTA() {
  const { openBookModal } = useModal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter">
      <div className="relative rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 p-10 sm:p-16 text-white shadow-2xl shadow-red-600/20 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 text-center lg:text-left relative z-10 max-w-xl">
          <span className="text-xs font-manrope font-extrabold uppercase tracking-widest bg-slate-950/30 text-white px-3.5 py-1.5 rounded-full border border-white/20">
            Ready for a New Floor?
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Transform Your Space with HD Flooring
          </h2>
          <p className="text-sm sm:text-base font-inter text-slate-100 font-medium">
            Tell us about your project requirements and let our team help you take the next step.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full lg:w-auto">
          <button
            onClick={() => openBookModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-950 text-white font-manrope font-bold text-xs uppercase tracking-wider hover:bg-slate-900 transition-colors shadow-xl shadow-black/30 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            Book Us Now
          </button>

          <Link
            href="/contact-us"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-manrope font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-white/30"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
