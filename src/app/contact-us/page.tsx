'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Phone, Mail, MapPin, Clock, Send, CheckCircle2, UserCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

import { PageHero } from '@/components/sections/PageHero';
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
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Get In Touch"
        title="Let's Discuss Your Flooring Project"
        subtitle="Whether you're planning a residential renovation, commercial space upgrade, or exploring Sheet Vinyl, LVP, LVT, VCT, or Hardwood flooring, we are ready to help."
        backgroundImage="/assets/images/team-company/team-company-04.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
        primaryCta={{
          label: 'Call (304) 931-1555',
          href: 'tel:3049311555',
        }}
        secondaryCta={{
          label: 'Schedule Estimate',
          onClick: openBookModal,
        }}
      />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16 overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Info Side - Slide In From Left + Zoom */}
          <motion.div
            initial={{ opacity: 0, x: -70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-8 p-8 rounded-3xl bg-slate-900 text-slate-100 border border-red-500/20 shadow-2xl"
          >
            <div className="space-y-2 font-manrope">
              <h3 className="font-playfair text-2xl font-bold text-slate-100">
                Contact Information
              </h3>
              <p className="text-xs text-slate-400">
                Reach out directly to HD Flooring management and technical team.
              </p>
            </div>

            <ul className="space-y-6 text-xs sm:text-sm font-manrope">
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider">Managing Director</span>
                  <span className="font-bold text-slate-100">Habibur Rahman (Habib)</span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider">Phone</span>
                  <a href="tel:+13068808404" className="font-bold text-slate-100 hover:text-red-400 transition-colors">
                    +1 (306) 880-8404
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider">Email</span>
                  <a href="mailto:hdflooring7@gmail.com" className="font-bold text-slate-100 hover:text-red-400 transition-colors">
                    hdflooring7@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider">Physical Address</span>
                  <span className="font-bold text-slate-100">211 47th St East, S7L 5H1, Saskatoon, SK, Canada</span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider">Business Hours</span>
                  <span className="font-bold text-slate-100">Monday - Saturday: 8:00 AM - 6:00 PM</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Form Side - Slide In From Right + Zoom */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            {submitted ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-playfair text-2xl font-bold">Request Submitted!</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-manrope">
                  Thank you! Habibur Rahman & the HD Flooring team will review your project details and reach out shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-inter">
                <h3 className="font-playfair text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Request a Free Quote
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-manrope font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="David Miller"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-red-500 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-manrope font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (306) 880-8404"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-red-500 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-manrope font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hdflooring7@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-red-500 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-manrope font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Service Required *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-red-500 text-xs outline-none"
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
                  <label className="block text-xs font-manrope font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your room sizes, flooring preferences, repairs, or timeline..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-red-500 text-xs outline-none resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-sky-600 hover:brightness-110 text-white font-manrope font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Send className="w-4 h-4 text-sky-200 shrink-0" />
                  <span>{loading ? 'Sending Request...' : 'Submit Request'}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

