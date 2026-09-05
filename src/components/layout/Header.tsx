'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Sparkles, ArrowRight, Calculator } from 'lucide-react';
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
            ? 'bg-white/95 dark:bg-stone-950/95 text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 backdrop-blur-md py-3 shadow-xl'
            : 'bg-white/80 dark:bg-stone-950/80 text-stone-900 dark:text-stone-100 backdrop-blur-md py-4 border-b border-stone-200/60 dark:border-stone-800/60'
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
                className={`transition-colors duration-200 hover:text-amber-500 ${
                  pathname === '/' ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                Home
              </Link>

              <Link
                href="/about-us"
                className={`transition-colors duration-200 hover:text-amber-500 ${
                  pathname === '/about-us' ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
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
                  className={`flex items-center gap-1 transition-colors duration-200 hover:text-sky-500 py-1 ${
                    pathname.startsWith('/services') ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180 text-sky-500' : ''
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
                          <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-sky-500 uppercase tracking-wider">
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
                              <div className="text-xs font-semibold text-stone-900 dark:text-stone-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                {service.name}
                              </div>
                              <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                                {service.desc}
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 group-hover:text-sky-500 group-hover:translate-x-1 transition-all mt-0.5 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/cost-calculator"
                className={`flex items-center gap-1.5 transition-colors duration-200 hover:text-red-500 ${
                  pathname === '/cost-calculator' ? 'text-red-600 dark:text-red-400 font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-red-500" />
                <span>Cost Calculator</span>
              </Link>

              <Link
                href="/projects"
                className={`transition-colors duration-200 hover:text-sky-500 ${
                  pathname.startsWith('/projects') ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                Project Gallery
              </Link>

              <Link
                href="/blog"
                className={`transition-colors duration-200 hover:text-amber-500 ${
                  pathname.startsWith('/blog') ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                Blog
              </Link>

              <Link
                href="/contact-us"
                className={`transition-colors duration-200 hover:text-red-500 ${
                  pathname === '/contact-us' ? 'text-red-600 dark:text-red-400 font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              <DarkModeToggle />

              {/* Book Us CTA - Red/Amber/Sky Multi Brand Gradient */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openBookModal()}
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-sky-500 hover:from-red-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all duration-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Book Us</span>
              </motion.button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-amber-500 focus:outline-none"
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
                className="block text-sm font-medium hover:text-amber-500"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-amber-500"
              >
                About Us
              </Link>

              <div className="space-y-2">
                <span className="block text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-wider">
                  Flooring Services
                </span>
                <div className="pl-3 space-y-2 border-l border-amber-500/30">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/cost-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500"
              >
                <Calculator className="w-4 h-4 text-amber-500" />
                <span>Cost Calculator Studio</span>
              </Link>

              <Link
                href="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-amber-500"
              >
                Project Gallery
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-amber-500"
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-amber-500"
              >
                Contact Us
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookModal();
                }}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
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


