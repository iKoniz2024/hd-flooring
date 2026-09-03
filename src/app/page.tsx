'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { Hero } from '@/components/sections/Hero';
import { LiveBadge } from '@/components/animations/LiveBadge';
import { BeforeAfterSlider } from '@/components/interactive/BeforeAfterSlider';
import { StatsBanner } from '@/components/sections/StatsBanner';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { WhyUs } from '@/components/sections/WhyUs';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter relative">
      {/* Ambient Spotlight */}
      <MouseSpotlight />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <LiveBadge />
        <BeforeAfterSlider />
        <StatsBanner />
        <ServicesGrid />
        <WhyUs />
        <ProcessTimeline />
        <Testimonials />
        <FinalCTA />
      </main>

      {/* Floating Controls */}
      <FloatingScrollBtns />
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
