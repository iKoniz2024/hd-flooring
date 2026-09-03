'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { blogPosts } from '@/data/blogs';
import { useModal } from '@/lib/context/ModalContext';

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openBookModal } = useModal();

  const post = blogPosts.find((b) => b.slug === slug) || blogPosts[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-manrope font-semibold text-amber-500 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog Articles
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-amber-500 font-manrope">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-semibold">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-stone-500">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-stone-500">• {post.publishDate}</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
            {post.title}
          </h1>
        </div>

        {/* Article Content */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-6 text-sm leading-relaxed text-stone-700 dark:text-stone-300 font-inter">
          <p className="font-semibold text-stone-900 dark:text-stone-100 text-base">
            {post.summary}
          </p>

          {post.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Article CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left font-manrope">
            <h3 className="font-playfair text-2xl font-extrabold">
              Need Expert Flooring Advice?
            </h3>
            <p className="text-xs font-medium text-stone-900">
              Talk to HD Flooring about your upcoming project in Canada.
            </p>
          </div>

          <button
            onClick={() => openBookModal()}
            className="px-6 py-3 rounded-full bg-stone-950 text-stone-100 font-bold text-xs uppercase tracking-wider hover:bg-stone-900 transition-colors shrink-0 shadow-lg shadow-black/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Book Consultation
          </button>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
