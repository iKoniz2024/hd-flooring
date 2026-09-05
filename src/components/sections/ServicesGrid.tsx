'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { servicesData } from '@/data/services';
import { TiltCard } from '@/components/interactive/TiltCard';
import { useModal } from '@/lib/context/ModalContext';

export function ServicesGrid() {
  const { openBookModal } = useModal();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden">
      {/* Header - ipropertybd + hdflooringca styling */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Professional Flooring Installation</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Flooring Solutions For Every Space
        </h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
          Explore our complete range of Canadian flooring installation services designed for residential homes, condos, and commercial properties.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, idx) => {
          const stepNumber = String(idx + 1).padStart(2, '0');
          // Color schemes alternating across Red, Sky Blue, and Amber Gold
          const colorSchemes = [
            {
              // Red
              topBar: 'bg-red-500',
              hoverBorder: 'hover:border-red-500/80',
              badgeBg: 'bg-red-600 text-white shadow-red-500/30',
              tagText: 'text-red-400 border-red-500/30',
              titleHover: 'group-hover:text-red-400',
              checkIcon: 'text-red-500',
              btnBg: 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-500/20 hover:from-red-500 hover:to-red-400',
              arrowBg: 'bg-red-600 group-hover:bg-red-500 text-white',
            },
            {
              // Sky Blue
              topBar: 'bg-sky-500',
              hoverBorder: 'hover:border-sky-500/80',
              badgeBg: 'bg-sky-500 text-white shadow-sky-500/30',
              tagText: 'text-sky-400 border-sky-500/30',
              titleHover: 'group-hover:text-sky-400',
              checkIcon: 'text-sky-500',
              btnBg: 'bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-sky-500/20 hover:from-sky-500 hover:to-sky-400',
              arrowBg: 'bg-sky-500 group-hover:bg-sky-400 text-white',
            },
            {
              // Amber Gold
              topBar: 'bg-amber-500',
              hoverBorder: 'hover:border-amber-500/80',
              badgeBg: 'bg-amber-500 text-stone-950 shadow-amber-500/30',
              tagText: 'text-amber-400 border-amber-500/30',
              titleHover: 'group-hover:text-amber-400',
              checkIcon: 'text-amber-500',
              btnBg: 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500',
              arrowBg: 'bg-amber-500 group-hover:bg-amber-400 text-stone-950',
            },
          ];
          const color = colorSchemes[idx % colorSchemes.length];

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <TiltCard>
                <div className={`h-full rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-950 dark:hover:bg-stone-950 border border-stone-200 dark:border-stone-800 ${color.hoverBorder} shadow-xl shadow-stone-900/5 dark:shadow-black/60 overflow-hidden flex flex-col justify-between group transition-all duration-500 relative`}>
                  {/* Top Brand Accent Line */}
                  <div className={`h-1 w-0 group-hover:w-full ${color.topBar} transition-all duration-500`} />

                  {/* Image Banner */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                    
                    {/* Number Overlay Badge */}
                    <div className={`absolute top-3 right-3 w-10 h-10 rounded-xl ${color.badgeBg} font-black text-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {stepNumber}
                    </div>

                    {/* Tag */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className={`text-[11px] font-bold ${color.tagText} bg-stone-950/90 px-3 py-1 rounded-full border backdrop-blur-md`}>
                        {service.idealFor[0] || 'Residential & Commercial'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className={`font-playfair text-xl font-bold text-stone-900 dark:text-stone-100 ${color.titleHover} transition-colors duration-300`}>
                        {service.title}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-400 group-hover:text-stone-300 transition-colors duration-300 leading-relaxed line-clamp-2">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <ul className="space-y-1.5 pt-3 border-t border-stone-100 dark:border-stone-800/80 group-hover:border-stone-800">
                      {service.benefits.slice(0, 2).map((benefit, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-xs text-stone-600 dark:text-stone-300 group-hover:text-stone-200 transition-colors flex items-start gap-2"
                        >
                          <CheckCircle className={`w-3.5 h-3.5 ${color.checkIcon} shrink-0 mt-0.5`} />
                          <span className="line-clamp-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Bar */}
                    <div className="pt-4 flex items-center justify-between gap-3 border-t border-stone-100 dark:border-stone-800/80 group-hover:border-stone-800">
                      <button
                        onClick={() => openBookModal(service.title)}
                        className={`px-4 py-2 rounded-xl ${color.btnBg} font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Book Us
                      </button>

                      <Link
                        href={`/services/${service.slug}`}
                        className={`w-9 h-9 rounded-xl ${color.arrowBg} flex items-center justify-center font-extrabold shadow-md group-hover:scale-110 transition-all duration-300`}
                        title="Explore Service"
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}



