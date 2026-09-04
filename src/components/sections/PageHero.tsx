'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: React.ElementType;
  backgroundImage: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryCta?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  heightClass?: string;
}

export function PageHero({
  title,
  subtitle,
  badge = 'HD Flooring',
  badgeIcon: BadgeIcon = Sparkles,
  backgroundImage,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  heightClass = 'min-h-[55vh] sm:min-h-[60vh] lg:min-h-[65vh]',
}: PageHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { openBookModal } = useModal();

  // Framer Motion Parallax logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax Y offset for background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${heightClass} flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950 text-white`}
    >
      {/* 1. PARALLAX BACKGROUND IMAGE LAYER - BRIGHT & CRISP */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none z-0"
        style={{ y: backgroundY }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105 brightness-[1.08] contrast-[1.05] saturate-[1.05]"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />
      </motion.div>

      {/* 2. ULTRA-CLEAR MINIMAL OVERLAY GRADIENT */}
      {/* Light top shade for navbar contrast, clear center so floor images pop, soft bottom fade into page */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-slate-950/85 pointer-events-none z-1" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/10 to-slate-950/50 pointer-events-none z-1" />

      {/* 3. HERO CONTENT WRAPPER WITH TEXT SHADOWS & GLASSMORPHISM */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-5xl mx-auto text-center space-y-5 flex flex-col items-center justify-center pt-6"
      >
        {/* Breadcrumbs Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="mb-2"
          >
            <ol className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-xs font-medium text-slate-300 shadow-lg">
              {breadcrumbs.map((item, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={idx} className="inline-flex items-center gap-1.5">
                    {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                    {isLast || !item.href ? (
                      <span className="text-red-400 font-semibold truncate max-w-[200px] sm:max-w-none">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="hover:text-white transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.nav>
        )}

        {/* Badge Pill */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 backdrop-blur-md shadow-xl shadow-red-600/10">
              <BadgeIcon className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-xs font-manrope font-bold text-red-300 uppercase tracking-widest">
                {badge}
              </span>
            </div>
          </motion.div>
        )}

        {/* Main Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-shadow:_0_3px_14px_rgba(0,0,0,0.95)]"
        >
          {title}
        </motion.h1>

        {/* Subtitle Description */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-100 text-sm sm:text-base lg:text-lg font-inter font-medium leading-relaxed max-w-2xl [text-shadow:_0_2px_10px_rgba(0,0,0,0.95)]"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            {primaryCta && (
              primaryCta.href ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white text-sm font-semibold hover:from-red-500 hover:to-amber-500 shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (primaryCta?.onClick) {
                      primaryCta.onClick();
                    } else {
                      openBookModal();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white text-sm font-semibold hover:from-red-500 hover:to-amber-500 shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            )}

            {secondaryCta && (
              secondaryCta.href ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {secondaryCta.label}
                </Link>
              ) : (
                <button
                  onClick={secondaryCta.onClick}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {secondaryCta.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Subtle Accent Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent pointer-events-none z-10" />
    </section>
  );
}
