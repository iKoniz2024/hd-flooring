'use client';

import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Award, ShieldCheck, ThumbsUp, Calendar } from 'lucide-react';

export function StatsBanner() {
  return (
    <section className="py-12 bg-stone-900/90 dark:bg-stone-900/95 border-y border-amber-500/20 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Stat 1 */}
          <div className="space-y-2 p-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold">
              <AnimatedCounter to={500} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-stone-400 font-manrope font-medium">
              Projects Completed
            </p>
          </div>

          {/* Stat 2 */}
          <div className="space-y-2 p-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold">
              <AnimatedCounter to={100} suffix="%" />
            </div>
            <p className="text-xs sm:text-sm text-stone-400 font-manrope font-medium">
              Workmanship Guarantee
            </p>
          </div>

          {/* Stat 3 */}
          <div className="space-y-2 p-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold">
              <AnimatedCounter to={15} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-stone-400 font-manrope font-medium">
              Years Experience
            </p>
          </div>

          {/* Stat 4 */}
          <div className="space-y-2 p-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold">
              <AnimatedCounter to={99} suffix="%" />
            </div>
            <p className="text-xs sm:text-sm text-stone-400 font-manrope font-medium">
              Customer Satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
