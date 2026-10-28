'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Review {
  name: string;
  location: string;
  rating: number;
  image: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: 'Robert Henderson',
    location: 'Saskatoon, SK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    text: 'HD Flooring replaced our old carpet with 7-inch wide engineered white oak. Their subfloor leveling was unbelievable — zero squeaks and flawless trim finishing.',
  },
  {
    name: 'Elena Rostova',
    location: 'Regina, SK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    text: 'Installed 100% waterproof luxury vinyl in our basement and kitchen. Clean, polite, punctual team. We could not be happier with the quality!',
  },
  {
    name: 'Marcus Vance',
    location: 'Prince Albert, SK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    text: 'Top notch commercial tile installation for our new corporate showroom. Precision laser layout and zero lippage on 24x48 porcelain tiles.',
  },
  {
    name: 'Sarah Jenkins',
    location: 'Calgary, AB',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    text: 'The craftsmanship on our herringbone hardwood installation is pure art. Visitors constantly ask who did our floors. Highly recommended!',
  },
  {
    name: 'David Miller',
    location: 'Edmonton, AB',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    text: 'From estimate to final cleanup, everything was done with supreme professionalism. Their acoustic underlayment made our condo dead quiet.',
  },
  {
    name: 'Chloe Dubois',
    location: 'Moose Jaw, SK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    text: 'Our heated bathroom tile floors turned out spectacular! The transitions to our bedroom hardwood are completely seamless and flush.',
  },
  {
    name: 'Lucas Van Der Berg',
    location: 'North Battleford, SK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    text: 'Heavy-duty commercial epoxy flooring installed in our auto garage. Incredible durability against hot tires and oil spills. Stellar job!',
  },
  {
    name: 'Jessica Morgan',
    location: 'Swift Current, SK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    text: 'Replaced worn laminate with rigid core vinyl planks throughout our whole main floor. The crew was fast, respectful, and left the house spotless.',
  },
  {
    name: 'Alexander Wright',
    location: 'Yorkton, SK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    text: 'Remarkable attention to detail on baseboards and stair nosing. HD Flooring provided honest advice and transparent pricing without surprises.',
  },
  {
    name: 'Sophia Martinez',
    location: 'Weyburn, SK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    text: 'Gorgeous plush carpet for our second floor bedrooms. Soft underfoot, perfectly stretched, and completely transformed the warmth of our home.',
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-inter overflow-hidden transition-colors duration-300">
      {/* 1. Bright High-Contrast True Fixed Parallax Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed opacity-90 dark:opacity-40"
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
      </div>

      {/* Full-Width Marquee Container */}
      <div className="relative z-10 mt-10 overflow-hidden w-full py-4">
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white/90 dark:from-slate-950/90 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white/90 dark:from-slate-950/90 to-transparent z-20" />

        {/* Marquee Track: Contains 2 identical sets of 10 reviews for seamless infinite looping */}
        <div className="flex gap-6 animate-marquee py-2 px-4">
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={`${review.name}-${idx}`}
              className="w-[340px] sm:w-[380px] shrink-0 p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-[#E85D04]/50 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              {/* Upper Section: Stars & Quote */}
              <div className="space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E85D04]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#E85D04]/15 group-hover:text-[#E85D04]/30 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed font-inter line-clamp-4">
                  "{review.text}"
                </p>
              </div>

              {/* Lower Section: User Profile & Verified Client Badge */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#E85D04]/30 shadow-sm group-hover:border-[#E85D04] transition-colors"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {review.location}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Verified Client
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
