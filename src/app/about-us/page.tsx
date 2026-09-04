'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Award,
  ShieldCheck,
  Wrench,
  Clock,
  HeartHandshake,
  ArrowRight,
  Building2,
  Home,
  Briefcase,
  Users,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { TiltCard } from '@/components/interactive/TiltCard';
import { TeamPhotoGallery } from '@/components/sections/TeamPhotoGallery';
import { useModal } from '@/lib/context/ModalContext';

const values = [
  {
    icon: Award,
    title: 'Quality Workmanship',
    desc: 'Uncompromising attention to materials, precision subfloor preparation, installation, and zero-squeak finishing.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity & Honesty',
    desc: 'Straightforward quotes with no hidden fees, transparent communication, and honest expert advice.',
  },
  {
    icon: Wrench,
    title: 'Master Craftsmanship',
    desc: 'Precision board scribing, zero-lippage tiling, sheet vinyl coving, and meticulous nosing transitions.',
  },
  {
    icon: Clock,
    title: 'Reliability & Speed',
    desc: 'On-time project start dates, disciplined site execution, and clean daily job site management.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-First Focus',
    desc: 'Flooring solutions tailored specifically to your foot traffic, moisture requirements, design taste, and budget.',
  },
];

const whoWeServe = [
  {
    icon: Home,
    title: 'Homeowners',
    desc: 'Renovations, room upgrades, custom residential builds, and basement flooring in Saskatoon & area.',
  },
  {
    icon: Building2,
    title: 'Property Owners',
    desc: 'Durable, waterproof flooring solutions for rental properties, apartments, and multi-unit developments.',
  },
  {
    icon: Briefcase,
    title: 'General Contractors',
    desc: 'Reliable sub-contracting installation support for custom home builders and commercial renovations.',
  },
  {
    icon: Users,
    title: 'Businesses & Retail',
    desc: 'Commercial VCT, LVP, sheet vinyl coving, and tile for retail stores, offices, clinics, and restaurants.',
  },
];

const valueCardVariants = (idx: number) => {
  switch (idx % 5) {
    case 0:
      return { hidden: { opacity: 0, x: -60, scale: 0.85 }, show: { opacity: 1, x: 0, scale: 1 } };
    case 1:
      return { hidden: { opacity: 0, scale: 0.75 }, show: { opacity: 1, scale: 1 } };
    case 2:
      return { hidden: { opacity: 0, x: 60, scale: 0.85 }, show: { opacity: 1, x: 0, scale: 1 } };
    case 3:
      return { hidden: { opacity: 0, y: 50, scale: 0.85 }, show: { opacity: 1, y: 0, scale: 1 } };
    case 4:
    default:
      return { hidden: { opacity: 0, scale: 1.15 }, show: { opacity: 1, scale: 1 } };
  }
};

export default function AboutUsPage() {
  const { openBookModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-hidden">
      {/* Mouse & Ambient Spotlight */}
      <MouseSpotlight />

      {/* Header */}
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-20 relative z-10">
        {/* Hero Section Header */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          {/* Top Badge - Zoom In */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 backdrop-blur-md shadow-lg shadow-red-600/10">
              <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-xs font-manrope font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                About HD Flooring
              </span>
            </div>
          </motion.div>

          {/* Heading - Slide Down */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight"
          >
            Flooring Expertise. <br className="hidden sm:inline" />
            <span className="brand-gradient-text">Built on Craftsmanship.</span>
          </motion.h1>

          {/* Subtitle - Slide Right */}
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-inter leading-relaxed max-w-2xl mx-auto"
          >
            HD Flooring is a Saskatoon-based flooring installation company specializing in high-grade vinyl, sheet vinyl coving, hardwood, laminate, tile, carpet, and self-leveling floor prep across Saskatchewan.
          </motion.p>
        </div>

        {/* Leadership Profile Card - 3D Tilt Card + Zoom Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 180 }}
        >
          <TiltCard className="w-full">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-red-500/30 shadow-2xl shadow-red-500/10 flex flex-col lg:flex-row items-center gap-8 justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-sky-500 p-0.5 shadow-xl shrink-0"
                >
                  <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-red-400">
                    <UserCheck className="w-10 h-10 text-red-400" />
                  </div>
                </motion.div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Managing Director
                  </div>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                    Habibur Rahman (Habib)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-manrope">
                    Lead Installation Specialist & Founder, HD Flooring
                  </p>
                </div>
              </div>

              {/* Quick Contact Action Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 relative z-10 font-manrope">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+13068808404"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +1 (306) 880-8404</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:hdflooring7@gmail.com"
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-500" />
                  <span>Email HD Flooring</span>
                </motion.a>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* On-Site Team & Workmanship Photo Gallery */}
        <TeamPhotoGallery />

        {/* Mission & Vision Section - Left & Right Directional Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission - Slide From Left */}
          <motion.div
            initial={{ opacity: 0, x: -70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/40 shadow-2xl space-y-4 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[11px] font-bold uppercase tracking-wider">
              Our Mission
            </div>

            <h3 className="font-playfair text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Delivering Dependable Perfection
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter">
              To provide dependable flooring installation and repair services with professional workmanship, quality-focused material advice, and specialized vinyl & hardwood solutions tailored to every client in Saskatoon and Saskatchewan.
            </p>
          </motion.div>

          {/* Vision - Slide From Right */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 shadow-2xl space-y-4 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] font-bold uppercase tracking-wider">
              Our Vision
            </div>

            <h3 className="font-playfair text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              Saskatchewan's Most Trusted Installer
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter">
              To become the standard for flooring installation excellence across Canada — recognized for zero-defect installation, flawless subfloor preparation, transparent customer service, and long-lasting durability.
            </p>
          </motion.div>
        </div>

        {/* Core Values Section - Staggered 3D Tilt Cards */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-manrope font-bold uppercase tracking-wider text-center">
              What Drives Us
            </div>
            <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
              Our Core Guiding Values
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v, idx) => {
              const variant = valueCardVariants(idx);
              const IconComponent = v.icon;

              return (
                <motion.div key={idx} variants={variant}>
                  <TiltCard className="h-full">
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/40 shadow-xl space-y-3 h-full flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-playfair text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {v.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
                          {v.desc}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Who We Serve Section - Directional Cards */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-manrope font-bold uppercase tracking-wider text-center">
              Our Clientele
            </div>
            <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
              Who We Serve Across Saskatchewan
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whoWeServe.map((item, idx) => {
              const IconComp = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 shadow-xl space-y-3 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-500 dark:text-sky-400 group-hover:rotate-6 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-playfair text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-inter pl-13">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-red-600/20"
        >
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Upgrade Your Space?
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-100">
              Get in touch with Habib & the HD Flooring team for a free on-site consultation in Saskatoon.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openBookModal()}
            className="px-6 py-3.5 rounded-full bg-slate-950 text-white font-manrope font-bold text-xs uppercase tracking-wider hover:bg-slate-900 transition-colors shrink-0 shadow-xl shadow-black/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-200" />
            <span>Book Free Measure</span>
          </motion.button>
        </motion.div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
