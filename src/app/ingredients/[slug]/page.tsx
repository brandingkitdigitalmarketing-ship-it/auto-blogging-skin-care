import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { AdBanner } from '@/components/layout/AdBanner';
import { NewsletterBox } from '@/components/home/NewsletterBox';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface IngredientDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: IngredientDetailPageProps): Promise<Metadata> {
  const ing = db.getIngredientBySlug(params.slug);
  const settings = db.getSiteSettings();

  if (!ing) {
    return { title: 'Ingredient Not Found | Lumière Derma Journal' };
  }

  return {
    title: `${ing.name}: Cosmetic Chemistry, Benefits & Pairing Rules | ${settings.siteName}`,
    description: ing.benefit,
  };
}

export default function IngredientDetailPage({ params }: IngredientDetailPageProps) {
  const ing = db.getIngredientBySlug(params.slug);

  if (!ing) {
    notFound();
  }

  // Related articles discussing this ingredient
  const relatedArticles = db.getArticles({
    search: ing.name,
    status: 'published',
    limit: 3,
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <AdBanner slot="header" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-forest-800 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/ingredients" className="hover:text-forest-800 dark:hover:text-emerald-400 transition-colors">
            Ingredients Glossary
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            {ing.name}
          </span>
        </nav>

        {/* Hero Header */}
        <div className="bg-sand-50/80 dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-sand-200 dark:border-slate-800 shadow-sm mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
              {ing.category}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              INCI: {ing.incI_name}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            {ing.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mt-4 leading-relaxed max-w-3xl">
            {ing.benefit}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-sand-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              Optimal pH: <span className="text-forest-800 dark:text-emerald-400 font-bold">{ing.idealPh}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-sand-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              Irritation Risk: <span className="text-forest-800 dark:text-emerald-400 font-bold">{ing.irritationRisk}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-sand-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              Clinical Evidence: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{ing.clinicalEvidence}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Clinical Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Mechanism & Studies (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-3">
                Molecular Mechanism of Action
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {ing.scientificSummary}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Primary Clinical References</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {ing.keyStudies}
              </p>
            </div>

            {/* Target Skin Types */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white mb-3">
                Recommended For
              </h4>
              <div className="flex flex-wrap gap-2">
                {ing.bestForSkinTypes.map(st => (
                  <span key={st} className="px-3 py-1 rounded-full text-xs font-medium bg-forest-50 dark:bg-emerald-950 text-forest-800 dark:text-emerald-300">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Layering & Synergy Rules (5 Cols) */}
          <div className="lg:col-span-5 bg-sand-50/70 dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-sand-200 dark:border-slate-800 space-y-6">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-sand-200 dark:border-slate-800">
              Cosmetic Chemistry Layering Rules
            </h3>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pair With (Synergistic Actives)</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {ing.pairsWellWith.map(p => (
                  <li key={p} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center space-x-1.5 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Avoid Mixing Simultaneously</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {ing.avoidMixingWith.map(a => (
                  <li key={a} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Articles discussing this active */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-stone-200 dark:border-slate-800">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Clinical Articles Featuring {ing.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/article/${art.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-2xl p-4 border border-stone-200 dark:border-slate-800 hover:border-forest-700/60 shadow-sm transition-all"
                >
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-400 line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2">
                    {art.excerpt}
                  </p>
                  <span className="text-xs font-semibold text-forest-800 dark:text-emerald-400 mt-3 inline-flex items-center space-x-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <NewsletterBox />
      <Footer />
    </div>
  );
}
