'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Maximize2, MapPin, ArrowRight, Loader2, Image as ImageIcon, Images } from 'lucide-react';
import Link from 'next/link';
import { ProjectDetailModal, ProjectDetailItem } from '@/components/modals/ProjectDetailModal';
import { useModal } from '@/lib/context/ModalContext';
import { fetchWithCache } from '@/lib/utils/apiCache';

export function ProjectShowcaseTicker() {
  const { openBookModal } = useModal();
  const [projects, setProjects] = useState<ProjectDetailItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<ProjectDetailItem | null>(null);

  useEffect(() => {
    async function fetchDynamicProjects() {
      setLoading(true);
      try {
        const data = await fetchWithCache('/api/projects');
        if (data.success && Array.isArray(data.data)) {
          const formatted: ProjectDetailItem[] = data.data.map((item: any) => ({
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
        }
      } catch (err) {
        console.error('Failed to fetch homepage project showcase:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDynamicProjects();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-inter relative overflow-hidden border-y border-slate-200 dark:border-slate-800">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E85D04]/10 rounded-full blur-[140px] pointer-events-none hidden dark:block" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#E85D04]/10 rounded-full blur-[120px] pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-manrope font-bold uppercase tracking-wider"
          >
            <Camera className="w-4 h-4 text-[#E85D04]" />
            <span>HD Flooring Workmanship Gallery</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight"
          >
            Real On-Site Projects & <span className="text-[#E85D04]">Craftsmanship</span>
          </motion.h2>
        </div>

        {/* Gallery Grid - Dynamic Projects from DB */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-9 h-9 text-[#E85D04] animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Loading real on-site projects...
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
              <ImageIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-playfair">No Project Portfolio Available Yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Add projects from the Admin Dashboard to showcase real on-site work here!
              </p>
            </div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {projects.slice(0, 8).map((project, index) => {
                const totalPhotos = Array.from(new Set([project.coverImage, ...(project.galleryImages || [])])).filter(Boolean);
                const directionalVariants = [
                  { initial: { opacity: 0, x: -30, y: 20 }, whileInView: { opacity: 1, x: 0, y: 0 } },
                  { initial: { opacity: 0, y: 30, scale: 0.95 }, whileInView: { opacity: 1, y: 0, scale: 1 } },
                  { initial: { opacity: 0, y: 30, scale: 0.95 }, whileInView: { opacity: 1, y: 0, scale: 1 } },
                  { initial: { opacity: 0, x: 30, y: 20 }, whileInView: { opacity: 1, x: 0, y: 0 } },
                ];
                const motionVariant = directionalVariants[index % 4];

                return (
                  <motion.div
                    key={project.id || project._id || index}
                    layout
                    initial={motionVariant.initial}
                    whileInView={motionVariant.whileInView}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 120 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedProject(project)}
                    className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 cursor-pointer shadow-lg transform-gpu"
                  >
                    {/* Photo Image */}
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top Action Icon & Photo Count */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-black/75 backdrop-blur-md text-white border border-white/20 shadow-md flex items-center gap-1">
                        <Images className="w-3 h-3 text-[#E85D04]" />
                        <span>{totalPhotos.length}</span>
                      </span>
                      <div className="w-7 h-7 rounded-full bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-3 left-3 right-3 space-y-1 text-left">
                      <div className="flex items-center gap-1 text-[11px] font-manrope text-[#E85D04]">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>
                      <h3 className="font-playfair text-base font-bold text-white group-hover:text-[#E85D04] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View All Projects CTA */}
        <div className="text-center pt-2">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-manrope font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/25 hover:shadow-[#E85D04]/40 transition-all cursor-pointer"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Dynamic Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onGetEstimate={(title) => openBookModal(title)}
      />
    </section>
  );
}
