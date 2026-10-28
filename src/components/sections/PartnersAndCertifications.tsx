'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, ShieldCheck, Award, Handshake, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchWithCache, subscribeApiCache } from '@/lib/utils/apiCache';

export interface PartnerItem {
  _id: string;
  name: string;
  type: 'manufacturer' | 'membership' | 'certification';
  logo: string;
  websiteUrl?: string;
  isActive: boolean;
  order: number;
}

interface PartnersAndCertificationsProps {
  className?: string;
  showMembershipsOnly?: boolean;
  showMembershipsAndCertificationsOnly?: boolean;
  showManufacturersOnly?: boolean;
  variant?: 'default' | 'bento';
}

export function PartnersAndCertifications({
  className = '',
  showMembershipsOnly = false,
  showMembershipsAndCertificationsOnly = false,
  showManufacturersOnly = false,
  variant = 'default',
}: PartnersAndCertificationsProps) {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPartners = async () => {
      try {
        const res = await fetchWithCache<{ success: boolean; data: PartnerItem[] }>('/api/partners');
        if (isMounted && res && res.success && Array.isArray(res.data)) {
          setPartners(res.data.filter((p) => p.isActive !== false));
        }
      } catch (err) {
        console.error('Failed to load partners:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPartners();

    // Subscribe to cache invalidation / updates for instant 0ms synchronization
    const unsubscribe = subscribeApiCache((url, updatedData) => {
      if (url === '/api/partners' || url === '*') {
        if (updatedData && updatedData.data) {
          setPartners(updatedData.data.filter((p: PartnerItem) => p.isActive !== false));
        } else {
          loadPartners();
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Segment by type
  const memberships = useMemo(() => partners.filter((p) => p.type === 'membership'), [partners]);
  const certifications = useMemo(() => partners.filter((p) => p.type === 'certification'), [partners]);
  const manufacturers = useMemo(() => partners.filter((p) => p.type === 'manufacturer'), [partners]);

  // Build structured sub-categories for clear "which is what" visual differentiation
  const categories = useMemo(() => {
    const list: {
      key: string;
      title: string;
      desc: string;
      subtitle: string;
      badge: string;
      icon: typeof Award;
      items: PartnerItem[];
    }[] = [];

    if (!showManufacturersOnly && certifications.length > 0) {
      list.push({
        key: 'certification',
        title: 'Certifications & Accreditations',
        desc: 'Independently audited compliance & quality craftsmanship standards.',
        subtitle: `${certifications.length} ${certifications.length === 1 ? 'Credential' : 'Credentials'}`,
        badge: '100% Verified Standards',
        icon: Award,
        items: certifications,
      });
    }

    if (!showManufacturersOnly && memberships.length > 0) {
      list.push({
        key: 'membership',
        title: 'Industry Association Memberships',
        desc: 'Official active memberships with recognized flooring associations.',
        subtitle: `${memberships.length} ${memberships.length === 1 ? 'Membership' : 'Memberships'}`,
        badge: 'Active Industry Standing',
        icon: Handshake,
        items: memberships,
      });
    }

    if (!showMembershipsOnly && !showMembershipsAndCertificationsOnly && manufacturers.length > 0) {
      list.push({
        key: 'manufacturer',
        title: 'Authorized Manufacturer Brands',
        desc: 'Direct partnerships with North America’s premier flooring manufacturers.',
        subtitle: `${manufacturers.length} ${manufacturers.length === 1 ? 'Brand' : 'Brands'}`,
        badge: 'Authorized Warranty Partner',
        icon: Building2,
        items: manufacturers,
      });
    }

    return list;
  }, [certifications, memberships, manufacturers, showManufacturersOnly, showMembershipsOnly, showMembershipsAndCertificationsOnly]);

  const sectionTitle = useMemo(() => {
    if (showManufacturersOnly) return 'Manufacturer Partners';
    if (showMembershipsOnly) return 'Industry Association Memberships';
    if (showMembershipsAndCertificationsOnly) return 'Industry Memberships & Certifications';
    return 'Industry Memberships, Certifications & Partners';
  }, [showManufacturersOnly, showMembershipsOnly, showMembershipsAndCertificationsOnly]);

  const badgeText = useMemo(() => {
    if (showManufacturersOnly) return 'Authorized Partners';
    if (showMembershipsOnly || showMembershipsAndCertificationsOnly) return 'Verified Credentials';
    return 'Verified Credentials & Trusted Partners';
  }, [showManufacturersOnly, showMembershipsOnly, showMembershipsAndCertificationsOnly]);

  if (loading && partners.length === 0) {
    return null;
  }

  // If no partners exist at all, hide entire section gracefully
  if (partners.length === 0 || categories.length === 0) {
    return null;
  }

  // Uniform, equal-sized logo card helper matching reference grid
  const renderLogoCard = (item: PartnerItem) => {
    const cardContent = (
      <div
        className="group relative flex items-center justify-center p-4 sm:p-6 lg:p-7 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-[#E85D04] shadow-2xs hover:shadow-md transition-all duration-300 h-24 sm:h-28 lg:h-32 w-full overflow-hidden cursor-pointer"
        title={item.name}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {item.logo ? (
            <div className="relative w-full h-full">
              <Image
                src={item.logo}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain filter contrast-125 dark:contrast-100 group-hover:scale-105 transition-all duration-300"
              />
            </div>
          ) : (
            <span className="text-sm sm:text-base font-extrabold font-outfit text-stone-800 dark:text-stone-200 group-hover:text-[#E85D04] transition-colors text-center px-1">
              {item.name}
            </span>
          )}
        </div>

        {item.websiteUrl && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-3.5 h-3.5 text-[#E85D04]" />
          </div>
        )}
      </div>
    );

    if (item.websiteUrl) {
      return (
        <a
          key={item._id}
          href={item.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full transition-transform hover:-translate-y-0.5"
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div key={item._id} className="w-full transition-transform hover:-translate-y-0.5">
        {cardContent}
      </div>
    );
  };

  // 1. Bento Variant (Specially tailored for About Us page)
  if (variant === 'bento') {
    return (
      <div className={`px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-8 sm:py-12 font-inter ${className}`}>
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/20 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Credentials & Alliances</span>
          </div>

          <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Accreditations, Memberships & <span className="text-[#E85D04]">Brands</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Holding the highest standards of installation quality, professional compliance, and direct partnerships with premier flooring manufacturers.
          </p>

          <div className="w-16 h-1 bg-[#E85D04] mx-auto rounded-full mt-2" />
        </div>

        {/* Bento Grid: 2 Top Cards (Certifications & Memberships) + 1 Bottom Wide Card (Manufacturer Brands) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-start">
          {/* Top Row Cards: Certifications & Memberships */}
          {categories
            .filter((c) => c.key !== 'manufacturer')
            .map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 25, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={{ y: -5 }}
                  className="p-5 sm:p-7 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-2 border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-xl hover:shadow-2xl space-y-5 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Accent Hover Glow Line */}
                  <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

                  {/* Subtle Ambient Glow */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#E85D04]/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Header */}
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] group-hover:scale-110 transition-transform shrink-0">
                        <Icon className="w-6 h-6 text-[#E85D04]" />
                      </div>

                      <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/90 text-stone-700 dark:text-stone-300 font-mono text-xs font-black border border-stone-200/80 dark:border-stone-700">
                        {cat.subtitle}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-playfair text-xl font-extrabold text-stone-900 dark:text-stone-100 group-hover:text-[#E85D04] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-400 font-medium leading-relaxed mt-1">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  {/* Grid for Certifications / Memberships (2 Columns, natural expansion) */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 relative z-10 py-2">
                    {cat.items.map((item, itemIdx) => {
                      const isOddLast = cat.items.length % 2 !== 0 && itemIdx === cat.items.length - 1;
                      const tileContent = (
                        <div
                          className={`group/tile relative flex items-center justify-center p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 hover:border-[#E85D04]/70 hover:bg-white dark:hover:bg-slate-950 shadow-2xs hover:shadow-md transition-all duration-300 h-20 sm:h-22 w-full overflow-hidden cursor-pointer ${
                            isOddLast ? 'col-span-2 max-w-[200px] mx-auto' : ''
                          }`}
                          title={item.name}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            {item.logo ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={item.logo}
                                  alt={item.name}
                                  fill
                                  sizes="(max-width: 640px) 120px, 160px"
                                  className="object-contain filter contrast-125 dark:contrast-100 group-hover/tile:scale-105 transition-all duration-300"
                                />
                              </div>
                            ) : (
                              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover/tile:text-[#E85D04] transition-colors text-center px-1">
                                {item.name}
                              </span>
                            )}
                          </div>

                          {item.websiteUrl && (
                            <div className="absolute top-1.5 right-1.5 opacity-0 group-hover/tile:opacity-100 transition-opacity">
                              <ExternalLink className="w-3 h-3 text-[#E85D04]" />
                            </div>
                          )}
                        </div>
                      );

                      if (item.websiteUrl) {
                        return (
                          <a
                            key={item._id}
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full transition-transform hover:-translate-y-0.5 ${
                              isOddLast ? 'col-span-2' : ''
                            }`}
                          >
                            {tileContent}
                          </a>
                        );
                      }

                      return (
                        <div
                          key={item._id}
                          className={`w-full transition-transform hover:-translate-y-0.5 ${
                            isOddLast ? 'col-span-2' : ''
                          }`}
                        >
                          {tileContent}
                        </div>
                      );
                    })}
                  </div>

                  {/* Card Bottom Trust Badge */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between relative z-10 text-[11px] font-bold text-stone-600 dark:text-stone-400">
                    <span className="inline-flex items-center gap-1.5 text-[#E85D04]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{cat.badge}</span>
                    </span>
                    <span className="text-stone-400 dark:text-stone-500 font-medium">Saskatoon</span>
                  </div>
                </motion.div>
              );
            })}

          {/* Bottom Full-Width Card: Manufacturer Brands (Spans 2 columns on desktop) */}
          {categories
            .filter((c) => c.key === 'manufacturer')
            .map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 25, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                  className="col-span-1 lg:col-span-2 p-5 sm:p-7 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-2 border-slate-200/90 dark:border-slate-800 hover:border-[#E85D04]/60 shadow-xl hover:shadow-2xl space-y-5 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Accent Hover Glow Line */}
                  <div className="h-1.5 w-0 group-hover:w-full bg-[#E85D04] transition-all duration-500 absolute top-0 left-0" />

                  {/* Subtle Ambient Glow */}
                  <div className="absolute top-0 right-0 w-60 h-60 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Card Header (Horizontal Row on desktop) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04] group-hover:scale-110 transition-transform shrink-0">
                        <Icon className="w-6 h-6 text-[#E85D04]" />
                      </div>
                      <div>
                        <h3 className="font-playfair text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 group-hover:text-[#E85D04] transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-medium leading-relaxed mt-0.5">
                          {cat.desc}
                        </p>
                      </div>
                    </div>

                    <span className="self-start sm:self-auto px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/90 text-stone-700 dark:text-stone-300 font-mono text-xs font-black border border-stone-200/80 dark:border-stone-700">
                      {cat.subtitle}
                    </span>
                  </div>

                  {/* 5-Column Grid on Desktop: 10 logos fit in exactly 2 rows! */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 relative z-10 py-1">
                    {cat.items.map((item) => {
                      const tileContent = (
                        <div
                          className="group/tile relative flex items-center justify-center p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 hover:border-[#E85D04]/70 hover:bg-white dark:hover:bg-slate-950 shadow-2xs hover:shadow-md transition-all duration-300 h-20 sm:h-22 w-full overflow-hidden cursor-pointer"
                          title={item.name}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            {item.logo ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={item.logo}
                                  alt={item.name}
                                  fill
                                  sizes="(max-width: 640px) 120px, 160px"
                                  className="object-contain filter contrast-125 dark:contrast-100 group-hover/tile:scale-105 transition-all duration-300"
                                />
                              </div>
                            ) : (
                              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover/tile:text-[#E85D04] transition-colors text-center px-1">
                                {item.name}
                              </span>
                            )}
                          </div>

                          {item.websiteUrl && (
                            <div className="absolute top-1.5 right-1.5 opacity-0 group-hover/tile:opacity-100 transition-opacity">
                              <ExternalLink className="w-3 h-3 text-[#E85D04]" />
                            </div>
                          )}
                        </div>
                      );

                      if (item.websiteUrl) {
                        return (
                          <a
                            key={item._id}
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full transition-transform hover:-translate-y-0.5"
                          >
                            {tileContent}
                          </a>
                        );
                      }

                      return (
                        <div key={item._id} className="w-full transition-transform hover:-translate-y-0.5">
                          {tileContent}
                        </div>
                      );
                    })}
                  </div>

                  {/* Wide Card Bottom Trust Badge */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between relative z-10 text-[11px] font-bold text-stone-600 dark:text-stone-400">
                    <span className="inline-flex items-center gap-1.5 text-[#E85D04]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{cat.badge}</span>
                    </span>
                    <span className="text-stone-400 dark:text-stone-500 font-medium">Direct Manufacturer Warranty</span>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    );
  }

  // 2. Default Full-Width Variant (Used on Homepage)
  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter ${className}`}>
      <section className="space-y-12">
        {/* Main Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/20 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{badgeText}</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            {sectionTitle}
          </h2>

          {/* Decorative Brand Accent Line */}
          <div className="w-16 h-1 bg-[#E85D04] mx-auto rounded-full" />
        </div>

        {/* Structured Sub-Categories (All visible at once, cleanly labeled) */}
        <div className="space-y-10 max-w-6xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.key} className="space-y-4">
                {/* Clean Sub-Category Header */}
                <div className="flex items-center justify-between gap-3 border-b border-stone-200/90 dark:border-stone-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E85D04]/10 border border-[#E85D04]/20 text-[#E85D04] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#E85D04]" />
                    </div>
                    <h3 className="font-playfair text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                      {cat.title}
                    </h3>
                  </div>

                  <span className="text-[11px] sm:text-xs font-bold font-mono px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80">
                    {cat.subtitle}
                  </span>
                </div>

                {/* Sub-Category Logo Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 py-1">
                  {cat.items.map(renderLogoCard)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
