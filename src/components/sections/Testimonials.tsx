'use client';

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

export function Testimonials() {
  return (
    <section className="py-20 bg-stone-900/40 dark:bg-stone-950/80 border-t border-amber-500/20 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-manrope font-semibold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Customer Testimonials
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-4 relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-amber-500/30 absolute top-6 right-6" />

              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed font-inter">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 font-manrope">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {review.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
