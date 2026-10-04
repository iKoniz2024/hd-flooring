'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { servicesData, ServiceItem } from '@/data/services';
import { TiltCard } from '@/components/interactive/TiltCard';
import { useModal } from '@/lib/context/ModalContext';
import { fetchWithCache } from '@/lib/utils/apiCache';

export function ServicesGrid() {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const { openBookModal } = useModal();

  useEffect(() => {
    let isMounted = true;
    const fetchDynamicData = async () => {
      try {
        const [catData, prodData] = await Promise.all([
          fetchWithCache('/api/categories'),
          fetchWithCache('/api/products'),
        ]);

        const categories = catData.success && Array.isArray(catData.data) ? catData.data : [];
        const products = prodData.success && Array.isArray(prodData.data) ? prodData.data : [];

        if (isMounted) {
          if (categories.length > 0) {
            const dynamicServices: ServiceItem[] = categories.map((cat: { _id?: string; name: string; image?: string; description?: string }) => {
              const catIdStr = cat._id ? String(cat._id) : '';
              const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

              const existing = servicesData.find(
                (s) =>
                  s.slug === slug ||
                  s.title.toLowerCase() === cat.name.toLowerCase() ||
                  s.id === slug
              );

              // Find matching product image under this category if cat.image is empty
              const matchingProd = products.find(
                (p: { category?: string | object; categoryName?: string; image?: string }) => {
                  if (!p.image) return false;
                  const pCatStr = p.category ? String(p.category) : '';
                  if (catIdStr && pCatStr === catIdStr) return true;
                  if (p.categoryName && p.categoryName.toLowerCase() === cat.name.toLowerCase()) return true;
                  return false;
                }
              );

              const cardImage =
                (cat.image && cat.image.trim()) ||
                (matchingProd?.image && matchingProd.image.trim()) ||
                '';

              if (existing) {
                return {
                  ...existing,
                  title: cat.name,
                  heroImage: cardImage,
                };
              }

              return {
                id: cat._id || slug,
                slug: slug,
                title: cat.name,
                categoryTag: cat.name,
                tagline: `Professional ${cat.name} Installation & Service`,
                shortDesc:
                  cat.description ||
                  `Professional ${cat.name} installation and craftsmanship tailored for Canadian residential and commercial spaces.`,
                fullDesc: `At HD Flooring, we provide top-tier ${cat.name} services with precision craftsmanship, moisture protection, and zero-squeak guarantee.`,
                heroImage: cardImage,
                benefits: [
                  'Professional commercial & residential installation',
                  'Canadian climate & moisture-tested durability',
                  'Expert layout & precision fitting',
                  'Comprehensive warranty coverage',
                ],
                idealFor: ['Residential & Commercial'],
                process: [
                  'Site Assessment & Subfloor Prep',
                  'Underlayment Setup',
                  'Precision Fitting',
                  'Final Quality Inspection',
                ],
                faqs: [],
              };
            });

            setServices(dynamicServices);
          } else {
            setServices([]);
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic categories/products in ServicesGrid:', err);
      }
    };

    fetchDynamicData();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayedServices = showAll ? services : services.slice(0, 3);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter overflow-hidden">
      {/* Header - ipropertybd + hdflooringca styling */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-3"
      >
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E85D04] px-3.5 py-1 bg-white dark:bg-slate-900 border-l-4 border-[#E85D04] shadow-sm rounded-r-md border-y border-r border-slate-200 dark:border-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
          <span>Expert Solutions</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Flooring Services <span className="text-[#E85D04]">We Offer</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedServices.map((service, idx) => {
            const stepNumber = String(idx + 1).padStart(2, '0');
            const color = {
              topBar: 'bg-[#E85D04]',
              hoverBorder: 'hover:border-[#E85D04]/80',
              badgeBg: 'bg-[#E85D04] text-white shadow-[#E85D04]/30',
              tagText: 'text-[#E85D04] border-[#E85D04]/30',
              titleHover: 'group-hover:text-[#E85D04]',
              checkIcon: 'text-[#E85D04]',
              btnBg: 'bg-[#E85D04] hover:bg-[#d95b16] text-white shadow-lg shadow-[#E85D04]/25',
              arrowBg: 'bg-[#E85D04] group-hover:bg-[#d95b16] text-white',
            };

            // Directional entrance: Card 0 (Left), Card 1 (Up), Card 2 (Right)
            const entranceVariants = [
              { initial: { opacity: 0, x: -60, y: 30 }, whileInView: { opacity: 1, x: 0, y: 0 } },
              { initial: { opacity: 0, y: 60, scale: 0.95 }, whileInView: { opacity: 1, y: 0, scale: 1 } },
              { initial: { opacity: 0, x: 60, y: 30 }, whileInView: { opacity: 1, x: 0, y: 0 } },
            ];
            const motionVariant = entranceVariants[idx % 3];

            return (
              <motion.div
                key={service.id}
                layout
                initial={motionVariant.initial}
                whileInView={motionVariant.whileInView}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, type: 'spring', stiffness: 120 }}
              >
                <TiltCard>
                  <div 
                    onClick={() => router.push(`/services/${service.slug}`)}
                    className={`h-full rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800/90 ${color.hoverBorder} shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-500 ease-out hover:-translate-y-2 relative cursor-pointer`}
                  >
                    {/* Top Brand Accent Line */}
                    <div className={`h-1.5 w-0 group-hover:w-full ${color.topBar} transition-all duration-500`} />

                    {/* Image Banner */}
                    <div className="relative h-52 overflow-hidden bg-stone-900">
                      {service.heroImage ? (
                        <Image
                          src={service.heroImage}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                      {/* Number Overlay Badge */}
                      <div className={`absolute top-3 right-3 w-10 h-10 rounded-xl ${color.badgeBg} font-black text-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        {stepNumber}
                      </div>

                      {/* Tag */}
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span className={`text-[11px] font-bold ${color.tagText} bg-stone-950/90 px-3 py-1 rounded-full border backdrop-blur-md`}>
                          {service.idealFor[0] || 'Residential & Commercial'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className={`font-playfair text-xl font-extrabold text-stone-900 dark:text-stone-100 ${color.titleHover} transition-colors duration-300`}>
                          {service.title}
                        </h3>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 flex items-center justify-between gap-3 border-t border-stone-100 dark:border-stone-800/80">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openBookModal(service.title);
                          }}
                          className={`px-4 py-2 rounded-xl ${color.btnBg} font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Request Quote
                        </button>

                        <div className="text-xs font-bold text-[#E85D04] group-hover:underline flex items-center gap-1">
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show Less Toggle Button */}
      {services.length > 3 && (
        <div className="text-center pt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/25 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          >
            <span>{showAll ? 'Show Less' : 'Show More Services'}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}




