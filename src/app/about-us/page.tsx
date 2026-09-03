'use client';

import { Sparkles, CheckCircle2, UserCheck, Phone, Mail, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

const values = [
  { title: 'Quality', desc: 'Attention to materials, subfloor preparation, installation, and finishing.' },
  { title: 'Integrity', desc: 'Straightforward quotes, transparent communication, and clear advice.' },
  { title: 'Craftsmanship', desc: 'Precision board scribing, zero-lippage tiling, and meticulous nosings.' },
  { title: 'Reliability', desc: 'On-time project start dates and dependable project execution.' },
  { title: 'Customer Focus', desc: 'Solutions tailored specifically to your room traffic and budget.' },
];

const whoWeServe = [
  { title: 'Homeowners', desc: 'Renovations, room upgrades, and new custom homes.' },
  { title: 'Property Owners', desc: 'Durable flooring for rental properties and multi-unit improvements.' },
  { title: 'Contractors', desc: 'Reliable installation support for general renovation projects.' },
  { title: 'Businesses', desc: 'Commercial flooring for retail, offices, and hospitality spaces.' },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-manrope font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-400" />
            About HD Flooring
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100">
            Flooring Expertise. Professional Workmanship.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-inter leading-relaxed">
            HD Flooring is a Canadian flooring service company specializing in professional installation and repairs for residential and commercial spaces across Saskatchewan and Western Canada.
          </p>
        </div>

        {/* Leadership Profile */}
        <div className="p-8 rounded-3xl bg-slate-900 text-slate-100 border border-red-500/20 shadow-2xl flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-manrope font-bold text-sky-400 uppercase tracking-widest">
                Company Leadership
              </span>
              <h3 className="font-playfair text-2xl font-extrabold text-white">
                Habibur Rahman (Habib)
              </h3>
              <p className="text-xs text-slate-400 font-manrope">Managing Director, HD Flooring</p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-300 font-manrope">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-red-500" /> +1 (306) 880-8404</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-red-500" /> hdflooring7@gmail.com</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-400" /> Saskatoon, SK</span>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
            <span className="text-xs font-manrope font-bold text-red-500 uppercase tracking-widest">
              Our Mission
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-inter">
              To provide dependable flooring installation and repair services with professional workmanship, quality-focused service, and specialized vinyl/hardwood solutions tailored to every customer's needs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
            <span className="text-xs font-manrope font-bold text-sky-400 uppercase tracking-widest">
              Our Vision
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-inter">
              To become a trusted flooring installation company recognized across Canada for reliable service, quality workmanship, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <h2 className="font-playfair text-3xl font-bold text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2"
              >
                <h3 className="font-playfair text-lg font-bold text-red-400">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <div className="space-y-6">
          <h2 className="font-playfair text-3xl font-bold text-center">Who We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whoWeServe.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center gap-2 text-red-500 font-manrope font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  {item.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
