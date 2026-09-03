'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { useModal } from '@/lib/context/ModalContext';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const { openBookModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-6 py-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-manrope font-semibold text-xs tracking-widest uppercase">
            Part 3 Ready — Global Booking Modal & Data Models
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
            Professional Flooring Installation <br />
            <span className="gold-gradient-text">Built for Canadian Spaces</span>
          </h1>
          <p className="font-inter text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-base sm:text-lg">
            Global lead modal active with form validation, confirmation view, and structured datasets for services, projects, and blogs.
          </p>

          <button
            onClick={() => openBookModal('Hardwood Flooring')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-950 font-manrope font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            Test Book Us Modal
          </button>
        </div>
      </main>

      {/* Floating Buttons */}
      <FloatingScrollBtns />
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
