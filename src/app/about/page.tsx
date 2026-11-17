import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { ShieldCheck, Award, HeartHandshake, Stethoscope } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Medical Board & Editorial Principles | Lumière Derma Journal',
  description: 'Learn about the board-certified dermatologists, trichologists, and cosmetic chemists directing clinical research and reporting at Lumière Derma Journal.',
};

export default function AboutPage() {
  const authors = db.getAuthors();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
            Our Mission & Credentials
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4">
            Democratizing Cutaneous Science & Dermatology Intelligence
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Founded by a collective of board-certified dermatologists, university trichologists, and investigative cosmetic chemists, Lumière Derma Journal was conceived to counter the pervasive rise of pseudoscientific marketing in the personal care industry.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-forest-50 dark:bg-emerald-950 flex items-center justify-center text-forest-800 dark:text-emerald-400 mx-auto mb-3">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base">
              Physician-Led Integrity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Every therapeutic claim is vetted by practicing clinicians against PubMed, the British Journal of Dermatology, and the American Academy of Dermatology.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-forest-50 dark:bg-emerald-950 flex items-center justify-center text-forest-800 dark:text-emerald-400 mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base">
              Zero Commercial Interference
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              We never accept financial incentives from skincare brands for favorable editorial reviews. If a formula fails to deliver clinical efficacy, our verdict reflects it honestly.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-forest-50 dark:bg-emerald-950 flex items-center justify-center text-forest-800 dark:text-emerald-400 mx-auto mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base">
              Ethical AI Automation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Our automated research pipeline synthesizes regulatory databases and clinical trials under strict editorial parameters, eliminating unsubstantiated medical claims.
            </p>
          </div>
        </div>

        {/* Medical Review Board */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Meet Our Medical Review Board & Clinical Staff
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {authors.map((author) => (
              <div
                key={author.id}
                id={author.slug}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-forest-800 dark:border-emerald-400">
                  <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 dark:text-white text-lg">
                    {author.name}
                  </h3>
                  <p className="text-xs font-semibold text-forest-800 dark:text-emerald-400 mt-0.5">
                    {author.role}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {author.credentials}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
