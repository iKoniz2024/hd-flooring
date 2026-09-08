'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Calculator,
  Layers,
  ShieldCheck,
  Wrench,
  Grid,
  RefreshCw,
  Footprints,
  Ruler,
  Award,
} from 'lucide-react';
import { DarkModeToggle } from '@/components/interactive/DarkModeToggle';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useModal } from '@/lib/context/ModalContext';

const serviceLinks = [
  { name: 'Solid Hardwood Flooring', href: '/services/hardwood-flooring', icon: Layers },
  { name: 'Engineered Hardwood', href: '/services/engineered-hardwood-flooring', icon: Sparkles },
  { name: 'Luxury Vinyl (LVP/LVT)', href: '/services/luxury-vinyl-flooring', icon: ShieldCheck },
  { name: 'Laminate Flooring', href: '/services/laminate-flooring', icon: Award },
  { name: 'Carpet Flooring', href: '/services/carpet-flooring', icon: Sparkles },
  { name: 'Tile & Porcelain Flooring', href: '/services/tile-flooring', icon: Grid },
  { name: 'Stair Flooring & Capping', href: '/services/stair-flooring', icon: Footprints },
  { name: 'Flooring Replacement', href: '/services/flooring-replacement', icon: RefreshCw },
  { name: 'Floor Preparation & Subfloor', href: '/services/floor-preparation', icon: Ruler },
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      onMouseLeave={() => setServicesOpen(false)}
    >
      {/* Main Navbar - Light & Dark Mode */}
      <div
        className={`transition-all duration-300 ${scrolled
            ? 'bg-white/90 dark:bg-stone-950/90 backdrop-blur-md text-stone-900 dark:text-stone-100 border-b border-stone-200/80 dark:border-stone-800 shadow-xl py-2.5'
            : 'bg-white/95 dark:bg-stone-950/95 backdrop-blur-md text-stone-900 dark:text-stone-100 border-b border-stone-200/80 dark:border-stone-800 py-3.5 shadow-sm'
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
                className={`transition-colors duration-200 hover:text-[#E85D04] ${pathname === '/' ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
              >
                Home
              </Link>

              <Link
                href="/about-us"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${pathname === '/about-us' ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
              >
                About Us
              </Link>

              {/* Services Dropdown Trigger */}
              <div
                className="py-2"
                onMouseEnter={() => setServicesOpen(true)}
              >
                <Link
                  href="/services"
                  className={`flex items-center gap-1 transition-colors duration-200 hover:text-[#E85D04] ${pathname.startsWith('/services') ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                    }`}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-[#E85D04]' : ''
                      }`}
                  />
                </Link>
              </div>

              <Link
                href="/cost-calculator"
                className={`flex items-center gap-1.5 transition-colors duration-200 hover:text-[#E85D04] ${pathname === '/cost-calculator' ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
              >
                <Calculator className="w-3.5 h-3.5 text-[#E85D04]" />
                <span>Cost Calculator</span>
              </Link>

              <Link
                href="/projects"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${pathname.startsWith('/projects') ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
              >
                Project Gallery
              </Link>

              <Link
                href="/blog"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${pathname.startsWith('/blog') ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
              >
                Blog
              </Link>

              <Link
                href="/contact-us"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${pathname === '/contact-us' ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
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

      {/* Pure Full-Width Glassmorphism Services Mega Menu - NO EXTRA TEXT */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.98 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onMouseEnter={() => setServicesOpen(true)}
            className="absolute top-full left-0 right-0 w-full bg-white/80 dark:bg-stone-950/80 backdrop-blur-3xl border-b border-stone-200/80 dark:border-stone-800/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-50"
          >
            {/* Top glowing brand accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-80" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {serviceLinks.map((service) => {
                  const ItemIcon = service.icon;
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setServicesOpen(false)}
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/60 dark:bg-stone-900/50 hover:bg-white dark:hover:bg-stone-900 border border-stone-200/60 dark:border-stone-800/60 hover:border-[#E85D04]/50 shadow-xs hover:shadow-md transition-all duration-200 backdrop-blur-md"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 group-hover:bg-[#E85D04] group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-xs">
                          <ItemIcon className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-[#E85D04] transition-colors">
                          {service.name}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 dark:text-stone-500 group-hover:text-[#E85D04] group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800 overflow-hidden"
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






