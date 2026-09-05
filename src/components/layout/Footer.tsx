'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useModal } from '@/lib/context/ModalContext';

export function Footer() {
  const { openBookModal } = useModal();

  return (
    <footer className="bg-stone-100 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-t border-stone-200 dark:border-stone-800 pt-16 pb-12 font-inter relative overflow-hidden">
      {/* Animated Glowing Orb Background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-200 dark:border-stone-800"
        >
          {/* Column 1: Brand Info (Slide Left) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
            className="lg:col-span-2 space-y-4"
          >
            <Link href="/" className="inline-block hover:scale-105 transition-transform duration-300">
              <BrandLogo className="h-20 sm:h-24" />
            </Link>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-sm leading-relaxed">
              Professional flooring installation for Canadian homes & commercial spaces. Specialized in Solid Hardwood, Engineered Wood, Luxury Vinyl Planks (LVP), Laminate, Carpet & Tile Installation.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-3 py-1.5 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" /> 100% Workmanship Warranty
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-3 py-1.5 rounded-xl text-xs text-amber-600 dark:text-amber-400 shadow-sm"
              >
                <Clock className="w-4 h-4 text-amber-500" /> Mon - Sat: 8am - 7pm
              </motion.span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links (Slide Up) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
            }}
            className="space-y-4"
          >
            <h3 className="font-bold text-amber-600 dark:text-amber-500 text-xs tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400 font-medium">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about-us' },
                { label: 'Services Directory', href: '/services' },
                { label: 'Cost Calculator Studio', href: '/cost-calculator' },
                { label: 'Project Gallery', href: '/projects' },
                { label: 'Flooring Blog & Tips', href: '/blog' },
                { label: 'Contact Us', href: '/contact-us' },
              ].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Link href={item.href} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Flooring Categories (Zoom In) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
            }}
            className="space-y-4"
          >
            <h3 className="font-bold text-amber-600 dark:text-amber-500 text-xs tracking-wider uppercase">
              Flooring Categories
            </h3>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400 font-medium">
              {[
                { label: 'Solid Hardwood', href: '/services/hardwood-flooring' },
                { label: 'Engineered Hardwood', href: '/services/engineered-hardwood-flooring' },
                { label: 'Luxury Vinyl (LVP/LVT)', href: '/services/luxury-vinyl-flooring' },
                { label: 'Laminate Flooring', href: '/services/laminate-flooring' },
                { label: 'Carpet Installation', href: '/services/carpet-flooring' },
                { label: 'Tile & Porcelain', href: '/services/tile-flooring' },
                { label: 'Stairs & Capping', href: '/services/stair-flooring' },
                { label: 'Floor Replacement', href: '/services/flooring-replacement' },
                { label: 'Subfloor Preparation', href: '/services/floor-preparation' },
              ].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Link href={item.href} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Booking (Slide Right) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
            className="space-y-4"
          >
            <h3 className="font-bold text-amber-600 dark:text-amber-500 text-xs tracking-wider uppercase">
              Contact & Support
            </h3>
            <ul className="space-y-3 text-xs text-stone-600 dark:text-stone-400 font-medium">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <a href="tel:+18005553566" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  +1 (800) 555-FLOOR
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <a href="mailto:info@hdflooringca.com" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  info@hdflooringca.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Canadian Residential & Commercial Service Areas</span>
              </li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => openBookModal()}
              className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Book Free Consultation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom Bar (Fade In) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium"
        >
          <p>© {new Date().getFullYear()} HD Flooring Canada. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}



