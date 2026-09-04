'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Robert Henderson',
    location: 'Toronto, ON',
    rating: 5,
    text: 'HD Flooring replaced our old carpet with 7-inch wide engineered white oak. Their subfloor leveling was unbelievable — zero squeaks and flawless trim finishing.',
  },
  {
    name: 'Elena Rostova',
    location: 'Mississauga, ON',
    rating: 5,
    text: 'Installed 100% waterproof luxury vinyl in our basement and kitchen. Clean, polite, punctual team. We could not be happier with the quality!',
  },
  {
    name: 'Marcus Vance',
    location: 'Oakville, ON',
    rating: 5,
    text: 'Top notch commercial tile installation for our new corporate showroom. Precision laser layout and zero lippage on 24x48 porcelain tiles.',
  },
];

const getReviewVariant = (idx: number) => {
  switch (idx) {
    case 0:
      return { initial: { opacity: 0, x: -50, scale: 0.85 }, animate: { opacity: 1, x: 0, scale: 1 } }; // Left + Zoom
    case 1:
      return { initial: { opacity: 0, y: 60, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 } }; // Up + Zoom
    case 2:
    default:
      return { initial: { opacity: 0, x: 50, scale: 0.85 }, animate: { opacity: 1, x: 0, scale: 1 } }; // Right + Zoom
  }
};

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-100/80 dark:bg-slate-950/80 border-t border-slate-200 dark:border-red-500/20 font-inter overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-manrope font-bold uppercase tracking-wider text-center max-w-full">
            Customer Testimonials
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
            What Our Customers Say
          </h2>
        </motion.div>

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
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 relative flex flex-col justify-between"
              >
                <Quote className="w-8 h-8 text-red-500/20 absolute top-6 right-6" />

                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-red-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-red-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed font-inter">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 font-manrope">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {review.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {review.location}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


