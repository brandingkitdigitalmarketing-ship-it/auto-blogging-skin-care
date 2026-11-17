'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FlaskConical, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { Ingredient } from '@/lib/db/schema';

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

export function IngredientsSection({ ingredients }: IngredientsSectionProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(ingredients[0]?.slug || 'hyaluronic-acid');
  const active = ingredients.find(i => i.slug === selectedSlug) || ingredients[0];

  if (!active) return null;

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-forest-800 dark:text-emerald-400">
              <FlaskConical className="w-4 h-4 text-forest-800 dark:text-emerald-400" />
              <span>Cosmetic Chemistry Glossary</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Beauty Ingredients Explained: The Molecular Breakdown
            </h2>
          </div>
          <Link
            href="/ingredients"
            className="text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <span>Browse Full 25+ Ingredient Index</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab Selector for Quick Molecules */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {ingredients.slice(0, 6).map((ing) => (
            <button
              key={ing.slug}
              onClick={() => setSelectedSlug(ing.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedSlug === ing.slug
                  ? 'bg-forest-900 text-white border-forest-900 shadow-sm'
                  : 'bg-sand-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-sand-200 dark:border-slate-700 hover:bg-sand-100 dark:hover:bg-slate-700'
              }`}
            >
              {ing.name}
            </button>
          ))}
        </div>

        {/* Active Ingredient Deep-Dive Card */}
        <div className="bg-sand-50/70 dark:bg-slate-800/50 rounded-3xl p-6 sm:p-8 border border-sand-200/80 dark:border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Overview, Science, Benefit */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                  {active.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  INCI: {active.incI_name}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {active.name}
              </h3>

              <p className="text-sm text-slate-700 dark:text-slate-200 mt-3 leading-relaxed">
                {active.benefit}
              </p>

              <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-sand-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-1">
                  Scientific Mechanism of Action
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {active.scientificSummary}
                </p>
                <p className="text-[10px] text-slate-400 mt-2 font-mono">
                  Primary Key Studies: {active.keyStudies}
                </p>
              </div>

              <div className="mt-5">
                <Link
                  href={`/ingredients/${active.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-forest-800 dark:text-emerald-400 hover:underline"
                >
                  <span>Read Full Molecular Dossier on {active.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right 5 Cols: Pairing Rules & Skin Metrics */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 space-y-4">
              <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-stone-100 dark:border-slate-800">
                Formulation & Compatibility Rules
              </h4>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Best For Skin Types
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {active.bestForSkinTypes.map(st => (
                    <span key={st} className="text-xs bg-forest-50 dark:bg-emerald-950 text-forest-800 dark:text-emerald-300 px-2 py-0.5 rounded-md font-medium">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Irritation Risk</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{active.irritationRisk}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Optimal Stability pH</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{active.idealPh}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Synergistic (Safe to Pair)</span>
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {active.pairsWellWith.join(' • ')}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center space-x-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Avoid Mixing Directly</span>
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {active.avoidMixingWith.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
