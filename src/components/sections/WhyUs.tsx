'use client';

import { ShieldCheck, Layers, Building2, Wrench, PhoneCall, UserCheck } from 'lucide-react';
import { TiltCard } from '@/components/interactive/TiltCard';

const whyUsItems = [
  {
    icon: ShieldCheck,
    title: 'Professional Installation',
    desc: 'Every project is approached with precision subfloor prep, expansion alignment, and clean finishing.',
  },
  {
    icon: Layers,
    title: 'Wide Flooring Expertise',
    desc: 'Mastery across hardwood, engineered wood, luxury vinyl, laminate, carpet, and porcelain tile.',
  },
  {
    icon: Building2,
    title: 'Residential & Commercial',
    desc: 'From single-room home updates to large-scale commercial offices, condos, and retail stores.',
  },
  {
    icon: Wrench,
    title: 'Detail-Oriented Workmanship',
    desc: 'We focus on the micro-details, nosing profiles, and clean trim transitions that elevate a space.',
  },
  {
    icon: PhoneCall,
    title: 'Reliable Communication',
    desc: 'Transparent timelines, clear pricing, and open project updates from start to final inspection.',
  },
  {
    icon: UserCheck,
    title: 'Customer-Focused Solutions',
    desc: 'Tailored recommendations based on room moisture, lifestyle traffic, aesthetic goals, and budget.',
  },
];

export function WhyUs() {
  return (
    <section className="py-20 bg-stone-900/60 dark:bg-stone-900/80 border-y border-amber-500/20 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-manrope font-semibold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Why Choose HD Flooring
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-stone-100">
            The Standard of Craftsmanship
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <TiltCard key={idx}>
                <div className="h-full p-8 rounded-3xl bg-stone-950/90 border border-stone-800 hover:border-amber-500/40 shadow-xl transition-all duration-300 space-y-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-inter">
                    {item.desc}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
