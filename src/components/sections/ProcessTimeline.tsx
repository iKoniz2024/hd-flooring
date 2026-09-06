'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const steps = [
  {
    num: '01',
    title: 'Site Measurement & Inspection',
    desc: 'We measure your room dimensions, check subfloor moisture, and discuss your design ideas.',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '02',
    title: 'Floor Selection & Free Quote',
    desc: 'Choose your preferred flooring material and get a clear, upfront price estimate.',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '03',
    title: 'Old Floor Removal & Subfloor Prep',
    desc: 'We remove old floors, level the subfloor, repair squeaks, and install underlayment.',
    image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '04',
    title: 'Professional Floor Installation',
    desc: 'Our expert team lays your new floor with tight seams, straight lines, and clean edge cuts.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '05',
    title: 'Baseboards & Transition Strips',
    desc: 'We fit matching baseboards, stair caps, and door transition moldings for a complete look.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '06',
    title: 'Clean Up & Final Inspection',
    desc: 'We clean up the work area, inspect every room with you, and issue your warranty.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
];

export function ProcessTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStep = steps[activeIdx];
  const { openBookModal } = useModal();

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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-sky-500">How We Work (6 Easy Steps)</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Our Step-by-Step Installation Process
        </h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
          Hover over any step card to see how we complete each stage of your floor installation.
        </p>
      </motion.div>

      {/* Side-by-Side 2-Column Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Side: Dynamic Interactive Showcase Photo Frame */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 sticky top-28 space-y-6"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[520px] sm:h-[620px] w-full group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep.image}
                src={activeStep.image}
                alt={activeStep.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

            {/* Top Overlay Quality Badge */}
            <div className="absolute top-6 left-6 p-4 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-xl space-y-1">
              <span className="text-xs font-black uppercase text-sky-500 tracking-wider">Hover Preview: Step {activeStep.num} of 06</span>
              <p className="text-xs font-bold text-stone-900 dark:text-white">{activeStep.title}</p>
            </div>

            {/* Bottom Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-700 dark:text-stone-200">Saskatoon & Area Master Installation</span>
                <span className="text-emerald-500 font-extrabold">100% Quality</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                From room measurements to final baseboard touchups, our systematic 6-step workflow keeps your project on time and budget.
              </p>
              <button
                onClick={() => openBookModal(`Step ${activeStep.num} - ${activeStep.title}`)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-amber-500 to-red-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Schedule Free Site Assessment
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Clean 6-Step Feature Cards Grid (With Interactive Hover Photo Preview) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step, idx) => {
            const isHovered = activeIdx === idx;
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
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800/90 ${color.borderHover} ${isHovered ? 'ring-2 ring-sky-500/50 shadow-2xl -translate-y-1.5' : ''} shadow-xl overflow-hidden group flex flex-col justify-between p-6 transition-all duration-500 ease-out cursor-pointer space-y-4 h-full`}
              >
                {/* Hover Photo Preview Background Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-0">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-stone-950/40" />
                </div>

                {/* Header: Step Number Badge + Check Icon */}
                <div className="flex items-center justify-between relative z-10">
                  <div className={`w-12 h-12 rounded-2xl ${color.numBadge} font-black text-base flex items-center justify-center shadow-xl`}>
                    {step.num}
                  </div>
                  <CheckCircle2 className={`w-5 h-5 ${color.iconColor} shrink-0`} />
                </div>

                {/* Content */}
                <div className="space-y-2 relative z-10">
                  <h3 className={`font-jakarta text-base font-extrabold text-stone-900 dark:text-stone-100 ${color.titleHover} transition-colors`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Footer */}
                <div className={`pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold ${color.footerText} relative z-10`}>
                  <span>Step {step.num} of 06</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}



