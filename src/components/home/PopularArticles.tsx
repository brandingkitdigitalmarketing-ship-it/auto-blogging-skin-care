import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/db/schema';
import { TrendingUp, Eye, ArrowRight } from 'lucide-react';

interface PopularArticlesProps {
  articles: Article[];
}

export function PopularArticles({ articles }: PopularArticlesProps) {
  // Sort by views descending
  const popular = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <section className="py-12 bg-sand-50/50 dark:bg-slate-950/40 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-forest-800 dark:text-emerald-400 mb-2">
          <TrendingUp className="w-4 h-4 text-forest-800 dark:text-emerald-400" />
          <span>Reader Intelligence</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Most Read This Month
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {popular.map((art, index) => (
            <Link
              key={art.id}
              href={`/article/${art.slug}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-4 border border-stone-200 dark:border-slate-800 hover:border-forest-700/60 transition-all flex flex-col justify-between shadow-sm hover:shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-3xl font-black text-sand-300 dark:text-slate-700 group-hover:text-forest-800 dark:group-hover:text-emerald-400 transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center space-x-1 font-medium">
                    <Eye className="w-3 h-3" />
                    <span>{(art.views / 1000).toFixed(1)}k reads</span>
                  </span>
                </div>

                <span className="text-[9px] font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 bg-forest-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                  {art.categorySlug}
                </span>

                <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-300 transition-colors line-clamp-3 mt-2 leading-snug">
                  {art.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>{art.readingTimeMinutes} min read</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-forest-800 dark:group-hover:text-emerald-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
