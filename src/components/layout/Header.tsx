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
  Grid,
  RefreshCw,
  Footprints,
  Ruler,
  Award,
} from 'lucide-react';
import { DarkModeToggle } from '@/components/interactive/DarkModeToggle';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useModal } from '@/lib/context/ModalContext';

const defaultIcons = [Layers, Sparkles, ShieldCheck, Award, Grid, Footprints, RefreshCw, Ruler];

interface CategoryItem {
  id: string;
  name: string;
  href: string;
  icon: typeof Layers;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceLinks, setServiceLinks] = useState<CategoryItem[]>([]);
  const pathname = usePathname();
  const { openBookModal } = useModal();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch active categories from MongoDB via /api/categories dynamically
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.data)) {
          const formatted = data.data.map((cat: { _id?: string; name: string }, idx: number) => {
            const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return {
              id: cat._id || String(idx),
              name: cat.name,
              href: `/services/${slug}`,
              icon: defaultIcons[idx % defaultIcons.length],
            };
          });
          setServiceLinks(formatted);
        }
      } catch (err) {
        console.error('Error loading categories in Header:', err);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
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
              <BrandLogo className="h-10 sm:h-12 lg:h-14" />
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
                  className={`inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#E85D04] ${pathname.startsWith('/services') ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                    }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-[#E85D04]' : 'text-stone-400'
                      }`}
                  />
                </Link>
              </div>

              <Link
                href="/products"
                className={`transition-colors duration-200 hover:text-[#E85D04] ${pathname.startsWith('/products') ? 'text-[#E85D04] font-bold' : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
              >
                Products
              </Link>

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
            <div className="flex items-center gap-2.5">
              <DarkModeToggle />

              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/13068808404?text=Hi%20HD%20Flooring%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20flooring%20installation."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#25D366]/20 transition-all duration-300 shrink-0"
                aria-label="Chat on WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.999 1.597-1.059 3.868 3.963-1.04 1.547.942zm6.208-4.526c-.237.667-1.378 1.282-1.9 1.336-.503.053-1.157.075-1.859-.149-.425-.136-.973-.315-1.685-.623-2.997-1.296-4.945-4.341-5.096-4.542-.149-.2-1.226-1.631-1.226-3.111 0-1.479.774-2.207 1.05-2.507.275-.3.601-.375.801-.375.201 0 .401.002.576.01.188.008.438-.071.687.525.25.599.851 2.074.926 2.224.075.15.125.326.025.526-.1.2-.15.325-.301.5-.15.176-.314.394-.449.529-.15.15-.306.313-.131.613.175.3 0.778 1.284 1.669 2.077 1.144 1.02 2.109 1.337 2.409 1.487.3.15.476.126.652-.075.175-.201.751-.876.951-1.176.2-.3.401-.25.676-.15.275.1 1.752.826 2.052.976.3.15.5.225.576.35.075.126.075.726-.162 1.393z" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </motion.a>

              {/* Primary Call to Action */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openBookModal()}
                className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#E85D04]/20 transition-all duration-300 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Get Quote</span>
              </motion.button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Toggle Mobile Menu"
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
              {serviceLinks.length === 0 ? (
                <div className="text-center py-6 text-xs text-stone-500 font-medium">
                  No active services found. Add categories in Admin Panel.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {serviceLinks.map((service) => {
                    const ItemIcon = service.icon;
                    return (
                      <Link
                        key={service.id}
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
              )}
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

              {/* Mobile Services Accordion */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[#E85D04]">
                  Services We Offer
                </div>
                <div className="pl-3 space-y-2 border-l border-[#E85D04]/30">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.id}
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
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium hover:text-[#E85D04]"
              >
                Products
              </Link>

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

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <DarkModeToggle />
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookModal();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E85D04] text-white font-extrabold text-xs uppercase tracking-wider"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
