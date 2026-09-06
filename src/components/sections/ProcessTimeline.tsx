'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Consultation & Site Assessment',
    desc: 'We evaluate your room dimensions, subfloor moisture levels, traffic needs, and design preferences.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=55&fm=webp',
  },
  {
    num: '02',
    title: 'Flooring Selection & Material Quote',
    desc: 'Select from our wide range of solid hardwood, engineered wood, LVP vinyl, laminate, or tile options.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=55&fm=webp',
  },
  {
    num: '03',
    title: 'Subfloor Prep & Tear-Out',
    desc: 'Removal of old flooring, subfloor leveling, squeak repair, and acoustic underlayment placement.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=55&fm=webp',
  },
  {
    num: '04',
    title: 'Precision Master Installation',
    desc: 'Expert craftsmanship installation with clean scribing, expansion gap management, and seamless joints.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=55&fm=webp',
  },
  {
    num: '05',
    title: 'Trims, Baseboards & Capping',
    desc: 'Installation of matching baseboards, stair capping, transitions, and detail finishing touches.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=55&fm=webp',
  },
  {
    num: '06',
    title: 'Final Quality Walkthrough',
    desc: 'Complete site cleanup, detailed walkthrough inspection, and issuance of your workmanship warranty.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=55&fm=webp',
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-amber-500/10 to-sky-500/10 border border-stone-300 dark:border-stone-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-sky-500" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-sky-500">Our 6-Step Installation Process</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          From Consultation to Finished Floor
        </h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
          Our systematic step-by-step workflow guarantees precision, cleanliness, and long-lasting flooring quality for every Canadian space.
        </p>
      </motion.div>

      {/* Grid of step boxes with logo color mixture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {steps.map((step, idx) => {
          const stepColors = [
            {
              borderHover: 'hover:border-red-500/60',
              numBadge: 'bg-red-600 text-white shadow-red-500/30',
              titleHover: 'group-hover:text-red-500',
              iconColor: 'text-red-500',
              footerText: 'text-red-500',
            },
            {
              borderHover: 'hover:border-sky-500/60',
              numBadge: 'bg-sky-500 text-white shadow-sky-500/30',
              titleHover: 'group-hover:text-sky-500',
              iconColor: 'text-sky-500',
              footerText: 'text-sky-500',
            },
            {
              borderHover: 'hover:border-amber-500/60',
              numBadge: 'bg-amber-500 text-stone-950 shadow-amber-500/30',
              titleHover: 'group-hover:text-amber-500',
              iconColor: 'text-amber-500',
              footerText: 'text-amber-500',
            },
          ];
          const color = stepColors[idx % stepColors.length];

          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800/90 ${color.borderHover} shadow-xl hover:shadow-2xl overflow-hidden group flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer`}
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
                
                {/* Large step number box */}
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-2xl ${color.numBadge} font-black text-lg flex items-center justify-center shadow-xl`}>
                  {step.num}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-jakarta text-lg font-extrabold text-stone-900 dark:text-stone-100 ${color.titleHover} transition-colors`}>
                      {step.title}
                    </h3>
                    <CheckCircle2 className={`w-5 h-5 ${color.iconColor} shrink-0 mt-0.5`} />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className={`pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold ${color.footerText}`}>
                  <span>Step {step.num} of 06</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

