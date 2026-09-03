'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-red-500 hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          Back to Project Gallery
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-manrope font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-manrope font-medium">
              {project.propertyType}
            </span>
            <span className="text-xs text-red-500 font-manrope font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              {project.location}
            </span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
            {project.title}
          </h1>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[500px]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 font-inter">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-manrope font-bold text-red-500 uppercase tracking-widest">
              01 — The Challenge
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-manrope font-bold text-sky-400 uppercase tracking-widest">
              02 — Our Solution
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-manrope font-bold text-red-500 uppercase tracking-widest">
              03 — The Result
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 font-manrope">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-playfair text-xl font-bold text-slate-900 dark:text-slate-100">
              Want a Similar Floor Transformation?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Book a free site consultation for your space today.
            </p>
          </div>
          <button
            onClick={() => openBookModal(project.category)}
            className="px-6 py-3 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition-colors shrink-0 shadow-lg shadow-red-600/20"
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
