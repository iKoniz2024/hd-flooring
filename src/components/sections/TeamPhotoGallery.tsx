'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Maximize2, X, Users, MapPin, HardHat, ShieldCheck } from 'lucide-react';

interface TeamPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  badge: string;
}

const teamPhotos: TeamPhoto[] = [
  {
    id: 'team-01',
    src: '/assets/images/team-company/team-company-01.jpg',
    title: 'HD Flooring On-Site Crew',
    subtitle: 'Expert installers preparing floor layout & moisture testing in Saskatoon',
    badge: 'On-Site Field Crew',
  },
  {
    id: 'team-02',
    src: '/assets/images/team-company/team-company-02.jpg',
    title: 'Precision Board Alignment',
    subtitle: 'Master scribing and seam setting for high-traffic vinyl & wood',
    badge: 'Precision Workmanship',
  },
  {
    id: 'team-03',
    src: '/assets/images/team-company/team-company-03.jpg',
    title: 'Subfloor Prep & Joint Sealing',
    subtitle: 'Ensuring zero squeaks and flat foundation prior to plank laying',
    badge: 'Subfloor Specialists',
  },
  {
    id: 'team-04',
    src: '/assets/images/team-company/team-company-04.jpg',
    title: 'Self-Leveling Compound Pour',
    subtitle: 'Pouring high-flow cementitious leveler for laser-flat floor surface',
    badge: 'Laser Leveling',
  },
  {
    id: 'team-05',
    src: '/assets/images/team-company/team-company-05.jpg',
    title: 'Commercial Sheet Vinyl Coving',
    subtitle: 'Heat welding watertight PVC seams for healthcare & retail',
    badge: 'Hygienic Coving',
  },
  {
    id: 'team-06',
    src: '/assets/images/team-company/team-company-06.jpg',
    title: 'Tile & Porcelain Setting',
    subtitle: 'Laser leveling grid and zero-lip tile spacer setting',
    badge: 'Master Tiling',
  },
  {
    id: 'team-07',
    src: '/assets/images/team-company/team-company-07.jpg',
    title: 'Final Quality Inspection',
    subtitle: 'Checking perimeter trims, baseboard transitions, and client walk-through',
    badge: '100% Quality Assurance',
  },
  {
    id: 'team-08',
    src: '/assets/images/personal-photos/personal-photo-01.jpg',
    title: 'Habibur Rahman (Habib)',
    subtitle: 'Managing Director & Lead Flooring Specialist leading every project site',
    badge: 'Managing Lead',
  },
];

export function TeamPhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<TeamPhoto | null>(null);

  return (
    <section className="space-y-8 font-inter">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-manrope font-bold uppercase tracking-wider text-center">
          <HardHat className="w-4 h-4 text-red-500" />
          <span>Real On-Site Team & Workmanship</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
          Meet Our Team <span className="brand-gradient-text">In Action</span>
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-inter max-w-2xl mx-auto leading-relaxed">
          Take a look behind the scenes at our dedicated installation specialists pouring self-levelers, heat welding sheet vinyl, laying hardwood, and inspecting site details.
        </p>
      </motion.div>

      {/* Grid of Team Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamPhotos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 cursor-pointer shadow-xl"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-red-400 uppercase tracking-wider backdrop-blur-md">
                {photo.badge}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-900/90 border border-slate-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 space-y-1 text-left">
              <h3 className="font-playfair text-base font-bold text-white group-hover:text-red-400 transition-colors">
                {photo.title}
              </h3>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-snug">
                {photo.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl cursor-default"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-slate-700 text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[65vh] w-full bg-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-wider">
                    {selectedPhoto.badge}
                  </span>
                  <h3 className="font-playfair text-xl font-bold text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {selectedPhoto.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
