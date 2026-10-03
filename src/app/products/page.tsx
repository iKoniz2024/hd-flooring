'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Search,
  Sparkles,
  Layers,
  Tag,
  Loader2,
  X,
  Check,
  PhoneCall,
  ShoppingBag,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { useModal } from '@/lib/context/ModalContext';
import { fetchWithCache } from '@/lib/utils/apiCache';

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  categoryName?: string;
  price: number;
  image: string;
  images?: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [selectedModalImage, setSelectedModalImage] = useState<string>('');

  const { openBookModal } = useModal();

  useEffect(() => {
    if (activeModalProduct) {
      setSelectedModalImage(activeModalProduct.image);
    }
  }, [activeModalProduct]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [prodData, catData] = await Promise.all([
          fetchWithCache('/api/products'),
          fetchWithCache('/api/categories'),
        ]);

        if (prodData.success) {
          setProducts(prodData.data || []);
        }
        if (catData.success) {
          setCategories(catData.data || []);
        }
      } catch (error) {
        console.error('Failed to load products/categories:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtering & Sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.categoryName &&
          product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col relative overflow-hidden">
      <MouseSpotlight />
      <Header />

      <main className="flex-grow pt-20">
        {/* Page Hero */}
        <PageHero
          badge="Flooring Catalog & Materials"
          title="Explore Our Premium Flooring Products"
          subtitle="Browse our wide selection of commercial and residential flooring materials including Hardwood, Luxury Vinyl, Laminate, Carpet, and Specialty Tiles."
          backgroundImage="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=2400&q=90"
        />

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 w-full">
          {/* Controls Bar: Search, Category Tabs & Sort */}
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search flooring materials by title, style or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-sm bg-stone-100/70 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 rounded-2xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <Filter className="w-4 h-4 text-[#E85D04]" />
                  <span>Sort By:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                  className="px-4 py-3 text-sm bg-stone-100/70 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 rounded-2xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                >
                  <option value="featured">Featured / Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/20'
                    : 'bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Categories</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-white/10">
                  {products.length}
                </span>
              </button>

              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat._id).length;
                return (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat._id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                      selectedCategory === cat._id
                        ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/20'
                        : 'bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-white/10">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-[#E85D04] animate-spin" />
              <p className="text-sm font-semibold text-stone-500">Loading flooring collection...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 dark:bg-stone-800 flex items-center justify-center text-[#E85D04]">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">No Products Found</h3>
                <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                  We couldn&apos;t find any flooring products matching your criteria. Try resetting filters or search query.
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E85D04] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#E85D04]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image Container */}
                  <div
                    onClick={() => setActiveModalProduct(product)}
                    className="relative h-60 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden block cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-stone-900/80 text-white backdrop-blur-md">
                        {product.categoryName || 'Flooring'}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E85D04] text-white shadow-lg">
                        ${product.price.toFixed(2)} / sq.ft
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3
                        onClick={() => setActiveModalProduct(product)}
                        className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#E85D04] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="text-xs font-bold text-[#E85D04] hover:underline cursor-pointer"
                      >
                        View Details →
                      </button>

                      <button
                        onClick={() => openBookModal(product.title)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#E85D04]/20 transition-all cursor-pointer"
                      >
                        <span>Get Quote</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* PRODUCT DETAIL MODAL */}
        <AnimatePresence>
          {activeModalProduct && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
              onClick={() => setActiveModalProduct(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8"
              >
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-900/70 text-white hover:bg-[#E85D04] transition-all shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image & Gallery Column */}
                  <div className="p-4 sm:p-6 bg-stone-100 dark:bg-stone-950 flex flex-col justify-between space-y-4">
                    {/* Primary Image View */}
                    <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md">
                      <Image
                        src={selectedModalImage || activeModalProduct.image}
                        alt={activeModalProduct.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-all duration-300"
                      />
                    </div>

                    {/* Gallery Thumbnails List */}
                    {(() => {
                      const allImages = Array.from(
                        new Set([
                          activeModalProduct.image,
                          ...(Array.isArray(activeModalProduct.images) ? activeModalProduct.images : []),
                        ])
                      ).filter(Boolean);

                      if (allImages.length <= 1) return null;

                      return (
                        <div className="space-y-1.5">
                          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                            Product Image Gallery ({allImages.length} Photos)
                          </p>
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {allImages.map((imgUrl, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedModalImage(imgUrl)}
                                className={`relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                                  (selectedModalImage || activeModalProduct.image) === imgUrl
                                    ? 'border-[#E85D04] scale-105 shadow-md'
                                    : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                              >
                                <Image
                                  src={imgUrl}
                                  alt={`${activeModalProduct.title} photo ${idx + 1}`}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Details Column */}
                  <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/20">
                        {activeModalProduct.categoryName || 'Flooring Material'}
                      </span>
                      <h3 className="text-xl font-extrabold text-stone-900 dark:text-white leading-tight">
                        {activeModalProduct.title}
                      </h3>
                      <div className="text-2xl font-black text-[#E85D04]">
                        ${activeModalProduct.price.toFixed(2)}{' '}
                        <span className="text-xs font-semibold text-stone-500">/ sq.ft</span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                        {activeModalProduct.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                      <button
                        onClick={() => {
                          setActiveModalProduct(null);
                          openBookModal();
                        }}
                        className="w-full py-3 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 flex items-center justify-center gap-2"
                      >
                        <span>Request Free Estimate for this Product</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingScrollBtns />
      <FloatingWhatsApp />
    </div>
  );
}
