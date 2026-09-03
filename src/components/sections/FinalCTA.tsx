'use client';

import { Sparkles, PhoneCall } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';
import Link from 'next/link';

export function FinalCTA() {
  const { openBookModal } = useModal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter">
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 p-10 sm:p-16 text-stone-950 shadow-2xl shadow-amber-500/20 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Background Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 text-center lg:text-left relative z-10 max-w-xl">
          <span className="text-xs font-manrope font-extrabold uppercase tracking-widest bg-stone-950/20 text-stone-950 px-3.5 py-1.5 rounded-full">
            Ready for a New Floor?
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-950 leading-tight">
            Transform Your Space with HD Flooring
          </h2>
          <p className="text-sm sm:text-base font-inter text-stone-900 font-medium">
            Tell us about your project requirements and let our team help you take the next step.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full lg:w-auto">
          <button
            onClick={() => openBookModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-950 text-stone-100 font-manrope font-bold text-xs uppercase tracking-wider hover:bg-stone-900 transition-colors shadow-xl shadow-black/30 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Book Us Now
          </button>

          <Link
            href="/contact-us"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/30 hover:bg-white/40 text-stone-950 font-manrope font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
