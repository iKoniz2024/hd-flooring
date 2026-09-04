'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12 overflow-hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-red-500 hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          Back to Blog Articles
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 text-xs text-red-500 font-manrope font-semibold">
            <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 font-bold">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-slate-500">• {post.publishDate}</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
            {post.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-inter"
        >
          <p className="font-semibold text-slate-900 dark:text-slate-100 text-base">
            {post.summary}
          </p>

          {post.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-1 text-center sm:text-left font-manrope">
            <h3 className="font-playfair text-2xl font-extrabold text-white">
              Need Expert Flooring Advice?
            </h3>
            <p className="text-xs font-medium text-slate-100">
              Talk to HD Flooring about your upcoming project in Canada.
            </p>
          </div>

          <button
            onClick={() => openBookModal()}
            className="px-6 py-3 rounded-full bg-slate-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-900 transition-colors shrink-0 shadow-lg shadow-black/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            Book Consultation
          </button>
        </motion.div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

