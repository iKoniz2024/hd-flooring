'use client';

import { useState, useEffect } from 'react';
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
  MessageSquare,
  ShieldCheck,
  Quote,
  Check,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { blogPosts } from '@/data/blogs';
import { useModal } from '@/lib/context/ModalContext';
import { smoothScrollToTop } from '@/components/providers/ScrollToTop';
import { Accordion } from '@/components/ui/Accordion';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openBookModal } = useModal();

  const post = blogPosts.find((b) => b.slug === slug) || blogPosts[0];
  const relatedPosts = blogPosts.filter((b) => b.slug !== post.slug).slice(0, 3);

  useEffect(() => {
    smoothScrollToTop(750);
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-x-clip">
      {/* Mouse & Ambient Spotlight */}
      <MouseSpotlight />

      {/* Ambient background light blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      {/* Parallax Hero Header */}
      <PageHero
        badge={`${post.category} • ${post.readTime}`}
        badgeIcon={BookOpen}
        title={post.title}
        subtitle={post.summary}
        backgroundImage={post.coverImage || '/assets/images/hardwood-flooring/hardwood-flooring-03.jpg'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Clean Spacious Article & Sidebar Container */}
      <main className="flex-1 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12 relative z-10">
        
        {/* Navigation & Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80 text-xs">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-manrope font-extrabold text-[#E85D04] hover:text-[#d05203] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-manrope font-semibold">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#E85D04]" />
              Published {post.publishDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E85D04]" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* 2-COLUMN LAYOUT: 8 COLS ARTICLE + 4 COLS SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT 8 COLUMNS: OPEN & SPACIOUS ARTICLE BODY */}
          <div className="lg:col-span-8 space-y-14">

            {/* Key Takeaways Highlight Box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/90 dark:bg-slate-900/80 border-l-4 border-[#E85D04] border-t border-r border-b border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-[#E85D04] font-manrope font-extrabold text-xs uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-[#E85D04]" />
                  <span>Key Article Takeaways</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {post.keyTakeaways.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter leading-relaxed"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#E85D04]/15 text-[#E85D04] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Article Text Body - Clean Open Reading Layout */}
            <article className="space-y-14 text-left">
              {post.sections && post.sections.length > 0 ? (
                post.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 first:border-0 first:pt-0"
                  >
                    {/* Section Heading */}
                    <div className="flex items-center gap-3.5 pt-2">
                      <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#f06810] text-white font-manrope font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md shadow-[#E85D04]/25">
                        0{idx + 1}
                      </span>
                      <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                        {section.heading.replace(/^\d+\.\s*/, '')}
                      </h2>
                    </div>

                    {/* Paragraph Body with Spacious Line Height */}
                    <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed sm:leading-8 font-inter">
                      {section.body}
                    </p>

                    {/* Styled Quote Highlight */}
                    {section.quote && (
                      <div className="my-8 p-6 sm:p-8 rounded-2xl bg-amber-500/5 dark:bg-slate-900/90 border-l-4 border-[#E85D04] space-y-2 shadow-sm">
                        <Quote className="w-6 h-6 text-[#E85D04] opacity-80" />
                        <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base font-semibold italic leading-relaxed font-playfair">
                          "{section.quote}"
                        </p>
                      </div>
                    )}

                    {/* Inline Section Photo */}
                    {section.image && (
                      <div className="my-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/80 max-h-[460px] relative group">
                        <img
                          src={section.image}
                          alt={section.heading}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          <span className="text-xs text-white font-manrope font-semibold">
                            HD Flooring On-Site Craftsmanship
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="space-y-6 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                  {post.content?.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              )}
            </article>

            {/* FAQ Accordion Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800/80 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-extrabold uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-[#E85D04]" />
                    <span>Got Questions?</span>
                  </div>
                  <h3 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                    Frequently Asked Questions
                  </h3>
                </div>

                <Accordion items={post.faqs} />
              </div>
            )}

            {/* Free Measure CTA Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-[#E85D04]/30 shadow-2xl shadow-[#E85D04]/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-1.5 text-center md:text-left relative z-10">
                <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Planning a Flooring Project?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-manrope font-medium">
                  Book a 100% free in-home measurement & written quote in Saskatchewan.
                </p>
              </div>

              <button
                onClick={() => openBookModal(post.title)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#f06810] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all cursor-pointer shrink-0 relative z-10"
              >
                <span>Book Free Measure</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: CLEAN STICKY SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            
            {/* Author Profile Card */}
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-80" />

              <div className="flex items-center gap-4">
                <img
                  src={post.author?.avatar || '/assets/images/personal-photos/habib-photo.jpg'}
                  alt={post.author?.name || 'Habibur Rahman (Habib)'}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E85D04] shadow-md shrink-0"
                />
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#E85D04] uppercase tracking-wider">
                    <UserCheck className="w-3.5 h-3.5" />
                    Verified Author
                  </div>
                  <h4 className="font-playfair text-lg font-bold text-slate-900 dark:text-white">
                    {post.author?.name || 'Habibur Rahman (Habib)'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {post.author?.role || 'Lead Installation Specialist & Founder'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter pt-2 border-t border-slate-100 dark:border-slate-800/80">
                Over 20+ years of hands-on installation expertise across Saskatchewan specializing in Hardwood, LVP, Sheet Vinyl coving, Tile, and Subfloor Prep.
              </p>

              <button
                onClick={() => openBookModal()}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#E85D04] hover:text-white text-slate-800 dark:text-slate-200 font-manrope font-extrabold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E85D04]" />
                <span>Ask Habib A Question</span>
              </button>
            </div>

            {/* Quick Estimate Callout Widget */}
            <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800/80 shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E85D04]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 relative z-10">
                <span className="px-3 py-1 rounded-full bg-[#E85D04]/15 text-[#E85D04] text-[10px] font-extrabold uppercase tracking-wider border border-[#E85D04]/30">
                  Instant Service
                </span>
                <h4 className="font-playfair text-xl font-extrabold text-white">
                  Get Free On-Site Quote
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-inter">
                  Fast, accurate pricing with zero hidden fees. We measure your space and bring sample planks directly to your door.
                </p>
              </div>

              <button
                onClick={() => openBookModal(post.title)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#f06810] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#E85D04]/30 cursor-pointer relative z-10"
              >
                Schedule Free Estimate
              </button>

              <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-400 relative z-10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E85D04]" />
                <span>Zero Obligation • 100% Free Consultation</span>
              </div>
            </div>

            {/* Related Articles Widget */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-4">
                <h4 className="font-playfair text-lg font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800/80">
                  Related Articles
                </h4>

                <div className="space-y-3">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      onClick={() => smoothScrollToTop(750)}
                      className="group block space-y-1.5 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <span className="text-[10px] font-extrabold text-[#E85D04] uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <h5 className="font-playfair text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors leading-snug">
                        {rel.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 font-inter">
                        {rel.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>

      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
