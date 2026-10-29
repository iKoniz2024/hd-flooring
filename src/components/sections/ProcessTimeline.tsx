'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const steps = [
  {
    num: '01',
    title: 'Consultation & Measurement',
    desc: 'We discuss your requirements, measure the space, and assess the existing flooring or subfloor conditions.',
    image: 'https://images.unsplash.com/photo-1567361808959-79e4a84c3f6c?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '02',
    title: 'Material Selection & Quotation',
    desc: 'We help identify suitable flooring options and provide a project estimate based on the agreed scope.',
    image: 'https://images.unsplash.com/photo-1581415296450-d16971274f85?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '03',
    title: 'Surface Preparation',
    desc: 'We prepare the installation area, including relevant removal, leveling, and subfloor preparation.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '04',
    title: 'Professional Installation',
    desc: 'We install the selected flooring with attention to precision, alignment, and manufacturer-recommended requirements.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '05',
    title: 'Finishing & Transitions',
    desc: 'We complete relevant trim work, baseboards, stair details, and transitions for a coordinated finish.',
    image: 'https://images.unsplash.com/photo-1646592491913-b2d617271b2d?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '06',
    title: 'Cleanup & Final Walkthrough',
    desc: 'We clean the work area and review the completed installation with the client.',
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1000&q=90&fm=webp',
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
        className="text-center mb-12 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#E85D04] animate-pulse" />
          <span>Proven Workflow</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Our Installation <span className="text-[#E85D04]">Process</span>
        </h2>
        <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          We follow a structured process to help keep flooring projects organized and efficient.
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
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[420px] sm:h-[480px] w-full group">
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

            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

            {/* Bottom Overlay Info Card */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-stone-800 shadow-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-200">Step {activeStep.num} of 06</span>
                <span className="text-[#E85D04] font-extrabold">{activeStep.title}</span>
              </div>
              <button
                onClick={() => openBookModal(`Step ${activeStep.num} - ${activeStep.title}`)}
                className="w-full py-2 px-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/25 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Get Free Estimate
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Clean 6-Step Feature Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step, idx) => {
            const isHovered = activeIdx === idx;
            const color = {
              borderHover: 'hover:border-[#E85D04]/60',
              numBadge: 'bg-[#E85D04] text-white shadow-[#E85D04]/30',
              titleHover: 'group-hover:text-[#E85D04]',
              iconColor: 'text-[#E85D04]',
              footerText: 'text-[#E85D04]',
            };

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800/90 ${color.borderHover} ${isHovered ? 'ring-2 ring-[#E85D04]/50 shadow-2xl -translate-y-1.5' : ''} shadow-xl overflow-hidden group flex flex-col justify-between p-6 transition-all duration-500 ease-out cursor-pointer space-y-4 h-full`}
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
