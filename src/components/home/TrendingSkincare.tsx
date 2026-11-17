import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/db/schema';
import { ArrowRight, Sparkles, Check, Droplets } from 'lucide-react';

interface TrendingSkincareProps {
  articles: Article[];
}

export function TrendingSkincare({ articles }: TrendingSkincareProps) {
  const skincareArticles = articles.filter(a => a.categorySlug === 'skincare').slice(0, 4);

  return (
    <section className="py-12 bg-sand-50/60 dark:bg-slate-950/50 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400">
              <Droplets className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Dermatology Regimens & Biology</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Trending Skincare Topics
            </h2>
          </div>
          <Link
            href="/category/skincare"
            className="text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <span>Explore Skincare Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Card Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skincareArticles.map((art) => (
            <Link
              key={art.id}
              href={`/article/${art.slug}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 hover:border-forest-700/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-slate-800">
                  <img
                    src={art.featuredImage}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {art.subcategory && (
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-stone-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {art.subcategory}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <span className="text-[11px] font-semibold text-forest-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                  <span>View Clinical Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
