'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'Tell us about your space, room moisture, design preferences, and timeline.',
  },
  {
    num: '02',
    title: 'Assessment',
    desc: 'We review the project site, measure square footage, and evaluate subfloor prep requirements.',
  },
  {
    num: '03',
    title: 'Flooring Selection',
    desc: 'Choose your preferred wood species, vinyl plank, or tile design matching your budget.',
  },
  {
    num: '04',
    title: 'Preparation',
    desc: 'We tear out existing floors, level subfloors, and fix squeaks for a smooth foundation.',
  },
  {
    num: '05',
    title: 'Professional Installation',
    desc: 'Our experienced installation team fits your floor with precision layout and care.',
  },
  {
    num: '06',
    title: 'Final Inspection',
    desc: 'We conduct a thorough walk-through to ensure clean trim finishing and 100% satisfaction.',
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
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-manrope font-bold uppercase tracking-wider text-center max-w-full">
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
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-xl transition-all duration-300 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <motion.span
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="font-playfair text-4xl font-extrabold brand-gradient-text inline-block"
                >
                  {step.num}
                </motion.span>
                <CheckCircle2 className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


