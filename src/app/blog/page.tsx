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

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Flooring Insights & Advice"
        title="Expert Flooring Guides & Tips"
        subtitle="Practical guides and professional advice to help Canadian homeowners and businesses make informed flooring choices."
        backgroundImage="/assets/images/laminate-flooring/laminate-flooring-01.jpg"
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
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-xl space-y-4 flex flex-col justify-between group transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-red-500 font-manrope">
                    <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 font-bold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-playfair text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-manrope font-bold text-red-500 hover:text-red-400 flex items-center gap-1.5 group/link"
                  >
                    Read Full Article
                    <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover/link:translate-x-1 transition-transform" />
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

