'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Award, ShieldCheck, ThumbsUp, Calendar, CheckCircle } from 'lucide-react';

const qualityProgress = [
  { name: 'Laser Precision Installation & Leveling', value: 99.8 },
  { name: 'Dustless Tear-Out & Cleanup Standard', value: 99.2 },
  { name: 'On-Time Project Schedule Delivery', value: 100 },
  { name: 'Canadian Workmanship & Warranty Satisfaction', value: 99.6 },
];

export function StatsBanner() {
  return (
    <section className="py-20 bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border-y border-stone-200 dark:border-stone-800 font-inter relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Animated Counter Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 shadow-md dark:shadow-none space-y-3"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
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
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
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
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
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
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
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

        {/* ipropertybd Style Progress Bars Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="space-y-4">
            <span className="text-amber-600 dark:text-amber-500 font-bold text-xs uppercase tracking-wider">
              Quality Benchmarks
            </span>
            <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              Why Canadian Property Owners Choose HD Flooring
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              We hold ourselves to rigorous installation metrics across hardwood, vinyl plank, laminate, and tile projects. Every subfloor is laser leveled before material placement.
            </p>
          </div>

          <div className="space-y-5">
            {qualityProgress.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                    {item.name}
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono">{item.value}%</span>
                </div>
                <div className="h-2.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


