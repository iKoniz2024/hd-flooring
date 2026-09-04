'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { servicesData } from '@/data/services';
import { TiltCard } from '@/components/interactive/TiltCard';
import { useModal } from '@/lib/context/ModalContext';

const getCardVariant = (idx: number) => {
  switch (idx % 6) {
    case 0:
      return { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } }; // Left
    case 1:
      return { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }; // Zoom In
    case 2:
      return { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } }; // Right
    case 3:
      return { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } }; // Up
    case 4:
      return { hidden: { opacity: 0, scale: 1.2 }, show: { opacity: 1, scale: 1 } }; // Zoom Out
    case 5:
    default:
      return { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } }; // Down
  }
};

export function ServicesGrid() {
  const { openBookModal } = useModal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-manrope font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-sky-400" />
          Flooring Solutions for Every Space
        </span>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
          Our Flooring Installation Services
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-inter">
          Different spaces require different flooring. We provide expert installation across a wide range of popular Canadian flooring options.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, idx) => {
          const variant = getCardVariant(idx);
          return (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={variant}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <TiltCard>
                <div className="h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-xl shadow-black/5 dark:shadow-black/40 overflow-hidden flex flex-col justify-between group transition-all duration-300">
                  {/* Image Banner */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-manrope font-semibold text-sky-300 bg-slate-950/80 px-3 py-1 rounded-full border border-sky-500/30 backdrop-blur-md">
                      {service.title.split(' ')[0]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-playfair text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {service.benefits.slice(0, 2).map((benefit, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 font-manrope"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => openBookModal(service.title)}
                        className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-manrope font-bold text-xs transition-colors shrink-0"
                      >
                        Book Us
                      </button>

                      <Link
                        href={`/services/${service.slug}`}
                        className="text-xs font-manrope font-semibold text-slate-700 dark:text-slate-300 hover:text-red-500 flex items-center gap-1 group/link transition-colors shrink-0"
                      >
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover/link:translate-x-1 transition-transform" />
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


