'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Clock,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowRight,
  UserCheck,
  Calendar,
  Share2,
  Tag,
} from 'lucide-react';
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
  const relatedPosts = blogPosts.filter((b) => b.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge={`${post.category} • ${post.readTime}`}
        title={post.title}
        subtitle={post.summary}
        backgroundImage={post.coverImage || '/assets/images/hardwood-flooring/hardwood-flooring-03.jpg'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-14 overflow-hidden">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-red-600 dark:text-red-400 hover:text-red-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Articles
        </Link>

        {/* 1. AUTHOR & METADATA BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src={post.author?.avatar || '/assets/images/team-company/team-company-07.jpg'}
              alt={post.author?.name || 'HD Flooring Expert'}
              className="w-12 h-12 rounded-full object-cover border-2 border-red-500/40 shadow-md"
            />
            <div>
              <h4 className="font-playfair text-base font-bold text-slate-900 dark:text-slate-100">
                {post.author?.name || 'Hardeep Dhami'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {post.author?.role || 'Master Flooring Specialist'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-manrope">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-red-500" />
              {post.publishDate}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* 2. KEY TAKEAWAYS HIGHLIGHT BOX */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/20 via-white dark:via-slate-900 to-slate-100 dark:to-slate-900 border border-red-500/30 shadow-xl space-y-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-manrope font-bold text-xs uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              Key Article Takeaways
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {post.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* 3. RICH ARTICLE SECTIONS */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-2xl space-y-10"
        >
          {post.sections && post.sections.length > 0 ? (
            post.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-playfair text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                  {section.heading}
                </h2>

                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-inter">
                  {section.body}
                </p>

                {section.quote && (
                  <blockquote className="border-l-4 border-red-500 bg-red-500/10 dark:bg-red-500/5 p-4 sm:p-5 rounded-r-2xl text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium italic my-4 shadow-sm">
                    "{section.quote}"
                  </blockquote>
                )}

                {section.image && (
                  <div className="my-6 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 max-h-[380px] group">
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            // Fallback for legacy paragraphs
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {post.content?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )}
        </motion.article>

        {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
        {post.faqs && post.faqs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-playfair text-2xl font-bold text-slate-900 dark:text-slate-100">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-2"
                >
                  <h4 className="font-playfair text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-red-500 font-extrabold">Q:</span>
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed pl-5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 5. RELATED ARTICLES GRID */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="space-y-6 pt-4">
            <h3 className="font-playfair text-2xl font-bold text-slate-900 dark:text-slate-100">
              Related Flooring Articles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-lg space-y-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="font-playfair text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 group-hover:gap-2 transition-all">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 6. CALL TO ACTION BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-amber-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-red-600/20 relative overflow-hidden"
        >
          <div className="space-y-1 text-center sm:text-left font-manrope z-10">
            <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white">
              Planning a Flooring Upgrade?
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-100 max-w-md">
              Book a free in-home estimate or phone consultation with HD Flooring today.
            </p>
          </div>

          <button
            onClick={() => openBookModal(post.title)}
            className="px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shrink-0 shadow-2xl shadow-black/40 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
            Book Free Estimate
          </button>
        </motion.div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
