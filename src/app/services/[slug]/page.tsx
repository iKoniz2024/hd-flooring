'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ArrowLeft, HelpCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { servicesData } from '@/data/services';
import { Accordion } from '@/components/ui/Accordion';
import { useModal } from '@/lib/context/ModalContext';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openBookModal } = useModal();

  const service = servicesData.find((s) => s.slug === slug) || servicesData[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-16">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-red-500 hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          Back to All Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-manrope font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Specialized Service
            </span>
            <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              {service.title}
            </h1>
            <p className="text-red-500 font-manrope font-bold text-sm sm:text-base">
              {service.tagline}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-inter">
              {service.fullDesc}
            </p>

            <div className="pt-2">
              <button
                onClick={() => openBookModal(service.title)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-sky-600 hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20"
              >
                Book {service.title.split(' ')[0]} Installation
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[400px]">
            <img
              src={service.heroImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Why Choose {service.title}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-inter">
              Top advantages of choosing this flooring material for your space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium font-manrope">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 dark:bg-slate-900/80 border border-red-500/20 space-y-4">
          <h3 className="font-playfair text-xl font-bold text-slate-100">
            Ideal For Rooms & Spaces
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {service.idealFor.map((room) => (
              <span
                key={room}
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-manrope font-bold"
              >
                {room}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Our Step-by-Step Installation Process
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {service.process.map((stepName, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2"
              >
                <span className="font-playfair font-extrabold text-red-500 text-lg">
                  0{idx + 1}
                </span>
                <p className="text-xs font-manrope font-bold text-slate-800 dark:text-slate-200">
                  {stepName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
                <HelpCircle className="w-6 h-6 text-red-500" />
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion items={service.faqs} />
          </div>
        )}

        <div className="p-8 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left font-manrope">
            <h3 className="font-playfair text-2xl font-extrabold text-white">
              Ready to Install {service.title}?
            </h3>
            <p className="text-xs font-medium text-slate-100">
              Contact HD Flooring today for a free in-home site assessment & estimate.
            </p>
          </div>

          <button
            onClick={() => openBookModal(service.title)}
            className="px-6 py-3 rounded-full bg-slate-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-900 transition-colors shrink-0 shadow-lg shadow-black/30"
          >
            Get Free Quote
          </button>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
