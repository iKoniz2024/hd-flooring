'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useModal } from '@/lib/context/ModalContext';

export function Footer() {
  const { openBookModal } = useModal();

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-red-500/20 pt-16 pb-12 font-inter relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800"
        >
          {/* Brand Info - Slide Left */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            }}
            className="lg:col-span-2 space-y-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo className="h-12" />
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Professional flooring installation for Canadian homes & businesses. Specialized in Sheet Vinyl, PVC, LVP, LVT, VCT, Hardwood, Carpet, Tile & Floor Leveling.
            </p>
            <div className="flex items-center gap-4 text-xs text-sky-600 dark:text-sky-400 pt-2 font-manrope">
              <span className="flex items-center gap-1.5 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">
                <ShieldCheck className="w-4 h-4 text-red-500" /> 100% Workmanship Guarantee
              </span>
            </div>
          </motion.div>

          {/* Quick Links - Slide Up */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="space-y-4"
          >
            <h3 className="font-manrope font-bold text-slate-900 dark:text-slate-100 text-sm tracking-wider uppercase text-red-600 dark:text-red-500">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400 font-manrope">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-red-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-red-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-red-500 transition-colors">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-500 transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services Links - Zoom In */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
            }}
            className="space-y-4"
          >
            <h3 className="font-manrope font-bold text-slate-900 dark:text-slate-100 text-sm tracking-wider uppercase text-sky-600 dark:text-sky-400">
              Our Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-manrope">
              <li>
                <Link
                  href="/services/hardwood-flooring"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Solid Hardwood Flooring
                </Link>
              </li>
              <li>
                <Link
                  href="/services/engineered-hardwood-flooring"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Engineered Hardwood
                </Link>
              </li>
              <li>
                <Link
                  href="/services/luxury-vinyl-flooring"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Luxury Vinyl & Sheet Vinyl
                </Link>
              </li>
              <li>
                <Link
                  href="/services/laminate-flooring"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Laminate Flooring
                </Link>
              </li>
              <li>
                <Link
                  href="/services/carpet-flooring"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Carpet Flooring
                </Link>
              </li>
              <li>
                <Link
                  href="/services/tile-flooring"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Tile & Porcelain
                </Link>
              </li>
              <li>
                <Link
                  href="/services/stair-flooring"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Stair Flooring & Capping
                </Link>
              </li>
              <li>
                <Link
                  href="/services/flooring-replacement"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Flooring Repairs & Replacement
                </Link>
              </li>
              <li>
                <Link
                  href="/services/floor-preparation"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition-colors"
                >
                  Self Leveling & Floor Prep
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Official Contact Details - Slide Right */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            }}
            className="space-y-4"
          >
            <h3 className="font-manrope font-bold text-slate-900 dark:text-slate-100 text-sm tracking-wider uppercase text-red-600 dark:text-red-500">
              Contact Us
            </h3>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-manrope">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <a href="tel:+13068808404" className="hover:text-red-500 transition-colors">
                  +1 (306) 880-8404
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <a href="mailto:hdflooring7@gmail.com" className="hover:text-red-500 transition-colors">
                  hdflooring7@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>211 47th St East, S7L 5H1, Saskatoon, SK, Canada</span>
              </li>
            </ul>

            <button
              onClick={() => openBookModal()}
              className="mt-2 w-full py-2.5 rounded-xl bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 text-red-600 dark:text-red-400 font-manrope text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              Request Consultation
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-manrope">
          <p>© {new Date().getFullYear()} HD Flooring Canada. Managing Director: Habibur Rahman (Habib).</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-red-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-red-500 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

