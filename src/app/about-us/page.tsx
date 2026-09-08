'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
import { PageHero } from '@/components/sections/PageHero';
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
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-hidden">
      {/* Mouse & Ambient Spotlight */}
      <MouseSpotlight />

      {/* Header */}
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="About HD Flooring"
        title="About Our Flooring Company"
        subtitle="Canadian installation specialists dedicated to hardwood, vinyl plank, laminate & tile craftsmanship."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
        primaryCta={{
          label: 'Book Free Estimate',
          onClick: openBookModal,
        }}
      />

      <main className="flex-1 py-16 w-full space-y-20 relative z-10">

        {/* Leadership Profile Card - Real Founder Photo + 3D Tilt Card */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 180 }}
          >
            <TiltCard className="w-full">
              <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-2 border-stone-200/90 dark:border-[#E85D04]/30 shadow-2xl shadow-[#E85D04]/10 flex flex-col lg:flex-row items-center gap-8 justify-between relative overflow-hidden group">
                {/* Top Brand Glow Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative z-10">
                  {/* Real Founder Photo Frame */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 p-1 border-2 border-[#E85D04] shadow-xl shadow-[#E85D04]/25 shrink-0 overflow-hidden group/photo"
                  >
                    <Image
                      src="/assets/images/personal-photos/personal-photo-01.jpg"
                      alt="Habibur Rahman (Habib)"
                      fill
                      className="object-cover group-hover/photo:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  </motion.div>

                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#E85D04] animate-ping" />
                      Managing Director
                    </div>
                    <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                      Habibur Rahman (Habib)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-manrope font-medium">
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
                    className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all"
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
                    <Mail className="w-3.5 h-3.5 text-[#E85D04]" />
                    <span>Email HD Flooring</span>
                  </motion.a>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Mission & Vision Section - Left & Right Directional Entrance */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission - Slide From Left */}
          <motion.div
            initial={{ opacity: 0, x: -70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-2xl space-y-4 transition-all group relative overflow-hidden"
          >
            <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

            <div className="w-12 h-12 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider border border-[#E85D04]/30">
              Our Mission
            </div>

            <h3 className="font-playfair text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#E85D04] transition-colors">
              Quality Flooring Services
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter">
              To provide reliable flooring installation and repair services with professional workmanship, quality advice, and long-lasting flooring solutions for homes and businesses.
            </p>
          </motion.div>

          {/* Vision - Slide From Right */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-2xl space-y-4 transition-all group relative overflow-hidden"
          >
            <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

            <div className="w-12 h-12 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider border border-[#E85D04]/30">
              Our Vision
            </div>

            <h3 className="font-playfair text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#E85D04] transition-colors">
              Trusted Flooring Specialists
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter">
              To be the most trusted name in flooring installation across Canada — known for clean work, honest pricing, and high customer satisfaction.
            </p>
          </motion.div>
        </div>

        {/* On-Site Team & Workmanship Photo Gallery */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <TeamPhotoGallery />
        </div>

        {/* Core Values Section with Full-Width Fixed Parallax Background */}
        <section className="w-full relative py-24 px-4 sm:px-6 lg:px-8 border-y border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden bg-stone-950 text-white">
          {/* Parallax Background Image - 100% Truly Fixed to Viewport */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat opacity-100"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundAttachment: 'fixed',
              }}
            />
            {/* Subtle Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-stone-950/70" />
          </div>

          <div className="max-w-6xl mx-auto space-y-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center space-y-3"
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#E85D04] text-white text-xs font-manrope font-bold uppercase tracking-wider text-center shadow-lg">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-white" />
                <span>What Drives Us</span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-white">
                Our Core Guiding <span className="text-[#E85D04]">Values</span>
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
                      <div className="p-6 sm:p-7 rounded-3xl bg-stone-950/85 hover:bg-stone-950/95 border border-stone-800 hover:border-[#E85D04] shadow-2xl space-y-3 h-full flex flex-col justify-between group transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer transform-gpu relative overflow-hidden text-white">
                        <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#E85D04]/20 border border-[#E85D04]/40 flex items-center justify-center text-[#E85D04] group-hover:scale-110 transition-transform">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <h3 className="font-jakarta text-lg font-extrabold text-white group-hover:text-[#E85D04] transition-colors">
                            {v.title}
                          </h3>
                          <p className="text-xs text-stone-300 leading-relaxed font-inter font-normal">
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
        </section>

        {/* Who We Serve Section - Directional Cards */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-bold uppercase tracking-wider text-center">
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
                  className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-[#E85D04]/60 shadow-xl hover:shadow-2xl space-y-3 transition-all duration-500 ease-out group cursor-pointer relative overflow-hidden"
                >
                  <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] group-hover:rotate-6 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-jakarta text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#E85D04] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter pl-13">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#FAF6F0] dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />

            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                Ready to Upgrade Your Space?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300">
                Get in touch with Habib & the HD Flooring team for a free on-site consultation in Saskatoon.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openBookModal()}
              className="px-6 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-xl shadow-[#E85D04]/20 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Book Free Measure</span>
            </motion.button>
          </motion.div>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
