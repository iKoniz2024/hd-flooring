'use client';

import { Sparkles, ShieldCheck, Heart, Award, Users, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { useModal } from '@/lib/context/ModalContext';

const values = [
  { title: 'Quality', desc: 'Attention to materials, subfloor preparation, installation, and finishing.' },
  { title: 'Integrity', desc: 'Straightforward quotes, transparent communication, and clear advice.' },
  { title: 'Craftsmanship', desc: 'Precision board scribing, zero-lippage tiling, and meticulousnosings.' },
  { title: 'Reliability', desc: 'On-time project start dates and dependable project execution.' },
  { title: 'Customer Focus', desc: 'Solutions tailored specifically to your room traffic and budget.' },
];

const whoWeServe = [
  { title: 'Homeowners', desc: 'Renovations, room upgrades, and new custom homes.' },
  { title: 'Property Owners', desc: 'Durable flooring for rental properties and multi-unit improvements.' },
  { title: 'Contractors', desc: 'Reliable installation support for general renovation projects.' },
  { title: 'Businesses', desc: 'Commercial flooring for retail, offices, and hospitality spaces.' },
];

export default function AboutUsPage() {
  const { openBookModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-manrope font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            About HD Flooring
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-stone-100">
            Flooring Expertise. Professional Workmanship.
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base font-inter leading-relaxed">
            HD Flooring is a Canadian flooring service company specializing in professional installation for residential and commercial spaces.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-3">
            <span className="text-xs font-manrope font-bold text-amber-500 uppercase tracking-widest">
              Our Mission
            </span>
            <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed font-inter">
              To provide dependable flooring installation services with professional workmanship, quality-focused service, and solutions tailored to every customer's needs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-3">
            <span className="text-xs font-manrope font-bold text-amber-500 uppercase tracking-widest">
              Our Vision
            </span>
            <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed font-inter">
              To become a trusted flooring installation company recognized across Canada for reliable service, quality workmanship, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <h2 className="font-playfair text-3xl font-bold text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 space-y-2"
              >
                <h3 className="font-playfair text-lg font-bold text-amber-400">{v.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <div className="space-y-6">
          <h2 className="font-playfair text-3xl font-bold text-center">Who We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whoWeServe.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2"
              >
                <div className="flex items-center gap-2 text-amber-500 font-manrope font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  {item.title}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
