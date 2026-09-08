'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Award, ShieldCheck, ThumbsUp, Calendar, CheckCircle, Sparkles } from 'lucide-react';

const qualityProgress = [
  { name: 'Subfloor Leveling Precision', value: 99.8 },
  { name: 'Dust-Free Cleanup Rate', value: 99.2 },
  { name: 'On-Time Delivery Rate', value: 100 },
  { name: 'Customer Satisfaction Rate', value: 99.6 },
];

export function StatsBanner() {
  return (
    <section className="py-20 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border-y border-stone-200 dark:border-stone-800 font-inter relative overflow-hidden">
      {/* Brand Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#E85D04]/10 blur-[150px] pointer-events-none hidden dark:block" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#E85D04]/10 blur-[150px] pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Animated Counter Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 shadow-md dark:shadow-none space-y-3 transform-gpu"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04]">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
              <AnimatedCounter to={500} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-semibold">
              Flooring Projects Installed
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 shadow-md dark:shadow-none space-y-3"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
              <AnimatedCounter to={100} suffix="%" />
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-semibold">
              Workmanship Guarantee
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 shadow-md dark:shadow-none space-y-3"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04]">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
              <AnimatedCounter to={15} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-semibold">
              Years Experience
            </p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 shadow-md dark:shadow-none space-y-3"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04]">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
              <AnimatedCounter to={99} suffix="%" />
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-semibold">
              Customer Rating
            </p>
          </motion.div>
        </div>

        {/* Progress Bars Section - Luxury Studio Card Container */}
        <div className="rounded-3xl bg-[#FAF6F0] dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Brand Glow Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] font-extrabold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
                <span>Quality Benchmarks</span>
              </span>
              
              <h3 className="font-playfair text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Why Choose <span className="text-[#E85D04]">HD Flooring</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                Precision subfloor leveling & master installation standards across every project.
              </p>

              {/* Sleek Trust Chips */}
              <div className="flex items-center gap-2.5 pt-1 flex-wrap text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 shadow-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />
                  100% Level Subfloors
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 shadow-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E85D04]" />
                  Dust-Free Site
                </span>
              </div>
            </div>

            {/* Right Column: Sleek Card Progress Bars */}
            <div className="lg:col-span-7 space-y-3">
              {qualityProgress.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-stone-950 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 space-y-2"
                  >
                    <div className="flex justify-between items-center text-xs font-extrabold text-stone-900 dark:text-stone-100">
                      <span className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <span>{item.name}</span>
                      </span>
                      <span className="text-[#E85D04] font-mono text-xs font-black bg-[#E85D04]/10 px-2.5 py-0.5 rounded-md">
                        {item.value}%
                      </span>
                    </div>

                    <div className="h-2 w-full bg-stone-100 dark:bg-stone-900 rounded-full overflow-hidden p-0.5 border border-stone-200/60 dark:border-stone-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#E85D04] to-[#f37324] rounded-full shadow-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


