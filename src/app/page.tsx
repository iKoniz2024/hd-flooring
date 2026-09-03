'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

export default function Home() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsBookModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      {/* Header */}
      <Header onOpenBookModal={handleOpenModal} />

      {/* Main Container */}
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4 py-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-manrope font-semibold text-xs tracking-widest uppercase">
            Part 2 Preview — Navigation & Floating Controls
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
            Professional Flooring Installation <br />
            <span className="gold-gradient-text">Built for Canadian Spaces</span>
          </h1>
          <p className="font-inter text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-base sm:text-lg">
            Right-side Up/Down floating scroll buttons & Left-side WhatsApp floating button active. Dark/Light mode switcher configured in Header.
          </p>
        </div>
      </main>

      {/* Floating Buttons */}
      <FloatingScrollBtns />
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer onOpenBookModal={handleOpenModal} />
    </div>
  );
}
