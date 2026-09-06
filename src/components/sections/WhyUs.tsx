'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Layers, Building2, Wrench, PhoneCall, UserCheck, Sparkles } from 'lucide-react';
import { TiltCard } from '@/components/interactive/TiltCard';

const whyUsItems = [
  {
    icon: ShieldCheck,
    title: 'Precise Floor Leveling',
    desc: 'We test for subfloor moisture and level the floor so your new flooring stays flat and smooth.',
    badge: 'Flat & Level',
    image: 'https://images.unsplash.com/photo-8279811788965-abc92?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: Layers,
    title: 'All Flooring Types',
    desc: 'We install solid hardwood, engineered wood, vinyl plank (LVP), laminate, carpet, and tile.',
    badge: 'Hardwood, Vinyl & Tile',
    image: 'https://images.unsplash.com/photo-4188564112143-abc93?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: Building2,
    title: 'Homes & Businesses',
    desc: 'From single-room home renovations to large offices, retail stores, and condos.',
    badge: 'Residential & Commercial',
    image: 'https://images.unsplash.com/photo-6979187040223-abc94?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: Wrench,
    title: 'Clean Trim & Borders',
    desc: 'We carefully cut door frames, install matching baseboards, and fit seamless transition strips.',
    badge: 'Neat Finish',
    image: 'https://images.unsplash.com/photo-9136374930968-abc95?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: PhoneCall,
    title: 'Clear Prices & Timelines',
    desc: 'You get upfront price quotes and clear project schedules with zero hidden charges.',
    badge: 'Honest Estimates',
    image: 'https://images.unsplash.com/photo-6044293978367-abc96?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: UserCheck,
    title: '100% Satisfaction',
    desc: 'We help you choose the best floor for your budget, lifestyle, and room moisture level.',
    badge: 'Guaranteed Quality',
    image: 'https://images.unsplash.com/photo-7102533810560-abc97?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
];

export function WhyUs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = whyUsItems[activeIdx];

  return (
    <section className="py-24 border-y border-stone-200 dark:border-stone-800 font-inter bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 relative overflow-hidden">
      {/* Brand Color Ambient Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-3xl pointer-events-none hidden dark:block" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 blur-3xl pointer-events-none hidden dark:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-3xl pointer-events-none hidden dark:block" />

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-sky-500">Why Choose Us</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white">
            Why Customers Trust HD Flooring
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
            Hover over any feature card to view our installation photos and quality standards.
          </p>
        </motion.div>

        {/* Side-by-Side 2-Column Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Side: Dynamic Interactive Showcase Photo Frame */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[480px] sm:h-[580px] w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.image}
                  src={activeItem.image}
                  alt={activeItem.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

              {/* Overlay Quality Badge */}
              <div className="absolute top-6 left-6 p-4 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-xl space-y-1">
                <span className="text-xs font-black uppercase text-red-500 tracking-wider">Hover Preview: {activeItem.badge}</span>
                <p className="text-xs font-bold text-stone-900 dark:text-white">{activeItem.title}</p>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-2xl">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-stone-700 dark:text-stone-200">Canadian Climate Engineered</span>
                  <span className="text-sky-500 font-extrabold">100% Guaranteed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Feature Grid (6 Clean Interactive Hover Cards) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyUsItems.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = activeIdx === idx;

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
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  <TiltCard>
                    <div className={`h-full p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800/90 ${color.border} ${isHovered ? 'ring-2 ring-red-500/50 shadow-2xl -translate-y-1.5' : ''} shadow-xl transition-all duration-500 space-y-3 group relative overflow-hidden cursor-pointer`}>

                      {/* Hover Photo Preview Background Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-stone-950/40" />
                      </div>

                      {/* Top Animated Accent Bar */}
                      <div className={`h-1.5 w-0 group-hover:w-full ${color.topBar} transition-all duration-500 absolute top-0 left-0 z-10`} />

                      {/* Icon Box */}
                      <div className={`w-12 h-12 rounded-2xl ${color.iconBox} border flex items-center justify-center font-bold shadow-lg transition-all duration-500 group-hover:scale-110 relative z-10`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Title */}
                      <h3 className={`font-jakarta text-lg font-extrabold text-stone-900 dark:text-white ${color.titleHover} transition-colors duration-300 relative z-10`}>
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal relative z-10">
                        {item.desc}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}


