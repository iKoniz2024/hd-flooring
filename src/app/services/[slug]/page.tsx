'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  HelpCircle,
  Images,
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  Wrench,
  Clock,
  Home,
  Building2,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { TiltCard } from '@/components/interactive/TiltCard';
import { PageHero } from '@/components/sections/PageHero';
import { servicesData } from '@/data/services';
import { Accordion } from '@/components/ui/Accordion';
import { useModal } from '@/lib/context/ModalContext';

const serviceCategoryImages: Record<string, string[]> = {
  'hardwood-flooring': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA5QJadSxaoBD3LdD9h7KhYDyv7o11TzVdckjfq5JDig&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiW8_gwZDxPqKkFH5P7Ghha2ckIwxTI4WGykFVn3LMtg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1TyGxm0n8ShaD2Ijaaf-Ts2wGoHfKrSJTqfN0b4ozw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs-4W2oPqRbnGFEG7eMgsCkKtBTEocuNwfAJG_XG6dRQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWz-rdJ-0kVquH6DfaiIGfZOxq6V1Ds-1a-hBlDhj4A&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJDNxNrlkLQZ6fq4olQAbpXp_YVr0oMI3GNf3FcgUUaw&s=10',
  ],
  'engineered-hardwood-flooring': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQmIxGt-10bmF0fk_uKGBj5dUbbcIiQWAAavGBvCjPA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmijarypdtsAsXW5qBdQtzpIr0fbW5ZsukukKB0C9PHA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs3-L28yp4dL3ricNCO7eJqP5_8YtV4JUvJFFZSybmyw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy2ojHwAMZTNwW6hT_vea6fkSaB1gibZu5k1uI5juvSA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaG87bXy3DGHRf4LjdG6CF8A88oGwj9Q-YGz1b7hUrkw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmi3Epqe8PGZ4Cz0kusudQ2GNYseHspjC86nLKMDwwmw&s',
  ],
  'luxury-vinyl-flooring': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTEUoxo5DGNLJMzJebWMdlOa8szDn_2c5r2s-I0H7DuQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprYk_wgpFy0agS7fqJW-jh74wvF_vuHdWKGfOuuktHg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI4hYZ-Gl4qQUj90s9I3kloHZyc7wsbOwZInH8_To9Gw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjJfNG6_BVMgRdA157ajr81c2NEZmF4UiBdA_NqX40w&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQePfHrloKbtVL-P_00NKcPExyy1ZjSEWsnDvJXZhmj6A&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY1t5rJOg_4OVbNuSvkLJXRPPjNbPUglPkEKxkN-gy1w&s=10',
  ],
  'laminate-flooring': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_0KThWJmVf_6Nnjnpc5qdjCBRMrXpeqPUt-YIOEz7XA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsmAm-NjWGHR6-qcpA-aEKE-fbW0Fsi3I6uaeqgMwBeg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTot95bUdetmdl-OAxq3iSF39mF9HesupUTUhA1MMgbBA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfcitSuqopyMPVgwK45W5rVRrN7D6VDHCaq6v_nJql2A&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3crbbeliLx1c9seCpSH9uClEglVpeGaV1u0pfEKpB_w&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFb7Hwh2sSysm6NbsFy554EoJ8CZyO82gB83aWxhbAg&s=10',
  ],
  'carpet-flooring': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1eTGWfyZ4mt1oHeld-RRqF_AN5MTu62ydqB-SGTDezg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRop2Yx-hMRYrOWdtPdA6hOzzOxjG7r5wLJdRAnSwWPNQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnAVZ0alSjjBFQcxIkFLvwEp94t_4mKrnaC1rv4-9Fmw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8aSO-UG0z4QAg21CARws5OUQgjL3R-w8x49PEFUg2pQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Scz4twv5bXaa9dGdp1MN4qhtC2QSEjjKTRRFq1aNlg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQCvISGT61MmcmQ0zvFjRb4Sraoj089SfPirsRMQaanw&s=10',
  ],
  'tile-flooring': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWtKRec5ABWzi2l1fVYlePoT52sMCXMDYiSFd50OkvDw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKUs7wqxSvkNBe93bwmWr1KLT0WTUxPwzCeAx-u2RWQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShd8sZClukz3873iWkVkwO7bO89sEb0oLby95RKvXrDw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNEDtxh_ApFbfEQxAxDFTcCpQcJzmIltWKejxloBkZg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Nu8k5NLc8_wVDKZUKXTmvcVnBIOGQYnAbjtH7X0q3w&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkD2XP7BcFJcNmSKNnY2FHp7YOuTEI5OW_vQ-iav-mRQ&s=10',
  ],
  'stair-flooring': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTV2NRDTv8Mj6xLScrNb9CqIivs2ahOsx2NnJ_5XEucA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi3GwWeALY8UqtV6LYXrW133EJ313Ufnwz2c4Aq-gDnw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRdymJcUZ5dgm_HLRA7Ru5A_0vb3A-ptz8lldS0nNKXg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkkQQxsCfSu6v2rvZqGZNk_stmPNQu47PrxsKuApjThg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YdSKRRelpU0hx_yEPd_WFAPqseKpk_tgjWwnVQFn0w&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG2WxR7mZpNR9FGfsDNeG4SLoAwo-jB7DVeexB5m8XPw&s=10',
  ],
  'flooring-replacement': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4rjm3mP4ypQCHUs8Wk9WD_2F3eFrGFtpscYAJHHY_9g&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBJ2xEso_wQv0PMn842tjicMWzXMTTR88wtoKhT5Z3w&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCgZL3ax6YkJjeYxY_SPfVQWRkmVIErv7a7VOv9vgSA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7OSML6xj2g8tE5uhUMbv3t5TMune84mufxBfMtJnquQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaJrmLcoelW8nvryKv2LkQnTjlVWqoWNiPn01cOINfXg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-w2rJ3YSIs60x4GuKqfgReP3CyY1h1JhZI367-Axqw&s=10',
  ],
  'floor-preparation': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJcZQqWQk_K1DojBx0zReuWp3rnwuO89nXCEiS2sl_5w&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMKx8eoyRGYBYmA_krJ09q2TjRTKjudonTjxQngJlhg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Omh8zLpk07HXcAwxmLYIt3Hrl-n8XTiCmC4zEayYkQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ezuJoKT5tLVVSZAOv0Aj5yO3gQZdIh2SIIYxnoRpiQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRty0xWc85bRQZ-RCIznc_eV9wt3kfEcKzrgzbVSJDCjQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWQqirITTZYHFtf1xKVnen7bNmLXtyEYfAhj4rFZdN3w&s=10',
  ],
};

const serviceParallaxImages: Record<string, string> = {
  'hardwood-flooring':
    'https://images.unsplash.com/photo-1623868564620-611975f8cf70?q=80&w=1600&auto=format&fit=crop',
  'engineered-hardwood-flooring':
    'https://plus.unsplash.com/premium_photo-1770220928681-193cb7de4ea9?q=80&w=1600&auto=format&fit=crop',
  'luxury-vinyl-flooring':
    'https://plus.unsplash.com/premium_photo-1770235354225-c070a40dfd89?q=80&w=1600&auto=format&fit=crop',
  'laminate-flooring':
    'https://plus.unsplash.com/premium_photo-1778511632263-c2b63f8e92ca?q=80&w=1600&auto=format&fit=crop',
  'carpet-flooring':
    'https://plus.unsplash.com/premium_photo-1779470088794-003055f4a4fa?q=80&w=1600&auto=format&fit=crop',
  'tile-flooring':
    'https://plus.unsplash.com/premium_photo-1756717213191-775499a0aaee?q=80&w=1600&auto=format&fit=crop',
  'stair-flooring':
    'https://plus.unsplash.com/premium_photo-1779464142832-0baf99bb570c?q=80&w=1600&auto=format&fit=crop',
  'flooring-replacement':
    'https://plus.unsplash.com/premium_photo-1756717268707-ac177064fca3?q=80&w=1600&auto=format&fit=crop',
  'floor-preparation':
    'https://plus.unsplash.com/premium_photo-1778439612543-51488a109cf0?q=80&w=1600&auto=format&fit=crop',
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openBookModal } = useModal();

  const service = servicesData.find((s) => s.slug === slug) || servicesData[0];
  const galleryPhotos = serviceCategoryImages[slug] || [service.heroImage];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const displayedPhotos = showAllPhotos ? galleryPhotos : galleryPhotos.slice(0, 16);

  useEffect(() => {
    const scrollToTopSmooth = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    scrollToTopSmooth();
    const timer = setTimeout(scrollToTopSmooth, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % galleryPhotos.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-x-hidden">
      {/* Dynamic Mouse Spotlight & Ambient Glow */}
      <MouseSpotlight />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge={service.categoryTag || 'Specialized Service'}
        title={service.title}
        backgroundImage={service.heroImage}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
        primaryCta={{
          label: `Book ${service.title.split(' ')[0]} Estimate`,
          onClick: () => openBookModal(service.title),
        }}
      />

      <main className="flex-1 py-14 w-full space-y-20 relative z-10">

        {/* TOP CONTENT CONTAINER */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-20">
          {/* Navigation Back Link */}
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-[#E85D04] hover:text-[#d45203] px-4 py-2 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 text-[#E85D04]" />
              Back to All Services
            </Link>
          </div>

          {/* HERO FEATURE BLOCK - 3D Tilt Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 160 }}
          >
            <TiltCard className="w-full">
              <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-stone-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-2xl shadow-[#E85D04]/10 relative overflow-hidden group">
                {/* Glowing Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-95 group-hover:h-2 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                  {/* Left Info Column */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-extrabold uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#E85D04]" />
                        Specialized Flooring Service
                      </span>

                      <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                        {service.title}
                      </h1>

                      <p className="text-[#E85D04] font-manrope font-extrabold text-base sm:text-lg">
                        {service.tagline}
                      </p>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter font-normal">
                      {service.fullDesc}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openBookModal(service.title)}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#E85D04]/30 inline-flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>Book {service.title.split(' ')[0]} Installation</span>
                      </motion.button>

                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="tel:+13068808404"
                        className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold flex items-center gap-2 transition-all"
                      >
                        <Phone className="w-4 h-4 text-[#E85D04]" />
                        <span>Call +1 (306) 880-8404</span>
                      </motion.a>
                    </div>
                  </div>

                  {/* Right Image Frame Column - Pure & Crystal Clear */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setActiveImageIdx(0);
                      setLightboxOpen(true);
                    }}
                    className="lg:col-span-5 relative group/img rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E85D04]/50 h-[340px] sm:h-[380px] shrink-0 cursor-pointer bg-slate-900"
                  >
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-[#E85D04] text-white text-xs font-manrope font-extrabold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                      <span>View Gallery</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Why Choose Section - 3D Tilt Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-bold uppercase tracking-wider text-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#E85D04]" />
                <span>Key Advantages</span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
                Why Choose <span className="text-[#E85D04]">{service.title}?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-manrope">
                Top advantages of choosing this flooring material for your Saskatoon property.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <TiltCard className="h-full">
                    <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04] shadow-xl hover:shadow-2xl flex items-start gap-4 h-full relative overflow-hidden group transition-all duration-300">
                      <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />
                      <div className="p-3 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5 text-[#E85D04]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-manrope font-extrabold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-[#E85D04] transition-colors">
                          Advantage #{idx + 1}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter font-normal leading-relaxed">
                          {benefit}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category Photo Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-manrope font-extrabold text-[#E85D04] uppercase tracking-wider">
                  <Images className="w-4 h-4 text-[#E85D04]" />
                  <span>Category Photo Gallery</span>
                </div>
                <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
                  {service.title} Design & Installation Showcase
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-slate-900/95 border border-[#E85D04]/40 text-slate-100 shadow-xl shadow-[#E85D04]/10 shrink-0 whitespace-nowrap">
                <Camera className="w-4 h-4 text-[#E85D04] animate-pulse" />
                <span className="text-xs font-manrope font-extrabold text-slate-200">
                  <span className="text-[#E85D04] font-black text-sm">{galleryPhotos.length}</span> HD Photos
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {displayedPhotos.map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setLightboxOpen(true);
                  }}
                  className="group relative h-48 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer shadow-lg bg-slate-900 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#E85D04]/50"
                >
                  <img
                    src={imgUrl}
                    alt={`${service.title} photo ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>

            {galleryPhotos.length > 16 && (
              <div className="text-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllPhotos(!showAllPhotos)}
                  className="px-8 py-3.5 rounded-full bg-[#E85D04] text-white hover:bg-[#d45203] font-manrope font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-[#E85D04]/25 transition-all cursor-pointer"
                >
                  {showAllPhotos
                    ? 'Show Less Photos'
                    : `Show All ${galleryPhotos.length} HD Photos (+${galleryPhotos.length - 16} More)`}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        {/* 100% FULL-WIDTH TRULY FIXED PARALLAX SHOWCASE BANNER - NO CARD BOX */}
        <section className="w-full relative py-24 px-4 sm:px-6 lg:px-8 border-y border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-12 text-white">
          {/* 100% Fixed Parallax Background Image - Pure Wood Plank Texture */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat opacity-100 brightness-[1.02] contrast-[1.05]"
              style={{
                backgroundImage: `url('${serviceParallaxImages[slug] || 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=1600&auto=format&fit=crop'}')`,
                backgroundAttachment: 'fixed',
              }}
            />
            {/* Soft Clear Overlay for High Contrast Floating Text */}
            <div className="absolute inset-0 bg-stone-950/40 pointer-events-none" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85D04] text-white text-xs font-manrope font-extrabold uppercase tracking-wider shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Saskatoon Premium Installation</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="font-playfair text-3xl sm:text-5xl font-extrabold text-white leading-tight [text-shadow:_0_3px_14px_rgba(0,0,0,0.9)]"
            >
              Transform Your Property With <span className="text-[#E85D04]">{service.title}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-xs sm:text-base text-stone-100 max-w-2xl mx-auto leading-relaxed font-manrope font-medium [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]"
            >
              Engineered for Canadian climate durability, zero-lippage precision, and zero-squeak finish. Handcrafted by Habibur Rahman & the HD Flooring team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="pt-2 flex flex-wrap justify-center items-center gap-4 font-manrope"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openBookModal(service.title)}
                className="px-8 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-[#E85D04]/40 cursor-pointer"
              >
                Book Free On-Site Measure
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+13068808404"
                className="px-7 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-white/30 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-xl backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-[#E85D04]" />
                <span>Call +1 (306) 880-8404</span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* BOTTOM CONTENT CONTAINER */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-20">

          {/* Ideal Rooms & Spaces Section - Clean Glassmorphism Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-stone-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 space-y-8 text-center shadow-2xl relative overflow-hidden text-slate-900 dark:text-white group"
          >
            {/* Glowing Top Accent Line & Ambient Light */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-95" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-extrabold uppercase tracking-wider">
                Recommended Applications
              </span>
              <h3 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Ideal Rooms & Spaces For {service.title}
              </h3>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 relative z-10 max-w-4xl mx-auto">
              {service.idealFor.map((room) => (
                <motion.span
                  key={room}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 hover:border-[#E85D04] text-slate-800 dark:text-slate-200 hover:text-[#E85D04] dark:hover:text-[#E85D04] text-xs sm:text-sm font-manrope font-extrabold tracking-wide shadow-md transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
                >
                  <Home className="w-4 h-4 text-[#E85D04]" />
                  <span>{room}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Step-by-Step Installation Process Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-bold uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-[#E85D04]" />
                <span>Step-By-Step Execution</span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
                Our Professional <span className="text-[#E85D04]">Installation Process</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {service.process.map((stepName, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <TiltCard className="h-full">
                    <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04] shadow-xl text-center space-y-3 h-full flex flex-col justify-between group transition-all duration-300 relative overflow-hidden">
                      <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />
                      <div className="w-10 h-10 mx-auto rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center font-playfair font-black text-[#E85D04] text-lg group-hover:scale-110 transition-transform">
                        0{idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm font-manrope font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                        {stepName}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQs Accordion Section */}
          {service.faqs && service.faqs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-extrabold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <span>Got Questions?</span>
                </div>
                <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
                  Frequently Asked Questions
                </h2>
              </div>
              <Accordion items={service.faqs} />
            </motion.div>
          )}

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#FAF6F0] dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />

            <div className="space-y-2 text-center sm:text-left font-manrope">
              <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                Ready to Install {service.title}?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300">
                Contact Habibur Rahman & the HD Flooring team today for a free on-site estimate in Saskatoon.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openBookModal(service.title)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-xl shadow-[#E85D04]/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Get Free Quote</span>
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-[#E85D04] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4">
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={galleryPhotos[activeImageIdx]}
                  alt={service.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between w-full font-manrope text-slate-300 text-xs px-2">
                <span>
                  {service.title} — ({activeImageIdx + 1} / {galleryPhotos.length})
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevImage}
                    className="p-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-[#E85D04] text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-[#E85D04] text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

