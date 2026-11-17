import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { Award, ShieldCheck, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure & Commercial Transparency | Lumière Derma Journal',
  description: 'Our policy regarding affiliate links, retail partnerships, FTC compliance, and complete editorial independence.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Affiliate & Commercial Disclosure
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Compliant with FTC 16 CFR Part 255 Guidelines • Updated November 2026
        </p>

        <div className="mt-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-8 rounded-2xl border border-stone-200 dark:border-slate-800">
          <section>
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
              1. Full FTC Compliance
            </h2>
            <p>
              In accordance with Federal Trade Commission (FTC) guidelines concerning endorsements and testimonials in advertising, we maintain complete transparency regarding our commercial affiliations and revenue sources.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
              2. How Affiliate Links Work
            </h2>
            <p>
              Some outbound links on <strong>Lumière Derma Journal</strong> are affiliate links. This means that if you click on a link to a retailer (such as Dermstore, Sephora, Ulta, Amazon, or direct brand pharmacies) and make a purchase, we may receive a small affiliate commission at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
              3. Uncompromised Editorial Independence
            </h2>
            <p>
              Our product evaluations, comparison matrix rankings, and clinical scores are dictated <strong>exclusively by biochemical merit, clinical trials, and dermatologist review</strong>. Our editorial team selects products independently of commercial partnerships. Retailers do not preview our articles prior to publication, nor do they influence our ratings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
              4. Sponsored Medical Features
            </h2>
            <p>
              When content is produced in paid collaboration with a health or cosmetic brand, the article is prominently marked with a &ldquo;Sponsored Feature&rdquo; or &ldquo;Commercial Partnership&rdquo; badge directly beneath the headline. Even within sponsored features, all medical claims must satisfy our peer-reviewed factual standards.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
