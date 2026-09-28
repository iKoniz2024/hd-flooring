import { Header } from '@/components/layout/Header';

export const dynamic = 'force-static';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MouseSpotlight } from '@/components/animations/MouseSpotlight';
import { LiveCostCalculator } from '@/components/interactive/LiveCostCalculator';
import { Accordion } from '@/components/ui/Accordion';
import { PageHero } from '@/components/sections/PageHero';
import { Calculator, HelpCircle } from 'lucide-react';
import { CostCalculatorCTA } from './CostCalculatorCTA';

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
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter relative overflow-x-clip">
      {/* Mouse & Ambient Spotlight */}
      <MouseSpotlight />

      {/* Header */}
      <Header />

      {/* Hero Header */}
      <PageHero
        badge="Instant Live Estimator"
        badgeIcon="calculator"
        title="Flooring Cost Calculator Studio"
        subtitle="Estimate supply, installation & subfloor preparation costs in real time for hardwood, vinyl, laminate, carpet, and tile projects."
        backgroundImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cost Calculator' },
        ]}
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

        {/* Need Custom Quote Banner */}
        <CostCalculatorCTA />
      </main>

      <FloatingScrollBtns />
      <FloatingWhatsApp />

      <Footer />
    </div>
  );
}

