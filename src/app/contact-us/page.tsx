'use client';

import { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-manrope font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Get In Touch
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-stone-100">
            Let's Discuss Your Flooring Project
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base font-inter">
            Whether you're planning a residential renovation, commercial space upgrade, or exploring flooring materials, we are ready to help.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8 p-8 rounded-3xl bg-stone-900 text-stone-100 border border-amber-500/20 shadow-2xl">
            <div className="space-y-2 font-manrope">
              <h3 className="font-playfair text-2xl font-bold text-stone-100">
                Contact Information
              </h3>
              <p className="text-xs text-stone-400">
                Reach out to our team directly via phone, email, or visit our office.
              </p>
            </div>

            <ul className="space-y-6 text-xs sm:text-sm font-manrope">
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-stone-400 text-xs uppercase tracking-wider">Phone</span>
                  <span className="font-bold text-stone-100">+1 (416) 555-0199</span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-stone-400 text-xs uppercase tracking-wider">Email</span>
                  <span className="font-bold text-stone-100">info@hdflooringca.com</span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-stone-400 text-xs uppercase tracking-wider">Service Areas</span>
                  <span className="font-bold text-stone-100">Toronto, Mississauga, Brampton, Vaughan, Oakville & GTA</span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-stone-400 text-xs uppercase tracking-wider">Business Hours</span>
                  <span className="font-bold text-stone-100">Monday - Saturday: 8:00 AM - 6:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-playfair text-2xl font-bold">Request Submitted!</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto font-manrope">
                  Thank you! An HD Flooring representative will review your message and reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-inter">
                <h3 className="font-playfair text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Request a Free Quote
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-manrope font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="David Miller"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:border-amber-500 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-manrope font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(416) 555-0199"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:border-amber-500 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-manrope font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:border-amber-500 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-manrope font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Service Required *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:border-amber-500 text-xs outline-none"
                    >
                      <option>Hardwood Flooring</option>
                      <option>Engineered Hardwood</option>
                      <option>Luxury Vinyl</option>
                      <option>Laminate Flooring</option>
                      <option>Carpet Flooring</option>
                      <option>Tile Flooring</option>
                      <option>Flooring Replacement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-manrope font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Project Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your space, timeline, or flooring preferences..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:border-amber-500 text-xs outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-manrope font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending Request...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
