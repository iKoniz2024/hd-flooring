'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, PhoneCall, Sparkles, Layers } from 'lucide-react';
import { DarkModeToggle } from '@/components/interactive/DarkModeToggle';

const serviceLinks = [
  { name: 'Hardwood Flooring', href: '/services/hardwood-flooring' },
  { name: 'Engineered Hardwood', href: '/services/engineered-hardwood-flooring' },
  { name: 'Luxury Vinyl Flooring', href: '/services/luxury-vinyl-flooring' },
  { name: 'Laminate Flooring', href: '/services/laminate-flooring' },
  { name: 'Carpet Flooring', href: '/services/carpet-flooring' },
  { name: 'Tile Flooring', href: '/services/tile-flooring' },
  { name: 'Stair Flooring', href: '/services/stair-flooring' },
  { name: 'Flooring Replacement', href: '/services/flooring-replacement' },
  { name: 'Floor Preparation', href: '/services/floor-preparation' },
];

export function Header({ onOpenBookModal }: { onOpenBookModal?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/85 dark:bg-stone-950/85 bg-white/80 border-b border-amber-500/20 backdrop-blur-md py-3 shadow-xl shadow-black/5 dark:shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-xl font-extrabold tracking-wider text-stone-900 dark:text-stone-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                HD <span className="text-amber-500 font-normal">FLOORING</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400 -mt-1 font-manrope">
                Canada Standards
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-manrope text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors duration-200 hover:text-amber-500 ${
                pathname === '/' ? 'text-amber-500 font-semibold' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className={`transition-colors duration-200 hover:text-amber-500 ${
                pathname === '/about-us' ? 'text-amber-500 font-semibold' : 'text-stone-700 dark:text-stone-300'
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
                className={`flex items-center gap-1 transition-colors duration-200 hover:text-amber-500 py-2 ${
                  pathname.startsWith('/services')
                    ? 'text-amber-500 font-semibold'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-amber-500' : ''
                  }`}
                />
              </Link>

              {/* Flyout Menu */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-64 pt-2"
                  >
                    <div className="p-2 rounded-2xl bg-stone-900/95 dark:bg-stone-950/95 bg-white/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-black/40 grid gap-1">
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-amber-400 hover:bg-amber-500/10 transition-colors duration-150 flex items-center justify-between group"
                        >
                          {service.name}
                          <span className="opacity-0 group-hover:opacity-100 text-amber-400 text-xs transition-opacity">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/projects"
              className={`transition-colors duration-200 hover:text-amber-500 ${
                pathname.startsWith('/projects')
                  ? 'text-amber-500 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              Project Gallery
            </Link>

            <Link
              href="/blog"
              className={`transition-colors duration-200 hover:text-amber-500 ${
                pathname.startsWith('/blog')
                  ? 'text-amber-500 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact-us"
              className={`transition-colors duration-200 hover:text-amber-500 ${
                pathname === '/contact-us' ? 'text-amber-500 font-semibold' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-4">
            {/* Dark / Light Toggle */}
            <DarkModeToggle />

            {/* Book Us CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenBookModal}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white font-manrope font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              Book Us
            </motion.button>

            {/* Mobile Menu Toggle */}
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-950/95 backdrop-blur-2xl border-b border-amber-500/20 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 font-manrope">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-amber-400 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-amber-400 text-sm font-medium"
              >
                About Us
              </Link>

              <div className="space-y-2">
                <span className="block text-amber-500 text-xs font-semibold uppercase tracking-wider">
                  Our Services
                </span>
                <div className="pl-3 space-y-2 border-l border-amber-500/30">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-stone-400 hover:text-stone-100 text-xs"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-amber-400 text-sm font-medium"
              >
                Project Gallery
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-amber-400 text-sm font-medium"
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-amber-400 text-sm font-medium"
              >
                Contact Us
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookModal?.();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
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
