'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Building2, Wrench, PhoneCall, UserCheck } from 'lucide-react';
import { TiltCard } from '@/components/interactive/TiltCard';

const whyUsItems = [
  {
    icon: ShieldCheck,
    title: 'Professional Installation',
    desc: 'Every project is approached with precision subfloor prep, expansion alignment, and clean finishing.',
  },
  {
    icon: Layers,
    title: 'Wide Flooring Expertise',
    desc: 'Mastery across hardwood, engineered wood, luxury vinyl, laminate, carpet, and porcelain tile.',
  },
  {
    icon: Building2,
    title: 'Residential & Commercial',
    desc: 'From single-room home updates to large-scale commercial offices, condos, and retail stores.',
  },
  {
    icon: Wrench,
    title: 'Detail-Oriented Workmanship',
    desc: 'We focus on the micro-details, nosing profiles, and clean trim transitions that elevate a space.',
  },
  {
    icon: PhoneCall,
    title: 'Reliable Communication',
    desc: 'Transparent timelines, clear pricing, and open project updates from start to final inspection.',
  },
  {
    icon: UserCheck,
    title: 'Customer-Focused Solutions',
    desc: 'Tailored recommendations based on room moisture, lifestyle traffic, aesthetic goals, and budget.',
  },
];

const getItemVariant = (idx: number) => {
  switch (idx % 6) {
    case 0:
      return { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } }; // Left
    case 1:
      return { hidden: { opacity: 0, scale: 0.75 }, show: { opacity: 1, scale: 1 } }; // Zoom In
    case 2:
      return { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } }; // Right
    case 3:
      return { hidden: { opacity: 0, y: -50 }, show: { opacity: 1, y: 0 } }; // Down
    case 4:
      return { hidden: { opacity: 0, scale: 1.25 }, show: { opacity: 1, scale: 1 } }; // Zoom Out
    case 5:
    default:
      return { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } }; // Up
  }
};

export function WhyUs() {
  return (
    <section className="py-20 bg-slate-900/60 dark:bg-slate-900/80 border-y border-red-500/20 font-inter overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-manrope font-bold uppercase tracking-wider text-center max-w-full">
            Why Choose HD Flooring
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-100">
            The Standard of Craftsmanship
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsItems.map((item, idx) => {
            const Icon = item.icon;
            const variant = getItemVariant(idx);
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={variant}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <TiltCard>
                  <div className="h-full p-8 rounded-3xl bg-slate-950/90 border border-slate-800 hover:border-red-500/40 shadow-xl transition-all duration-300 space-y-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-slate-100 group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-inter">
                      {item.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


