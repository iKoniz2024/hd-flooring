'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import { DarkModeToggle } from '@/components/interactive/DarkModeToggle';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useModal } from '@/lib/context/ModalContext';

const serviceLinks = [
  { name: 'Solid Hardwood Flooring', href: '/services/hardwood-flooring' },
  { name: 'Engineered Hardwood', href: '/services/engineered-hardwood-flooring' },
  { name: 'Luxury Vinyl & Sheet Vinyl', href: '/services/luxury-vinyl-flooring' },
  { name: 'Laminate Flooring', href: '/services/laminate-flooring' },
  { name: 'Carpet Flooring', href: '/services/carpet-flooring' },
  { name: 'Tile & Porcelain Flooring', href: '/services/tile-flooring' },
  { name: 'Stair Flooring & Capping', href: '/services/stair-flooring' },
  { name: 'Flooring Repairs & Replacement', href: '/services/flooring-replacement' },
  { name: 'Self Leveling & Floor Prep', href: '/services/floor-preparation' },
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-red-500/20 backdrop-blur-md py-3 shadow-xl shadow-slate-900/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <BrandLogo className="h-11" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-manrope text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors duration-200 hover:text-red-500 ${
                pathname === '/' ? 'text-red-500 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className={`transition-colors duration-200 hover:text-red-500 ${
                pathname === '/about-us' ? 'text-red-500 font-bold' : 'text-slate-700 dark:text-slate-300'
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
                className={`flex items-center gap-1 transition-colors duration-200 hover:text-red-500 py-2 ${
                  pathname.startsWith('/services')
                    ? 'text-red-500 font-bold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-red-500' : ''
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
                    className="absolute top-full left-0 w-72 pt-2"
                  >
                    <div className="p-2 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-red-500/30 shadow-2xl shadow-black/40 grid gap-1">
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => {
                            setServicesOpen(false);
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                          }}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150 flex items-center justify-between group"
                        >
                          {service.name}
                          <span className="opacity-0 group-hover:opacity-100 text-sky-400 text-xs transition-opacity">
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
              className={`transition-colors duration-200 hover:text-red-500 ${
                pathname.startsWith('/projects')
                  ? 'text-red-500 font-bold'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Project Gallery
            </Link>

            <Link
              href="/blog"
              className={`transition-colors duration-200 hover:text-red-500 ${
                pathname.startsWith('/blog')
                  ? 'text-red-500 font-bold'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact-us"
              className={`transition-colors duration-200 hover:text-red-500 ${
                pathname === '/contact-us' ? 'text-red-500 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />

            {/* Book Us CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openBookModal()}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-sky-600 text-white font-manrope font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200" />
              <span>Book Us</span>
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-red-500 focus:outline-none"
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-red-500/20 overflow-hidden"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
              className="px-6 py-6 space-y-4 font-manrope"
            >
              <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -15 } }}>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-200 hover:text-red-400 text-sm font-medium"
                >
                  Home
                </Link>
              </motion.div>

              <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -15 } }}>
                <Link
                  href="/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-200 hover:text-red-400 text-sm font-medium"
                >
                  About Us
                </Link>
              </motion.div>

              <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -15 } }} className="space-y-2">
                <span className="block text-red-500 text-xs font-bold uppercase tracking-wider">
                  Our Services
                </span>
                <div className="pl-3 space-y-2 border-l border-sky-500/30">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}
                      className="block text-slate-400 hover:text-slate-100 text-xs transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -15 } }}>
                <Link
                  href="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-200 hover:text-red-400 text-sm font-medium"
                >
                  Project Gallery
                </Link>
              </motion.div>

              <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -15 } }}>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-200 hover:text-red-400 text-sm font-medium"
                >
                  Blog
                </Link>
              </motion.div>

              <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -15 } }}>
                <Link
                  href="/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-200 hover:text-red-400 text-sm font-medium"
                >
                  Contact Us
                </Link>
              </motion.div>

              <motion.div variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 10 } }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-sky-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-sky-200" />
                  Book Us Now
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
