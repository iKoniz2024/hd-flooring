'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Tag,
  Loader2,
  X,
  Sparkles,
  ArrowLeft,
  DollarSign,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { useModal } from '@/lib/context/ModalContext';

interface ProductDetails {
  _id: string;
  title: string;
  description: string;
  category: string;
  categoryName?: string;
  price: number;
  image: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { openBookModal } = useModal();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();

        if (data.success && data.data) {
          setProduct(data.data);
          setActiveImage(data.data.image);
        } else {
          setError(data.error || 'Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError('Failed to connect to database server.');
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const allImages = product
    ? Array.from(new Set([product.image, ...(Array.isArray(product.images) ? product.images : [])])).filter(Boolean)
    : [];

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col relative overflow-hidden font-inter">
      <MouseSpotlight />
      <Header />

      <main className="flex-grow pt-20">
        <PageHero
          badge={product?.categoryName || 'Flooring Catalog'}
          title={product ? product.title : 'Product Details'}
          subtitle={product ? `Premium ${product.categoryName || 'flooring'} material from HD Flooring collection.` : 'Loading flooring specifications...'}
          backgroundImage={product?.image || '/assets/images/hardwood-flooring/hardwood-flooring-01.jpg'}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product ? product.title : 'Details' },
          ]}
        />

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 w-full">
          <div className="flex items-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-[#E85D04] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Products</span>
            </Link>
          </div>

          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-[#E85D04] animate-spin" />
              <p className="text-sm font-semibold text-stone-500">Loading product details from database...</p>
            </div>
          ) : error || !product ? (
            <div className="py-20 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{error || 'Product Not Found'}</h3>
                <p className="text-sm text-stone-500 mt-1">The requested product could not be loaded from database.</p>
              </div>
              <Link
                href="/products"
                className="inline-block px-6 py-2.5 rounded-xl bg-[#E85D04] text-white text-xs font-bold uppercase tracking-wider"
              >
                Back to Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
              {/* Left Column: Primary Image & Thumbnails Gallery */}
              <div className="lg:col-span-7 space-y-4">
                {/* Large Main Image Display */}
                <div className="relative h-80 sm:h-96 md:h-[420px] w-full rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xl group bg-stone-100 dark:bg-stone-950">
                  <Image
                    src={activeImage || product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    priority
                  />

                  <button
                    onClick={() => {
                      const idx = allImages.indexOf(activeImage || product.image);
                      setLightboxIndex(idx >= 0 ? idx : 0);
                      setLightboxOpen(true);
                    }}
                    className="absolute top-4 right-4 p-2.5 rounded-2xl bg-black/60 hover:bg-[#E85D04] text-white transition-all backdrop-blur-md shadow-lg"
                    title="Zoom Image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl bg-stone-900/80 text-white backdrop-blur-md text-xs font-bold">
                    Primary Image View
                  </div>
                </div>

                {/* Additional Images Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="space-y-2">
                    <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Product Gallery ({allImages.length} Photos)
                    </p>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                      {allImages.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(imgUrl)}
                          className={`relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                            (activeImage || product.image) === imgUrl
                              ? 'border-[#E85D04] scale-105 shadow-xl ring-2 ring-[#E85D04]/30'
                              : 'border-stone-200 dark:border-stone-800 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={imgUrl}
                            alt={`${product.title} photo ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Product Information & Quotation Trigger */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/20 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{product.categoryName || 'Flooring Material'}</span>
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      In Stock & Ready
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-tight font-outfit">
                    {product.title}
                  </h1>

                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#E85D04]">${product.price.toFixed(2)}</span>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Per Square Foot</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-extrabold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Material Specification & Features
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line font-medium">
                      {product.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E85D04]/5 border border-[#E85D04]/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E85D04]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>HD Flooring Workmanship Assurance</span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      All materials come with manufacturer durability warranty & commercial installer guarantee.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={() => openBookModal(product.title)}
                    className="w-full py-4 rounded-2xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[#E85D04]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Get Free Estimate & Material Sample</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Lightbox Zoom Modal for Product Gallery */}
      <AnimatePresence>
        {lightboxOpen && allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#E85D04] transition-colors"
              >
                <X className="w-7 h-7" />
              </button>

              <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center">
                <Image
                  src={allImages[lightboxIndex]}
                  alt="Enlarged view"
                  fill
                  className="object-contain"
                />

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-[#E85D04] transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-[#E85D04] transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 text-xs font-bold text-white bg-black/60 px-4 py-1.5 rounded-full">
                Photo {lightboxIndex + 1} of {allImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingScrollBtns />
      <FloatingWhatsApp />
    </div>
  );
}
