'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, Handshake, Award, ShieldCheck } from 'lucide-react';
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
}

export function PartnersAndCertifications({
  className = '',
  showMembershipsOnly = false,
  showMembershipsAndCertificationsOnly = false,
  showManufacturersOnly = false,
}: PartnersAndCertificationsProps) {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'membership' | 'certification'>('certification');

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

  const onlyTrust = showMembershipsOnly || showMembershipsAndCertificationsOnly;
  const renderMemberships = !showManufacturersOnly && memberships.length > 0;
  const renderCertifications = !showManufacturersOnly && certifications.length > 0;
  const renderManufacturers = !onlyTrust && manufacturers.length > 0;

  const hasBoth = renderMemberships && renderCertifications;

  const displayTrustItems = useMemo(() => {
    if (activeTab === 'membership') {
      return memberships.length > 0 ? memberships : certifications;
    }
    return certifications.length > 0 ? certifications : memberships;
  }, [memberships, certifications, activeTab]);

  if (loading && partners.length === 0) {
    return null;
  }

  // If no partners exist at all, hide entire section gracefully
  if (partners.length === 0) {
    return null;
  }

  if (!renderMemberships && !renderCertifications && !renderManufacturers) {
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

  return (
    <div className={`space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter ${className}`}>
      {/* 1. DYNAMIC SCALABLE TRUST & ACCREDITATIONS SECTION */}
      {(renderMemberships || renderCertifications) && (
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/20 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Credentials</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              {hasBoth
                ? 'Industry Memberships & Certifications'
                : renderMemberships
                  ? 'Industry Memberships'
                  : 'Quality Accreditations & Certifications'}
            </h2>

            {/* Decorative Brand Accent Line */}
            <div className="w-16 h-1 bg-[#E85D04] mx-auto rounded-full" />
          </div>

          {/* Interactive Dynamic Filter Tabs (Certifications & Memberships only) */}
          {hasBoth && (
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab('certification')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === 'certification'
                  ? 'bg-[#E85D04] text-white shadow-lg shadow-[#E85D04]/30 scale-105'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
              >
                <Award className="w-4 h-4" />
                <span>Certifications ({certifications.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('membership')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === 'membership'
                  ? 'bg-[#E85D04] text-white shadow-lg shadow-[#E85D04]/30 scale-105'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
              >
                <Handshake className="w-4 h-4" />
                <span>Memberships ({memberships.length})</span>
              </button>
            </div>
          )}

          {/* Uniform Equal-Sized Grid (Memberships / Certifications) */}
          <div
            className={`gap-3 sm:gap-4 max-w-6xl mx-auto py-2 ${
              displayTrustItems.length < 4
                ? 'flex flex-wrap items-center justify-center'
                : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {displayTrustItems.map((item) => (
              <div
                key={item._id}
                className={displayTrustItems.length < 4 ? 'w-[calc(50%-0.5rem)] sm:w-60 lg:w-64' : 'w-full'}
              >
                {renderLogoCard(item)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. MANUFACTURER PARTNERS SECTION */}
      {renderManufacturers && (
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              Manufacturer Partners
            </h2>

            {/* Decorative Brand Accent Line */}
            <div className="w-16 h-1 bg-[#E85D04] mx-auto rounded-full" />
          </div>

          {/* Uniform Equal-Sized Grid (Manufacturer Partners matching reference image) */}
          <div
            className={`gap-3 sm:gap-4 max-w-6xl mx-auto py-2 ${
              manufacturers.length < 4
                ? 'flex flex-wrap items-center justify-center'
                : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {manufacturers.map((item) => (
              <div
                key={item._id}
                className={manufacturers.length < 4 ? 'w-[calc(50%-0.5rem)] sm:w-60 lg:w-64' : 'w-full'}
              >
                {renderLogoCard(item)}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
