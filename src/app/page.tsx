'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { Hero } from '@/components/sections/Hero';
import { IntroSection } from '@/components/sections/IntroSection';
import { LiveBadge } from '@/components/animations/LiveBadge';
import { BeforeAfterSlider } from '@/components/interactive/BeforeAfterSlider';
import { StatsBanner } from '@/components/sections/StatsBanner';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProjectShowcaseTicker } from '@/components/sections/ProjectShowcaseTicker';
import { WhyUs } from '@/components/sections/WhyUs';
import { ResidentialCommercial } from '@/components/sections/ResidentialCommercial';
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
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Introduction Section */}
        <IntroSection />

        {/* 3. Live Activity Ticker */}
        <LiveBadge />

        {/* 4. Before / After Transformation */}
        <BeforeAfterSlider />

        {/* 5. Statistics Banner */}
        <StatsBanner />

        {/* 6. Flooring Categories */}
        <ServicesGrid />

        {/* 7. On-Site Real Project Photo Gallery */}
        <ProjectShowcaseTicker />

        {/* 8. Why HD Flooring */}
        <WhyUs />

        {/* 9. Residential & Commercial Solutions */}
        <ResidentialCommercial />

        {/* 10. Installation Process */}
        <ProcessTimeline />

        {/* 11. Customer Testimonials */}
        <Testimonials />

        {/* 12. Final CTA */}
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
