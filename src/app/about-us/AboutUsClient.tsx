'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Wrench,
  Clock,
  HeartHandshake,
  Building2,
  Home,
  Briefcase,
  Users,
  Quote,
  Phone,
  Mail,
} from 'lucide-react';
import { TiltCard } from '@/components/interactive/TiltCard';
import { TeamPhotoGallery } from '@/components/sections/TeamPhotoGallery';
import { PartnersAndCertifications } from '@/components/sections/PartnersAndCertifications';
import { useModal } from '@/lib/context/ModalContext';

const founderSpeech = {
  name: 'Habibur Rahman (Habib)',
  role: 'Founder, CEO & Lead Installation Specialist',
  badge: 'Founder & CEO',
  image: '/assets/images/personal-photos/habib-photo.jpg',
  speech:
    'At HD Flooring, our mission has always been built on trust and uncompromising quality. We approach every residential and commercial project as if we are working on our own home, ensuring flawless craftsmanship from subfloor preparation to final zero-squeak finish.',
  phone: '+1 (306) 880-8404',
  email: 'hdflooring7@gmail.com',
};

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

const valueCardVariants = (idx: number) => ({
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: idx * 0.08, ease: 'easeOut' as const },
  },
});

export function AboutUsClient() {
  const { openBookModal } = useModal();

  return (
    <>
      {/* Founder & CEO Speech Section */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 140 }}
        >
          <TiltCard className="w-full">
            <div className="p-5 sm:p-10 lg:p-16 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-stone-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-2xl shadow-[#E85D04]/15 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1.5 sm:h-2 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-95 group-hover:h-2.5 transition-all duration-300" />
              <div className="absolute top-0 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 sm:w-80 h-48 sm:h-80 bg-[#E85D04]/5 rounded-full blur-2xl pointer-events-none" />

              <Quote className="absolute right-4 top-4 sm:right-8 sm:top-10 w-20 h-20 sm:w-36 sm:h-36 text-slate-200/25 dark:text-slate-800/25 group-hover:text-[#E85D04]/20 transition-colors pointer-events-none" />

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                  },
                }}
                className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-14 relative z-10"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.6, type: 'spring', stiffness: 150 },
                    },
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="relative w-48 h-60 sm:w-72 sm:h-88 lg:w-80 lg:h-[420px] rounded-3xl bg-slate-950 p-1.5 border-2 border-[#E85D04] shadow-2xl shadow-[#E85D04]/30 shrink-0 overflow-hidden group/photo cursor-pointer mx-auto lg:mx-0"
                >
                  <Image
                    src={founderSpeech.image}
                    alt={founderSpeech.name}
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width: 640px) 192px, (max-width: 1024px) 288px, 320px"
                    className="object-cover object-top group-hover/photo:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="px-3.5 py-1 rounded-full bg-[#E85D04] text-white text-[10px] sm:text-xs font-manrope font-extrabold uppercase tracking-wider shadow-md">
                      {founderSpeech.badge}
                    </span>
                  </div>
                </motion.div>

                <div className="space-y-4 sm:space-y-6 text-center lg:text-left flex-1 w-full">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="space-y-2 sm:space-y-3"
                  >
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-[11px] sm:text-xs font-manrope font-bold uppercase tracking-wider">
                      <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04]" />
                      <span>Message From Founder & CEO</span>
                    </div>
                    <h3 className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                      {founderSpeech.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E85D04] font-manrope font-extrabold tracking-wider uppercase">
                      {founderSpeech.role}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="relative pl-0 lg:pl-6 border-l-0 lg:border-l-4 border-[#E85D04] py-1"
                  >
                    <p className="text-sm sm:text-lg lg:text-xl text-slate-700 dark:text-slate-200 italic leading-relaxed font-serif font-normal">
                      "{founderSpeech.speech}"
                    </p>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 font-manrope w-full sm:w-auto"
                  >
                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      href={`tel:${founderSpeech.phone}`}
                      className="w-full sm:w-auto px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#E85D04]/30 transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>Call {founderSpeech.phone}</span>
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      href={`mailto:${founderSpeech.email}`}
                      className="w-full sm:w-auto px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-[#E85D04] shrink-0" />
                      <span>Email Founder</span>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Industry Memberships, Certifications & Manufacturer Partners (Bento Glass Cards) */}
      <PartnersAndCertifications variant="bento" />

      {/* Mission & Vision Section */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-xl sm:shadow-2xl space-y-3.5 sm:space-y-4 transition-all group relative overflow-hidden"
        >
          <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider border border-[#E85D04]/30">
              Our Mission
            </div>
          </div>

          <h3 className="font-playfair text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#E85D04] transition-colors">
            Quality Flooring Services
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter">
            To provide reliable flooring installation and repair services with professional workmanship, quality advice, and long-lasting flooring solutions for homes and businesses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-xl sm:shadow-2xl space-y-3.5 sm:space-y-4 transition-all group relative overflow-hidden"
        >
          <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] shrink-0 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider border border-[#E85D04]/30">
              Our Vision
            </div>
          </div>

          <h3 className="font-playfair text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#E85D04] transition-colors">
            Trusted Flooring Specialists
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter">
            To be the most trusted name in flooring installation across Canada — known for clean work, honest pricing, and high customer satisfaction.
          </p>
        </motion.div>
      </div>


      {/* Core Values Section */}
      <section className="w-full relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-y border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden bg-stone-100 dark:bg-stone-950 text-slate-900 dark:text-white">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed opacity-100"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-stone-900/30 to-stone-900/40" />
        </div>

        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center space-y-2.5 sm:space-y-3"
          >
            <div className="inline-flex items-center justify-center px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#E85D04] text-white text-[11px] sm:text-xs font-manrope font-bold uppercase tracking-wider text-center shadow-lg">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-white" />
              <span>What Drives Us</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-md">
              Our Core Guiding <span className="text-[#E85D04]">Values</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {values.map((v, idx) => {
              const variant = valueCardVariants(idx);
              const IconComponent = v.icon;

              return (
                <motion.div key={idx} variants={variant}>
                  <TiltCard className="h-full">
                    <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-stone-200/90 dark:border-slate-800 hover:border-[#E85D04] shadow-xl sm:shadow-2xl space-y-3.5 sm:space-y-4 h-full flex flex-col justify-between group transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer transform-gpu relative overflow-hidden text-slate-900 dark:text-white">
                      <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

                      <div className="space-y-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#E85D04]" />
                        </div>
                        <h3 className="font-jakarta text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors">
                          {v.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter font-normal">
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

      {/* Who We Serve Section */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center justify-center px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-[11px] sm:text-xs font-manrope font-bold uppercase tracking-wider text-center">
            Our Clientele
          </div>
          <h2 className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
            Who We Serve Across Saskatchewan
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {whoWeServe.map((item, idx) => {
            const IconComp = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-[#E85D04]/60 shadow-lg hover:shadow-2xl space-y-2.5 sm:space-y-3 transition-all duration-500 ease-out group cursor-pointer relative overflow-hidden"
              >
                <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] group-hover:rotate-6 transition-transform shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-jakarta text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#E85D04] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-inter pl-0 sm:pl-13">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* On-Site Team & Workmanship Photo Gallery */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <TeamPhotoGallery />
      </div>

      {/* Bottom CTA Banner */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-[#FAF6F0] dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl sm:shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />

          <div className="space-y-1.5 sm:space-y-2 text-center sm:text-left">
            <h3 className="font-playfair text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 dark:text-white">
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
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-xl shadow-[#E85D04]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Free Measure</span>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
