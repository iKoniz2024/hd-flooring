'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Building2, Wrench, PhoneCall, UserCheck, Sparkles } from 'lucide-react';
import { TiltCard } from '@/components/interactive/TiltCard';

const whyUsItems = [
  {
    icon: ShieldCheck,
    title: 'Laser Precision Installation',
    desc: 'Every project is approached with laser floor leveling, subfloor moisture tests, expansion alignment, and clean trim finishing.',
  },
  {
    icon: Layers,
    title: 'Wide Flooring Expertise',
    desc: 'Mastery across solid hardwood, engineered wood, luxury vinyl planks (LVP), laminate, plush carpet, and porcelain tile.',
  },
  {
    icon: Building2,
    title: 'Residential & Commercial',
    desc: 'From single-room home renovations to large-scale commercial offices, condos, retail stores, and hospitality spaces.',
  },
  {
    icon: Wrench,
    title: 'Detail-Oriented Workmanship',
    desc: 'We focus on micro-details, staircase nosing profiles, door casing undercutting, and seamless transition strips.',
  },
  {
    icon: PhoneCall,
    title: 'Reliable Communication',
    desc: 'Transparent timelines, upfront square foot estimates, and open communication from initial consultation to final walkthrough.',
  },
  {
    icon: UserCheck,
    title: 'Customer-Focused Solutions',
    desc: 'Tailored recommendations based on room moisture, lifestyle traffic, aesthetic preferences, and project budget.',
  },
];

export function WhyUs() {
  return (
    <section className="py-24 border-y border-stone-200 dark:border-stone-800 font-inter bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 relative overflow-hidden">
      {/* Brand Color Ambient Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-amber-500/10 to-sky-500/10 border border-stone-300 dark:border-stone-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-sky-500">Why Choose HD Flooring</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white">
            The Standard of Flooring Excellence
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
            Delivering unmatched workmanship, transparent pricing, and long-lasting flooring installation across Canada.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsItems.map((item, idx) => {
            const Icon = item.icon;
            const cardColors = [
              {
                topBar: 'bg-red-500',
                border: 'hover:border-red-500/80',
                iconBox: 'bg-red-500/10 dark:bg-red-500/20 border-red-500/30 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600',
                titleHover: 'group-hover:text-red-500 dark:group-hover:text-red-400',
              },
              {
                topBar: 'bg-sky-500',
                border: 'hover:border-sky-500/80',
                iconBox: 'bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/30 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500',
                titleHover: 'group-hover:text-sky-500 dark:group-hover:text-sky-400',
              },
              {
                topBar: 'bg-amber-500',
                border: 'hover:border-amber-500/80',
                iconBox: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-500',
                titleHover: 'group-hover:text-amber-500 dark:group-hover:text-amber-400',
              },
            ];
            const color = cardColors[idx % cardColors.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <TiltCard>
                  <div className={`h-full p-8 sm:p-9 rounded-3xl bg-white dark:bg-stone-900 hover:bg-stone-950 dark:hover:bg-stone-950 border border-stone-200 dark:border-stone-800 ${color.border} shadow-xl shadow-stone-900/5 dark:shadow-black/50 transition-all duration-500 space-y-4 group relative overflow-hidden cursor-pointer hover:-translate-y-2`}>
                    {/* Top Animated Accent Bar */}
                    <div className={`h-1 w-0 group-hover:w-full ${color.topBar} transition-all duration-500 absolute top-0 left-0`} />
                    
                    {/* Icon Box */}
                    <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${color.iconBox} border flex items-center justify-center font-bold shadow-lg transition-all duration-500 group-hover:scale-110`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    {/* Title */}
                    <h3 className={`font-playfair text-xl font-black text-stone-900 dark:text-white ${color.titleHover} transition-colors duration-300`}>
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 group-hover:text-stone-300 transition-colors duration-300 leading-relaxed font-normal">
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

