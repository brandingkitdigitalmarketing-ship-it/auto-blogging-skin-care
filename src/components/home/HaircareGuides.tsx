import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/db/schema';
import { Sparkles, ArrowRight, Wind, CheckCircle2 } from 'lucide-react';

interface HaircareGuidesProps {
  articles: Article[];
}

export function HaircareGuides({ articles }: HaircareGuidesProps) {
  const hairArticles = articles.filter(a => a.categorySlug === 'haircare').slice(0, 3);

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Explanatory Trichology Card */}
          <div className="lg:col-span-4 bg-blush-50/70 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-blush-200/60 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blush-600 dark:text-blush-400 bg-blush-100 dark:bg-blush-950 px-2.5 py-1 rounded-full">
              Trichology & Scalp Health
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-4 leading-tight">
              Evidence-Based Hair & Scalp Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Hair growth starts at the follicle level. Our clinical trichologists bust viral myths around rosemary oil, minoxidil shedding, ketoconazole rotations, and DHT inhibitors.
            </p>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-emerald-400 shrink-0" />
                <span>Microbiome-friendly antifungal regimens</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-emerald-400 shrink-0" />
                <span>Telogen effluvium vs androgenetic alopecia</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-emerald-400 shrink-0" />
                <span>Safe botanical carrier oil dilution ratios</span>
              </li>
            </ul>

            <Link
              href="/category/haircare"
              className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>Explore All Haircare Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Column: 3 Haircare Article Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {hairArticles.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.slug}`}
                className="group bg-sand-50/50 dark:bg-slate-800/40 rounded-2xl overflow-hidden border border-sand-200/80 dark:border-slate-800 hover:border-forest-700/60 transition-all p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-stone-100 dark:bg-slate-700 relative">
                    <img
                      src={art.featuredImage}
                      alt={art.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {art.subcategory || 'Scalp Therapy'}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{art.readingTimeMinutes} min clinical read</span>
                  <span className="font-semibold text-forest-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
