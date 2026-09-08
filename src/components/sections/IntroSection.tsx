'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, ShieldCheck, CheckCircle2, Award, Sparkles } from 'lucide-react';

const cardsData = [
  {
    title: 'Subfloor Leveling',
    desc: 'Moisture testing & flat subfloors.',
    icon: Layers,
  },
  {
    title: 'Master Installation',
    desc: 'Hardwood, LVP, tile & laminate.',
    icon: ShieldCheck,
  },
  {
    title: 'Clean Work Guarantee',
    desc: 'Dust protection & total cleanup.',
    icon: CheckCircle2,
  },
];

export function IntroSection() {
  return (
    <section className="pt-48 sm:pt-56 lg:pt-64 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter relative overflow-hidden">
      {/* Background Brand Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#E85D04]/10 rounded-full blur-[140px] pointer-events-none hidden dark:block" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E85D04]/10 rounded-full blur-[140px] pointer-events-none hidden dark:block" />

      {/* Main Glass Studio Card Outer Container */}
      <div className="rounded-3xl bg-[#FAF6F0] dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Ambient Glow Line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-80" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">

          {/* Left Side: Clean Craftsman Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group transform-gpu"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[360px] sm:h-[400px] w-full">
              <img
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=90&fm=webp"
                alt="Master Hardwood Flooring Installation Craftsman"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

              {/* Minimal Clean Quality Tag */}
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-[#E85D04]/50 text-xs font-bold text-white shadow-xl">
                <Award className="w-4 h-4 text-[#E85D04]" />
                <span>Certified Craftsmanship</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: High-Contrast Eye-Catching Features */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Top Badge & Header */}
            <div className="space-y-1.5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span>Trusted Pros</span>
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-playfair text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight"
              >
                Quality Flooring <span className="text-[#E85D04]">Installation</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium"
              >
                Expert Hardwood, LVP, Tile & Laminate Services.
              </motion.p>
            </div>

            {/* 3 Compact Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              {cardsData.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="group p-4 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200/90 dark:border-stone-800 hover:border-[#E85D04] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer relative overflow-hidden"
                  >
                    {/* Hover Top Accent Bar */}
                    <div className="w-full h-1 bg-[#E85D04] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Pop-Out Icon Box */}
                    <div className="w-10 h-10 rounded-xl bg-[#E85D04] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#E85D04]/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-jakarta font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-1"
            >
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/30 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}

