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

      {/* Parallax Hero Section with Floor-Focused Photography */}
      <PageHero
        badge="About HD Flooring"
        title="About Our Company"
        subtitle="Quality materials, expert installation, and lasting results for residential and commercial spaces across Saskatoon & GTA."
        backgroundImage="/assets/images/before-after/corridor-after.png"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />

      <main className="flex-1 py-12 sm:py-16 w-full space-y-16 sm:space-y-24 relative z-10">
        <AboutUsClient />
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
