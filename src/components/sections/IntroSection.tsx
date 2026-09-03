'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center font-inter border-b border-stone-200 dark:border-stone-800">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-manrope font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Flooring Installation You Can Count On
        </span>

        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
          Dependable Craftsmanship for Canadian Projects
        </h2>

        <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          At HD Flooring, we make flooring installation simple, professional, and dependable. We work with homeowners, businesses, contractors, property owners, and renovation projects to install a wide range of flooring solutions.
        </p>

        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          Whether you're upgrading a single room, renovating an entire home, or completing a commercial project, our team focuses on proper preparation, precise installation, clean finishing, and lasting results.
        </p>

        <div className="pt-2">
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-sm font-manrope font-bold text-amber-500 hover:text-amber-400 group transition-colors"
          >
            Learn More About Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
