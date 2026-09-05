import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingScrollBtns } from '@/components/layout/FloatingScrollBtns';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { LiveCostCalculator } from '@/components/interactive/LiveCostCalculator';
import { Calculator, Sparkles, HelpCircle, ShieldCheck, Phone } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-inter relative">
      <Header />

      <main className="flex-1 pt-28 pb-16">
        {/* Page Hero Header */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Interactive Estimator Studio</span>
          </div>

          <h1 className="font-playfair text-4xl sm:text-6xl font-black text-stone-900 dark:text-white tracking-tight">
            Live Flooring Project <span className="brand-gradient-text">Cost Calculator</span>
          </h1>

          <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Get an instant real-time budget estimate for your residential or commercial flooring installation. Choose your preferred material, room square footage, and subfloor prep options below.
          </p>
        </section>

        {/* Live Estimator Component */}
        <LiveCostCalculator />

        {/* FAQ & Guarantees Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Estimator FAQs</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              Frequently Asked Questions About Flooring Costs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2"
              >
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base flex items-start gap-2">
                  <span className="text-amber-500 font-mono font-black">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Need Custom Quote Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-950 text-white border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Free On-Site Measurement</span>
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold">
                Need a Custom Architectural or Large Commercial Quote?
              </h3>
              <p className="text-xs text-stone-400 max-w-xl">
                Our flooring specialists provide on-site laser measurements, subfloor moisture analysis, and exact written quotes across Canada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="tel:+18005553566"
                className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-bold flex items-center gap-2 border border-stone-700 transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+1 (800) 555-FLOOR</span>
              </a>
              <Link
                href="/contact-us"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
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
