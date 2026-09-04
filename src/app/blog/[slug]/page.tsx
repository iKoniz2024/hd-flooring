'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  Quote,
  Eye,
  Award,
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
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const post = blogPosts.find((b) => b.slug === slug) || blogPosts[0];
  const relatedPosts = blogPosts.filter((b) => b.slug !== post.slug).slice(0, 3);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

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

      {/* WIDE EXPANSIVE 2-COLUMN CONTAINER WITH RICH ANIMATIONS */}
      <main className="flex-1 py-8 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8 sm:space-y-12 overflow-hidden">
        {/* Top Navigation & Share Bar */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 text-xs"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-red-600 dark:text-red-400 hover:text-red-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-manrope">
            <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-slate-200/60 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 font-semibold shadow-sm">
              <Calendar className="w-3 h-3 text-red-500 shrink-0" />
              Published {post.publishDate}
            </span>
            <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-slate-200/60 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 font-semibold shadow-sm">
              <Clock className="w-3 h-3 text-amber-500 shrink-0" />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* MAIN 2-COLUMN GRID (8 COLS ARTICLE + 4 COLS STICKY SIDEBAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
          {/* LEFT 8 COLUMNS: MAIN ARTICLE CONTENT */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10 w-full overflow-hidden">
            {/* 1. KEY TAKEAWAYS HIGHLIGHT BANNER */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 180 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/20 via-white dark:via-slate-900 to-slate-100 dark:to-slate-900 border border-red-500/40 shadow-2xl space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-manrope font-extrabold text-xs uppercase tracking-widest">
                  <BookOpen className="w-4 h-4 text-red-500 animate-pulse" />
                  Key Article Takeaways
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {post.keyTakeaways.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-inter leading-snug p-2 rounded-xl hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 2. ARTICLE SECTIONS CONTAINER WITH STAGGERED MOTION */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-2xl space-y-12"
            >
              {post.sections && post.sections.length > 0 ? (
                post.sections.map((section, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className="space-y-5 border-b border-slate-100 dark:border-slate-800/60 pb-10 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-amber-600 text-white font-manrope font-extrabold text-xs flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30">
                        0{idx + 1}
                      </span>
                      <h2 className="font-playfair text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                        {section.heading.replace(/^\d+\.\s*/, '')}
                      </h2>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-inter">
                      {section.body}
                    </p>

                    {/* Styled Quote Box */}
                    {section.quote && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative p-6 rounded-2xl bg-gradient-to-r from-red-600/15 via-slate-100 dark:via-slate-800/80 to-transparent border-l-4 border-red-500 space-y-2 shadow-md my-6"
                      >
                        <Quote className="w-6 h-6 text-red-500 opacity-70" />
                        <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium italic leading-relaxed">
                          "{section.quote}"
                        </p>
                      </motion.div>
                    )}

                    {/* Inline Image Card with Zoom Animation */}
                    {section.image && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="my-6 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[440px] group relative"
                      >
                        <img
                          src={section.image}
                          alt={section.heading}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          <span className="text-xs text-white font-manrope font-semibold drop-shadow-md">
                            HD Flooring Craftsmanship Installation
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {post.content?.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              )}
            </motion.article>

            {/* 3. FREQUENTLY ASKED QUESTIONS ACCORDION */}
            {post.faqs && post.faqs.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <HelpCircle className="w-5 h-5 text-red-500 animate-pulse" />
                  <h3 className="font-playfair text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-3">
                  {post.faqs.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950/60 transition-all shadow-sm hover:shadow-md"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 font-playfair font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-red-500 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-red-500 font-extrabold">Q:</span>
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-red-500' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {/* 4. MAIN CTA BANNER WITH HOVER GLOW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-amber-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-red-600/30 relative overflow-hidden"
            >
              <div className="space-y-1.5 text-center sm:text-left font-manrope z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  Professional Installation
                </span>
                <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white">
                  Planning a Flooring Project?
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-100 max-w-md">
                  Book a free in-home estimate or phone consultation with HD Flooring today.
                </p>
              </div>

              <button
                onClick={() => openBookModal(post.title)}
                className="px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shrink-0 shadow-2xl shadow-black/40 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all z-10"
              >
                Book Free Estimate
                <ArrowRight className="w-4 h-4 text-red-400" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT 4 COLUMNS: STICKY ANIMATED SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-28 w-full max-w-full overflow-hidden"
          >
            {/* AUTHOR CARD */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={post.author?.avatar || '/assets/images/personal-photos/personal-photo-01.jpg'}
                  alt={post.author?.name || 'Habibur Rahman (Habib)'}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500/50 shadow-md shrink-0"
                />
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 uppercase tracking-wider">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Verified Author
                  </div>
                  <h4 className="font-playfair text-lg font-bold text-slate-900 dark:text-slate-100">
                    {post.author?.name || 'Habibur Rahman (Habib)'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {post.author?.role || 'Lead Installation Specialist & Founder'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-inter border-t border-slate-100 dark:border-slate-800/80 pt-3">
                Over 20+ years of hands-on installation expertise across Saskatoon & Saskatchewan specializing in Hardwood, LVP, Sheet Vinyl coving, Tile, and Subfloor Prep.
              </p>

              <button
                onClick={() => openBookModal()}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-red-500" />
                Ask Habib A Question
              </button>
            </motion.div>

            {/* QUICK ESTIMATE CALLOUT WIDGET */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-red-500/40 shadow-2xl space-y-4 relative overflow-hidden"
            >
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider border border-red-500/30">
                  Instant Service
                </span>
                <h4 className="font-playfair text-xl font-bold text-white">
                  Get Free On-Site Quote
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fast, accurate pricing with zero hidden fees. We measure your space and bring sample planks directly to your door.
                </p>
              </div>

              <button
                onClick={() => openBookModal(post.title)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider hover:from-red-500 hover:to-amber-500 transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-95"
              >
                Schedule Free Estimate
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Obligation • 100% Free Consultation</span>
              </div>
            </motion.div>

            {/* RELATED ARTICLES SIDEBAR WIDGET WITH HOVER ANIMATIONS */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <h4 className="font-playfair text-lg font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
                  Related Articles
                </h4>

                <div className="space-y-4">
                  {relatedPosts.map((rel) => (
                    <motion.div
                      key={rel.id}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="group block space-y-1.5 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                          {rel.category}
                        </span>
                        <h5 className="font-playfair text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors leading-snug">
                          {rel.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                          {rel.summary}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
