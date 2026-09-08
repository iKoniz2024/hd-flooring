'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { blogPosts } from '@/data/blogs';
import { smoothScrollToTop } from '@/components/providers/ScrollToTop';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Flooring Articles & Guides"
        title="Flooring Guides & Tips"
        backgroundImage="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12 overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                whileHover={{ y: -5 }}
                className="relative p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-[#E85D04]/80 shadow-xl hover:shadow-2xl space-y-4 flex flex-col justify-between group transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer overflow-hidden transform-gpu"
              >
                {/* Hover Background Photo Reveal Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none z-0">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-stone-950/40" />
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-3 text-xs text-[#E85D04] font-manrope">
                    <span className="px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 font-bold backdrop-blur-md">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-jakarta text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#E85D04] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => {
                      smoothScrollToTop(750);
                    }}
                    className="text-xs font-manrope font-bold text-[#E85D04] hover:text-[#d05203] flex items-center gap-1.5 group/link"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E85D04] group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

