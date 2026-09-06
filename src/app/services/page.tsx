'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Hammer, Footprints, Grid, Maximize2, Shield, Flame, Paintbrush, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { servicesData } from '@/data/services';
import { useModal } from '@/lib/context/ModalContext';
import { TiltCard } from '@/components/interactive/TiltCard';

const serviceIcons = [Layers, Hammer, Footprints, Grid, Maximize2, Shield, Flame, Paintbrush, ShieldCheck];

const getServiceVariant = (idx: number) => {
  switch (idx % 6) {
    case 0:
      return { initial: { opacity: 0, x: -60, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } };
    case 1:
      return { initial: { opacity: 0, scale: 0.75 }, animate: { opacity: 1, scale: 1 } };
    case 2:
      return { initial: { opacity: 0, x: 60, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } };
    case 3:
      return { initial: { opacity: 0, y: 60, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } };
    case 4:
      return { initial: { opacity: 0, scale: 1.25 }, animate: { opacity: 1, scale: 1 } };
    case 5:
    default:
      return { initial: { opacity: 0, y: -50, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } };
  }
};

export default function ServicesPage() {
  const { openBookModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Our Services"
        title="Flooring Services We Offer"
        subtitle="Professional flooring installation for homes and commercial spaces across Canada."
        backgroundImage="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=65&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
        primaryCta={{
          label: 'Book Free Consultation',
          onClick: openBookModal,
        }}
      />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16 overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const v = getServiceVariant(index);
            const IconComponent = serviceIcons[index % serviceIcons.length];
            const stepNum = String(index + 1).padStart(2, '0');

            const colorSchemes = [
              {
                topBar: 'bg-red-500',
                iconBg: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30 group-hover:bg-red-600 group-hover:text-white',
                numBadge: 'bg-red-600 text-white shadow-red-500/30',
                titleHover: 'group-hover:text-red-500 dark:group-hover:text-red-400',
                btnBg: 'bg-red-600 text-white hover:bg-red-700',
              },
              {
                topBar: 'bg-sky-500',
                iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30 group-hover:bg-sky-500 group-hover:text-white',
                numBadge: 'bg-sky-500 text-white shadow-sky-500/30',
                titleHover: 'group-hover:text-sky-500 dark:group-hover:text-sky-400',
                btnBg: 'bg-sky-600 text-white hover:bg-sky-700',
              },
              {
                topBar: 'bg-amber-500',
                iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 group-hover:bg-amber-500 group-hover:text-stone-950',
                numBadge: 'bg-amber-500 text-stone-950 shadow-amber-500/30',
                titleHover: 'group-hover:text-amber-500 dark:group-hover:text-amber-400',
                btnBg: 'bg-amber-500 text-stone-950 hover:bg-amber-600',
              },
            ];
            const color = colorSchemes[index % colorSchemes.length];

            return (
              <motion.div
                key={service.id}
                initial={v.initial}
                whileInView={v.animate}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <TiltCard>
                  <div className="p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-red-500/60 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-500 ease-out hover:-translate-y-2 h-full cursor-pointer relative space-y-4">
                    {/* Top Accent Line */}
                    <div className={`h-1.5 w-0 group-hover:w-full ${color.topBar} transition-all duration-500 absolute top-0 left-0 rounded-t-3xl`} />

                    {/* Card Header: Vector Icon + Number Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${color.iconBg} border flex items-center justify-center font-bold shadow-md transition-all duration-500 group-hover:scale-110`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <span className={`w-9 h-9 rounded-xl ${color.numBadge} font-extrabold text-xs flex items-center justify-center shadow-md`}>
                        {stepNum}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className={`font-jakarta text-xl font-extrabold text-slate-900 dark:text-slate-100 ${color.titleHover} transition-colors`}>
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex items-center justify-between gap-2.5 border-t border-slate-100 dark:border-slate-800/80 font-manrope">
                      <button
                        onClick={() => openBookModal(service.title)}
                        className={`px-4 py-2 rounded-xl ${color.btnBg} font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Request Quote
                      </button>

                      <Link
                        href={`/services/${service.slug}`}
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 group/link shrink-0"
                      >
                        Details
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-red-500" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}


