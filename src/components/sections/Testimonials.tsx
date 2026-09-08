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
  const { scrollYProgress } = useScroll();

  // Parallax translation for background image
  const yParallaxImage = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section
      className="relative py-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-inter overflow-hidden transition-colors duration-300"
    >
      {/* 1. Bright High-Contrast True Fixed Parallax Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full bg-fixed bg-cover bg-center bg-no-repeat opacity-90 dark:opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80&fm=webp')`,
          }}
        />
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/60" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header with Crisp White Backdrop for High Contrast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-stone-200/90 dark:border-stone-800 shadow-2xl backdrop-blur-md space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#E85D04] text-[#E85D04]" />
            <span>Verified Client Reviews</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            What Our <span className="text-[#E85D04]">Customers Say</span>
          </h2>
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
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E85D04]/40 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all duration-300 space-y-6 relative flex flex-col justify-between group"
              >
                <Quote className="w-10 h-10 text-[#E85D04]/15 absolute top-6 right-6 group-hover:text-[#E85D04]/35 transition-colors" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-1.5 text-[#E85D04]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed font-inter">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 font-manrope flex items-center justify-between relative z-10">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors">
                      {review.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {review.location}
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-[10px] font-bold uppercase tracking-wider">
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
