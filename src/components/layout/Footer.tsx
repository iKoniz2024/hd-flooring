'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useModal } from '@/lib/context/ModalContext';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export function Footer() {
  const { openBookModal } = useModal();

  return (
    <div className="relative font-inter">
      {/* Top Slanted Diagonal Cut SVG Divider */}
      <div className="w-full overflow-hidden leading-none bg-transparent">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-16 text-[#333333] fill-current"
        >
          <path d="M0 120L1200 35V120H0Z" />
        </svg>
      </div>

      <footer className="bg-[#333333] text-stone-300 pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          
          {/* Top Row: Brand & Social Icons */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-600/50">
            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-3.5">
              <Link href="/">
                <BrandLogo className="h-10 text-white" />
              </Link>
              <span className="text-stone-500 text-base font-light">/</span>
              <span className="text-stone-400 text-xs sm:text-sm font-medium tracking-wide">
                Simply #1 Canadian Flooring Specialist
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-stone-400">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3 Columns Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-4">
            
            {/* Col 1: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wide">Quick Links</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-stone-300">
                <Link href="/" className="hover:text-[#E85D04] transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500">▸</span> Home
                </Link>
                <Link href="/services" className="hover:text-[#E85D04] transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500">▸</span> Services
                </Link>
                <Link href="/about-us" className="hover:text-[#E85D04] transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500">▸</span> About Us
                </Link>
                <Link href="/cost-calculator" className="hover:text-[#E85D04] transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500">▸</span> Calculator
                </Link>
                <Link href="/blog" className="hover:text-[#E85D04] transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500">▸</span> Blog
                </Link>
                <Link href="/projects" className="hover:text-[#E85D04] transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500">▸</span> Gallery
                </Link>
                <Link href="/contact-us" className="hover:text-[#E85D04] transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500">▸</span> Contact
                </Link>
              </div>
            </div>

            {/* Col 2: Contact Us */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wide">Contact Us</h4>
              <div className="space-y-3 text-xs text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>Saskatoon, SK & Greater Toronto Area, Canada</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                  <a href="tel:+18005553566" className="hover:text-[#E85D04] transition-colors">
                    +1 (800) 555-FLOOR
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                  <a href="mailto:info@hdflooringca.com" className="hover:text-[#E85D04] transition-colors">
                    info@hdflooringca.com
                  </a>
                </div>
              </div>
            </div>

            {/* Col 3: Book Free Consultation */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wide">Book Free Estimate</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Schedule a free on-site measurement & expert consultation for your home or business.
              </p>
              <button
                onClick={() => openBookModal()}
                className="px-6 py-2.5 bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Measurement</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-6 text-xs text-stone-400">
            <p>© {new Date().getFullYear()}. All rights reserved.</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
