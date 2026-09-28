import nextDynamic from 'next/dynamic';

export const dynamic = 'force-static';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { Hero } from '@/components/sections/Hero';
import { IntroSection } from '@/components/sections/IntroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { WhyUs } from '@/components/sections/WhyUs';

// Dynamic imports for heavy below-the-fold interactive components
const BeforeAfterSlider = nextDynamic(
  () => import('@/components/interactive/BeforeAfterSlider').then((mod) => mod.BeforeAfterSlider),
  { ssr: true }
);

const ProjectShowcaseTicker = nextDynamic(
  () => import('@/components/sections/ProjectShowcaseTicker').then((mod) => mod.ProjectShowcaseTicker),
  { ssr: true }
);

const StatsBanner = nextDynamic(
  () => import('@/components/sections/StatsBanner').then((mod) => mod.StatsBanner),
  { ssr: true }
);

const ResidentialCommercial = nextDynamic(
  () => import('@/components/sections/ResidentialCommercial').then((mod) => mod.ResidentialCommercial),
  { ssr: true }
);

const ProcessTimeline = nextDynamic(
  () => import('@/components/sections/ProcessTimeline').then((mod) => mod.ProcessTimeline),
  { ssr: true }
);

const Testimonials = nextDynamic(
  () => import('@/components/sections/Testimonials').then((mod) => mod.Testimonials),
  { ssr: true }
);

const FinalCTA = nextDynamic(
  () => import('@/components/sections/FinalCTA').then((mod) => mod.FinalCTA),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter relative">
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

        {/* 3. Before / After Transformation */}
        <BeforeAfterSlider />

        {/* 4. Flooring Categories */}
        <ServicesGrid />

        {/* 5. On-Site Real Project Photo Gallery */}
        <ProjectShowcaseTicker />

        {/* 6. Statistics Banner */}
        <StatsBanner />

        {/* 7. Why HD Flooring */}
        <WhyUs />

        {/* 8. Residential & Commercial Solutions */}
        <ResidentialCommercial />

        {/* 9. Installation Process */}
        <ProcessTimeline />

        {/* 10. Customer Testimonials */}
        <Testimonials />

        {/* 11. Final CTA */}
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

