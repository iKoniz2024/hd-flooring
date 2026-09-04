'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Maximize2, X, Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  tag: string;
  location: string;
}

const galleryPhotos: GalleryPhoto[] = [
  // Luxury Vinyl
  {
    id: 'lvp-1',
    src: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-01.jpg',
    title: 'Watertight Sheet Vinyl & Coving',
    category: 'vinyl',
    tag: 'Commercial Sheet Vinyl',
    location: 'Saskatoon, SK',
  },
  {
    id: 'lvp-2',
    src: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-07.jpg',
    title: 'Acoustic Click-Lock LVP Planks',
    category: 'vinyl',
    tag: 'Luxury Vinyl Plank',
    location: 'Saskatoon, SK',
  },
  {
    id: 'lvp-3',
    src: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-12.jpg',
    title: 'Modern Stone-Look LVT Tiles',
    category: 'vinyl',
    tag: 'Luxury Vinyl Tile',
    location: 'Regina, SK',
  },
  {
    id: 'lvp-4',
    src: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-18.jpg',
    title: 'High-Traffic Office LVP Floor',
    category: 'vinyl',
    tag: 'Commercial Vinyl',
    location: 'Martensville, SK',
  },
  {
    id: 'lvp-5',
    src: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-25.jpg',
    title: 'Open Concept Basement LVP',
    category: 'vinyl',
    tag: 'Waterproof LVP',
    location: 'Warman, SK',
  },
  {
    id: 'lvp-6',
    src: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-35.jpg',
    title: 'Custom Plank Pattern Alignment',
    category: 'vinyl',
    tag: 'Click-Lock Vinyl',
    location: 'Saskatoon, SK',
  },

  // Hardwood & Engineered
  {
    id: 'hw-1',
    src: '/assets/images/hardwood-flooring/hardwood-flooring-01.jpg',
    title: 'Solid White Oak Hardwood',
    category: 'hardwood',
    tag: 'Solid Hardwood',
    location: 'Regina, SK',
  },
  {
    id: 'hw-2',
    src: '/assets/images/hardwood-flooring/hardwood-flooring-02.jpg',
    title: 'Precision Hardwood Layout',
    category: 'hardwood',
    tag: 'Solid Wood',
    location: 'Saskatoon, SK',
  },
  {
    id: 'hw-3',
    src: '/assets/images/engineered-hardwood/engineered-hardwood-01.jpg',
    title: 'Wide-Plank Engineered Oak',
    category: 'hardwood',
    tag: 'Engineered Hardwood',
    location: 'Saskatoon, SK',
  },
  {
    id: 'hw-4',
    src: '/assets/images/engineered-hardwood/engineered-hardwood-02.jpg',
    title: 'Condo Suite Engineered Wood',
    category: 'hardwood',
    tag: 'Acoustic Wood',
    location: 'Saskatoon, SK',
  },

  // Tile & Porcelain
  {
    id: 'tile-1',
    src: '/assets/images/tile-flooring/tile-flooring-01.jpg',
    title: 'Large-Format Porcelain Tile',
    category: 'tile',
    tag: 'Porcelain Tiling',
    location: 'Saskatoon, SK',
  },
  {
    id: 'tile-2',
    src: '/assets/images/tile-flooring/tile-flooring-02.jpg',
    title: 'Laser-Leveled Bathroom Tiles',
    category: 'tile',
    tag: 'Laser Alignment',
    location: 'Prince Albert, SK',
  },
  {
    id: 'tile-3',
    src: '/assets/images/tile-flooring/tile-flooring-03.jpg',
    title: 'Epoxy Grouted Foyer Flooring',
    category: 'tile',
    tag: 'Stain-Resistant Tile',
    location: 'Saskatoon, SK',
  },
  {
    id: 'tile-4',
    src: '/assets/images/tile-flooring/tile-flooring-06.jpg',
    title: 'High-Durability Showroom Tile',
    category: 'tile',
    tag: 'Commercial Porcelain',
    location: 'Regina, SK',
  },

  // Stairs
  {
    id: 'stair-1',
    src: '/assets/images/stair-flooring/stair-flooring-01.jpg',
    title: 'Custom Hardwood Stair Capping',
    category: 'stairs',
    tag: 'Hardwood Treads',
    location: 'Prince Albert, SK',
  },
  {
    id: 'stair-2',
    src: '/assets/images/stair-flooring/stair-flooring-02.jpg',
    title: 'Bullnose Nosing & Riser Fit',
    category: 'stairs',
    tag: 'Stair Restoration',
    location: 'Saskatoon, SK',
  },
  {
    id: 'stair-3',
    src: '/assets/images/stair-flooring/stair-flooring-03.jpg',
    title: 'Custom Stained Wood Stairs',
    category: 'stairs',
    tag: 'Custom Finishing',
    location: 'Warman, SK',
  },

  // Carpet
  {
    id: 'cpt-1',
    src: '/assets/images/carpet-flooring/carpet-flooring-01.jpg',
    title: 'Plush Master Suite Carpet',
    category: 'carpet',
    tag: 'Plush Carpet',
    location: 'Saskatoon, SK',
  },
  {
    id: 'cpt-2',
    src: '/assets/images/carpet-flooring/carpet-flooring-02.jpg',
    title: 'High-Density Cushion Padding',
    category: 'carpet',
    tag: 'Acoustic Padding',
    location: 'Regina, SK',
  },

  // Team On-Site
  {
    id: 'team-1',
    src: '/assets/images/team-company/team-company-01.jpg',
    title: 'On-Site Installation Craftsmen',
    category: 'team',
    tag: 'HD Field Team',
    location: 'Saskatoon, SK',
  },
  {
    id: 'team-2',
    src: '/assets/images/team-company/team-company-02.jpg',
    title: 'Precision Board Scribing',
    category: 'team',
    tag: 'Master Workmanship',
    location: 'Saskatoon, SK',
  },
  {
    id: 'team-3',
    src: '/assets/images/team-company/team-company-04.jpg',
    title: 'Floor Prep & Self-Leveling Pour',
    category: 'team',
    tag: 'Subfloor Prep',
    location: 'Saskatoon, SK',
  },
  {
    id: 'team-4',
    src: '/assets/images/personal-photos/personal-photo-01.jpg',
    title: 'Site Director Habib Rahman',
    category: 'team',
    tag: 'Project Quality Lead',
    location: 'Saskatoon, SK',
  },
];

const categories = [
  { key: 'all', label: 'All Crafts' },
  { key: 'hardwood', label: 'Hardwood & Engineered' },
  { key: 'vinyl', label: 'Luxury Vinyl & Sheet' },
  { key: 'tile', label: 'Tile & Porcelain' },
  { key: 'stairs', label: 'Stairs & Nosing' },
  { key: 'carpet', label: 'Carpet' },
  { key: 'team', label: 'Team On-Site' },
];

export function ProjectShowcaseTicker() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos =
    activeTab === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeTab);

  return (
    <section className="py-24 bg-slate-900 text-white font-inter relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-manrope font-bold uppercase tracking-wider"
          >
            <Camera className="w-4 h-4 text-red-400" />
            <span>HD Flooring Workmanship Gallery</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl sm:text-5xl font-extrabold text-white leading-tight"
          >
            Real On-Site Projects & <span className="brand-gradient-text">Craftsmanship</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-300 text-sm sm:text-base font-inter max-w-2xl mx-auto leading-relaxed"
          >
            Browse high-definition photos of real installation sites, self-leveling floor preps, custom stair capping, and sheet vinyl coving completed across Saskatoon and Saskatchewan.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-manrope font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-sky-600 text-white shadow-lg shadow-red-600/30 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative h-72 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer shadow-xl"
              >
                {/* Photo Image */}
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-[10px] font-bold text-red-400 uppercase tracking-wider backdrop-blur-md">
                    {photo.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1 text-left">
                  <div className="flex items-center gap-1 text-[11px] font-manrope text-sky-400">
                    <MapPin className="w-3 h-3" />
                    <span>{photo.location}</span>
                  </div>
                  <h3 className="font-playfair text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects CTA */}
        <div className="text-center pt-4">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-sky-600 text-white font-manrope font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-600/25 hover:shadow-red-600/40 transition-all"
            >
              <span>Explore Complete Gallery ({galleryPhotos.length}+ Photos)</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
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
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-slate-700 text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display */}
              <div className="relative h-[60vh] w-full bg-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Modal Info Footer */}
              <div className="p-6 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-wider">
                      {selectedPhoto.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-sky-400">
                      <MapPin className="w-3 h-3" />
                      {selectedPhoto.location}
                    </span>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-white">
                    {selectedPhoto.title}
                  </h3>
                </div>

                <Link href="/projects" onClick={() => setSelectedPhoto(null)}>
                  <button className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-manrope font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all">
                    <span>View Related Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
