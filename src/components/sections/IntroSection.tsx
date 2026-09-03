'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center font-inter border-b border-slate-200 dark:border-slate-800">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-manrope font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          Flooring Installation You Can Count On
        </span>

        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
          Dependable Craftsmanship for Canadian Projects
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          At HD Flooring, we make flooring installation simple, professional, and dependable. We work with homeowners, businesses, contractors, property owners, and renovation projects to install a wide range of flooring solutions.
        </p>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          Whether you're upgrading a single room, renovating an entire home, or completing a commercial project, our team focuses on proper preparation, precise installation, clean finishing, and lasting results.
        </p>

        <div className="pt-2">
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-sm font-manrope font-bold text-red-500 hover:text-red-400 group transition-colors"
          >
            Learn More About Us
            <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
