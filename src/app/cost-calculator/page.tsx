'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { LiveCostCalculator } from '@/components/interactive/LiveCostCalculator';
import { Accordion } from '@/components/ui/Accordion';
import { PageHero } from '@/components/sections/PageHero';
import { Calculator, Sparkles, HelpCircle, ShieldCheck, Phone } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/lib/context/ModalContext';

const faqs = [
  {
    q: 'How accurate is this live cost estimator?',
    a: 'Our estimator provides a realistic price range based on current Canadian supply and labor rates. Final quotes are confirmed during our free on-site measurement where we inspect exact floor conditions.',
  },
  {
    q: 'What is included in the subfloor preparation rate?',
    a: 'Subfloor prep ($1.50/sq.ft) includes cementitious self-leveling compound, moisture testing, high-spot grinding, and floor sanding to ensure smooth, squeak-free installation.',
  },
  {
    q: 'Does the estimate include transition strips and baseboards?',
    a: 'Basic installation labor is included. T-molding transitions, stair nosing, baseboard removal, or shoe molding installs are itemized during your free on-site consultation.',
  },
  {
    q: 'Are there extra charges for moving heavy furniture?',
    a: 'We offer optional furniture moving and room clearance assistance upon request. Let us know during booking so we can include it in your custom project schedule.',
  },
];

export default function CostCalculatorPage() {
  const { openBookModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter relative">
      <Header />

      {/* Hero Header with Architectural Floor Plan & Calculator Background Image */}
      <PageHero
        badge="Instant Live Estimator"
        badgeIcon={Calculator}
        title="Flooring Cost Calculator"
        subtitle="Estimate your flooring project cost instantly. Select your flooring material, room square footage, and subfloor preparation options below."
        backgroundImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cost Calculator' },
        ]}
        primaryCta={{
          label: 'Calculate Live Cost',
          onClick: () => {
            const el = document.getElementById('live-calculator-tool');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          },
        }}
        secondaryCta={{
          label: 'Book Free On-Site Quote',
          onClick: () => openBookModal(),
        }}
      />

      <main className="flex-1 pb-16" id="live-calculator-tool">
        {/* Live Estimator Component */}
        <LiveCostCalculator />

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-extrabold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-[#E85D04]" />
              <span>GOT QUESTIONS?</span>
            </div>
            <h2 className="font-jakarta text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion
            items={faqs.map((faq) => ({
              question: faq.q,
              answer: faq.a,
            }))}
          />
        </section>

        {/* Need Custom Quote Full-Width Banner */}
        <section className="w-full relative my-12 py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] dark:bg-stone-900 text-stone-900 dark:text-white border-y border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#E85D04] text-xs font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#E85D04]" />
                <span>100% Free On-Site Measurement</span>
              </div>
              <h3 className="font-jakarta text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white leading-tight">
                Need a Custom Architectural or Large Commercial Quote?
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-inter">
                Our flooring specialists provide on-site laser measurements, subfloor moisture analysis, and exact written quotes across Canada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href="tel:+13068808404"
                className="px-6 py-4 rounded-full bg-[#E85D04]/10 hover:bg-[#E85D04]/20 text-[#E85D04] text-xs font-bold flex items-center gap-2 border border-[#E85D04]/30 transition-all backdrop-blur-md"
              >
                <Phone className="w-4 h-4 text-[#E85D04]" />
                <span>(306) 880-8404</span>
              </a>
              <Link
                href="/contact-us"
                className="px-8 py-4 rounded-full bg-[#E85D04] hover:bg-[#d45203] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-[#E85D04]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Request Custom Quote</span>
              </Link>
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
