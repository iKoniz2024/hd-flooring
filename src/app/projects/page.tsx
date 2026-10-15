'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Camera,
  Maximize2,
  MapPin,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  Images,
  Search,
  Filter,
  X,
  RotateCcw,
  Building2,
  Home,
  Layers,
  Play
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { useModal } from '@/lib/context/ModalContext';
import { ProjectDetailModal, ProjectDetailItem } from '@/components/modals/ProjectDetailModal';
import { fetchWithCache } from '@/lib/utils/apiCache';
import { PageHero } from '@/components/sections/PageHero';

export default function ProjectsPage() {
  const { openBookModal } = useModal();
  const [projects, setProjects] = useState<ProjectDetailItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<ProjectDetailItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPropertyType, setSelectedPropertyType] = useState<'all' | 'Residential' | 'Commercial'>('all');

  useEffect(() => {
    async function fetchProjectsAndCategories() {
      try {
        setLoading(true);
        const [projData, catData] = await Promise.all([
          fetchWithCache('/api/projects'),
          fetchWithCache('/api/categories'),
        ]);

        let dbCatNames: string[] = [];
        if (catData.success && Array.isArray(catData.data)) {
          dbCatNames = catData.data.map((c: any) => c.name);
        }

        if (projData.success && Array.isArray(projData.data)) {
          const formatted: ProjectDetailItem[] = projData.data.map((item: any) => ({
            _id: item._id,
            id: String(item._id),
            title: item.title,
            location: item.location || 'Saskatoon & Area',
            category: item.category || 'Flooring Project',
            propertyType: item.propertyType || 'Residential',
            coverImage: item.coverImage,
            galleryImages: item.galleryImages || [],
            videoUrl: item.videoUrl || '',
            challenge: item.challenge || '',
            solution: item.solution || '',
            result: item.result || '',
          }));
          
          setProjects(formatted);

          const projCatNames = formatted.map((p) => p.category).filter(Boolean);
          setCategories(Array.from(new Set([...dbCatNames, ...projCatNames])));
        }
      } catch (err) {
        console.error('Failed to fetch projects gallery:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjectsAndCategories();
  }, []);

  const residentialCount = useMemo(
    () => projects.filter((p) => (p.propertyType || '').toLowerCase() === 'residential').length,
    [projects]
  );

  const commercialCount = useMemo(
    () => projects.filter((p) => (p.propertyType || '').toLowerCase() === 'commercial').length,
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // 1. Property Type filter (All | Residential | Commercial)
      const matchesPropertyType =
        selectedPropertyType === 'all' ||
        (p.propertyType || 'Residential').toLowerCase() === selectedPropertyType.toLowerCase();

      // 2. Flooring Category filter
      const matchesCategory =
        selectedCategory === 'all' ||
        p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

      // 3. Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q));

      return matchesPropertyType && matchesCategory && matchesSearch;
    });
  }, [projects, selectedPropertyType, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-x-clip">
      {/* Dynamic Mouse Spotlight & Ambient Lighting */}
      <MouseSpotlight />

      <Header />

      {/* High Quality Parallax Hero for Projects */}
      <PageHero
        badge="HD Flooring Workmanship Portfolio"
        title="Our Flooring Project Gallery"
        subtitle="Explore real on-site flooring installations, sheet vinyl flash coving, hardwood laying, and subfloor preparation executed by HD Flooring craftsmen."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Project Gallery' },
        ]}
      />

      <main id="workmanship-gallery-section" className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8 relative z-10">
        {/* Gallery Header Counter & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] flex items-center justify-center shadow-sm">
              <Camera className="w-5 h-5 text-[#E85D04]" />
            </div>
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Workmanship Gallery
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-inter font-medium">
                {loading
                  ? 'Loading project portfolio...'
                  : `Showing ${Math.min(visibleCount, filteredProjects.length)} of ${filteredProjects.length} Real On-Site Projects`}
              </p>
            </div>
          </div>

          <button
            onClick={() => openBookModal('Project Gallery')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E85D04] to-[#f06810] text-[#FFFFFF] font-manrope font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#E85D04]/30 cursor-pointer"
          >
            <span>Book Installation</span>
          </button>
        </div>

        {/* SEARCH & CATEGORY FILTER BAR */}
        {!loading && (
          <div className="space-y-4 p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-sm">
            {/* Top Row: Property Type Switcher (Tabs) + Search + Category Selector */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Property Type Segmented Filter (All Spaces | Residential | Commercial) */}
              <div className="inline-flex p-1 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm self-start sm:self-auto w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSelectedPropertyType('all');
                    setVisibleCount(12);
                  }}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPropertyType === 'all'
                      ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/25'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>All Spaces</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      selectedPropertyType === 'all'
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {projects.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSelectedPropertyType('Residential');
                    setVisibleCount(12);
                  }}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPropertyType === 'Residential'
                      ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/25'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Residential</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      selectedPropertyType === 'Residential'
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {residentialCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSelectedPropertyType('Commercial');
                    setVisibleCount(12);
                  }}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPropertyType === 'Commercial'
                      ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/25'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Commercial</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      selectedPropertyType === 'Commercial'
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {commercialCount}
                  </span>
                </button>
              </div>

              {/* Search Bar & Category Dropdown */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 lg:max-w-xl">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title, location or type..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(12);
                    }}
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#E85D04] transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setVisibleCount(12);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <Filter className="w-4 h-4 text-[#E85D04]" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setVisibleCount(12);
                    }}
                    className="w-full sm:w-auto px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#E85D04] transition-all cursor-pointer shadow-sm"
                  >
                    <option value="all">All Flooring ({projects.length})</option>
                    {categories.map((cat) => {
                      const count = projects.filter(
                        (p) => p.category.toLowerCase().trim() === cat.toLowerCase().trim()
                      ).length;
                      return (
                        <option key={cat} value={cat}>
                          {cat} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Row: Flooring Category Pills (Horizontal Scrollable Tabs) */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                  Flooring:
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setVisibleCount(12);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                      : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#E85D04]/50'
                  }`}
                >
                  All ({selectedPropertyType === 'all' ? projects.length : projects.filter(p => (p.propertyType || 'Residential').toLowerCase() === selectedPropertyType.toLowerCase()).length})
                </button>

                {categories.map((cat) => {
                  const count = projects.filter((p) => {
                    const matchesProp =
                      selectedPropertyType === 'all' ||
                      (p.propertyType || 'Residential').toLowerCase() === selectedPropertyType.toLowerCase();
                    const matchesCat = p.category.toLowerCase().trim() === cat.toLowerCase().trim();
                    return matchesProp && matchesCat;
                  }).length;
                  const isSelected = selectedCategory.toLowerCase().trim() === cat.toLowerCase().trim();
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setVisibleCount(12);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#E85D04]/50'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}

                {(selectedPropertyType !== 'all' || selectedCategory !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedPropertyType('all');
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setVisibleCount(12);
                    }}
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#E85D04] hover:bg-[#E85D04]/10 transition-all cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Gallery State Views */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-9 h-9 text-[#E85D04] animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Fetching project portfolio...
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
              <ImageIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-playfair">No Matching Projects Found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                No projects matched your search criteria or selected filters. Try resetting your filters to view all projects.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPropertyType('all');
                setVisibleCount(12);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#E85D04]/20 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Search & Filters</span>
            </button>
          </div>
        ) : (
          /* Pure Project Card Grid (Glassmorphism & Interactive Detail Modal Trigger) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(0, visibleCount).map((proj, index) => {
              const allPhotos = Array.from(new Set([proj.coverImage, ...(proj.galleryImages || [])])).filter(Boolean);
              return (
                <motion.div
                  key={proj.id || proj._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                  onClick={() => setSelectedProject(proj)}
                  className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:border-[#E85D04]/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Property Type Pill Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-950/80 text-white backdrop-blur-md border border-white/20">
                        {proj.propertyType || proj.category || 'Project Showcase'}
                      </span>
                    </div>

                    {/* Photo Count & Video Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {proj.videoUrl && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-950/80 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1">
                          <Play className="w-3 h-3 fill-[#E85D04] text-[#E85D04]" />
                          <span>Video</span>
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#E85D04] text-white shadow-lg flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5 text-white" />
                        <span>{allPhotos.length} {allPhotos.length === 1 ? 'Photo' : 'Photos'}</span>
                      </span>
                    </div>

                    {/* Location Badge on Image Bottom */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                        <MapPin className="w-3.5 h-3.5 text-[#E85D04]" />
                        <span>{proj.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-playfair text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#E85D04] transition-colors line-clamp-1">
                        {proj.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-xs font-manrope font-extrabold text-[#E85D04] group-hover:underline flex items-center gap-1">
                        <span>View Details →</span>
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookModal(proj.title);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#E85D04]/20 transition-all cursor-pointer"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Load More & Show Less Toggle Buttons */}
        {!loading && filteredProjects.length > 12 && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            {visibleCount < filteredProjects.length ? (
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredProjects.length))}
                className="px-8 py-3.5 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#E85D04]/20 cursor-pointer"
              >
                Show More Projects ({filteredProjects.length - visibleCount} Remaining) ↓
              </button>
            ) : (
              <button
                onClick={() => {
                  setVisibleCount(12);
                  const el = document.getElementById('workmanship-gallery-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.scrollTo({ top: 250, behavior: 'smooth' });
                  }
                }}
                className="px-8 py-3.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-manrope font-bold text-xs uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-700 cursor-pointer shadow-lg"
              >
                Show Less Projects ↑
              </button>
            )}
          </div>
        )}
      </main>

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onGetEstimate={(title) => openBookModal(title)}
      />

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
