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
        badge="Flooring Articles"
        title="Flooring Guides & Tips"
        subtitle="Read our simple guides and tips on choosing, installing, and caring for your floors."
        backgroundImage="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1920&q=95&fm=webp"
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
                className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-red-500/60 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="relative w-full h-52 overflow-hidden bg-slate-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-manrope font-extrabold text-[11px] uppercase tracking-wider shadow-lg backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-manrope">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.publishDate}</span>
                    </div>

                    <h3 className="font-jakarta text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => {
                        smoothScrollToTop(750);
                      }}
                      className="text-xs font-manrope font-bold text-red-600 dark:text-red-400 hover:text-red-700 flex items-center justify-between group/link"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 text-red-500 group-hover/link:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
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

