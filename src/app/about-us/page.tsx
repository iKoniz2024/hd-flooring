import { Header } from '@/components/layout/Header';

export const dynamic = 'force-static';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { PageHero } from '@/components/sections/PageHero';
import { AboutUsClient } from './AboutUsClient';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative overflow-hidden">
      {/* Mouse & Ambient Spotlight */}
      <MouseSpotlight />

      {/* Header */}
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="About HD Flooring"
        title="About Our Flooring Company"
        subtitle="Canadian installation specialists dedicated to hardwood, vinyl plank, laminate & tile craftsmanship."
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />

      <main className="flex-1 py-16 w-full space-y-20 relative z-10">
        <AboutUsClient />
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

