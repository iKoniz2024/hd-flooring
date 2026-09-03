'use client';

import Link from 'next/link';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { blogPosts } from '@/data/blogs';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-manrope font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Flooring Tips & Insights
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-stone-100">
            Expert Flooring Advice
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base font-inter max-w-2xl mx-auto">
            Practical guides and expert advice to help Canadian homeowners and businesses make better flooring decisions.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-xl space-y-4 flex flex-col justify-between group transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-amber-500 font-manrope">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-semibold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-stone-500">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-inter">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-manrope font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 group/link"
                >
                  Read Full Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
