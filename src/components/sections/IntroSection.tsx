'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

const cardsData = [
  {
    badge: 'Foundation First',
    badgeColor: 'text-red-500 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/40',
    iconColor: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/30',
    hoverBorder: 'hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-500/15',
    title: 'Subfloor Leveling & Prep',
    desc: 'Precision self-leveling compound, moisture testing, and plywood boarding ensure a 100% squeak-free, flat foundation.',
    icon: Layers,
    initialOffset: { opacity: 0, y: 35, x: -20 },
  },
  {
    badge: '15+ Years Experience',
    badgeColor: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800/40',
    iconColor: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sky-500/30',
    hoverBorder: 'hover:border-sky-500/60 hover:shadow-2xl hover:shadow-sky-500/15',
    title: 'Master Craftsmanship',
    desc: 'Expert solid wood, engineered, LVP, laminate, carpet, and tile setters with exact expansion spacing and clean trims.',
    icon: ShieldCheck,
    initialOffset: { opacity: 0, y: 45, x: 0 },
  },
  {
    badge: 'Turnkey Service',
    badgeColor: 'text-red-500 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/40',
    iconColor: 'bg-gradient-to-br from-red-500 to-amber-600 text-white shadow-red-500/30',
    hoverBorder: 'hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-500/15',
    title: 'Clean & Dust-Controlled',
    desc: 'Old floor tear-out, complete dust containment, furniture care, and waste haul-away — delivered on schedule.',
    icon: CheckCircle2,
    initialOffset: { opacity: 0, y: 35, x: 20 },
  },
];

export function IntroSection() {
  return (
    <section className="pt-52 pb-20 sm:pt-60 sm:pb-28 lg:pt-64 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
        {/* Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-xs font-manrope font-black uppercase tracking-widest shadow-sm">
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
            Flooring Installation You Can Count On
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight"
        >
          Dependable Craftsmanship for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-sky-600 block sm:inline">
            Canadian Spaces
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed font-medium max-w-3xl mx-auto"
        >
          At HD Flooring, we make flooring installation simple, professional, and dependable. We partner with homeowners, business owners, contractors, and renovators across Canada to deliver long-lasting, flawless floors.
        </motion.p>
      </div>

      {/* 3 Premium Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-16 relative z-10">
        {cardsData.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={card.initialOffset}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1.6,
                delay: 0.2 + idx * 0.2,
                ease: [0.16, 1, 0.3, 1], // Silky smooth slow ease curve
              }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 sm:p-9 rounded-3xl bg-white dark:bg-stone-900 hover:bg-stone-950 dark:hover:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-500/80 shadow-xl transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-2"
            >
              {/* Top Animated Gold Accent Bar */}
              <div className="h-1 w-0 group-hover:w-full bg-amber-500 transition-all duration-500 absolute top-0 left-0 z-20" />

              <div>
                {/* Icon Box */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5 + idx * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-500"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3 shadow-xs">
                  <span>{card.badge}</span>
                </div>

                {/* Title */}
                <h3 className="font-playfair font-black text-xl text-stone-900 dark:text-white group-hover:text-amber-400 transition-colors duration-300 mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-stone-600 dark:text-stone-300 group-hover:text-stone-300 transition-colors duration-300 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Action Line */}
              <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800/80 group-hover:border-stone-800 flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400 group-hover:text-amber-400 transition-colors duration-300">
                <span>Learn Craftsmanship</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pt-14 text-center relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="inline-block"
        >
          <Link
            href="/about-us"
            className="inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white font-manrope font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-900/30 hover:shadow-red-600/30 transition-all duration-300 group"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="w-4 h-4 text-sky-400 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}


