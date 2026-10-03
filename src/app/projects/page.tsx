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
  RotateCcw
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

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.challenge && p.challenge.toLowerCase().includes(q)) ||
        (p.solution && p.solution.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

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
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
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
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by project title, location (e.g. Saskatoon), category..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(12);
                  }}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#E85D04] transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setVisibleCount(12);
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Dropdown (Mobile + Desktop quick select) */}
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-4 h-4 text-[#E85D04]" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setVisibleCount(12);
                  }}
                  className="w-full md:w-auto px-4 py-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#E85D04] transition-all cursor-pointer shadow-sm"
                >
                  <option value="all">All Categories ({projects.length})</option>
                  {categories.map((cat) => {
                    const count = projects.filter((p) => p.category.toLowerCase().trim() === cat.toLowerCase().trim()).length;
                    return (
                      <option key={cat} value={cat}>
                        {cat} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Category Filter Pills (Horizontal Scrollable Tabs) */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setVisibleCount(12);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/20'
                      : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#E85D04]/50'
                  }`}
                >
                  All Projects ({projects.length})
                </button>

                {categories.map((cat) => {
                  const count = projects.filter((p) => p.category.toLowerCase().trim() === cat.toLowerCase().trim()).length;
                  const isSelected = selectedCategory.toLowerCase().trim() === cat.toLowerCase().trim();
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setVisibleCount(12);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/20'
                          : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#E85D04]/50'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
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
                No projects matched your search criteria or selected category filter. Try resetting your filter to view all projects.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
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
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#E85D04]/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                    {/* Photo Count Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-black/75 backdrop-blur-md text-white border border-white/20 shadow-md flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5 text-[#E85D04]" />
                        <span>{allPhotos.length} {allPhotos.length === 1 ? 'Photo' : 'Photos'}</span>
                      </span>
                    </div>

                    {/* Zoom Icon on Hover */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <div className="w-8 h-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-manrope font-extrabold text-[#E85D04]">
                        <MapPin className="w-3 h-3 text-[#E85D04]" />
                        <span>{proj.location}</span>
                        {proj.propertyType && (
                          <span className="ml-auto px-2 py-0.5 rounded bg-black/60 text-white text-[10px] uppercase tracking-wider font-extrabold border border-white/20">
                            {proj.propertyType}
                          </span>
                        )}
                      </div>
                      <h3 className="font-playfair text-base sm:text-lg font-bold leading-tight group-hover:text-[#E85D04] transition-colors line-clamp-1">
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-inter">
                      {proj.challenge || proj.solution || `Professional ${proj.category} installation completed with precision craftsman finish.`}
                    </p>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-manrope font-extrabold text-[#E85D04] group-hover:underline flex items-center gap-1">
                        <span>View Project Details →</span>
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookModal(proj.title);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#E85D04] hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
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
