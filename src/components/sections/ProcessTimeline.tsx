'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Consultation & Site Assessment',
    desc: 'We evaluate your room dimensions, subfloor moisture levels, traffic needs, and design preferences.',
    image: '/assets/images/team-company/team-company-01.jpg',
  },
  {
    num: '02',
    title: 'Flooring Selection & Material Quote',
    desc: 'Select from our wide range of solid hardwood, engineered wood, LVP vinyl, laminate, or tile options.',
    image: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-01.jpg',
  },
  {
    num: '03',
    title: 'Subfloor Prep & Tear-Out',
    desc: 'Removal of old flooring, subfloor leveling, squeak repair, and acoustic underlayment placement.',
    image: '/assets/images/flooring-replacement/flooring-replacement-01.jpg',
  },
  {
    num: '04',
    title: 'Precision Master Installation',
    desc: 'Expert craftsmanship installation with clean scribing, expansion gap management, and seamless joints.',
    image: '/assets/images/hardwood-flooring/hardwood-flooring-02.jpg',
  },
  {
    num: '05',
    title: 'Trims, Baseboards & Capping',
    desc: 'Installation of matching baseboards, stair capping, transitions, and detail finishing touches.',
    image: '/assets/images/floor-preparation/floor-preparation-01.jpg',
  },
  {
    num: '06',
    title: 'Final Quality Walkthrough',
    desc: 'Complete site cleanup, detailed walkthrough inspection, and issuance of your workmanship warranty.',
    image: '/assets/images/team-company/team-company-07.jpg',
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden relative">
      {/* Header - ipropertybd inspired */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Our 6-Step Installation Process</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          From Consultation to Finished Floor
        </h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
          Our systematic step-by-step workflow guarantees precision, cleanliness, and long-lasting flooring quality for every Canadian space.
        </p>
      </motion.div>

      {/* Grid of ipropertybd styled step boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {steps.map((step, idx) => {
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/60 shadow-xl shadow-stone-900/5 dark:shadow-black/60 overflow-hidden group flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full bg-stone-950 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                {/* Large ipropertybd style step number box */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 font-black text-lg flex items-center justify-center shadow-xl shadow-amber-500/30">
                  {step.num}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-playfair text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                      {step.title}
                    </h3>
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-amber-500">
                  <span>Step {step.num} of 06</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

