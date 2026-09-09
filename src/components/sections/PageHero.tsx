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
  heightClass = 'min-h-[65vh] sm:min-h-[72vh] lg:min-h-[80vh]',
}: PageHeroProps) {
  const { openBookModal } = useModal();

  // Framer Motion Parallax logic (Safe for hydration)
  const { scrollYProgress } = useScroll();

  // Parallax Y offset for background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      className={`relative w-full ${heightClass} flex items-center justify-center pt-36 sm:pt-40 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-stone-900 text-white`}
    >
      {/* 1. TRUE FIXED PARALLAX BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div
          className="w-full h-full bg-fixed bg-cover bg-center bg-no-repeat brightness-[1.18] contrast-[1.02] saturate-[1.1]"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />
      </div>

      {/* 2. ELEGANT FULL-WIDTH BLACKISH GLASS OVERLAY */}
      <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-[2px] pointer-events-none z-1" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/20 to-stone-950/60 pointer-events-none z-1" />

      {/* 3. HERO CONTENT WRAPPER - CLEAN & UN-BOXED */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-4 sm:space-y-5 flex flex-col items-center justify-center pt-4 sm:pt-6 px-2"
      >
        {/* Breadcrumbs Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="mb-1 sm:mb-2 max-w-full overflow-hidden"
          >
            <ol className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl sm:rounded-full bg-white/90 dark:bg-slate-900/90 border border-stone-200 dark:border-slate-700/60 backdrop-blur-md text-[11px] sm:text-xs font-medium text-stone-800 dark:text-slate-300 shadow-lg max-w-full">
              {breadcrumbs.map((item, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={idx} className="inline-flex items-center gap-1 sm:gap-1.5 max-w-full">
                    {idx > 0 && <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400 dark:text-slate-500 shrink-0" />}
                    {isLast || !item.href ? (
                      <span className="text-[#E85D04] font-bold truncate max-w-[130px] sm:max-w-[280px] lg:max-w-none">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="hover:text-[#E85D04] transition-colors duration-200 shrink-0"
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
            className="max-w-full"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#E85D04]/25 border border-[#E85D04]/50 backdrop-blur-md shadow-xl shadow-[#E85D04]/15 max-w-full">
              <BadgeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs font-manrope font-bold text-white uppercase tracking-widest truncate">
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
          className="font-playfair text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight max-w-4xl [text-shadow:_0_3px_14px_rgba(0,0,0,0.95)] break-words w-full px-1"
        >
          {title}
        </motion.h1>

        {/* Subtitle Description */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-100 text-xs sm:text-base lg:text-lg font-inter font-medium leading-relaxed max-w-2xl [text-shadow:_0_2px_10px_rgba(0,0,0,0.95)] px-2"
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E85D04] text-white text-sm font-semibold hover:bg-[#d45203] shadow-xl shadow-[#E85D04]/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {primaryCta.href.startsWith('tel:') ? (
                    <Phone className="w-4 h-4 text-white shrink-0" />
                  ) : null}
                  <span>{primaryCta.label}</span>
                  {!primaryCta.href.startsWith('tel:') && <ArrowRight className="w-4 h-4" />}
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E85D04] text-white text-sm font-semibold hover:bg-[#d45203] shadow-xl shadow-[#E85D04]/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>{primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            )}

            {secondaryCta && (
              secondaryCta.href ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/90 hover:bg-white text-stone-900 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-slate-200 border border-stone-200 dark:border-slate-700/80 text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {secondaryCta.label}
                </Link>
              ) : (
                <button
                  onClick={secondaryCta.onClick}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/90 hover:bg-white text-stone-900 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-slate-200 border border-stone-200 dark:border-slate-700/80 text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {secondaryCta.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Subtle Accent Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E85D04]/60 to-transparent pointer-events-none z-10" />
    </section>
  );
}
