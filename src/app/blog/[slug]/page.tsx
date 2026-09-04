'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
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

      {/* Parallax Hero Section */}
      <PageHero
        badge={`${post.category} • ${post.readTime}`}
        title={post.title}
        subtitle={post.summary}
        backgroundImage="/assets/images/hardwood-flooring/hardwood-flooring-02.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12 overflow-hidden">

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

