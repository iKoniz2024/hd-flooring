'use client';

import { Sparkles, CheckCircle2 } from 'lucide-react';

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter">
      <div className="text-center space-y-3 mb-16">
        <span className="text-xs font-manrope font-semibold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
          Our Proven Process
        </span>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          From Your Idea to the Finished Floor
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="relative p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-playfair text-4xl font-extrabold gold-gradient-text">
                {step.num}
              </span>
              <CheckCircle2 className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-inter">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
