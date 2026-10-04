'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, ArrowRight, Tag, Calendar, User, Phone, CheckCircle2 } from 'lucide-react';
import { TiltCard } from '@/components/interactive/TiltCard';
import { blogPosts } from '@/data/blogs';
import { smoothScrollToTop } from '@/components/providers/ScrollToTop';
import { useModal } from '@/lib/context/ModalContext';

const categories = [
  'All Articles',
  'Flooring Tips',
  'Comparison',
  'Canadian Homes',
  'Installation Guide',
  'Maintenance',
];

export function BlogGridClient() {
  const router = useRouter();
  const { openBookModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  const filteredPosts = selectedCategory === 'All Articles'
    ? blogPosts
    : blogPosts.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase());

  const featuredPost = blogPosts[0];

  return (
    <>
      {/* Featured Article Banner Card */}
      {featuredPost && selectedCategory === 'All Articles' && (
        <motion.section
          initial={{ opacity: 0, y: 40, x: -30 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 140 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-manrope font-extrabold text-[#E85D04] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#E85D04] animate-pulse" />
            <span>Featured Master Guide</span>
          </div>

          <TiltCard className="w-full">
            <div
              onClick={() => {
                smoothScrollToTop(750);
                router.push(`/blog/${featuredPost.slug}`);
              }}
              className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-[#E85D04]/60 shadow-2xl shadow-slate-900/10 dark:shadow-[#E85D04]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90 rounded-t-3xl" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="lg:col-span-6 h-64 sm:h-80 lg:h-[340px] rounded-2xl overflow-hidden relative group/img"
              >
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#E85D04] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg">
                  {featuredPost.category}
                </span>
              </motion.div>

              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="flex items-center gap-4 text-xs font-manrope text-slate-500 dark:text-slate-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E85D04]" />
                    {featuredPost.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E85D04]" />
                    {featuredPost.publishDate}
                  </span>
                </div>

                <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                  {featuredPost.summary}
                </p>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#E85D04]/40"
                    />
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">{featuredPost.author.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <div className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#f06810] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all hover:scale-105 active:scale-95">
                    <span>Read Master Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.section>
      )}

      {/* Category Filter Pills Bar */}
      <motion.section
        initial={{ opacity: 0, y: 30, x: 30 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-playfair text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#E85D04]" />
            <span>Browse Articles by Topic</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
            Showing {filteredPosts.length} Guides
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-manrope font-extrabold tracking-tight transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#E85D04] to-[#f06810] text-white shadow-md shadow-[#E85D04]/30 scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 hover:border-[#E85D04]/60'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* 3-Column Rich Blog Cards Grid */}
      <section>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <TiltCard className="h-full">
                  <article
                    onClick={() => {
                      smoothScrollToTop(750);
                      router.push(`/blog/${post.slug}`);
                    }}
                    className="group relative rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-[#E85D04]/60 shadow-lg hover:shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 h-full cursor-pointer"
                  >
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                    <div className="h-52 w-full relative overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[#E85D04] text-[11px] font-extrabold uppercase tracking-wider">
                        {post.category}
                      </span>

                      <span className="absolute bottom-3 right-3 text-[11px] font-manrope font-bold text-slate-300 flex items-center gap-1 bg-slate-950/70 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                        <Clock className="w-3 h-3 text-[#E85D04]" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-2">
                        <h3 className="font-playfair text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-inter leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 mt-4">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#E85D04]" />
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {post.publishDate}
                          </span>
                        </div>

                        <div className="text-xs font-manrope font-extrabold text-[#E85D04] group-hover:text-[#d05203] flex items-center gap-1 group/link">
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E85D04] group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Free Measurement Banner */}
      <motion.section
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="w-full pt-8"
      >
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-[#E85D04]/30 shadow-2xl shadow-[#E85D04]/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-extrabold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Have Questions About Your Flooring Project?</span>
            </div>
            <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Book a Free On-Site Measurement & Quote
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-manrope font-medium">
              Our lead craftsman Habib brings physical plank samples directly to your door in Saskatchewan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 relative z-10 font-manrope shrink-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+13068808404"
              className="px-5 py-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +1 (306) 880-8404</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openBookModal()}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
              <span>Book Free Measure</span>
            </motion.button>
          </div>
        </div>
      </motion.section>
    </>
  );
}
