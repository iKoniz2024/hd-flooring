'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
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
      return { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } };
    case 1:
      return { hidden: { opacity: 0, scale: 0.75 }, show: { opacity: 1, scale: 1 } };
    case 2:
      return { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } };
    case 3:
      return { hidden: { opacity: 0, y: -50 }, show: { opacity: 1, y: 0 } };
    case 4:
      return { hidden: { opacity: 0, scale: 1.25 }, show: { opacity: 1, scale: 1 } };
    case 5:
    default:
      return { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } };
  }
};

export function WhyUs() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth parallax scroll translation effect (-20% to +20%)
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section
      ref={containerRef}
      className="relative py-24 border-y border-slate-200 dark:border-slate-800 font-inter overflow-hidden bg-slate-100/90 dark:bg-slate-950 text-slate-900 dark:text-white"
    >
      {/* Parallax Image Background Layer */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 -top-[25%] -bottom-[25%] w-full h-[150%] pointer-events-none z-0"
      >
        <Image
          src="/assets/images/team-company/team-company-07.jpg"
          alt="HD Flooring Craftsmanship Parallax Background"
          fill
          className="object-cover opacity-35 dark:opacity-65 filter brightness-105 dark:brightness-95 contrast-105 saturate-110"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Adaptive Light/Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/80 via-slate-100/50 to-slate-100/90 dark:from-slate-950/70 dark:via-slate-950/50 dark:to-slate-950/80 z-0" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-manrope font-bold uppercase tracking-wider text-center max-w-full shadow-lg shadow-red-600/30 backdrop-blur-md">
            Why Choose HD Flooring
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
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
                  <div className="h-full p-8 rounded-3xl bg-white/90 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 hover:border-red-500/60 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all duration-300 space-y-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center group-hover:scale-110 shadow-lg shadow-red-600/30 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-inter font-normal dark:font-medium">
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
