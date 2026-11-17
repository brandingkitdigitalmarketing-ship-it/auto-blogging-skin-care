import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Lumière Derma Journal',
  description: 'Terms of service and reader agreement for accessing Lumière Derma Journal.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Last Updated: November 2026
        </p>

        <div className="mt-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-8 rounded-2xl border border-stone-200 dark:border-slate-800">
          <p>
            By accessing or using Lumière Derma Journal, you agree to be bound by these Terms and Conditions and our Medical Disclaimer. If you disagree with any part of these terms, please do not use our services.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mt-4">1. Intellectual Property</h3>
          <p>
            All editorial text, articles, molecular profiles, comparison tables, logos, and graphics published on Lumière Derma Journal are protected by copyright and intellectual property laws. Reproduction, redistribution, or scraping of content without prior written permission is strictly prohibited.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mt-4">2. Permitted Use</h3>
          <p>
            You are granted a limited, revocable license to access our publication for personal, non-commercial educational reading. You may share excerpt links across social media provided explicit attribution to Lumière Derma Journal is maintained.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mt-4">3. Limitation of Liability</h3>
          <p>
            Under no circumstances shall Lumière Derma Journal, its physicians, editors, or parent entity be held liable for any direct or indirect cutaneous damages, adverse skin reactions, or financial expenditures resulting from the application of advice or products reviewed on this website.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
