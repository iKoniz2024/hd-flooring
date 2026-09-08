'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Ruler, Layers, Wrench, Trash2 } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const materials = [
  { id: 'solid-hardwood', name: 'Solid Hardwood Flooring', rate: 6.5, icon: '🌳', tag: 'Real Wood' },
  { id: 'engineered-hardwood', name: 'Engineered Hardwood', rate: 5.8, icon: '🪵', tag: 'Climate Stable' },
  { id: 'luxury-vinyl', name: 'Luxury Vinyl (LVP & LVT)', rate: 3.5, icon: '🌊', tag: '100% Waterproof' },
  { id: 'laminate-flooring', name: 'Laminate Flooring', rate: 3.2, icon: '📐', tag: 'Scratch-Proof' },
  { id: 'carpet-flooring', name: 'Carpet & Under-Padding', rate: 3.8, icon: '🛋️', tag: 'Plush & Soft' },
  { id: 'tile-flooring', name: 'Porcelain & Ceramic Tile', rate: 7.0, icon: '🏛️', tag: 'Heavy Duty' },
  { id: 'stair-flooring', name: 'Stair Flooring & Capping', rate: 5.0, icon: '🪜', tag: 'Custom Fit' },
  { id: 'sheet-vinyl', name: 'Sheet Vinyl & Wall Coving', rate: 4.5, icon: '✨', tag: 'Hygienic' },
  { id: 'floor-preparation', name: 'Self Leveling & Subfloor Prep', rate: 2.0, icon: '🏗️', tag: 'Foundation' },
];

const sizePresets = [
  { label: 'Small Room', value: 300 },
  { label: 'Medium Room', value: 650 },
  { label: 'Whole Main Floor', value: 1200 },
  { label: 'Entire Home / Office', value: 2500 },
];

export function LiveCostCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [sqft, setSqft] = useState(500);
  const [includePrep, setIncludePrep] = useState(true);
  const [includeRemoval, setIncludeRemoval] = useState(false);
  const { openBookModal } = useModal();

  // Calculations
  const baseRate = selectedMaterial.rate;
  const prepRate = includePrep ? 1.5 : 0;
  const removalRate = includeRemoval ? 1.2 : 0;
  const totalRate = baseRate + prepRate + removalRate;

  const estimatedCost = Math.round(sqft * totalRate);
  const minCost = Math.round(estimatedCost * 0.95);
  const maxCost = Math.round(estimatedCost * 1.05);

  const estimatedDays = sqft < 400 ? '1 Day' : sqft < 1200 ? '1 - 2 Days' : '2 - 4 Days';

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#E85D04]/10 rounded-full blur-3xl -z-10 pointer-events-none hidden dark:block" />

      {/* Main Container Card: Light Architectural Studio Style */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-300/40 dark:shadow-none p-6 sm:p-10 lg:p-12 relative">

        {/* Header - Animated from Top */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85D04] text-white text-xs font-bold uppercase tracking-widest shadow-md shadow-[#E85D04]/20">
            <Calculator className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Instant Cost Estimator</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Calculate Your Flooring Project <span className="text-[#E85D04]">Cost Live</span>
          </h2>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Controls Column - Animated from Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8 flex flex-col justify-between"
          >
            {/* 1. Material Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-manrope font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#E85D04]" />
                  1. Select Flooring Material
                </label>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Est. supply & labor</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {materials.map((mat) => {
                  const isSelected = selectedMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 relative group overflow-hidden ${isSelected
                          ? 'bg-[#E85D04] text-white border-[#E85D04] shadow-lg shadow-[#E85D04]/25 scale-[1.02]'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-[#E85D04]/50 hover:shadow-md'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0 p-1 bg-slate-100 dark:bg-slate-700/40 rounded-xl">{mat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-extrabold text-xs tracking-tight line-clamp-1">{mat.name}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className={`font-semibold ${isSelected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                              ${mat.rate.toFixed(2)} / sq.ft
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}>
                              {mat.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Room Size Slider with Quick Presets */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-800/70 border-2 border-stone-200/80 dark:border-slate-700/80 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-manrope font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#E85D04]" />
                  2. Room Size Area
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="100"
                    max="5000"
                    value={sqft}
                    onChange={(e) => setSqft(Math.max(100, Number(e.target.value)))}
                    className="w-24 px-3 py-1 text-center font-manrope font-black text-sm text-[#E85D04] dark:text-[#E85D04] bg-white dark:bg-slate-900 rounded-xl border-2 border-[#E85D04]/30 focus:border-[#E85D04] focus:outline-none"
                  />
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">sq.ft</span>
                </div>
              </div>

              {/* Range Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="25"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full h-3 bg-stone-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#E85D04]"
                />
                <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span>100 sq.ft</span>
                  <span>1,500 sq.ft</span>
                  <span>3,000+ sq.ft</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2 border-t border-stone-200 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-2">Quick Presets:</span>
                <div className="flex flex-wrap gap-2">
                  {sizePresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setSqft(preset.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-manrope font-bold transition-all ${sqft === preset.value
                          ? 'bg-[#E85D04] text-white shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-stone-200 dark:border-slate-700 hover:border-[#E85D04]'
                        }`}
                    >
                      {preset.label} ({preset.value} sq.ft)
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Subfloor & Prep Options */}
            <div className="space-y-3">
              <label className="text-xs font-manrope font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#E85D04]" />
                3. Subfloor Prep & Removal Services
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Leveling Prep */}
                <div
                  onClick={() => setIncludePrep(!includePrep)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${includePrep
                      ? 'bg-[#E85D04]/10 border-[#E85D04] text-slate-900 dark:text-white'
                      : 'bg-stone-50 dark:bg-slate-800/70 border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                >
                  <div className={`mt-0.5 p-1 rounded-lg ${includePrep ? 'bg-[#E85D04] text-white' : 'bg-stone-200 dark:bg-slate-700 text-slate-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs">Cementitious Leveling & Prep</div>
                    <div className="text-[11px] font-semibold text-[#E85D04] mt-0.5">+$1.50 / sq.ft</div>
                  </div>
                </div>

                {/* Old Flooring Removal */}
                <div
                  onClick={() => setIncludeRemoval(!includeRemoval)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${includeRemoval
                      ? 'bg-[#E85D04]/10 border-[#E85D04] text-slate-900 dark:text-white'
                      : 'bg-stone-50 dark:bg-slate-800/70 border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                >
                  <div className={`mt-0.5 p-1 rounded-lg ${includeRemoval ? 'bg-[#E85D04] text-white' : 'bg-stone-200 dark:bg-slate-700 text-slate-400'}`}>
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs">Old Floor Removal & Disposal</div>
                    <div className="text-[11px] font-semibold text-[#E85D04] mt-0.5">+$1.20 / sq.ft</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Estimate Receipt Column - Animated from Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-7 sm:p-8 border-2 border-[#E85D04]/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Glowing Backdrop */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E85D04]" />
                  <span className="text-xs font-manrope font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                    Estimate Summary
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 rounded-full border border-[#E85D04]/30">
                  <span className="w-2 h-2 rounded-full bg-[#E85D04] animate-ping" />
                  Instant Live
                </span>
              </div>

              {/* Investment Price Display */}
              <div className="text-center py-5 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-inner">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-manrope font-semibold block mb-1">
                  Estimated Total Investment:
                </span>
                <motion.div
                  key={estimatedCost}
                  initial={{ scale: 0.92, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl sm:text-4xl font-black text-[#E85D04] font-manrope tracking-tight"
                >
                  ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
                </motion.div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 flex items-center justify-center gap-1">
                  <span>Approx.</span>
                  <span className="font-extrabold text-[#E85D04]">${totalRate.toFixed(2)}</span>
                  <span>/ sq.ft installed</span>
                </div>
              </div>

              {/* Itemized Line Breakdown */}
              <div className="space-y-3 text-xs font-manrope pt-2">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Selected Material:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{selectedMaterial.name}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Coverage Area:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{sqft} sq.ft</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Subfloor Prep:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{includePrep ? 'Included ($1.50/sq.ft)' : 'Not selected'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Old Floor Removal:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{includeRemoval ? 'Included ($1.20/sq.ft)' : 'Not selected'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Est. Job Timeline:</span>
                  <span className="font-extrabold text-[#E85D04]">{estimatedDays}</span>
                </div>
              </div>
            </div>

            {/* Action CTA & Guarantee */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 relative z-10 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openBookModal(selectedMaterial.name)}
                className="w-full py-4 px-6 rounded-2xl bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-[#E85D04]/30 flex items-center justify-center gap-2 transition-all duration-300 group/btn cursor-pointer"
              >
                <span>Lock In Estimate & Book</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform shrink-0" />
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-manrope font-bold text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#E85D04] shrink-0" />
                <span>100% Free On-Site Measurement & Exact Quote</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

