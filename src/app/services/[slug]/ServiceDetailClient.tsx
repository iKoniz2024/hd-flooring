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
  Tag,
  MapPin,
  Play,
  Video as VideoIcon
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
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { fetchWithCache } from '@/lib/utils/apiCache';
import { ProductQuickViewModal, QuickViewProduct } from '@/components/modals/ProductQuickViewModal';
import { ProjectDetailModal, ProjectDetailItem } from '@/components/modals/ProjectDetailModal';
import { UniversalVideoPlayer } from '@/components/video/UniversalVideoPlayer';

interface CategoryDoc {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  videoUrl?: string;
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
  videoUrl?: string;
}

interface ProjectDoc {
  _id: string;
  title: string;
  location: string;
  category: string;
  coverImage: string;
  galleryImages?: string[];
  videoUrl?: string;
  challenge?: string;
  solution?: string;
  result?: string;
}


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
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectDetailItem | null>(null);
  const [heroMediaType, setHeroMediaType] = useState<'video' | 'image'>('video');

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
        const [catData, prodData, projData] = await Promise.all([
          fetchWithCache('/api/categories'),
          fetchWithCache('/api/products'),
          fetchWithCache('/api/projects'),
        ]);

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

  const [visibleProjectCount, setVisibleProjectCount] = useState<number>(12);

  const activeTitle = categoryData ? categoryData.name : fallbackService.title;

  // Dynamic projects from DB matching this category
  const allCategoryProjects = useMemo(() => {
    return projects.map((p) => ({
      _id: p._id,
      id: p._id,
      title: p.title,
      location: p.location || 'Saskatoon, SK',
      category: p.category || activeTitle,
      coverImage: p.coverImage,
      galleryImages: p.galleryImages || [],
      videoUrl: p.videoUrl || '',
      challenge: p.challenge || '',
      solution: p.solution || '',
      result: p.result || '',
    }));
  }, [projects, activeTitle]);

  const displayedProjects = useMemo(() => {
    return allCategoryProjects.slice(0, visibleProjectCount);
  }, [visibleProjectCount, allCategoryProjects]);

  // Category Photo Gallery is strictly for Project Installation Photos (from admin Projects) or Category Cover image
  const galleryPhotos = useMemo(() => {
    const dynamicProjectPhotos = allCategoryProjects.flatMap((p) => [p.coverImage, ...(p.galleryImages || [])]).filter(Boolean);
    const categoryCover = categoryData && (categoryData as any).image ? [(categoryData as any).image] : [];
    
    return Array.from(new Set([...categoryCover, ...dynamicProjectPhotos]));
  }, [allCategoryProjects, categoryData]);

  const heroImageToDisplay = useMemo(() => {
    if (categoryData && (categoryData as any).image && typeof (categoryData as any).image === 'string' && (categoryData as any).image.trim()) {
      return (categoryData as any).image.trim();
    }
    if (products.length > 0 && products[0].image && typeof products[0].image === 'string' && products[0].image.trim()) {
      return products[0].image.trim();
    }
    if (allCategoryProjects.length > 0 && allCategoryProjects[0].coverImage && typeof allCategoryProjects[0].coverImage === 'string' && allCategoryProjects[0].coverImage.trim()) {
      return allCategoryProjects[0].coverImage.trim();
    }
    return '';
  }, [categoryData, products, allCategoryProjects]);

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

      <main className="flex-1 py-8 sm:py-14 w-full space-y-12 sm:space-y-16 lg:space-y-20 relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12 sm:space-y-16 lg:space-y-20">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-manrope font-bold text-[#E85D04] hover:text-[#d45203] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 transition-all hover:scale-105"
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
              <div className="p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-stone-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-2xl shadow-[#E85D04]/10 relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-95 group-hover:h-2 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
                    <div className="space-y-2.5 sm:space-y-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-[11px] sm:text-xs font-manrope font-extrabold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04]" />
                        Specialized Flooring Service
                      </span>

                      <h1 className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                        {activeTitle}
                      </h1>

                      <p className="text-[#E85D04] font-manrope font-extrabold text-sm sm:text-base lg:text-lg">
                        {categoryData?.description ? `${activeTitle} Services & Material Supply` : fallbackService.tagline}
                      </p>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-inter font-normal">
                      {categoryData?.description || fallbackService.fullDesc}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openBookModal(activeTitle)}
                        className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/25 inline-flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                      >
                        <Sparkles className="hidden sm:inline-block w-4 h-4 shrink-0" />
                        <span>Book {activeTitle} Installation</span>
                      </motion.button>

                      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href="tel:+13068808404"
                          className="px-3 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all text-center"
                        >
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85D04] shrink-0" />
                          <span className="truncate">Call Us</span>
                        </motion.a>

                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={`https://wa.me/13068808404?text=Hi%20HD%20Flooring%2C%20I%20am%20interested%20in%20${encodeURIComponent(activeTitle)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all text-center"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366] shrink-0" />
                          <span>WhatsApp</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Hero Media Container: Video Player or Banner Photo */}
                  {(categoryData?.videoUrl || heroImageToDisplay) ? (
                    <div className="lg:col-span-5 flex flex-col space-y-2.5 w-full">
                      {/* Media Switcher Tab (Cleanly separated above media box to never overlap video title) */}
                      {categoryData?.videoUrl && heroImageToDisplay && (
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[11px] font-manrope font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
                            <span>Service Showcase</span>
                          </span>

                          <div className="flex items-center gap-1 p-1 rounded-xl sm:rounded-full bg-stone-100 dark:bg-slate-800 border border-stone-200/90 dark:border-slate-700 shadow-xs">
                            <button
                              type="button"
                              onClick={() => setHeroMediaType('video')}
                              className={`px-3 py-1 rounded-lg sm:rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                heroMediaType === 'video'
                                  ? 'bg-[#E85D04] text-white shadow-sm'
                                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                              }`}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Video</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setHeroMediaType('image')}
                              className={`px-3 py-1 rounded-lg sm:rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                heroMediaType === 'image'
                                  ? 'bg-[#E85D04] text-white shadow-sm'
                                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                              }`}
                            >
                              <Images className="w-3 h-3" />
                              <span>Photo</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Video Player or Photo Box */}
                      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-[#E85D04]/40 bg-black w-full">
                        {categoryData?.videoUrl && heroMediaType === 'video' ? (
                          <div className="w-full aspect-video flex items-center justify-center bg-black">
                            <UniversalVideoPlayer
                              url={categoryData.videoUrl}
                              title={`${activeTitle} Video Showcase`}
                              poster={heroImageToDisplay || undefined}
                              autoPlay={false}
                              muted={false}
                              className="w-full h-full !rounded-2xl sm:!rounded-3xl border-0 shadow-none"
                            />
                          </div>
                        ) : heroImageToDisplay ? (
                          <div className="relative aspect-video w-full group/img">
                            <Image
                              src={heroImageToDisplay}
                              alt={activeTitle}
                              fill
                              priority
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover group-hover/img:scale-105 transition-transform duration-700"
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E85D04] text-white shadow-md">
                          ${product.price.toFixed(2)} / sq.ft
                        </span>
                      </div>

                      {product.videoUrl && (
                        <div className="absolute bottom-3 left-3">
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/85 text-white backdrop-blur-md border border-[#E85D04]/40 shadow-lg">
                            <Play className="w-2.5 h-2.5 fill-[#E85D04] text-[#E85D04]" />
                            <span>Watch Video</span>
                          </span>
                        </div>
                      )}
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
                          className="text-xs font-bold text-[#E85D04] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          {product.videoUrl && <Play className="w-3 h-3 fill-current" />}
                          <span>View Details →</span>
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

          {/* DYNAMIC CATEGORY PROJECTS & WORKMANSHIP SHOWCASE */}
          {allCategoryProjects.length > 0 && (
            <motion.div
              id="category-projects-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-manrope font-extrabold text-[#E85D04] uppercase tracking-wider">
                    <Camera className="w-4 h-4 text-[#E85D04]" />
                    <span>Real On-Site Workmanship</span>
                  </div>
                  <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
                    {activeTitle} Project Portfolio
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-slate-900/95 border border-[#E85D04]/40 text-slate-100 shadow-xl shrink-0">
                  <Images className="w-4 h-4 text-[#E85D04]" />
                  <span className="text-xs font-manrope font-extrabold text-slate-200">
                    Showing <span className="text-[#E85D04] font-black text-sm">{displayedProjects.length}</span> of <span className="text-[#E85D04] font-black text-sm">{allCategoryProjects.length}</span> Projects
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project) => {
                  const totalPhotos = Array.from(new Set([project.coverImage, ...(project.galleryImages || [])])).filter(Boolean);
                  return (
                    <div
                      key={project.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#E85D04]/50 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div
                        onClick={() => setSelectedProjectForModal(project as unknown as ProjectDetailItem)}
                        className="relative h-60 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer block"
                      >
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                        {/* Video Tour Badge if video exists */}
                        {project.videoUrl && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-950/85 text-white backdrop-blur-md border border-[#E85D04]/40 shadow-lg flex items-center gap-1">
                              <Play className="w-3 h-3 fill-[#E85D04] text-[#E85D04]" />
                              <span>Video Tour</span>
                            </span>
                          </div>
                        )}

                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-black/75 backdrop-blur-md text-white border border-white/20 shadow-md flex items-center gap-1.5">
                            <Images className="w-3.5 h-3.5 text-[#E85D04]" />
                            <span>{totalPhotos.length} {totalPhotos.length === 1 ? 'Photo' : 'Photos'}</span>
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-manrope font-extrabold text-[#E85D04]">
                            <MapPin className="w-3 h-3 text-[#E85D04]" />
                            <span>{project.location}</span>
                          </div>
                          <h3 className="font-playfair text-base sm:text-lg font-bold leading-tight group-hover:text-[#E85D04] transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-inter">
                          {project.challenge || project.solution || `Custom ${activeTitle} installation completed with precision craftsman finish.`}
                        </p>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedProjectForModal(project as unknown as ProjectDetailItem)}
                            className="text-xs font-manrope font-extrabold text-[#E85D04] hover:underline flex items-center gap-1.5 cursor-pointer"
                          >
                            {project.videoUrl && <Play className="w-3 h-3 fill-current" />}
                            <span>View Details & Tour →</span>
                          </button>

                          <button
                            onClick={() => openBookModal(project.title)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#E85D04] hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                          >
                            Get Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SHOW MORE / SHOW LESS TOGGLE BUTTON */}
              {!loading && allCategoryProjects.length > 12 && (
                <div className="flex items-center justify-center pt-6">
                  {visibleProjectCount < allCategoryProjects.length ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setVisibleProjectCount((prev) => Math.min(prev + 12, allCategoryProjects.length))}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#E85D04]/30 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span>Show More Projects ({allCategoryProjects.length - visibleProjectCount} Remaining) ↓</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setVisibleProjectCount(12);
                        const el = document.getElementById('category-projects-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="px-8 py-3.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-manrope font-bold text-xs uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-700 cursor-pointer shadow-lg"
                    >
                      <span>Show Less Projects ↑</span>
                    </motion.button>
                  )}
                </div>
              )}
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
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12 sm:space-y-16 lg:space-y-20 mt-8 sm:mt-12">
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
              <h2 className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
                Our Professional <span className="text-[#E85D04]">Installation Process</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
              {fallbackService.process.map((stepName, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <TiltCard className="h-full">
                    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04] shadow-xl text-center space-y-2.5 sm:space-y-3 h-full flex flex-col justify-between group transition-all duration-300 relative overflow-hidden">
                      <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />
                      <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto rounded-xl sm:rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center font-playfair font-black text-[#E85D04] text-base sm:text-lg group-hover:scale-110 transition-transform">
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
              className="space-y-6 sm:space-y-8"
            >
              <div className="text-center space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-extrabold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <span>Got Questions?</span>
                </div>
                <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
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
            className="p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-[#FAF6F0] dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl relative overflow-hidden"
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
                {galleryPhotos[activeImageIdx] ? (
                  <Image
                    src={galleryPhotos[activeImageIdx]}
                    alt={activeTitle}
                    fill
                    sizes="(max-width: 1200px) 100vw, 80vw"
                    className="object-contain"
                  />
                ) : null}
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

      <ProjectDetailModal
        project={selectedProjectForModal}
        isOpen={Boolean(selectedProjectForModal)}
        onClose={() => setSelectedProjectForModal(null)}
        onGetEstimate={(title) => openBookModal(title)}
      />

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
