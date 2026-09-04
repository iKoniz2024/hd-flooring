'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Award, ShieldCheck, ThumbsUp, Calendar } from 'lucide-react';

export function StatsBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="py-12 bg-slate-900/90 dark:bg-slate-900/95 border-y border-red-500/20 font-inter"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {/* Stat 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="space-y-2 p-4"
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-3">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold">
              <AnimatedCounter to={500} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-manrope font-medium">
              Projects Completed
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="space-y-2 p-4"
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold">
              <AnimatedCounter to={100} suffix="%" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-manrope font-medium">
              Workmanship Guarantee
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="space-y-2 p-4"
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold">
              <AnimatedCounter to={15} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-manrope font-medium">
              Years Experience
            </p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="space-y-2 p-4"
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold">
              <AnimatedCounter to={99} suffix="%" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-manrope font-medium">
              Customer Satisfaction
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

