'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Hammer, Footprints, Grid, Maximize2, Shield, Flame, Paintbrush, ShieldCheck, Loader2 } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';
import { TiltCard } from '@/components/interactive/TiltCard';
import { fetchWithCache } from '@/lib/utils/apiCache';

const serviceIcons = [Layers, Hammer, Footprints, Grid, Maximize2, Shield, Flame, Paintbrush, ShieldCheck];

import Image from 'next/image';

interface DynamicCategoryService {
  id: string;
  title: string;
  shortDesc: string;
  slug: string;
  image?: string;
}

const getServiceVariant = (idx: number) => {
  switch (idx % 6) {
    case 0:
      return { initial: { opacity: 0, x: -60, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } };
    case 1:
      return { initial: { opacity: 0, scale: 0.75 }, animate: { opacity: 1, scale: 1 } };
    case 2:
      return { initial: { opacity: 0, x: 60, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } };
    case 3:
      return { initial: { opacity: 0, y: 60, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } };
    case 4:
      return { initial: { opacity: 0, scale: 1.25 }, animate: { opacity: 1, scale: 1 } };
    case 5:
    default:
      return { initial: { opacity: 0, y: -50, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } };
  }
};

export function ServicesGridClient() {
  const router = useRouter();
  const { openBookModal } = useModal();
  const [services, setServices] = useState<DynamicCategoryService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchActiveCategories = async () => {
      try {
        const data = await fetchWithCache('/api/categories');
        if (isMounted && data.success && Array.isArray(data.data)) {
          const formatted = data.data.map((cat: { _id?: string; name: string; image?: string; description?: string }) => {
            const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return {
              id: cat._id || slug,
              title: cat.name,
              image: cat.image || '',
              shortDesc: cat.description || `Professional ${cat.name} installation and craftsmanship tailored for Canadian residential and commercial spaces.`,
              slug: slug,
            };
          });
          setServices(formatted);
        }
      } catch (err) {
        console.error('Error loading dynamic services grid:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchActiveCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading active services from database...</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="py-16 text-center bg-stone-50 dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-8 space-y-3">
        <Layers className="w-12 h-12 mx-auto text-stone-400" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Active Services Found</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Create categories in the Admin Panel to display them dynamically as services here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        const v = getServiceVariant(index);
        const IconComponent = serviceIcons[index % serviceIcons.length];
        const stepNum = String(index + 1).padStart(2, '0');

        const color = {
          topBar: 'bg-[#E85D04]',
          iconBg: 'bg-[#E85D04]/10 text-[#E85D04] border-[#E85D04]/30 group-hover:bg-[#E85D04] group-hover:text-white',
          numBadge: 'bg-[#E85D04] text-white shadow-[#E85D04]/30',
          titleHover: 'group-hover:text-[#E85D04]',
          btnBg: 'bg-[#E85D04] text-white hover:bg-[#d45203]',
        };

        return (
          <motion.div
            key={service.id}
            initial={v.initial}
            whileInView={v.animate}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <TiltCard>
              <div 
                onClick={() => router.push(`/services/${service.slug}`)}
                className="p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:bg-white/95 dark:hover:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-[#E85D04]/60 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-500 ease-out hover:-translate-y-2 h-full cursor-pointer relative space-y-4"
              >
                {/* Top Accent Line */}
                <div className={`h-1.5 w-0 group-hover:w-full ${color.topBar} transition-all duration-500 absolute top-0 left-0 rounded-t-3xl`} />

                {/* Category Banner Image if present */}
                {service.image ? (
                  <div className="relative h-44 w-full -mx-7 -mt-7 mb-2 overflow-hidden bg-slate-900">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className={`w-8 h-8 rounded-lg ${color.numBadge} font-extrabold text-xs flex items-center justify-center shadow-md`}>
                        {stepNum}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Card Header: Vector Icon + Number Badge */
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${color.iconBg} border flex items-center justify-center font-bold shadow-md transition-all duration-500 group-hover:scale-110`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className={`w-9 h-9 rounded-xl ${color.numBadge} font-extrabold text-xs flex items-center justify-center shadow-md`}>
                      {stepNum}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-2">
                  <h3 className={`font-jakarta text-xl font-extrabold text-slate-900 dark:text-slate-100 ${color.titleHover} transition-colors`}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 flex items-center justify-between gap-2.5 border-t border-slate-100 dark:border-slate-800/80 font-manrope">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openBookModal(service.title);
                    }}
                    className={`px-4 py-2 rounded-xl ${color.btnBg} font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Request Quote
                  </button>

                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#E85D04] flex items-center gap-1 group/link shrink-0">
                    Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-[#E85D04]" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        );
      })}
    </div>
  );
}
