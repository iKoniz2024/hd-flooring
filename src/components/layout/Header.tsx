'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Sparkles, ArrowRight, Calculator, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { DarkModeToggle } from '@/components/interactive/DarkModeToggle';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useModal } from '@/lib/context/ModalContext';

const serviceLinks = [
  { name: 'Solid Hardwood Flooring', href: '/services/hardwood-flooring', desc: 'Timeless real wood beauty & durability' },
  { name: 'Engineered Hardwood', href: '/services/engineered-hardwood-flooring', desc: 'Modern multi-layer wood construction' },
  { name: 'Luxury Vinyl (LVP/LVT)', href: '/services/luxury-vinyl-flooring', desc: '100% Waterproof & low maintenance' },
  { name: 'Laminate Flooring', href: '/services/laminate-flooring', desc: 'Stylish & practical wood alternative' },
  { name: 'Carpet Flooring', href: '/services/carpet-flooring', desc: 'Plush, comfortable & acoustic control' },
  { name: 'Tile & Porcelain Flooring', href: '/services/tile-flooring', desc: 'Heavy-duty water resistance for kitchen & bath' },
  { name: 'Stair Flooring & Capping', href: '/services/stair-flooring', desc: 'Custom treads, risers & seamless stairs' },
  { name: 'Flooring Replacement', href: '/services/flooring-replacement', desc: 'Complete teardown & fresh installation' },
  { name: 'Floor Preparation & Subfloor', href: '/services/floor-preparation', desc: 'Precision leveling & subfloor readiness' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openBookModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">


      {/* Main Navbar - Light & Dark Mode */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 shadow-xl py-2.5'
            : 'bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 py-3.5 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <BrandLogo className="h-10 sm:h-11" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${
                  pathname === '/' ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                Home
              </Link>

              <Link
                href="/about-us"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${
                  pathname === '/about-us' ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                About Us
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={`flex items-center gap-1 transition-colors duration-200 hover:text-[#E85D04] py-1 ${
                    pathname.startsWith('/services') ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180 text-[#E85D04]' : ''
                    }`}
                  />
                </Link>

                {/* Mega Dropdown Menu */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full -left-6 w-96 pt-3"
                    >
                      <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl grid gap-1.5">
                        <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#E85D04] uppercase tracking-wider">
                            Flooring Solutions
                          </span>
                          <Link href="/services" className="text-[11px] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white flex items-center gap-1">
                            View All <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => {
                              setServicesOpen(false);
                            }}
                            className="p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors duration-150 group flex items-start justify-between"
                          >
                            <div>
                              <div className="text-xs font-semibold text-stone-900 dark:text-stone-200 group-hover:text-[#E85D04] transition-colors">
                                {service.name}
                              </div>
                              <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                                {service.desc}
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 group-hover:text-[#E85D04] group-hover:translate-x-1 transition-all mt-0.5 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/cost-calculator"
                className={`flex items-center gap-1.5 transition-colors duration-200 hover:text-[#E85D04] ${
                  pathname === '/cost-calculator' ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-[#E85D04]" />
                <span>Cost Calculator</span>
              </Link>

              <Link
                href="/projects"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${
                  pathname.startsWith('/projects') ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                Project Gallery
              </Link>

              <Link
                href="/blog"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${
                  pathname.startsWith('/blog') ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                Blog
              </Link>

              <Link
                href="/contact-us"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${
                  pathname === '/contact-us' ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              <DarkModeToggle />

              {/* Get Quote / Book Us CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openBookModal()}
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/25 transition-all duration-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>Get Quote</span>
              </motion.button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-[#E85D04] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 font-inter text-stone-800 dark:text-stone-200">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-[#E85D04]"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-[#E85D04]"
              >
                About Us
              </Link>

              <div className="space-y-2">
                <span className="block text-[#E85D04] text-xs font-bold uppercase tracking-wider">
                  Flooring Services
                </span>
                <div className="pl-3 space-y-2 border-l border-[#E85D04]/30">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-stone-600 dark:text-stone-400 hover:text-[#E85D04]"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/cost-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-semibold text-[#E85D04] hover:text-[#d45203]"
              >
                <Calculator className="w-4 h-4 text-[#E85D04]" />
                <span>Cost Calculator Studio</span>
              </Link>

              <Link
                href="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-[#E85D04]"
              >
                Project Gallery
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-[#E85D04]"
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-[#E85D04]"
              >
                Contact Us
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookModal();
                }}
                className="w-full py-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#E85D04]/20"
              >
                <Sparkles className="w-4 h-4" />
                Book Us Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


