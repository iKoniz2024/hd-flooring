'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, ArrowRight, BookOpen, Tag, Calendar, User, Phone, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
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

export default function BlogPage() {
  const { openBookModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  const filteredPosts = selectedCategory === 'All Articles'
    ? blogPosts
    : blogPosts.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase());

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-x-clip">
      {/* Mouse & Ambient Spotlight */}
      <MouseSpotlight />

      {/* Ambient background light blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Flooring Articles & Expert Guides"
        badgeIcon={BookOpen}
        title="Flooring Insights & Expert Advice"
        subtitle="Professional advice, material comparison guides, installation timelines, and care maintenance tips for Canadian homes."
        backgroundImage="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1600&q=80&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      />

      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-14 relative z-10">

        {/* Featured Article Banner Card (Top Highlight) */}
        {featuredPost && selectedCategory === 'All Articles' && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-manrope font-extrabold text-[#E85D04] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#E85D04]" />
              <span>Featured Master Guide</span>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/10 dark:shadow-[#E85D04]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group">
              {/* Top glowing orange line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90 rounded-t-3xl" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Cover Image */}
              <div className="lg:col-span-6 h-64 sm:h-80 lg:h-[340px] rounded-2xl overflow-hidden relative group/img">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#E85D04] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg">
                  {featuredPost.category}
                </span>
              </div>

              {/* Text Info */}
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

                {/* Author Info & CTA */}
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

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    onClick={() => smoothScrollToTop(750)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#f06810] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all"
                  >
                    <span>Read Master Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Filter Pills Bar */}
        <section className="space-y-6">
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
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-manrope font-extrabold tracking-tight transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#E85D04] to-[#f06810] text-white shadow-md shadow-[#E85D04]/30 scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 hover:border-[#E85D04]/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3-Column Rich Blog Cards Grid */}
        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-[#E85D04]/60 shadow-lg hover:shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300"
                >
                  {/* Top glowing orange line on hover */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  {/* Card Header Cover Image */}
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

                  {/* Card Content Body */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      <h3 className="font-playfair text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-inter leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    {/* Author & Read Link */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#E85D04]" />
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {post.publishDate}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        onClick={() => smoothScrollToTop(750)}
                        className="text-xs font-manrope font-extrabold text-[#E85D04] hover:text-[#d05203] flex items-center gap-1 group/link"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#E85D04] group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Free Measurement Banner (CTA Matching Founder Card) */}
        <section className="w-full pt-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-[#E85D04]/30 shadow-2xl shadow-[#E85D04]/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            {/* Top Glowing Orange Accent Line */}
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
              <a
                href="tel:+13068808404"
                className="px-5 py-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +1 (306) 880-8404</span>
              </a>

              <button
                onClick={() => openBookModal()}
                className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
                <span>Book Free Measure</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
