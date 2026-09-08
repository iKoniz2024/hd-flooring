'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const materials = [
  { id: 'solid-hardwood', name: 'Solid Hardwood Flooring', rate: 6.5, icon: Layers },
  { id: 'engineered-hardwood', name: 'Engineered Hardwood', rate: 5.8, icon: Award },
  { id: 'luxury-vinyl', name: 'Luxury Vinyl (LVP / LVT)', rate: 3.5, icon: ShieldCheck },
  { id: 'laminate-flooring', name: 'Laminate Flooring', rate: 3.2, icon: Ruler },
  { id: 'tile-flooring', name: 'Porcelain & Tile', rate: 7.0, icon: Grid },
  { id: 'carpet-flooring', name: 'Carpet & Underpad', rate: 3.8, icon: Sparkles },
  { id: 'stair-flooring', name: 'Stair Flooring & Capping', rate: 5.0, icon: Footprints },
  { id: 'sheet-vinyl', name: 'Sheet Vinyl & Coving', rate: 4.5, icon: Layers },
];

const sizePresets = [
  { label: '300 sq.ft', value: 300 },
  { label: '650 sq.ft', value: 650 },
  { label: '1,200 sq.ft', value: 1200 },
  { label: '2,500 sq.ft', value: 2500 },
];

export function LiveCostCalculator({ hideHeader = false }: { hideHeader?: boolean }) {
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
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter relative">
      {/* Outer Studio Card Container - Clean & Uncluttered */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 lg:p-10 relative">

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

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: 3 Clean Step Controls */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Step 1: Material Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-manrope font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#E85D04] text-white text-[11px] font-extrabold flex items-center justify-center">1</span>
                  Select Flooring Type
                </label>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Supply & Installation</span>
              </div>

              {/* Clean 2-Column Minimal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {materials.map((mat) => {
                  const isSelected = selectedMaterial.id === mat.id;
                  const Icon = mat.icon;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#E85D04] text-white border-[#E85D04] shadow-md shadow-[#E85D04]/20'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 text-slate-800 dark:text-slate-200 hover:border-[#E85D04]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-[#E85D04]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-xs tracking-tight truncate">{mat.name}</span>
                      </div>
                      <span className={`text-xs font-extrabold shrink-0 ${isSelected ? 'text-white' : 'text-[#E85D04]'}`}>
                        ${mat.rate.toFixed(2)}/ft²
                      </span>
                    </button>
                  );
                })}
              </div>
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
                    min="100"
                    max="5000"
                    value={sqft}
                    onChange={(e) => setSqft(Math.max(100, Number(e.target.value)))}
                    className="w-20 px-2.5 py-1 text-center font-manrope font-extrabold text-sm text-[#E85D04] bg-white dark:bg-slate-900 rounded-lg border border-[#E85D04]/40 outline-none"
                  />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">sq.ft</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="25"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#E85D04]"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <span>100 sq.ft</span>
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
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sqft === preset.value
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
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    includePrep
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
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    includeRemoval
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

          {/* Right Column: Clean Sticky Receipt Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E85D04]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 relative z-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
                  Estimate Summary
                </span>
                <span className="text-[11px] font-extrabold text-[#E85D04] bg-[#E85D04]/15 px-2.5 py-0.5 rounded-md border border-[#E85D04]/30">
                  Live Rates
                </span>
              </div>

              {/* Price Box */}
              <div className="text-center py-4 px-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 relative z-10">
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Estimated Total Investment
                </span>
                <motion.div
                  key={estimatedCost}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl sm:text-4xl font-black text-[#E85D04] tracking-tight"
                >
                  ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
                </motion.div>
                <span className="text-xs font-semibold text-slate-400 block pt-0.5">
                  Approx. <strong className="text-white">${totalRate.toFixed(2)}</strong> / sq.ft installed
                </span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-xs border-t border-slate-800 pt-3 relative z-10">
                <div className="flex justify-between text-slate-300">
                  <span>Selected Material:</span>
                  <span className="font-extrabold text-white">{selectedMaterial.name}</span>
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
                  onClick={() => openBookModal(selectedMaterial.name)}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all cursor-pointer"
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
      </div>
    </section>
  );
}
