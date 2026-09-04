'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const materials = [
  { id: 'lvp', name: 'LVP / Luxury Vinyl Plank', rate: 3.5, icon: '🪵' },
  { id: 'hardwood', name: 'Solid & Engineered Hardwood', rate: 6.5, icon: '🌳' },
  { id: 'sheet_vinyl', name: 'Sheet Vinyl & Coving (PVC)', rate: 5.0, icon: '✨' },
  { id: 'tile', name: 'Porcelain & Ceramic Tile', rate: 7.0, icon: '🏛️' },
  { id: 'vct', name: 'VCT Commercial Vinyl', rate: 4.0, icon: '🏢' },
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-inter">
      <div className="relative p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-red-500/30 backdrop-blur-2xl shadow-2xl shadow-red-500/10 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-3 mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-red-400 animate-pulse" />
            Live Instant Estimator
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Calculate Your Flooring Project Cost Live
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Adjust room size & material below for a real-time instant estimate in Saskatoon & area.
          </p>
        </div>

        {/* Interactive Controls & Live Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Controls (Left) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Material Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                1. Select Flooring Material
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
                      selectedMaterial.id === mat.id
                        ? 'bg-red-500/20 border-red-500 text-white shadow-lg shadow-red-500/10'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-lg">{mat.icon}</span>
                    <span className="flex-1 line-clamp-1">{mat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Room Size Slider */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-200">
                <span>2. Room Size (Square Feet)</span>
                <span className="text-base text-red-400 font-extrabold font-manrope">
                  {sqft.toLocaleString()} sq.ft
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-1">
                <span>100 sq.ft (Small Room)</span>
                <span>1,500 sq.ft (Whole House)</span>
                <span>3,000+ sq.ft (Commercial)</span>
              </div>
            </div>

            {/* 3. Add-on Services */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                3. Additional Subfloor Services
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300 cursor-pointer hover:bg-slate-800/70 transition-colors">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includePrep}
                      onChange={(e) => setIncludePrep(e.target.checked)}
                      className="rounded border-slate-600 text-red-500 focus:ring-red-500 w-4 h-4"
                    />
                    Subfloor Leveling & Cementitious Prep
                  </span>
                  <span className="text-slate-400 font-mono">+$1.50 / sq.ft</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300 cursor-pointer hover:bg-slate-800/70 transition-colors">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeRemoval}
                      onChange={(e) => setIncludeRemoval(e.target.checked)}
                      className="rounded border-slate-600 text-red-500 focus:ring-red-500 w-4 h-4"
                    />
                    Old Flooring Removal & Haul-off
                  </span>
                  <span className="text-slate-400 font-mono">+$1.20 / sq.ft</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Estimate Card (Right) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-red-500/40 shadow-2xl flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Estimate Breakdown
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Quote
                </span>
              </div>

              {/* Price Range */}
              <div className="py-2 text-center">
                <span className="text-xs text-slate-400 font-medium block mb-1">
                  Estimated Total Investment:
                </span>
                <motion.div
                  key={estimatedCost}
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl sm:text-4xl font-extrabold text-red-400 font-manrope tracking-tight"
                >
                  ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
                </motion.div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  (Approx. ${totalRate.toFixed(2)} / sq.ft installed)
                </span>
              </div>

              {/* Details List */}
              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Material:</span>
                  <span className="font-semibold text-slate-200">{selectedMaterial.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Coverage Area:</span>
                  <span className="font-semibold text-slate-200">{sqft} sq.ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Installation Time:</span>
                  <span className="font-semibold text-sky-400">{estimatedDays}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-2.5 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openBookModal(selectedMaterial.name)}
                className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Lock In Estimate & Book</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </motion.button>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>100% Free On-Site Measurement & Exact Quote</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
