'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Phone, Mail, MapPin, Clock, Send, CheckCircle2, UserCheck, MessageSquare, Navigation } from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { useModal } from '@/lib/context/ModalContext';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openBookModal } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-x-clip">
      {/* Dynamic Mouse Spotlight & Ambient Lighting */}
      <MouseSpotlight />

      {/* Ambient background light blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Contact HD Flooring"
        badgeIcon={Phone}
        title="Get in Touch With Our Team"
        subtitle="Speak directly with Habibur Rahman and our Saskatchewan installation craftsmen for free quotes and project inquiries."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
        primaryCta={{
          label: 'Call +1 (306) 880-8404',
          href: 'tel:+13068808404',
        }}
        secondaryCta={{
          label: 'Schedule Estimate',
          onClick: openBookModal,
        }}
      />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16 relative z-10">

        {/* 2-COLUMN MAIN CONTACT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 5 COLS: CONTACT INFORMATION & FOUNDER PROFILE */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Main Info Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl space-y-8 relative overflow-hidden group">
              {/* Top Glowing Orange Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90 rounded-t-3xl" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Founder Header Profile */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800/80 relative z-10">
                <div className="relative w-16 h-16 rounded-2xl bg-slate-950 p-0.5 border-2 border-[#E85D04] shadow-md shrink-0 overflow-hidden">
                  <Image
                    src="/assets/images/personal-photos/habib-photo.jpg"
                    alt="Habibur Rahman (Habib)"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[10px] font-extrabold uppercase tracking-wider border border-[#E85D04]/30">
                    <UserCheck className="w-3 h-3" />
                    Managing Director
                  </div>
                  <h3 className="font-playfair text-xl font-extrabold text-slate-900 dark:text-white">
                    Habibur Rahman (Habib)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-manrope font-medium">
                    Lead Installation Specialist & Founder
                  </p>
                </div>
              </div>

              {/* Contact List */}
              <ul className="space-y-6 text-xs sm:text-sm font-manrope relative z-10">
                <li className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-extrabold">Phone Hotline</span>
                    <a href="tel:+13068808404" className="font-extrabold text-slate-900 dark:text-white hover:text-[#E85D04] transition-colors text-base">
                      +1 (306) 880-8404
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-extrabold">Email Address</span>
                    <a href="mailto:hdflooring7@gmail.com" className="font-bold text-slate-900 dark:text-white hover:text-[#E85D04] transition-colors">
                      hdflooring7@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-extrabold">Physical Address</span>
                    <span className="font-bold text-slate-900 dark:text-white leading-relaxed block">
                      211 47th St East, S7L 5H1, Saskatoon, SK, Canada
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-extrabold">Business Hours</span>
                    <span className="font-bold text-slate-900 dark:text-white">Monday - Saturday: 8:00 AM - 6:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* RIGHT 7 COLS: REQUEST A FREE QUOTE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden"
          >
            {/* Top Glowing Orange Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90 rounded-t-3xl" />

            {submitted ? (
              <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] flex items-center justify-center shadow-lg shadow-[#E85D04]/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-playfair text-3xl font-extrabold text-slate-900 dark:text-white">Request Submitted!</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto font-manrope">
                  Thank you! Habibur Rahman & the HD Flooring team will review your project details and reach out shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-inter">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-extrabold uppercase tracking-wider border border-[#E85D04]/30">
                    <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
                    <span>Free On-Site Consultation</span>
                  </div>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Request a Free Estimate
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-manrope font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="David Miller"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-[#E85D04] text-xs font-medium outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-manrope font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (306) 880-8404"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-[#E85D04] text-xs font-medium outline-none transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-manrope font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hdflooring7@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-[#E85D04] text-xs font-medium outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-manrope font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-[#E85D04] text-xs font-medium outline-none transition-colors shadow-sm cursor-pointer"
                    >
                      <option>Sheet Vinyl Coving / PVC</option>
                      <option>LVP / LVT / VCT Vinyl Planking</option>
                      <option>Self Leveling Compound</option>
                      <option>Hardwood Flooring</option>
                      <option>Engineered Hardwood</option>
                      <option>Laminate Flooring</option>
                      <option>Carpet Flooring</option>
                      <option>Tile & Porcelain</option>
                      <option>Flooring Repairs & Replacement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-manrope font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your room sizes, flooring preferences, repairs, or timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-[#E85D04] text-xs font-medium outline-none resize-none transition-colors shadow-sm"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#f06810] to-[#E85D04] hover:brightness-110 text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/30 inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white shrink-0" />
                  <span>{loading ? 'Sending Request...' : 'Submit Free Estimate Request'}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* EMBEDDED GOOGLE MAP LOCATION CARD */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-manrope font-extrabold text-[#E85D04] uppercase tracking-wider">
                <Navigation className="w-4 h-4 text-[#E85D04]" />
                <span>Our Location</span>
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Visit Our Office & Showroom
              </h3>
            </div>

            <a
              href="https://www.google.com/maps/place/52%C2%B009'58.7%22N+106%C2%B040'05.3%22W/@52.1663155,-106.6707048,17z/data=!3m1!4b1!4m4!3m3!8m2!3d52.1663155!4d-106.6681299"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#E85D04] hover:text-white text-slate-800 dark:text-slate-200 font-manrope font-extrabold text-xs transition-colors border border-slate-300 dark:border-slate-700 flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Map Frame Card */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-2xl h-80 sm:h-96 relative bg-slate-900">
            <iframe
              title="HD Flooring Location Map"
              src="https://maps.google.com/maps?q=52.1663155,-106.6681299&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </section>

      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
