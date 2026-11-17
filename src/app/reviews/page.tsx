import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { AdBanner } from '@/components/layout/AdBanner';
import { NewsletterBox } from '@/components/home/NewsletterBox';
import { Star, ShieldCheck, Check, X, ExternalLink, Award, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dermatologist Product Reviews & Head-to-Head Comparisons | Lumière Derma Journal',
  description: 'Evidence-based laboratory testing and clinical reviews of top skincare, sunscreen, and haircare products. Unbiased ratings and ingredients safety scores.',
};

export default function ReviewsPage() {
  const comparisonItems = [
    {
      name: 'SkinCeuticals Triple Lipid Restore',
      category: 'Barrier Cream',
      rating: 4.9,
      price: '$150',
      activeRatio: '2% Ceramides, 4% Cholesterol, 2% Fatty Acids',
      downtimeReduction: '74% reduction in retinoid peeling',
      bestFor: 'Dry, mature, post-retinoid',
      buyUrl: 'https://example.com/skinceuticals',
      award: 'Best Overall Medical-Grade',
    },
    {
      name: 'La Roche-Posay Cicaplast Baume B5+',
      category: 'Barrier Balm',
      rating: 4.8,
      price: '$17.99',
      activeRatio: '5% Panthenol + Madecassoside + Tribioma',
      downtimeReduction: 'Rapid soothing of acute irritation',
      bestFor: 'Sensitive, eczema, irritated skin',
      buyUrl: 'https://example.com/cicaplast',
      award: 'Best Budget Soothing Balm',
    },
    {
      name: 'CeraVe Moisturizing Cream',
      category: 'Daily Barrier Lotion',
      rating: 4.6,
      price: '$19.99',
      activeRatio: '3 Essential Ceramides + Hyaluronic Acid + MVE',
      downtimeReduction: 'Consistent daily maintenance',
      bestFor: 'Normal to dry skin daily hydration',
      buyUrl: 'https://example.com/cerave',
      award: 'Best Everyday Value',
    },
    {
      name: 'Dieux Skin Instant Angel',
      category: 'Lipid Emulsion',
      rating: 4.7,
      price: '$45',
      activeRatio: 'Dipalmitoyl Hydroxyproline + Phytosterols',
      downtimeReduction: '65% improvement in barrier repair',
      bestFor: 'Combination, barrier-damaged skin',
      buyUrl: 'https://example.com/dieux',
      award: 'Best Modern Indie Formulation',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <AdBanner slot="header" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner */}
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 mb-10 border border-forest-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blush-400 bg-forest-900 px-3 py-1 rounded-full border border-forest-700">
              Department of Product Testing & Diagnostics
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-3">
              Clinical Product Reviews & Comparison Matrix
            </h1>
            <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
              Every formula reviewed on this page has undergone formulation analysis by our cosmetic chemistry panel. We test lipid ratios, vehicle delivery systems, preservatives, and real patient tolerance.
            </p>
          </div>
        </div>

        {/* Affiliate Disclosure Alert */}
        <div className="mb-8 p-4 bg-sand-50 dark:bg-slate-900 rounded-xl border border-sand-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              <strong>Editorial Transparency:</strong> Products are purchased independently or provided as clinical lab samples. We do not accept payment for positive editorial verdicts.
            </span>
          </div>
          <Link href="/affiliate-disclosure" className="text-forest-800 dark:text-emerald-400 hover:underline font-semibold shrink-0 ml-4">
            Full FTC Disclosure
          </Link>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-2">
            <Award className="w-4 h-4" />
            <span>Head-to-Head Testing</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-6">
            The 2026 Barrier Repair Cream Benchmark
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 dark:divide-slate-800 text-left text-xs sm:text-sm">
              <thead className="bg-sand-50 dark:bg-slate-800 font-serif font-bold text-slate-900 dark:text-white">
                <tr>
                  <th className="px-4 py-3.5">Product & Award</th>
                  <th className="px-4 py-3.5">Rating</th>
                  <th className="px-4 py-3.5">Price</th>
                  <th className="px-4 py-3.5">Active Key Ratio</th>
                  <th className="px-4 py-3.5">Downtime Reduction</th>
                  <th className="px-4 py-3.5">Best Skin Match</th>
                  <th className="px-4 py-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-slate-800/80">
                {comparisonItems.map((prod, idx) => (
                  <tr key={idx} className="hover:bg-sand-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">
                      <div>{prod.name}</div>
                      <span className="inline-block mt-1 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                        {prod.award}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" />
                        <span>{prod.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {prod.price}
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300 text-xs">
                      {prod.activeRatio}
                    </td>
                    <td className="px-4 py-4 text-emerald-700 dark:text-emerald-400 font-medium text-xs">
                      {prod.downtimeReduction}
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-400 text-xs">
                      {prod.bestFor}
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href={prod.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-forest-900 dark:bg-emerald-600 hover:bg-forest-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap shadow-sm"
                      >
                        <span>Check Price</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <NewsletterBox />
      <Footer />
    </div>
  );
}
