'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { LiveCostCalculator } from '@/components/interactive/LiveCostCalculator';
import { Accordion } from '@/components/ui/Accordion';
import { PageHero } from '@/components/sections/PageHero';
import { Calculator, Sparkles, HelpCircle, Phone } from 'lucide-react';
import { useModal } from '@/lib/context/ModalContext';

const faqs = [
  {
    question: 'How accurate is this live cost estimator?',
    answer: 'Our estimator provides a realistic price range based on current Canadian supply and labor rates. Final quotes are confirmed during our free on-site measurement where we inspect exact floor conditions.',
  },
  {
    question: 'What is included in the subfloor preparation rate?',
    answer: 'Subfloor prep ($1.50/sq.ft) includes cementitious self-leveling compound, moisture testing, high-spot grinding, and floor sanding to ensure smooth, squeak-free installation.',
  },
  {
    question: 'Does the estimate include transition strips and baseboards?',
    answer: 'Basic installation labor is included. T-molding transitions, stair nosing, baseboard removal, or shoe molding installs are itemized during your free on-site consultation.',
  },
  {
    question: 'Are there extra charges for moving heavy furniture?',
    answer: 'We offer optional furniture moving and room clearance assistance upon request. Let us know during booking so we can include it in your custom project schedule.',
  },
];

export default function CostCalculatorPage() {
  const { openBookModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter relative overflow-hidden">
      {/* Mouse & Ambient Spotlight */}
      <MouseSpotlight />

      {/* Header */}
      <Header />

      {/* Hero Header */}
      <PageHero
        badge="Instant Live Estimator"
        badgeIcon={Calculator}
        title="Flooring Cost Calculator Studio"
        subtitle="Estimate supply, installation & subfloor preparation costs in real time for hardwood, vinyl, laminate, carpet, and tile projects."
        backgroundImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cost Calculator' },
        ]}
        primaryCta={{
          label: 'Book Free Estimate',
          onClick: openBookModal,
        }}
      />

      <main className="flex-1 space-y-16 py-12 relative z-10" id="live-calculator-tool">
        {/* Live Estimator Component */}
        <LiveCostCalculator hideHeader={false} />

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-extrabold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-[#E85D04]" />
              <span>GOT QUESTIONS?</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion items={faqs} />
        </section>

        {/* Need Custom Quote Banner - Styled matching Founder Profile Card */}
        <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-[#E85D04]/30 shadow-2xl shadow-[#E85D04]/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              {/* Top Glowing Orange Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-90" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-1.5 text-center md:text-left relative z-10">
                <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Need a Custom Commercial Quote?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-manrope font-medium">
                  Free on-site laser measurements & written estimates in Saskatchewan.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 relative z-10 font-manrope shrink-0">
                <a
                  href="tel:+13068808404"
                  className="px-5 py-3 rounded-xl bg-[#E85D04] hover:bg-[#d45203] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#E85D04]/30 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +1 (306) 880-8404</span>
                </a>

                <button
                  onClick={() => openBookModal()}
                  className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span>Book Free Measure</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />

      <Footer />
    </div>
  );
}
