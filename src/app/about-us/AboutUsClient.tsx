'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Wrench,
  Clock,
  HeartHandshake,
  Building2,
  Home,
  Quote,
  Phone,
  Mail,
  CheckCircle2,
  MapPin,
  Check,
  ArrowRight,
  Target,
  Eye,
} from 'lucide-react';
import { TeamPhotoGallery } from '@/components/sections/TeamPhotoGallery';
import { PartnersAndCertifications } from '@/components/sections/PartnersAndCertifications';
import { useModal } from '@/lib/context/ModalContext';
import { fetchWithCache } from '@/lib/utils/apiCache';

interface DynamicCategoryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  badge?: string;
}

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

const qualityCommitments = [
  {
    num: '01',
    title: 'Precision Workmanship',
    desc: 'Careful installation with attention to alignment, tight joints, and clean finishing details.',
    icon: Award,
  },
  {
    num: '02',
    title: 'Proper Preparation',
    desc: 'Subfloor moisture checks, surface leveling, and substrate prep before laying any floor.',
    icon: Wrench,
  },
  {
    num: '03',
    title: 'Transparent Estimates',
    desc: 'Clear upfront project quotes so you know the exact scope and cost without surprises.',
    icon: ShieldCheck,
  },
  {
    num: '04',
    title: 'Clean Work Practices',
    desc: 'Dust containment, active workspace protection, and a clean site at the end of each day.',
    icon: Clock,
  },
  {
    num: '05',
    title: 'Customer-Focused Service',
    desc: 'Direct communication and personal support from your initial consultation through final walkthrough.',
    icon: HeartHandshake,
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Consultation & Measurement',
    desc: 'We discuss your requirements, measure the space, and assess the existing flooring or subfloor conditions.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '02',
    title: 'Material Selection & Quotation',
    desc: 'We help identify suitable flooring options and provide a project estimate based on the agreed scope.',
    image: 'https://images.unsplash.com/photo-1581415296450-d16971274f85?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '03',
    title: 'Surface Preparation',
    desc: 'We prepare the installation area, including relevant removal, leveling, and subfloor preparation.',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '04',
    title: 'Professional Installation',
    desc: 'We install the selected flooring with attention to precision, alignment, and manufacturer-recommended requirements.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '05',
    title: 'Finishing & Transitions',
    desc: 'We complete relevant trim work, baseboards, stair details, and transitions for a coordinated finish.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
  {
    num: '06',
    title: 'Cleanup & Final Walkthrough',
    desc: 'We clean the work area and review the completed installation with the client.',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=90&fm=webp',
  },
];

const whyChooseItems = [
  'Broad range of flooring installation solutions (Hardwood, LVP, Laminate, Tile, Carpet)',
  'Attention to subfloor preparation, moisture testing, and leveling',
  'Tailored options for both residential and commercial properties',
  'Clear communication and upfront project estimates',
  'Careful finishing and attention to the overall appearance',
  'A commitment to dependable service and customer satisfaction',
];

// Dedicated fallback floor images for categories that do not have an image set in database
const categoryFloorFallback: Record<string, string> = {
  hardwood: 'https://images.unsplash.com/photo-1581415296450-d16971274f85?auto=format&fit=crop&w=800&q=85&fm=webp',
  'engineered hardwood': 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=85&fm=webp',
  vinyl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85&fm=webp',
  lvp: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85&fm=webp',
  laminate: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=85&fm=webp',
  tile: 'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?auto=format&fit=crop&w=800&q=85&fm=webp',
  ceramic: 'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?auto=format&fit=crop&w=800&q=85&fm=webp',
  porcelain: 'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?auto=format&fit=crop&w=800&q=85&fm=webp',
  carpet: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=85&fm=webp',
  epoxy: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=85&fm=webp',
  stair: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=85&fm=webp',
  prep: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=85&fm=webp',
  leveling: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=85&fm=webp',
  subfloor: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=85&fm=webp',
};

const getFloorImageForCategory = (name: string, fallback?: string): string => {
  const lower = (name || '').toLowerCase();
  for (const [key, url] of Object.entries(categoryFloorFallback)) {
    if (lower.includes(key)) return url;
  }
  return fallback || 'https://images.unsplash.com/photo-1581415296450-d16971274f85?auto=format&fit=crop&w=800&q=85&fm=webp';
};

export function AboutUsClient() {
  const router = useRouter();
  const { openBookModal } = useModal();
  const [activeStep, setActiveStep] = useState(0);
  const [categories, setCategories] = useState<DynamicCategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Pure Dynamic Category Fetching directly from Database - No Static Fallbacks
  useEffect(() => {
    let isMounted = true;
    const fetchDynamicData = async () => {
      setIsLoading(true);
      try {
        const [catData, prodData] = await Promise.all([
          fetchWithCache('/api/categories'),
          fetchWithCache('/api/products'),
        ]);

        const rawCategories = catData?.success && Array.isArray(catData?.data) ? catData.data : [];
        const rawProducts = prodData?.success && Array.isArray(prodData?.data) ? prodData.data : [];

        if (isMounted) {
          if (rawCategories.length > 0) {
            const dynamicList: DynamicCategoryItem[] = rawCategories.map(
              (cat: { _id?: string; name: string; image?: string; description?: string; slug?: string }) => {
                const catIdStr = cat._id ? String(cat._id) : '';
                const slug =
                  cat.slug ||
                  cat.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');

                const matchingProd = rawProducts.find(
                  (p: { category?: string | object; categoryName?: string; image?: string }) => {
                    if (!p.image) return false;
                    const pCatStr = p.category ? String(p.category) : '';
                    if (catIdStr && pCatStr === catIdStr) return true;
                    if (p.categoryName && p.categoryName.toLowerCase() === cat.name.toLowerCase())
                      return true;
                    return false;
                  }
                );

                const cardImage =
                  (cat.image && cat.image.trim()) ||
                  (matchingProd?.image && matchingProd.image.trim()) ||
                  getFloorImageForCategory(cat.name);

                return {
                  id: catIdStr || slug,
                  slug: slug,
                  name: cat.name,
                  description:
                    cat.description ||
                    `Professional ${cat.name} installation tailored for Canadian residential and commercial spaces.`,
                  image: cardImage,
                  badge: 'Residential & Commercial',
                };
              }
            );

            setCategories(dynamicList);
          } else {
            setCategories([]);
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic categories in AboutUs:', err);
        if (isMounted) setCategories([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDynamicData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 overflow-hidden">
      {/* 1. SECTION: About HD Flooring -> ANIMATION STYLE: Smooth Scale-Up & Focus Reveal (Lens Expansion) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#FAF6F0] dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Text Unfolds with Smooth Slide */}
            <div className="lg:col-span-7 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/25 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-3 h-3" />
                <span>About HD Flooring</span>
              </motion.div>

              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
                Quality Flooring. Expert Installation.{' '}
                <span className="text-[#E85D04]">Lasting Results.</span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-inter">
                At HD Flooring, we believe a great floor does more than complete a space—it
                enhances the way people live, work, and experience their surroundings. We specialize
                in professional flooring installation for residential and commercial properties,
                combining quality materials, skilled workmanship, and careful attention to detail
                to deliver results built to last.
              </p>

              {/* Inline Trust Badges: Pop in with Stagger */}
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-stone-700 dark:text-stone-300 font-semibold">
                <span className="px-3 py-1 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3 h-3 text-[#E85D04]" />
                  Saskatoon, SK &amp; Greater Toronto Area
                </span>
                <span className="px-3 py-1 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-[#E85D04]" />
                  Commercial &amp; Residential
                </span>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => openBookModal('About Header Consultation')}
                  className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#E85D04]/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Free Estimate</span>
                </button>
                <a
                  href="tel:+13068808404"
                  className="px-5 py-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>

            {/* Right: 3D Perspective Tilt-In on Entrance */}
            <motion.div
              initial={{ opacity: 0, rotate: -2, scale: 0.92 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.15, type: 'spring', stiffness: 90 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[280px] sm:h-[340px] w-full group bg-stone-900">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6RlMqVZNaqnAhfvKnOQ73wXw-HPJ0VN7jnPEw1X-p7g&s=10"
                  alt="HD Flooring Master Craftsman Laying Hardwood Floor Planks"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800 text-white text-xs flex items-center justify-between">
                  <span className="font-bold text-[#E85D04]">Precision Alignment</span>
                  <span className="text-stone-300">Clean Subfloor Prep</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. SECTION: Who We Are -> ANIMATION STYLE: Diagonal Parallax Slide (Bottom-Left to Top-Right) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Slides up and in from deep bottom-left with tilt */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80, damping: 14 }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-200 dark:border-stone-800 h-[280px] sm:h-[340px] w-full bg-stone-900 group">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1zQPENoIxRpGfovPOzG8wsltaM-pMDZS8ojySUw3wg&s=10"
                alt="Direct Hardwood Floor Planks and Natural Wood Grain Texture"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200">
                Natural wood grains, premium finishes, and proven durability.
              </div>
            </div>
          </motion.div>

          {/* Right: Cascade Wave Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-3.5 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              <span>Who We Are</span>
            </div>

            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              Dependable Flooring Solutions Through Precision &amp; Care
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-inter">
              HD Flooring is committed to delivering dependable flooring solutions through
              precision, professionalism, and a customer-focused approach. From selecting the
              right flooring material to preparing the subfloor and completing the final
              installation, we pay attention to every stage of the process.
            </p>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-inter">
              We understand that every property is different. That&apos;s why we take the time to
              understand each client&apos;s vision, assess the space, and recommend practical
              flooring solutions that balance appearance, durability, and performance.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
              Whether you&apos;re renovating a family home, upgrading an apartment, or improving a
              commercial property, our goal is to deliver a finish you can be proud of.
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SECTION: Message from Founder & CEO -> ANIMATION STYLE: 3D Flip-In on Portrait & Spotlight Pop on Quote */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: 3D Perspective Card Flip (Flips in along Y-axis) */}
            <motion.div
              initial={{ opacity: 0, rotateY: -22, scale: 0.92 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, type: 'spring', stiffness: 75, damping: 14 }}
              style={{ perspective: 1200 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E85D04]/30 bg-stone-950 group">
                <Image
                  src={founderSpeech.image}
                  alt={founderSpeech.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                {/* Top Badge: Bounces Down */}
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <span className="px-3.5 py-1.5 rounded-full bg-[#E85D04] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E85D04]/40 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{founderSpeech.badge}</span>
                  </span>
                </motion.div>

                {/* Bottom Info Card: Slides Up */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-stone-800 text-white space-y-0.5">
                  <h4 className="font-playfair text-lg font-extrabold text-white">
                    {founderSpeech.name}
                  </h4>
                  <p className="text-xs text-[#E85D04] font-bold tracking-wide">
                    {founderSpeech.role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Expands Outward */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-bold uppercase tracking-wider">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Message From Founder &amp; CEO</span>
                </span>

                <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                  A Personal Commitment To Every Floor We Install
                </h3>

                <p className="text-xs sm:text-sm text-[#E85D04] font-bold uppercase tracking-wider">
                  {founderSpeech.name} &bull; {founderSpeech.role}
                </p>
              </div>

              {/* Quote Block: Expands with Spring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                className="relative p-5 sm:p-6 rounded-2xl bg-[#FAF6F0] dark:bg-stone-950 border-l-4 border-[#E85D04] shadow-sm"
              >
                <Quote className="w-8 h-8 text-[#E85D04]/25 absolute top-3 right-4 pointer-events-none" />
                <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 italic leading-relaxed font-serif relative z-10">
                  &ldquo;{founderSpeech.speech}&rdquo;
                </p>
              </motion.div>

              {/* Badges: Horizontal Spring-In */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-stone-700 dark:text-stone-300 font-semibold">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <span>Hands-On Quality Supervision</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                  <ShieldCheck className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <span>Direct Owner Accountability</span>
                </div>
              </div>

              {/* Direct Action Contacts */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${founderSpeech.phone}`}
                  className="px-5 py-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#E85D04]/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {founderSpeech.phone}</span>
                </a>
                <a
                  href={`mailto:${founderSpeech.email}`}
                  className="px-5 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Mail className="w-4 h-4 text-[#E85D04]" />
                  <span>Email Direct</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. SECTION: Our Mission & Vision -> ANIMATION STYLE: Opposite Corner Converge (Diagonal Inward) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mission: Enters from Top-Left corner */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 90, damping: 15 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-md space-y-2.5 transition-shadow hover:shadow-xl"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E85D04]">
                Our Mission
              </span>
            </div>
            <h3 className="font-playfair text-lg font-bold text-stone-900 dark:text-stone-100">
              Skilled Workmanship &amp; Thoughtful Preparation
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-inter">
              To deliver high-quality flooring installation services through skilled workmanship,
              thoughtful preparation, and customer-focused service—helping our clients create
              spaces that look exceptional and perform well over time.
            </p>
          </motion.div>

          {/* Vision: Enters from Bottom-Right corner */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 90, damping: 15 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-md space-y-2.5 transition-shadow hover:shadow-xl"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E85D04]">
                Our Vision
              </span>
            </div>
            <h3 className="font-playfair text-lg font-bold text-stone-900 dark:text-stone-100">
              A Trusted Flooring Installation Provider
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-inter">
              To be a trusted flooring installation provider in our service areas, recognized for
              consistent workmanship, dependable service, and lasting customer relationships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. SECTION: Our Flooring Expertise -> ANIMATION STYLE: Card-Deck Shuffle / Wave Ripple (Scale + Rotation Pop) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider">
            <span>Comprehensive Services</span>
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Our Flooring <span className="text-[#E85D04]">Expertise</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
            We offer a range of flooring installation services designed to suit different styles,
            spaces, and performance requirements.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-4 space-y-3 animate-pulse"
              >
                <div className="h-44 w-full bg-stone-200 dark:bg-stone-800 rounded-xl" />
                <div className="h-5 w-2/3 bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="h-4 w-full bg-stone-200 dark:bg-stone-800 rounded" />
              </div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, idx) => {
              // Unique Wave: Card 0 (-4deg tilt pop), Card 1 (direct bottom spring pop), Card 2 (+4deg tilt pop)
              const rotation = idx % 3 === 0 ? -4 : idx % 3 === 2 ? 4 : 0;
              const yOffset = idx % 3 === 1 ? 40 : 25;

              return (
                <motion.div
                  key={cat.id || cat.slug || idx}
                  initial={{ opacity: 0, scale: 0.82, rotate: rotation, y: yOffset }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    type: 'spring',
                    stiffness: 100,
                    damping: 14,
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => router.push(`/services/${cat.slug}`)}
                  className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-[#E85D04]/70 shadow-md hover:shadow-2xl overflow-hidden group flex flex-col justify-between cursor-pointer transition-colors duration-300"
                >
                  {/* Photo Frame */}
                  <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-[10px] font-bold text-white border border-stone-700">
                      {cat.badge || 'Residential & Commercial'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h3 className="font-jakarta text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#E85D04] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-inter line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-[#E85D04]">
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : null}
      </section>

      {/* 6. SECTION: Our Commitment to Quality -> ANIMATION STYLE: Domino Tilt-Down Cascade */}
      <section className="w-full py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-stone-950 text-white border-y border-stone-800">
        <div className="max-w-6xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2 max-w-xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04] text-white text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              <span>Standards of Excellence</span>
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white">
              Our Commitment to <span className="text-[#E85D04]">Quality</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Quality begins long before the first plank or tile is installed—emphasizing proper
              measurements, subfloor assessment, and clean finishing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {qualityCommitments.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: -40, rotateX: 35 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.08,
                    type: 'spring',
                    stiffness: 95,
                    damping: 14,
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-[#E85D04]/60 shadow-md space-y-3 group transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-[#E85D04] font-playfair">
                      {item.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-jakarta text-sm font-bold text-white group-hover:text-[#E85D04] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-inter">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SECTION: Commercial & Residential Solutions -> ANIMATION STYLE: Deep Horizontal Curtain Swipes (Stretch Glide) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider">
            <span>Tailored By Sector</span>
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Commercial &amp; Residential Solutions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
            We adapt our installation approach to the specific needs and foot traffic of each environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Commercial: Deep Glide from Left with Stretch */}
          <motion.div
            initial={{ opacity: 0, x: -90, scaleX: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80, damping: 15 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer transition-shadow"
          >
            <div className="relative h-48 w-full overflow-hidden bg-stone-900">
              <Image
                src="/assets/images/before-after/corridor-after.png"
                alt="Commercial High-Traffic Corridor Flooring"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/25 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2.5 text-white">
                <div className="w-8 h-8 rounded-lg bg-[#E85D04] flex items-center justify-center text-white shadow-md">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-bold">Commercial Flooring</h3>
                  <span className="text-[11px] text-[#E85D04] font-semibold">Offices, Retail &amp; Restaurants</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-inter">
                For offices, retail stores, restaurants, and showrooms, we provide flooring
                selected for the space&apos;s design, expected foot traffic, and practical requirements.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Offices', 'Retail Stores', 'Restaurants', 'Showrooms', 'Healthcare'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold text-stone-700 dark:text-stone-300"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Residential: Deep Glide from Right with Stretch */}
          <motion.div
            initial={{ opacity: 0, x: 90, scaleX: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80, damping: 15 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer transition-shadow"
          >
            <div className="relative h-48 w-full overflow-hidden bg-stone-900">
              <Image
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=85&fm=webp"
                alt="Finished Residential Natural Hardwood Flooring"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/25 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2.5 text-white">
                <div className="w-8 h-8 rounded-lg bg-[#E85D04] flex items-center justify-center text-white shadow-md">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-bold">Residential Flooring</h3>
                  <span className="text-[11px] text-[#E85D04] font-semibold">Homes, Condos &amp; Basements</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-inter">
                From living rooms and bedrooms to kitchens, basements, and staircases, we help
                homeowners create comfortable interiors suited to their lifestyle.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Living Rooms', 'Bedrooms', 'Kitchens', 'Basements', 'Staircases'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold text-stone-700 dark:text-stone-300"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. SECTION: Our Installation Process -> ANIMATION STYLE: 3D Perspective Card-Flip Step Sequence */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider">
            <span>Workflow Discipline</span>
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Our Installation <span className="text-[#E85D04]">Process</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
            We follow a structured process to help keep flooring projects organized and efficient.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, rotateX: -25, y: 35 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                type: 'spring',
                stiffness: 90,
                damping: 14,
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl bg-white dark:bg-stone-900 border transition-all duration-300 cursor-pointer ${
                activeStep === idx
                  ? 'border-[#E85D04] ring-2 ring-[#E85D04]/30 shadow-lg -translate-y-0.5'
                  : 'border-stone-200/90 dark:border-stone-800 hover:border-[#E85D04]/50 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-[#E85D04] text-white text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#E85D04]" />
              </div>
              <h3 className="font-jakarta text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-inter">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. SECTION: Why Choose HD Flooring? -> ANIMATION STYLE: Center-Out Radial Pop & Cascading Checks */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, type: 'spring', stiffness: 85, damping: 16 }}
          className="p-6 sm:p-10 rounded-3xl bg-[#FAF6F0] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6"
        >
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85D04]">
              Protect Your Flooring Investment
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
              Why Choose HD Flooring?
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Choosing the right flooring contractor is an important part of protecting your
              investment. At HD Flooring, we focus on the details that contribute to a successful project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {whyChooseItems.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + idx * 0.05 }}
                whileHover={{ x: 5, scale: 1.01 }}
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-stone-950/80 border border-stone-200/90 dark:border-stone-800 flex items-start gap-3 transition-colors hover:border-[#E85D04]/50"
              >
                <div className="w-5 h-5 rounded-md bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
                  {reason}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 10. SECTION: Manufacturer Partners & Certifications */}
      <PartnersAndCertifications variant="bento" />

      {/* 11. SECTION: Real Work On-Site Team Gallery */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <TeamPhotoGallery />
      </section>

      {/* 12. SECTION: Bottom CTA Banner -> ANIMATION STYLE: Glowing Ambient Slide-Up with Interactive Shimmer */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, type: 'spring', stiffness: 90, damping: 16 }}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 text-white border border-stone-800 shadow-2xl space-y-5"
        >
          <div className="space-y-2 text-center sm:text-left max-w-2xl">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#E85D04]/20 text-[#E85D04] text-[11px] font-bold uppercase tracking-wider">
              Get Started Today
            </span>
            <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white">
              Let&apos;s Build a Better Foundation
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              Whether planning a complete renovation or upgrading a single room, contact HD Flooring
              today to discuss your project and request a free, no-obligation estimate.
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#E85D04]">
              HD Flooring — Quality You Can See. Craftsmanship You Can Trust.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              onClick={() => openBookModal('About Us Bottom CTA')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#E85D04]/20 hover:scale-105 active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Request Free Estimate</span>
            </button>

            <a
              href="tel:+13068808404"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#E85D04]" />
              <span>Call +1 (306) 880-8404</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
