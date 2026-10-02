'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Home,
  Phone,
  Package,
  Loader2,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { TiltCard } from '@/components/interactive/TiltCard';
import { PageHero } from '@/components/sections/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { useModal } from '@/lib/context/ModalContext';
import { servicesData, ServiceItem } from '@/data/services';
import { ProductQuickViewModal, QuickViewProduct } from '@/components/modals/ProductQuickViewModal';

interface CategoryDoc {
  _id: string;
  name: string;
  isActive?: boolean;
}

interface ProductDoc {
  _id: string;
  title: string;
  description: string;
  category: string;
  categoryName?: string;
  price: number;
  image: string;
  images?: string[];
}

interface ProjectDoc {
  _id: string;
  title: string;
  location: string;
  category: string;
  coverImage: string;
  galleryImages?: string[];
}

const localCategoryGalleryMap: Record<string, string[]> = {
  'hardwood-flooring': [
    '/assets/images/hardwood-flooring/hardwood-flooring-01.jpg',
    '/assets/images/hardwood-flooring/hardwood-flooring-02.jpg',
    '/assets/images/hardwood-flooring/hardwood-flooring-03.jpg',
  ],
  'engineered-hardwood-flooring': [
    '/assets/images/engineered-hardwood/engineered-hardwood-01.jpg',
    '/assets/images/engineered-hardwood/engineered-hardwood-02.jpg',
  ],
  'luxury-vinyl-flooring': Array.from({ length: 67 }, (_, i) => `/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-${String(i + 1).padStart(2, '0')}.jpg`),
  'laminate-flooring': Array.from({ length: 17 }, (_, i) => `/assets/images/laminate-flooring/laminate-flooring-${String(i + 1).padStart(2, '0')}.jpg`),
  'carpet-flooring': Array.from({ length: 15 }, (_, i) => `/assets/images/carpet-flooring/carpet-flooring-${String(i + 1).padStart(2, '0')}.jpg`),
  'tile-flooring': Array.from({ length: 18 }, (_, i) => `/assets/images/tile-flooring/tile-flooring-${String(i + 1).padStart(2, '0')}.jpg`),
  'stair-flooring': Array.from({ length: 5 }, (_, i) => `/assets/images/stair-flooring/stair-flooring-${String(i + 1).padStart(2, '0')}.jpg`),
  'flooring-replacement': [
    '/assets/images/flooring-replacement/flooring-replacement-01.jpg',
    '/assets/images/flooring-replacement/flooring-replacement-02.jpg',
  ],
  'floor-preparation': [
    '/assets/images/floor-preparation/floor-preparation-01.jpg',
  ],
};

export function ServiceDetailClient({ slug }: { slug: string }) {
  const { openBookModal } = useModal();

  const [categoryData, setCategoryData] = useState<CategoryDoc | null>(null);
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<QuickViewProduct | null>(null);

  // Fallback service data matching slug
  const fallbackService: ServiceItem = useMemo(() => {
    const found = servicesData.find((s) => s.slug === slug);
    if (found) return found;

    const formattedTitle = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      id: slug,
      slug: slug,
      title: formattedTitle,
      categoryTag: 'Flooring Service',
      tagline: `Premium ${formattedTitle} Installation & Supply in Saskatoon`,
      shortDesc: `Professional ${formattedTitle} services designed for long-lasting performance and aesthetic appeal.`,
      fullDesc: `At HD Flooring, we provide top-tier ${formattedTitle} services with precision craftsmanship, moisture protection, and zero-squeak guarantee.`,
      heroImage: '/assets/images/hardwood-flooring/hardwood-flooring-01.jpg',
      benefits: [
        'Professional commercial & residential installation',
        'Canadian climate & moisture-tested durability',
        'Expert board layout with expansion spacing',
        'Comprehensive warranty coverage',
      ],
      idealFor: ['Living Rooms', 'Bedrooms', 'Kitchens', 'Commercial Spaces'],
      process: [
        'Site Assessment & Subfloor Prep',
        'Underlayment & Moisture Barrier Setup',
        'Precision Board Fitting',
        'Perimeter Baseboard Trimming',
        'Final Quality Inspection',
      ],
      faqs: [
        {
          question: `How long does ${formattedTitle} installation take?`,
          answer: 'Most standard home installations are completed within 1 to 3 days depending on square footage and room layout.',
        },
      ],
    };
  }, [slug]);

  // Dynamic data loading from MongoDB
  useEffect(() => {
    async function loadDynamicData() {
      setLoading(true);
      try {
        const [catRes, prodRes, projRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products'),
          fetch('/api/projects'),
        ]);

        const catData = await catRes.json();
        const prodData = await prodRes.json();
        const projData = await projRes.json();

        let targetCategory: CategoryDoc | null = null;

        if (catData.success && Array.isArray(catData.data)) {
          // Find matching category by slugified name or title match
          targetCategory = catData.data.find((c: CategoryDoc) => {
            const catNameSlug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const targetSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
              catNameSlug === targetSlug ||
              catNameSlug.replace(/-/g, '').includes(targetSlug.replace(/-/g, '')) ||
              targetSlug.replace(/-/g, '').includes(catNameSlug.replace(/-/g, '')) ||
              String(c._id) === slug
            );
          }) || null;
          setCategoryData(targetCategory);
        }

        // Filter products matching this category
        if (prodData.success && Array.isArray(prodData.data)) {
          const filteredProds = prodData.data.filter((p: ProductDoc) => {
            if (!p.category) return false;
            const pCatStr = String(p.category);
            const matchedId = targetCategory ? String(targetCategory._id) : '';

            if (matchedId && pCatStr === matchedId) return true;
            if (p.categoryName && targetCategory && p.categoryName.toLowerCase() === targetCategory.name.toLowerCase()) return true;

            const nameOrSlug = String(p.categoryName || p.category).toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const targetSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return nameOrSlug.includes(targetSlug.replace(/-/g, '')) || targetSlug.includes(nameOrSlug.replace(/-/g, ''));
          });
          setProducts(filteredProds);
        }

        // Filter project gallery photos matching this category
        if (projData.success && Array.isArray(projData.data)) {
          const filteredProjs = projData.data.filter((pr: ProjectDoc) => {
            if (!pr.category) return false;
            const prCatStr = String(pr.category);
            const matchedId = targetCategory ? String(targetCategory._id) : '';

            if (matchedId && prCatStr === matchedId) return true;
            if (targetCategory && prCatStr.toLowerCase() === targetCategory.name.toLowerCase()) return true;

            const nameOrSlug = prCatStr.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const targetSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return nameOrSlug.includes(targetSlug.replace(/-/g, '')) || targetSlug.includes(nameOrSlug.replace(/-/g, ''));
          });
          setProjects(filteredProjs);
        }
      } catch (err) {
        console.error('Error loading dynamic service data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDynamicData();
  }, [slug]);

  // Category Photo Gallery is strictly for Project Installation Photos (from admin Projects) or Category Cover image
  const galleryPhotos = useMemo(() => {
    const dynamicProjectPhotos = projects.flatMap((p) => [p.coverImage, ...(p.galleryImages || [])]).filter(Boolean);
    const categoryCover = categoryData && (categoryData as any).image ? [(categoryData as any).image] : [];
    
    const projectDynamicPhotos = Array.from(new Set([...categoryCover, ...dynamicProjectPhotos]));

    if (projectDynamicPhotos.length > 0) {
      return projectDynamicPhotos;
    }

    const localPhotos = localCategoryGalleryMap[slug] || [];
    if (localPhotos.length > 0) {
      return localPhotos;
    }

    return [fallbackService.heroImage];
  }, [projects, categoryData, slug, fallbackService.heroImage]);

  const heroImageToDisplay = useMemo(() => {
    if (projects.length > 0 && projects[0].coverImage) {
      return projects[0].coverImage;
    }
    if (categoryData && (categoryData as any).image) {
      return (categoryData as any).image;
    }
    return fallbackService.heroImage;
  }, [projects, categoryData, fallbackService.heroImage]);

  const displayedPhotos = showAllPhotos ? galleryPhotos : galleryPhotos.slice(0, 16);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [slug]);

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % galleryPhotos.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  const activeTitle = categoryData ? categoryData.name : fallbackService.title;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-x-hidden">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loader2 className="w-10 h-10 text-[#E85D04] animate-spin" />
          <p className="text-xs sm:text-sm font-manrope font-extrabold text-slate-600 dark:text-slate-400 tracking-wider uppercase animate-pulse">
            Loading Service & Photos...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-x-hidden">
      <MouseSpotlight />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      <PageHero
        badge={fallbackService.categoryTag || 'Specialized Service'}
        title={activeTitle}
        backgroundImage={heroImageToDisplay}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: activeTitle },
        ]}
      />

      <main className="flex-1 py-14 w-full space-y-20 relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-20">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-[#E85D04] hover:text-[#d45203] px-4 py-2 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 text-[#E85D04]" />
              Back to All Services
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 160 }}
          >
            <TiltCard className="w-full">
              <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-stone-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-2xl shadow-[#E85D04]/10 relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-95 group-hover:h-2 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-extrabold uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#E85D04]" />
                        Specialized Flooring Service
                      </span>

                      <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                        {activeTitle}
                      </h1>

                      <p className="text-[#E85D04] font-manrope font-extrabold text-base sm:text-lg">
                        {fallbackService.tagline}
                      </p>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter font-normal">
                      {fallbackService.fullDesc}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openBookModal(activeTitle)}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#E85D04]/30 inline-flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>Book {activeTitle} Installation</span>
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

                  <div className="lg:col-span-5 relative group/img rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E85D04]/50 h-[340px] sm:h-[380px] shrink-0 bg-slate-900">
                    <img
                      src={heroImageToDisplay}
                      alt={activeTitle}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* DYNAMIC PRODUCTS CATALOG SECTION */}
          {products.length > 0 && (
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
                    <Package className="w-4 h-4 text-[#E85D04]" />
                    <span>Live Product Catalog</span>
                  </div>
                  <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
                    Available {activeTitle} Materials
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-slate-900/95 border border-[#E85D04]/40 text-slate-100 shadow-xl shrink-0">
                  <Tag className="w-4 h-4 text-[#E85D04]" />
                  <span className="text-xs font-manrope font-extrabold text-slate-200">
                    <span className="text-[#E85D04] font-black text-sm">{products.length}</span> In-Stock Options
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#E85D04]/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div
                      onClick={() => setSelectedQuickViewProduct(product)}
                      className="relative h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden block cursor-pointer"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E85D04] text-white shadow-md">
                          ${product.price.toFixed(2)} / sq.ft
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3
                          onClick={() => setSelectedQuickViewProduct(product)}
                          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors line-clamp-1 cursor-pointer"
                        >
                          {product.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedQuickViewProduct(product)}
                          className="text-xs font-bold text-[#E85D04] hover:underline cursor-pointer"
                        >
                          View Details →
                        </button>

                        <button
                          onClick={() => openBookModal(product.title)}
                          className="px-4 py-2 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ADVANTAGES SECTION */}
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
                Why Choose <span className="text-[#E85D04]">{activeTitle}?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-manrope">
                Top advantages of choosing this flooring material for your property.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fallbackService.benefits.map((benefit, idx) => (
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
        </div>

        {/* PROCESS & FAQ SECTIONS */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-20 mt-12">
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
              {fallbackService.process.map((stepName, idx) => (
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

          {fallbackService.faqs && fallbackService.faqs.length > 0 && (
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
              <Accordion items={fallbackService.faqs} />
            </motion.div>
          )}

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
                Ready to Install {activeTitle}?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300">
                Contact Habibur Rahman & the HD Flooring team today for a free on-site estimate in Saskatoon.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openBookModal(activeTitle)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-xl shadow-[#E85D04]/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Get Free Quote</span>
            </motion.button>
          </motion.div>
        </div>
      </main>

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
                  alt={activeTitle}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between w-full font-manrope text-slate-300 text-xs px-2">
                <span>
                  {activeTitle} — ({activeImageIdx + 1} / {galleryPhotos.length})
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

      <ProductQuickViewModal
        product={selectedQuickViewProduct}
        isOpen={Boolean(selectedQuickViewProduct)}
        onClose={() => setSelectedQuickViewProduct(null)}
        onGetQuote={openBookModal}
      />

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
