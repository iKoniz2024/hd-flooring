'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

const cardsData = [
  {
    badge: 'Subfloor Prep',
    topBar: 'bg-red-500',
    hoverBorder: 'hover:border-red-500/80',
    iconBox: 'bg-red-500/10 dark:bg-red-500/20 border-red-500/30 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600',
    badgeText: 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/30',
    titleHover: 'group-hover:text-red-500 dark:group-hover:text-red-400',
    title: 'Subfloor Leveling & Prep',
    desc: 'We fix uneven subfloors and moisture issues so your new floor sits completely flat and squeak-free.',
    icon: Layers,
  },
  {
    badge: 'Experienced Team',
    topBar: 'bg-sky-500',
    hoverBorder: 'hover:border-sky-500/80',
    iconBox: 'bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/30 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500',
    badgeText: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/30',
    titleHover: 'group-hover:text-sky-500 dark:group-hover:text-sky-400',
    title: 'Professional Installation',
    desc: 'Our expert team installs solid hardwood, vinyl plank, laminate, tile, and carpet with clean borders.',
    icon: ShieldCheck,
  },
  {
    badge: 'Clean & On Time',
    topBar: 'bg-amber-500',
    hoverBorder: 'hover:border-amber-500/80',
    iconBox: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-500',
    badgeText: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
    titleHover: 'group-hover:text-amber-500 dark:group-hover:text-amber-400',
    title: 'Clean & Dust-Free Work',
    desc: 'We remove old floors, protect your furniture, keep dust away, and clean up thoroughly when finished.',
    icon: CheckCircle2,
  },
];

export function IntroSection() {
  return (
    <section className="pt-52 pb-20 sm:pt-60 sm:pb-28 lg:pt-64 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 2-Column Side-by-Side Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Side: Large High-Resolution Showcase Image Frame */}
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative group"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[480px] sm:h-[560px] w-full">
            <img
              src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=75&fm=webp"
              alt="Professional Hardwood Flooring Installation in Action"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

            {/* Top Floating Badge */}
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-900 dark:text-white shadow-xl">
              <Award className="w-4 h-4 text-red-500" />
              <span>Certified Installation Standard</span>
            </div>

            {/* Bottom Floating Stats Box */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200 dark:border-stone-800 shadow-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-300">
                <span>Workmanship Guarantee</span>
                <span className="text-emerald-500 font-extrabold">100% Squeak Free</span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Precision subfloor prep & laser alignment for lasting residential and commercial floors.
              </p>
            </div>
          </div>

          {/* Background Decorative Accent Glow */}
          <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-tr from-red-600/20 to-sky-600/20 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* Right Side: Section Content & Feature Cards */}
        <div className="lg:col-span-7 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-amber-500/10 to-sky-500/10 border border-stone-200 dark:border-stone-800 text-xs font-manrope font-black uppercase tracking-widest shadow-sm">
                <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-sky-500">Reliable Flooring Services</span>
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight"
            >
              Quality Flooring Installation for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-sky-500">
                Homes & Businesses
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium"
            >
              We install top quality floors for homes, offices, and commercial properties across Canada. Quick, clean, and built to last.
            </motion.p>
          </div>

          {/* 3 Feature Cards List */}
          <div className="space-y-4">
            {cardsData.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  whileHover={{ x: 6 }}
                  className={`group p-6 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800/90 ${card.hoverBorder} shadow-lg hover:shadow-xl transition-all duration-300 flex items-start gap-5 cursor-pointer relative overflow-hidden`}
                >
                  <div className={`h-full w-1.5 ${card.topBar} absolute top-0 left-0 transition-all duration-300`} />

                  <div className={`w-12 h-12 rounded-xl ${card.iconBox} border flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`font-jakarta font-extrabold text-base sm:text-lg text-stone-900 dark:text-white ${card.titleHover} transition-colors`}>
                        {card.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${card.badgeText} shrink-0`}>
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Link */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-2"
          >
            <Link
              href="/about-us"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-red-600 text-white hover:bg-red-700 font-manrope font-black text-xs uppercase tracking-widest shadow-xl shadow-red-600/30 transition-all duration-300 group"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}


