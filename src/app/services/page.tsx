'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { servicesData } from '@/data/services';
import { useModal } from '@/lib/context/ModalContext';
import { TiltCard } from '@/components/interactive/TiltCard';

const getServiceVariant = (idx: number) => {
  switch (idx % 6) {
    case 0:
      return { initial: { opacity: 0, x: -60, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } }; // Left + Zoom
    case 1:
      return { initial: { opacity: 0, scale: 0.75 }, animate: { opacity: 1, scale: 1 } }; // Zoom In
    case 2:
      return { initial: { opacity: 0, x: 60, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } }; // Right + Zoom
    case 3:
      return { initial: { opacity: 0, y: 60, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } }; // Up + Zoom
    case 4:
      return { initial: { opacity: 0, scale: 1.25 }, animate: { opacity: 1, scale: 1 } }; // Zoom Out
    case 5:
    default:
      return { initial: { opacity: 0, y: -50, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } }; // Down + Zoom
  }
};

export default function ServicesPage() {
  const { openBookModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Installation Expertise"
        title="Our Specialized Flooring Services"
        subtitle="Professional flooring installation for residential & commercial spaces across Saskatchewan. Explore our specialized craftsmanship categories below."
        backgroundImage="/assets/images/engineered-hardwood/engineered-hardwood-01.jpg"
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
            return (
              <motion.div
                key={service.id}
                initial={v.initial}
                whileInView={v.animate}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <TiltCard>
                  <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-red-500/60 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-500 ease-out hover:-translate-y-2 h-full cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.heroImage}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                      <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-red-600 text-white font-jakarta font-extrabold text-sm flex items-center justify-center shadow">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between font-inter">
                      <div className="space-y-2">
                        <h3 className="font-jakarta text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-100 dark:border-slate-800/80 font-manrope">
                        <button
                          onClick={() => openBookModal(service.title)}
                          className="px-3.5 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 font-bold text-xs transition-colors shrink-0 cursor-pointer"
                        >
                          Request Quote
                        </button>

                        <Link
                          href={`/services/${service.slug}`}
                          className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 group/link shrink-0"
                        >
                          Learn More
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-red-500" />
                        </Link>
                      </div>
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

