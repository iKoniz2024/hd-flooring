'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useModal } from '@/lib/context/ModalContext';

export function Footer() {
  const { openBookModal } = useModal();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-red-500/20 pt-16 pb-12 font-inter relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo className="h-12" />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Professional flooring installation for Canadian homes & businesses. From hardwood and luxury vinyl to tile and carpet, we deliver exceptional craftsmanship and lasting quality.
            </p>
            <div className="flex items-center gap-4 text-xs text-sky-400 pt-2 font-manrope">
              <span className="flex items-center gap-1.5 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">
                <ShieldCheck className="w-4 h-4 text-red-500" /> 100% Workmanship Guarantee
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-manrope font-bold text-slate-100 text-sm tracking-wider uppercase text-red-500">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400 font-manrope">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-red-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-red-400 transition-colors">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-400 transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-red-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="font-manrope font-bold text-slate-100 text-sm tracking-wider uppercase text-sky-400">
              Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 font-manrope">
              <li>
                <Link href="/services/hardwood-flooring" className="hover:text-sky-400 transition-colors">
                  Hardwood Flooring
                </Link>
              </li>
              <li>
                <Link href="/services/engineered-hardwood-flooring" className="hover:text-sky-400 transition-colors">
                  Engineered Hardwood
                </Link>
              </li>
              <li>
                <Link href="/services/luxury-vinyl-flooring" className="hover:text-sky-400 transition-colors">
                  Luxury Vinyl
                </Link>
              </li>
              <li>
                <Link href="/services/laminate-flooring" className="hover:text-sky-400 transition-colors">
                  Laminate Flooring
                </Link>
              </li>
              <li>
                <Link href="/services/carpet-flooring" className="hover:text-sky-400 transition-colors">
                  Carpet Flooring
                </Link>
              </li>
              <li>
                <Link href="/services/tile-flooring" className="hover:text-sky-400 transition-colors">
                  Tile Installation
                </Link>
              </li>
              <li>
                <Link href="/services/flooring-replacement" className="hover:text-sky-400 transition-colors">
                  Flooring Replacement
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & CTA */}
          <div className="space-y-4">
            <h3 className="font-manrope font-bold text-slate-100 text-sm tracking-wider uppercase text-red-500">
              Contact & Areas
            </h3>
            <ul className="space-y-3 text-xs text-slate-400 font-manrope">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>+1 (416) 555-0199</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>info@hdflooringca.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Serving Toronto, GTA & Surrounding Canadian Regions</span>
              </li>
            </ul>

            <button
              onClick={() => openBookModal()}
              className="mt-2 w-full py-2.5 rounded-xl bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 text-red-400 font-manrope text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Request Consultation
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-manrope">
          <p>© {new Date().getFullYear()} HD Flooring Canada. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-red-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-red-400 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
