'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Calendar, MapPin, User, Phone, Mail, FileText } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const serviceOptions = [
  'Sheet Vinyl Coving & PVC',
  'LVP / LVT / VCT Luxury Vinyl',
  'Solid Hardwood Flooring',
  'Engineered Hardwood',
  'Laminate Flooring',
  'Carpet Flooring',
  'Tile & Porcelain Installation',
  'Stair Flooring & Capping',
  'Self Leveling & Floor Prep',
  'Flooring Repairs & Replacement',
  'Other / Custom Project',
];

export function BookUsModal() {
  const { isBookModalOpen, closeBookModal, selectedService } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: selectedService || 'LVP / LVT / VCT Luxury Vinyl',
    propertyType: 'Residential',
    location: '',
    preferredDate: '',
    details: '',
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: 'LVP / LVT / VCT Luxury Vinyl',
      propertyType: 'Residential',
      location: '',
      preferredDate: '',
      details: '',
    });
    closeBookModal();
  };

  return (
    <AnimatePresence>
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookModal}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-slate-900/95 dark:bg-slate-950/95 bg-white/95 backdrop-blur-2xl border border-red-500/30 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden z-10"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-sky-600 p-6 text-white flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-manrope font-bold text-sky-200">
                  <Sparkles className="w-4 h-4 text-sky-200" />
                  Free Site Consultation & Quote
                </div>
                <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white">
                  Book Your Flooring Service
                </h2>
              </div>
              <button
                onClick={closeBookModal}
                className="relative z-10 p-2 rounded-full bg-slate-950/30 hover:bg-slate-950/50 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 font-inter">
              {submitted ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-playfair text-2xl font-bold text-slate-100">
                      Thank You for Reaching Out!
                    </h3>
                    <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-manrope">
                      Your request has been received. A member of the HD Flooring team will contact you shortly to confirm your consultation details.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-manrope font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-red-600/20"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-manrope font-medium text-slate-300">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="e.g. David Miller"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-red-500 text-slate-100 text-sm placeholder:text-slate-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-manrope font-medium text-slate-300">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="e.g. (306) 880-8404"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-red-500 text-slate-100 text-sm placeholder:text-slate-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-manrope font-medium text-slate-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="hdflooring7@gmail.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-red-500 text-slate-100 text-sm placeholder:text-slate-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-manrope font-medium text-slate-300">
                        Service Required *
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-red-500 text-slate-100 text-sm outline-none"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-manrope font-medium text-slate-300">
                        Property Type
                      </label>
                      <div className="flex items-center gap-3 pt-1">
                        {['Residential', 'Commercial'].map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="propertyType"
                              value={type}
                              checked={formData.propertyType === type}
                              onChange={(e) =>
                                setFormData({ ...formData, propertyType: e.target.value })
                              }
                              className="accent-red-500"
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-manrope font-medium text-slate-300">
                        Project Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-sky-400" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="Saskatoon / SK"
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-red-500 text-slate-100 text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-manrope font-medium text-slate-300">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-sky-400" />
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) =>
                            setFormData({ ...formData, preferredDate: e.target.value })
                          }
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-red-500 text-slate-100 text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-manrope font-medium text-slate-300">
                      Message / Project Details
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
                      <textarea
                        rows={3}
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        placeholder="Tell us about room sizes, sheet vinyl coving, LVP/LVT, board repairs, or timeline..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-red-500 text-slate-100 text-xs outline-none resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 hover:brightness-110 text-white font-manrope font-extrabold text-[11px] sm:text-xs uppercase tracking-widest shadow-xl shadow-red-600/20 transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    {loading ? (
                      <span className="animate-pulse">Submitting Request...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200 shrink-0" />
                        <span>Request Free Consultation</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
