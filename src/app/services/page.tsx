'use client';

import Link from 'next/link';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { servicesData } from '@/data/services';
import { useModal } from '@/lib/context/ModalContext';

export default function ServicesPage() {
  const { openBookModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-manrope font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Comprehensive Installation Expertise
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-stone-100">
            Our Flooring Services
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base font-inter">
            Professional flooring installation for residential & commercial spaces across Canada. Explore our specialized flooring categories below.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
            >
              {/* Top Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-amber-500 text-stone-950 font-playfair font-extrabold text-sm flex items-center justify-center shadow">
                  0{index + 1}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between font-inter">
                <div className="space-y-2">
                  <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-inter">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3 border-t border-stone-100 dark:border-stone-800 font-manrope">
                  <button
                    onClick={() => openBookModal(service.title)}
                    className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-semibold text-xs transition-colors"
                  >
                    Request Quote
                  </button>

                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-500 flex items-center gap-1 group/link"
                  >
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-amber-500" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
