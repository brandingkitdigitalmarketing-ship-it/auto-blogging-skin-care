import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { AdBanner } from '@/components/layout/AdBanner';
import { NewsletterBox } from '@/components/home/NewsletterBox';
import { FlaskConical, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cosmetic Chemistry & Active Ingredients Glossary | Lumière Derma Journal',
  description: 'Evidence-based molecular database of 25+ skincare and haircare active ingredients: retinoids, niacinamide, peptides, hyaluronic acid, chemical exfoliants, and pairing protocols.',
};

export default function IngredientsIndexPage() {
  const ingredients = db.getIngredients();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <AdBanner slot="header" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner */}
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 mb-10 border border-forest-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-forest-900 px-3 py-1 rounded-full border border-forest-700">
              Department of Cosmetic Chemistry
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-3">
              The Active Ingredients Encyclopedia
            </h1>
            <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
              Cut through cosmetic marketing terminology. Each active in our database is analyzed by cosmetic chemists and dermatologists for biological mechanism, optimal delivery vehicle, transdermal pH stability, and synergistic pairing rules.
            </p>
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ing) => (
            <Link
              key={ing.id}
              href={`/ingredients/${ing.slug}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 hover:border-forest-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 bg-forest-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    {ing.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    pH {ing.idealPh}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-300 transition-colors">
                  {ing.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  INCI: {ing.incI_name}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mt-3 leading-relaxed">
                  {ing.benefit}
                </p>

                {/* Quick specs */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Irritation Index:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{ing.irritationRisk}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Evidence Level:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{ing.clinicalEvidence}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs text-forest-800 dark:text-emerald-400 font-semibold">
                <span>View Molecular Profile</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <NewsletterBox />
      <Footer />
    </div>
  );
}
