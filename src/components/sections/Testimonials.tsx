'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';

const reviews = [
  {
    name: 'Robert Henderson',
    location: 'Saskatoon, SK',
    rating: 5,
    text: 'HD Flooring replaced our old carpet with 7-inch wide engineered white oak. Their subfloor leveling was unbelievable — zero squeaks and flawless trim finishing.',
  },
  {
    name: 'Elena Rostova',
    location: 'Regina, SK',
    rating: 5,
    text: 'Installed 100% waterproof luxury vinyl in our basement and kitchen. Clean, polite, punctual team. We could not be happier with the quality!',
  },
  {
    name: 'Marcus Vance',
    location: 'Prince Albert, SK',
    rating: 5,
    text: 'Top notch commercial tile installation for our new corporate showroom. Precision laser layout and zero lippage on 24x48 porcelain tiles.',
  },
];

const getReviewVariant = (idx: number) => {
  switch (idx) {
    case 0:
      return { initial: { opacity: 0, x: -50, scale: 0.85 }, animate: { opacity: 1, x: 0, scale: 1 } };
    case 1:
      return { initial: { opacity: 0, y: 60, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 } };
    case 2:
    default:
      return { initial: { opacity: 0, x: 50, scale: 0.85 }, animate: { opacity: 1, x: 0, scale: 1 } };
  }
};

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth background gradient parallax translation
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section
      ref={containerRef}
      className="relative py-24 border-t border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950 text-slate-900 dark:text-white font-inter overflow-hidden transition-colors duration-300"
    >
      {/* 1. Dynamic Floating Parallax Color Gradient Orbs */}
      <motion.div
        style={{ y: yParallaxFast }}
        className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-red-500/25 via-red-400/15 to-transparent dark:from-red-600/30 dark:via-red-500/20 rounded-full blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        style={{ y: yParallaxSlow }}
        className="absolute -bottom-32 right-1/4 w-[550px] h-[550px] bg-gradient-to-bl from-sky-500/25 via-sky-400/15 to-transparent dark:from-sky-600/30 dark:via-sky-500/20 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-manrope font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>Customer Testimonials</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            What Our Customers Say
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-inter leading-relaxed">
            Read verified reviews from homeowners, property managers, and commercial clients across Saskatchewan.
          </p>
        </motion.div>

        {/* Testimonials Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => {
            const v = getReviewVariant(idx);
            return (
              <motion.div
                key={idx}
                initial={v.initial}
                whileInView={v.animate}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/40 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all duration-300 space-y-6 relative flex flex-col justify-between group"
              >
                <Quote className="w-10 h-10 text-red-500/15 dark:text-red-500/25 absolute top-6 right-6 group-hover:text-red-500/35 transition-colors" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed font-inter">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 font-manrope flex items-center justify-between relative z-10">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {review.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {review.location}
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    Verified Client
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
