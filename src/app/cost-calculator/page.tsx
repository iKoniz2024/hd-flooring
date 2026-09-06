import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageHero } from '@/components/sections/PageHero';
import { LiveCostCalculator } from '@/components/interactive/LiveCostCalculator';
import { Accordion } from '@/components/ui/Accordion';
import { Sparkles, HelpCircle, ShieldCheck, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Flooring Cost Estimator Studio | HD Flooring Canada',
  description:
    'Calculate your instant live flooring installation cost in Canada. Estimate prices per square foot for Solid Hardwood, LVP Luxury Vinyl, Engineered Wood, Laminate, & Tile.',
};

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
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter relative">
      <Header />

      {/* Parallax Hero Section */}
      <PageHero
        badge="Live Cost Calculator"
        title="Flooring Cost Calculator"
        subtitle="Estimate your flooring project cost instantly. Select your desired material, room size, and preparation options below."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=95&fm=webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cost Calculator' },
        ]}
      />

      <main className="flex-1 py-12">
        {/* Live Estimator Component */}
        <LiveCostCalculator />

        {/* FAQ & Guarantees Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-red-500" />
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

          {/* Need Custom Quote Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-600 via-amber-500 to-sky-600 text-white border border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>100% Free On-Site Measurement</span>
              </div>
              <h3 className="font-jakarta text-xl sm:text-2xl font-extrabold text-white">
                Need a Custom Architectural or Large Commercial Quote?
              </h3>
              <p className="text-xs text-slate-100 max-w-xl">
                Our flooring specialists provide on-site laser measurements, subfloor moisture analysis, and exact written quotes across Canada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="tel:+18005553566"
                className="px-5 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-2 border border-white/30 transition-all backdrop-blur-md"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>+1 (800) 555-FLOOR</span>
              </a>
              <Link
                href="/contact-us"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-red-600 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-red-900/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-red-500" />
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
