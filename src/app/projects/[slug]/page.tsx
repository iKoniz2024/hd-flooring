'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, MapPin, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { projectsData } from '@/data/projects';
import { useModal } from '@/lib/context/ModalContext';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openBookModal } = useModal();

  const project = projectsData.find((p) => p.slug === slug) || projectsData[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-manrope font-semibold text-amber-500 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Project Gallery
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-manrope font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-manrope font-medium">
              {project.propertyType}
            </span>
            <span className="text-xs text-amber-500 font-manrope flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {project.location}
            </span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
            {project.title}
          </h1>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 max-h-[500px]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 font-inter">
          {/* Challenge */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <span className="text-xs font-manrope font-bold text-amber-500 uppercase tracking-widest">
              01 — The Challenge
            </span>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <span className="text-xs font-manrope font-bold text-amber-500 uppercase tracking-widest">
              02 — Our Solution
            </span>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Result */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <span className="text-xs font-manrope font-bold text-amber-500 uppercase tracking-widest">
              03 — The Result
            </span>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 font-manrope">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-stone-100">
              Want a Similar Floor Transformation?
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Book a free site consultation for your space today.
            </p>
          </div>
          <button
            onClick={() => openBookModal(project.category)}
            className="px-6 py-3 rounded-full bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shrink-0 shadow-lg shadow-amber-500/20"
          >
            Book This Service
          </button>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
