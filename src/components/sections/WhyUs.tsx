'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Layers, Building2, Wrench, PhoneCall, UserCheck, Sparkles } from 'lucide-react';
import { TiltCard } from '@/components/interactive/TiltCard';

const whyUsItems = [
  {
    icon: ShieldCheck,
    title: 'Precise Leveling',
    desc: 'Subfloor moisture testing & leveling.',
    badge: 'Flat & Level',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: Layers,
    title: 'All Flooring Types',
    desc: 'Hardwood, LVP, tile & laminate.',
    badge: 'Hardwood & Vinyl',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: Building2,
    title: 'Homes & Offices',
    desc: 'Residential & commercial projects.',
    badge: 'Residential & Commercial',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: Wrench,
    title: 'Clean Trim & Borders',
    desc: 'Baseboards, door frames & transitions.',
    badge: 'Neat Finish',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: PhoneCall,
    title: 'Upfront Pricing',
    desc: 'Clear quotes with zero hidden fees.',
    badge: 'Honest Estimates',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    icon: UserCheck,
    title: 'Guaranteed Quality',
    desc: 'Lifetime installation guarantee.',
    badge: 'Guaranteed Quality',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
];

export function WhyUs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = whyUsItems[activeIdx];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section className="py-24 border-y border-stone-200 dark:border-stone-800 font-inter bg-slate-50/60 dark:bg-stone-950 text-stone-900 dark:text-stone-100 relative overflow-hidden">
      {/* Clean Fixed Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full bg-fixed bg-cover bg-center bg-no-repeat opacity-60 dark:opacity-40"
          style={{
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1673770408482-075e320ae37f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        />
      </div>

      {/* Brand Color Ambient Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85D04]/10 blur-3xl pointer-events-none hidden dark:block" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E85D04]/10 blur-3xl pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#1E293B] text-white text-xs font-semibold tracking-wide shadow-md">
            <ShieldCheck className="w-4 h-4 text-[#E85D04]" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white">
            Why Customers Trust <span className="text-[#E85D04]">HD Flooring</span>
          </h2>
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[420px] sm:h-[480px] w-full">
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

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

              {/* Overlay Quality Badge */}
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-stone-950/80 backdrop-blur-md border border-[#E85D04]/40 shadow-xl space-y-0.5">
                <span className="text-[11px] font-black uppercase text-[#E85D04] tracking-wider">{activeItem.badge}</span>
                <p className="text-xs font-bold text-white">{activeItem.title}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Feature Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyUsItems.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = activeIdx === idx;

              const color = {
                topBar: 'bg-[#E85D04]',
                border: 'hover:border-[#E85D04]/80',
                iconBox: 'bg-[#E85D04]/10 dark:bg-[#E85D04]/20 border-[#E85D04]/30 text-[#E85D04] group-hover:bg-[#E85D04] group-hover:text-white group-hover:border-[#E85D04]',
                titleHover: 'group-hover:text-[#E85D04]',
              };

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
                    <div className={`h-full p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800/90 ${color.border} ${isHovered ? 'ring-2 ring-[#E85D04]/50 shadow-2xl -translate-y-1.5' : ''} shadow-xl transition-all duration-500 space-y-3 group relative overflow-hidden cursor-pointer`}>

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


