'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Consultation & Moisture Test',
    desc: 'Tell us about your space, room moisture, design preferences, and timeline.',
    image: '/assets/images/team-company/team-company-01.jpg',
  },
  {
    num: '02',
    title: 'On-Site Assessment & Laser Measure',
    desc: 'We review the project site, measure square footage, and evaluate subfloor prep requirements.',
    image: '/assets/images/floor-preparation/floor-preparation-01.jpg',
  },
  {
    num: '03',
    title: 'Flooring Selection',
    desc: 'Choose your preferred wood species, vinyl plank, or tile design matching your budget.',
    image: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-01.jpg',
  },
  {
    num: '04',
    title: 'Subfloor Prep & Tear-Out',
    desc: 'We tear out existing floors, level subfloors, and fix squeaks for a smooth foundation.',
    image: '/assets/images/flooring-replacement/flooring-replacement-01.jpg',
  },
  {
    num: '05',
    title: 'Master Installation',
    desc: 'Our experienced installation team fits your floor with precision layout, scribing, and care.',
    image: '/assets/images/hardwood-flooring/hardwood-flooring-02.jpg',
  },
  {
    num: '06',
    title: 'Final Inspection & Cleanup',
    desc: 'We conduct a thorough walk-through to ensure clean trim finishing and 100% satisfaction.',
    image: '/assets/images/team-company/team-company-07.jpg',
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 mb-16"
      >
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-manrope font-bold uppercase tracking-wider text-center max-w-full">
          Our Proven Process
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
          From Your Idea to the Finished Floor
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
            >
              {/* Image Preview Banner - High Clarity in Light & Dark Mode */}
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 shadow-md">
                  <span className="font-playfair text-xs font-extrabold text-red-400">
                    Step {step.num}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-playfair text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {step.title}
                    </h3>
                    <CheckCircle2 className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
