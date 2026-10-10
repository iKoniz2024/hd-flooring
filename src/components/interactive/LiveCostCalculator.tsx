'use client';

import { useState, useEffect } from 'react';
import { fetchWithCache } from '@/lib/utils/apiCache';
import { motion } from 'framer-motion';
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Layers,
  Wrench,
  Trash2,
  Grid,
  Footprints,
  Award,
  Loader2,
  Package,
} from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

export interface DbCategory {
  _id: string;
  name: string;
}

export interface DbProduct {
  _id: string;
  title: string;
  categoryName: string;
  price: number;
}

const sizePresets = [
  { label: '300 sq.ft', value: 300 },
  { label: '650 sq.ft', value: 650 },
  { label: '1,200 sq.ft', value: 1200 },
  { label: '2,500 sq.ft', value: 2500 },
];

export function LiveCostCalculator({ hideHeader = false }: { hideHeader?: boolean }) {
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<DbProduct | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [sqft, setSqft] = useState(0);
  const [includePrep, setIncludePrep] = useState(false);
  const [includeRemoval, setIncludeRemoval] = useState(false);
  const { openBookModal } = useModal();

  useEffect(() => {
    let isMounted = true;
    const fetchDynamicCalculatorData = async () => {
      setLoading(true);
      try {
        const [catData, prodData] = await Promise.all([
          fetchWithCache('/api/categories'),
          fetchWithCache('/api/products'),
        ]);

        const fetchedCats = catData.success && Array.isArray(catData.data) ? catData.data : [];
        const fetchedProds = prodData.success && Array.isArray(prodData.data) ? prodData.data : [];

        if (isMounted) {
          setCategories(fetchedCats);
          setProducts(fetchedProds);

          if (fetchedProds.length > 0) {
            setSelectedProduct(fetchedProds[0]);
            setSelectedCategory(fetchedProds[0].categoryName || 'all');
          } else if (fetchedCats.length > 0) {
            setSelectedCategory(fetchedCats[0].name);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic calculator data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDynamicCalculatorData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter products by selected category
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.categoryName && p.categoryName.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
  });

  // Calculations
  const baseRate = selectedProduct ? Number(selectedProduct.price) || 0 : 0;
  const prepRate = includePrep ? 1.5 : 0;
  const removalRate = includeRemoval ? 1.2 : 0;
  const totalRate = selectedProduct ? baseRate + prepRate + removalRate : 0;

  const exactTotalCost = selectedProduct ? Math.round(sqft * totalRate) : 0;
  const estimatedDays = sqft === 0 ? 'N/A' : sqft < 400 ? '1 Day' : sqft < 1200 ? '1 - 2 Days' : '2 - 4 Days';

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter relative">
      {/* Outer Studio Card Container - Styled matching top orange glowing line */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-[#E85D04]/30 shadow-2xl shadow-[#E85D04]/10 rounded-3xl p-6 sm:p-8 lg:p-10 relative">
        {/* Top Glowing Orange Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90 rounded-t-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Optional Header */}
        {!hideHeader && (
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5 text-[#E85D04]" />
              <span>Instant Cost Estimator</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Calculate Project <span className="text-[#E85D04]">Cost Live</span>
            </h2>
          </div>
        )}

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-9 h-9 text-[#E85D04] animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Loading dynamic categories & live product rates...
            </p>
          </div>
        ) : products.length === 0 && categories.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <Layers className="w-12 h-12 mx-auto text-slate-400" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Flooring Materials in Database</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Add products in the Admin Dashboard to dynamically enable them in the Live Cost Calculator.
            </p>
          </div>
        ) : (
          /* 2-Column Clean Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: 3 Clean Step Controls */}
            <div className="lg:col-span-7 space-y-7">

              {/* Step 1: Category & Product Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-manrope font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#E85D04] text-white text-[11px] font-extrabold flex items-center justify-center">1</span>
                    Select Category & Product
                  </label>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Supply & Installation Rates</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Category Dropdown Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                      1. Flooring Category:
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        const newCat = e.target.value;
                        setSelectedCategory(newCat);
                        const matching = products.filter(
                          (p) => newCat === 'all' || (p.categoryName && p.categoryName.toLowerCase().trim() === newCat.toLowerCase().trim())
                        );
                        setSelectedProduct(matching[0] || null);
                      }}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-xs focus:outline-none focus:border-[#E85D04] transition-all cursor-pointer shadow-sm"
                    >
                      <option value="all">All Flooring Categories ({categories.length})</option>
                      {categories.map((cat) => (
                        <option key={cat._id || cat.name} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Product / Material Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                      2. Material / Grade:
                    </label>
                    <select
                      value={selectedProduct?._id || ''}
                      onChange={(e) => {
                        const prod = products.find((p) => String(p._id) === e.target.value);
                        if (prod) setSelectedProduct(prod);
                      }}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-xs focus:outline-none focus:border-[#E85D04] transition-all cursor-pointer shadow-sm"
                    >
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((prod) => (
                          <option key={prod._id} value={prod._id}>
                            {prod.title} (${Number(prod.price).toFixed(2)}/sq.ft)
                          </option>
                        ))
                      ) : (
                        <option value="">No products found in this category</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Selected Active Product Highlight Badge */}
                {selectedProduct && (
                  <div className="p-3.5 rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#E85D04]" />
                      <span>{selectedProduct.title} ({selectedProduct.categoryName || 'Flooring'})</span>
                    </div>
                    <span className="text-[#E85D04] font-extrabold text-sm">
                      ${Number(selectedProduct.price).toFixed(2)} / sq.ft
                    </span>
                  </div>
                )}
              </div>

              {/* Step 2: Room Area Slider */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-manrope font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#E85D04] text-white text-[11px] font-extrabold flex items-center justify-center">2</span>
                    Coverage Area (Sq.Ft)
                  </label>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={sqft}
                      onChange={(e) => setSqft(Math.max(0, Number(e.target.value)))}
                      className="w-20 px-2.5 py-1 text-center font-manrope font-extrabold text-sm text-[#E85D04] bg-white dark:bg-slate-900 rounded-lg border border-[#E85D04]/40 outline-none"
                    />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">sq.ft</span>
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-1.5">
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="25"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#E85D04]"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>0 sq.ft</span>
                    <span>1,500 sq.ft</span>
                    <span>3,000+ sq.ft</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Presets:</span>
                  {sizePresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setSqft(preset.value)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${sqft === preset.value
                          ? 'bg-[#E85D04] text-white'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#E85D04]'
                        }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Additional Options */}
              <div className="space-y-3">
                <label className="text-xs font-manrope font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#E85D04] text-white text-[11px] font-extrabold flex items-center justify-center">3</span>
                  Subfloor & Prep Options
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Leveling */}
                  <button
                    type="button"
                    onClick={() => setIncludePrep(!includePrep)}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${includePrep
                        ? 'bg-[#E85D04]/10 border-[#E85D04] text-slate-900 dark:text-white'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    <div className={`p-1 rounded-md ${includePrep ? 'bg-[#E85D04] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs">Subfloor Leveling & Prep</div>
                      <div className="text-[11px] font-extrabold text-[#E85D04]">+$1.50/sq.ft</div>
                    </div>
                  </button>

                  {/* Removal */}
                  <button
                    type="button"
                    onClick={() => setIncludeRemoval(!includeRemoval)}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${includeRemoval
                        ? 'bg-[#E85D04]/10 border-[#E85D04] text-slate-900 dark:text-white'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    <div className={`p-1 rounded-md ${includeRemoval ? 'bg-[#E85D04] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                      <Trash2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs">Old Floor Removal</div>
                      <div className="text-[11px] font-extrabold text-[#E85D04]">+$1.20/sq.ft</div>
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Glider Summary Card */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-28 p-6 sm:p-7 rounded-2xl bg-slate-950 text-white border border-slate-800/80 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
                {/* Top orange glow bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#E85D04]/15 rounded-full blur-2xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 relative z-10">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
                    Project Cost Summary
                  </span>
                  <span className="text-[11px] font-extrabold text-[#E85D04] bg-[#E85D04]/15 px-2.5 py-0.5 rounded-md border border-[#E85D04]/30 shadow-sm">
                    Exact Live Rate
                  </span>
                </div>

                {/* Price Box */}
                <div className="text-center py-5 px-3 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-1 relative z-10 shadow-inner">
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                    Total Investment
                  </span>
                  <motion.div
                    key={exactTotalCost}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl sm:text-4xl font-black text-[#E85D04] tracking-tight drop-shadow-md"
                  >
                    ${exactTotalCost.toLocaleString()}
                  </motion.div>
                  <span className="text-xs font-semibold text-slate-400 block pt-0.5">
                    {selectedProduct ? (
                      <>Rate: <strong className="text-white">${totalRate.toFixed(2)}</strong> / sq.ft installed</>
                    ) : (
                      <span className="text-slate-400 font-normal">Select a product to view live rate</span>
                    )}
                  </span>
                </div>

                {/* Breakdown List */}
                <div className="space-y-2.5 text-xs border-t border-slate-800/80 pt-3 relative z-10 font-manrope">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Material:</span>
                    <span className="font-extrabold text-white truncate max-w-[180px]">{selectedProduct?.title || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Coverage Area:</span>
                    <span className="font-extrabold text-white">{sqft} sq.ft</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Subfloor Prep:</span>
                    <span className="font-extrabold text-white">{includePrep ? 'Included ($1.50/sq.ft)' : 'None'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Floor Removal:</span>
                    <span className="font-extrabold text-white">{includeRemoval ? 'Included ($1.20/sq.ft)' : 'None'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800/60">
                    <span>Est. Timeline:</span>
                    <span className="font-extrabold text-[#E85D04]">{estimatedDays}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2 relative z-10 space-y-3">
                  <button
                    onClick={() => openBookModal(selectedProduct ? `${selectedProduct.title} (${selectedProduct.categoryName || 'Flooring'})` : 'Flooring Installation')}
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all cursor-pointer"
                  >
                    <span>Lock In Estimate & Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E85D04]" />
                    <span>100% Free On-Site Measurement</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
