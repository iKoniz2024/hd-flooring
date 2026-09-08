'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Calendar, MapPin, User, Phone, Mail, FileText } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const serviceOptions = [
  'Solid Hardwood Flooring',
  'Engineered Hardwood',
  'Luxury Vinyl (LVP / LVT / VCT)',
  'Laminate Flooring',
  'Carpet Flooring',
  'Tile & Porcelain Installation',
  'Stair Flooring & Capping',
  'Floor Preparation & Subfloor Leveling',
  'Flooring Repairs & Replacement',
  'Other / Custom Commercial Project',
];

export function BookUsModal() {
  const { isBookModalOpen, closeBookModal, selectedService } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: selectedService || 'Solid Hardwood Flooring',
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
      service: 'Solid Hardwood Flooring',
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
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 backdrop-blur-2xl border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 font-inter"
          >
            {/* Header Banner */}
            <div className="bg-[#E85D04] p-6 text-white flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-white">
                  <Sparkles className="w-4 h-4 text-white" />
                  Free In-Home Consultation & Estimate
                </div>
                <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white">
                  Book Your Flooring Project
                </h2>
              </div>
              <button
                onClick={closeBookModal}
                className="relative z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] flex items-center justify-center shadow-lg shadow-[#E85D04]/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-playfair text-2xl font-bold text-stone-900 dark:text-white">
                      Thank You! Request Received
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                      Our HD Flooring consultation team will reach out to confirm your project details and scheduling options.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#E85D04]/20 cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-[#E85D04]" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="e.g. David Miller"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-[#E85D04] text-stone-900 dark:text-stone-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#E85D04]" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="e.g. (800) 555-FLOOR"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-[#E85D04] text-stone-900 dark:text-stone-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#E85D04]" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="info@hdflooringca.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-[#E85D04] text-stone-900 dark:text-stone-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Service Required *
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-[#E85D04] text-stone-900 dark:text-stone-100 text-sm outline-none"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Property Type
                      </label>
                      <div className="flex items-center gap-3 pt-2">
                        {['Residential', 'Commercial'].map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="propertyType"
                              value={type}
                              checked={formData.propertyType === type}
                              onChange={(e) =>
                                setFormData({ ...formData, propertyType: e.target.value })
                              }
                              className="accent-[#E85D04]"
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Project Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#E85D04]" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="City / Region"
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-[#E85D04] text-stone-900 dark:text-stone-100 text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-[#E85D04]" />
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) =>
                            setFormData({ ...formData, preferredDate: e.target.value })
                          }
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-[#E85D04] text-stone-900 dark:text-stone-100 text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                      Project Details / Room Dimensions
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3 w-4 h-4 text-[#E85D04]" />
                      <textarea
                        rows={3}
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        placeholder="Tell us about room sizes, flooring removal needs, subfloor condition, or timeline..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-[#E85D04] text-stone-900 dark:text-stone-100 text-xs outline-none resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#E85D04]/25 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-pulse">Submitting Request...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
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

